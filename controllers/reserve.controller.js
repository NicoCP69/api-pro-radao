import Reserve from '../models/Reserve.js';
import Token from '../models/Token.js';

export const configureReserve = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { assets } = req.body;

    const token = await Token.findOne({
      _id: tokenId,
      creator: req.user.id,
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        error: 'Token introuvable',
      });
    }

    let reserve = await Reserve.findOne({ token: tokenId });
    if (!reserve) {
      reserve = new Reserve({
        token: tokenId,
        assets: [],
      });
    }

    reserve.assets = assets;
    await reserve.save();

    res.json({
      success: true,
      data: reserve,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addAssetRequest = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { type, details, description } = req.body;

    const reserve = await Reserve.findOne({ token: tokenId });
    if (!reserve) {
      return res.status(404).json({
        success: false,
        error: 'Réserve introuvable',
      });
    }

    reserve.requests.push({
      type,
      details,
      description,
    });

    await reserve.save();

    res.json({
      success: true,
      data: reserve,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
