"use client"

import { useEffect, useState } from "react";

const videos = ["/videos/intro-video.mp4"];

const HeroMain = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // Change video every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
      <div>
        {videos.map((src, index) => (
          <div
            key={src}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              preload="auto"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center">
        <div className="mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4 font-display animate-fade-in">
            Iglesia Evangélica <br />Asamblea de Dios Ecuatoriana <br /> Cuenca - Ecuador
          </h1>
        </div>
      </div>
    </div>
  )
}

export default HeroMain