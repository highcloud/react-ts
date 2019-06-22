import { Environment, GraphQLTaggedNode } from 'relay-runtime';
import { ParsedQuery } from 'query-string';
import { Config } from 'knex';
import { UnregisterCallback } from 'history';

declare module 'universal-router' {
    interface Context {
        path?: string,
        query: GraphQLTaggedNode,
        relay: Environment,
        config: Config,
        components?: () => any[],
        render?: UnregisterCallback, //todo
        getChildren?: () => Context
    }
}