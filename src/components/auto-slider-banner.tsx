"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const images = [
  "/images/intro-video-medium.gif",
]

export function AutoSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // const handleShopClick = () => {
  //   const productSection = document.getElementById("product-section")
  //   if (productSection) {
  //     productSection.scrollIntoView({ behavior: "smooth" })
  //   }
  // }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-100 text-center mb-4">
          Iglesia Evangélica <br /> Asamblea de Dios Ecuatoriana de <br />Cuenca - Ecuador
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8">En construcción...</p>
        <Button size="lg" variant="outline" asChild>
          <Link href="https://www.facebook.com/AsambleaCuenca" target="_blank">
            Visítanos en Facebook
          </Link>
        </Button>
      </div>
    </div>
  )
}