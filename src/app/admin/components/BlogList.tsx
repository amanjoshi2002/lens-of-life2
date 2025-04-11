import { Blog } from "./types";

interface BlogListProps {
  blogs: Blog[];
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  editingBlogId: string | null;
  form: any;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onEditBlog: (blog: Blog) => void;
  onDeleteBlog: (id: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number, type: string) => void;
  handleRemoveField: (index: number) => void;
}

const BlogList = ({
  blogs,
  searchTerm,
  selectedCategory,
  categories,
  editingBlogId,
  form,
  onSearchChange,
  onCategoryChange,
  onEditBlog,
  onDeleteBlog,
  handleInputChange,
  handleRemoveField,
}: BlogListProps) => {
  const filteredBlogs = blogs.filter((blog) => {
    const matchesTitle = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    return matchesTitle && matchesCategory;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
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
                {form.paragraphs.map((paragraph: any, index: number) => (
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
                      name="content"
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
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <img src={blog.headPhotoLink} alt="Main Head Photo" className="mb-2" />
                  {blog.headPhotoLinks?.map((link, index) => (
                    <img key={index} src={link} alt={`Head Photo ${index + 1}`} className="mb-2" />
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onEditBlog(blog)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteBlog(blog._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
  );
};

export default BlogList;