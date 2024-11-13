import mongoose from 'mongoose';

const distributorSchema = new mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token',
      required: true,
    },
    spv: {
      enabled: Boolean,
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpvProvider',
        required: function () {
          return this.spv.enabled;
        },
      },
    },
    widget: {
      enabled: Boolean,
      config: {
        theme: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Theme',
          default: null,
        },
        font: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Font',
          default: null,
        },
        title: String,
        widgetId: {
          type: String,
          unique: true,
        },
      },
    },
    status: {
      type: String,
      enum: ['draft', 'locked'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Distributor', distributorSchema);
