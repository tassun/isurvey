import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB3Handler } from '../handlers/SurveyB3Handler';

export class SurveyB3Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b3";
	
	public override getHandler(): SurveyB3Handler {
		return new SurveyB3Handler(this.logger);
	}

}
