import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from'cors';
import employeesRoute from './Routes/EmployeesRoutes';
import positionsRoute from './Routes/PositionsRoutes';
import departmentsRoute from './Routes/DepartmentsRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

const port = process.env.PORT || 8080;
mongoose.connect('mongodb://localhost:27017/HR-api');

const router = express.Router();

router.get('/v1/', (req, res) => {
  console.log({ message: 'hooray! welcome to our api!' });
  res.json({ message: 'hooray! welcome to our api!' });
});

app.on('error', (err) => console.error(err));

app.use(function (req, res, next)
{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('===========================');
    console.log(`||Client IP| ${ip} |Port: ${port}||`);
    console.log('===========================');

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

app.use('/api', router);
app.use('/api/v1/hremployees', employeesRoute);
app.use('/api/v1/hrpositions', positionsRoute);
app.use('/api/v1/hrdepartments', departmentsRoute);

app.listen(port);
console.log('==========================================================');
console.log(`||Beers are served at: http://localhost:${port} ${app.settings.env}'||`);
console.log('==========================================================');
