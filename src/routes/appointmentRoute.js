import { Router } from "express";
import {
  book,
  getAll,
  getOne,
  getToday,
  getDoctorToday,
  updateStatus,
  update,
} from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import {authorize} from "../middlewares/roleMiddleware.js";

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Receptionist only
router.post("/", authorize("Receptionist"), book);
router.put("/:id", authorize("Receptionist"), update);

// Receptionist and nurse
router.get("/today", authorize("Receptionist", "Nurse"), getToday);

// Doctor only
router.get("/doctor/today", authorize("Doctor"), getDoctorToday);

// Receptionist and doctor
router.patch("/:id/status", authorize("Receptionist", "Doctor"), updateStatus);

// All roles
router.get("/", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getAll);
router.get("/:id", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getOne);

export default router;