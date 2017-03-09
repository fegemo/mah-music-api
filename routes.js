const Router = require('express').Router;
const router = new Router();

const song  = require('./model/song/song-router');
const playlist  = require('./model/playlist/playlist-router');
const user  = require('./model/user/user-router');
/* yeoman require hook */
/* Don't remove this comment, it is needed by the sub generator */

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to mah-music-api API!' });
});

router.use('/songs', song);
router.use('/playlists', playlist);
router.use('/users', user);
/* yeoman use hook */
/* Don't remove this comment, it is needed by the sub generator' */

module.exports = router;
