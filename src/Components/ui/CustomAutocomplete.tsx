import React from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useTheme as useCustomTheme } from "../../hooks/useTheme";

interface Option {
  id: string | number;
  label: string;
}

interface CustomAutocompleteProps {
  options: Option[];
  label: string;
  value: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  name?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  options,
  label,
  value,
  onChange,
  placeholder = "",
  error = false,
  helperText = "",
  required = false,
  name = "",
  fullWidth = true,
  disabled = false,
}) => {
  const { theme } = useCustomTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      getOptionLabel={(option) => option.label}
      fullWidth={fullWidth}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          required={required}
          name={name}
          InputLabelProps={{
            sx: {
              color: isDarkMode ? "rgba(255, 255, 255, 0.7)" : undefined,
              "&.Mui-focused": {
                color: "#4460F1",
              },
              backgroundColor: isDarkMode ? "#2A2A2A" : "white",
              px: 1,
              borderRadius: 1,
            },
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              bgcolor: isDarkMode ? "#2A2A2A" : "white",
              color: isDarkMode ? "#FFFFFF" : undefined,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.23)"
                  : undefined,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.4)"
                  : undefined,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4460F1",
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          sx={{
            backgroundColor: isDarkMode ? "#2A2A2A" : undefined,
            color: isDarkMode ? "#FFFFFF" : undefined,
            "&:hover": {
              backgroundColor: isDarkMode ? "#3A3A3A" : undefined,
            },
            "&.Mui-focused, &.Mui-selected": {
              backgroundColor: isDarkMode ? "#3A3A3A" : undefined,
            },
          }}
        >
          <Typography variant="body2">{option.label}</Typography>
        </Box>
      )}
    />
  );
};
