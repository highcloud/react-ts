import { Context } from "universal-router";

interface AppContext extends Context {
    path: string,
    query: any,
    components: () => any[],
    render: Function, //todo
    getChildren?: () => AppContext
}

