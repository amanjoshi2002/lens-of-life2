import { Blog } from "./types";

interface Props {
  blogs: Blog[];
  onEdit: (b: Blog) => void;
  onDelete: (id: string) => void;
  search: string;
  setSearch: (s: string) => void;
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  categories: string[];
}

const BlogList = ({
  blogs,
  onEdit,
  onDelete,
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  categories,
}: Props) => {
  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (!filterCategory || b.category === filterCategory)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Existing Blogs</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded text-black"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {filtered.length > 0 ? (
        filtered.map((blog) => (
          <div key={blog._id} className="border-b border-gray-200 py-4">
            <h3 className="text-xl font-medium">{blog.title}</h3>
            <p className="text-gray-600">{blog.category}</p>
            {blog.coupleName && <p className="text-gray-700">Couple: {blog.coupleName}</p>}
            {blog.weddingDate && <p className="text-gray-700">Wedding Date: {blog.weddingDate.slice(0,10)}</p>}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <img src={blog.headPhotoLink} alt="Main Head Photo" className="mb-2" />
              {blog.headPhotoLinks?.map((link, i) => (
                <img key={i} src={link} alt={`Head Photo ${i + 1}`} className="mb-2" />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(blog)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;