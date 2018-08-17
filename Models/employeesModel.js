import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
  name: 'string',
  family: 'string',
  dateofBirth: 'string',
  position: 'string',
  qualifications: 'array',
  salary: 'number',
  isMenager: 'boolean',
});
module.exports = mongoose.model('Employees', EmployeeSchema);
