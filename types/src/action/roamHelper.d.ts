import type View from '../coord/View';
import type ExtensionAPI from '../core/ExtensionAPI';
import type { Payload } from '../util/types';
export interface RoamPayload extends Payload {
    dx: number;
    dy: number;
    zoom: number;
    originX: number;
    originY: number;
}
export declare function updateCenterAndZoom(view: View, payload: RoamPayload, zoomLimit?: {
    min?: number;
    max?: number;
}, api?: ExtensionAPI): {
    center: number[];
    zoom: number;
};
