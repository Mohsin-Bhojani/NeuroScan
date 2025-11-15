import { useState } from "react";
import Analysis from "./Analysis";
import Squares from "./components/Squares";
import GooeyNav from "./components/GooeyNav";
import TreatmentPlan from "./TreatmentPlan";
import AboutUs from "./AboutUs";

export default function App() {
  const [screen, setScreen] = useState<"home" | "analysis" | "treatment" | "about">("home");
  const [selectedTumor, setSelectedTumor] = useState<string | null>(null);

  // 🟦 NAVBAR ITEMS
  const navItems = [
    { label: "Home", onClick: () => setScreen("home") },
    { label: "Treatment", onClick: () => setScreen("treatment") },
    { label: "About Us", onClick: () => setScreen("about") },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      {/* 🔵 NAVBAR — fixed on top for all screens */}
      <div
        style={{
          position: "fixed",
          top: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            height: "80px",
            overflow: "hidden",
            zIndex: 40,
          }}
        >
          <GooeyNav items={navItems} />
        </div>
      </div>

      {/* ===================================================== */}
      {/*                   PAGE BACKGROUNDS                    */}
      {/* ===================================================== */}

      {/* HOME gets Squares */}
      {screen === "home" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <Squares
            speed={0.3}
            squareSize={40}
            direction="diagonal"
            borderColor="#ffffff20"
            hoverFillColor="#222"
          />
        </div>
      )}

      {/* ANALYSIS / TREATMENT / ABOUT get a clean dark background */}
      {(screen === "analysis" || screen === "treatment" || screen === "about") && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#0f172a", // clean dark medical UI background
            zIndex: 1,
          }}
        />
      )}

      {/* ===================================================== */}
      {/*                   MAIN CONTENT RENDER                 */}
      {/* ===================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 20,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 120, // prevent navbar overlap
        }}
      >
        {/* ----------------- HOME PAGE ----------------- */}
        {screen === "home" && (
          <div
            style={{
              textAlign: "center",
              color: "white",
              padding: 20,
              position: "relative",
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                width: 500,
                height: 500,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,122,255,0.25), transparent 70%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(80px)",
                zIndex: -1,
              }}
            />

            {/* Glass Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
                borderRadius: 20,
                padding: "40px 50px",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0px 15px 40px rgba(0,0,0,0.4)",
                maxWidth: 600,
                margin: "auto",
              }}
            >
              <h1
                style={{
                  fontSize: 52,
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: 20,
                }}
              >
                NeuroScan AI
              </h1>

              <p
                style={{
                  fontSize: 20,
                  color: "#e2e8f0",
                  marginBottom: 30,
                }}
              >
                Upload an MRI scan and our advanced AI model will detect possible
                brain tumors with medical-grade precision.
              </p>

              <button
                onClick={() => setScreen("analysis")}
                style={{
                  padding: "14px 30px",
                  borderRadius: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                  cursor: "pointer",
                  background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
                  color: "white",
                  border: "none",
                  boxShadow: "0px 0px 25px rgba(14,165,233,0.7)",
                  transition: "0.2s",
                }}
              >
                Start Analysis →
              </button>
            </div>
          </div>
        )}

        {/* ----------------- ANALYSIS PAGE ----------------- */}
        {screen === "analysis" && (
          <Analysis
            onBack={() => setScreen("home")}
            onSelectTumor={(tumor) => {
              setSelectedTumor(tumor);
              setScreen("treatment");
            }}
          />
        )}

        {/* ----------------- TREATMENT PAGE ----------------- */}
        {screen === "treatment" && (
          <TreatmentPlan
            onBack={() => setScreen("home")}
            selectedTumor={selectedTumor}
          />
        )}

        {/* ----------------- ABOUT PAGE ----------------- */}
        {screen === "about" && <AboutUs onBack={() => setScreen("home")} />}
      </div>
    </div>
  );
}
