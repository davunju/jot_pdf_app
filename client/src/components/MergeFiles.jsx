import React, { useState } from "react";
import axios from "axios";

const MergeFiles = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file input changes
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convert FileList to an array
  };

  // Merge files on button click
  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least two PDF files.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://localhost:5000/merge-pdfs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // Expect a binary response
      });

      // Create a link to download the merged PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "merged.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-full items-center justify-center text-slate-700 dark:text-slate-100 dark:bg-slate-800">
      <section className="my-10 text-center w-full p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-6 mb-4">
          Merge PDF Files
        </h1>
        <p className="text-lg md:text-xl mb-4">
          Combine PDFs in the order you want with the easiest PDF merger available.
        </p>
        <section className="cursor-pointer mb-4 border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg p-8 text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-12 mx-auto text-slate-400 mb-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <label htmlFor="files">
            <input
              type="file"
              name="files"
              id="files"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
            <span className="text-indigo-500 dark:text-sky-500 font-medium cursor-pointer">
              Upload PDF files
            </span>
          </label>
          <p>or drag and drop PDF files here</p>
        </section>
        {files.length > 0 && <div className="my-5">
          <h1 className="text-lg font-medium mb-3">Uploaded Files</h1>
        <ul className="flex flex-cols md:flex-rows items-center justify-center flex-wrap gap-3">
          {files.map((file, index) => (
            <li key={index} className="border-2 border-dashed border-gray-200 dark:border-slate-600 rounded-lg p-2">{file.name}</li>
          ))}
        </ul>
        </div>}
        
        
        <button
          onClick={handleMerge}
          className="text-2xl bg-gradient-to-r from-red-500 to-slate-600 text-white font-medium py-4 rounded-lg w-1/2"
          disabled={isLoading}
        >
          {isLoading ? "Merging..." : "Merge PDFs"}
        </button>
      </section>
    </section>
  );
};

export default MergeFiles;
