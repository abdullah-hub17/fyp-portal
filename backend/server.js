const express = require("express");
const errorHandling = require("./Middleware/error");
const DatabaseConnect = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");


// HANDLING UNCAUGHT EXCEPTION -
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

dotenv.config({
  path: "./config/config.env"
});


// MongoDB Connection
// change host name and change connection name
DatabaseConnect();
const app = express();

const port = process.env.PORT;

// WORKING FOR TESTING -
// app.get("/", (_req, res) => {
// res.send("<h1>Working</h1>")
// })

app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({limit: '2000 mb', extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/files", express.static("Files"));

// ROUTE
const studentRoute = require("./Routes/StudentRoute");
const supervisorRoute = require("./Routes/SupervisorRoute");
const cordinatorRoute = require("./Routes/CordinatorRoute");
const adminRoute = require("./Routes/AdminRoute");

app.use('/fyp', studentRoute, supervisorRoute, cordinatorRoute, adminRoute);

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// UNHANDLED PROMISE REJECTION -
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});