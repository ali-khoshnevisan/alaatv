<template>
  <div class="form-builder-input"
       :class="customClass">
    <div class="outsideLabel">{{ placeholder ? label : null }}</div>
    <q-input ref="input"
             v-model="inputData"
             :name="name"
             :filled="filled"
             :rules="rules"
             :lazy-rules="lazyRules"
             :label="placeholder ? null : label"
             :stack-label="!!placeholder"
             :type="inputType"
             :disable="disable"
             :clearable="clearable"
             :loading="loading"
             :readonly="readonly"
             :rounded="rounded"
             :outlined="outlined"
             :placeholder="placeholder"
             :class="customClass"
             :input-class="customClass"
             :autogrow="autogrow"
             @update:model-value="change($event)"
             @click="onClick"
             @keypress="onKeyPress">
      <template v-if="prependIcon"
                v-slot:prepend>
        <q-icon :name="prependIcon" />
      </template>
      <template v-if="appendIcon"
                v-slot:append>
        <q-icon :name="appendIcon" />
      </template>
    </q-input>
  </div>
</template>

<script>
import inputMixin from '../mixins/inputMixin.js'
export default {
  name: 'FormBuilderInput',
  mixins: [inputMixin],
  props: {
    prependIcon: {
      default: '',
      type: String
    },
    appendIcon: {
      default: '',
      type: String
    },
    name: {
      default: '',
      type: String
    },
    autogrow: {
      type: Boolean,
      default: false
    },
    value: {
      default: '',
      type: [String, Number, Boolean]
    }
  },
  methods: {
    checkValidate () {
      this.$refs.input.validate()
    }
  }
}
</script>

<style scoped></style>
