import type Model from '../../model/Model';
import type Sector from 'zrender/src/graphic/shape/Sector';
export declare function getSectorCornerRadius(model: Model<{
    borderRadius?: string | number | (string | number)[];
}>, shape: Pick<Sector['shape'], 'r0' | 'r'>, zeroIfNull?: boolean): {
    cornerRadius: number;
} | {
    cornerRadius: number[];
};
