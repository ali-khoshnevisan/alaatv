import { apiV2 } from 'src/boot/axios.js'
import APIRepository from '../classes/APIRepository.js'

export default class RubikaAPI extends APIRepository {
  constructor () {
    super('rubika', apiV2)
    this.APIAdresses = {
      base: '/rubika/set-user-info',
      checkToken: '/rubika/get-user-info'
    }
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      checkToken: this.name + this.APIAdresses.checkToken
    }
  }

  checkRubikaToken (token, cache = { TTL: 500 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.checkToken,
      cacheKey: this.CacheList.checkToken,
      ...(cache !== undefined && { cache }),
      data: { user_token: token },
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  setUserInfo (token) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      data: { user_token: token },
      resolveCallback: (response) => {
        // const mobile = response.data.mobile
        // const accessToken = response.data.data.access_token
        // const user = new User(response.data.data.user)

        // return { accessToken, user }
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
