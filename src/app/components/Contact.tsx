"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative p-12 text-white bg-stars bg-cover bg-center overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="mb-12 text-4xl md:text-5xl font-bold text-center tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Get in Touch
        </span>
      </motion.h2>

      {/* Contact Buttons */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-6 p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ContactButton
          href="mailto:aaronsrahman@gmail.com"
          icon={<FaEnvelope size={22} />}
          label="Email"
        />
        <ContactButton
          href="https://www.linkedin.com/in/aaronrahman/"
          icon={<FaLinkedin size={22} />}
          label="LinkedIn"
        />
        <ContactButton
          href="https://github.com/aaronrahman"
          icon={<FaGithub size={22} />}
          label="GitHub"
        />
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-black font-bold shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FaFileAlt size={20} />
          Resume
        </motion.button>
      </motion.div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isModalOpen && <ResumeModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

const ContactButton = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.96 }}
    className="flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-black 
               bg-gradient-to-r from-purple-500 to-blue-500 
               shadow-lg hover:shadow-xl transition-all duration-300"
    style={{
      backgroundClip: "padding-box",
    }}
  >
    {icon}
    {label}
  </motion.a>
);

const ResumeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-5xl h-[80vh] bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white text-3xl font-bold hover:text-pink-400 transition"
        >
          &times;
        </button>

        {/* Resume */}
        <iframe
          src="/Aaron_Rahman_Resume.pdf"
          title="Resume"
          className="w-full h-full rounded-b-2xl"
          style={{ border: "none" }}
        ></iframe>

        {/* Download Button */}
        <div className="absolute bottom-4 right-4">
          <a
            href="/Aaron_Rahman_Resume.pdf"
            download="Aaron_Rahman_Resume.pdf"
            className="inline-block px-5 py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
