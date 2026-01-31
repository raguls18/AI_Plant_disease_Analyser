import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeImage(imageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Convert File to GenerativePart
    const imageData = await fileToGenerativePart(imageFile);
    
    const prompt = `
      Act as a professional plant pathologist and botanist. 
      Analyze this image of a plant or crop and provide a detailed report in JSON format with the following structure:
      {
        "plantName": "Common and Scientific name",
        "healthStatus": "Healthy / Diseased / Stressed",
        "confidence": "Percentage",
        "diagnosis": "Detailed explanation of what is wrong or why it is healthy",
        "diseaseName": "Name of disease if applicable, else 'None'",
        "treatment": ["List of immediate steps to take"],
        "prevention": ["List of tips to prevent this in the future"]
      }
      If the image is not a plant, return an error message in the "diagnosis" field.
    `;

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response (Gemini sometimes wraps it in markdown blocks)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}