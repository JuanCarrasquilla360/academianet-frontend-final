import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const drawerWidth = 240;

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión aquí
    navigate("/");
  };

  const drawer = (
    <div>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Academia.net
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Panel de Administración
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Aspirantes" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Programas" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Periodos" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: isDarkMode ? "#1A1A1A" : "white",
          color: isDarkMode ? "white" : "inherit",
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar /> {/* Espaciado para la AppBar */}
        {/* Contenido del Dashboard */}
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido al Panel de Administración
        </Typography>
        <Typography variant="body1" paragraph>
          Este es el panel de control para administradores de la plataforma
          Academia.net.
        </Typography>
        {/* Estadísticas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: isDarkMode ? "#252836" : "#f0f7ff" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total de Aspirantes
                </Typography>
                <Typography variant="h4">1,253</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: isDarkMode ? "#252836" : "#fff4e5" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Nuevos Aspirantes
                </Typography>
                <Typography variant="h4">42</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: isDarkMode ? "#252836" : "#e8f5e9" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Programas Activos
                </Typography>
                <Typography variant="h4">15</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: isDarkMode ? "#252836" : "#e3f2fd" }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Instituciones
                </Typography>
                <Typography variant="h4">7</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Acciones rápidas */}
        <Typography variant="h6" gutterBottom>
          Acciones Rápidas
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PeopleIcon />}
              sx={{ justifyContent: "flex-start", py: 1 }}
            >
              Ver listado de aspirantes
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SchoolIcon />}
              sx={{ justifyContent: "flex-start", py: 1 }}
            >
              Administrar programas académicos
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<EventIcon />}
              sx={{ justifyContent: "flex-start", py: 1 }}
            >
              Configurar períodos de inscripción
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<SettingsIcon />}
              sx={{ justifyContent: "flex-start", py: 1 }}
            >
              Ajustes del sistema
            </Button>
          </Grid>
        </Grid>
        {/* Pie de página */}
        <Box sx={{ mt: "auto", pt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Academia.net - Panel de Administración
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
