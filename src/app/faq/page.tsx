'use client';

import { useState, useEffect } from 'react';
import Footer from '../../../components/Footer';
import Hero from '../../../components/Hero1';
import Navbar from '../../../components/Navbar';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faqs');
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const heroSlides = [
      {
        image: '/images/hero/cover1.jpg',
        title: '',
        subtitle: 'Your Questions Answered'
      }
    ];
  
    return (
      <>
        <Navbar />
        <Hero pageTitle="FAQ" slides={heroSlides} />
        <div className="pt-24 pb-48 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            
            {/* Search Bar */}
            <div className="mt-12 mb-8">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm mb-12"
              />
            </div>
  
            {/* Single Column FAQ Items */}
            <div className="flex flex-col gap-8">
              {filteredFaqs.map((faq, index) => (
                <div key={faq._id} className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
                    <span className="text-2xl text-gray-600">{openIndex === index ? '-' : '+'}</span>
                  </button>
                  {openIndex === index && (
                    <p className="mt-4 text-gray-700 text-sm">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}