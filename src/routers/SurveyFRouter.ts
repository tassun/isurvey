import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyFHandler } from '../handlers/SurveyFHandler';

export class SurveyFRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_f";
	
	public override getHandler(): SurveyFHandler {
		return new SurveyFHandler(this.logger);
	}

}
