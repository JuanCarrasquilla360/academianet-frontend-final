import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { InstitutionPage } from "../pages/InstitutionPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ApplicantEntryPage } from "../pages/ApplicantEntryPage";
import { ApplicantRegistrationPage } from "../pages/ApplicantRegistrationPage";
import { AutocompleteExample } from "../pages/AutocompleteExample";


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/institucion/:id" element={<InstitutionPage />} />
      <Route path="/autocomplete-example" element={<AutocompleteExample />} />
      <Route path="/busqueda" element={<SearchResultsPage />} />
      <Route path="/ingreso-aspirante" element={<ApplicantEntryPage />} />
      <Route
        path="/registro-aspirante"
        element={<ApplicantRegistrationPage />}
      />
      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
