import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB5Handler } from '../handlers/SurveyB5Handler';

export class SurveyB5Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b5";
	
	public override getHandler(): SurveyB5Handler {
		return new SurveyB5Handler(this.logger);
	}

}
