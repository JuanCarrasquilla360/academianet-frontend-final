import React, { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Button,
    Typography,
    Box,
    Avatar,
    Divider,
    CircularProgress,
    Paper,
    useTheme,
    alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { chatService, SYSTEM_PROMPTS } from '../../services/chatService';

// Interfaz para los mensajes
interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

// Interfaz para las props del componente
interface ChatModalProps {
    open: boolean;
    onClose: () => void;
    onSearchRequest: (query: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ open, onClose, onSearchRequest }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    // Estados
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState<string | undefined>(undefined);

    // Referencia para desplazamiento automático de mensajes
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Efecto para desplazar hacia abajo cuando hay nuevos mensajes
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Efecto para agregar el mensaje de bienvenida cuando se abre el chat
    useEffect(() => {
        if (open && messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    text: '¡Hola! Soy tu asistente virtual para encontrar tu carrera ideal. Cuéntame sobre tus intereses académicos o pregúntame sobre alguna carrera específica.',
                    sender: 'bot',
                    timestamp: new Date(),
                },
            ]);
        }
    }, [open, messages.length]);

    // Función para enviar mensaje
    const sendMessage = async () => {
        if (inputValue.trim() === '') return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        // Actualizar la lista de mensajes con el mensaje del usuario
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Llamada a la API con el conversationId si existe
            const responseData = await chatService.sendMessage(
                inputValue,
                SYSTEM_PROMPTS.ACADEMIC_ADVISOR,
                { conversation_id: conversationId }
            );

            // Guardar el conversationId para mantener el hilo de conversación
            if (responseData.conversation_id) {
                setConversationId(responseData.conversation_id);
            }

            const botMessage: Message = {
                id: Date.now().toString(),
                text: responseData.response,
                sender: 'bot',
                timestamp: new Date(),
            };

            // Actualizar los mensajes con la respuesta del bot
            setMessages((prevMessages) => [...prevMessages, botMessage]);

            // Verificar si la respuesta contiene una recomendación de búsqueda
            if (responseData.search_recommendation) {
                const searchQuery = responseData.search_recommendation;

                const recommendationMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    text: `Basado en nuestra conversación, te recomiendo buscar: "${searchQuery}"\n\nPuedes hacer clic en "Buscar esto" para ver los resultados.`,
                    sender: 'bot',
                    timestamp: new Date(),
                };

                setMessages((prevMessages) => [...prevMessages, recommendationMessage]);

                // Notificar que hay una solicitud de búsqueda después de un breve retraso
                setTimeout(() => {
                    onSearchRequest(searchQuery);
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error('Error al obtener respuesta del bot:', error);

            // Mensaje de error
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: 'Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo.',
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler para enviar mensaje al presionar Enter
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Renderizar mensaje individual
    const renderMessage = (message: Message) => {
        const isBot = message.sender === 'bot';
        const avatarIcon = isBot ? <SmartToyIcon /> : <PersonIcon />;
        const avatarColor = isBot ? theme.palette.primary.main : theme.palette.secondary.main;

        return (
            <Box
                key={message.id}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isBot ? 'flex-start' : 'flex-end',
                    mb: 2,
                    maxWidth: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isBot ? 'row' : 'row-reverse',
                        alignItems: 'flex-start',
                        maxWidth: '75%',
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: avatarColor,
                            mr: isBot ? 1 : 0,
                            ml: isBot ? 0 : 1
                        }}
                    >
                        {avatarIcon}
                    </Avatar>

                    <Paper
                        elevation={1}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: isBot
                                ? (isDarkMode ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.light, 0.2))
                                : (isDarkMode ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.secondary.light, 0.2)),
                            maxWidth: '100%',
                        }}
                    >
                        <Typography variant="body1" component="div">
                            {message.text.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < message.text.split('\n').length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </Typography>

                        {isBot && message.text.includes('Puedes hacer clic en "Buscar esto"') && (
                            <Box sx={{ mt: 2, textAlign: 'right' }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                        const searchMatch = message.text.match(/te recomiendo buscar: "(.*?)"/);
                                        if (searchMatch && searchMatch[1]) {
                                            onSearchRequest(searchMatch[1]);
                                            onClose();
                                        }
                                    }}
                                >
                                    Buscar esto
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Box>

                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        alignSelf: isBot ? 'flex-start' : 'flex-end',
                        ml: isBot ? 6 : 0,
                        mr: isBot ? 0 : 6
                    }}
                >
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </Box>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-paper': {
                    height: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <DialogTitle sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}>
                        <SmartToyIcon />
                    </Avatar>
                    <Typography variant="h6">Asistente de Orientación Académica</Typography>
                </Box>
                <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent
                sx={{
                    flexGrow: 1,
                    p: 2,
                    overflowY: 'auto',
                    bgcolor: isDarkMode ? alpha(theme.palette.background.paper, 0.5) : alpha(theme.palette.grey[100], 0.5)
                }}
            >
                {messages.map(renderMessage)}

                {isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: 2,
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                )}

                <div ref={messagesEndRef} />
            </DialogContent>

            <Divider />

            <DialogActions sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe tu mensaje..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={3}
                    disabled={isLoading}
                    sx={{ mr: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={sendMessage}
                    disabled={isLoading || inputValue.trim() === ''}
                >
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatModal;