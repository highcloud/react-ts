import { Environment, GraphQLTaggedNode, Variables } from 'relay-runtime';
import { ParsedQuery } from 'query-string';
import { Config } from 'knex';
import { UnregisterCallback } from 'history';
import { Params } from 'universal-router';
import { Component } from 'react';

declare module 'universal-router' {
    interface Context {
        path?: string,
        query?: ParsedQuery | GraphQLTaggedNode,
        relay: Environment,
        config: import('../config').ServerConfig, //Config,
        //components?: () => React.ComponentType[],
        //render?: (components: React.ComponentType[], props: object, renderContext: any) => React.Component, //todo
        //getChildren?: () => Context
        components?: () => Promise<{ default: React.Component }>[],
        variables?: (params: Params, ctx: Context) => Variables,
        //query?: GraphQLTaggedNode,
        render?: (components: Component[], data: any, renderContext: any) => any,
        redirect?: string,
    }

    interface Route<C extends Context = any, R = any> {
        // path?: string | RegExp | Array<string | RegExp>
        // name?: string
        // parent?: Route | null
        // children?: Routes<C, R> | null
        // action?: (context: RouteContext<C, R> & C, params: Params) => R | Promise<R> | void

        getChildren?: () => Promise<{ default: Routes }>,

    }
}