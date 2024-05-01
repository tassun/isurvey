import { SurveyOperateRouter } from './SurveyOperateRouter';
import { SurveyGHandler } from '../handlers/SurveyGHandler';

export class SurveyGRouter extends SurveyOperateRouter {
	public readonly progid : string = "survey_g";
	
	public override getHandler(): SurveyGHandler {
		return new SurveyGHandler(this.logger);
	}

}
