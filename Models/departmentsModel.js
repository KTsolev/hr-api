import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const stringAndDigits = new RegExp('^[a-zA-Z0-9]+$');

const DepartmentsSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) => stringAndDigits.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Department name is required'],
  },
  manager: {
    type: Array,
    validate: val => val ? val : [],
  },
  positions: {
    type: Array,
    validate: val => val ? val : [],
  },
});

module.exports = {
  Departments: mongoose.model('Departments', DepartmentsSchema),
  DepartmentsSchema,
};
