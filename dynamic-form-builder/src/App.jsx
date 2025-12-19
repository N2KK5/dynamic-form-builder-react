import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";

export default function App() {
  const [page, setPage] = useState("dashboard");

  // ✅ Load forms from localStorage
  const [forms, setForms] = useState(() => {
    const savedForms = localStorage.getItem("forms");
    return savedForms ? JSON.parse(savedForms) : [];
  });

  // ✅ Load submissions from localStorage
  const [submissions, setSubmissions] = useState(() => {
    const savedSubmissions = localStorage.getItem("submissions");
    return savedSubmissions ? JSON.parse(savedSubmissions) : {};
  });

  // ✅ Save forms whenever changed
  useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(forms));
  }, [forms]);

  // ✅ Save submissions whenever changed
  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <Navbar page={page} setPage={setPage} />

      {page === "admin" && (
        <Admin
          forms={forms}
          setForms={setForms}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          forms={forms}
          submissions={submissions}
          setSubmissions={setSubmissions}
/>
      )}

      {page === "user" && (
        <User
          forms={forms}
          submissions={submissions}
          setSubmissions={setSubmissions}
          setPage={setPage}
        />
      )}
    </div>
  );
}
