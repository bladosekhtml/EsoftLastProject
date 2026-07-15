export class RootError extends Error {
    constructor(message: string) {
        super(message);
        console.error(message);
    }
}