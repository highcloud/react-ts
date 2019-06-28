/** 
 * @author Jiping
 * @description extend @material-ui/core
 *   */

import { CSSProperties } from "@material-ui/core/styles/withStyles";

declare module '@material-ui/core/styles/createMixins' {
    export interface Mixins {
        content: CSSProperties;
        // ... use interface declaration merging to add custom mixins
    }
}

declare module '@material-ui/core/styles/createTypography' {
    interface FontStyle {
        monoFamily: CSSProperties['fontFamily'];
        // ... use interface declaration merging to add custom mixins
    }

}