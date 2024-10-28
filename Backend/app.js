const express = require('express');
let cors = require('cors');
const app = express();
const membersRoute = require('./routes/memberRoutes');
const usersRoute = require('./routes/userRoutes');
const trainersRoute = require('./routes/trainerRoutes');
const classRoute = require('./routes/classRoutes');
const authRoute = require('./routes/authRoutes');

const ApplicationError = require('./utilities/applicationError');
const genericErrorHandler = require('./controllers/errorController');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/members', membersRoute);
app.use('/users', usersRoute);
app.use('/trainers', trainersRoute);
app.use('/classes', classRoute);
app.use('/', authRoute);

app.all('*', (req, res, next) => {
    next(new ApplicationError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(genericErrorHandler);

module.exports = app;








