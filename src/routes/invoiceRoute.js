import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  getByPatient,
  getUnpaid,
  payment,
  update,
  downloadPDF,
} from "../controllers/invoiceController.js";
import {authenticate} from "../middlewares/authMiddleware.js";
import {authorize} from "../middlewares/roleMiddleware.js";

const router = Router();

// Apply authentication to all routes
router.use(authenticate);

// Accountant only
router.post("/", authorize("Accountant"), create);
router.put("/:id", authorize("Accountant"), update);
router.patch("/:id/payment", authorize("Accountant"), payment);
router.get("/unpaid", authorize("Accountant"), getUnpaid);
router.get("/patient/:patientId", authorize("Accountant"), getByPatient);
router.get("/", authorize("Accountant"), getAll);
router.get("/:id", authorize("Accountant"), getOne);
router.get("/:id/pdf", authorize("Accountant"), downloadPDF);

export default router;