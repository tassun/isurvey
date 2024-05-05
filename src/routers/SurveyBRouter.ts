import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBHandler } from '../handlers/SurveyBHandler';

export class SurveyBRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_b";
	
	public override getHandler(): SurveyBHandler {
		return new SurveyBHandler(this.logger);
	}

}
