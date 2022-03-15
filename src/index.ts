import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import Route from './routes';

async function Server(): Promise<express.Express> {
    dotenv.config();

    const app = express();

    app.listen(process.env.APP_PORT, () => console.log(`Server running at port ${process.env.APP_PORT}`));

    app.use(express.json());
    app.use(Route);

    await mongoose.connect(process.env.DB_URL || '');

    return app;
}

if(require.main == module) {
    Server();
}

export default Server;