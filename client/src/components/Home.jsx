import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const links = [
    {
      logo: "/assets/merge.svg",
      name: "Merge PDF",
      description:
        "Combin PDFs in the order you want with the easiest PDF merger available.",
      href: "merge_files",
    },
    {
      logo: "/assets/split.svg",
      name: "Split PDF",
      description:
        "Separate one page or a whole set for easy conversion into independent PDF files.",
      href: "split_files",
    },
    {
      logo: "/assets/compress.svg",
      name: "Compress PDF",
      description: "Reduce file size while optimizing for maximal PDF quality.",
      href: "compress_files",
    },
    {
      logo: "/assets/pdf-word.png",
      name: "PDF to Word",
      description:
        "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
      href: "",
    },
    {
      logo: "/assets/pdf-ppt.png",
      name: "PDF to PowerPoint",
      description:
        "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
      href: "",
    },
    {
      logo: "/assets/pdf-excel.svg",
      name: "PDF to Excel",
      description:
        "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
      href: "",
    },
    {
      logo: "/assets/word-pdf.png",
      name: "Word to PDF",
      description:
        "Make DOC and DOCX files easy to read by converting them to PDF.",
      href: "",
    },
    {
      logo: "/assets/ppt-pdf.png",
      name: "PowerPoint to PDF",
      description:
        "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
      href: "",
    },
    {
      logo: "/assets/edit-pdf.png",
      name: "Edit PDF",
      description:
        "Add text, images, shapes or freehand annotations to a PDF document. Edit the size, font, and color of the added content.",
      href: "",
    },
  ];
  return (
    <section className="flex min-h-full justify-center items-center text-slate-700 dark:text-slate-100 dark:bg-slate-800">
      <section className="w-full text-center px-5 max-w-6xl mx-auto py-12">
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-red-700 to-slate-700 dark:from-sky-500 dark:via-slate-400 dark:to-slate-300 p-2">
          Streamline Your PDF Management with Ease
        </h1>
        <p className="text-pretty text-lg md:text-2xl mt-6">
          Welcome to{" "}
          <span className="text-xl md:text-2xl text-red-700 dark:text-sky-500 font-semibold">
            JoT PDF Tool
          </span>
          , your comprehensive solution for managing PDFs seamlessly and
          efficiently. Designed with simplicity and productivity in mind,
          empowers your daily judicial documentation to optimize document
          workflows, save time, and reduce manual effort.
        </p>
        <section className="my-10 max-w-7xl">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {links.map((link, index) => (
              <Link key={index} to={link.href}>
                <li className="ring-1 ring-inset ring-gray-200 dark:ring-slate-600 p-5 text-start space-y-4 rounded-md h-full">
                  <img src={link.logo} className="size-10" />
                  <h1 className="font-semibold text-lg md:text-xl">
                    {link.name}
                  </h1>
                  <p>{link.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
};

export default Homepage;
