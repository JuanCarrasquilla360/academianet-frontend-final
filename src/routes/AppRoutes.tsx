import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { InstitutionPage } from "../pages/InstitutionPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/institucion/:id" element={<InstitutionPage />} />
      <Route path="/busqueda" element={<SearchResultsPage />} />
      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
