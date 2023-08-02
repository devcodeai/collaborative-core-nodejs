import { Router } from 'express';
import { getCompanies } from './controllers/CompanyServiceController.js';
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

const router = new Router();
router.get('/', async (req, res) => {
  console.log('Welcome to the Collaborative Core API (NodeJS)!');
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Collaborative Core API (NodeJS)!'
  });
});
// Company Services
router.get('/companies', getCompanies);
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
// TODO HERE
// Community Services
// TODO HERE

export { router };
