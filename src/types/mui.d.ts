import { CSSProperties } from "@material-ui/core/styles/withStyles";

//import { CSSProperties } from "react";

declare module '@material-ui/core/styles/createMixins' {
    interface Mixins {
        content: CSSProperties;
        // ... use interface declaration merging to add custom mixins
    }
}

declare module '@material-ui/core/styles/createTypography' {
    interface TypographyOptions {
        monoFamily: CSSProperties['fontFamily'];
        // ... use interface declaration merging to add custom mixins
    }
}

