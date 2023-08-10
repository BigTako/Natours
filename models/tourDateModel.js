const mongoose = require('mongoose');

const tourDateSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Tour Date has to contain a Date']
  },
  tour: {
    type: mongoose.Schema.ObjectId, // for refferencing
    ref: 'Tour'
  },
  participants: [
    {
      type: mongoose.Schema.ObjectId, // for refferencing
      ref: 'User',
      validate: v => v.length <= this.soldOut
    }
  ],
  soldOut: {
    type: Number,
    default: 0
  }
});

tourDateSchema.index({ date: 1, tour: 1 }, { unique: true });

const TourDate = mongoose.model('TourDate', tourDateSchema);

module.exports = TourDate;
