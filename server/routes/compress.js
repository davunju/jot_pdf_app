const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const JSZip = require("jszip");

const app = express();
const router = express.Router();

// Middleware
app.use(cors());


// Multer configuration to handle in-memory file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Function to compress a single PDF
const compressPDF = async (fileBuffer) => {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
  return compressedPdfBytes;
};

// Route to compress multiple PDF files
router.post("/compress-pdfs", upload.array("files", 10), async (req, res) => {
  if (!req.files || req.files.length < 2) {
    return res
      .status(400)
      .send({ error: "At least two PDF files are required." });
  }

  try {
    const zip = new JSZip();

    for (const file of req.files) {
      const compressedPdfBuffer = await compressPDF(file.buffer);
      // Add the compressed file to the ZIP archive
      zip.file(file.originalname, compressedPdfBuffer);
    }

    // Generate the ZIP archive
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=compressed_pdfs.zip"
    );
    res.send(zipBuffer);
  } catch (error) {
    console.error("Error compressing PDFs:", error);
    res.status(500).send({ error: "Failed to compress PDFs" });
  }
});

app.use("/compress-pdfs", router);

module.exports = router;
