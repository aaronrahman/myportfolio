"use client";
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StarField from "./StarField";
import React from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  details: string;
};

const projects: Project[] = [
  { 
    title: "LockedIn", 
    description: "An all-in-one study app", 
    image: "/LockedIn.png", 
    tech: ["Streamlit", "Python", "Mediapipe", "Google Vertex Gen AI", "Google Cloud", "HTML"], 
    details: "Boost your productivity with our all-in-one study app! Featuring an AI study buddy, posture tracking, and stretch reminders to keep you focused, healthy, and on track to reach your goals. \n https://devpost.com/software/lockedin-k35v4y" 
  },
  { 
    title: "NBA Playoff Predictor", 
    description: "An NBA playoff predictor trained using XGBoost and a curated dataset", 
    image: "/nbaBracket.jpeg", 
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "XGBoost", "Google Colab"], 
    details: "Predicted the outcome of NBA first-round playoffs with 71% accuracy by leveraging individual player statistics rather than traditional team-level data, providing a more granular approach to game prediction" 
  },
  { 
    title: "SimplySyncly", 
    description: "A way for students to link their schedules with their friends!", 
    image: "/simplySyncly.png", 
    tech: ["C", "Qt", "Google Test"], 
    details: "By automatically syncing users' work, study, and extracurricular calendars, the app makes it easier to identify mutually available times for socializing while ensuring users stay on top of their responsibilities." 
  },
  { 
    title: "Harmony AI", 
    description: "Harmony AI is a therapeutic speech-to-text chatbot that replies to you using text-to-speech.", 
    image: "/harmonyAI.png", 
    tech: ["Typescript", "Next.js", "Node.js", "React"], 
    details: "Harmony AI is a cutting-edge speech-to-text therapy bot that is designed to provide mental health support to individuals who may be struggling with the isolation and stress caused by the pandemic. The bot is trained to understand and respond to spoken language in real-time, allowing users to have a more natural and conversational experience with the AI." 
  },
  { 
    title: "Space C", 
    description: "An educational space-themed children's game", 
    image: "/spaceC.png", 
    tech: ["Java", "JavaFX"], 
    details: "Space C is an engaging space-themed game designed to provide users with an entertaining platform to explore and deepen their understanding of the solar system" 
  },
  { 
    title: "Portfolio Website", 
    description: "A portfolio website showcasing me, Aaron!", 
    image: "/portfolio.png", 
    tech: ["Next.js", "Typescript", "TailwindCSS", "React", "Spotify API", "Vercel"], 
    details: "My portfolio that showcases my projects, the places I've traveled to, and the music in my life!" 
  },
  { 
    title: "IWantToListenToEverything", 
    description: "A spotify playlist that showcases every song I've ever listened to", 
    image: "/iWantToListenToEverything.png", 
    tech: ["Javascript", "Spotify API"], 
    details: "I want to listen to as much music as possible, but I also wanted to be able to keep track of every song I've ever listened to. To solve this, I coded a solution that adds any song I listen to on Spotify into this playlist." 
  },
];

// Get unique tech values from projects
const allTech = Array.from(new Set(projects.flatMap((p) => p.tech)));

// For OR logic: Filter projects if at least one tech is included.
function filterProjects(arr: Project[], selectedTech: string[]): Project[] {
  if (selectedTech.length === 0) return arr;
  return arr.filter((p) => selectedTech.some((tech) => p.tech.includes(tech)));
}

// Helper: If there are fewer than count projects, return them; otherwise, return exactly count starting at index.
function getDisplayedProjects(arr: Project[], index: number, count: number): Project[] {
  if (arr.length <= count) return arr;
  return Array.from({ length: count }, (_, i) => arr[(index + i) % arr.length]);
}

// Helper function to parse project.details text and convert URLs into clickable links.
function parseDetails(details: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = details.split(urlRegex);
  return parts.map((part, idx) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-300 break-words"
        >
          {part}
        </a>
      );
    }
    return <span key={idx} className="break-words">{part}</span>;
  });
}

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const filteredProjects = filterProjects(projects, selectedTech);
  const displayedProjects = getDisplayedProjects(filteredProjects, index, 3);

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
          {allTech.map((tech: string) => (
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

        {/* Only show arrows if there are more than 3 projects */}
        <div className="relative flex items-center justify-center">
          {filteredProjects.length > 3 && (
            <>
              {/* Left Arrow (calls nextSlide) */}
              <button
                onClick={prevSlide}
                className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 p-3 bg-black/60 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition"
              >
                <ChevronLeft size={36} className="text-white" />
              </button>
              {/* Right Arrow (calls prevSlide) */}
              <button
                onClick={nextSlide}
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
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {project.tech.map((tech: string, idx: number) => (
                          <span key={idx} className="bg-black/40 px-3 py-1 rounded text-xs font-bold text-gray-200">
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
                      <h3 className="text-lg font-bold text-black mb-3">{project.title}</h3>
                      <div className="text-gray-200 font-bold max-w-[200px] text-xs">
                        {parseDetails(project.details)}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
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