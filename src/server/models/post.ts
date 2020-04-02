import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  body: {
    required: true,
    type: String
  },
  createdAt: {
    default: Date.now,
    type: Date
  }
});
