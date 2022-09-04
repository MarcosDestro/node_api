import { Router } from "express";

const router = Router();

router.get('/ping', (req, res)=>{
    return res.json({pong: true});
});

router.get('/random', (req, res)=>{
    let rand: number = Math.floor(Math.random()*10);
    return res.json({number: rand});
});

router.get('/nome/:name', (req, res)=>{
    let name: string = req.params.name;
    return res.json({name});
});

export default router;