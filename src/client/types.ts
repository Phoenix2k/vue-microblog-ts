export enum AjaxState {
	ERROR,
	IDLE,
	LOADING,
	SENDING,
	SUCCESS,
}

export interface AjaxStatus {
	ajaxStatus: AjaxState;
}

export interface NewsFeedState extends AjaxStatus {
	posts: SinglePost[];
}

export interface PostFormState extends AjaxStatus {
	body: string;
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