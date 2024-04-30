import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureDHandler } from '../handlers/MeasureDHandler';

export class MeasureDRouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_d";
	
	public override getHandler(): MeasureDHandler {
		return new MeasureDHandler(this.logger);
	}

}
