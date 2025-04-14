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

// Interface for institution data received from API
export interface InstitutionApiResponse {
    id: string;
    nombre: string;
    ciudad: string;
    tipoInstitucion: string;
    codigoInstitucion: string;
}

// Interface for institution data with additional fields needed by the UI
export interface InstitutionUI extends InstitutionApiResponse {
    logoUrl: string;   // Temporary field until provided by API
    website: string;   // Temporary field until provided by API
    description?: string;
    foundedYear?: number;
    country?: string;
}

// Interface for filtering institutions
export interface InstitutionFilters {
    ciudad?: string;
    tipoInstitucion?: string;
    limit?: number;
    nextToken?: string;
}

// Interface for the API response
export interface InstitutionsResponse {
    institutions: InstitutionApiResponse[];
    count: number;
    nextToken?: string;
    filters: {
        ciudad: string | null;
        tipoInstitucion: string | null;
    };
}

// Institution service with methods to interact with the API
export const institutionService = {
    // Get institutions with optional filters
    getInstitutions: async (filters?: InstitutionFilters): Promise<InstitutionsResponse> => {
        try {
            // Prepare query parameters
            const params = new URLSearchParams();
            if (filters?.ciudad) params.append('ciudad', filters.ciudad);
            if (filters?.tipoInstitucion) params.append('tipoInstitucion', filters.tipoInstitucion);
            if (filters?.limit) params.append('limit', filters.limit.toString());
            if (filters?.nextToken) params.append('nextToken', filters.nextToken);

            // Make the API request
            const response = await apiClient.get<InstitutionsResponse>('/excel-institutions', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching institutions:', error);
            throw error;
        }
    },

    // Transform API response to UI model (adding temporary fields)
    transformToUIModel: (institution: InstitutionApiResponse): InstitutionUI => {
        return {
            ...institution,
            logoUrl: '/src/assets/logos/institution-default.png',  // Default logo until provided by API
            website: `https://www.${institution.nombre.toLowerCase().replace(/\s+/g, '')}.edu.co`,  // Temporary website URL
            description: `${institution.nombre} es una institución educativa ubicada en ${institution.ciudad}.`,
            country: 'Colombia',
        };
    }
};

export default institutionService; 