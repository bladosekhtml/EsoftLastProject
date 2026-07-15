export type Token = string | symbol | Function;

interface RootProvider {
    name: Token;
}

export interface ClassProvider extends RootProvider {
    useClass: any;
}

export interface ValueProvider extends RootProvider {
    useValue: any;
}

export type Provider = ClassProvider | ValueProvider;

export const DI_METADATA = {
    INJECTABLE: 'di:injectable',
    INJECT: 'di:injectable',
    OPTIONAL: 'di:injectable',
    PARAM_TYPES: 'design:paramtypes',
} as const;