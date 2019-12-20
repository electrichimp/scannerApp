import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
// import schema from './schema.js'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema'
import resolvers from './graphql/resolvers'
import { type } from 'os';

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Index
// app.use(express.static('../../front/public'));

// GraphQL
app.get('/', (req, res) => res.json({message: 'Hello worlds'}));
// app.use('/graphql', graphqlHTTP({
//     graphiql: true,
//     schema: schema
// }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({ app, path: '/graphql' });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('Conectando a MongoDB, yeee!😱'))
    .catch(err => console.log('Error, OH NO! ', err));


app.listen(port, () => console.log(`Apollo running on port ${port}`));