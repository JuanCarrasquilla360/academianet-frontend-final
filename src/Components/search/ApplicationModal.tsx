import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { Program } from "./ProgramCard";

interface ApplicationModalProps {
  open: boolean;
  program: Program;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

// API endpoint for program enrollment
const ENROLLMENT_API_ENDPOINT = "https://hdvcvqqro4.execute-api.us-east-1.amazonaws.com/dev/submit-application";

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  open,
  program,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Nombre es requerido";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Apellido es requerido";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email es requerido";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Número de teléfono es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Prepare data according to API specification
      const enrollmentData = {
        nombre: formData.firstName,
        apellido: formData.lastName,
        email: formData.email,
        telefono: formData.phoneNumber, // API expects 'phone' not 'phoneNumber'
        programName: `${program.title} - ${program.university}`,
        programId: program.id
      };
    //   const enrollmentData = {
    //     firstName: formData.firstName,
    //     lastName: formData.lastName,
    //     email: formData.email,
    //     phone: formData.phoneNumber, // API expects 'phone' not 'phoneNumber'
    //     programName: `${program.title} - ${program.university}`,
    //     programId: program.id
    //   };
      
      // Send request to enrollment API
      const response = await fetch(ENROLLMENT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || "Error en el envío de la solicitud");
      }
      
      // Success
      toast.success("¡Tu solicitud de afiliación ha sido recibida! Pronto recibirás un correo con más información.", {
        position: "top-right",
        autoClose: 5000,
      });
      
      // Reset form and close modal
      setFormData(initialFormData);
      onClose();
      
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      toast.error("Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo más tarde.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, pb: 0 }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          Solicitud de Afiliación
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {program.title} - {program.university}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" paragraph>
                Completa tus datos para solicitar afiliación a este programa académico.
                Nos comunicaremos contigo a la brevedad para iniciar tu proceso de admisión.
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nombre"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Apellido"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Número de Teléfono"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                disabled={loading}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button 
          onClick={handleClose} 
          color="inherit" 
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary" 
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? "Enviando..." : "Enviar Solicitud"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 