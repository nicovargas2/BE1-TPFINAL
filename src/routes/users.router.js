import { Router } from 'express';
import UserController from '../dao/users.controller.js';


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

router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('email recibido:', email)
    console.log('password recibido:', password)
    const data = await controller.find(email);
    console.log("data encontrado:", data)
    if (data.email == email && data.password == password) {
        res.status(200).render('index', { error: 'afirmativo', data: data.name });
    }
    else {
        res.status(404).render('login', { error: 'email or password invalid', data: {} });
    }
});

// para pasar por acá hay que pegarle a la URL: api/users/paginated/(un numero)
router.get('/paginated/:pg?', async (req, res) => {
    const pg = req.params.pg || 1;
    const data = await controller.getPaginated(pg);
    res.status(200).send({ error: null, data: data });
});

router.post('/', auth, async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (name != '' && email != '' && password != '' && phone != '' && address != '') {
        const newUser = { name, email, password, phone, address };
        const process = await controller.add(newUser);

        if (process) {
            res.status(200).send({ error: null, data: process })
        } else {
            res.status(500).send({ error: 'User could not be added.', data: [] });
        }
    } else {
        res.status(400).send({ error: 'Missing required data', data: [] });
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (name != '' && email != '' && password != '' && phone != '' && address != '') {
        const newUser = { name, email, password, phone, address };
        const process = await controller.add(newUser);

        if (process) {
            res.status(200).render('login', { error: null, data: process });
        } else {
            res.status(500).send({ error: 'User could not be added.', data: [] });
        }
    } else {
        res.status(400).send({ error: 'Missing required data', data: [] });
    }
})

router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phone, role, address } = req.body;
    const filter = { _id: id };
    const updated = { name: name, email: email, password: password, phone: phone, address: address, role: role };
    const options = { new: true };

    const process = await controller.update(filter, updated, options);

    if (process) {
        res.status(200).send({ error: null, data: process });
    } else {
        res.status(404).send({ error: 'User not found.', data: [] });
    }
});

router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id };
    const options = {};

    const process = await controller.delete(filter, options);
    console.log(process)
    if (process) {
        res.status(200).send({ error: null, data: 'User deleted.' });
    } else {
        res.status(404).send({ error: 'User not found.', data: [] });
    }
});

export default router;