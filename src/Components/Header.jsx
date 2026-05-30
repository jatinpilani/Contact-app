import React, { useContext } from "react";
import { ContactsContext } from "./Context";

function Header() {
  const { contacts } = useContext(ContactsContext);
  const exportToCSV = () => {
  const headers = ["Name", "Email", "Phone", "Category", "Favourite"];

  const rows = contacts.map((c) => [
    c.name,
    c.email,
    c.phone,
    c.category,
    c.favourite ? "Yes" : "No",
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "contacts.csv";
  link.click();

  window.URL.revokeObjectURL(url);
};
  return (
    <header className="w-full bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-linear-to-br from-amber-500 to-orange-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="white"
              >
                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13Z" />
              </svg>
            </div>

            <div>
              <h1 className="text-lg font-semibold leading-tight">
                ContactMaster Pro
              </h1>
              <p className="text-sm text-slate-400">
                Smart CRM · Favorites 
              </p>
            </div>
          </div>

          <button  onClick={exportToCSV}
            className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium
                       text-slate-200 hover:bg-slate-800 hover:text-white transition"
          >
            Export
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;