export class Comment {
  constructor(data) {
    this.id = data.id
    this.body = data.body
    this.posterName = data.account.name
    this.posterPicture = data.account.picture
    this.userVote = data.userVote
  }

  get Template() {
    return /* html */`
        <img src=${this.posterPicture} />
        <h3>${this.posterName}</h3>
        <p>${this.body}</p>
        <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.commentsController.vote(${this.id}, true)">Uplayer</button>
            <button class="btn btn-warning" onclick="app.commentsController.vote(${this.id}, false)">Downlayer</button>
            <button class="btn btn-primary" onclick="app.commentsController.edit(${this.id})">Edit</button>
            <button class="btn btn-warning" onclick="app.commentsController.remove(${this.id})">Remove</button>
          </div>
        `
  }
}
