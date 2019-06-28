import { GraphqlInterface } from 'react-relay'

declare global {
    //'relay-runtime' 

}

declare module 'relay-runtime' {
    export interface CacheConfig {
        payload: any,
    }
}
export const graphql: GraphqlInterface;
