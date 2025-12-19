import { useState } from "react";
import { UserCheck } from "lucide-react";

export default function User({ forms, submissions, setSubmissions, setPage }) {
  const [form, setForm] = useState(null);
  const [data, setData] = useState({});

  const submit = () => {
    if (!form) return;

    // prevent empty submission
    const hasValue = Object.values(data).some(
      (v) => v && v.toString().trim() !== ""
    );
    if (!hasValue) {
      alert("Please fill at least one field");
      return;
    }

    setSubmissions({
      ...submissions,
      [form.id]: [...(submissions[form.id] || []), data],
    });

    setData({});
    setForm(null);
    setPage("dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-purple-600 mb-4">
        <UserCheck size={25} /> User Panel
      </h2>

      <select
        onChange={(e) =>
          setForm(forms.find((f) => f.id === Number(e.target.value)))
        }
        className="border p-2 w-full rounded mb-4"
      >
        <option>Select Form</option>
        {forms.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      {form && (
        <>
          {form.fields.map((field) => (
            <input
              key={field.id}
              type={field.type}
              placeholder={field.label}
              className="border p-2 w-full mb-3 rounded"
              value={data[field.id] || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [field.id]: e.target.value, // ✅ FIX
                })
              }
            />
          ))}

          <button
            onClick={submit}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
}
