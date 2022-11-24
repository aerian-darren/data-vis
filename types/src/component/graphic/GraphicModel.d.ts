import * as zrUtil from 'zrender/src/core/util';
import * as modelUtil from '../../util/model';
import { ComponentOption, BoxLayoutOptionMixin, Dictionary, ZRStyleProps, OptionId, CommonTooltipOption, AnimationOptionMixin, AnimationOption } from '../../util/types';
import ComponentModel from '../../model/Component';
import Element, { ElementTextConfig } from 'zrender/src/Element';
import Displayable from 'zrender/src/graphic/Displayable';
import { PathProps, PathStyleProps } from 'zrender/src/graphic/Path';
import { ImageStyleProps, ImageProps } from 'zrender/src/graphic/Image';
import { TextStyleProps, TextProps } from 'zrender/src/graphic/Text';
import GlobalModel from '../../model/Global';
import { TransitionOptionMixin } from '../../animation/customGraphicTransition';
import { ElementKeyframeAnimationOption } from '../../animation/customGraphicKeyframeAnimation';
import { GroupProps } from 'zrender/src/graphic/Group';
import { TransformProp } from 'zrender/src/core/Transformable';
import { ElementEventNameWithOn } from 'zrender/src/core/types';
interface GraphicComponentBaseElementOption extends Partial<Pick<Element, TransformProp | 'silent' | 'ignore' | 'textConfig' | 'draggable' | ElementEventNameWithOn>>, 
/**
 * left/right/top/bottom: (like 12, '22%', 'center', default undefined)
 * If left/rigth is set, shape.x/shape.cx/position will not be used.
 * If top/bottom is set, shape.y/shape.cy/position will not be used.
 * This mechanism is useful when you want to position a group/element
 * against the right side or the center of this container.
 */
Partial<Pick<BoxLayoutOptionMixin, 'left' | 'right' | 'top' | 'bottom'>> {
    /**
     * element type, mandatory.
     * Only can be omit if call setOption not at the first time and perform merge.
     */
    type?: string;
    id?: OptionId;
    name?: string;
    parentId?: OptionId;
    parentOption?: GraphicComponentElementOption;
    children?: GraphicComponentElementOption[];
    hv?: [boolean, boolean];
    /**
     * bounding: (enum: 'all' (default) | 'raw')
     * Specify how to calculate boundingRect when locating.
     * 'all': Get uioned and transformed boundingRect
     *     from both itself and its descendants.
     *     This mode simplies confining a group of elements in the bounding
     *     of their ancester container (e.g., using 'right: 0').
     * 'raw': Only use the boundingRect of itself and before transformed.
     *     This mode is similar to css behavior, which is useful when you
     *     want an element to be able to overflow its container. (Consider
     *     a rotated circle needs to be located in a corner.)
     */
    bounding?: 'raw' | 'all';
    /**
     * info: custom info. enables user to mount some info on elements and use them
     * in event handlers. Update them only when user specified, otherwise, remain.
     */
    info?: GraphicExtraElementInfo;
    clipPath?: Omit<GraphicComponentZRPathOption, 'clipPath'> | false;
    textContent?: Omit<GraphicComponentTextOption, 'clipPath'>;
    textConfig?: ElementTextConfig;
    $action?: 'merge' | 'replace' | 'remove';
    tooltip?: CommonTooltipOption<unknown>;
    enterAnimation?: AnimationOption;
    updateAnimation?: AnimationOption;
    leaveAnimation?: AnimationOption;
}
export interface GraphicComponentDisplayableOption extends GraphicComponentBaseElementOption, Partial<Pick<Displayable, 'zlevel' | 'z' | 'z2' | 'invisible' | 'cursor'>> {
    style?: ZRStyleProps;
    z2?: number;
}
export interface GraphicComponentGroupOption extends GraphicComponentBaseElementOption, TransitionOptionMixin<GroupProps> {
    type?: 'group';
    /**
     * width/height: (can only be pixel value, default 0)
     * Only be used to specify contianer(group) size, if needed. And
     * can not be percentage value (like '33%'). See the reason in the
     * layout algorithm below.
     */
    width?: number;
    height?: number;
    children: GraphicComponentElementOption[];
    keyframeAnimation?: ElementKeyframeAnimationOption<GroupProps> | ElementKeyframeAnimationOption<GroupProps>[];
}
export interface GraphicComponentZRPathOption extends GraphicComponentDisplayableOption, TransitionOptionMixin<PathProps> {
    shape?: PathProps['shape'] & TransitionOptionMixin<PathProps['shape']>;
    style?: PathStyleProps & TransitionOptionMixin<PathStyleProps>;
    keyframeAnimation?: ElementKeyframeAnimationOption<PathProps> | ElementKeyframeAnimationOption<PathProps>[];
}
export interface GraphicComponentImageOption extends GraphicComponentDisplayableOption, TransitionOptionMixin<ImageProps> {
    type?: 'image';
    style?: ImageStyleProps & TransitionOptionMixin<ImageStyleProps>;
    keyframeAnimation?: ElementKeyframeAnimationOption<ImageProps> | ElementKeyframeAnimationOption<ImageProps>[];
}
interface GraphicComponentTextOption extends Omit<GraphicComponentDisplayableOption, 'textContent' | 'textConfig'>, TransitionOptionMixin<TextProps> {
    type?: 'text';
    style?: TextStyleProps & TransitionOptionMixin<TextStyleProps>;
    keyframeAnimation?: ElementKeyframeAnimationOption<TextProps> | ElementKeyframeAnimationOption<TextProps>[];
}
export declare type GraphicComponentElementOption = GraphicComponentGroupOption | GraphicComponentZRPathOption | GraphicComponentImageOption | GraphicComponentTextOption;
declare type GraphicExtraElementInfo = Dictionary<unknown>;
export declare type ElementMap = zrUtil.HashMap<Element, string>;
export declare type GraphicComponentLooseOption = (GraphicComponentOption | GraphicComponentElementOption) & {
    mainType?: 'graphic';
};
export interface GraphicComponentOption extends ComponentOption, AnimationOptionMixin {
    elements?: GraphicComponentElementOption[];
}
export declare function setKeyInfoToNewElOption(resultItem: ReturnType<typeof modelUtil.mappingToExists>[number], newElOption: GraphicComponentElementOption): void;
export declare class GraphicComponentModel extends ComponentModel<GraphicComponentOption> {
    static type: string;
    type: string;
    preventAutoZ: boolean;
    static defaultOption: GraphicComponentOption;
    /**
     * Save el options for the sake of the performance (only update modified graphics).
     * The order is the same as those in option. (ancesters -> descendants)
     */
    private _elOptionsToUpdate;
    mergeOption(option: GraphicComponentOption, ecModel: GlobalModel): void;
    optionUpdated(newOption: GraphicComponentOption, isInit: boolean): void;
    /**
     * Convert
     * [{
     *  type: 'group',
     *  id: 'xx',
     *  children: [{type: 'circle'}, {type: 'polygon'}]
     * }]
     * to
     * [
     *  {type: 'group', id: 'xx'},
     *  {type: 'circle', parentId: 'xx'},
     *  {type: 'polygon', parentId: 'xx'}
     * ]
     */
    private _flatten;
    useElOptionsToUpdate(): GraphicComponentElementOption[];
}
export {};
