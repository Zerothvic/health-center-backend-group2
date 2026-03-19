import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { register, login, logout } from '../controllers/authController.js';
import { getDashboard } from '../controllers/dashboardController.js';
import {
  createConsultation,
  getAllConsultations,
  getConsultationById,
} from '../services/consultationService.js';
import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from '../services/patientService.js';

const router = Router();

// ─── Health Check ────────────────────────────────────────────────────────────

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Staff API is active' });
});

// ─── Public Auth Routes ───────────────────────────────────────────────────────

router.post('/register', register);
router.post('/login', login);

// ─── Protected Routes (require valid JWT) ────────────────────────────────────

router.use(authenticate);

router.post('/logout', logout);

// ─── Dashboard ────────────────────────────────────────────────────────────────

router.get(
  '/dashboard',
  authorize('Receptionist', 'Nurse', 'Doctor', 'Accountant'),
  getDashboard
);

// ─── Patient Management ───────────────────────────────────────────────────────

// Create patient
router.post('/patients', authorize('Receptionist', 'Nurse'), async (req, res, next) => {
  try {
    const patient = await createPatient(req.body, req.user.id);
    res.status(201).json({
      message: 'Patient registered successfully',
      data: patient,
    });
  } catch (error) {
    next(error);
  }
});

// Get all patients
router.get('/patients', authorize('Receptionist', 'Nurse', 'Doctor'), async (req, res, next) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
});

// Get patient by ID
router.get('/patients/:id', authorize('Receptionist', 'Nurse', 'Doctor'), async (req, res, next) => {
  try {
    const patient = await getPatientById(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
});

// Update patient
router.put('/patients/:id', authorize('Receptionist', 'Nurse'), async (req, res, next) => {
  try {
    const patient = await updatePatient(req.params.id, req.body);
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
});

// ─── Consultation Routes ──────────────────────────────────────────────────────

// Get all consultations
router.get('/consultations', authorize('Doctor', 'Nurse'), async (req, res, next) => {
  try {
    const consultations = await getAllConsultations();
    res.status(200).json(consultations);
  } catch (error) {
    next(error);
  }
});

// Get consultation by ID
router.get('/consultations/:id', authorize('Doctor', 'Nurse'), async (req, res, next) => {
  try {
    const consultation = await getConsultationById(req.params.id);
    res.status(200).json(consultation);
  } catch (error) {
    next(error);
  }
});

// Create consultation
router.post('/consultations', authorize('Doctor'), async (req, res, next) => {
  try {
    const consultation = await createConsultation(req.body, req.user.id);
    res.status(201).json({
      message: 'Consultation created successfully',
      data: consultation,
    });
  } catch (error) {
    next(error);
  }
});

// ─── Billing ──────────────────────────────────────────────────────────────────

router.get('/billing/summary', authorize('Accountant'), (req, res) => {
  res.json({ message: 'Revenue data loaded' });
});

export default router;