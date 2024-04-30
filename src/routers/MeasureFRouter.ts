import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureFHandler } from '../handlers/MeasureFHandler';

export class MeasureFRouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_f";
	
	public override getHandler(): MeasureFHandler {
		return new MeasureFHandler(this.logger);
	}

}
