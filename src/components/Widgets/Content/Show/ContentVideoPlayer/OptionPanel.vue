<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md items-center">
          <div class="col-md-4">
            <q-select v-model="localOptions.paginate"
                      :options="paginate"
                      label="paginate"
                      @input-value="localOptions.paginate = !localOptions.paginate" />
          </div>
          <div class="col-md-4">
            <q-input v-model="localOptions.id"
                     label="content id" />
          </div>
          <div class="col-md-4">
            <div class="outsidelabel">بنر تبلیغاتی</div>
            <q-checkbox v-model="localOptions.hasAdvertisingBanner" />
          </div>
          <div v-if="localOptions.hasAdvertisingBanner"
               class="col-12">
            <image-widget-option-panel v-model:options="localOptions.advertisingBanner" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageWidgetOptionPanel },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      paginate: [true, false],
      defaultOptions: {
        hasAdvertisingBanner: false,
        advertisingBanner: {
          responsiveShow: {
            xl: true,
            lg: true,
            md: true,
            sm: true,
            xs: true
          },
          imageSource: null,
          ratio: null,
          hasAction: false,
          useAEEEvent: false,
          action: {
            name: null,
            route: null,
            scrollTo: null,
            eventName: null,
            eventArgs: null
          },
          xs: {
            height: null,
            width: null,
            src: null
          },
          sm: {
            height: null,
            width: null,
            src: null
          },
          md: {
            height: null,
            width: null,
            src: null
          },
          lg: {
            height: null,
            width: null,
            src: null
          },
          xl: {
            height: null,
            width: null,
            src: null
          },
          responsiveSpacing: {
            xs: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            sm: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            md: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            lg: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            xl: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            }
          },
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
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
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
