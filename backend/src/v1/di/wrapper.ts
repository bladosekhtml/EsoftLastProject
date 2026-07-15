import type { Token, Provider } from "./index.js"
import { RegisterProviderError, ResolveInstanceError, isClassProvider, isValueProvider } from './index.js';

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

    private _resolve(token: Token, stack: Set<Token>) {
        if (this.instances.has(token)) {
            return this.instances.get(token);
        }

        if (!this.providers.has(token)) {
            throw new ResolveInstanceError(token);
        }

        const provider = this.providers.get(token) as Provider;
        if (isValueProvider(provider)) {
            this.instances.set(token, provider.useValue);
            return provider.useValue;
        }

        
    }

    private _() {

    }
}