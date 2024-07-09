import express from 'express';
import dotenv from 'dotenv';
import joyasRoutes from './routes/joyasRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use('/api', joyasRoutes);

app.listen(PORT, () => console.log(`Servidor encendido en el puerto ${PORT}!`));

