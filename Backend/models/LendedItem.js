const mongoose = require('mongoose');

const lendedItemSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  lenderName: String,
  daysForLend: Number,
  oneDayPrice: Number,
  totalPay: Number,
});

const LendedItem = mongoose.model('Rented-items', lendedItemSchema);

module.exports = LendedItem;
