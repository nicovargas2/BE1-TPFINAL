import { Router } from 'express';
import VehicleController from '../dao/vehicles.controller.js';


const router = Router();
const controller = new VehicleController();

const auth = (req, res, next) => {
    // aca tengo que hacer los controles para que solo puedan acceder determinados roles
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

// para pasar por acá hay que pegarle a la URL: api/vehicles/ y va a devolver todo el listado
router.get('/', async (req, res) => {
    const data = await controller.get();
    res.status(200).send({ error: null, data: data });
});

// para pasar por acá hay que pegarle a la URL: api/vehicles/paginated/(un numero)
router.get('/paginated/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    res.status(200).send({ error: null, data: data });
});

router.post('/', auth, async (req, res) => {
    const { vehicleId, type, licensePlate, driverId, lastMaintenance, capacity } = req.body;

    if (vehicleId != '' && type != '' && licensePlate != '' && driverId != '' && capacity != '') {
        const newVehicle = { vehicleId, type, licensePlate, driverId, lastMaintenance, capacity };
        const process = await controller.add(newVehicle);

        if (process) {
            res.status(200).send({ error: null, data: process })
        } else {
            res.status(500).send({ error: 'Vehicle could not be added.', data: [] });
        }
    } else {
        res.status(400).send({ error: 'Missing required data.', data: [] });
    }
})

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { vehicleId, type, licensePlate, driverId, lastMaintenance, capacity } = req.body;
    const filter = { _id: id };
    const updated = { vehicleId, type, licensePlate, driverId, lastMaintenance, capacity };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);

    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'Vehicle not found.', data: [] });
    }
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    const options = {};

    const process = await controller.delete(filter, options);

    console.log(process)

    if (process) {
        res.status(200).send({ error: null, data: 'Vehicle deleted.' });
    } else {
        res.status(404).send({ error: 'Vehicle not found.', data: [] });
    }
});

export default router;