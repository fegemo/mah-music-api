const controller = require('./playlist-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id')
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

router.route('/:id/songs/:song_id')
  .post((...args) => controller.addSong(...args))
  .delete((...args) => controller.removeSong(...args));

module.exports = router;
