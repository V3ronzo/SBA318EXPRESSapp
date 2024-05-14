const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const commentRoutes = require('./routes/comments');
const logRequest = require('./middleware/logRequest');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const port = 3000;

// Set up Handlebars view engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use custom middleware
app.use(logRequest);

// Set up routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

// Error handling middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send("This is Veronzo's Express Server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

