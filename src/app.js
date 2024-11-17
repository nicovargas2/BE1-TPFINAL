import express from 'express';
import handlebars from 'express-handlebars';
import initSocket from './sockets.js';
import mongoose from 'mongoose';
import usersRouter from './routes/users.router.js';
import vehiclesRouter from './routes/vehicles.router.js';
import shipmentsRouter from './routes/shipments.router.js';
import trackingUpdatesRouter from './routes/trackingUpdates.router.js';
import viewsRouter from './routes/views.router.js';
import config from './config.js';
import { create } from 'express-handlebars';

const hbs = create({
    helpers: {
        gt: (a, b) => a > b,
        lt: (a, b) => a < b
    }
});

const app = express();

const httpServer = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(httpServer);
    app.set('socketServer', socketServer);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.engine('handlebars', hbs.engine);
    app.set('views', `${config.DIRNAME}/views`);
    app.set('view engine', 'handlebars');

    app.use('/views', viewsRouter);

    app.use('/api/users', usersRouter);
    app.use('/api/vehicles', vehiclesRouter);
    app.use('/api/shipments', shipmentsRouter);
    app.use('/api/trackingUpdates', trackingUpdatesRouter);

    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`Server activo en puerto ${config.PORT} conectado a bbdd`);
});
