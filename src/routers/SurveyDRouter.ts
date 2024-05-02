import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyDHandler } from '../handlers/SurveyDHandler';

export class SurveyDRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_d";
	
	public override getHandler(): SurveyDHandler {
		return new SurveyDHandler(this.logger);
	}

}
