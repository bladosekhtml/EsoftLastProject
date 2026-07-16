import { RootError } from "../root/index.js";
import type { Token } from "./index.js";

export class RegisterProviderError extends RootError {
    constructor(token: Token) {
        super(token as string);
    }
}

export class ResolveInstanceError extends RootError {
    constructor(token: Token) {
        super(token as string);
    }
}

export class ResolveCycleError extends RootError {
    constructor(tokens: Token[]) {
        super(tokens.join(' - ') as string);
    }
}