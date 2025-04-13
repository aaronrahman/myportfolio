"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaFileAlt } from "react-icons/fa";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      id="contact"
      className="p-10 text-white bg-stars relative overflow-hidden"
    >
      {/* Heading */}
      <motion.h2
        className="mb-12 text-4xl font-bold text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Get in Touch
        </span>
      </motion.h2>

      {/* Contact Buttons Bar */}
      <motion.div
  className="flex flex-wrap justify-center items-center gap-7 bg-stars bg-center bg-cover p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-md"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <ContactButton
    href="mailto:aaronsrahman@gmail.com"
    icon={<FaEnvelope size={20} />}
    label="Email "
  />
  <ContactButton
    href="https://www.linkedin.com/in/aaronrahman/"
    icon={<FaLinkedin size={20} />}
    label="LinkedIn"
  />
  <ContactButton
    href="https://github.com/aaronrahman"
    icon={<FaGithub size={20} />}
    label="GitHub"
  />
  <motion.button
    onClick={openModal}
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg shadow-md text-white font-medium hover:bg-white/20 transition"
  >
    <FaFileAlt size={20} />
    Resume
  </motion.button>
</motion.div>


      {/* Resume Modal */}
      <AnimatePresence>
        {isModalOpen && <ResumeModal onClose={closeModal} />}
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
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg shadow-md text-white font-medium hover:bg-white/20 transition"
  >
    {icon}
    {label}
  </motion.a>
);

const ResumeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-6 relative w-full max-w-4xl h-[80vh]"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 font-bold text-2xl"
        >
          &times;
        </button>
        <iframe
          src="/Aaron_Rahman_Resume.pdf"
          title="Resume"
          className="w-full h-full rounded-xl"
          style={{ border: "none" }}
        ></iframe>
        <div className="mt-4 text-right">
          <a
            href="/Aaron_Rahman_Resume.pdf"
            download="Aaron_Rahman_Resume.pdf"
            className="inline-block bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Download PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
