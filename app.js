import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import logRequest from "./src/middlewares/logger.js";
import errorHandler from "./src/middlewares/errorHandler.js";

import authRoutes         from "./src/routes/authRoute.js";
import userRoutes         from "./src/routes/userRoute.js";
import patientRoutes      from "./src/routes/patientRoute.js";
import appointmentRoutes  from "./src/routes/appointmentRoute.js";
import consultationRoutes from "./src/routes/consultationRoute.js";
import invoiceRoutes      from "./src/routes/invoiceRoute.js";
import dashboardRoutes    from "./src/routes/dashboardRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth",          authRoutes);
app.use("/api/users",         userRoutes);        // ✅ added
app.use("/api/patients",      patientRoutes);
app.use("/api/appointments",  appointmentRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/invoices",      invoiceRoutes);
app.use("/api/dashboard",     dashboardRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Health Centre API is running" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler); 

export default app;