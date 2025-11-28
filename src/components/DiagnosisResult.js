import React from "react";

function DiagnosisResult({ diagnosis }) {
  if (!diagnosis || diagnosis.length === 0) return null;

  return (
    <div className="diagnosis-result" role="region" aria-live="polite">
      {diagnosis.map((d, idx) => {
        const percent = Math.max(0, Math.min(100, d.match_percent));
        const highRisk = percent >= 80;
        return (
          <div key={idx} className={`disease-card ${highRisk ? "high-risk" : ""}`}>
            <div className="card-head">
              <h3>{d.name}</h3>
              <div>
                <span className={`badge ${highRisk ? "high-risk" : ""}`}>
                  {highRisk ? "HIGH RISK" : "Possible"}
                </span>
              </div>
            </div>

            <div className="match-row">
              <div className="match-bar" aria-hidden="true">
                <div className="fill" style={{ width: `${percent}%` }} />
              </div>
              <div className="match-percent">{percent}%</div>
            </div>

            <div className="meta"><b>Matched Symptoms:</b> {d.matched_symptoms.join(", ")}</div>

            <div>
              <b>Treatments:</b>
              <div className="treatment-list">
                {d.treatments.map((t, i) => (
                  <span key={i} className="treatment-pill">{t}</span>
                ))}
              </div>
            </div>

            <div className="explanation"><b>Explanation:</b> {d.explanation}</div>
          </div>
        );
      })}
    </div>
  );
}

export default DiagnosisResult;
