import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  search,
  update,
  remove,
} from "../controllers/patientController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import {authorize} from "../middlewares/roleMiddleware.js";

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Receptionist only
router.post("/", authorize("Receptionist"), create);
router.put("/:id", authorize("Receptionist"), update);
router.delete("/:id", authorize("Receptionist"), remove);

// All staff roles
router.get("/search", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), search);
router.get("/", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getAll);
router.get("/:id", authorize("Receptionist", "Nurse", "Doctor", "Accountant"), getOne);

router.post("/", authorize("Receptionist"), async (req, res, next) => {
  console.log("=== HIT POST /patients ===");
  console.log("user:", req.user);
  console.log("body:", req.body);
  try {
    const patient = await createPatient(req.body, req.user.id);
    console.log("=== PATIENT CREATED ===");
    res.status(201).json(patient);
  } catch (error) {
    console.log("=== ERROR ===", error);
    next(error);
  }
});

export default router;