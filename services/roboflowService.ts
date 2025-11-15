import type { RoboflowPrediction, RoboflowConfig } from '../types-roboflow';

/**
 * Calls your live Roboflow classification model API.
 * This is FULL CODE.
 */
export const analyzeImageWithRoboflow = async (
  imageData: string,
  config: RoboflowConfig
): Promise<RoboflowPrediction[]> => {
  // Extract raw base64 string (Roboflow requirement)
  const base64Image = imageData.split(',')[1];
  if (!base64Image) {
    throw new Error('Invalid image data format.');
  }

  // Build dynamic API URL from user config
  if (!config.url || !config.apiKey) {
    throw new Error("Roboflow model URL and API key not provided.");
  }

  const apiUrl = `${config.url}?api_key=${config.apiKey}`;

  console.log('Calling live Roboflow API...', apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: base64Image,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch (e) {}
      throw new Error(`Roboflow API Error: ${errorMessage}`);
    }

    const result = await response.json();

    if (result && Array.isArray(result.predictions)) {
      const predictions: RoboflowPrediction[] = result.predictions.map((p: any) => ({
        class: p.class,
        confidence: p.confidence,
      }));

      predictions.sort((a, b) => b.confidence - a.confidence);

      console.log('Live Roboflow predictions received:', predictions);
      return predictions;
    }

    throw new Error('Invalid response structure from Roboflow API.');
  } catch (error) {
    console.error('Error calling Roboflow API:', error);

    if (error instanceof Error && error.message.includes('Failed to fetch')) {
      throw new Error(
        'Network error or CORS issue. Check browser console and model URL.'
      );
    }

    throw error;
  }
};
