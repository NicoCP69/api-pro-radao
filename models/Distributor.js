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
        type: String,
        enum: ['ibex', 'radao', 'shares'],
        required: function () {
          return this.spv.enabled;
        },
      },
    },
    widget: {
      enabled: Boolean,
      config: {
        theme: {
          type: String,
          enum: ['red', 'green', 'black', 'blue', 'gray'],
          default: 'blue',
        },
        font: {
          type: String,
          enum: ['Inter', 'Roboto', 'Poppins', 'Arial', 'Helvetica'],
          default: 'Inter',
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
