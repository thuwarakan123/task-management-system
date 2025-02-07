const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const notFound = require('./middleware/notFoundMiddleware');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
const baseUrl = '/api/v1'

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(`${baseUrl}/auth`, authRoutes);
app.use(`${baseUrl}/user`, userRoutes);
app.use(`${baseUrl}/task`, taskRoutes);

//middileware for not found urls
app.use(notFound)

module.exports = app;
