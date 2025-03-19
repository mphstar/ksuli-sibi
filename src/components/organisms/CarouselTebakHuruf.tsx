import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Nama",
    description:
      "Masukkan nama Anda untuk memulai. Nama Anda akan digunakan untuk personalisasi pengalaman Anda selama menggunakan aplikasi ini.",
    image: "/assets/images/susun_1.svg",
    button: "Next",
  },
  {
    title: "Tebak Huruf",
    description:
      "Tebak huruf sesuai soal yang ditampilkan.",
    image: "/assets/images/susun_2.svg",
    button: "Next",
  },
  {
    title: "Proses Jawaban",
    description:
      "Tahan tangan Anda di depan kamera sampai proses selesai dan tampil dialog benar atau tidaknya jawaban.",
    image: "/assets/images/susun_3.svg",
    button: "Next",
  },
  {
    title: "Score",
    description:
      "Raih skor tertinggimu dengan menyelesaikan tugas dengan cepat dan tepat. Skor Anda akan dibandingkan dengan pengguna lain di papan peringkat.",
    image: "/assets/images/susun_4.svg",
    button: "Get Started",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-6 pb-20 bg-white rounded-xl shadow-lg">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img src={slide.image} alt={slide.title} className="h-60" />
                {/* <h2 className="mt-4 text-xl font-bold">{slide.title}</h2> */}
                <p className="mt-8 text-gray-800 text-sm">
                  {slide.description}
                </p>
                {/* <button
                  onClick={nextSlide}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md"
                >
                  {slide.button}
                </button> */}
              </motion.div>
            )
        )}
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full ${
              index === current ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-base-100 text-gray-600 p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-base-100 text-gray-600 p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
