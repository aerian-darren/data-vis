import ChartView from '../../view/Chart';
import { EventQueryItem, ECActionEvent, Payload, StageHandlerProgressParams } from '../../util/types';
import Element from 'zrender/src/Element';
import GlobalModel from '../../model/Global';
import ExtensionAPI from '../../core/ExtensionAPI';
import CustomSeriesModel from './CustomSeries';
export default class CustomChartView extends ChartView {
    static type: string;
    readonly type: string;
    private _data;
    private _progressiveEls;
    render(customSeries: CustomSeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    incrementalPrepareRender(customSeries: CustomSeriesModel, ecModel: GlobalModel, api: ExtensionAPI): void;
    incrementalRender(params: StageHandlerProgressParams, customSeries: CustomSeriesModel, ecModel: GlobalModel, api: ExtensionAPI, payload: Payload): void;
    eachRendered(cb: (el: Element) => boolean | void): void;
    filterForExposedEvent(eventType: string, query: EventQueryItem, targetEl: Element, packedEvent: ECActionEvent): boolean;
}
