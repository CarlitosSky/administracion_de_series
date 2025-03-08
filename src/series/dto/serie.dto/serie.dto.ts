export class SerieDto {
    _id:             string;
    tittle:          string;
    imagenes:        string[];
    categorias:      CategoriaDto[];
    puntuacion?:      PuntuacionDto[];
    numeroCapitulos: number;
    fechaOmision:    Date;
    sinopsis:        string;

}

export class CategoriaDto {
    nombre: string;
    imagen: string;
    _id:    string;
}

export class PuntuacionDto {
    mail: string;
    rating: number;
    _id?:    string;
}