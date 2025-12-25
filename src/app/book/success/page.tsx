'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Download, Calendar } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';

export default function BookingSuccessPage() {
  const bookingNumber = `LOL-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-wider">Booking Confirmed!</h1>
            <p className="text-gray-400 mb-8">Your session has been successfully booked.</p>

            <div className="bg-gray-900 rounded-lg p-8 mb-8 text-left">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-700">
                <span className="text-gray-400">Booking Reference</span>
                <span className="text-xl font-mono">{bookingNumber}</span>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service</span>
                  <span>Wedding Photography</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span>{new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time</span>
                  <span>10:00 AM</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-700 text-lg">
                  <span>Total Paid</span>
                  <span>$3,500.00</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full md:w-auto px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mx-auto">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/client-bookings" className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all text-center flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  View My Bookings
                </Link>
                <Link href="/" className="px-8 py-3 border border-gray-700 rounded-full hover:border-white transition-all text-center">
                  Return Home
                </Link>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-8">A confirmation email has been sent to your registered email address.</p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
