import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostSchema = new Schema( {
	title: {
		required: true,
		type: String,
	},
	body: {
		required: true,
		type: String,
	},
	createdAt: {
		default: Date.now,
		type: Date,
	},
} );
