import { ScriptHTMLAttributes } from "react";


//declare module "load-script" {
//export interface LoadScript{
export function load(str: string, opts: ScriptHTMLAttributes | loadScriptCallback);
export function loadScriptCallback(err?: Error, script: ScriptHTMLAttributes): void;
export default load as loadScript;
    //}
//}