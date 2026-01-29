
import {GoogleGenAI} from "@google/genai";

// Fix: Initialized the Gemini client using the required environment variable and implemented the generation logic.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Genera una dedicatoria personalizada usando Gemini 3 Flash.
 * @param author Nombre del invitado para personalizar el mensaje.
 */
export const generateWeddingCaption = async (author: string): Promise<string> => {
  if (!process.env.API_KEY) return "";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escribe una dedicatoria muy corta (máximo 15 palabras) y emotiva para la boda de Rocío y Matías. El mensaje es de parte de ${author}. Usa un tono elegante y romántico.`,
      config: {
        systemInstruction: "Eres un asistente romántico para un álbum de bodas digital. Escribes mensajes breves y significativos.",
        temperature: 0.8,
      },
    });
    
    // Accedemos a la propiedad .text directamente como especifica la documentación del SDK.
    return response.text?.trim().replace(/^"|"$/g, '') || "";
  } catch (error) {
    console.error("Gemini service error:", error);
    return "";
  }
};
