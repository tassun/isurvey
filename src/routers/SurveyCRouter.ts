import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyCHandler } from '../handlers/SurveyCHandler';

export class SurveyCRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_c";
	
	public override getHandler(): SurveyCHandler {
		return new SurveyCHandler(this.logger);
	}

}
