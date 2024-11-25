import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const CompressFiles = () => {
  const [file, setFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files([0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setFile([...file, ...acceptedFiles]);
    },
  });

  const handleCompressPDF = async () => {
    if (!file) {
      alert("Upload a pdf file first.");
      return;
    }
    const formData = new FormData();
    formData.append("pdfFile", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/compress-pdfs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
        }
      );
      const downloadUrl = URL.createObjectURL(new Blob([response.data]));
      setCompressedFile(downloadUrl);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <section className="flex min-h-full items-center justify-center text-slate-700 dark:text-slate-100">
      <section className="my-10 text-center w-full p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-6 mb-4">
          Compress PDF files
        </h1>
        <p className="text-lg md:text-xl mb-4">
          Reduce file size while optimizing for maximal PDF quality.
        </p>
        <section
          {...getRootProps()}
          className="cursor-pointer mb-5 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg p-5 text-lg"
        >
          <input
            {...getInputProps()}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-12 mx-auto text-slate-400 mb-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <p className="text-indigo-500 dark:text-sky-500 font-medium">
            Upload a file
          </p>
          <p>or Drag and drop pdf files here</p>
        </section>
        <button
          onClick={handleCompressPDF}
          className="text-2xl bg-gradient-to-r mb-5 from-red-500 to-slate-600 text-white font-medium py-4 rounded-lg w-1/2"
        >
          Compress PDFs
        </button>
        {compressedFile && (
          <div>
            <h2>Compress File:</h2>
            <a href={compressedFile} download="compressed.pdf">
              <button>Download Compressed PDF</button>
            </a>
          </div>
        )}
      </section>
    </section>
  );
};

export default CompressFiles;
