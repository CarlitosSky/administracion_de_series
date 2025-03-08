import {Module} from '@nestjs/common';
import {SeriesController} from './series.controller';
import {SerieService} from './services/serie/serie.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SerieSchema} from "./schemas/serie/serie.schema";


@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: 'Serie',
                    schema: SerieSchema,
                    collection: 'series2425'
                }
            ]
        )
    ],
    controllers: [SeriesController],
    providers: [SerieService]
})
export class SeriesModule {


}
