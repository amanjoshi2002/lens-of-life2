'use client';

import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="relative h-[60vh] w-full">
      <Image
        src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070"
        alt="Wedding Photography Hero"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="mb-4 text-6xl font-serif">{title}</h1>
          <p className="text-xl">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}