import { useState } from "react";
import { Plus, Trash2, Pencil, Check, Shield } from "lucide-react";

const FIELD_TYPES = [
  "text",
  "number",
  "email",
  "password",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "date",
];

export default function Admin({ forms, setForms }) {
  const [formName, setFormName] = useState("");
  const [activeForm, setActiveForm] = useState(null);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("text");
  const [editFieldId, setEditFieldId] = useState(null);
  const [editLabel, setEditLabel] = useState("");

  /* ---------------- CREATE FORM ---------------- */
  const createForm = () => {
    if (!formName.trim()) return;

    setForms([
      ...forms,
      { id: Date.now(), name: formName.trim(), fields: [] },
    ]);

    setFormName("");
  };

  /* ---------------- ADD FIELD (NO DUPLICATES) ---------------- */
  const addField = () => {
    if (!label.trim()) return;

    const currentForm = forms.find((f) => f.id === activeForm);

    // ❌ prevent duplicate field names in same form
    const isDuplicate = currentForm.fields.some(
      (field) =>
        field.label.toLowerCase() === label.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Field name already exists in this form");
      return;
    }

    setForms(
      forms.map((f) =>
        f.id === activeForm
          ? {
              ...f,
              fields: [
                ...f.fields,
                { id: Date.now(), label: label.trim(), type },
              ],
            }
          : f
      )
    );

    setLabel("");
  };

  /* ---------------- REMOVE FIELD ---------------- */
  const removeField = (formId, fieldId) => {
    setForms(
      forms.map((f) =>
        f.id === formId
          ? {
              ...f,
              fields: f.fields.filter((fl) => fl.id !== fieldId),
            }
          : f
      )
    );
  };

  /* ---------------- EDIT FIELD ---------------- */
  const startEdit = (field) => {
    setEditFieldId(field.id);
    setEditLabel(field.label);
  };

  const saveEdit = (formId, fieldId) => {
    if (!editLabel.trim()) return;

    const currentForm = forms.find((f) => f.id === formId);

    // ❌ prevent duplicate while editing
    const isDuplicate = currentForm.fields.some(
      (field) =>
        field.id !== fieldId &&
        field.label.toLowerCase() === editLabel.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("Field name already exists in this form");
      return;
    }

    setForms(
      forms.map((f) =>
        f.id === formId
          ? {
              ...f,
              fields: f.fields.map((fl) =>
                fl.id === fieldId
                  ? { ...fl, label: editLabel.trim() }
                  : fl
              ),
            }
          : f
      )
    );

    setEditFieldId(null);
  };

  const currentForm = forms.find((f) => f.id === activeForm);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-4">
        <Shield size={25} />
        Admin Panel
      </h2>

      {/* CREATE FORM */}
      <div className="flex gap-3 mb-4">
        <input
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          placeholder="Form Name"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={createForm}
          className="bg-blue-600 text-white px-4 rounded flex items-center gap-1"
        >
          <Plus size={18} /> Create
        </button>
      </div>

      {/* SELECT FORM */}
      <select
        onChange={(e) => setActiveForm(Number(e.target.value))}
        className="border p-2 w-full rounded mb-4"
      >
        <option>Select Form</option>
        {forms.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
      </select>

      {/* ADD / EDIT FIELDS */}
      {activeForm && (
        <>
          <div className="flex gap-2 mb-4">
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Field Label"
              className="border p-2 flex-1 rounded"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded"
            >
              {FIELD_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={addField}
              className="bg-green-600 text-white px-3 rounded"
            >
              <Plus />
            </button>
          </div>

          {/* FIELD LIST */}
          {currentForm?.fields.map((field) => (
            <div
              key={field.id}
              className="flex justify-between items-center bg-slate-100 p-3 rounded mb-2"
            >
              {editFieldId === field.id ? (
                <input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="border p-1 rounded w-full mr-2"
                />
              ) : (
                <span>
                  {field.label}
                  <span className="text-blue-600 text-sm ml-2">
                    ({field.type})
                  </span>
                </span>
              )}

              <div className="flex gap-2">
                {editFieldId === field.id ? (
                  <button
                    onClick={() => saveEdit(activeForm, field.id)}
                    className="text-green-600"
                  >
                    <Check />
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(field)}
                    className="text-blue-600"
                  >
                    <Pencil />
                  </button>
                )}

                <button
                  onClick={() => removeField(activeForm, field.id)}
                  className="text-red-600"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
