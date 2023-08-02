import { Router } from 'express';
import { getCompanies } from './controllers/CompanyServiceController.js';

const router = new Router();
router.get('/', async (req, res) => {
  console.log('Welcome to the Collaborative Core API (NodeJS)!');
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Collaborative Core API (NodeJS)!'
  });
});
// Company Service
router.get('/companies', getCompanies);
// Campus Service
// TODO HERE
// Talent Service
// TODO HERE
// Community Service
// TODO HERE

export { router };
