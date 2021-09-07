class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.app = axios.create({baseURL: this.BASE_URL})
  }

  getFullList = () => this.app.get('/characters')

  getOneRegister = id => this.app.get(`/characters/${id}`)

  createOneRegister = character => this.app.post('/characters', character)

  updateOneRegister = (character) => this.app.put(`/characters/${character.id}`, character)

  deleteOneRegister = id => this.app.delete(`/characters/${id}`)
  
}
