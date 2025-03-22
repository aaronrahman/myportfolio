"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarField from "./StarField";

// Sample project data
const projects = [
  { title: "LockedIn", description: "A sleek web app built with React & Next.js.", image: "/project1.jpg", tech: ["React", "Next.js", "TailwindCSS"], details: "This project is a modern, scalable web app using SSR and TailwindCSS." },
  { title: "RL Minesweeper Solver", description: "An AI-powered chatbot using OpenAI API.", image: "/project2.jpg", tech: ["Python", "FastAPI", "GPT-4"], details: "This chatbot leverages OpenAI's API to provide dynamic responses." },
  { title: "SimplySyncly", description: "An interactive WebGL-based site.", image: "/project3.jpg", tech: ["Three.js", "GSAP", "React"], details: "Uses Three.js for immersive 3D experiences and animations." },
  { title: "Harmony AI", description: "Visualizes music data in a sci-fi way.", image: "/project4.jpg", tech: ["Python", "Django", "WebSockets"], details: "Streams and analyzes music frequency data in real-time." },
  { title: "Space-C", description: "A full-stack shopping experience.", image: "/project5.jpg", tech: ["Node.js", "Express", "MongoDB"], details: "Built with a Node.js backend and a secure user authentication system." },
  { title: "Portfolio Website", description: "A portfolio website showcasing my projects.", image: "/project6.jpg", tech: ["Next.js", "TailwindCSS"], details: "Modern portfolio with animations and interactivity." },
  { title: "IWantToListenToEverything", description: "A platform to share music.", image: "/project7.jpg", tech: ["React", "Node.js"], details: "Allows users to listen to curated tracks and share their favorites." },
];

// Get unique tech values from projects
const allTech = Array.from(new Set(projects.flatMap((p) => p.tech)));

// Helper: If there are fewer than count projects, return them; otherwise, return exactly count starting at index.
function getDisplayedProjects(arr: any[], index: number, count: number) {
  if (arr.length < count) return arr;
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[(index + i) % arr.length]);
  }
  return result;
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = selectedTech.length > 0
    ? projects.filter((p) => selectedTech.every((tech) => p.tech.includes(tech)))
    : projects;

  const displayedProjects = getDisplayedProjects(filteredProjects, index, 3);

  // Arrow functions: left arrow calls prevSlide, right arrow calls nextSlide.
  const prevSlide = () => {
    if (filteredProjects.length >= 3) {
      setIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  const nextSlide = () => {
    if (filteredProjects.length >= 3) {
      setIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
    setIndex(0);
    setFlippedIndex(null);
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-stars">
      <StarField />
      <div className="container mx-auto px-6 text-center relative z-10 py-20">
        {/* Animated Title */}
        <motion.h2
          className="mb-12 text-5xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            My Projects
          </span>
        </motion.h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {allTech.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 border border-gray-400 shadow-md 
                ${selectedTech.includes(tech)
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl"
                  : "bg-black/40 text-gray-200 border-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"}`}
            >
              {tech}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-xl text-gray-300">No projects match the selected technologies.</p>
        ) : (
          <div className="relative flex items-center justify-center">
            {filteredProjects.length > 1 && (
              <>
                {/* Left Arrow (calls nextSlide) */}
                <button
                  onClick={nextSlide}
                  className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 p-3 bg-black/60 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition"
                >
                  <ChevronLeft size={36} className="text-white" />
                </button>
                {/* Right Arrow (calls prevSlide) */}
                <button
                  onClick={prevSlide}
                  className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 p-3 bg-black/60 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition"
                >
                  <ChevronRight size={36} className="text-white" />
                </button>
              </>
            )}

            <div className="flex justify-center items-center gap-6">
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project, i) => (
                  <motion.div
                    key={project.title + "_" + index + "_" + i}
                    initial={{ opacity: 0, scale: 0.95, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, x: -50 }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    className="relative rounded-2xl p-6 shadow-2xl w-[300px] h-[420px] transition-all duration-500 perspective-1000 cursor-pointer group mx-4"
                    onClick={() => setFlippedIndex(flippedIndex === i ? null : i)}
                    style={{
                      background: "url('/noise.png'), linear-gradient(135deg, #2e2e2e, #1a1a1a)",
                      backgroundSize: "cover",
                      backgroundBlendMode: "overlay",
                      borderWidth: "5px",
                      borderStyle: "solid",
                      borderImage: "linear-gradient(135deg, rgba(255,0,150,0.8), rgba(0,229,255,0.8)) 1",
                    }}
                  >
                    <motion.div
                      className="relative w-full h-full transform-style-3d"
                      animate={{ rotateY: flippedIndex === i ? 360 : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {/* Front Side */}
                      <motion.div
                        className={`absolute w-full h-full backface-hidden flex flex-col items-center justify-center ${
                          flippedIndex === i ? "hidden" : "block"
                        }`}
                      >
                        <Image src={project.image} width={280} height={150} alt={project.title} className="rounded-lg mb-4 shadow-md" />
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-gray-300 mt-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tech.map((tech) => (
                            <span key={tech} className="bg-black/40 px-3 py-1 rounded text-xs font-bold text-gray-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                      {/* Back Side */}
                      <motion.div
                        className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center text-center p-4 rounded-2xl bg-gradient-to-br from-purple-800 to-pink-700 shadow-xl transform rotateY-180"
                        style={{ display: flippedIndex === i ? "flex" : "none" }}
                      >
                        <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-200">{project.details}</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}