import { useState, useEffect, ChangeEvent } from "react";

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
  category: Category;
}

const SubcategoryComponent = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", category: "" });
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);

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

    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await fetch("/api/subcategories");
      const data = await res.json();
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddSubcategory = async () => {
    const res = await fetch("/api/subcategories/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: "", category: "" });
      fetchSubcategories();
    }
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategoryId(subcategory._id);
    setForm({ name: subcategory.name, category: subcategory.category._id });
  };

  const handleSaveChanges = async () => {
    if (!editingSubcategoryId) return;
    const res = await fetch(`/api/subcategories/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, _id: editingSubcategoryId }),
    });
    if (res.ok) {
      setEditingSubcategoryId(null);
      fetchSubcategories();
    }
  };

  const handleDeleteSubcategory = async (id: string) => {
    const res = await fetch("/api/subcategories/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchSubcategories();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Subcategory</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Subcategory Name"
          value={form.name}
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
        <button
          onClick={editingSubcategoryId ? handleSaveChanges : handleAddSubcategory}
          className={`${
            editingSubcategoryId ? "bg-blue-500" : "bg-green-500"
          } text-white px-4 py-2 rounded hover:${
            editingSubcategoryId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editingSubcategoryId ? "Save Changes" : "Add Subcategory"}
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Existing Subcategories</h2>
        {subcategories.length > 0 ? (
          subcategories.map((subcategory) => (
            <div key={subcategory._id} className="border-b border-gray-200 py-4">
              <h3 className="text-xl font-medium">{subcategory.name}</h3>
              <p className="text-gray-600">{subcategory.category.name}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditSubcategory(subcategory)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubcategory(subcategory._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No subcategories available.</p>
        )}
      </div>
    </div>
  );
};

export default SubcategoryComponent; 