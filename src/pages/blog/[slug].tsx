import { useRouter } from 'next/router';
import Image from 'next/image';

const BlogPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  const sections = [
    {
      title: 'Introduction',
      content: 'Your wedding day is a cherished milestone...',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000',
    },
    {
      title: 'Choosing the Right Style',
      content: 'With so many photography styles available...',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
    },
    {
      title: 'Understanding Lighting',
      content: 'Lighting plays a crucial role in photography...',
      image: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?q=80&w=1000',
    },
    {
      title: 'Selecting a Photographer',
      content: 'Choosing the right photographer is essential...',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000',
    },
    {
      title: 'Pre-Wedding Shoots',
      content: 'Capture beautiful moments before the big day...',
      image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1000',
    },
    {
      title: 'Ceremony Photography',
      content: 'Documenting the ceremony is a must...',
      image: 'https://images.unsplash.com/photo-1516728778615-2d590ea1856f?q=80&w=1000',
    },
    {
      title: 'Reception Highlights',
      content: 'Capture the joy and celebration...',
      image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1000',
    },
    {
      title: 'Post-Wedding Sessions',
      content: 'Post-wedding sessions offer more relaxed photos...',
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000',
    },
    {
      title: 'Editing and Retouching',
      content: 'Editing enhances the final images...',
      image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1000',
    },
    {
      title: 'Creating an Album',
      content: 'Compile your photos into a beautiful album...',
      image: 'https://images.unsplash.com/photo-1516728778615-2d590ea1856f?q=80&w=1000',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">How to Choose the Right Wedding Photography Style for You</h1>
      {sections.map((section, index) => (
        <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-12`}>
          <div className="md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-700">{section.content}</p>
          </div>
          <div className="md:w-1/2 p-4">
            <Image
              src={section.image}
              alt={section.title}
              width={500}
              height={300}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPost; 