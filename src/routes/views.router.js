import { Router } from 'express';
import UserController from '../dao/users.controller.js';


const router = Router();
const controller = new UserController();

router.get('/users/:pg?', async (req, res) => {
    const pg = req.params.pg;
    const data = await controller.getPaginated(pg);
    res.status(200).render('users', { users: data });
});

router.get('/', async (req, res) => {
    const data = await controller.get();
    res.status(200).render('users', { users: data });
});

router.get('/register', (req, res) => {
    const data = {
    };
    res.status(200).render('register', data);
});

router.get('/loadShipment', (req, res) => {
    const data = {
    };
    res.status(200).render('loadShipment', data);
});

/* continuar desarrollando esta
router.post('/shipments', () => {
    
})
*/

export default router;
