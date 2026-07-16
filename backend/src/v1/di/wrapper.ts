import type { Token, Provider } from "./index.js"
import { RegisterProviderError, ResolveInstanceError, isClassProvider, isValueProvider, ResolveCycleError, DI_METADATA } from './index.js';

export class Wrapper {
    private providers = new Map<Token, Provider>();
    private instances = new Map<Token, unknown>();

    register(provider: Provider) {
        if (this.providers.has(provider.name)) {
            throw new RegisterProviderError(provider.name);
        }
        
        this.providers.set(provider.name, provider)
    }

    resolve(token: Token) {
        this._resolve(token, new Set<Token>())
    }

    private _resolve<T>(token: Token, stack: Set<Token>) {
        if (this.instances.has(token)) {
            return this.instances.get(token) as T;
        }

        if (!this.providers.has(token)) {
            throw new ResolveInstanceError(token);
        }

        const provider = this.providers.get(token) as Provider;
        if (isValueProvider(provider)) {
            this.instances.set(token, provider.useValue);
            return provider.useValue as T;
        }

        if (isClassProvider(provider)) {
            return this.createClassInstance<T>(token, provider.useClass, new Set(stack));
        }
    }

    private createClassInstance<T>(token: Token, concreteClass: Function, stack: Set<Token>) {
        if (stack.has(token)) {
            throw new ResolveCycleError([...stack, token]);
        }

        const injectParams = Reflect.getMetadata(DI_METADATA.INJECT, concreteClass) ?? {};
        const optionalParams = Reflect.getMetadata(DI_METADATA.OPTIONAL, concreteClass) ?? {};
        const paramTypes = Reflect.getMetadata(DI_METADATA.PARAM_TYPES, concreteClass) ?? [];

        const resultParams = paramTypes.map((p: any, index: number) => {
            const paramType = injectParams[index] ?? p;
        });
    }
}