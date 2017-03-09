const Model = require('../../lib/facade');
const playlistSchema  = require('./playlist-schema');
const mongoose = require('mongoose');

class PlaylistModel extends Model {
  constructor(Schema) {
    super(Schema, ['creator', 'songs']);
  }

  find(query) {
    return this.Schema
      .find(query)
      .populate('creator songs')
      .exec();
  }

  findOne(query) {
    return this.Schema
      .findOne(query)
      .populate('creator songs')
      .exec();
  }

  findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error({
        code: 400,
        description: 'ID inválido. Ele deve ser do tipo ObjectId.'
      });
    }

    return this.Schema
      .findById(id)
      .populate('creator songs')
      .exec();
  }

}

module.exports = new PlaylistModel(playlistSchema);
