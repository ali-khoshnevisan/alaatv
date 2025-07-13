<template>
  <router-view />
</template>

<script>
import { App } from '@capacitor/app'
import { defineComponent } from 'vue'
import { Capacitor } from '@capacitor/core'

export default defineComponent({
  name: 'App',
  mounted () {
    if (Capacitor.isNativePlatform()) {
      this.setEventListenerForNativeAppDeepLink()
    }
  },
  methods: {
    setEventListenerForNativeAppDeepLink () {
      App.addListener('appUrlOpen', (event) => {
        // Example url: https://beerswift.app/tabs/tabs2
        // slug = /tabs/tabs2
        const slug = event.url.split('.com').pop() // Extract the route
        if (slug) {
          // Navigate to the route in your Vue.js app
          this.$router.push(slug)
        }
        // const urlObject = new URL(event.url)
        // const path = urlObject.href.replace(urlObject.origin, '')
        // // We only push to the route if there is a slug present
        // if (path) {
        //   // this.$router.push({ path })
        //   // document.location = 'https://localhost/#' + path
        //   setTimeout(() => {
        //     window.location.assign('https://localhost/#' + path)
        //   }, 10)
        // }
      })
    }
  }
})
</script>
