import { LayoutDashboard, Form, Trash2 } from "lucide-react";

export default function Dashboard({ forms, submissions, setSubmissions }) {
  
    const removeSubmission = (formId) => {
    const updated = { ...submissions };
    delete updated[formId];   // ❌ remove data for this form
    setSubmissions(updated);
  };

    return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-green-600 mb-4">
        <LayoutDashboard size={25} />
        Dashboard
      </h2>

      {forms.map((form) => {
        // ✅ MERGE all submissions into one object
        const mergedEntry = (submissions[form.id] || []).reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );

        // ❌ skip if no data
        const hasData = Object.values(mergedEntry).some(
          (v) => v && v.toString().trim() !== ""
        );

        return (
          <div key={form.id} className="border rounded p-4 mb-4">
            <h3 className="flex items-center gap-2 font-semibold text-lg">
              <Form size={18} className="text-red-700" />
              {form.name}
            </h3>

            <div className="mt-2 text-sm text-slate-600">
              Fields: {form.fields.map((f) => f.label).join(", ")}
            </div>

            {hasData && (
                <div className="bg-slate-100 p-3 rounded mt-3 relative">

                    {/* REMOVE BUTTON */}
                    <button
                    onClick={() => removeSubmission(form.id)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    title="Remove data"
                    >
                    <Trash2 size={18} />
                    </button>

                    {form.fields
                    .filter(
                        (field) =>
                        mergedEntry[field.id] &&
                        mergedEntry[field.id].toString().trim() !== ""
                    )
                    .map((field) => (
                        <div key={field.id}>
                        <strong>{field.label}:</strong>{" "}
                        {mergedEntry[field.id]}
                        </div>
                    ))}
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
