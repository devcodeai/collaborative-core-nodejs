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
import {
  getCampuses,
  getCampusById,
  createCampus,
  updateCampusById,
  deleteCampusById
} from './controllers/CampusServices/CampusController.js';
import {
  getMajorsByCampusId,
  getMajorById,
  createMajorByCampusId,
  updateMajorById,
  deleteMajorById
} from './controllers/CampusServices/MajorController.js';
import {
  getTalents,
  getTalentById,
  createTalent,
  updateTalentById,
  deleteTalentById
} from './controllers/TalentServices/TalentController.js';
import {
  getCommunities,
  getCommunityById,
  createCommunity,
  updateCommunityById,
  deleteCommunityById
} from './controllers/CommunityServices/CommunityController.js';

const router = new Router();
router.get('/', async (req, res) => {
  console.log('Welcome to the Collaborative Core API (NodeJS)!');
  res.status(200).json({
    status: 'Success',
    message: 'Welcome to the Collaborative Core API (NodeJS)!'
  });
});
// Company Services
// > Company Routes
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.post('/companies/', createCompany);
router.put('/companies/:id', editCompany);
router.delete('/companies/:id', deleteCompany);

// > Product Routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/', createProduct);
router.put('/products/:id', editProduct);
router.delete('/products/:id', deleteProduct);

// Campus Services
// > Campus Routes
router.get('/campuses', getCampuses);
router.get('/campuses/:id', getCampusById);
router.post('/campuses', createCampus);
router.put('/campuses/:id', updateCampusById);
router.delete('/campuses/:id', deleteCampusById);
// > Major Routes
router.get('/majors', getMajorsByCampusId);
router.get('/majors/:id', getMajorById);
router.post('/majors', createMajorByCampusId);
router.put('/majors/:id', updateMajorById);
router.delete('/majors/:id', deleteMajorById);
// Talent Services
// > Talent Routes
router.get('/talents', getTalents);
router.get('/talents/:id', getTalentById);
router.post('/talents', createTalent);
router.put('/talents/:id', updateTalentById);
router.delete('/talents/:id', deleteTalentById);
// Community Services
// > Community Routes
router.get('/communities', getCommunities);
router.get('/communities/:id', getCommunityById);
router.post('/communities', createCommunity);
router.put('/communities/:id', updateCommunityById);
router.delete('/communities/:id', deleteCommunityById);

export { router };
