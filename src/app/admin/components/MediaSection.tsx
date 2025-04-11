import { ChangeEvent } from "react";

interface MediaSectionProps {
  photos: string[];
  videos: string[];
  onInputChange: (e: ChangeEvent<HTMLInputElement>, index: number, type: string) => void;
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
  onAddVideo: () => void;
  onRemoveVideo: (index: number) => void;
}

const MediaSection = ({ 
  photos, 
  videos, 
  onInputChange, 
  onAddPhoto, 
  onRemovePhoto, 
  onAddVideo, 
  onRemoveVideo 
}: MediaSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Photos</h3>
      {photos.map((photo, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={`Photo ${index + 1}`}
            value={photo || ""}
            onChange={(e) => onInputChange(e, index, "photos")}
            className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
          />
          <button
            onClick={() => onRemovePhoto(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove Photo
          </button>
        </div>
      ))}
      <button
        onClick={onAddPhoto}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add Photo
      </button>

      <h3 className="text-lg font-medium mb-2 mt-4">Videos</h3>
      {videos.map((video, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={`Video ${index + 1}`}
            value={video || ""}
            onChange={(e) => onInputChange(e, index, "videos")}
            className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
          />
          <button
            onClick={() => onRemoveVideo(index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove Video
          </button>
        </div>
      ))}
      <button
        onClick={onAddVideo}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Video
      </button>
    </div>
  );
};

export default MediaSection;