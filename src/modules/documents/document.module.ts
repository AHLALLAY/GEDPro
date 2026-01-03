import { Module } from "@nestjs/common";
import { DocumentController } from "./document.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Document, DocumentSchema } from "./schemas/document.schema";
import { DocumentService } from "./document.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: Document.name, schema: DocumentSchema}
        ])
    ],
    controllers:[DocumentController],
    providers:[DocumentService],
    exports:[DocumentService]

})

export class DocumentModule {}