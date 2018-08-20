import mongoose from 'mongoose';
import { PositionSchema } from './positionsModel';

const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
  name: { type: String },
  family: { type: String },
  dateOfBirth: { type: String },
  dateOfEmployement: { type: String },
  position: { type: String },
  qualifications: { type: Array },
  salary: { type: Number },
  isMenager: { type: Boolean },
});
module.exports = { Employees: mongoose.model('Employees', EmployeeSchema), EmployeeSchema, };
