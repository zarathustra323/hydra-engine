const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  photoURL: {
    type: String,
    trim: true,
    validate: {
      validator(v) {
        if (!v) return true;
        return validator.isURL(v, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: 'Invalid photo URL for {VALUE}',
    },
  },
}, { timestamps: true });

schema.pre('save', function setPhotoURL(next) {
  if (!this.photoURL) {
    const hash = this.id;
    this.photoURL = `https://robohash.org/${hash}?set=set3&bgset=bg2`;
  }
  next();
});

module.exports = schema;
