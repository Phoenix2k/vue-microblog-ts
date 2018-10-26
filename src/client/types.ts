export interface NewsFeedState {
	posts: SinglePost[];
}

export interface PostFormState {
	body: string;
	error: boolean;
	loading: boolean;
	success: boolean;
	title: string;
}

export interface RootState {
	error: boolean;
	loading: boolean;
}

export interface SinglePost {
	body: string;
	createdAt: string;
	id: string;
	title: string;
}

export interface SubmitPost {
	body: string;
	title: string;
}
