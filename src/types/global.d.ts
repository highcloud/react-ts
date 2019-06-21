
interface Window {
    dataLayer: any[];
    data: any;
    config: import('./config').ServerConfig;
    FB: fb.FacebookStatic;
    fbAsyncInit: () => any;
}

interface NodeModule {
    hot: any;
}

interface Error {
    status: number,
}

declare var module: NodeModule

//declare var config: any; // import('knex').Config;



