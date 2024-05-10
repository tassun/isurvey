import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyB2Handler } from '../handlers/SurveyB2Handler';

export class SurveyB2Router extends SurveyOperateRouter {
	public readonly progid : string = "survey_b2";
	
	public override getHandler(): SurveyB2Handler {
		return new SurveyB2Handler(this.logger);
	}

}
