import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB7Handler } from '../handlers/SurveyB7Handler';

export class SurveyB7Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b7";
	
	public override getHandler(): SurveyB7Handler {
		return new SurveyB7Handler(this.logger);
	}

}
