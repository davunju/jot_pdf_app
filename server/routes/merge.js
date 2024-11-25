const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");

const app = express();
const router = express.Router();

router.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const mergePDFs = async (files) => {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdf = await PDFDocument.load(file.buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
};

//route to handle merging
router.post("/merge-pdfs", upload.array("files"), async (req, res) => {
  if (!req.file || req.files.length < 2) {
    return res
      .status(400)
      .send({ error: "At least two PDF files are required." });
  }
  try {
    const mergedPdfBuffer = await mergePDFs(req.files);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");

    res.send(mergedPdfBuffer);
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).send({ error: "Failed to merge PDFs" });
  }
});

app.use("/merge-pdfs", router);

module.exports = router;
