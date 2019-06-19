declare module "load-script" {
    type scriptOptions = Partial<HTMLScriptElement>
    type scriptCallback = (err?: Error, script?: scriptOptions) => void
    function load(str: string, opts: scriptOptions | scriptCallback, callbackScriptOptions?: scriptOptions): void;
    export = load
}
