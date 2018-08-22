import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const names = new RegExp('^[a-zA-Z]+$');
const floatNumbers = new RegExp('[-+]?([0-9]*\.[0-9]+|[0-9]+)');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) => names.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Employee name is required'],
  },
  family: {
    type: String,
    validate: {
      validator: (val) => names.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Employee family is required'],
  },
  dateOfBirth: {
    type: String,
    validate: {
      validator: (val) =>  Date.parse(val),
      message: props =>
       `${props.value} is not a valid format! Date of birth should be in DD/MM/YYYY!`,
    },
    required: [true, 'Employee date of birth is required'],
  },
  dateOfEmployement: {
    type: String,
    validate: {
      validator: (val) =>  Date.parse(val),
      message: props =>
      `${props.value} is not a valid format! Date of birth should be in DD/MM/YYYY!`,
    },
    required: [true, 'Employee date of employeement is required'],
  },
  position: {
    type: String,
    validate: {
      validator: (val) => names.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Employee position is required'],
  },
  qualifications: {
    type: Array,
    validate: {
      validator: (val) => val instanceof Array,
      message: props =>
       `${props.value} is not valid format! Qualifications should be passed as array!`,
    },
    required: [true, 'Employee qualifications is required'],
  },
  salary: {
    type: Number,
    validate: {
      validator: (val) => floatNumbers.test(val),
      message: props => `${props.value} is not a valid float number!`,
    },
    required: [true, 'Employee salary is required'],
  },
  isManager: {
    type: Boolean,
    validate: val => val ? val : false,
  },
});
module.exports = { Employees: mongoose.model('Employees', EmployeeSchema), EmployeeSchema, };
