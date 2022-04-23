
export class Post {
  constructor(data) {
    this.title = data.title
    this.body = data.body || ''
    this.imageUrl = data.imageUrl
    this.layers = data.layers || 0
    this.accountId = data.accountId
    this.id = data.id
  }

  get Template() {
    return /* html */`
    <div class="row justify-content-center my-5">
      <div class="col-md-8">
      <div class="card w-100 p-5">
        <h5 class="card-title mb-4 selectable fit p-2 rounded" onclick="app.postsController.setActivePost('${this.id}')">${this.title}</h5>
          <img src="https://cdn.vox-cdn.com/thumbor/iHYQCXZLUPAx3wLetkUI9H4gS_U=/108x4:1300x700/1400x933/filters:focal(580x237:804x461):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68509203/the_dark_knight_shrek.0.jpg" class="card-img-top img-fit" alt="...">
          <div class="card-body">
            <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.postsController.vote(${this.id}, true)">Uplayer</button>
            <button class="btn btn-warning" onclick="app.postsController.vote(${this.id}, false)">Downlayer</button>
            <button class="btn btn-primary" onclick="app.postsController.edit(${this.id})">Edit</button>
            <button class="btn btn-warning" onclick="app.postsController.remove(${this.id})">Remove</button>
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
            <button class="btn btn-primary" onclick="app.postsController.vote(${this.postId}, true)">Uplayer</button>
            <button class="btn btn-warning" onclick="app.postsController.vote(${this.postId}, false)">Downlayer</button>
            <button class="btn btn-primary" onclick="app.postsController.edit(${this.postId})">Edit</button>
            <button class="btn btn-warning" onclick="app.postsController.remove(${this.postId})">Remove</button>
    `
  }

  addLayer() {
    this.layers++
  }
}
