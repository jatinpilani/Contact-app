import React, { useContext, useEffect, useState } from "react";
import { ContactsContext } from "./Context";

function Search({ search, setSearch, category, setCategory, status, setStatus }){
  const { contacts } = useContext(ContactsContext);
  const [cat, setCat] = useState([]);
const query = search.toLowerCase().trim();


  useEffect(() => {
    const categories = contacts.map(con => con.category);
    const uniqueCategories = [...new Set(categories)];
    setCat(uniqueCategories);
  }, [contacts]);
  return (
    <div className="w-full  bg-white p-3 sm:p-4  ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search by name, email, or phone"
  className="w-full rounded-full border border-gray-200 bg-gray-50
             pl-11 pr-4 py-2.5 text-sm
             focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
        </div>

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full sm:w-auto rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
          <option value="">All Categories</option>
          {cat.map((data,idx)=>(
 <option key={idx} value={data}>{data}</option>
          ))}
        </select>

      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full sm:w-auto rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
          <option>All contacts</option>
          <option>Favourite </option>
        </select>


        <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-100">
            📇
          </span>
          <span>{contacts.length} contacts</span>
        </div>
      </div>
    </div>
  );
}

export default Search;