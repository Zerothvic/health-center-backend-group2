import mongoose from "mongoose";

const generateInvoiceNumber = async () => {
  const last = await mongoose.model("Invoice")
    .findOne({}, { invoiceNumber: 1 })
    .sort({ createdAt: -1 });

  const lastNumber = last
    ? parseInt(last.invoiceNumber.split("-")[1])
    : 0;

  return `INV-${String(lastNumber + 1).padStart(4, "0")}`;
};

export default generateInvoiceNumber;