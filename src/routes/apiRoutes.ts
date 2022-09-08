import { Router } from "express";
import * as ApiController from '../controllers/apiController';
import * as AuthController from '../controllers/authController';
import { Auth } from "../middlewares/auth";

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/random', ApiController.random);
router.get('/nome/:name', ApiController.name);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);
router.get('/frases/aleatoria', ApiController.randomPhrase);
router.get('/frases/:id', ApiController.getPhrase);
router.put('/frases/:id', ApiController.updatePhrase);
router.delete('/frases/:id', ApiController.deletePhrase);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Rota protegida
router.get('/dashboard', Auth.private, AuthController.dash);
router.post('/me', Auth.private, AuthController.me);

export default router;