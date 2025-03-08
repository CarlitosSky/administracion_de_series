import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Serie} from "../../interfaces/serie/serie.interface";
import {SerieDto} from "../../dto/serie.dto/serie.dto";
import {Model} from "mongoose";
@Injectable()
export class SerieService {

    constructor(@InjectModel('Serie') private serieModel: Model<Serie>) {
    }

    //crear serie nueva

    async addSerie(serieDto: SerieDto):Promise <any>{
        const serie = new this.serieModel(serieDto);
        return serie.save();
    }

    //tener todas las series

    async getSeries(): Promise<Serie[]> {
        return this.serieModel.find();
    }

    //serie por id

    async getSerie(_id: string):Promise<Serie> {
        return this.serieModel.findById(_id);
    }

    //buscar por sinopsis

    async searchSerie(query: string): Promise<Serie[]> {
        const regex = new RegExp(query, 'i');
        return this.serieModel.find({
            $or: [{ tittle: { $regex: regex } }, { sinopsis: { $regex: regex } }],
        });
    }

    //serie por nombre

    async getSerieByName(name : string): Promise<Serie[]>{
        const regex = new RegExp(name,'i');
        return  this.serieModel.find({tittle: {$regex: regex}})
    }

    //actualizar serie

    async updateSerie(_id: string,serieDto: SerieDto): Promise<any> {
        return this.serieModel.findByIdAndUpdate(
            _id,
            {$set: serieDto},
            {new: true}
        )
    }

    //eliminar serie

    async deleteSerie(id: string): Promise<any>{
        return this.serieModel.findByIdAndDelete(id)
    }

    //categorias unicas
    //tuve que hacerlo de esta manera con el foreach
    //porque lo hice mal desde el principio las categorias y tendria que borrar todoo
    //y no encontraba otra solucion :(

    async getCategorias(): Promise<any[]> {
        const series = await this.serieModel.find({}, 'categorias');
        const categoriasUnicas: any[] = [];

        series.forEach((serie) => {
            serie.categorias.forEach((categoria) => {
                if (!categoriasUnicas.some((item) => item.nombre === categoria.nombre)) {
                    categoriasUnicas.push(categoria);
                    //simplemente un array que te comprueba que no se metan al array las repetidas
                    //optimizacion 0
                    //funcional 10
                }
            });
        });
        return categoriasUnicas;
    }

    //imagenes de categorias

    async getCategoriasByImage(): Promise<string[]> {
        return this.serieModel.distinct('categorias.imagen');
    }

    //serie por categoria

    async getSeriesByCategoria(categoria: string): Promise<Serie[]> {
        return this.serieModel.find({ 'categorias.nombre': categoria });
    }

    //series en orden asc

    async getSeriesAsc(): Promise<Serie[]> {
        return this.serieModel.find().sort({ fechaOmision: -1 }).limit(25);
    }

    //series por categoria dada

    async getSeriesByCategoriaDada(categoria: string): Promise<Serie[]> {
        const series = await this.serieModel.find({ 'categorias.nombre': categoria });
        if (series.length > 0) {
            return series;
        } else {
            throw new Error(`No se encontraron series en la categoría: ${categoria}`);
        }
    }

}
