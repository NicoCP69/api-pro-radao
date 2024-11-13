import mongoose from 'mongoose';

const spvProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: String,
    website: String,
    contactEmail: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SpvProvider = mongoose.model('SpvProvider', spvProviderSchema);

const themeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: String,
    colorCode: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    order: Number,
  },
  {
    timestamps: true,
  }
);

const fontSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: String,
    fallback: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    order: Number,
  },
  {
    timestamps: true,
  }
);

export const SpvProvider = mongoose.model('SpvProvider', spvProviderSchema);
export const Theme = mongoose.model('Theme', themeSchema);
export const Font = mongoose.model('Font', fontSchema);
