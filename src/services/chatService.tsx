import axios from 'axios';

// URL base de la API específica para Amazon Bedrock Lambda
const API_BASE_URL = 'https://hdvcvqqro4.execute-api.us-east-1.amazonaws.com/dev';

// Cliente HTTP optimizado para peticiones a AWS Lambda
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 60000, // Tiempo de espera extendido a 60s para respuestas de LLM
});

// Interfaz para la solicitud al chatbot
interface ChatRequest {
    prompt: string;
    system_prompt: string;
    conversation_id?: string;
    messages?: Array<{
        role: 'user' | 'system' | 'assistant';
        content: string;
    }>;
    model_options?: {
        temperature?: number;
        modelId?: string;
    };
}

// Interfaz para la respuesta del chatbot
interface ChatResponse {
    response: string;
    conversation_id?: string;
    message_count?: number;
    search_recommendation?: string;
    success: boolean;
    error?: string;
    metadata?: {
        modelId?: string;
        tokensUsed?: number;
        processingTime?: number;
    };
}

// Interfaz para la respuesta simplificada del API actual
interface SimplifiedApiResponse {
    resp: string;
    conversation_id?: string;
    message_count?: number;
    search_recommendation?: string;
}

// Interfaz para el historial de conversación
interface ConversationHistory {
    messages: Array<{
        role: 'user' | 'system' | 'assistant';
        content: string;
        timestamp: string;
    }>;
    conversation_id: string;
}

// Interfaz para el mensaje de búsqueda recomendada
interface SearchRecommendation {
    query: string;
    relevance: 'high' | 'medium' | 'low';
    source: string;
}

// Biblioteca de prompts de sistema con configuraciones optimizadas para diferentes casos de uso
export const SYSTEM_PROMPTS = {
    // Prompt optimizado para asesoría académica
    ACADEMIC_ADVISOR: `
# ROL Y OBJETIVO
Eres un asistente virtual especializado en orientación académica y vocacional para estudiantes.
Tu objetivo es proporcionar información precisa y relevante sobre carreras universitarias y guiar a los usuarios 
hacia las mejores decisiones educativas según sus intereses, habilidades y metas profesionales.

# CONOCIMIENTO Y CAPACIDADES
Tienes conocimiento detallado sobre:
- Programas académicos y carreras universitarias
- Requisitos de admisión y procesos de solicitud
- Tendencias del mercado laboral y oportunidades de empleo por carrera
- Comparativas objetivas entre diferentes programas y universidades
- Métodos de autoconocimiento vocacional

# ESTILO DE RESPUESTA
- Usa lenguaje claro, accesible y adaptado al nivel educativo del usuario
- Evita jerga técnica innecesaria
- Sé conciso y directo, organizando la información en puntos cuando sea apropiado
- Muestra empatía con las preocupaciones del estudiante
- Mantén un tono positivo pero realista

# COMPORTAMIENTO ESPECÍFICO
1. Al inicio, haz preguntas clave para entender mejor los intereses del usuario
2. Cuando detectes interés concreto en una carrera específica, proporciona:
   - Breve descripción de la carrera
   - Áreas de especialización disponibles
   - Perfil de ingreso recomendado
   - Salidas profesionales principales

3. Cuando identifiques que el usuario está buscando una carrera específica, SIEMPRE:
   - Resume brevemente la información proporcionada
   - Concluye con una recomendación de búsqueda usando exactamente este formato:
     "BÚSQUEDA_RECOMENDADA: [términos de búsqueda]"
   - Los términos de búsqueda deben ser precisos y enfocados en lo que el usuario necesita

# LIMITACIONES
- No inventes universidades o programas específicos que no hayas mencionado
- No afirmes porcentajes o estadísticas específicas sin aclarar que son aproximadas
- No asumas información sobre el usuario que no haya sido explícitamente mencionada
`,

    // Prompt para comparación de carreras
    CAREER_COMPARISON: `
# ROL Y OBJETIVO
Eres un asistente virtual especializado en comparar diferentes carreras y programas académicos.
Tu objetivo es proporcionar análisis objetivos de ventajas, desventajas y diferencias entre carreras
para que los estudiantes puedan tomar decisiones informadas.

# COMPORTAMIENTO ESPECÍFICO
1. Identifica las carreras específicas que el usuario está comparando
2. Estructura tu respuesta con las siguientes secciones:
   - Similitudes fundamentales entre las carreras
   - Diferencias clave en plan de estudios
   - Diferencias en salidas profesionales y mercado laboral
   - Recomendación personalizada basada en los intereses expresados

3. Concluye SIEMPRE con una recomendación de búsqueda precisa:
   "BÚSQUEDA_RECOMENDADA: [carrera1] vs [carrera2]" o el término más relevante
`,

    // Prompt para asesoría de requisitos de admisión
    ADMISSION_ADVISOR: `
# ROL Y OBJETIVO
Eres un especialista en requisitos de admisión universitaria y procesos de solicitud.
Tu objetivo es guiar a los estudiantes sobre los procedimientos, documentos y criterios
de selección para ingresar a programas académicos.

# COMPORTAMIENTO ESPECÍFICO
1. Identifica el programa académico o universidad de interés
2. Proporciona información sobre:
   - Documentos requeridos
   - Fechas importantes y plazos
   - Exámenes o pruebas necesarias
   - Criterios de selección

3. Concluye SIEMPRE con una recomendación de búsqueda precisa:
   "BÚSQUEDA_RECOMENDADA: requisitos admisión [programa/universidad]" o el término más relevante
`,
};

