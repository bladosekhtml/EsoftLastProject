import type { Provider, ClassProvider, ValueProvider } from "./index.js"

export function isClassProvider(provider: Provider): provider is ClassProvider {
    return 'useClass' in provider;
}

export function isValueProvider(provider: Provider): provider is ValueProvider {
    return 'useValue' in provider;
}