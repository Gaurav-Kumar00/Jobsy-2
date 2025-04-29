// // import express from "express";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import connectDB from "./utils/db.js";
// // import userRoute from "./routes/user.route.js";
// // import companyRoute from "./routes/company.route.js";
// // import jobRoute from "./routes/job.route.js";
// // import applicationRoute from "./routes/application.route.js";

// // dotenv.config({});

// // const app = express();

// // const FRONTEND_URL = process.env.FRONTEND_URL;
// // const corsOptions = {
// //     origin(origin, callback) {
// //         // allow Postman/curl (no origin)
// //         if (!origin) return callback(null, true);
// //         // only allow exactly your FRONTEND_URL
// //         if (origin === FRONTEND_URL) return callback(null, true);
// //         callback(new Error(`CORS blocked for ${origin}`));
// //     },
// //     credentials: true,
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
// // };

// // app.use(cors(corsOptions));
// // app.options("*", cors(corsOptions));
// // // middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // const PORT = process.env.PORT || 3000;

// // // api's
// // app.use("/api/v1/user", userRoute);
// // app.use("/api/v1/company", companyRoute);
// // app.use("/api/v1/job", jobRoute);
// // app.use("/api/v1/application", applicationRoute);

// // app.listen(PORT, () => {
// //     connectDB();
// //     console.log(`Server running at port ${PORT}`);
// // });

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
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();
const app = express();

// Primary production front-end URL (no trailing slash)
const PROD_FE = process.env.FRONTEND_URL;
// Local development origin
const LOCAL_FE =
    process.env.NODE_ENV !== "production" ? "http://localhost:5173" : null;
// Vercel auto-hostname (preview + prod), e.g. "your-app-xyz.vercel.app"
const VERCEL_FE = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : null;

// Build a whitelist of allowed origins
const allowedOrigins = [PROD_FE, LOCAL_FE, VERCEL_FE].filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        console.log("CORS check for origin:", origin);
        // allow requests with no origin (e.g., curl, Postman)
        if (!origin) return callback(null, true);
        // allow any vercel.app subdomain
        if (origin.endsWith(".vercel.app")) return callback(null, true);
        // allow exact matches
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // otherwise block
        return callback(new Error(`CORS blocked for ${origin}`));
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
};

// Apply CORS middleware
app.use(cors(corsOptions));
// Handle preflight requests on all routes
app.options("*", cors(corsOptions));

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(
        `Server running on port ${PORT} (${process.env.NODE_ENV || "dev"})`
    );
});
