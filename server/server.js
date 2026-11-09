const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "ChurchConnect API is working",
  });
});

const memberRoutes = require("./src/routes/memberRoutes");

app.use("/api/members", memberRoutes);
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/auth", authRoutes);

const attendanceRoutes = require("./src/routes/attendanceRoutes");
app.use("/api/attendance", attendanceRoutes);

const visitorRoutes = require("./src/routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

const eventRoutes = require("./src/routes/eventRoutes");
app.use("/api/events", eventRoutes);

const reportRoutes = require("./src/routes/reportRoutes");
app.use("/api/reports", reportRoutes);

const userRoutes = require("./src/routes/userRoutes");

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const sequelize = require("./src/config/db");

const User = require("./src/models/User");
const Member = require("./src/models/Member");
const Visitor = require("./src/models/Visitor");
const Event = require("./src/models/Event");
const Attendance = require("./src/models/Attendance");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database Connected");
    console.log("✅ Tables Synced");
  })
  .catch((err) => {
    console.error(err);
  });
