const Controller = require('../../lib/controller');
const songFacade  = require('./song-facade');

class SongController extends Controller {}

module.exports = new SongController(songFacade);
