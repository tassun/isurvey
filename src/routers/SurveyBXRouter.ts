import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyBXHandler } from '../handlers/SurveyBXHandler';

export class SurveyBXRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_bx";
	
	public override getHandler(): SurveyBXHandler {
		return new SurveyBXHandler(this.logger);
	}

}
