import express from 'express';
import positionsController from '../Controllers/Positions';

const positionRoute = express.Router();

positionRoute.get('/positions', positionsController.findAll);

positionRoute.get('/positions/:positionId', positionsController.findById);

positionRoute.post('/positions', positionsController.create);

positionRoute.put('/positions/:positionId', positionsController.update);

positionRoute.delete('/positions/:positionId', positionsController.delete);

positionRoute.get('/positions/:positionId/addEmployeeToPosition/:employeeId',
 positionsController.addEmployeeToPosition);

positionRoute.get('/positions/:positionId/removeEmployeeFromPosition/:employeeId',
  positionsController.removeEmployeeFromPosition);

module.exports = positionRoute;
