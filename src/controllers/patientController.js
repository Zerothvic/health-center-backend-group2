import * as patientService from '../services/patientService.js';

    const registerPatient = async (req, res) => {
        try {
            // Validation to ensure the body isn't empty
            if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Patient data is required' 
            });
            }

            // Passing the body to the service
            const newPatient = await patientService.createPatient(req.body);

            res.status(201).json({
            message: 'Patient registered successfully',
            data: newPatient
            });

        } catch (error) {
            res.status(400).json({
            success: false,
            message: error.message || 'Internal Server Error'
            });
        }
    };


    const searchPatients = async (req, res) => {
        try {
            // Get search query (e.g., ?q=John)
            const { q } = req.query;

            const patients = await patientService.findPatients(q);

            if (patients.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No patients match your search criteria',
                count: 0,
                data: []
            });
            }

            res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
            });
        } catch (error) {
            res.status(500).json({
            success: false,
            message: 'Error connecting to the database during search'
            });
        }
    };

export {
    registerPatient,
    searchPatients
}