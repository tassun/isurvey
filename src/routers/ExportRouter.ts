import { Application, Request, Response, Router } from 'express';
import { OperateRouter } from "../base/OperateRouter";
import { ExportHandler } from "../handlers/ExportHandler";
import fs from "fs";
import path from "path";
import JSZip from "jszip";

export class ExportRouter extends OperateRouter {
    public zipFolder: boolean = false;
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
                //zip all files in folder
                if(this.zipFolder) {
                    for(let dir of directoryContents) {
                        const filePath = path.join(zipPath, dir.name); 
                        this.logger.debug(this.constructor.name+".doExport: filePath",filePath);           
                        if(fs.statSync(filePath).isFile()) {
                            zipper.file(dir.name, fs.readFileSync(filePath, "utf-8"));
                        }
                    }
                } else {
                    for(let name of rs.rows) {
                        const filePath = path.join(zipPath, name);            
                        this.logger.debug(this.constructor.name+".doExport: filePath",filePath);           
                        if(fs.statSync(filePath).isFile()) {
                            zipper.file(name, fs.readFileSync(filePath, "utf-8"));
                        }
                    }
                }
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
			this.logger.debug(this.constructor.name+".routExport: export file",filename);
            if(filename) {
			    res.download(filename,this.exportFile);
            } else {
                res.render("pages/none");
            }
		} catch(ex) { 
            this.logger.error(this.constructor.name+".routExport: error",ex);
			this.sendError(res, ex, "export", ctx);
		}
	}
    
    public override route(app: Application) : Router {
		//gui can post or get
		this.router.get('/csv/:token_key?', async (req: Request, res: Response) => { this.routeExport(req,res); });
		this.router.post('/csv/:token_key?', async (req: Request, res: Response) => { this.routeExport(req,res); });
        return this.router
    }

}
