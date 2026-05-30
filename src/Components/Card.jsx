import React, { useContext } from "react";
import { ContactsContext } from "./Context";
import { NavLink } from "react-router-dom";

export default function Card({ search, category, status }) {
  const { contacts, setContacts } = useContext(ContactsContext);

  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((item) => item.id !== id));
  };
console.log(contacts);

  const toggleFavourite = (id) => {
    setContacts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, favourite: !item.favourite }
          : item
      )
    );
  };

  const query = (search || "").toLowerCase().trim();

  const filteredContacts = contacts.filter((c) => {
    const matchSearch =
      !query ||
      c.name?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.toString().includes(query);

    const matchCategory = !category || c.category === category;

    const matchStatus =
      !status || (status === "Favourite" ? c.favorite === true : true);

    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <>
      {filteredContacts.map((data) => (
        <div
          key={data.id}
          className="rounded-2xl w-fit bg-white p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Left */}
            <div className="flex items-start gap-4 flex-1">
              <div className="h-14 w-14 shrink-0 rounded-full bg-linear-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-semibold text-lg">
                {data.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-gray-900 truncate">
                  {data.name}
                </h2>

                <p className="mt-0.5 text-sm text-gray-500 truncate">
                  {data.email}
                </p>

                <p className="mt-0.5 text-sm text-gray-500">
                  {data.phone}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                  {data.category}
                </span>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-8">

              <button
                onClick={() => toggleFavourite(data.id)}
                className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-colors
                  ${
                    data.favorite
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "text-gray-500 border-gray-200 hover:bg-gray-900 hover:text-white"
                  }`}
              >
                ★
              </button>

              <div className="flex gap-3">
                <NavLink to="/AddEdit" state={{ id: data.id }}>
                  <button className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition">
                    Edit
                  </button>
                </NavLink>

                <button
                  onClick={() => handleDelete(data.id)}
                  className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      ))}
    </>
  );
}