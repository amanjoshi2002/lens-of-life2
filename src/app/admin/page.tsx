"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import BlogComponent from "./components/BlogComponent";
import FAQComponent from "./components/FAQComponent";
import PortfolioComponent from "./components/PortfolioComponent";
import SubcategoryComponent from "./components/SubcategoryComponent";
import TestimonialComponent from "./components/TestimonialComponent";
import BlogNewComponent from "./components/BlogNewComponent";

interface Blog {
  _id: string;
  category: string;
  title: string;
  headPhotoLink: string;
  headPhotoLinks: string[];  // Add this required field
  paragraphs: { heading: string; content: string; }[];
  subPhotos: string[];
  photos: string[];
  videos: string[];
}

interface Category {
  _id: string;
  name: string;
}

interface BlogNew {
  _id: string;
  photo: string;
  headline: string;
  date: string;
  body: string;
}

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("blog");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [blogsNew, setBlogsNew] = useState<BlogNew[]>([]);

  useEffect(() => {
    const isLoggedIn = getCookie("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
    } else {
      fetchBlogs();
      fetchBlogsNew();
      fetchCategories();
    }
  }, [router]);

  const fetchBlogsNew = async () => {
    try {
      const res = await fetch("/api/blognew");
      if (!res.ok) throw new Error("Failed to fetch new blogs");
      const data = await res.json();
      setBlogsNew(data);
    } catch (error) {
      console.error("Error fetching new blogs:", error);
    }
  };

  const handleDeleteBlogNew = async (id: string) => {
    try {
      const res = await fetch(`/api/blognew/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchBlogsNew();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs/");
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data: Blog[] = await res.json();
      // Ensure headPhotoLinks is populated
      const processedData = data.map(blog => ({
        ...blog,
        headPhotoLinks: blog.headPhotoLink ? [blog.headPhotoLink] : []
      }));
      setBlogs(processedData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data: Category[] = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLogout = () => {
    deleteCookie("isLoggedIn");
    router.push("/admin/login");
  };

  const handleEditBlog = async (id: string) => {
    // Implement edit blog functionality
  };

  const handleDeleteBlog = async (id: string) => {
    const res = await fetch("/api/blogs/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchBlogs();
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await fetch("/api/categories/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!res.ok) {
        throw new Error("Failed to add category");
      }

      const data = await res.json();
      console.log("Category added:", data);
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (id: string, newName: string) => {
    if (!id || !newName) {
      console.error("ID and new name are required");
      return;
    }
    try {
      const res = await fetch(`/api/categories/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: newName }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit category");
      }

      const data = await res.json();
      console.log("Category edited:", data);
      fetchCategories();
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete category");
      }

      const data = await res.json();
      console.log("Category deleted:", data);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push("/")}
          >
            Home
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "blog" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("blog")}
          >
            Services
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "faq" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "portfolio" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "category" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("category")}
          >
            Categories
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "subcategory" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("subcategory")}
          >
            Subcategories
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "testimonials" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("testimonials")}
          >
            Testimonials
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "blognew" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
            onClick={() => setActiveTab("blognew")}
          >
           Blog
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "blog" && (
            <BlogComponent
              blogs={blogs}
              fetchBlogs={fetchBlogs}
              handleDeleteBlog={handleDeleteBlog}
            />
          )}
          {activeTab === "faq" && <FAQComponent />}
          {activeTab === "portfolio" && <PortfolioComponent />}
          {/* Add BlogNewComponent here */}
          {activeTab === "blognew" && (
            <BlogNewComponent
              blogs={blogsNew}
              fetchBlogs={fetchBlogsNew}
              handleDeleteBlog={handleDeleteBlogNew}
            />
          )}
          {activeTab === "category" && (
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New Category Name"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Add Category
                </button>
              </div>
              <div className="grid gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const newName = prompt("Enter new name:", category.name);
                          if (newName) handleEditCategory(category._id, newName);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "subcategory" && <SubcategoryComponent />}
          {activeTab === "testimonials" && <TestimonialComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;