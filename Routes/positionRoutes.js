import express from 'express';
import positionController from '../Controllers/positions';

const positionRoute = express.Router();

positionRoute.get('/positions', positionController.findAll);

positionRoute.get('/positions/:positionId', positionController.findById);

positionRoute.post('/positions', positionController.create);

positionRoute.put('/positions/:positionId', positionController.update);

positionRoute.delete('/positions/:positionId', positionController.delete);

positionRoute.get('/positions/:positionId/addEmployeeToPosition/:employeeId',
 positionController.addEmployeeToPosition);

positionRoute.get('/positions/:positionId/removeEmployeeFromPosition/:employeeId',
  positionController.removeEmployeeFromPosition);

module.exports = positionRoute;
