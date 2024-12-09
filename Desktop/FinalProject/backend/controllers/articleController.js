const Article = require('../models/article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ userId: req.user._id });
    return res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveArticle = async (req, res) => {
  const {
    title, description, source, image, date,
  } = req.body;
  const userId = req.user._id;

  try {
    const existingArticle = await Article.findOne({ title, userId });
    if (existingArticle) {
      return res.status(409).json({ message: 'Article already exists for this user' });
    }

    const newArticle = new Article({
      date,
      title,
      description,
      source,
      image,
      userId,
    });

    await newArticle.save();
    return res.status(201).json({ message: 'Article saved successfully', article: newArticle });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You cannot delete this article' });
    }

    await article.deleteOne();
    return res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getArticles, saveArticle, deleteArticle };
