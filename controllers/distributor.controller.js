import Distributor from '../models/Distributor.js';
import crypto from 'crypto';

export const configureDistributor = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { spv, widget } = req.body;

    let distributor = await Distributor.findOne({ token: tokenId });
    if (!distributor) {
      distributor = new Distributor({
        token: tokenId,
      });
    }

    if (spv) {
      distributor.spv = spv;
    }

    if (widget && widget.enabled) {
      distributor.widget = {
        ...widget,
        config: {
          ...widget.config,
          widgetId: crypto.randomBytes(8).toString('hex'),
        },
      };
    }

    await distributor.save();

    res.json({
      success: true,
      data: distributor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
