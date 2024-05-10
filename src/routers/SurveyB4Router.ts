import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB4Handler } from '../handlers/SurveyB4Handler';

export class SurveyB4Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b4";
	
	public override getHandler(): SurveyB4Handler {
		return new SurveyB4Handler(this.logger);
	}

}
