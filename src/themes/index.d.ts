import { Theme } from '@material-ui/core'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { TypographyOptions } from '@material-ui/core/styles/createTypography';

// declare module "@material-ui/core/styles/createMuiTheme" {
//     export interface ThemeOptions {
//         mixins?: MixinsOptions;
//         typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
//     }
//     export interface MixinsOptions extends Partial<Mixins> {
//         // ... use interface declaration merging to add custom mixin options
//     }
//     export default function createMuiTheme(options?: ThemeOptions): Theme;
// }

// declare module "@material-ui/core/styles/createMixins" {
//     export interface Mixins {
//         content: CSSProperties
//     }
// }

// declare module "@material-ui/core/styles/createTypography" {
//     export interface TypographyOptions {
//         monoFamily?: CSSProperties['fontFamily'];
//     }
// }

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        v1: ThemeOptions;
    }
}