import React from 'react';
import { Button, useTheme } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface ChatButtonProps {
    onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<SmartToyIcon />}
            onClick={onClick}
            sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                px: 3,
                fontWeight: 500,
                borderRadius: '8px',
                boxShadow: theme.shadows[2],
                backgroundColor: theme.palette.mode === 'dark' ? '#FFA726' : '#FF9800',
                '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#FB8C00' : '#F57C00',
                },
            }}
        >
            Asistente de Búsqueda
        </Button>
    );
};