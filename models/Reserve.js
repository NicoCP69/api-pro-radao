import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    validate: {
      validator: function (value) {
        // Vérifie que la somme totale des pourcentages n'excède pas 100
        const total = this.parent().reduce((sum, asset) => sum + asset.percentage, 0);
        return total <= 100;
      },
      message: 'La somme totale des pourcentages ne peut pas dépasser 100%',
    },
  },
  category: {
    type: String,
    enum: ['crypto', 'nasdaq', 'nyse'],
    required: true,
  },
});

const reserveSchema = new mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token',
      required: true,
    },
    assets: [assetSchema],
    status: {
      type: String,
      enum: ['draft', 'locked'],
      default: 'draft',
    },
    requests: [
      {
        type: {
          type: String,
          enum: ['new_market', 'new_asset', 'new_crypto', 'unlisted'],
          required: true,
        },
        details: String,
        description: String,
        status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Reserve', reserveSchema);
