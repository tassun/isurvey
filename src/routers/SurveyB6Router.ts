import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB6Handler } from '../handlers/SurveyB6Handler';

export class SurveyB6Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b6";
	
	public override getHandler(): SurveyB6Handler {
		return new SurveyB6Handler(this.logger);
	}

}
