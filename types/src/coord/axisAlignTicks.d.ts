import { NumericAxisBaseOptionCommon } from './axisCommonTypes';
import IntervalScale from '../scale/Interval';
import { AxisBaseModel } from './AxisBaseModel';
import LogScale from '../scale/Log';
export declare function alignScaleTicks(scale: IntervalScale | LogScale, axisModel: AxisBaseModel<Pick<NumericAxisBaseOptionCommon, 'min' | 'max'>>, alignToScale: IntervalScale | LogScale): void;
