import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post, Put, Query
} from '@nestjs/common';
import {SerieService} from "./services/serie/serie.service";
import {SerieDto} from "./dto/serie.dto/serie.dto";


@Controller('api/v1/series')
export class SeriesController {


    constructor(private readonly serieService: SerieService) {
    }

    @Post('')
    async addSerie(@Body() serieDto: SerieDto) {
        try {

            const resp = await this.serieService.addSerie(serieDto);
            return {
                status: 'Ok',
                message: 'Serie creada perfectamente'
            }
        } catch (e: any) {
            throw new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }


    @Get('')
    async getSeries() {
        try {
            const data = await this.serieService.getSeries();
            return {
                status: 'Ok',
                data
            }
        } catch (e: any) {

            return new BadRequestException({
                status: 'Error',
                message: e.message
            })

        }
    }

    @Get('serie/:id')
    async getSerie(@Param('id') id: string) {
        try {
            const data = await this.serieService.getSerie(id);

            if (data) {
                return {
                    status: 'Ok',
                    data
                }
            } else {
                return new NotFoundException({
                    status: 'Not found',
                    message: 'serie not found por id'
                })
            }

        } catch (e: any) {
            return new BadRequestException({
                status: 'Error',
                message: e.message
            })
        }
    }

    //buscar por sinopsis

    @Get('buscar')
    async searchSerie(@Query('query') query: string) {
        try {
            const data = await this.serieService.searchSerie(query);
            return {
                status: 'OK',
                data: data
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    //sacar categorias

    @Get('categorias')
    async getCategorias() {
        try {
            const data = await this.serieService.getCategorias();
            return {
                status: 'Ok',
                data,
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }


    @Get('categorias/:categoria')
    async getSeriesByCategoria(@Param('categoria') categoria: string) {
        try {
            const data = await this.serieService.getSeriesByCategoria(categoria);
            return {
                status: 'Ok',
                data,
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Get('ordenarAsc')
    async getSeriesAsc() {
        try {
            const data = await this.serieService.getSeriesAsc();
            return {
                status: 'Ok',
                data,
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Get('categoriasImg')
    async getCategoriasByImage() {
        try {
            const data = await this.serieService.getCategoriasByImage();
            return {
                status: 'Ok',
                data,
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Get('categoriasDada/:categoria')
    async getSeriesByCategoriaDada(@Param('categoria') categoria: string) {
        try {
            const data = await this.serieService.getSeriesByCategoriaDada(categoria);
            return {
                status: 'Ok',
                data,
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Put('update/:id')
    async updateSerie(
        @Param('id') id: string,
        @Body() serieDto: SerieDto,
    ) {
        try {
            const updatedSerie = await this.serieService.updateSerie(id, serieDto);

            if (!updatedSerie) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'no existe el id',
                });
            }

            return {
                status: 'OK',
                message: 'Serie actualizada',
                data: updatedSerie,
            };

        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }

    @Delete('delete/:id')
    async deleteSerie(@Param('id') id: string) {
        try {
            const data = await this.serieService.deleteSerie(id);
            return {
                status: 'Ok',
                message: 'Borrada'
            };
        } catch (e: any) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: e.message,
            });
        }
    }


    //acaba aqui todoo
}

