import { Router } from 'express';
import UserController from '../dao/user.controller.js';


const router = Router();
const controller = new UserController();

const auth = (req, res, next) => {
    // aca tengo que hacer los controles para que solo puedan acceder determinados roles
    console.log('Ejecuta el middleware de autenticación de usuario');
    next();
}

// para pasar por acá hay que pegarle a la URL: api/users/ y va a devolver todo el listado
router.get('/', async (req, res) => {
    const data = await controller.get();
    res.status(200).send({ error: null, data: data });
});

// para pasar por acá hay que pegarle a la URL: api/users/paginated/(un numero)
router.get('/paginated/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    res.status(200).send({ error: null, data: data });
});



/* 
router.get('/stats/:size?', async (req, res) => { 
const size = req.params.size || 'medium';
const data = await controller.stats(size);
res.status(200).send({ error: null, data: data });
});
*/


export default router;