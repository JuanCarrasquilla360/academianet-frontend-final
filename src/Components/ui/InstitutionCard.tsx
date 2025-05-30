import React from "react";
import { Card, CardMedia, Box, useTheme as useMuiTheme, Typography } from "@mui/material";
import { useTheme } from "../../hooks/useTheme";

interface InstitutionCardProps {
  name: string;
  logoUrl: string;
  onClick?: () => void;
}

export const InstitutionCard: React.FC<InstitutionCardProps> = ({
  name,
  logoUrl,
  onClick,
}) => {
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 180,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: muiTheme.shadows[4],
        },
        backgroundColor: theme.palette.mode === "dark" ? "#2A2A2A" : "#f5f5f5",
      }}
      onClick={onClick}
    >
      <Box sx={{ p: 2, maxWidth: "100%", maxHeight: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{
            maxHeight: 100,
            objectFit: "contain",
            width: "100%",
          }}
          image={logoUrl}
          alt={`Logo de ${name}`}
        />
      </Box>
      <Box sx={{ p: 1, textAlign: "center" }}>
        <Typography 
          variant="subtitle2" 
          noWrap 
          title={name}
          sx={{ 
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
      </Box>
    </Card>
  );
};
