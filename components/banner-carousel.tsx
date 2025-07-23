"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { banners } from "@/data/banners";
import type { JSX } from "react";

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  bgColor: string; // Agar fon rangi rasm bilan birga ishlatilmasa, bu prop kerak bo'lmasligi mumkin
}

export function BannerCarousel(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const slideDuration = 5000;

  const totalBanners = banners.length;

  const startProgressAnimation = useCallback(() => {
    startTimeRef.current = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / slideDuration, 1);
      setProgress(newProgress);

      if (newProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const resetAutoSlide = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setProgress(0);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalBanners);
    }, slideDuration);
    startProgressAnimation();
  }, [totalBanners, startProgressAnimation]);

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentSlide, resetAutoSlide]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % totalBanners);
    resetAutoSlide();
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + totalBanners) % totalBanners);
    resetAutoSlide();
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
    resetAutoSlide();
  };

  const currentScale = 1.15;
  const sideScale = 0.85;
  const sideOffset = 25;
  const offScreenOffset = 150;

  const getTranslateX = (index: number) => {
    if (index === currentSlide) {
      return "-50%";
    } else if (index === (currentSlide - 1 + totalBanners) % totalBanners) {
      return `calc(-50% - ${sideOffset}vw)`;
    } else if (index === (currentSlide + 1) % totalBanners) {
      return `calc(-50% + ${sideOffset}vw)`;
    } else {
      return index < currentSlide
        ? `calc(-50% - ${offScreenOffset}vw)`
        : `calc(-50% + ${offScreenOffset}vw)`;
    }
  };

  return (
    <div className="relative h-[250px] md:h-[320px] overflow-hidden flex items-center justify-center">
      <div className="relative w-full h-full max-w-6xl mx-auto">
        {banners.map((banner, index) => {
          const isCurrent = index === currentSlide;
          const isPrev =
            index === (currentSlide - 1 + totalBanners) % totalBanners;
          const isNext = index === (currentSlide + 1) % totalBanners;

          let currentScaleValue = isCurrent ? currentScale : sideScale;
          let currentOpacity = isCurrent ? 1 : 0.5;
          let currentZIndex = isCurrent ? 30 : isPrev || isNext ? 20 : 0;

          if (!isCurrent && !isPrev && !isNext) {
            currentOpacity = 0;
            currentZIndex = 0;
            currentScaleValue = sideScale;
          }

          const currentShadowClass = isCurrent
            ? "shadow-2xl"
            : isPrev || isNext
            ? "shadow-xl"
            : "shadow-lg";

          return (
            <Link
              key={banner.id}
              href={banner.link}
              className={`absolute top-0 h-full rounded-2xl overflow-hidden transition-all duration-700 ease-in-out 
                w-[80vw] md:w-[600px]`}
              style={{
                left: "50%",
                transform: `translateX(${getTranslateX(
                  index
                )}) scale(${currentScaleValue})`,
                opacity: currentOpacity,
                zIndex: currentZIndex,
                boxShadow:
                  currentShadowClass === "shadow-2xl"
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : currentShadowClass === "shadow-xl"
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              {/* Rasmni fon sifatida joylashtirish */}
              <Image
                src={banner.image || "/placeholder.svg"}
                alt={banner.title}
                fill // Ota elementni to'liq qoplaydi
                className="object-cover -z-10" // Rasmni fon sifatida to'liq qoplash va pastki qatlamga yuborish
                // Opacity qo'shish ixtiyoriy, agar matn yaxshi o'qilmasa kerak bo'lishi mumkin:
                // style={{ opacity: 0.8 }}
              />

              {/* Matn va tugma konteyneri - rasm ustida bo'lishi kerak */}
              <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center p-4 text-white">
                {/* Matn qismi */}
                <div className="flex-1 text-center md:text-left z-10 flex flex-col justify-center items-center md:items-start h-full">
                  <h2 className="text-xl md:text-2xl font-bold mb-1 leading-tight">
                    {banner.title}
                  </h2>
                  <p className="text-sm md:text-base opacity-90 mb-2">
                    {banner.description}
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-primary-foreground"
                  >
                    Ko'proq ma'lumot
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Navigatsiya tugmalari */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      {/* Progressli nuqtalar indikatori */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-40">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 rounded-full bg-white/50 overflow-hidden cursor-pointer transition-colors duration-300`}
            onClick={() => goToSlide(index)}
          >
            {index === currentSlide ? (
              <div
                className="h-full bg-white"
                style={{ width: `${progress * 100}%` }}
              />
            ) : (
              <div className="h-full bg-white/0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
