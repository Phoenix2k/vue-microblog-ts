import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { PostSchema } from '../models/post';

const PostsConnection = mongoose.model( 'Post', PostSchema );

export class PostController {

	/**
	 * Creates a new post
	 */
	public createPost( request: Request, response: Response ) {
		return new PostsConnection( request.body ).save( ( error, post ) => {
			if ( error ) return response.send( error );
			response.json( post );
		} );
	}

	/**
	 * Deletes a single post
	 */
	public deletePost( request: Request, response: Response ) {
		return PostsConnection.findOneAndDelete( {
			_id: request.query.postId,
		}, ( error, post ) => {
			if ( error ) return response.send( error );
			if ( ! post ) return response.sendStatus( 204 );
			response.sendStatus( 202 );
		} );
	}

	/**
	 * Gets all posts
	 */
	public getPosts( request: Request, response: Response ) {
		return PostsConnection.find( {}, ( error, post ) => {
			if ( error ) return response.send( error );
			response.json( post );
		} );
	}

	/**
	 * Updates a single post
	 */
	public updatePost( request: Request, response: Response ) {
		return  PostsConnection.findOneAndUpdate( {
			_id: request.query.postId,
		}, request.body, { new: true }, ( error, post ) => {
			if ( error ) return response.send( error );
			response.json( post );
		} );
	}
}
