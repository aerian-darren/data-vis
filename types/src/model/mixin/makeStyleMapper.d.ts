import { PathStyleProps } from 'zrender/src/graphic/Path';
import Model from '../Model';
export default function makeStyleMapper(properties: readonly string[][], ignoreParent?: boolean): (model: Model, excludes?: readonly string[], includes?: readonly string[]) => PathStyleProps;
