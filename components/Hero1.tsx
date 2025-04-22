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
    image: '/images/services/Destination wedding.jpg',
    title: '',
    subtitle: 'Stories, Tips, and Photography Insights'
  },
  {
    image: '/images/services/Goan Wedding.jpg',
    title: '',
    subtitle: 'Stories, Tips, and Photography Insights'
  },
  {
    image: "/images/services/Pre wedding.jpg",
    title: '',
    subtitle: 'Stories, Tips, and Photography Insights'
  },
  {
    image: "/images/services/Conference and Events.jpg",
    title: '',
    subtitle: 'Stories, Tips, and Photography Insights'
  },
];

export default function HeroSlider({ pageTitle, slides = defaultSlides }: HeroProps) {
  return (
    <div className="relative w-full h-screen"> {/* Updated to h-screen */}
      <div className="relative h-full w-full"> {/* Changed from h-[80vh] to h-full */}
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
                  sizes="100vw"
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
