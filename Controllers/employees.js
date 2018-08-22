import { Employees } from '../Models/employeesModel';

exports.findAll = (req, res) => {
  Employees.find({}).exec((err, employees) => {
    if (err) throw err;
    console.log(employees);
    res.json(employees);
  });
};

exports.findById = (req, res) => {
  const { employeeId } = req.params;
  Employees.findById(employeeId).then((employee) => {
    console.log(`Found employee: ${employee}`);
    if (!employee) {
      res.status(404).send({ error: 'Employee not found' });
    }

    res.status(200).send({ success: employee });
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });
};

exports.create = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const newEmployee = payload;
  const employee = Employees(newEmployee);
  const error = employee.validateSync();

  if (error) {
    res.status(500).send({ error: error });
  }

  employee.save().then((employee) => {

    console.log(`employee saved to database: ${employee}`);
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'New employee has been successfully created!', newEmployee });
};

exports.update = (req, res) => {
  const payload = JSON.parse(JSON.stringify(req.body));
  const { employeeId } = req.params;
  const employee = Employees(payload);
  const error = employee.validateSync();

  if (error) {
    res.status(500).send({ error: error });
  }

  Employees.findByIdAndUpdate({ _id: employeeId }, {
      $set: {
        name: employee.name,
        family: employee.family,
        dateofBirth: employee.dateofBirth,
        position: employee.position,
        qualifications: employee.qualifications,
        salary: employee.salary,
        isMenager: employee.isMenager,
      },
    }).then((employee) => {
    console.log(`employee updated to database: ${employee}`);
  })
  .catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Employee has been successfully updated!', employee });
};

exports.delete = (req, res) => {
  const { employeeId } = req.params;
  let deletedEmployee = null;
  Employees.findById(employeeId).then((employee) => {
    console.log(`Delete employee: ${employee}`);
    deletedEmployee = employee;
    employee.remove();
  }).catch((err) => {
    console.log(`unable to save to database ${err}`);
    res.status(500).send({ error: err });
  });

  res.status(200).send({ success: 'Employee has been successfully updated!', deletedEmployee });
};
