'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Calendar, Clock } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const services = [
  { id: 'wedding', name: 'Wedding Photography', price: 3500, duration: '8-12 hours' },
  { id: 'pre-wedding', name: 'Pre-Wedding Shoot', price: 1500, duration: '4-6 hours' },
  { id: 'portraits', name: 'Portrait Photography', price: 800, duration: '2-3 hours' },
  { id: 'baby', name: 'Baby & Newborn', price: 600, duration: '1-2 hours' },
  { id: 'product', name: 'Product Photography', price: 500, duration: '2-4 hours' },
  { id: 'events', name: 'Events & Conference', price: 1200, duration: '4-8 hours' },
];

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const service = searchParams?.get('service');
    if (service) setSelectedService(service);
  }, [searchParams]);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 7; i < 37; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

  const calculateTotal = () => {
    const service = services.find(s => s.id === selectedService);
    if (!service) return 0;
    const basePrice = service.price;
    const isWeekendBooking = selectedDate && isWeekend(new Date(selectedDate));
    return isWeekendBooking ? basePrice * 1.1 : basePrice;
  };

  const handleComplete = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/book/success');
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedService !== '';
    if (currentStep === 2) return selectedDate !== '' && selectedTime !== '';
    return true;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl lg:text-5xl font-light text-center mb-8 lg:mb-12 tracking-wider">Book Your Session</h1>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8 lg:mb-16">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 transition-all text-sm lg:text-base ${
                  currentStep >= step ? 'border-white bg-white text-black' : 'border-gray-600 text-gray-600'
                }`}>
                  {currentStep > step ? <Check className="w-4 h-4 lg:w-5 lg:h-5" /> : step}
                </div>
                {step < 3 && <div className={`w-12 lg:w-16 h-0.5 ${currentStep > step ? 'bg-white' : 'bg-gray-600'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h2 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6 tracking-wide">Select Your Service</h2>
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 lg:p-6 border cursor-pointer transition-all rounded-lg ${
                    selectedService === service.id ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base lg:text-lg font-light tracking-wide">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg lg:text-xl">${service.price}</p>
                      {selectedService === service.id && <Check className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500 ml-auto mt-1" />}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6 tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 lg:w-6 lg:h-6" /> Select Date
                </h2>
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                  {generateDates().map((date, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDate(date.toISOString())}
                      className={`p-3 lg:p-4 border cursor-pointer transition-all rounded-lg text-center ${
                        selectedDate === date.toISOString() ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <p className="text-xs text-gray-400">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <p className="text-base lg:text-lg">{date.getDate()}</p>
                      <p className="text-xs text-gray-400">{date.toLocaleDateString('en-US', { month: 'short' })}</p>
                      {isWeekend(date) && <p className="text-xs text-amber-500 mt-1">+10%</p>}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl lg:text-2xl font-light mb-4 lg:mb-6 tracking-wide flex items-center gap-2">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6" /> Select Time
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 lg:p-4 border cursor-pointer transition-all rounded-lg text-center text-sm lg:text-base ${
                        selectedTime === time ? 'border-amber-500 bg-amber-500/10' : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 lg:space-y-8">
              <div className="bg-gray-900 p-4 lg:p-6 rounded-lg space-y-3 lg:space-y-4">
                <h2 className="text-xl lg:text-2xl font-light mb-3 lg:mb-4 tracking-wide">Booking Summary</h2>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Service</span>
                  <span>{services.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Date</span>
                  <span>{new Date(selectedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Time</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">Duration</span>
                  <span>{services.find(s => s.id === selectedService)?.duration}</span>
                </div>
                {selectedDate && isWeekend(new Date(selectedDate)) && (
                  <div className="flex justify-between py-2 text-amber-500">
                    <span>Weekend Surcharge</span>
                    <span>+10%</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 text-xl">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Coupon Code (Optional)</label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500" placeholder="Enter code" />
                  <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition-all">Apply</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 lg:mt-12">
            {currentStep > 1 && (
              <button onClick={() => setCurrentStep(currentStep - 1)} className="px-6 lg:px-8 py-2.5 lg:py-3 text-sm lg:text-base border border-gray-700 rounded-full hover:border-white transition-all">
                Back
              </button>
            )}
            <button
              onClick={() => currentStep === 3 ? handleComplete() : setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="ml-auto px-6 lg:px-8 py-2.5 lg:py-3 text-sm lg:text-base bg-white text-black rounded-full hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : currentStep === 3 ? 'Complete Booking' : 'Next'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
