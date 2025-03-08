export interface Serie {
    _id:             string;
    tittle:          string;
    imagenes:        string[];
    categorias:      Categoria[];
    puntuacion?:      Puntuacion[];
    numeroCapitulos: number;
    fechaOmision:    Date;
    sinopsis:        string;

}

export interface Categoria {
    nombre: string;
    imagen: string;
    _id:    string;
}

export interface Puntuacion {
    mail: string;
    rating: number;
    _id?:    string;
}