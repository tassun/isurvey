import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyEHandler } from '../handlers/SurveyEHandler';

export class SurveyERouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_e";
	
	public override getHandler(): SurveyEHandler {
		return new SurveyEHandler(this.logger);
	}

}
