const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const archiver = require("archiver");
const { error } = require("console");

const app = express();
const router = express.Router();

router.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

router.post("/split-pdfs", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("Received files:", req.files);
      return res.status(400).send({ error: "No file uploaded" });
    }

    //Load the uploaded pdfs
    const pdfBytes = req.file.buffer;
    const pdfDoc = await PDFDocument.load(pdfBytes);

    //Split pages into individual pdfs
    const numPages = pdfDoc.getPages().length;
    const zipStream = archiver("zip", { zlib: { level: 9 } });
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename='split_pdfs.zip'"
    );
    zipStream.pipe(res);

    for (let i = 0; i < numPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPages] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPages);
      const pageBytes = await newPdf.save();
      const pageBuffer = Buffer.from(pageBytes);
      zipStream.append(pageBuffer, { name: `Split_Page_${i + 1}.pdf` });
    }

    zipStream.on("error", (err) => {
      console.error("ZIP stream error:", err);
      res.status(500).send({ error: "Failed to create ZIP" });
    });

    zipStream.finalize();
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).send({ error: "Failed to process PDF" });
  }
});

app.use("/split-pdfs", router);

module.exports = router;
