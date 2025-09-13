import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './src/routes/post.routes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
// Use the PORT from environment variables, with a fallback to 3000
const port = process.env.PORT || 3000;

app.use(express.json());

// Mount the post routes
app.use('/posts', postRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});