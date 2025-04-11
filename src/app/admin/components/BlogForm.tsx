import { useState, ChangeEvent } from "react";
import { FormState } from "./types";
import HeadPhotoSection from "./HeadPhotoSection";
import ParagraphSection from "./ParagraphSection";
import MediaSection from "./MediaSection";

interface BlogFormProps {
  initialForm: FormState;
  categories: string[];
  editingBlogId: string | null;
  onSave: () => void;
}

const BlogForm = ({ initialForm, categories, editingBlogId, onSave }: BlogFormProps) => {
  const [form, setForm] = useState<FormState>(initialForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, type: string) => {
    const { value } = e.target;
    if (type === "paragraphs") {
      const newParagraphs = [...form.paragraphs];
      if (e.target.name === "heading") {
        newParagraphs[index] = { ...newParagraphs[index], heading: value };
      } else {
        newParagraphs[index] = { ...newParagraphs[index], content: value };
      }
      setForm({ ...form, paragraphs: newParagraphs });
    } else if (type === "headPhotoLinks") {
      const newHeadPhotoLinks = [...form.headPhotoLinks];
      newHeadPhotoLinks[index] = value;
      setForm({ ...form, headPhotoLinks: newHeadPhotoLinks });
    } else if (type === "subPhotos") {
      const newSubPhotos = [...form.subPhotos];
      newSubPhotos[index] = value;
      setForm({ ...form, subPhotos: newSubPhotos });
    } else if (type === "photos") {
      const newPhotos = [...form.photos];
      newPhotos[index] = value;
      setForm({ ...form, photos: newPhotos });
    } else if (type === "videos") {
      const newVideos = [...form.videos];
      newVideos[index] = value;
      setForm({ ...form, videos: newVideos });
    } else {
      setForm({ ...form, [type]: value });
    }
  };

  const handleAddField = () => {
    setForm({
      ...form,
      paragraphs: [...form.paragraphs, { heading: "", content: "" }],
      subPhotos: [...form.subPhotos, ""],
    });
  };

  const handleRemoveField = (index: number) => {
    const newParagraphs = form.paragraphs.filter((_, i) => i !== index);
    const newSubPhotos = form.subPhotos.filter((_, i) => i !== index);
    setForm({ ...form, paragraphs: newParagraphs, subPhotos: newSubPhotos });
  };

  const handleAddHeadPhoto = () => {
    setForm({ ...form, headPhotoLinks: [...form.headPhotoLinks, ""] });
  };

  const handleRemoveHeadPhoto = (index: number) => {
    const newHeadPhotoLinks = form.headPhotoLinks.filter((_, i) => i !== index);
    setForm({ ...form, headPhotoLinks: newHeadPhotoLinks });
  };

  const handleAddPhoto = () => {
    setForm({ ...form, photos: [...form.photos, ""] });
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = form.photos.filter((_, i) => i !== index);
    setForm({ ...form, photos: newPhotos });
  };

  const handleAddVideo = () => {
    setForm({ ...form, videos: [...form.videos, ""] });
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: newVideos });
  };

  const handleSubmit = async () => {
    const endpoint = editingBlogId ? "/api/blogs/edit" : "/api/blogs/add";
    const method = editingBlogId ? "PUT" : "POST";
    const body = editingBlogId ? { ...form, _id: editingBlogId } : form;

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      onSave();
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <select
        name="category"
        value={form.category}
        onChange={(e) => handleInputChange(e, 0, "category")}
        className="border border-gray-300 p-2 rounded text-black"
        suppressHydrationWarning
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={(e) => handleInputChange(e, 0, "title")}
        className="border border-gray-300 p-2 rounded text-black"
        suppressHydrationWarning
      />
      
      <input
        type="text"
        name="headPhotoLink"
        placeholder="Head Photo Link"
        value={form.headPhotoLink}
        onChange={(e) => handleInputChange(e, 0, "headPhotoLink")}
        className="border border-gray-300 p-2 rounded text-black"
        suppressHydrationWarning
      />
      
      <HeadPhotoSection 
        headPhotoLinks={form.headPhotoLinks}
        onInputChange={handleInputChange}
        onAddHeadPhoto={handleAddHeadPhoto}
        onRemoveHeadPhoto={handleRemoveHeadPhoto}
      />
      
      <ParagraphSection 
        paragraphs={form.paragraphs}
        subPhotos={form.subPhotos}
        onInputChange={handleInputChange}
        onAddField={handleAddField}
        onRemoveField={handleRemoveField}
      />
      
      <MediaSection 
        photos={form.photos}
        videos={form.videos}
        onInputChange={handleInputChange}
        onAddPhoto={handleAddPhoto}
        onRemovePhoto={handleRemovePhoto}
        onAddVideo={handleAddVideo}
        onRemoveVideo={handleRemoveVideo}
      />
      
      <button
        onClick={handleSubmit}
        className={`${
          editingBlogId ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
        } text-white px-4 py-2 rounded`}
      >
        {editingBlogId ? "Save Changes" : "Add Blog"}
      </button>
    </div>
  );
};

export default BlogForm;