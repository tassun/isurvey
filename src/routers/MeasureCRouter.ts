import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureCHandler } from '../handlers/MeasureCHandler';

export class MeasureCRouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_c";

	public override getHandler(): MeasureCHandler {
		return new MeasureCHandler(this.logger);
	}

}
