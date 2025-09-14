"use client";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import StarField from "./StarField";

export default function Hero() {
  const { scrollY } = useViewportScroll();

  // Animate the headshot: scale from 1 to 0.5, fade out as you scroll from 0 to 200px
  const headshotScale = useTransform(scrollY, [0, 200], [1, 0.5]);
  const headshotOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Star Field Background */}
      <StarField />

      <div className="relative z-10 flex flex-col items-center text-center p-8">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold tracking-tight text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, rotateX: 10, rotateY: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Hey, I&apos;m Aaron!
        </motion.h1>

        <motion.p
          className="mt-4 text-2xl text-gray-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome to my universe 🪐 Scroll down to learn more about me and who I am!
        </motion.p>

        {/* Headshot as a "window" */}
        <motion.div
          style={{ scale: headshotScale, opacity: headshotOpacity }}
          className="mt-6 w-64 h-64 rounded-full border-6 border-white shadow-lg overflow-hidden "
        >
          <motion.img
            src="/aaronHeadshot.jpg"
            alt="Photo of Aaron"
            className="object-cover w-full h-full"
          />
        </motion.div>



        <motion.div
          className="mt-10 animate-bounce text-gray-400 text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
