const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const songSchema = new Schema({
  title: { type: String, required: true },
  album:  { type: String },
  artist:  { type: String },
  albumArtURL:  { type: String }
});


module.exports = mongoose.model('Song', songSchema);
