const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/articles');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Logging
const requestLogStream = fs.createWriteStream(path.join(__dirname, 'logs/request.log'), { flags: 'a' });
app.use(morgan('combined', { stream: requestLogStream }));

// Routes
app.use('/users', userRoutes); // User routes
app.use('/article', articleRoutes); // Article routes (both GET and POST)

app.use((err, req, res) => {
  res.status(500).json({ message: 'Something went wrong!' });
});
// connecting mongodb
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
