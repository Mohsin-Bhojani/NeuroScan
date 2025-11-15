"use client";

import React, { useState, useEffect } from "react";
import { TumorType } from "./types";
import { generateTreatmentPlan } from "./services/geminiService";
import { TUMOR_OPTIONS } from "./constants";
import { marked } from "marked";

declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

export default function TreatmentPlan({
  onBack,
  selectedTumor,
}: {
  onBack: () => void;
  selectedTumor: string | null;
}) {
  const [selected, setSelected] = useState<TumorType | null>(
    selectedTumor ? (selectedTumor as TumorType) : null
  );

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!selected) return;
    setLoading(true);
    setPlan(null);
    setError(null);

    try {
      const txt = await generateTreatmentPlan(selected);
      setPlan(txt);
    } catch (err: any) {
      setError(err.message || "Failed to generate.");
    }

    setLoading(false);
  };

  const downloadPDF = async () => {
    const element = document.getElementById("report-content");
    if (!element) return;

    const canvas = await window.html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("Treatment-Report.pdf");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a] p-6">

      {/* 🔵 BACKGROUND ORBS LIKE THE ABOUT PAGE */}
      <div className="absolute top-20 left-20 w-[450px] h-[450px] rounded-full bg-emerald-500/30 blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-[450px] h-[450px] rounded-full bg-indigo-500/30 blur-[140px] animate-pulse" />

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-xl 
                      border border-white/20 p-10 rounded-2xl shadow-2xl mt-20">

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold text-center 
                       bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text mb-10">
          AI Treatment Planner
        </h1>

        {/* ------------------ REPORT VIEW ------------------ */}
        {plan ? (
          <>
            {/* ACTION BUTTONS */}
            <div className="flex justify-between mb-6">
              <button
                onClick={() => setPlan(null)}
                className="px-5 py-2 bg-gray-700/80 text-white rounded-lg 
                           border border-white/20 hover:bg-gray-600 transition"
              >
                ← Generate Again
              </button>

              <button
                onClick={downloadPDF}
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Download PDF
              </button>
            </div>

            {/* REPORT BLOCK */}
            <div
              id="report-content"
              className="bg-white text-black p-10 rounded-xl shadow-2xl border border-gray-300 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(plan) }}
            />

            <p className="text-center text-xs text-gray-400 mt-6">
              Confidential Medical Document • AI Generated
            </p>
          </>
        ) : (
          <>
            {/* ---------------- SELECT TUMOR ---------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {TUMOR_OPTIONS.map((t) => (
                <label
                  key={t.id}
                  className={`cursor-pointer p-5 rounded-xl border backdrop-blur-lg transition-all
                    ${
                      selected === t.id
                        ? "bg-emerald-500/20 border-emerald-400 shadow-lg"
                        : "bg-white/5 border-white/20 hover:bg-white/10"
                    }`}
                >
                  <input
                    type="radio"
                    className="mr-2"
                    checked={selected === t.id}
                    onChange={() => setSelected(t.id)}
                  />
                  <b className="text-white">{t.label}</b>
                  <p className="text-sm text-gray-300">{t.description}</p>
                </label>
              ))}
            </div>

            {error && (
              <p className="text-red-400 text-center mt-4">{error}</p>
            )}

            {/* GENERATE BUTTON */}
            <button
              onClick={generate}
              disabled={!selected || loading}
              className="w-full mt-10 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500
                         text-white rounded-xl text-xl font-semibold hover:scale-[1.02]
                         disabled:opacity-50 transition-all"
            >
              {loading ? "Generating..." : "Generate Treatment Plan"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
