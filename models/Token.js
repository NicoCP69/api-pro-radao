// src/models/Token.js
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
      validate: {
        validator: function (v) {
          // Vérifie que la chaîne ne contient que des majuscules
          return /^[A-Z]+$/.test(v);
        },
        message: 'Le nom doit contenir uniquement des lettres majuscules',
      },
    },
    ticker: {
      type: String,
      required: true,
      unique: true,
      maxlength: 11,
      validate: {
        validator: function (v) {
          // Vérifie que la chaîne contient uniquement des lettres et des chiffres
          return /^[A-Za-z0-9]+$/.test(v);
        },
        message: 'Le ticker ne peut contenir que des lettres et des chiffres',
      },
    },
    fees: {
      firstMarket: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
        validate: {
          validator: function (v) {
            return v >= 0 && v <= 10;
          },
          message: 'Le pourcentage first market doit être entre 0 et 10%',
        },
      },
      reward: {
        type: Number,
        required: true,
        min: 0,
        max: 50,
        validate: {
          validator: function (v) {
            return v >= 0 && v <= 50;
          },
          message: 'Le pourcentage reward doit être entre 0 et 50%',
        },
      },
      wallet: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            // Validation du format d'adresse ERC20 (commence par 0x suivi de 40 caractères hexadécimaux)
            return /^0x[a-fA-F0-9]{40}$/.test(v);
          },
          message: "L'adresse du wallet doit être au format ERC20 valide",
        },
      },
    },
    status: {
      type: String,
      enum: ['draft', 'pending_review', 'approved', 'active', 'paused'],
      default: 'draft',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// Middleware pour convertir le nom en majuscules avant la sauvegarde
tokenSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.toUpperCase();
  }
  if (this.isModified('ticker')) {
    this.ticker = this.ticker.toUpperCase();
  }
  next();
});

// Méthode statique pour la validation du token
tokenSchema.statics.validateToken = async function (tokenData) {
  try {
    const token = new this(tokenData);
    await token.validate();
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      errors: Object.values(error.errors).map((err) => err.message),
    };
  }
};

const Token = mongoose.model('Token', tokenSchema);

export default Token;
