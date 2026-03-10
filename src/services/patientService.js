import Patient from '../models/Patient.js';
import { connectDB } from '../config/db.js'; 


const createPatient = async (patientData) => {
    const { email } = patientData;
    const existingPatient = await Patient.findOne({ email });
    
    if (existingPatient) {
        throw new Error('A patient with this email is already registered.');
    }

    // Prepare the new patient object
    const newPatientData = {
        patientId: `PAT-${Date.now()}`, 
        ...patientData,
        createdAt: new Date()
    };

    // Save to DB and return the result
    const savedPatient = await Patient.create(newPatientData);  
    return savedPatient;
};


const findPatients = async (query) => {
    if (!query) {
        return await Patient.find({});
    }

    // This creates a "fuzzy" search for name OR phone using MongoDB Regex
    return await Patient.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { phone: { $regex: query, $options: 'i' } }
        ]
    });
};

export {
    createPatient,
    findPatients
};