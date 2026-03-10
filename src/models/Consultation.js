import mongoose from "mongoose";
const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chiefComplaint: {
      type: String,
      trim: true,
    },
    symptoms: {
      type: String,
      trim: true,
      required: true,
    },
    diagnosis: {
      type: String,
      trim: true,
      required: true,
    },
    treatmentGiven: {
      type: String,
      trim: true,
    },
    prescription: {
      type: [
        {
          medication: {
            type: String,
            trim: true,
          },
          dosage: {
            type: String,
            trim: true,
          },
          frequency: {
            type: String,
            trim: true,
          },
          duration: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },
    vitalSigns: {
      bloodPressureSystolic: Number,
      bloodPressureDiastolic: Number,
      temperature: Number,
      pulse: Number,
      weight: Number,
      height: Number,
    },
    labTests: {
      type: String,
      trim: true,
    },
    referral: {
      referred: {
        type: Boolean,
        default: false,
      },
      referredTo: {
        type: String,
        trim: true,
      },
      referralNotes: {
        type: String,
        trim: true,
      },
    },
    followUpRecommended: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
    },
    attendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Consultation = mongoose.model("Consultation", consultationSchema);
export default Consultation;