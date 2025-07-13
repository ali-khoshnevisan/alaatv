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
  computed: {
    rubikaQuery () {
      return this.$route.query.ut ? this.$route.query.ut : this.$route.query.token
    }
  },
  mounted () {
    if (this.rubikaQuery) {
      this.setRubikaToken(this.rubikaQuery)
    }
  },
  methods: {
    setRubikaToken (token) {
      window.localStorage.setItem('RubikaToken', token)
    }
  }
}
</script>

<style scoped>

</style>
