export class Comments
{
    constructor(data)
    {
        this.id = data.id
        this.body = data.body
        this.posterName = data.account.name
        this.posterPicture = data.account.picture
    }

    get Template()
    {
        return `
        <img src=${this.posterPicture} />
        <h3>${this.posterName}</h3>
        <p>${this.body}</p>
        <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.commentsController.upVote(${this.id})">Uplayer</button>
            <button class="btn btn-warning" onclick="app.commentsController.downVote(${this.id})">Downlayer</button>
          </div>
        `
    }
}