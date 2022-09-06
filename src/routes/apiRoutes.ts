import { Router } from "express";
import * as ApiController from '../controllers/apiController';

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

export default router;