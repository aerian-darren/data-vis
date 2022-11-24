/**
 * A mapping of visual provided to deverloper and visual stored in the List module.
 * To developer:
 *  'color', 'opacity', 'symbol', 'symbolSize'...
 * In the List module storage:
 *  'style', 'symbol', 'symbolSize'...
 */
import SeriesData from '../data/SeriesData';
export declare function getItemVisualFromData(data: SeriesData, dataIndex: number, key: string): string | number | number[] | import("zrender/src/graphic/Pattern").PatternObject | import("zrender/src/graphic/LinearGradient").LinearGradientObject | import("zrender/src/graphic/RadialGradient").RadialGradientObject;
export declare function getVisualFromData(data: SeriesData, key: string): string | number | number[] | import("zrender/src/graphic/Pattern").PatternObject | import("zrender/src/graphic/LinearGradient").LinearGradientObject | import("zrender/src/graphic/RadialGradient").RadialGradientObject;
export declare function setItemVisualFromData(data: SeriesData, dataIndex: number, key: string, value: any): void;
