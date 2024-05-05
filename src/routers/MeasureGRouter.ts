import { SurveyOperateRouter } from './SurveyOperateRouter';
import { MeasureGHandler } from '../handlers/MeasureGHandler';

export class MeasureGRouter extends SurveyOperateRouter {
	public readonly progid : string = "measure_g";
	
	public override getHandler(): MeasureGHandler {
		return new MeasureGHandler(this.logger);
	}

}
