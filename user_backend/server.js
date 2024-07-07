import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import status from "express-status-monitor";
import helmet from "helmet";
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
app.use(status());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to The Instagram Server!!!" });
});

// route files
import routes from "./routes/index.js";
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(
    `🦋 Instagram Users Server is running on Port ${process.env.PORT}`
  );
});
