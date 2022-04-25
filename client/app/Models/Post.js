
export class Post {
  constructor(data) {
    this.title = data.title
    this.body = data.body || ''
    this.imageUrl = data.imageUrl
    this.layers = data.layers || 0
    this.accountId = data.accountId
    this.id = data.id
    this.score = data.upvotes - data.downvotes
    this.account = data.account
  }

  get Template() {
    return /* html */`
    <div class="row justify-content-center my-5">
      <div class="col-md-8">
      <div class="card w-100 p-5 bg-primary">
        <div class="d-flex justify-content-between selectable" onclick="app.postsController.setActivePost('${this.id}')">
            <h5 class="card-title mb-4 fit p-2 rounded">${this.title}</h5>
            <h5>${this.score}</h5>
        </div>
        <div class="d-flex mb-1">
            <img style="height: 24px; object-fit: contain" src="${this.account.picture}">
            <h5 class="ms-2">${this.account.name}</h5>
        </div>
          <img src="${this.imageUrl}" class="card-img-top img-fit" alt="...">
          <div class="card-body">
            <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.postsController.vote('${this.id}', true)">Uplayer</button>
            <button class="btn btn-warning" onclick="app.postsController.vote('${this.id}', false)">Downlayer</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="app.postsController.editButton('${this.id}')">Edit</button>
            <button class="btn btn-danger" onclick="app.postsController.remove('${this.id}')">Remove</button>
          </div>
        </div>
      </div>
    </div>    
    `
  }

  get activeTemplate() {
    return /* html */`
    <img src="https://cdn.vox-cdn.com/thumbor/iHYQCXZLUPAx3wLetkUI9H4gS_U=/108x4:1300x700/1400x933/filters:focal(580x237:804x461):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68509203/the_dark_knight_shrek.0.jpg" class="card-img-top img-fit" alt="...">
          <div class="card-body">
            <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.postsController.vote('${this.id}', true)">Uplayer</button>
            <button class="btn btn-warning" onclick="app.postsController.vote('${this.id}', false)">Downlayer</button>
            <button class="btn btn-primary" onclick="app.postsController.edit('${this.id}')">Edit</button>
            <button class="btn btn-warning" onclick="app.postsController.remove('${this.id}')">Remove</button>
    `
  }

  addLayer() {
    this.layers++
  }
}
