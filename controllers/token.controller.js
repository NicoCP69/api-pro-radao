// src/controllers/token.controller.js
import Token from '../models/Token.js';

export const createToken = async (req, res) => {
  try {
    const { name, ticker, fees } = req.body;

    // Validation préalable
    const validation = await Token.validateToken({
      name,
      ticker,
      fees,
      creator: req.user.id,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation échouée',
        details: validation.errors,
      });
    }

    const token = new Token({
      name,
      ticker,
      fees,
      creator: req.user.id,
    });

    await token.save();

    res.status(201).json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      details: error.errors ? Object.values(error.errors).map((err) => err.message) : undefined,
    });
  }
};

export const updateToken = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validation préalable des mises à jour
    const validation = await Token.validateToken({
      ...updates,
      creator: req.user.id,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation échouée',
        details: validation.errors,
      });
    }

    const token = await Token.findOneAndUpdate({ _id: id, creator: req.user.id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'Token introuvable',
      });
    }

    res.json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
      details: error.errors ? Object.values(error.errors).map((err) => err.message) : undefined,
    });
  }
};
