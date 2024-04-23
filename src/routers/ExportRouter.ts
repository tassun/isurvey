import express from 'express';
import { Application, Request, Response, Router } from 'express';
import { BaseRouter } from "./BaseRouter";
import { ExportHandler } from "../handlers/ExportHandler";
import fs from "fs";
import path from "path";
import JSZip from "jszip";

const router = express.Router();
export class ExportRouter extends BaseRouter {
    public zipDir: string = path.join(process.cwd(),"zip");
    public zipFile: string = "export_alls.zip";
    public exportFile: string = "export_alls.zip";

    public async doExport(ctx: any) : Promise<string | undefined> {
        let result = undefined
        let handler = new ExportHandler(this.logger);
        let rs = await handler.export(ctx);
        if(rs && rs.rows.length>0) {
            let zipper = new JSZip();
            let zipPath = handler.exportDir;
            const directoryContents = fs.readdirSync(zipPath, { withFileTypes: true});             
            if(directoryContents.length>0) {
                directoryContents.forEach(({ name }) => {
                    const filePath = path.join(zipPath, name);            
                    if(fs.statSync(filePath).isFile()) {
                        zipper.file(name, fs.readFileSync(filePath, "utf-8"));
                    }
                });
                let fullfilename = path.join(this.zipDir,this.zipFile);
                let output = await zipper.generateAsync({type:"blob"});
                this.logger.debug(output);
                fs.writeFileSync(fullfilename, Buffer.from(await output.arrayBuffer()));
                result = fullfilename;
            }
        }
        return Promise.resolve(result);    
    }

	public async routeExport(req: Request, res: Response) {
		let ctx = await this.createContext(req);
		try {
			let filename = await this.doExport(ctx);
			this.logger.debug("export file",filename);
            if(filename) {
			    res.download(filename,this.exportFile);
            } else {
                res.render("pages/none");
            }
		} catch(ex) { 
			this.sendError(res, ex, "export", ctx);
		}
	}
    
    public route(app: Application) : Router {
		//gui can post or get
		router.get('/csv', async (req: Request, res: Response) => { this.routeExport(req,res); });
		router.post('/csv', async (req: Request, res: Response) => { this.routeExport(req,res); });
        return router
    }

}
