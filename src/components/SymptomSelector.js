import React, { useEffect, useState } from "react";
import API from "../api";

/*
Props:
- selectedSymptoms: [{name, severity}]
- setSelectedSymptoms: function
*/

function SymptomSelector({ selectedSymptoms, setSelectedSymptoms }) {
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const resp = await API.get("/symptoms");
        const names = resp.data.map(s => s.name);
        setAllSymptoms(names.sort());
      } catch (err) {
        console.error("Could not load symptoms:", err);
        // fallback
        setAllSymptoms([
          "fever", "cough", "headache", "nausea", "vomiting", "fatigue",
          "chills", "shortness of breath", "rash", "joint pain"
        ]);
      }
    };
    fetchSymptoms();
  }, []);

  const isSelected = (name) => selectedSymptoms.some(s => s.name === name);

  const toggle = (name) => {
    if (isSelected(name)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s.name !== name));
    } else {
      setSelectedSymptoms([...selectedSymptoms, { name, severity: "moderate" }]);
    }
  };

  const changeSeverity = (name, severity) => {
    setSelectedSymptoms(selectedSymptoms.map(s => s.name === name ? { ...s, severity } : s));
  };

  const filtered = allSymptoms.filter(s => s.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="selector-wrap">
      <input
        className="symptom-search"
        placeholder="Search symptoms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="symptom-list">
        {filtered.map(sym => {
          const sel = selectedSymptoms.find(s => s.name === sym);
          return (
            <div key={sym} className="symptom-item">
              <label className="symptom-label">
                <input
                  type="checkbox"
                  checked={!!sel}
                  onChange={() => toggle(sym)}
                />
                <span className="symptom-name">{sym}</span>
              </label>

              {sel && (
                <select
                  value={sel.severity}
                  onChange={e => changeSeverity(sym, e.target.value)}
                  className="severity-select"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              )}
            </div>
          );
        })}
      </div>

      <div className="selected-summary">
        <b>Selected:</b>{" "}
        {selectedSymptoms.length ? selectedSymptoms.map(s => `${s.name} (${s.severity})`).join(", ") : "—"}
      </div>
    </div>
  );
}

export default SymptomSelector;
