import { Router } from "express";
import { controllers } from "../di";


export class Routes{
    public router:Router;
    constructor(){
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/ocr", (req, res,next) => {
            controllers.getOCRData(req, res, next);
        });
        this.router.post("/saveData",(req,res,next)=>[
            controllers.saveAadhaarData(req,res,next)
        ])
    }
}


export default new Routes().router;