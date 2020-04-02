import { AjaxState, SinglePost } from '../types';

export default class PostConstructor implements SinglePost {
  public body: string;
  public createdAt: string;
  public id: string;
  public title: string;

  constructor(data: any) {
    this.id = data._id ? data._id : '';
    this.body = data.body ? data.body : '';
    this.createdAt = data.createdAt ? data.createdAt : '';
    this.title = data.title ? data.title : '';
  }
}
