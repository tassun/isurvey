import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveySHandler } from '../handlers/SurveySHandler';

export class SurveySRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_s";
	
	public override getHandler(): SurveySHandler {
		return new SurveySHandler(this.logger);
	}

}
