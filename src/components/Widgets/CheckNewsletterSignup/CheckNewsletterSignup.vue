<template>
  <div />
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'CheckNewsletterSignup',
  mounted () {
    this.checkSignup()
  },
  methods: {
    checkSignup () {
      const newsletterMobile = localStorage.getItem('newsletter#showNewsletter45')
      APIGateway.user.newsletterStatus({ mobile: newsletterMobile, event_id: 45 })
        .then(newsletter => {
          if (newsletter.id) {
            const data = {
              eventId: newsletter.event_id,
              majorId: newsletter.major.id,
              gradeId: newsletter.grade.id
            }
            this.$bus.emit('generateTextByMajor', newsletter.major.id)
            this.$bus.emit('getEventProducts', data)
            return
          }
          this.$router.push('/landing/100k')
        })
        .catch()
    }
  }
}
</script>

<style scoped>

</style>
