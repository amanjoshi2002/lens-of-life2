import { ChangeEvent } from "react";

interface HeadPhotoSectionProps {
  headPhotoLinks: string[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>, index: number, type: string) => void;
  onAddHeadPhoto: () => void;
  onRemoveHeadPhoto: (index: number) => void;
}

const HeadPhotoSection = ({ 
  headPhotoLinks, 
  onInputChange, 
  onAddHeadPhoto, 
  onRemoveHeadPhoto 
}: HeadPhotoSectionProps) => {
  return (
    <div className="mt-4 mb-2">
      <h3 className="text-lg font-medium mb-2">Additional Head Photos</h3>
      {headPhotoLinks.map((link, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={`Head Photo Link ${index + 1}`}
            value={link || ""}
            onChange={(e) => onInputChange(e, index, "headPhotoLinks")}
            className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
          />
          <button
            onClick={() => onRemoveHeadPhoto(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={onAddHeadPhoto}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Head Photo
      </button>
    </div>
  );
};

export default HeadPhotoSection;