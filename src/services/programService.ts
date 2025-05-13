import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://hdvcvqqro4.execute-api.us-east-1.amazonaws.com/dev';

// Client for API requests
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
});

// Interface for academic program data received from API
export interface ProgramApiResponse {
    id: string;
    nombre: string;
    institucionId: string;
    nivel: string;
    modalidad: string;
    duracion: number;
    creditos: number;
    codigo: string;
    estado: string;
    municipio: string;
}

// Interface for the UI representation of a program
export interface ProgramUI {
    id: string;
    name: string;
    institucionId: string;
    level: string;
    duration: string;
    modalidad: string;
    credits: number;
    code: string;
    estado: string;
    municipio: string;
}

// Interface for filtering programs
export interface ProgramFilters {
    nivel?: string;
    modalidad?: string;
    institucionId?: string;
    municipio?: string;
    duracionPrograma?: string;
    limit?: number;
    nextToken?: string;
}

// Interface for the API response
export interface ProgramsResponse {
    programs: ProgramApiResponse[];
    count: number;
    nextToken?: string;
    filters: {
        nivel: string | null;
        modalidad: string | null;
        institucionId: string | null;
        municipio: string | null;
    };
}

// Program service with methods to interact with the API
export const programService = {
    // Get academic programs with optional filters
    getPrograms: async (filters?: ProgramFilters): Promise<ProgramsResponse> => {
        try {
            // Prepare query parameters
            const params = new URLSearchParams();
            if (filters?.nivel) params.append('nivel', filters.nivel);
            if (filters?.modalidad) params.append('modalidad', filters.modalidad);
            if (filters?.institucionId) params.append('institucionId', filters.institucionId);
            if (filters?.municipio) params.append('municipio', filters.municipio);
            if (filters?.duracionPrograma) params.append('duracionPrograma', filters.duracionPrograma);
            if (filters?.limit) params.append('limit', filters.limit.toString());
            if (filters?.nextToken) params.append('nextToken', filters.nextToken);

            // Make the API request
            const response = await apiClient.get<ProgramsResponse>('/academic-programs', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching academic programs:', error);
            throw error;
        }
    },

    // Transform API response to UI model
    transformToUIModel: (program: ProgramApiResponse): ProgramUI => {
        return {
            id: program.id,
            name: program.nombre,
            institucionId: program.institucionId,
            level: program.nivel,
            duration: `${program.duracion} semestres`,
            modalidad: program.modalidad,
            credits: program.creditos,
            code: program.codigo,
            estado: program.estado,
            municipio: program.municipio
        };
    }
};

export default programService; 