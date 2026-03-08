const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/students/students.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth",authRoutes);
app.use("/students",studentRoutes);

app.get('/', (req, res) => {
    res.send('Mentora API Running');
});

module.exports = app;