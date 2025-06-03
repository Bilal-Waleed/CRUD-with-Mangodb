// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import connectDB from './config/db.js';
import routes from './routes/index.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Routes
app.use('/', routes);

// 404 Handler for API
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Route not found', data: null });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});