import { makeSchema } from 'nexus';
import { join } from 'path' ;
import * as types from './graphql';

export const schema = makeSchema({
    types, //types from the graphql folder
    outputs: {//both update automatically when we run npm run dev || npm run generate
        schema: join(__dirname, '..', 'schema.graphql'), //generates schema.graphql and defines the structure of the API
        typegen: join(__dirname, '..', 'nexus-typegen.ts') //generates typegen file that contains all types in graphql schema
    },
    contextType: {
        module: join(__dirname, './context.ts'),
        export: "Context",
    }
})