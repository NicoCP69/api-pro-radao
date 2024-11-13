const issuerSchema = new mongoose.Schema(
  {
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Token',
      required: true,
    },
    spvEnabled: {
      type: Boolean,
      default: false,
    },
    spvProvider: {
      type: String,
      enum: ['chainr-ou', 'chainr-sas', 'chainr-uab'],
      required: function () {
        return this.spvEnabled;
      },
    },
    customIssuerRequest: {
      enabled: Boolean,
      contactEmail: String,
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
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
