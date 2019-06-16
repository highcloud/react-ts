import { ThemeOptions, Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

declare module "@material-ui/core/styles/createMuiTheme" {
    export interface ThemeOptions {
        mixins?: MixinsOptions;
    }
    export interface MixinsOptions extends Partial<Mixins> {
        // ... use interface declaration merging to add custom mixin options
    }
    export default function createMuiTheme(options?: ThemeOptions): Theme;
}

declare module "@material-ui/core/styles/createMixins" {
    export interface Mixins {
        content: CSSProperties
    }
}