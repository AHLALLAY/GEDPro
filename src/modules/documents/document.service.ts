import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Doc, Document } from "./schemas/document.schema";
import { Model } from "mongoose";

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document.name) private documentModel: Model<Doc>
    ) { }

}