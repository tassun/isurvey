import { BaseRouter } from "./BaseRouter";
import { Application, Request, Response } from 'express';

export class TestRouter extends BaseRouter {
    public route(app: Application, dir?: string) {
        app.get("/error", async (req: Request, res: Response) => {  
            let ctx = await this.createContext(req);
            let info = this.getMetaInfo(ctx);
            let data = { };
            let param = { meta : {...info}, auth: {}, data: data };
            res.render("pages/error", { error: "Error", ...param }); });
        app.get("/notinfo", async (req: Request, res: Response) => {  
            let ctx = await this.createContext(req);
            let info = this.getMetaInfo(ctx);
            let data = { };
            let param = { meta : {...info}, auth: {}, data: data };
            res.render("pages/notinfo", { error: "Error", ...param }); });
        app.get("/notfound", async (req: Request, res: Response) => {  
            let ctx = await this.createContext(req);
            let info = this.getMetaInfo(ctx);
            let data = { };
            let param = { meta : {...info}, auth: {}, data: data };
            res.render("pages/notfound", { error: "Error", ...param }); });
    }
}
