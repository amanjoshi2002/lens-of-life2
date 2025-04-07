import { useState, useEffect, ChangeEvent } from "react";

interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

interface FormState {
  category: string;
  title: string;
  headPhotoLink: string;
  paragraphs: { heading: string; content: string }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

interface BlogComponentProps {
  blogs: Blog[];
  fetchBlogs: () => void;
  handleDeleteBlog: (id: string) => void;
}

const BlogComponent = ({ blogs, fetchBlogs, handleDeleteBlog }: BlogComponentProps) => {
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    category: "",
    title: "",
    headPhotoLink: "",
    paragraphs: [{ heading: "", content: "" }],
    subPhotos: [""],
    photos: [""],
    videos: [""],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data.map((category: { name: string }) => category.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
      photos: [...form.photos, ""],
      videos: [...form.videos, ""]
    });
  };

  const handleRemoveField = (index: number) => {
    const newParagraphs = form.paragraphs.filter((_, i) => i !== index);
    const newSubPhotos = form.subPhotos.filter((_, i) => i !== index);
    const newPhotos = form.photos.filter((_, i) => i !== index);
    const newVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, paragraphs: newParagraphs, subPhotos: newSubPhotos, photos: newPhotos, videos: newVideos });
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = form.photos.filter((_, i) => i !== index);
    setForm({ ...form, photos: newPhotos });
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = form.videos.filter((_, i) => i !== index);
    setForm({ ...form, videos: newVideos });
  };

  const handleAddBlog = async () => {
    const res = await fetch("/api/services/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      fetchBlogs();
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog._id);
    setForm({
      category: blog.category,
      title: blog.title,
      headPhotoLink: blog.headPhotoLink,
      paragraphs: blog.paragraphs,
      subPhotos: blog.subPhotos,
      photos: blog.photos,
      videos: blog.videos,
    });
  };

  const handleSaveChanges = async () => {
    if (!editingBlogId) return;
    const res = await fetch(`/api/services/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, _id: editingBlogId }),
    });
    if (res.ok) {
      setEditingBlogId(null);
      fetchBlogs();
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesTitle = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    return matchesTitle && matchesCategory;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Blog</h2>
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
        {form.paragraphs.map((paragraph, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name="heading"
              placeholder={`Heading ${index + 1}`}
              value={paragraph.heading || ""}
              onChange={(e) => handleInputChange(e, index, "paragraphs")}
              className="border border-gray-300 p-2 rounded flex-grow text-black"
            />
            <input
              type="text"
              placeholder={`Content ${index + 1}`}
              value={paragraph.content || ""}
              onChange={(e) => handleInputChange(e, index, "paragraphs")}
              className="border border-gray-300 p-2 rounded flex-grow text-black"
            />
            <input
              type="text"
              placeholder={`Sub Photo ${index + 1}`}
              value={form.subPhotos[index] || ""}
              onChange={(e) => handleInputChange(e, index, "subPhotos")}
              className="border border-gray-300 p-2 rounded flex-grow text-black"
            />
            <button
              onClick={() => handleRemoveField(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddField}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Paragraph & Sub Photo
        </button>

        {form.photos.map((photo, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Photo ${index + 1}`}
              value={photo || ""}
              onChange={(e) => handleInputChange(e, index, "photos")}
              className="border border-gray-300 p-2 rounded mb-2 w-full"
            />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove Photo
            </button>
          </div>
        ))}
        <button
          onClick={() => setForm({ ...form, photos: [...form.photos, ""] })}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Photo
        </button>

        {form.videos.map((video, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Video ${index + 1}`}
              value={video || ""}
              onChange={(e) => handleInputChange(e, index, "videos")}
              className="border border-gray-300 p-2 rounded mb-2 w-full"
            />
            <button
              onClick={() => handleRemoveVideo(index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove Video
            </button>
          </div>
        ))}
        <button
          onClick={() => setForm({ ...form, videos: [...form.videos, ""] })}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Video
        </button>

        <button
          onClick={editingBlogId ? handleSaveChanges : handleAddBlog}
          className={`${
            editingBlogId ? "bg-blue-500" : "bg-green-500"
          } text-white px-4 py-2 rounded hover:${
            editingBlogId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editingBlogId ? "Save Changes" : "Add Blog"}
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="border-b border-gray-200 py-4">
              {editingBlogId === blog._id ? (
                <div>
                  <select
                    name="category"
                    value={form.category}
                    onChange={(e) => handleInputChange(e, 0, "category")}
                    className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
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
                    className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
                  />
                  <input
                    type="text"
                    name="headPhotoLink"
                    placeholder="Head Photo Link"
                    value={form.headPhotoLink}
                    onChange={(e) => handleInputChange(e, 0, "headPhotoLink")}
                    className="border border-gray-300 p-2 rounded mb-2 w-full text-black"
                  />
                  {form.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        name="heading"
                        placeholder={`Heading ${index + 1}`}
                        value={paragraph.heading || ""}
                        onChange={(e) => handleInputChange(e, index, "paragraphs")}
                        className="border border-gray-300 p-2 rounded flex-grow text-black"
                      />
                      <input
                        type="text"
                        placeholder={`Content ${index + 1}`}
                        value={paragraph.content || ""}
                        onChange={(e) => handleInputChange(e, index, "paragraphs")}
                        className="border border-gray-300 p-2 rounded flex-grow text-black"
                      />
                      <input
                        type="text"
                        placeholder={`Sub Photo ${index + 1}`}
                        value={form.subPhotos[index] || ""}
                        onChange={(e) => handleInputChange(e, index, "subPhotos")}
                        className="border border-gray-300 p-2 rounded flex-grow text-black"
                      />
                      <button
                        onClick={() => handleRemoveField(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-medium">{blog.title}</h3>
                  <p className="text-gray-600">{blog.category}</p>
                  <img src={blog.headPhotoLink} alt="Head Photo" className="mb-4" />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditBlog(blog)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogComponent; 