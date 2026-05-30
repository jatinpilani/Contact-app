import React, { useContext, useEffect, useState } from "react";
import { ContactsContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

function AddEdit() {
  const { contacts, setContacts } = useContext(ContactsContext);

  const location = useLocation();
  const ID = location.state?.id;

  const fil = contacts.find((item) => item.id === ID);

  const [Save, setSave] = useState({
    id: Date.now(),
    name: "",
    email: "",
    phone: "",
    category: "Personal",
    favorite: false,
  });

  useEffect(() => {
    if (fil) {
      setSave(fil);
    }
  }, [fil]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFavoriteChange = (e) => {
    setSave((prev) => ({
      ...prev,
      favorite: e.target.value === "true",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const exists = contacts.some(
      (item) =>
        item.email === Save.email &&
        item.id !== Save.id
    );

    if (exists) {
      toast.error("Email already exists!");
      return;
    }

    if (fil) {
      setContacts((prev) =>
        prev.map((item) =>
          item.id === Save.id ? Save : item
        )
      );

      toast.success("Contact updated!", {
        position: "top-center",
      });
    } else {
      setContacts((prev) => [...prev, Save]);

      toast.success("Contact added!", {
        position: "top-center",
      });

      setSave({
        id: Date.now(),
        name: "",
        email: "",
        phone: "",
        category: "Personal",
        favorite: false,
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#FFF9ED] rounded-3xl shadow-lg p-6 sm:p-8"
        >
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <span>👤</span>
            {fil ? "Edit Contact" : "New Contact"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Full name *
            </label>

            <input
              type="text"
              name="name"
              placeholder="e.g., Michael Chen"
              required
              value={Save.name}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Email *
            </label>

            <input
              type="email"
              name="email"
              placeholder="michael@example.com"
              required
              value={Save.email}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Phone *
            </label>

            <input
              type="tel"
              name="phone"
              placeholder="+1 555 123 4567"
              required
              value={Save.phone}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Category
            </label>

            <select
              name="category"
              value={Save.category}
              onChange={handleChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              ⭐ Favorite
            </label>

            <select
              value={Save.favorite.toString()}
              onChange={handleFavoriteChange}
              className="w-full rounded-full border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition"
          >
            {fil ? "💾 Update Contact" : "💾 Save Contact"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddEdit;