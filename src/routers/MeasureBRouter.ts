import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureBHandler } from '../handlers/MeasureBHandler';

export class MeasureBRouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_b";

	public override getHandler(): MeasureBHandler {
		return new MeasureBHandler(this.logger);
	}

}
