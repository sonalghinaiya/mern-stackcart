import React, { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    title: "Discover Your\nNext Favorite Thing",
    subtitle:
      "Curated collections with unbeatable prices. Free shipping on orders over ₹500.",
    cta: "Shop Now",
    bg: "from-indigo-900 via-indigo-800 to-purple-900",
    accent: "bg-indigo-500",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
  },
  {
    title: "Summer Collection\nis Here",
    subtitle: "Fresh styles for the season. Up to 40% off on selected items.",
    cta: "Explore",
    bg: "from-rose-900 via-rose-800 to-orange-800",
    accent: "bg-rose-500",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop",
  },
  {
    title: "Tech Essentials\nUpgraded",
    subtitle: "The latest gadgets at the best prices. New arrivals every week.",
    cta: "Discover Tech",
    bg: "from-slate-900 via-slate-800 to-cyan-900",
    accent: "bg-cyan-500",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index);

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto p-8">
        <div
          className="relative h-[560px] md:h-[640px] overflow-hidden rounded-2xl"
          ref={emblaRef}
        >
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full relative h-full">
                <img src={slide.image} className="w-full h-full object-cover" />

                <div
                  className={`absolute inset-0 bg-linear-to-r ${slide.bg} opacity-80`}
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div
                      className={`${slide.accent} text-white inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-widest`}
                    >
                      New Arrivals 2026
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-5 whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">
                      {slide.subtitle}
                    </p>

                    <button
                      onClick={() => navigate("/products")}
                      className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex ? "bg-white w-6" : "bg-white/40 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
