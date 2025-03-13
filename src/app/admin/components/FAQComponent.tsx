import { useState, useEffect, ChangeEvent } from "react";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

const FAQComponent = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddFaq = async () => {
    const res = await fetch("/api/faqs/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ question: "", answer: "" });
      fetchFaqs();
    }
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaqId(faq._id);
    setForm({ question: faq.question, answer: faq.answer });
  };

  const handleSaveChanges = async () => {
    if (!editingFaqId) return;
    const res = await fetch(`/api/faqs/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, id: editingFaqId }),
    });
    if (res.ok) {
      setEditingFaqId(null);
      fetchFaqs();
    }
  };

  const handleDeleteFaq = async (id: string) => {
    const res = await fetch("/api/faqs/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchFaqs();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">FAQ Section</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={form.question}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <textarea
          name="answer"
          placeholder="Answer"
          value={form.answer}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded text-black"
        />
        <button
          onClick={editingFaqId ? handleSaveChanges : handleAddFaq}
          className={`${
            editingFaqId ? "bg-blue-500" : "bg-green-500"
          } text-black px-4 py-2 rounded hover:${
            editingFaqId ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {editingFaqId ? "Save Changes" : "Add FAQ"}
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Existing FAQs</h2>
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq._id} className="border-b border-gray-200 py-4">
              <h3 className="text-xl font-medium">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditFaq(faq)}
                  className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFaq(faq._id)}
                  className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No FAQs available.</p>
        )}
      </div>
    </div>
  );
};

export default FAQComponent; 