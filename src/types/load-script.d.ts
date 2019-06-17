declare module "load-script" {
    import { ScriptHTMLAttributes } from "react";
    declare function load(str: string, opts: ScriptHTMLAttributes | loadScriptCallback);
    declare function loadScriptCallback(err?: Error, script: ScriptHTMLAttributes): void;
    export = load
}