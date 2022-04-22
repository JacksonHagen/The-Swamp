
export class Post {
  constructor(data) {
    this.title = data.title
    this.body = data.body || ''
    this.imageUrl = data.imageUrl
    this.layers = data.layers || 0
    this.accountId = data.accountId
    this.postId = data.postId
  }

  get Template() {
    return /* html */`
    <div class="row justify-content-center my-5">
      <div class="col-md-8">
        <div class="card w-100">
          <img src="https://cdn.vox-cdn.com/thumbor/iHYQCXZLUPAx3wLetkUI9H4gS_U=/108x4:1300x700/1400x933/filters:focal(580x237:804x461):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68509203/the_dark_knight_shrek.0.jpg" class="card-img-top img-fit" alt="...">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.body}</p>
            <button class="btn btn-primary" onclick="app.postsController.upLayer(${this.postId})">Uplayer</button>
            <button class="btn btn-warning" onclick="app.postsController.downLayer(${this.postId})">Downlayer</button>
          </div>
        </div>
      </div>
    </div>    
    `
  }

  addLayer() {
    this.layers++
  }
}
