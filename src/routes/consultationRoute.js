import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  getByPatient,
  getByDoctor,
  update,
  updateVitals,
} from "../controllers/consultationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import {authorize} from "../middlewares/roleMiddleware.js";

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Doctor only
router.post("/", authorize("Doctor"), create);
router.put("/:id", authorize("Doctor"), update);
router.get("/doctor", authorize("Doctor"), getByDoctor);

// Nurse only
router.patch("/:id/vitals", authorize("Nurse"), updateVitals);

// Receptionist, nurse and doctor
router.get("/patient/:patientId", authorize("Receptionist", "Nurse", "Doctor"), getByPatient);

// All roles
router.get("/", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getAll);
router.get("/:id", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getOne);

export default router;