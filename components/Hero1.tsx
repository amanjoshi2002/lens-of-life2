'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

interface HeroProps {
  pageTitle: string;
  slides: Slide[];
}

const defaultSlides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070',
    title: 'Capturing Timeless Moments',
    subtitle: 'A professional lens that preserves your emotions forever.',
  },
  {
    image: '/images/hero/destinationwedding.jpg',
    title: 'Every Picture Tells a Story',
    subtitle: 'Crafting visual poetry through my camera lens.',
  },
  {
    image: '/images/hero/pre wed.jpg',
    title: 'Cherishing Beautiful Memories',
    subtitle: 'Your most precious moments, captured in perfect detail.',
  },
];

export default function HeroSlider({ pageTitle, slides = defaultSlides }: HeroProps) {
  return (
    <div className="relative w-full pt-16">
      <div className="relative h-[80vh] w-full">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover brightness-50"
                  priority
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                    {pageTitle}
                  </h1>
                  <h6 className="text-3xl md:text-5xl font-serif animate-fadeIn">{slide.title}</h6>
                  <p className="text-lg md:text-xl max-w-2xl animate-fadeIn">{slide.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
