<template>
  <div />
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'RubikaLanding',
  mixins: [
    mixinWidget
  ],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    rubikaQuery () {
      return this.$route.query.UserID
    }
  },
  mounted () {
    if (this.rubikaQuery) {
      this.setRubikaToken(this.rubikaQuery)
    }
  },
  methods: {
    setRubikaToken (id) {
      window.localStorage.setItem('ShadToken', id)
      this.loading = true
      this.$store.dispatch('Auth/shadLogin', id)
        .then(({ accessToken, user }) => {
          this.loading = false
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          // this.getUserData()
          //   .then(() => {
          //     this.$store.commit('AppLayout/updateLoginDialog', false)
          //     this.redirectTo()
          //   })
          this.$store.commit('AppLayout/updateLoginDialog', false)
          this.$emit('onLoggedIn')
          this.$bus.emit('onLoggedIn')
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
