import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme as useCustomTheme } from "../../hooks/useTheme";

export interface Program {
  id: string;
  title: string;
  university: string;
  location: string;
  description: string;
  logoUrl: string;
  modality: string[];
  duration: string;
  level: string;
}

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const muiTheme = useTheme();
  const { theme } = useCustomTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navegar a los detalles del programa usando su ID
    navigate(`/programa/${program.id}`);
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    // Evitar que el clic se propague al Card padre
    e.stopPropagation();
    navigate(`/programa/${program.id}/info`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: muiTheme.shadows[8],
        },
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 180 },
          height: { xs: 160, sm: "auto" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: isDarkMode ? "#272727" : "#f5f5f5",
          p: 2,
        }}
      >
        <img
          src={program.logoUrl}
          alt={`Logo de ${program.university}`}
          style={{
            maxWidth: "100%",
            maxHeight: 120,
            objectFit: "contain",
          }}
        />
      </Box>

      <CardContent sx={{ flex: "1 1 auto", p: 3, position: "relative" }}>
        {/* Botón de información absoluto en la esquina superior derecha */}
        <Tooltip title="Más información">
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.05)",
              "&:hover": {
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
              },
            }}
            onClick={handleInfoClick}
          >
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
          {program.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            color: "text.secondary",
          }}
        >
          <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{program.university}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{program.location}</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {program.description.length > 220
            ? `${program.description.substring(0, 220)}...`
            : program.description}
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {program.modality.map((mode) => (
            <Chip
              key={`${program.id}-${mode}`}
              label={mode}
              size="small"
              sx={{
                bgcolor:
                  mode === "Presencial"
                    ? isDarkMode
                      ? "#1A3A7D"
                      : "#E3F2FD"
                    : isDarkMode
                    ? "#3E2465"
                    : "#F3E5F5",
                color:
                  mode === "Presencial"
                    ? isDarkMode
                      ? "#90CAF9"
                      : "#1565C0"
                    : isDarkMode
                    ? "#CE93D8"
                    : "#7B1FA2",
              }}
            />
          ))}
          <Chip
            label={program.duration}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "#423522" : "#FFF8E1",
              color: isDarkMode ? "#FFCC80" : "#E65100",
            }}
          />
          <Chip
            label={program.level}
            size="small"
            sx={{
              bgcolor: isDarkMode ? "#1E3229" : "#E8F5E9",
              color: isDarkMode ? "#81C784" : "#2E7D32",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
