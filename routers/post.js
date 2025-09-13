const express = require("express");
const router = express.Router();

const post = require('../data/postData');
const postController = require('../controllers/postController');

//index
router.get('/', postController.index);

//show
router.get('/:id', postController.show);

//store
router.post('/', postController.store);

//update
router.put('/:id', postController.update);

//modify
router.patch('/:id', postController.moodify);

//destroy
router.delete('/:id', postController.destroy);

module.exports = router;