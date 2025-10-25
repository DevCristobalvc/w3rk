import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Función para procesar archivos y extraer contenido
async function processFiles(files: any[]): Promise<string> {
  if (!files || files.length === 0) return "";

  let fileContent = "\n\n📎 ARCHIVOS ADJUNTOS:\n";
  
  for (const file of files) {
    try {
      fileContent += `\n--- ${file.name} (${file.type}) ---\n`;
      
      // Para archivos de texto simples
      if (file.type === 'text/plain') {
        // Decodificar base64
        const base64Data = file.data.split(',')[1];
        const text = atob(base64Data);
        fileContent += `Contenido: ${text.substring(0, 2000)}${text.length > 2000 ? '...' : ''}\n`;
      }
      // Para imágenes, indicamos que necesitamos análisis visual
      else if (file.type.startsWith('image/')) {
        fileContent += `[Imagen adjunta - ${file.name}]\n`;
        fileContent += `Tipo: ${file.type}\n`;
        fileContent += `Tamaño: ${file.size} bytes\n`;
        fileContent += `Data URL disponible para análisis visual\n`;
        fileContent += `Nota: Esta es una imagen. Puedo analizarla visualmente si es necesario.\n`;
      }
      // Para PDFs y documentos
      else if (file.type === 'application/pdf') {
        fileContent += `[PDF adjunto - ${file.name}]\n`;
        fileContent += `Tamaño: ${file.size} bytes\n`;
        fileContent += `Data URL disponible: ${file.data.substring(0, 100)}...\n`;
        fileContent += `Nota: Este es un PDF. Para análisis completo necesitaría herramientas de extracción de texto específicas.\n`;
      }
      // Para documentos de Word
      else if (file.type.includes('word') || file.type.includes('document')) {
        fileContent += `[Documento Word adjunto - ${file.name}]\n`;
        fileContent += `Tamaño: ${file.size} bytes\n`;
        fileContent += `Data URL disponible: ${file.data.substring(0, 100)}...\n`;
        fileContent += `Nota: Este es un documento de Word. Para análisis completo necesitaría herramientas de extracción de texto específicas.\n`;
      }
      else {
        fileContent += `[Archivo adjunto - ${file.name}]\n`;
        fileContent += `Tipo: ${file.type}\n`;
        fileContent += `Tamaño: ${file.size} bytes\n`;
        fileContent += `Data URL disponible: ${file.data.substring(0, 100)}...\n`;
        fileContent += `Nota: Tipo de archivo no procesable directamente. Por favor, describe el contenido o conviértelo a texto.\n`;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      fileContent += `\nError procesando ${file.name}: ${errorMessage}\n`;
    }
  }
  
  return fileContent;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, files } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    // Procesar archivos si existen
    let fileContent = "";
    if (files && files.length > 0) {
      fileContent = await processFiles(files);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Eres un agente especializado en análisis de documentos y asistencia profesional para la red ASI Alliance. Tu trabajo es:

1. **Análisis de archivos adjuntos**: Lee y procesa archivos que el usuario envíe (PDFs, imágenes, documentos, etc.)
2. **Extracción de contenido**: Extrae información relevante de los documentos
3. **Respuestas estructuradas**: Proporciona respuestas claras con citas y referencias
4. **Orientación profesional**: Ayuda con carreras Web3, credenciales on-chain y networking

**Capacidades de procesamiento de archivos:**
- Texto plano: Extrae y analiza contenido directamente
- Imágenes: Describe lo que ves y pide descripción del usuario si es necesario
- PDFs/Documentos: Indica limitaciones y sugiere conversión a texto
- Múltiples archivos: Procesa todos los archivos adjuntos

**Formato de respuesta:**
- Responde en español natural y directo
- Cita fuentes cuando uses información de archivos
- Indica limitaciones si no puedes procesar un archivo completamente
- Sugiere próximos pasos cuando sea relevante

${fileContent}`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
