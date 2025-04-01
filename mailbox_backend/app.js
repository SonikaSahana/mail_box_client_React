const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./util/db");
const authRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/emailRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/mails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
