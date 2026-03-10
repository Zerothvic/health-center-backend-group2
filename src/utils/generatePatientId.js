import mongoose from "mongoose";

const generatePatientId = async () => {
  const last = await mongoose.model("Patient")
    .findOne({}, { patientId: 1 })
    .sort({ createdAt: -1 });

  const lastNumber = last
    ? parseInt(last.patientId.split("-")[1])
    : 0;

  return `CHC-${String(lastNumber + 1).padStart(4, "0")}`;
};

export default generatePatientId;