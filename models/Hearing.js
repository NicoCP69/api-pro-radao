const hearingSchema = new mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token',
      required: true,
    },
    emailList: {
      type: String, // Store file path or reference
      required: true,
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
