// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import status from "express-status-monitor";
// import compression from "compression";
// import helmet from "helmet";
// import path from "path";
// import routes from "./routes/index.js";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Get the current file's directory path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config();
// const app = express();

// // Use compression middleware to reduce the size of response bodies
// app.use(compression());

// // Use helmet to secure Express apps by setting various HTTP headers
// app.use(helmet());

// // Allow all CORS for now (You can specify allowed origins if needed)
// app.use(cors());

// // Set headers for caching and security
// app.use((req, res, next) => {
//   // Set CORS headers
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   // Set cache control headers
//   // res.header("Cache-Control", "public, max-age=31536000"); // 1 year caching
//   // res.header("Expires", new Date(Date.now() + 31536000000).toUTCString());

//   next();
// });

// // Monitoring
// app.use(status());

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'uploads' directory with proper caching headers
// app.use("/uploads", express.static(path.join(__dirname, "uploads")
// // , {
// //   maxAge: "1y", // Cache static files for 1 year
// //   setHeaders: (res, path) => {
// //     res.setHeader("Cache-Control", "public, max-age=31536000");
// //     res.setHeader("Expires", new Date(Date.now() + 31536000000).toUTCString());
// //   }
// // }
// ));

// // Root endpoint
// app.get("/", (req, res) => {
//   res.json({ message: "👁️ Welcome to Instagram CDN" });
// });

// // API route handling
// app.use("/api/upload", routes);

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`👁️  Instagram CDN Running on PORT ${process.env.PORT}...`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import status from "express-status-monitor";
import helmet from "helmet";
import morgan from "morgan";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://instagram--six.vercel.app"],
//     credentials: true
//   })
// );

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(status());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "👁️ Welcome to Instagram CDN" });
});

app.use("/api/upload", routes);

app.listen(port, () => {
  console.log(`👁️  Instagram CDN Running on PORT ${port}...`);
});
