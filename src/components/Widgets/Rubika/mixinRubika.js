import { APIGateway } from 'src/api/APIGateway'

const mixinRubika = {
  data () {
    return {
      isRubikaUser: true
    }
  },
  methods: {
    getRubikaToken () {
      if (typeof window !== 'undefined' && window.localStorage.getItem('RubikaToken')) {
        return window.localStorage.getItem('RubikaToken')
      }
      this.isRubikaUser = false
      return null
    },
    checkIsRubikaUser () {
      const token = this.getRubikaToken()
      return new Promise((resolve, reject) => {
        APIGateway.rubika.checkRubikaToken(token)
          .then(() => {
            this.isRubikaUser = true
            resolve()
          })
          .catch(() => {
            this.isRubikaUser = false
            window.localStorage.removeItem('RubikaToken')
            window.location.reload()
            reject()
          })
      })
    },
    setUserInfo () {
      const token = this.getRubikaToken()
      APIGateway.rubika.setUserInfo(token)
        .then(() => {
          this.isRubikaUser = true
        })
        .catch(() => {
          this.isRubikaUser = false
          window.localStorage.removeItem('RubikaToken')
        })
    }
  }
}

export default mixinRubika
