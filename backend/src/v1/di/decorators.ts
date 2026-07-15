import type { Token } from './index.js';
import { DI_METADATA } from './index.js';

export function Injectable(): ClassDecorator {
    return (target: Function): void => {
        Reflect.defineMetadata(DI_METADATA.INJECTABLE, true, target);
    }
}

export function Inject(token: Token): ParameterDecorator {
    return (target: Object, _, parameterIndex: number): void => {
        const data: Record<number, Token> = Reflect.getMetadata(DI_METADATA.INJECT, target) ?? {};
        data[parameterIndex] = token;
        Reflect.defineMetadata(DI_METADATA.INJECT, data, target);
    }
}

export function Optional(): ParameterDecorator {
    return (target: Object, _, parameterIndex: number): void => {
        const data: Record<number, boolean> = Reflect.getMetadata(DI_METADATA.OPTIONAL, target) ?? {};
        data[parameterIndex] = true;
        Reflect.defineMetadata(DI_METADATA.OPTIONAL, data, target);
    }
}