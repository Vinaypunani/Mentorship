const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/students/students.routes');
const lessonRouters = require("./modules/lessons/lessons.routes");
const bookingRouters = require("./modules/bookings/bookings.routes");
const sessionRouters = require("./modules/sessions/sessions.routes");
const llmRouters = require("./modules/llm/llm.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/lessons", lessonRouters);
app.use("/bookings", bookingRouters);
app.use("/sessions", sessionRouters);
app.use("/llm", llmRouters);

app.get('/', (req, res) => {
    res.send('Mentora API Running');
});

module.exports = app;