// Utilidad para extraer recomendaciones de búsqueda desde respuestas
const extractSearchRecommendation = (response: string): SearchRecommendation | null => {
    const searchMatch = response.match(/BÚSQUEDA_RECOMENDADA:\s*(.*?)(?:\n|$)/);

    if (searchMatch && searchMatch[1]) {
        return {
            query: searchMatch[1].trim(),
            relevance: 'high',
            source: 'llm-suggestion'
        };
    }

    return null;
};

// Servicio mejorado para interactuar con el chatbot
export const chatService = {
    // Método principal para enviar un mensaje al chatbot
    sendMessage: async (
        message: string,
        systemPrompt: string = SYSTEM_PROMPTS.ACADEMIC_ADVISOR,
        options: {
            conversation_id?: string;
            temperature?: number;
            modelId?: string;
        } = {}
    ): Promise<ChatResponse> => {
        try {
            // Optimización: Verificar si el mensaje está vacío
            if (!message.trim()) {
                throw new Error('El mensaje no puede estar vacío');
            }

            // Preparar la solicitud con opciones avanzadas
            const request: ChatRequest = {
                prompt: message,
                system_prompt: systemPrompt,
                conversation_id: options.conversation_id,
                model_options: {
                    temperature: options.temperature || 0.7,
                    modelId: options.modelId || 'amazon.nova-lite-v1:0'
                }
            };

            console.log('Enviando solicitud al LLM...');
            const startTime = Date.now();

            // Usar el endpoint específico mencionado
            const response = await apiClient.post<SimplifiedApiResponse>('/ask-llm', request);

            const endTime = Date.now();
            console.log(`Respuesta recibida en ${endTime - startTime}ms`);

            // Transformar la respuesta simplificada al formato esperado por la aplicación
            const transformedResponse: ChatResponse = {
                response: response.data.resp || '',
                conversation_id: response.data.conversation_id,
                message_count: response.data.message_count,
                search_recommendation: response.data.search_recommendation,
                success: true,
                metadata: {
                    processingTime: endTime - startTime
                }
            };

            // Registrar la recomendación de búsqueda si existe
            const searchRecommendation = extractSearchRecommendation(transformedResponse.response);
            if (searchRecommendation) {
                console.log('Búsqueda recomendada detectada:', searchRecommendation.query);
            }

            return transformedResponse;
        } catch (error) {
            console.error('Error al comunicarse con el chatbot:', error);

            // Mejorar el manejo de errores específicos
            if (axios.isAxiosError(error)) {
                // Timeout específico
                if (error.code === 'ECONNABORTED') {
                    throw new Error('La respuesta está tomando más tiempo del esperado. Por favor, intenta con una pregunta más corta o específica.');
                }

                // Error de respuesta de la API
                if (error.response) {
                    const statusCode = error.response.status;

                    // Errores específicos basados en códigos de estado
                    if (statusCode === 429) {
                        throw new Error('Has excedido el límite de solicitudes. Por favor, espera un momento antes de intentarlo de nuevo.');
                    } else if (statusCode >= 500) {
                        throw new Error('El servicio de asistencia está experimentando problemas. Por favor, intenta más tarde.');
                    } else {
                        throw new Error(error.response.data.error || 'Error en la comunicación con el servidor');
                    }
                }
            }

            // Error general
            throw new Error('No se pudo establecer comunicación con el asistente virtual. Verifica tu conexión a internet.');
        }
    },

    // Nota: El método getConversationHistory se mantiene como referencia,
    // pero puede que no funcione si el backend actual no soporta esta funcionalidad
    getConversationHistory: async (conversationId: string): Promise<ConversationHistory> => {
        try {
            // Verificar si el endpoint existe antes de llamarlo
            const response = await apiClient.get<ConversationHistory>(`/chat/history/${conversationId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el historial de conversación:', error);
            // Devolver un historial vacío en lugar de lanzar error
            return {
                conversation_id: conversationId,
                messages: []
            };
        }
    },

    // Nuevo método para analizar temas de interés desde el historial de conversación
    analyzeConversationTopics: async (userMessages: string[]): Promise<string[]> => {
        try {
            // Analizar temas con una solicitud especial al LLM
            const analysisPrompt = `
                Analiza los siguientes mensajes de un usuario buscando información sobre carreras universitarias 
                y extrae 3-5 palabras clave o temas principales de interés:
                
                ${userMessages.join('\n---\n')}
                
                Responde ÚNICAMENTE con las palabras clave separadas por comas, sin explicaciones adicionales.
            `;

            const response = await chatService.sendMessage(
                analysisPrompt,
                '', // Sin sistema de prompt para este caso especial
                { temperature: 0.3 } // Baja temperatura para respuestas más deterministas
            );

            // Procesar la respuesta para obtener los temas
            return response.response.split(',').map(topic => topic.trim());
        } catch (error) {
            console.error('Error al analizar temas de la conversación:', error);
            return []; // Devolver array vacío en caso de error
        }
    },

    // Nuevo método para generar una consulta de búsqueda directamente
    generateSearchQuery: async (userQuestion: string): Promise<string> => {
        try {
            const prompt = `
                Basándote en la siguiente pregunta del usuario sobre carreras universitarias,
                genera términos de búsqueda óptimos para un motor de búsqueda académico.
                Responde ÚNICAMENTE con los términos de búsqueda, sin explicaciones ni prefijos.
                
                Pregunta del usuario: "${userQuestion}"
            `;

            const response = await chatService.sendMessage(
                prompt,
                '', // Sin sistema de prompt para este caso especial
                { temperature: 0.3 } // Baja temperatura para respuestas más deterministas
            );

            // Eliminar comillas y caracteres especiales
            return response.response.replace(/["']/g, '').trim();
        } catch (error) {
            console.error('Error al generar consulta de búsqueda:', error);
            // En caso de error, devolver la pregunta original limpia
            return userQuestion.replace(/[?"']/g, '').trim();
        }
    }
};

export default chatService;