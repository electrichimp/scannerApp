import Code from './models/models';

const resolvers = {
    Query: {

        codes: async (parent, args, ctx, info) => { 
            args = JSON.parse(JSON.stringify(args));
            let query = {};
            if (args.data && args.data.codigo) {
                query = {"codigo": args.data.codigo};
            }
            if (args.data && args.data.descripcion) {
                query = {"descripcion": args.data.descripcion};
            }
            if (args.data && (typeof(args.data.anulado) === "boolean")) {
                query =  {...query, "anulado": args.data.anulado};
            }
            if (args.data && args.data.fecha) {
                query =  {...query, "fecha": args.data.fecha};
            }
            if (args.data && args.data.empresa) {
                query =  {...query, "empresa": args.data.empresa};
            }
            return await Code.find(query, 'codigo descripcion mensaje anulado fecha empresa createdAt upadtedAt')}
    },

    Mutation: {
        insertCode: async (parent, args , ctx, info) => {
            const { data } = JSON.parse(JSON.stringify(args));
            await (new Code({...data})).save();
            return 'Ingresau!'
        },
        updateCode: async (parent, args, ctx, info) => {
            const { code, data } = JSON.parse(JSON.stringify(args));
            let doc = await Code.findOneAndUpdate({codigo: code}, {...data});
            return 'Cambiau pe!'
        },
        insertCodes: async (parent, args, ctx, info) => {
            args = JSON.parse(JSON.stringify(args));
            const codsFinal  = args.data.map(async d => await (new Code({...d})).save());
            await Promise.all(codsFinal);
            return 'Ingresado!!'
        }
    }
} 

export default resolvers;