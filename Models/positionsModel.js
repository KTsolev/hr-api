import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const names = new RegExp(`^[\\w\\d\\s-_]+$`);
const floatNumbers = new RegExp('[-+]?([0-9]*\.[0-9]+|[0-9]+)');

const PositionSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (val) => names.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Position name is required'],
  },
  minSalary: {
    type: Number,
    validate: {
      validator: (val) => floatNumbers.test(val),
      message: props => `${props.value} is not valid float value!`,
    },
    required:  [true, 'Position min salary is required'],
  },
  maxSalary: {
    type: Number,
    validate: {
      validator: (val) => floatNumbers.test(val),
      message: props => `${props.value} is not valid float value!`,
    },
    required: [true, 'Position max salary is required'],
  },
  department: {
    type: String,
    validate: {
      validator: (val) => names.test(val),
      message: props => `${props.value} is not valid value! Should be only letters!`,
    },
    required: [true, 'Position department is required'],
  },
  description: {
    type: String,
    required: [true, 'Position description is required'],
  },
  employees: { type: Array },
});

module.exports = { Positions: mongoose.model('Positions', PositionSchema), PositionSchema, };
