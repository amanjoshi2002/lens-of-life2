"use client";
import { useState, useEffect } from "react";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
}

const TestimonialComponent = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    location: "",
    review: "",
    rating: 5,
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });
      if (!res.ok) throw new Error("Failed to add testimonial");
      setNewTestimonial({ name: "", location: "", review: "", rating: 5 });
      fetchTestimonials();
    } catch (error) {
      console.error("Error adding testimonial:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            placeholder="Client Name"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            value={newTestimonial.location}
            onChange={(e) => setNewTestimonial({...newTestimonial, location: e.target.value})}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Review"
            value={newTestimonial.review}
            onChange={(e) => setNewTestimonial({...newTestimonial, review: e.target.value})}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <select
            value={newTestimonial.rating}
            onChange={(e) => setNewTestimonial({...newTestimonial, rating: Number(e.target.value)})}
            className="border p-2 rounded w-full"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Testimonial
        </button>
      </form>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.location}</p>
                <p className="mt-2">{testimonial.review}</p>
                <p className="text-yellow-500 mt-1">
                  {"★".repeat(testimonial.rating)}{"☆".repeat(5-testimonial.rating)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(testimonial._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialComponent;