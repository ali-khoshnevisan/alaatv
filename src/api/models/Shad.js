import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class ShadAPI extends APIRepository {
  constructor () {
    super('shad', apiV2)
    this.APIAdresses = {
      auth: '/auth/shad-login'
    }
    this.CacheList = {
      auth: this.name + this.APIAdresses.auth
    }
  }

  login (id) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.auth,
      data: { hashed_id: id },
      resolveCallback: (response) => {
        // const mobile = response.data.mobile
        const user = response.data.data.user
        const accessToken = response.data.data.access_token

        return { accessToken, user }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
