
export class Post {
  constructor(data) {
    this.title = data.title
    this.body = data.body
    this.imageUrl = data.imageUrl
    this.layers = data.layers
    this.accountId = data.accountId
  }

  get Template() {
    return /* html */`
      
    `
  }
}
