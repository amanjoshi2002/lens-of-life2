import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-24 right-4 z-[100]">
      <Link
        href="https://wa.me/your-whatsapp-number"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-green-500 transition-colors">
          <FaWhatsapp className="w-8 h-8" />
        </button>
      </Link>
    </div>
  );
};

export default WhatsAppButton;