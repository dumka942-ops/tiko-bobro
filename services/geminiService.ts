
import { GoogleGenAI } from "@google/genai";

export class BobroService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askBobro(question: string, context?: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a friendly Beaver (Bobro) assistant for "Tiko-Bobro-Tub". 
        Your style is helpful, uses wood/dam/water metaphors, and you're an expert in video content.
        ${context ? `Current Video Context: ${context}` : ''}
        
        Question: ${question}`,
        config: {
          systemInstruction: "You are 'Bobro-Bot', the official assistant of Tiko-Bobro-Tub. Speak like a wise, energetic beaver. Use tree and dam metaphors.",
          temperature: 0.7,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Oops! My dam broke while thinking. Try again later, wood-friend!";
    }
  }

  async getBeaverFact() {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Tell me an amazing, lesser-known fact about beavers.",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      return response.text;
    } catch (error) {
      return "Beavers can hold their breath for up to 15 minutes! (Even if my brain is currently foggy).";
    }
  }
}

export const bobroService = new BobroService();
