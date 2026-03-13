import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Discover Your\nNext Favorite Thing",
    subtitle:
      "Curated collections with unbeatable prices. Free shipping on orders over $50.",
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
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % slides.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div className="pt-20">
      <div className="relative h-[520px] md:h-[640px] max-w-6xl mx-auto overflow-hidden md:rounded-2xl">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${s.bg} opacity-80`}
            />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <div
                className={`inline-block ${slide.accent} text-white text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-widest uppercase`}
              >
                New Arrivals 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5 whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">
                {slide.subtitle}
              </p>
              {/* <a
             onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {slide.cta} <ArrowRight className="w-4 h-4" />
            </a> */}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6" : "bg-white/40 w-2"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() =>
            setCurrent((c) => (c - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => setCurrent((c) => (c + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const slides = [
//   {
//     title: "Discover Your\nNext Favorite Thing",
//     subtitle: "Curated collections with unbeatable prices. Free shipping on orders over $50.",
//     cta: "Shop Now",
//     bg: "from-indigo-900 via-indigo-800 to-purple-900",
//     accent: "bg-indigo-500",
//     image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
//   },
//   {
//     title: "Summer Collection\nis Here",
//     subtitle: "Fresh styles for the season. Up to 40% off on selected items.",
//     cta: "Explore",
//     bg: "from-rose-900 via-rose-800 to-orange-800",
//     accent: "bg-rose-500",
//     image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop",
//   },
//   {
//     title: "Tech Essentials\nUpgraded",
//     subtitle: "The latest gadgets at the best prices. New arrivals every week.",
//     cta: "Discover Tech",
//     bg: "from-slate-900 via-slate-800 to-cyan-900",
//     accent: "bg-cyan-500",
//     image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
//   },
// ];

// export default function Hero() {
//   const [current, setCurrent] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   const slide = slides[current];

//   return (
//     <div className="pt-16">
//       <div className="relative h-[520px] md:h-[600px] max-w-7xl mx-auto overflow-hidden md:rounded-2xl">

//         {/* Slides */}
//         {slides.map((s, i) => (
//           <div
//             key={i}
//             className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
//           >
//             <img src={s.image} alt="" className="w-full h-full object-cover" />
//             <div className={`absolute inset-0 bg-gradient-to-r ${s.bg} opacity-75`} />
//           </div>
//         ))}

//         {/* Content */}
//         <div className="relative z-10 h-full flex items-center">
//           <div className="max-w-7xl mx-auto px-8 lg:px-12 w-full">
//             <div className="max-w-lg">

//               {/* Badge */}
//               <div
//                 className={`inline-flex items-center gap-1.5 ${slide.accent} text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-widest uppercase`}
//               >
//                 <span className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
//                 New Arrivals 2026
//               </div>

//               {/* Title */}
//               <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.1] mb-5 whitespace-pre-line tracking-tight">
//                 {slide.title}
//               </h1>

//               {/* Subtitle */}
//               <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed max-w-sm">
//                 {slide.subtitle}
//               </p>

//               {/* CTA */}
//               <button
//                 onClick={() => navigate("/products")}
//                 className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200 shadow-lg text-sm"
//               >
//                 {slide.cta}
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Nav arrows */}
//         <button
//           onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
//           className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
//         >
//           <ChevronLeft className="w-5 h-5 text-white" />
//         </button>
//         <button
//           onClick={() => setCurrent((c) => (c + 1) % slides.length)}
//           className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
//         >
//           <ChevronRight className="w-5 h-5 text-white" />
//         </button>

//         {/* Dots */}
//         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//           {slides.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrent(i)}
//               className={`h-1.5 rounded-full transition-all duration-300 ${
//                 i === current ? "bg-white w-6" : "bg-white/40 w-1.5"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
