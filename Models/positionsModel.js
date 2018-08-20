import mongoose from 'mongoose';
import { EmployeeSchema } from './employeesModel';

const Schema = mongoose.Schema;

const PositionSchema = new mongoose.Schema({
  name: { type: String },
  minSalary: { type: Number },
  maxSalary: { type: Number },
  department: { type: String },
  description: { type: String },
  employees: { type: Array },
});

module.exports = { Positions: mongoose.model('Positions', PositionSchema), PositionSchema, };
