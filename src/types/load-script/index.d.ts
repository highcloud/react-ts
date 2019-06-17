declare module "load-script" {
    type loadScriptCallback = (err?: Error, script?: HTMLScriptElement) => void
    function load(str: string, opts: HTMLScriptElement | loadScriptCallback): void;
    export = load
}
