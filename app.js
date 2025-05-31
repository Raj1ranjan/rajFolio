const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Flash message setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Routes
app.get('/', (req, res) => {
  const message = req.flash('success');
  res.render('index', { message });
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Contact form submitted: Name=${name}, Email=${email}, Message=${message}`);

  req.flash('success', 'Thank you for your message!');
  res.redirect('/');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
