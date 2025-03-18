import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { InstitutionPage } from "../pages/InstitutionPage";
import { AutocompleteExample } from "../pages/AutocompleteExample";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ApplicantEntryPage } from "../pages/ApplicantEntryPage";
import { ApplicantRegistrationPage } from "../pages/ApplicantRegistrationPage";
import { AdminLoginPage } from "../pages/AdminLoginPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { AdminRegistrationPage } from "../pages/AdminRegistrationPage";
import { AdminVerificationPage } from "../pages/AdminVerificationPage";

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

      {/* Rutas de Administración */}
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/registro" element={<AdminRegistrationPage />} />
      <Route path="/admin/verificar" element={<AdminVerificationPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

      {/* Redirección para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
