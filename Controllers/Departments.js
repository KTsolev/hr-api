import mongoose from 'mongoose';
import { Positions } from '../Models/positionsModel';
import { Employees } from '../Models/employeesModel';
import { Departments } from '../Models/departmentsModel';

exports.findAll = (req, res) => {
  Departments.find({}).exec((err, departments) => {
    if (err) throw err;
    console.log(departments);
    res.json(departments);
  });
};

exports.findById = (req, res) => {
  const { departmentId } = req.params;
  Departments.findById(departmentId).then((department) => {
    console.log(`Found department: ${department}`);
    if (!department) {
      res.status(404).send({ error: 'Department not found' });
    }

    res.status(200).send({ success: department });
  }).catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });
};

exports.create = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const department = new Departments(payload);

  Positions.find({ department: payload.name }).then((positions) => {
    console.log(positions);
    if (positions && positions.length > 0) {
      positions.forEach((position) => {
        const manager = position.employees.filter(employee => employee.isManager === true);

        department.positions.push(position);

        if (manager) {
          department.manager = manager;
        }
      });

      console.log(department);
      department.markModified('positions');
      department.markModified('manager');
    }

    const error = department.validateSync();

    if (error) {
      res.status(500).send({ error: error });
    }

    department.save();
  })
  .catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'New department has been successfully created!' });
};

exports.update = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const { departmentId } = req.params;
  const department = Departments(payload);
  const error = department.validateSync();

  if (error) {
    res.status(500).send({ error: error });
  }

  Departments.findByIdAndUpdate({ _id: departmentId }, {
      $set: {
        name: department.name,
        manager: department.manager,
        positions: department.positions,
      },
    }).then((department) => {
    console.log(`Department updated to database: ${department}`);
  })
  .catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Department has been successfully updated!', department });
};

exports.delete = (req, res) => {
  const { departmentId } = req.params;
  let deletedDepartment = null;
  Departments.findById(departmentId).then((department) => {
    console.log(`Delete department: ${department}`);
    deletedDepartment = department;
    department.remove();
  }).catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Department has been successfully updated!', deletedDepartment });
};

exports.addPositionToDepartment = (req, res) => {
  const { departmentId, positionId } = req.params;

  Positions.findById(positionId).then((position) => {
    if (!position) {
      return;
    }

    Departments.findByIdAndUpdate({
        _id: departmentId,
      }, {
        $push: {
          positions: position,
        },
      }).then((department) => {

      console.log(`Updated department: ${department}`);
    }).catch((err) => {
      console.log(`Unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  }).catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Position has been successfully added!' });
};

exports.removePositionFromDepartment = (req, res) => {
  const { departmentId, positionId } = req.params;

  Positions.findById(positionId).then((position) => {
    if (!position) {
      return;
    }

    Departments.findByIdAndUpdate({
        _id: departmentId,
      }, {
        $pull: {
          positions: { _id: position._id },
        },
      }).then((department) => {
      console.log(`Updated department: ${department}`);
    }).catch((err) => {
      console.log(`Unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  });

  res.status(200).send({ success: 'Position has been successfully removed!' });
};

exports.addManagerToDepartment = (req, res) => {
  const { departmentId, employeeId } = req.params;
  console.log(departmentId, employeeId);
  Employees.findById(employeeId).then((employee) => {
    if (!employee) {
      return;
    }
    console.log(employee);

    Departments.findByIdAndUpdate({
        _id: departmentId,
      }, {
        $push: {
          manager: employee,
        },
      }).then((department) => {
        console.log(employee);
        console.log(`Updated department: ${department}`);
      }).catch((err) => {
      console.log(`Unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  }).catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Manager has been successfully added!' });
};


exports.removeManagerToDepartment = (req, res) => {
  const { departmentId, employeeId } = req.params;
  console.log(departmentId, employeeId);
  Employees.findById(employeeId).then((employee) => {
    if (!employee) {
      return;
    }
    console.log(employee);

    Departments.findByIdAndUpdate({
        _id: departmentId,
      }, {
        $pull: {
          manager: employee,
        },
      }).then((department) => {
        console.log(employee);
        console.log(`Updated department: ${department}`);
      }).catch((err) => {
      console.log(`Unable to save to database ${err}`);
      res.status(500).send({ error: err });
    });
  }).catch((err) => {
    console.log(`Unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Manager has been successfully removed!' });
};
