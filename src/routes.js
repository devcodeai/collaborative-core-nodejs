import { Router } from 'express';
import {
  createCompany,
  deleteCompany,
  editCompany,
  getCompanies,
  getCompanyById
} from './controllers/CompanyServices/CompanyController.js';
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts
} from './controllers/CompanyServices/ProductController.js';

const router = new Router();
// Company service
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.post('/companies/', createCompany);
router.put('/companies/:id', editCompany);
router.delete('/companies/:id', deleteCompany);

// Product service
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/', createProduct);
router.put('/products/:id', editProduct);
router.delete('/products/:id', deleteProduct);

export { router };
