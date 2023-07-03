import { userLoginValidate, userRegisterValidate } from '../validates/index.js';

import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import slugify from 'slugify';

export const authController = {
  /* generate token */
  generateToken: async (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    return token;
  },
  refreshToken: async (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    return token;
  },
  /* register */
  register: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = userRegisterValidate.validate(body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      /* check unique username */
      const usernameUnique = await User.findOne({ username: body.username });
      if (usernameUnique) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      /* check email */
      const emailExits = await User.findOne({ email: body.email });
      if (emailExits) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      /* create slug */
      const slug = slugify(body.username, { lower: true });
      body.slug = slug;
      /* hash password */
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);
      body.password = hashPassword;
      /* create */
      const user = await User.create(body);
      return res.status(201).json({ data: user });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
  /* login */
  login: async (req, res) => {
    try {
      const body = req.body;
      /* validate */
      const { error } = userLoginValidate.validate(body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      /* check email */
      const emailExits = await User.findOne({ email: body.email });
      if (!emailExits) {
        return res.status(400).json({ message: 'Email does not exist' });
      }
      /* check password */
      const validPassword = await bcrypt.compare(body.password, emailExits.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Password is incorrect' });
      }
      if (emailExits && validPassword) {
        /* create token */
        const token = await authController.generateToken(emailExits);
        /* remove password */
        const { password, ...info } = emailExits._doc;
        return res.status(200).json({ accessToken: token, data: info });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  },
};