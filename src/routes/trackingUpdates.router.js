import { Router } from 'express';
import trackingUpdatesController from '../dao/trackingUpdates.controller.js';

const router = Router();
const controller = new trackingUpdatesController();

const auth = (req, res, next) => {
    // aca tengo que hacer los controles para que solo puedan acceder determinados roles
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

// para pasar por acá hay que pegarle a la URL: api/shipments/ y va a devolver todo el listado
router.get('/', async (req, res) => {
    const data = await controller.get();
    res.status(200).send({ error: null, data: data });
});

// para pasar por acá hay que pegarle a la URL: api/shipments/paginated/(un numero)
router.get('/paginated/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    res.status(200).send({ error: null, data: data });
});

router.post('/', auth, async (req, res) => {
    const { shipmentId, statusUpdate } = req.body;

    if (shipmentId != '' && statusUpdate != '') {
        const newTrackingUpdate = {
            shipmentId,
            statusUpdate
        };

        const process = await controller.add(newTrackingUpdate);

        if (process) {
            res.status(200).send({ error: null, data: process })
        } else {
            res.status(500).send({ error: 'new Tracking Update could not be added.', data: [] });
        }
    } else {
        res.status(400).send({ error: 'Missing required data.', data: [] });
    }
})

export default router;