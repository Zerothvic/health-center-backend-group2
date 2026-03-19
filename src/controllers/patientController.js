import {
  createPatient,
  getAllPatients,
  getPatientById,
  searchPatients,
  updatePatient,
  deletePatient,
} from "../services/patientService.js";


export const create = async (req, res) => {
  try {
    const patient = await createPatient(req.body, req.user.id);
    res.status(201).json({
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json({
      message: "All patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const getOne = async (req, res) => {
  try {
    const patient = await getPatientById(req.params.id);
    res.status(200).json({
      message: "Patient retrieved successfully",
      data: patient,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    const patients = await searchPatients(q);
    res.status(200).json({
      message: "Search results retrieved successfully",
      data: patients,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const update = async (req, res) => {
  try {
    const patient = await updatePatient(req.params.id, req.body);
    res.status(200).json({
      message: "Patient updated successfully",
      data: patient,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    const patient = await deletePatient(req.params.id);
    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};