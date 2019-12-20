import mongoose from 'mongoose';
const { Schema } = mongoose;

const codeSchema = new Schema({
    codigo: {type: String, required: true},
    descripcion: {type: String, required: true},
    mensaje: {type: String, required: true},
    anulado: {type: Boolean, required: true},
    fecha: {type: String, required: true},
    empresa: {type: String, required: true}
},{timestamps: true});

const Code = mongoose.model('Code', codeSchema)

export default Code;