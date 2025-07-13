<template>
  <q-expansion-item ref="quasarExpansionItem"
                    v-model="localModel"
                    :switch-toggle-side="switchToggleSide"
                    :class="{'grey-mode': grey, 'separated': separated}"
                    :duration="duration"
                    @show="onShow"
                    @before-show="onBeforeShow"
                    @after-show="onAfterShow"
                    @hide="onHide"
                    @before-hide="onBeforeHide"
                    @after-hide="onAfterHide">

    <template v-slot:header>
      <q-item-section>
        <q-item-section class="header-label-section">
          <q-icon v-if="icon"
                  :name="icon"
                  class="header-icon"
                  size="20px"
                  color="grey9" />
          <slot name="beforeLabel" />
          <div class="expansion-label ellipsis">
            {{ label }}
          </div>
          <slot name="afterLabel" />
        </q-item-section>
        <q-item-section class="responsive-action-section">
          <div class="action-wrapper">
            <div class="action">
              <slot name="action" />
            </div>
          </div>
        </q-item-section>
      </q-item-section>

      <q-item-section v-if="hasAction"
                      class="header-action-section">
        <div class="action-wrapper">
          <div class="action">
            <slot name="action" />
          </div>
        </div>
      </q-item-section>
      <q-separator class="header-separator" />

    </template>
    <slot name="default" />
  </q-expansion-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpansionItem',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    duration: {
      type: Number,
      default: 400
    },
    modelValue: {
      type: Boolean,
      default: null
    },
    switchToggleSide: {
      type: Boolean,
      default: false
    },
    separated: {
      type: Boolean,
      default: true
    },
    expanded: {
      type: Boolean,
      default: false
    },
    grey: {
      type: Boolean,
      default: false
    },
    hasAction: {
      type: Boolean,
      default: false
    }

  },
  emits: ['show', 'beforeShow', 'afterShow', 'hide', 'beforeHide', 'afterHide', 'update:modelValue', 'scrollToSet'],
  data () {
    return {
      localModel: false
    }
  },
  computed: {
    // computedModelValue: {
    //   get () {
    //     return this.modelValue ? this.modelValue : this.localModel
    //   },
    //   set (value) {
    //     this.localModel = value
    //     this.$emit('update:modelValue', value)
    //   }
    // }
  },
  watch: {
    modelValue (val) {
      this.localModel = val
      if (val) {
        this.onShow()
        this.scrollToSet()
      }
    }
  },
  mounted () {
    this.localModel = this.modelValue
    if (this.modelValue) {
      this.onShow()
      this.scrollToSet()
    }
  },
  methods: {
    scrollToSet () {
      this.$refs.quasarExpansionItem.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    onShow () {
      this.$emit('show')
    },
    onBeforeShow () {
      this.$emit('beforeShow')
    },
    onAfterShow () {
      this.$emit('afterShow')
    },
    onHide () {
      this.$emit('hide')
    },
    onBeforeHide () {
      this.$emit('beforeHide')
    },
    onAfterHide () {
      this.$emit('afterHide')
    },
    hide () {
      this.$refs.quasarExpansionItem.hide()
    },
    show () {
      this.$refs.quasarExpansionItem.show()
    },
    toggle () {
      this.$refs.quasarExpansionItem.toggle()
    }
  }
})
</script>
