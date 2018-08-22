import express from 'express';
import departmentsController from '../Controllers/Departments';

const departmentRoute = express.Router();

departmentRoute.get('/departments', departmentsController.findAll);

departmentRoute.get('/departments/:departmentId', departmentsController.findById);

departmentRoute.post('/departments', departmentsController.create);

departmentRoute.put('/departments/:departmentId', departmentsController.update);

departmentRoute.delete('/departments/:departmentId', departmentsController.delete);

departmentRoute.get('/departments/:departmentId/addPositionToDepartment/:positionId',
 departmentsController.addPositionToDepartment);

departmentRoute.get('/departments/:departmentId/removePositionFromDepartment/:positionId',
  departmentsController.removePositionFromDepartment);

departmentRoute.get('/departments/:departmentId/addManagerToDepartment/:employeeId',
 departmentsController.addManagerToDepartment);

departmentRoute.get('/departments/:departmentId/removeManagerToDepartment/:employeeId',
  departmentsController.removeManagerToDepartment);

module.exports = departmentRoute;
