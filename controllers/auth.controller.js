import User from '../models/User.js';
import { validatePassword } from '../utils/passwordValidator.js';

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Mot de passe invalide',
        details: passwordValidation.errors,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Les mots de passe ne correspondent pas',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Cet email est déjà utilisé',
      });
    }

    const user = new User({ email, password });
    await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Email ou mot de passe incorrect',
      });
    }

    const token = user.generateAuthToken();

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
