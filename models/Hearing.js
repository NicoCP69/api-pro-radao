// models/Hearing.js
import mongoose from 'mongoose';

const hearingSchema = new mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token',
      required: true,
    },
    // Section Email
    emailList: {
      type: String,
      required: function () {
        return this.listType === 'email';
      },
    },
    emails: [
      {
        email: {
          type: String,
          validate: {
            validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
            message: "Format d'email invalide",
          },
        },
        status: {
          type: String,
          enum: ['pending', 'sent', 'failed'],
          default: 'pending',
        },
        sentAt: Date,
        error: String,
      },
    ],
    // Section Wallet
    walletList: {
      type: String,
      required: function () {
        return this.listType === 'wallet';
      },
    },
    wallets: [
      {
        address: {
          type: String,
          validate: {
            validator: (v) => /^0x[a-fA-F0-9]{40}$/.test(v),
            message: "Format d'adresse ERC20 invalide",
          },
        },
        status: {
          type: String,
          enum: ['pending', 'sent', 'failed'],
          default: 'pending',
        },
        sentAt: Date,
        error: String,
      },
    ],
    // Champs communs
    listType: {
      type: String,
      enum: ['email', 'wallet'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Hearing', hearingSchema);
