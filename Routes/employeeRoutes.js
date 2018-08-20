import express from 'express';
import employeesController from '../Controllers/employees';

const employeeRoute = express.Router();

employeeRoute.get('/employees', employeesController.findAll);

employeeRoute.get('/employees/:employeeId', employeesController.findById);

employeeRoute.post('/employees', employeesController.create);

employeeRoute.put('/employees/:employeeId', employeesController.update);

employeeRoute.delete('/employees/:employeeId', employeesController.delete);

module.exports = employeeRoute;
