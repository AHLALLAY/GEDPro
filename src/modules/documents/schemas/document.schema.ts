import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as MongooseDocument } from "mongoose";

export type Doc = Document & MongooseDocument;

@Schema({timestamps: true})
export class Document{
    @Prop({required: true})
    fileName: string;

    @Prop({required: true})
    originalName: string;

    @Prop({required: true})
    mimeType: string;

    @Prop({required: true})
    size: number;

    @Prop({required: true})
    minioObjectName: string;

    @Prop()
    description?: string;

    @Prop({enum: ['CV', 'Diplôme', 'Contrat', 'Attestation', 'Autre'], default: 'Autre'})
    category: string;

    @Prop()
    uploadedBy?: string;

    @Prop()
    extractedText?: string;

    @Prop({type: [String], default:[]})
    skills?: string[];

    @Prop({type: Object})
    ocrMetadata?:{
        language?: string;
        confidence: number;
        processingTime: number;
    };

    @Prop()
    minioBucket?: string;

    @Prop()
    signedUrl?: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);