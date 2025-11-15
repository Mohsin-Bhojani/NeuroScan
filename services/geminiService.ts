import { GoogleGenAI } from "@google/genai";
import { TumorType } from "./types";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCJRrEy7y1nT5Cbm9hkfhgrrXL52k_0sNQ"
});

export async function generateTreatmentPlan(tumorType: TumorType): Promise<string> {
  const prompt = `
  You are an expert neuro-oncologist. Create a detailed medical sample report for the tumor type: ${tumorType}

  Include these sections:
  1. Diagnosis overview
  2. Surgical options
  3. Radiation therapy options
  4. Chemotherapy & systemic therapies
  5. Multidisciplinary management
  6. General prognosis (no statistics)
  7. DISCLAIMER: "This is not medical advice."

  Format with Markdown headings and bullet points and include gaps between lines wherever necessary.
  dont say anythign other than the report like "Ok ill do it"
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini error:", error);
    throw new Error("Failed to generate treatment plan.");
  }
}
