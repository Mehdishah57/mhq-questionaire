import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResponse extends Document {
    answers: Record<string, any>;
    createdAt: Date;
}

const ResponseSchema: Schema = new Schema({
    answers: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model is already compiled to avoid OverwriteModelError
const Response: Model<IResponse> = mongoose.models.Response || mongoose.model<IResponse>('Response', ResponseSchema);

export default Response;
