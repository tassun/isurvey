import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureEHandler } from '../handlers/MeasureEHandler';

export class MeasureERouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_e";
	
	public override getHandler(): MeasureEHandler {
		return new MeasureEHandler(this.logger);
	}

}
