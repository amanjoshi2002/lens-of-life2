import { ChangeEvent } from "react";

interface ParagraphSectionProps {
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>, index: number, type: string) => void;
  onAddField: () => void;
  onRemoveField: (index: number) => void;
}

const ParagraphSection = ({ 
  paragraphs, 
  subPhotos, 
  onInputChange, 
  onAddField, 
  onRemoveField 
}: ParagraphSectionProps) => {
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            name="heading"
            placeholder={`Heading ${index + 1}`}
            value={paragraph.heading || ""}
            onChange={(e) => onInputChange(e, index, "paragraphs")}
            className="border border-gray-300 p-2 rounded flex-grow text-black"
          />
          <input
            type="text"
            name="content"
            placeholder={`Content ${index + 1}`}
            value={paragraph.content || ""}
            onChange={(e) => onInputChange(e, index, "paragraphs")}
            className="border border-gray-300 p-2 rounded flex-grow text-black"
          />
          <input
            type="text"
            placeholder={`Sub Photo ${index + 1}`}
            value={subPhotos[index] || ""}
            onChange={(e) => onInputChange(e, index, "subPhotos")}
            className="border border-gray-300 p-2 rounded flex-grow text-black"
          />
          <button
            onClick={() => onRemoveField(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={onAddField}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add Paragraph & Sub Photo
      </button>
    </div>
  );
};

export default ParagraphSection;