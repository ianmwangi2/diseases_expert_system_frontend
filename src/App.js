import React, { useState } from "react";
import SymptomSelector from "./components/SymptomSelector";
import DiagnosisResult from "./components/DiagnosisResult";
import API from "./api";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // [{name, severity}]
  const [diagnosis, setDiagnosis] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!selectedSymptoms.length) {
      alert("Please select at least one symptom.");
      return;
    }
    setLoading(true);
    try {
      const resp = await API.post("/diagnose", { symptoms: selectedSymptoms });
      setDiagnosis(resp.data);
    } catch (err) {
      console.error(err);
      alert("Diagnosis request failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Expert System — Medical Diagnosis</h1>
      <p className="subtitle">Select symptoms, set severity, and get likely diagnoses.</p>

      <SymptomSelector
        selectedSymptoms={selectedSymptoms}
        setSelectedSymptoms={setSelectedSymptoms}
      />

      <div style={{ textAlign: "center", marginTop: 14 }}>
        <button className="diagnose-btn" onClick={handleDiagnose} disabled={loading}>
          {loading ? "Diagnosing..." : "Diagnose"}
        </button>
      </div>

      <DiagnosisResult diagnosis={diagnosis} />
    </div>
  );
}

export default App;
