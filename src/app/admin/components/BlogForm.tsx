import { useState, ChangeEvent } from "react";
import { FormState } from "./types";

interface Props {
  form: FormState;
  setForm: (f: FormState) => void;
  categories: string[];
  onSave: (f: FormState) => void;
  onCancel: () => void;
  editing: boolean;
}

const BlogForm = ({ form, setForm, categories, onSave, onCancel, editing }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (arr: string[], idx: number, value: string, key: keyof FormState) => {
    const copy = [...arr];
    copy[idx] = value;
    setForm({ ...form, [key]: copy });
  };

  const handleParagraphChange = (idx: number, field: "heading" | "content", value: string) => {
    const copy = [...form.paragraphs];
    copy[idx] = { ...copy[idx], [field]: value };
    setForm({ ...form, paragraphs: copy });
  };

  const addField = (key: keyof FormState, empty: any) => setForm({ ...form, [key]: [...(form[key] as any[]), empty] });
  const removeField = (key: keyof FormState, idx: number) => setForm({ ...form, [key]: (form[key] as any[]).filter((_, i) => i !== idx) });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="grid gap-3 mb-8" onSubmit={submit}>
      <select name="category" value={form.category} onChange={handleChange} className="border p-2 rounded text-black">
        <option value="">Select Category</option>
        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded text-black" />
      <input name="headPhotoLink" value={form.headPhotoLink} onChange={handleChange} placeholder="Head Photo Link" className="border p-2 rounded text-black" />
      <input name="coupleName" value={form.coupleName || ""} onChange={handleChange} placeholder="Couple Name" className="border p-2 rounded text-black" />
      <input name="weddingDate" type="date" value={form.weddingDate ? form.weddingDate.slice(0,10) : ""} onChange={handleChange} placeholder="Wedding Date" className="border p-2 rounded text-black" />

      <label className="font-semibold">Head Photo Links</label>
      {form.headPhotoLinks.map((link, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input value={link} onChange={e => handleArrayChange(form.headPhotoLinks, i, e.target.value, "headPhotoLinks")} className="border p-2 rounded flex-1 text-black" placeholder={`Head Photo Link ${i + 1}`} />
          <button type="button" onClick={() => removeField("headPhotoLinks", i)} className="bg-red-400 text-white px-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField("headPhotoLinks", "")} className="bg-gray-200 px-2 rounded mb-2">Add Head Photo Link</button>

      <label className="font-semibold">Paragraphs</label>
      {form.paragraphs.map((p, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input value={p.heading} onChange={e => handleParagraphChange(i, "heading", e.target.value)} placeholder="Heading" className="border p-2 rounded flex-1 text-black" />
          <textarea value={p.content} onChange={e => handleParagraphChange(i, "content", e.target.value)} placeholder="Content" className="border p-2 rounded flex-1 text-black" />
          <button type="button" onClick={() => removeField("paragraphs", i)} className="bg-red-400 text-white px-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField("paragraphs", { heading: "", content: "" })} className="bg-gray-200 px-2 rounded mb-2">Add Paragraph</button>

      <label className="font-semibold">Sub Photos</label>
      {form.subPhotos.map((link, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input value={link} onChange={e => handleArrayChange(form.subPhotos, i, e.target.value, "subPhotos")} className="border p-2 rounded flex-1 text-black" placeholder={`Sub Photo ${i + 1}`} />
          <button type="button" onClick={() => removeField("subPhotos", i)} className="bg-red-400 text-white px-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField("subPhotos", "")} className="bg-gray-200 px-2 rounded mb-2">Add Sub Photo</button>

      <label className="font-semibold">Photos</label>
      {form.photos.map((link, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input value={link} onChange={e => handleArrayChange(form.photos, i, e.target.value, "photos")} className="border p-2 rounded flex-1 text-black" placeholder={`Photo ${i + 1}`} />
          <button type="button" onClick={() => removeField("photos", i)} className="bg-red-400 text-white px-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField("photos", "")} className="bg-gray-200 px-2 rounded mb-2">Add Photo</button>

      <label className="font-semibold">Videos</label>
      {form.videos.map((link, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input value={link} onChange={e => handleArrayChange(form.videos, i, e.target.value, "videos")} className="border p-2 rounded flex-1 text-black" placeholder={`Video ${i + 1}`} />
          <button type="button" onClick={() => removeField("videos", i)} className="bg-red-400 text-white px-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => addField("videos", "")} className="bg-gray-200 px-2 rounded mb-2">Add Video</button>

      <div className="flex gap-2 mt-2">
        <button type="submit" className={`${editing ? "bg-blue-500" : "bg-green-500"} text-white px-4 py-2 rounded`}>
          {editing ? "Save Changes" : "Add Blog"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BlogForm;