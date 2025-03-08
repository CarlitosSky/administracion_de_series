import {Schema} from "mongoose";


export const SerieSchema = new Schema({

    tittle: {type: String, required: true},
    imagenes: {
        type: [String],
        required: true
    },
    categorias: [
        {
            nombre: {
                type: String, required: true
            },
            imagen: {
                type: String, required: true
            }
        }
    ],
    puntuacion: [
        {
            mail: {
                type: String, required: false , default: 'default@cieep.com'
            },
            rating: {
                type: Number, required: false , default: 1
            }
        }
    ],
    numeroCapitulos: {
        type: Number,
        required: true
    },
    fechaOmision: {
        type: Date, default: new Date().getFullYear(),
        required: true
    },
    sinopsis: {
        type: String, required: true
    }
    //aqui acaba el schema
},{versionKey:false})
