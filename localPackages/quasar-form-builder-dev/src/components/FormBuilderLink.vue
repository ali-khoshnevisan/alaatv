<template>
  <div class="form-builder-link"
       :class="customClass">
    <div class="outsideLabel">{{ label ? label : null }}</div>
    <div class="cursor-pointer link"
         @click="openLink">{{ value }}</div>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
import { openURL } from 'quasar'

export default {
  name: 'FormBuilderLink',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: String
    },
    url: {
      default: '',
      type: String
    }
  },
  methods: {
    openLink () {
      openURL(this.url)
    }
  }
}
</script>

<style scoped lang="scss">
.form-builder-link {
  //position: absolute;
}
</style>
