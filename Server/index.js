const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const staffs = require('./routes/staffs');
const appointments = require('./routes/appointments');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');



// console.log(config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
        // $env:hospital_jwtPrivateKey="mySecureKey" -> command to set TO set environment variable
        console.log('FATAL ERROR: jwt is not defined.');
        process.exit(1);
}

mongoose.connect('mongodb://localhost/hospital')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors());
app.use(express.json());
app.use('/api/patients', patients);
app.use('/api/doctors', doctors);
app.use('/api/staffs', staffs);
app.use('/api/appointments', appointments);
app.use('/api/users', users);
app.use('/api/auth', auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));

