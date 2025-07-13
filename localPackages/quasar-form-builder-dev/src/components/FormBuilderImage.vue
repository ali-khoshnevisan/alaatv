<template>
  <div class="form-builder-image"
       :class="customClass">
    <div class="outsideLabel">{{ label ? label : null }}</div>
    <q-img :src="value"
           :width="width"
           :height="height" />
  </div>
</template>

<script>

import inputMixin from '../mixins/inputMixin.js'

export default {
  name: 'FormBuilderImage',
  mixins: [inputMixin],
  props: {
    name: {
      default: '',
      type: String
    },
    height: {
      type: String,
      default: '0px'
    },
    width: {
      type: String,
      default: '0px'
    },
    value: {
      default: '',
      type: String
    }
  }
}
</script>

<style scoped>

</style>
