import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB1Handler } from '../handlers/SurveyB1Handler';

export class SurveyB1Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b1";
	
	public override getHandler(): SurveyB1Handler {
		return new SurveyB1Handler(this.logger);
	}

}
