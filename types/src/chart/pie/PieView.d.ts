import ChartView from '../../view/Chart';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import { Payload } from '../../util/types';
import PieSeriesModel from './PieSeries';
declare class PieView extends ChartView {
    static type: string;
    ignoreLabelLineUpdate: boolean;
    private _data;
    private _emptyCircleSector;
    render(seriesModel: PieSeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    dispose(): void;
    containPoint(point: number[], seriesModel: PieSeriesModel): boolean;
}
export default PieView;
