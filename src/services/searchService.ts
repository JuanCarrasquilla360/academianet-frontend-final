import { institutionService, InstitutionUI } from './institutionService';
import { programService, ProgramUI } from './programService';

export interface SearchFilters {
  searchTerm?: string;
  modalidad?: string[];
  nivel?: string[];
  municipio?: string[];
  institucionId?: string;
}

export interface SearchResults {
  programs: ProgramUI[];
  institutions: InstitutionUI[];
  totalPrograms: number;
  totalInstitutions: number;
  loading: boolean;
  error: string | null;
}

export const searchService = {
  // Search programs and institutions with given filters
  search: async (filters: SearchFilters): Promise<SearchResults> => {
    try {
      // Initialize result object
      const results: SearchResults = {
        programs: [],
        institutions: [],
        totalPrograms: 0,
        totalInstitutions: 0,
        loading: false,
        error: null
      };

      // Set up the search parameters
      const programFilters: any = {};
      const institutionFilters: any = {};

      // Add search term to filters if provided
      // For now, we need to get all data and filter client-side
      // since the API doesn't support text search yet
      
      // Apply specific filters
      if (filters.nivel && filters.nivel.length > 0) {
        programFilters.nivel = filters.nivel[0]; // API only supports single value
      }
      
      if (filters.modalidad && filters.modalidad.length > 0) {
        programFilters.modalidad = filters.modalidad[0]; // API only supports single value
      }

      if (filters.municipio && filters.municipio.length > 0) {
        programFilters.municipio = filters.municipio[0]; // API only supports single value
        institutionFilters.ciudad = filters.municipio[0]; // For institutions
      }

      if (filters.institucionId) {
        programFilters.institucionId = filters.institucionId;
      }

      // Fetch programs and institutions in parallel
      const [programsResponse, institutionsResponse] = await Promise.all([
        programService.getPrograms(programFilters),
        institutionService.getInstitutions(institutionFilters)
      ]);

      // Transform API responses to UI models
      let programs = programsResponse.programs.map(prog => 
        programService.transformToUIModel(prog)
      );
      
      let institutions = institutionsResponse.institutions.map(inst => 
        institutionService.transformToUIModel(inst)
      );

      // Apply text search filter client-side if searchTerm provided
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        
        programs = programs.filter(program => 
          program.name.toLowerCase().includes(searchTermLower) || 
          program.level.toLowerCase().includes(searchTermLower) ||
          program.modalidad.toLowerCase().includes(searchTermLower) ||
          program.municipio.toLowerCase().includes(searchTermLower)
        );

        institutions = institutions.filter(institution =>
          institution.nombre.toLowerCase().includes(searchTermLower) ||
          institution.ciudad.toLowerCase().includes(searchTermLower) ||
          institution.tipoInstitucion.toLowerCase().includes(searchTermLower)
        );
      }

      return {
        programs,
        institutions,
        totalPrograms: programs.length,
        totalInstitutions: institutions.length,
        loading: false,
        error: null
      };
    } catch (error) {
      console.error('Error searching programs and institutions:', error);
      throw error;
    }
  },

  // Method to map API program response to the search result model
  mapProgramsToSearchModel: (programs: ProgramUI[]): any[] => {
    return programs.map(program => ({
      id: program.id,
      title: program.name,
      university: program.institucionId, // We'll need to replace this with actual institution name
      location: program.municipio,
      description: `Programa académico de nivel ${program.level} con una duración de ${program.duration} y ${program.credits} créditos.`,
      logoUrl: '/src/assets/logos/institution-default.png', // Default logo
      modality: [program.modalidad],
      duration: program.duration,
      level: program.level,
      credits: program.credits,
      code: program.code,
      estado: program.estado
    }));
  },

  // Method to enrich programs with institution information
  enrichProgramsWithInstitutions: async (programs: any[]): Promise<any[]> => {
    try {
      // Get all institutions to map IDs to names
      const institutionsResponse = await institutionService.getInstitutions();
      const institutionsMap = new Map();
      
      institutionsResponse.institutions.forEach(inst => {
        const uiModel = institutionService.transformToUIModel(inst);
        institutionsMap.set(inst.id, {
          name: inst.nombre,
          logoUrl: uiModel.logoUrl
        });
      });

      // Enrich programs with institution data
      return programs.map(program => {
        const institution = institutionsMap.get(program.university);
        return {
          ...program,
          university: institution ? institution.name : 'Institución Desconocida',
          logoUrl: institution ? institution.logoUrl : '/src/assets/logos/institution-default.png'
        };
      });
    } catch (error) {
      console.error('Error enriching programs with institution data:', error);
      return programs; // Return original programs if enrichment fails
    }
  }
};

export default searchService; 