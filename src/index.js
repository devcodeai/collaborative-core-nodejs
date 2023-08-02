import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { router } from './routes.js';
import { init, migration } from './database/config.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3030;
const host = process.env.HOST || 'localhost';

app.use(cors());
app.use(json());
app.use('/api', router);

// 404 endpoint middleware
app.all('*', (req, res) => {
  res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use((err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'An error occurred.'
  });
});

const run = async () => {
  init();
  await migration(); // 👈 running migration before server
  app.listen(port, (error) => {
    if (error) {
      console.log('Error occured!');
      console.log(`Error: ${error}`);
    } else {
      console.log(`Server run on http://${host}:${port}/`);
    }
  }); // running server
};

run();
