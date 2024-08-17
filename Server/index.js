const express = require("express");
const cors = require("cors");
const MongoDB = require("./DB");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/userRoutes");
const avatarRoute = require("./Routes/avatarRoutes");
const contactRoute = require("./Routes/contactRoute");
const messageRoute = require("./Routes/messageRoutes");
MongoDB();
const app = express();
require("dotenv").config();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api", avatarRoute);
app.use("/api", contactRoute);
app.use("/api", messageRoute);
const port = 7000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
