import { IStackoverflowResponse } from "./stackoverflow.interface";


export class StackoverflowService {
  private apiUrl = 'https://api.stackexchange.com/2.2/users/';
  private static instance: StackoverflowService;

  private constructor() { }

  static getInstance() {
    if (!StackoverflowService.instance) {
      StackoverflowService.instance = new StackoverflowService();
    }

    return StackoverflowService.instance;
  }

  getUser(id: string) {
    const url = this.getUrl(id);
    return fetch(url)
    .then(r => r.json())
    .then((r: IStackoverflowResponse) => {
      if (r.items.length === 1) {
        return r.items.pop();
      }

      throw Error(`The id has more than 1 user`);
    })

  }

  private getUrl(id: string) {
    return `${this.apiUrl}${id}?site=stackoverflow`
  }
}
