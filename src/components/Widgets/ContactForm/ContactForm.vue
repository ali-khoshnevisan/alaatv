<template>
  <div class="contact-form-container new-theme"
       :style="localOptions.style"
       :class="localOptions.className">
    <div class="form-title-wrapper">
      <q-icon class="q-mr-sm"
              :name="localOptions.iconName"
              :color="localOptions.iconColor"
              :size="iconSize"
              :style="{color: localOptions.iconColor}" />
      <text-widget :options="localOptions.titleOption" />
    </div>
    <div class="form-subtitle-wrapper">
      <text-widget :options="localOptions.subtitleOption" />
    </div>
    <div v-if="mounted"
         class="form-inputs-wrapper">
      <form-builder ref="formBuilder"
                    v-model:value="localOptions.inputs" />
    </div>
    <div class="form-action-wrapper">
      <action-button :options="localOptions.actionButtonOptions"
                     :disable="actionLoading"
                     @action-button="CallAction" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'
import ActionButton from 'src/components/Widgets/ActionButton/ActionButton.vue'
import { FormBuilder, inputMixin } from 'quasar-form-builder'
import { Notify } from 'quasar'
// import FormBuilder from 'quasar-form-builder/src/FormBuilder.vue'
// import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'

export default defineComponent({
  name: 'ContactForm',
  components: {
    TextWidget,
    FormBuilder,
    ActionButton
  },
  mixins: [mixinWidget, inputMixin],
  data () {
    return {
      mounted: false,
      defaultOptions: {
        titleOption: {},
        subtitleOption: {},
        actionButtonOptions: {},
        inputs: [],
        iconName: 'warning',
        iconColor: 'primary',
        iconSize: {},
        fieldBackground: '#F4F5F6',
        inputBorder: '',
        inputLabelColor: '#424242',
        eventId: null,
        borderStyle: {},
        boxShadows: [],
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      },
      actionLoading: false
    }
  },
  computed: {
    iconSize () {
      return this.$q.screen.lt.xl ? this.localOptions.iconSize.xs : this.$q.screen.lt.sm ? this.localOptions.iconSize.sm : this.$q.screen.lt.md ? this.localOptions.iconSize.md : this.$q.screen.lt.lg ? this.localOptions.iconSize.lg : this.localOptions.iconSize.xl
    },
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      if (!Array.isArray(this.localOptions.cssHoverEffects?.boxShadows)) {
        return ''
      }
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    cssHoverEffectsBorderStyle () {
      const borderCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderCssString : ''
      const borderRadiusCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString : ''

      return {
        borderCssString,
        borderRadiusCssString
      }
    }
  },
  mounted () {
    this.mounted = true
  },
  methods: {
    formHasEmptyRequiredField (form) {
      let result = false
      for (const key in form) {
        if (form[key].required && !form[key].value) {
          Notify.create({
            type: 'negative',
            color: 'red',
            message: 'وارد کردن ' + form[key].label + ' الزامیست'
          })
          result = true
        }
      }
      return result
    },
    CallAction () {
      this.actionLoading = true
      const values = this.$refs.formBuilder.getValues()
      const form = {}
      values.forEach(field => {
        form[field.name] = { value: field.value, required: 'required' in field ? field.required : true, label: field.label }
      })
      form.event_id = { value: this.localOptions.eventId, required: true }
      if (this.formHasEmptyRequiredField(form)) {
        this.actionLoading = false
        return
      }
      const sendData = {}
      for (const key in form) {
        if (form[key].value) {
          sendData[key] = form[key].value
        }
      }
      this.$apiGateway.user.newsletter(sendData)
        .then(message => {
          this.$q.notify({
            type: 'positive',
            message,
            position: 'top'
          })
          this.actionLoading = false
        })
        .catch(() => {
          this.actionLoading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('cssHoverEffectsBorderStyle.borderCssString');
$hoverBorderRadius: v-bind('cssHoverEffectsBorderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');
$fieldBackground: v-bind('localOptions.fieldBackground');
//$inputBorder: v-bind('localOptions.inputBorder');
//$inputLabelColor: v-bind('localOptions.inputLabelColor');

.contact-form-container {
  width: 100%;
  padding: 30px;
  box-shadow: $shadows;
  border-radius: $borderRadius;
  border: $border;

  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }

  .form-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  //.form-inputs-wrapper {
  //  :deep(.outsideLabel) {
  //    color: $inputLabelColor;
  //  }
  //}

  &:deep(.q-field) {
    .q-field__inner {
      .q-field__control{
        //&::before {
          background: $fieldBackground;
          //border: $inputBorder;
        //}
      }
    }
  }
  &.theme-haftane {
    &:deep(.q-field) {
      .q-field__inner {
        .q-field__control{
          &:before {
            border: 1.5px solid $grey-8;
            border-radius: 0;
          }
        }
      }
    }
  }
}
</style>
