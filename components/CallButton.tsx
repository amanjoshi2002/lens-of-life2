import Link from 'next/link';
import { FaPhone } from 'react-icons/fa';

const CallButton = () => {
  return (
    <div className="fixed bottom-8 right-4 z-[100]">
      <Link
        href="tel:+your-phone-number"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors">
          <FaPhone className="w-8 h-8" />
        </button>
      </Link>
    </div>
  );
};

export default CallButton;