import { SpvProvider, Theme, Font } from '../models/Configuration.js';

// SPV Providers
export const getSpvProviders = async (req, res) => {
  try {
    const providers = await SpvProvider.find({ isActive: true })
      .sort('order')
      .select('name displayName');

    res.json({
      success: true,
      data: providers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addSpvProvider = async (req, res) => {
  try {
    const { name, displayName, order } = req.body;
    const provider = new SpvProvider({
      name,
      displayName,
      order,
    });
    await provider.save();

    res.status(201).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Themes
export const getThemes = async (req, res) => {
  try {
    const themes = await Theme.find({ isActive: true })
      .sort('order')
      .select('name displayName colorCode');

    res.json({
      success: true,
      data: themes,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addTheme = async (req, res) => {
  try {
    const { name, displayName, colorCode, order } = req.body;
    const theme = new Theme({
      name,
      displayName,
      colorCode,
      order,
    });
    await theme.save();

    res.status(201).json({
      success: true,
      data: theme,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Fonts
export const getFonts = async (req, res) => {
  try {
    const fonts = await Font.find({ isActive: true })
      .sort('order')
      .select('name displayName fallback');

    res.json({
      success: true,
      data: fonts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addFont = async (req, res) => {
  try {
    const { name, displayName, fallback, order } = req.body;
    const font = new Font({
      name,
      displayName,
      fallback,
      order,
    });
    await font.save();

    res.status(201).json({
      success: true,
      data: font,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
