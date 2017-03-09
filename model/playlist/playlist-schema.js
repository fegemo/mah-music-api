const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const playlistSchema = new Schema({
  name: { type: String, required: true },
  creator:  { type: mongoose.Schema.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.ObjectId, ref: 'Song' }]
});


module.exports = mongoose.model('Playlist', playlistSchema);
