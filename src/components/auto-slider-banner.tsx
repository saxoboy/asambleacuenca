"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaFacebook, FaSquareInstagram, FaSquareXTwitter, FaYoutube, FaTiktok } from "react-icons/fa6";

const videos = [
  "/videos/intro-video.mp4",
]

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // Change video every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-start pt-52">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4 font-display animate-fade-in">
            Iglesia Evangélica <br />Asamblea de Dios Ecuatoriana <br /> Cuenca - Ecuador
          </h1>
        </div>
        <p className="text-xl text-gray-300 text-center my-8 font-body">Sitio en construcción...</p>
      </div>
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 mb-8 px-4">
          <div className="w-full lg:w-1/3 px-4">
            <h2 className="mb-4 font-display text-2xl text-white text-center font-bold">Visítanos en</h2>
            <div className="flex flex-col gap-4 items-center h-full text-white">
              <h4 className="text-xl text-center font-body">Río Cutucu y Rumi Urco <br /> (junto a la central telefónica de Totoracocha)<br />Cuenca - Ecuador</h4>
              <p><span className="text-lg font-bold">Tel:</span> <Link href="tel:+59372861443">07 286 1443</Link></p>
              <p><span className="text-lg font-bold">Cel:</span> <Link href="tel:+593984168551">+593 98 416 8551</Link></p>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4">
            <h2 className="mb-4 font-display text-2xl text-white text-center font-bold">Horarios de Reuniones</h2>
            <div className="flex flex-col gap-4 items-center h-full text-white">
              <p><span className="text-lg font-bold">Domingos:</span> 08h00 - 09h45 - 11h30</p>
              <p><span className="text-lg font-bold">Miércoles:</span> 19h00</p>
              <p><span className="text-lg font-bold">Viernes:</span> 19h00</p>
              <p><span className="text-lg font-bold">Lunes:</span> 14h30 Damas | 19h30 Caballeros</p>
              <p><span className="text-lg font-bold">Sábado:</span> 10h00 Niños | 14h30 Adolescentes | 16h30 Jóvenes</p>
            </div>
          </div>

          <div className="w-full lg:w-1/3 px-4">
            <h2 className="mb-4 font-display text-2xl text-white text-center font-bold">Síguenos en</h2>
            <div className="flex gap-4 justify-center items-center lg:items-stretch">
              <div className="flex flex-row lg:flex-col gap-4">
                <Link href="https://www.facebook.com/asambleacuenca" target="_blank" title="Visítanos en Facebook" className="transition-transform hover:scale-125">
                  <FaFacebook size={32} color="#FFFFFF" />
                </Link>
                <Link href="https://www.youtube.com/asambleacuenca" target="_blank" title="Visítanos en Youtube" className="transition-transform hover:scale-125">
                  <FaYoutube size={32} color="#FFFFFF" />
                </Link>
                <Link href="https://www.instagram.com/asambleacuenca" target="_blank" title="Visítanos en Instagram" className="transition-transform hover:scale-125">
                  <FaSquareInstagram size={32} color="#FFFFFF" />
                </Link>
                <Link href="https://www.tiktok.com/@asambleacuenca" target="_blank" title="Visítanos en TikTok" className="transition-transform hover:scale-125">
                  <FaTiktok size={32} color="#FFFFFF" />
                </Link>
                <Link href="https://x.com/asambleacuenca" target="_blank" title="Visítanos en X" className="transition-transform hover:scale-125">
                  <FaSquareXTwitter size={32} color="#FFFFFF" />
                </Link>
              </div>
              <div className="flex justify-center items-center gap-2 border-l border-white px-4 py-2">
                <h3 className="text-white text-2xl">@AsambleaCuenca</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}