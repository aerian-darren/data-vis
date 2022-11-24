import * as graphic from '../../util/graphic';
import SeriesData from '../../data/SeriesData';
import { StageHandlerProgressParams, LineStyleOption } from '../../util/types';
import Model from '../../model/Model';
import Element from 'zrender/src/Element';
interface LargeLinesCommonOption {
    polyline?: boolean;
    lineStyle?: LineStyleOption & {
        curveness?: number;
    };
}
/**
 * Data which can support large lines.
 */
declare type LargeLinesData = SeriesData<Model<LargeLinesCommonOption> & {
    seriesIndex?: number;
}>;
declare class LargeLineDraw {
    group: graphic.Group;
    private _newAdded;
    /**
     * Update symbols draw by new data
     */
    updateData(data: LargeLinesData): void;
    /**
     * @override
     */
    incrementalPrepareUpdate(data: LargeLinesData): void;
    /**
     * @override
     */
    incrementalUpdate(taskParams: StageHandlerProgressParams, data: LargeLinesData): void;
    /**
     * @override
     */
    remove(): void;
    eachRendered(cb: (el: Element) => boolean | void): void;
    private _create;
    private _setCommon;
    private _clear;
}
export default LargeLineDraw;
