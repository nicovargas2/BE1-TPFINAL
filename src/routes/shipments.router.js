import { Router } from 'express';
import ShipmentController from '../dao/shipments.controller.js';

const router = Router();
const controller = new ShipmentController();

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
    const { shipmentId, originAddress, destinationAddress, customerId, driverId, status, estimatedDelivery } = req.body;

    if (shipmentId != '' && originAddress != '' && destinationAddress != '' && customerId != '' && driverId != '' && driverId != customerId) {
        const newShipment = {
            shipmentId,
            originAddress,
            destinationAddress,
            customerId,
            driverId,
            status,
            estimatedDelivery
        };
        const process = await controller.add(newShipment);

        if (process) {
            res.status(200).send({ error: null, data: process })
        } else {
            res.status(500).send({ error: 'Shipment could not be added.', data: [] });
        }
    } else {
        res.status(400).send({ error: 'Missing required data.', data: [] });
    }
})

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { shipmentId, originAddress, destinationAddress, customerId, driverId, status, estimatedDelivery } = req.body;

    const filter = { _id: id };
    const updated = { shipmentId, originAddress, destinationAddress, customerId, driverId, status, estimatedDelivery };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);

    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'Shipment not found.', data: [] });
    }
});

export default router;