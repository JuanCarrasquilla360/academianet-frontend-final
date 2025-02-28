// Tipos relacionados con instituciones
export interface Institution {
  id: string;
  name: string;
  logoUrl: string;
  description?: string;
  website?: string;
  city?: string;
  country?: string;
  foundedYear?: number;
  programs?: Program[];
}

// Tipos relacionados con programas académicos
export interface Program {
  id: string;
  name: string;
  degree: DegreeType;
  duration: number; // en semestres
  description?: string;
  facultyId?: string;
}

export enum DegreeType {
  TECHNICAL = "Técnico",
  TECHNOLOGICAL = "Tecnológico",
  PROFESSIONAL = "Profesional",
  SPECIALIZATION = "Especialización",
  MASTERS = "Maestría",
  DOCTORATE = "Doctorado",
}

// Tipos relacionados con formularios
export interface InstitutionFormValues {
  carrera: string;
  institucion: string;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
