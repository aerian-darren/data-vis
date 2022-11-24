import Element from 'zrender/src/Element';
import GlobalModel from '../../model/Global';
import ComponentView from '../../view/Component';
import ExtensionAPI from '../../core/ExtensionAPI';
import { GraphicComponentModel, GraphicComponentElementOption } from './GraphicModel';
export declare const inner: (hostObj: Element<import("zrender/src/Element").ElementProps>) => {
    width: number;
    height: number;
    isNew: boolean;
    id: string;
    type: string;
    option: GraphicComponentElementOption;
};
export declare class GraphicComponentView extends ComponentView {
    static type: string;
    type: string;
    private _elMap;
    private _lastGraphicModel;
    init(): void;
    render(graphicModel: GraphicComponentModel, ecModel: GlobalModel, api: ExtensionAPI): void;
    /**
     * Update graphic elements.
     */
    private _updateElements;
    /**
     * Locate graphic elements.
     */
    private _relocate;
    /**
     * Clear all elements.
     */
    private _clear;
    dispose(): void;
}
