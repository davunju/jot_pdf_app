const express = require("express");
const cors = require("cors"); // For CORS
const multer = require("multer"); // For file uploads
const { PDFDocument } = require("pdf-lib"); // For merging PDFs

const app = express();
const router = express.Router();

// Enable CORS
app.use(cors());

// Configure Multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// PDF merge function
async function mergePDFs(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdf = await PDFDocument.load(file.buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

// Endpoint for merging PDFs
router.post("/merge-pdfs", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({ error: "At least two PDF files are required." });
  }

  try {
    const mergedPdfBuffer = await mergePDFs(req.files);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
    res.send(mergedPdfBuffer);
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ error: "Failed to merge PDFs" });
  }
});

app.use('/merge-pdfs', router);

module.exports = router;