<template>
  <div />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { Capacitor } from '@capacitor/core'
import { Loading } from 'quasar'

export default {
  name: 'Pay',
  mounted () {
    Loading.show({
      message: 'در حال انتقال به درگاه پرداخت. لطفا کمی صبر کنید...',
      spinnerColor: 'primary'
    })
    this.checkTransactionById()
  },
  methods: {
    redirectToHome () {
      this.$router.push({ name: 'Public.Home' })
    },
    goToPaymant () {
      this.$store.dispatch('Cart/paymentCheckout', {
        paymentMethod: null,
        transactionId: this.$route.params.transaction_id
      })
        .then((encryptedPaymentRedirectLink) => {
          if (Capacitor.isNativePlatform()) {
            document.location = encryptedPaymentRedirectLink
          } else {
            window.open(encryptedPaymentRedirectLink, '_self')
          }
        })
        .catch(() => {
          Loading.hide()
          this.redirectToHome()
        })
    },
    loginUser (userData) {
      this.$store.dispatch('Auth/login', {
        mobile: userData.mobile,
        password: userData.national_code
      })
        .then(() => {
          this.goToPaymant()
        })
        .catch(() => {
          Loading.hide()
          this.redirectToHome()
        })
    },
    checkTransactionById () {
      const userId = this.$route.params.user_id
      const transactionId = this.$route.params.transaction_id
      APIGateway.user.checkTransactionById({ transactionId, userId })
        .then((userData) => {
          this.loginUser(userData)
        })
        .catch(() => {
          Loading.hide()
          this.redirectToHome()
        })
    }
  }
}
</script>

<style scoped>

</style>
