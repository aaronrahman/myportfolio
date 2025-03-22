"use client";
import { useRef, useEffect } from "react";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseOffset = useRef({ x: 0, y: 0 });
  const stars = useRef<{ x: number; y: number; z: number }[]>([]);
  const canvasSize = useRef({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let { width, height } = canvasSize.current;
    canvas.width = width;
    canvas.height = height;

    
    const numStars = 2000;
    stars.current = [];
    for (let i = 0; i < numStars; i++) {
      stars.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width,
      });
    }

    // Mouse move event to update mouse offset relative to screen center
    const handleMouseMove = (e: MouseEvent) => {
      mouseOffset.current.x = (e.clientX - width / 2) / (width / 2);
      mouseOffset.current.y = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvasSize.current = { width, height };
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";

      stars.current.forEach((star) => {
        // Move the star closer
        star.z -= 1;
        if (star.z <= 0) star.z = width;

        const perspective = width / star.z;
        // Adjust star position with mouse offset (make it more obvious)
        const offsetX = mouseOffset.current.x * 50;
        const offsetY = mouseOffset.current.y * 50;
        const x = (star.x - width / 2) * perspective + width / 2 + offsetX;
        const y = (star.y - height / 2) * perspective + height / 2 + offsetY;
        const size = Math.max(0.5, 2 * (1 - star.z / width));

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]" />;
}