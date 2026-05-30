import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Search from "./Components/Search";
import Contacts from "./Components/Contacts";
import AddEdit from "./Components/AddEdit";
import Analytics from "./Components/Analytics";
import { ContactsProvider } from "./Components/Context";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("");
const [status, setStatus] = useState("");
  return (

    <ContactsProvider>
      <Header />
      <NavBar />

      <Routes>
        {/* Contacts Page */}
        <Route
          path="/"
          element={
            <>
              <Search
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
  status={status}
  setStatus={setStatus}
/>
      <Contacts category={category} status={status} search={search} />
            </>
          }
        />

        {/* Add / Edit Contact */}
        <Route path="/AddEdit" element={<AddEdit />} />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-[60vh] text-xl font-semibold text-slate-600">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </ContactsProvider>
  );
}

export default App;