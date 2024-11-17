import { Router } from 'express';
import UserController from '../dao/users.controller.js';


const router = Router();
const controller = new UserController();

router.get('/users/:pg?', async (req, res) => {
    console.log("pasa por el views/users get paginado")
    const pg = req.params.pg;
    const data = await controller.getPaginated(pg);
    res.status(200).render('users', { users: data });
});

router.get('/', async (req, res) => {
    console.log("pasa por el views/ get comun no paginado, pero no funciona la vista")
    const data = await controller.get();
    res.status(200).render('users', { users: data });
});

/* continuar desarrollando esta
router.post('/shipments', () => {
    
})
*/

export default router;
