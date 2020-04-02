export enum AjaxState {
  ERROR,
  IDLE,
  LOADING,
  SENDING,
  SUCCESS
}

export interface AjaxCalls {
  ajaxMessage: string;
  ajaxStatus: AjaxState;
}

export interface NewsFeedState extends AjaxCalls {
  posts: SinglePost[];
}

export interface CreatePostState extends AjaxCalls {
  body: string;
  title: string;
}

export interface RootState {
  notificationDuration: number;
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

export enum UIState {
  ERROR,
  LOADING,
  READY
}
