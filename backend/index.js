// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config({});

// const app = express();

// const FRONTEND_URL = process.env.FRONTEND_URL;
// const corsOptions = {
//     origin(origin, callback) {
//         // allow Postman/curl (no origin)
//         if (!origin) return callback(null, true);
//         // only allow exactly your FRONTEND_URL
//         if (origin === FRONTEND_URL) return callback(null, true);
//         callback(new Error(`CORS blocked for ${origin}`));
//     },
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const PORT = process.env.PORT || 3000;

// // api's
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// app.listen(PORT, () => {
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// });

// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config();
// const app = express();

// // build the whitelist
// const allowedOrigins = [process.env.FRONTEND_URL];
// if (process.env.NODE_ENV !== "production") {
//     allowedOrigins.push("http://localhost:5173");
// }

// app.use(
//     cors({
//         origin(origin, callback) {
//             console.log("CORS check for origin:", origin);
//             // allow tools (no origin) or our whitelisted URLs
//             if (!origin || allowedOrigins.includes(origin)) {
//                 return callback(null, true);
//             }
//             return callback(new Error(`CORS blocked for ${origin}`));
//         },
//         credentials: true,
//     })
// );

// // standard middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     connectDB();
//     console.log(
//         `Server running on port ${PORT} (${process.env.NODE_ENV || "dev"})`
//     );
// });

import express, { urlencoded } from "express";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();
// connect db
connectDB();
const PORT = process.env.PORT || 8080;
const app = express();

const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "https://jobsy-g6v2.onrender.com",
    credentials: true,
};
app.use(cors(corsOptions));

// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
