import { Application, Request, Response, Router } from 'express';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBXHandler } from '../handlers/SurveyBXHandler';

export class SurveyBXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_bx";
	
	public override getHandler(): SurveyBXHandler {
		return new SurveyBXHandler(this.logger);
	}

	public override route(app: Application) : Router {
		this.router.get('/open/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/open/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });		
		this.router.get('/listing/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/listing/:token_key?', async (req: Request, res: Response) => { this.routeListing(req,res); });		
		this.router.get('/datatable/:token_key?', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable/:token_key?', async (req: Request, res: Response) => { this.routeDataTable(req,res); });		
		return this.router;
	}

}
