import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

export default function Analysis({
  onBack,
  onSelectTumor,
}: {
  onBack: () => void;
  onSelectTumor: (tumor: string) => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const ROBOFLOW_API_KEY = import.meta.env.VITE_ROBOFLOW_API_KEY;
  const ROBOFLOW_MODEL = import.meta.env.VITE_ROBOFLOW_MODEL;
  const ROBOFLOW_VERSION = import.meta.env.VITE_ROBOFLOW_VERSION;

  console.log("ENV LOADED:", ROBOFLOW_API_KEY, ROBOFLOW_MODEL, ROBOFLOW_VERSION);

  // ------------------------------
  // Image Upload
  // ------------------------------
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // ------------------------------
  // Call Roboflow
  // ------------------------------
  const sendToRoboflow = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(
        `https://detect.roboflow.com/${ROBOFLOW_MODEL}/${ROBOFLOW_VERSION}?api_key=${ROBOFLOW_API_KEY}`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to get response" });
    }

    setLoading(false);
  };

  // ------------------------------
  // Convert Raw Confidences → Percent Bars
  // ------------------------------
  const getPercents = () => {
    if (!result?.predictions) return null;

    const preds = result.predictions;

    return [
      { name: "Glioma", value: preds.glioma.confidence },
      { name: "Meningioma", value: preds.meningioma.confidence },
      { name: "Pituitary", value: preds.pituitary.confidence },
      { name: "No Tumor", value: preds.notumor.confidence },
    ];
  };

  const percentBars = getPercents();
  
  // top predicted tumor — string
  const predicted = result?.predicted_classes?.[0] ?? null;

  return (
      <div className="relative min-h-screen overflow-hidden bg-[#0f172a] z-0 pt-24">

      {/* MAIN PANEL */}
      <div className="relative z-10 flex justify-center pt-28 px-6 pb-12">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl w-full max-w-3xl 
                        border border-white/20 shadow-2xl">

          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Brain Tumor Analysis
          </h1>

          {/* UPLOAD */}
          <input type="file" onChange={handleUpload} accept="image/*" className="w-full text-white mb-4" />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-64 mx-auto mt-4 rounded-lg border border-white/20 shadow-lg"
            />
          )}

          {/* ANALYZE BUTTON */}
          <button
            onClick={sendToRoboflow}
            disabled={!image || loading}
            className="mt-6 w-full py-3 bg-green-600 rounded-lg text-white font-semibold 
                       hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Analyze Image"}
          </button>

          {/* CONFIDENCE BARS */}
          {percentBars && (
            <div className="mt-10 bg-black/40 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl text-white font-semibold mb-4 text-center">
                Tumor Classification Confidence
              </h2>

              {percentBars.map((item) => {
                const pct = (item.value * 100).toFixed(2);
                return (
                  <div key={item.name} className="mb-4">
                    <div className="flex justify-between text-white mb-1">
                      <span>{item.name}</span>
                      <span>{pct}%</span>
                    </div>

                    <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${
                          item.name === "No Tumor"
                            ? "bg-green-400"
                            : "bg-blue-500"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* TREATMENT BUTTON */}
              {predicted && (
                <div className="mt-6 text-center">
                  <p className="text-white text-lg">
                    📌 <b>Most likely:</b> {predicted.toUpperCase()}
                  </p>

                  <button
                    onClick={() => onSelectTumor(predicted)}
                    className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    View Treatment Options →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ERROR */}
          {result?.error && (
            <p className="text-red-400 mt-6 text-center">{result.error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
