import  { makeExecutableSchema } from 'graphql-tools';
import { gql } from 'apollo-server';
import resolvers from './resolvers';

export const typeDefs = gql`
    type Query {
        codes(data: QueryCodeInput): [Code]
    } 

    type Mutation {
        insertCode(data: InsertCodeInput!): String,
        updateCode(code: String!, data: UpdateCodeInput!): String,
        insertCodes(data: [InsertCodeInput!]!): String
    }

    type Code {
        _id: ID!
        codigo: String!
        descripcion: String!
        mensaje: String!
        anulado: Boolean!
        fecha: String!
        empresa: String!
        createdAt: String!
        updatedAt: String
    }

    input QueryCodeInput {
        codigo: String
        descripcion: String
        anulado: Boolean
        fecha: String
        empresa: String
    }

    input InsertCodeInput {
        codigo: String!
        descripcion: String!
        mensaje: String!
        anulado: Boolean!
        fecha: String!
        empresa: String!
    }

    input UpdateCodeInput {
        descripcion: String
        mensaje: String
        anulado: Boolean
        fecha: String
    }

`

export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers : resolvers
})