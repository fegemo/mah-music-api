const Controller = require('../../lib/controller');
const playlistFacade  = require('./playlist-facade');

class PlaylistController extends Controller {

  selectSongAndUpdate(req, res, next, update) {
    const conditions = { _id: req.params.id };
    this.facade.update(conditions, update)
      .then((doc) => {
          if (!doc) { return res.status(404).end(); }
          return res.status(200).json(doc);
        })
      .catch(err => next(err));
  }

  addSong(req, res, next) {
    const update = {
      $addToSet: { songs: req.params.song_id }
    };
    this.selectSongAndUpdate(req, res, next, update);
  }

  removeSong(req, res, next) {
    const update = {
      $pullAll: { songs: [req.params.song_id] }
    };
    this.selectSongAndUpdate(req, res, next, update);
  }
}

module.exports = new PlaylistController(playlistFacade);
