import { Application, Request, Response, Router } from 'express';
import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBXHandler } from '../handlers/SurveyBXHandler';

export class SurveyBXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_bx";
	
	public override getHandler(): SurveyBXHandler {
		return new SurveyBXHandler(this.logger);
	}

	public override route(app: Application) : Router {
		this.router.get('/open', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/open', async (req: Request, res: Response) => { this.routeListing(req,res); });		
		this.router.get('/listing', async (req: Request, res: Response) => { this.routeListing(req,res); });
		this.router.post('/listing', async (req: Request, res: Response) => { this.routeListing(req,res); });		
		this.router.get('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });
		this.router.post('/datatable', async (req: Request, res: Response) => { this.routeDataTable(req,res); });		
		return this.router;
	}

}
