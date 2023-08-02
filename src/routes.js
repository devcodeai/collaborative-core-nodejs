import { Router } from 'express';
import { getCompanies } from './controllers/CompanyServiceController.js';

const router = new Router();
// Company service
router.get('/companies', getCompanies);

export { router };
