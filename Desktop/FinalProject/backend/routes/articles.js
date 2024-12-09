const express = require('express');
const { getArticles, saveArticle, deleteArticle } = require('../controllers/articleController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getArticles);

router.post('/', auth, saveArticle);

router.delete('/:articleId', auth, deleteArticle);

module.exports = router;