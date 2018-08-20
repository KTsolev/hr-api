import { Positions } from '../Models/positionsModel';
import { Employees } from '../Models/employeesModel';
import mongoose from 'mongoose';

exports.findAll = (req, res) => {
  Positions.find({}).exec((err, positions) => {
    if (err) throw err;
    console.log(positions);
    res.json(positions);
  });
};

exports.findById = (req, res) => {
  const { positionId } = req.params;
  Positions.findById(positionId).then((position) => {
    console.log(`Found position: ${position}`);
    if (!position) {
      res.status(404).send({ error: 'Employee not found' });
    }

    res.status(200).send({ success: position });
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });
};

exports.create = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const position = new Positions(payload);

  Employees.find({ position: payload.name }).then((employees) => {
    position.employees = employees;
    console.log(position);
    position.markModified('employees');
    position.save();
  })
  .catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'New position has been successfully created!' });
};

exports.update = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const { positionId } = req.params;
  const updatedPosition = payload;

  if (!payload) {
    return;
  }

  Positions.findByIdAndUpdate({ _id: positionId }, { $set: {
    name: payload.name,
    minSalary: payload.minSalary,
    maxSalary: payload.maxSalary,
    department: payload.department,
    description: payload.description,
    employees: payload.employees,
  },
  }).then((position) => {
    console.log(`position updated to database: ${position}`);
  })
  .catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Employee has been successfully updated!', updatedPosition });
};

exports.delete = (req, res) => {
  const { positionId } = req.params;
  let deletedPosition = null;
  Positions.findById(positionId).then((position) => {
    console.log(`Delete position: ${position}`);
    deletedPosition = position;
    position.remove();
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Employee has been successfully updated!', deletedPosition });
};

exports.addEmployeeToPosition = (req, res) => {
  const { positionId, employeeId } = req.params;

  Employees.findById(employeeId).then((employee) => {
    if (!employee) {
      return;
    }

    Positions.findByIdAndUpdate({
        _id: positionId,
      }, {
        $push: {
          employees: employee,
        },
      }).then((position) => {
      console.log(`Updated position: ${position}`);
    }).catch((err) => {
      console.log(`unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Employee has been successfully added!' });
};

exports.removeEmployeeFromPosition = (req, res) => {
  const { positionId, employeeId } = req.params;

  Employees.findById(employeeId).then((employee) => {
    if (!employee) {
      return;
    }

    Positions.findByIdAndUpdate({
        _id: positionId,
      }, {
        $pull: {
          employees: { _id: employee._id },
        },
      }).then((position) => {
      console.log(`Updated position: ${position}`);
    }).catch((err) => {
      console.log(`unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  });

  res.status(200).send({ success: 'Employee has been successfully added!' });
};
