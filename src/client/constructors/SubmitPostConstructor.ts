import { SubmitPost } from '../types';

export default class SubmitPostConstructor implements SubmitPost {
  public body: string;
  public title: string;

  constructor(data: any) {
    this.body = data.body;
    this.title = data.title;
  }
}
