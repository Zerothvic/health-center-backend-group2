import PDFDocument from "pdfkit";


//  Generate Invoice PDF

const generateInvoicePDF = (invoice, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers for PDF download
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`
  );
  res.setHeader("Content-Type", "application/pdf");

  // Pipe PDF to response
  doc.pipe(res);

  
  //  Header
  
  doc.fontSize(20).text("Community Health Centre", { align: "center" });
  doc.fontSize(12).text("123 Health Street, Lagos, Nigeria", { align: "center" });
  doc.moveDown();

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  
  //  Invoice Title
 
  doc.fontSize(16).text("MEDICAL INVOICE", { align: "center" });
  doc.moveDown();

  
  //  Invoice Details
  
  doc.fontSize(12).text(`Invoice No:  ${invoice.invoiceNumber}`);
  doc.text(`Date:        ${new Date(invoice.createdAt).toLocaleDateString()}`);
  doc.text(`Patient:     ${invoice.patient.fullName}`);
  doc.text(`Patient ID:  ${invoice.patient.patientId}`);
  doc.text(`Phone:       ${invoice.patient.phone}`);

  if (invoice.dueDate) {
    doc.text(`Due Date:    ${new Date(invoice.dueDate).toLocaleDateString()}`);
  }

  doc.moveDown();

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

 
  //  Items Table Header
  
  doc.fontSize(12).font("Helvetica-Bold");
  doc.text("Description",  50,  doc.y);
  doc.text("Qty",          300, doc.y);
  doc.text("Unit Price",   360, doc.y);
  doc.text("Total",        460, doc.y);
  doc.moveDown(0.5);

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(0.5);

  
  //  Items Table Rows
  
  doc.font("Helvetica");
  invoice.items.forEach((item) => {
    const y = doc.y;
    doc.text(item.description,              50,  y);
    doc.text(String(item.quantity),         300, y);
    doc.text(`₦${item.unitPrice.toFixed(2)}`, 360, y);
    doc.text(`₦${item.total.toFixed(2)}`,   460, y);
    doc.moveDown();
  });

  // Horizontal line
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();

  
  //  Totals Section
  
  doc.font("Helvetica");
  doc.text(`Sub Total:`,  350, doc.y);
  doc.text(`₦${invoice.subTotal.toFixed(2)}`, 460, doc.y);
  doc.moveDown(0.5);

  if (invoice.discount > 0) {
    doc.text(`Discount (${invoice.discount}%):`, 350, doc.y);
    doc.text(`-₦${((invoice.subTotal * invoice.discount) / 100).toFixed(2)}`, 460, doc.y);
    doc.moveDown(0.5);
  }

  if (invoice.tax > 0) {
    doc.text(`Tax (${invoice.tax}%):`, 350, doc.y);
    doc.text(`₦${((invoice.subTotal * invoice.tax) / 100).toFixed(2)}`, 460, doc.y);
    doc.moveDown(0.5);
  }

  doc.font("Helvetica-Bold");
  doc.text(`Total Amount:`, 350, doc.y);
  doc.text(`₦${invoice.totalAmount.toFixed(2)}`, 460, doc.y);
  doc.moveDown(0.5);

  doc.font("Helvetica");
  doc.text(`Amount Paid:`, 350, doc.y);
  doc.text(`₦${invoice.amountPaid.toFixed(2)}`, 460, doc.y);
  doc.moveDown(0.5);

  doc.font("Helvetica-Bold");
  doc.text(`Balance:`, 350, doc.y);
  doc.text(`₦${invoice.balance.toFixed(2)}`, 460, doc.y);
  doc.moveDown();

  
  //  Payment Status
  
  doc.font("Helvetica-Bold")
    .fontSize(14)
    .text(`Payment Status: ${invoice.paymentStatus.toUpperCase()}`, {
      align: "center",
    });

  doc.moveDown();

  
  //  Footer
  
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();
  doc.font("Helvetica")
    .fontSize(10)
    .text("Thank you for choosing Community Health Centre.", {
      align: "center",
    });
  doc.text("For enquiries contact: info@healthcentre.com", {
    align: "center",
  });

  doc.end();
};

export default generateInvoicePDF;