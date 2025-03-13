import { useState, useEffect, ChangeEvent } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
}

interface Portfolio {
  _id: string;
  title: string;
  category: Category;
  subcategory: Subcategory;
  photos: string[];
}

const PortfolioComponent = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [form, setForm] = useState({ title: "", category: "", subcategory: "", photos: [""] });
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const res = await fetch("/api/subcategories");
        const data = await res.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubcategories();
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch("/api/portfolios");
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === "photos" && index !== undefined) {
      const newPhotos = [...form.photos];
      newPhotos[index] = value;
      setForm({ ...form, photos: newPhotos });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddPhotoField = () => {
    setForm({ ...form, photos: [...form.photos, ""] });
  };

  const handleRemovePhotoField = (index: number) => {
    const newPhotos = form.photos.filter((_, i) => i !== index);
    setForm({ ...form, photos: newPhotos });
  };

  const handleAddPortfolio = async () => {
    const res = await fetch("/api/portfolios/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", category: "", subcategory: "", photos: [""] });
      fetchPortfolios();
    }
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setEditingPortfolioId(portfolio._id);
    setForm({
      title: portfolio.title,
      category: portfolio.category._id,
      subcategory: portfolio.subcategory._id,
      photos: portfolio.photos,
    });
  };

  const handleSaveChanges = async () => {
    if (!editingPortfolioId) return;
    const res = await fetch(`/api/portfolios/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, _id: editingPortfolioId }),
    });
    if (res.ok) {
      setEditingPortfolioId(null);
      fetchPortfolios();
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    const res = await fetch("/api/portfolios/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchPortfolios();
    }
  };

  const filteredPortfolios = portfolios.filter((portfolio) => {
    return (
      (selectedCategory === "" || portfolio.category._id === selectedCategory) &&
      (selectedSubcategory === "" || portfolio.subcategory._id === selectedSubcategory)
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Portfolio</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Portfolio Title"
          value={form.title}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="subcategory"
          value={form.subcategory}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </option>
          ))}
        </select>
        {form.photos.map((photo, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name="photos"
              placeholder={`Photo URL ${index + 1}`}
              value={photo}
              onChange={(e) => handleInputChange(e, index)}
              className="border border-gray-300 p-2 rounded flex-grow text-black"
            />
            <button
              onClick={() => handleRemovePhotoField(index)}
              className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddPhotoField}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Photo
        </button>
        <button
          onClick={editingPortfolioId ? handleSaveChanges : handleAddPortfolio}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingPortfolioId ? "Save Changes" : "Add Portfolio"}
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Existing Portfolios</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="border border-gray-300 p-2 rounded text-black"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        {filteredPortfolios.length > 0 ? (
          filteredPortfolios.map((portfolio) => (
            <div key={portfolio._id} className="border-b border-gray-200 py-4">
              <h3 className="text-xl font-medium">{portfolio.title}</h3>
              <p className="text-gray-600">{portfolio.category.name} / {portfolio.subcategory.name}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditPortfolio(portfolio)}
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePortfolio(portfolio._id)}
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No portfolios available.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioComponent; 