// Roboflow API configuration and service
export const ROBOFLOW_CONFIG = {
  apiKey: import.meta.env.VITE_ROBOFLOW_API_KEY,
  privateKey: import.meta.env.VITE_ROBOFLOW_PRIVATE_KEY,
  // Common solar panel detection models on Roboflow
  modelEndpoint: 'https://detect.roboflow.com',
  workspaceName: 'solar-panels',
  modelVersion: '1',
};

export interface SolarPanelDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  image_path?: string;
}

export interface RoboflowResponse {
  predictions: SolarPanelDetection[];
  image: {
    width: number;
    height: number;
  };
  inference_time?: number;
}

/**
 * Detects solar panels in an image using Roboflow API
 * @param imageUrl - URL or base64 encoded image
 * @param modelId - Optional custom model ID (defaults to common solar panel model)
 */
export async function detectSolarPanels(
  imageUrl: string,
  modelId: string = 'solar-panel-detection/2'
): Promise<RoboflowResponse> {
  try {
    const apiKey = ROBOFLOW_CONFIG.apiKey;

    if (!apiKey) {
      throw new Error('Roboflow API key not configured');
    }

    // Construct the Roboflow inference URL
    const inferenceUrl = `${ROBOFLOW_CONFIG.modelEndpoint}/${modelId}`;

    // Prepare the request body
    const requestBody = imageUrl.startsWith('data:image')
      ? imageUrl.split(',')[1] // Extract base64 data if it's a data URL
      : imageUrl;

    const response = await fetch(
      `${inferenceUrl}?api_key=${apiKey}&confidence=40&overlap=30`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Roboflow API error: ${response.status} - ${errorText}`);
    }

    const data: RoboflowResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error detecting solar panels:', error);
    throw error;
  }
}

/**
 * Analyzes satellite imagery for solar panel detection
 * @param lat - Latitude
 * @param lng - Longitude
 * @param apiKey - Google Maps API key
 */
export async function analyzeSatelliteImage(
  lat: number,
  lng: number,
  apiKey: string,
  zoom: number = 20
): Promise<string> {
  // Generate Google Maps Static API URL for satellite imagery
  const width = 640;
  const height = 640;
  const mapType = 'satellite';

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=${mapType}&key=${apiKey}`;

  return staticMapUrl;
}

/**
 * Calculate solar panel coverage statistics
 */
export function calculateSolarStats(
  detections: SolarPanelDetection[],
  imageWidth: number,
  imageHeight: number
) {
  const totalImageArea = imageWidth * imageHeight;

  let totalPanelArea = 0;
  detections.forEach(detection => {
    totalPanelArea += detection.width * detection.height;
  });

  const coveragePercentage = (totalPanelArea / totalImageArea) * 100;
  const averageConfidence = detections.length > 0
    ? detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length
    : 0;

  return {
    panelCount: detections.length,
    totalPanelArea,
    coveragePercentage: parseFloat(coveragePercentage.toFixed(2)),
    averageConfidence: parseFloat(averageConfidence.toFixed(2)),
    hasSolarPanels: detections.length > 0,
  };
}
