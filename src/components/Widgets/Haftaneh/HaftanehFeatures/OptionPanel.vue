<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-expansion-item icon="ph:image"
                            label="image setting">
            <image-widget-option-panel v-model:options="localOptions.imageWidgetOptions" />
          </q-expansion-item>
        </div>
        <div class="col-12">
          <q-expansion-item label="text setting"
                            icon="ph:pencil">
            <text-widget-option-panel v-model:options="localOptions.textOption" />
          </q-expansion-item>
        </div>
        <div class="col-12 full-width">
          <q-btn icon="ph:plus"
                 color="green"
                 @click="addItem" />
        </div>
        <div class="col-12">
          <q-list v-if="localOptions.items.length > 0"
                  separator
                  class="q-ma-sm">
            <q-expansion-item v-for="(item, index) in localOptions.items"
                              :key="index"
                              expand-separator
                              :label="item.text">
              <template v-slot:header>
                <q-item-section avatar>
                  {{ index+1 }}.
                </q-item-section>

                <q-item-section>
                  {{ item.text.text }}
                </q-item-section>

                <q-item-section side>
                  <div class="row items-center">
                    <q-btn color="negative"
                           flat
                           icon="delete"
                           @click="deleteField(index)" />
                    <q-btn color="primary"
                           flat
                           icon="content_copy"
                           @click="duplicate(index)" />
                  </div>
                </q-item-section>
              </template>
              <div class="row q-col-gutter-sm">
                <div class="col-12">
                  <text-widget-option-panel v-model:options="localOptions.items[index].text" />
                </div>
                <div class="col-12">
                  <image-widget-option-panel v-model:options="localOptions.items[index].img"
                                             label="image src" />
                </div>
              </div>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel
  },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        items: [],
        textOption: {
          text: '',
          fontFamily: null,
          color: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          responsiveShow: {
            xl: true,
            lg: true,
            md: true,
            sm: true,
            xs: true
          },
          xs: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          sm: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          md: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          lg: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          xl: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
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
          hasTheme: null,
          activeTheme: 'default',
          themes: {
            theme1: {
              borderColor: null,
              borderSize: null,
              borderWidth: null,
              borderHeight: null,
              top: null,
              left: null,
              bottom: null,
              right: null
            }
          }
        },
        imageWidgetOptions: {
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
        }
      },
      defaultImageOptions: {
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
      defaultTextOptions: {
        text: '',
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        responsiveShow: {
          xl: true,
          lg: true,
          md: true,
          sm: true,
          xs: true
        },
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
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
        hasTheme: null,
        activeTheme: 'default',
        themes: {
          theme1: {
            borderColor: null,
            borderSize: null,
            borderWidth: null,
            borderHeight: null,
            top: null,
            left: null,
            bottom: null,
            right: null
          }
        }
      }
    }
  },
  methods: {
    addItem () {
      this.localOptions.items.push({ img: this.localOptions.imageWidgetOptions, text: this.localOptions.textOption })
      this.localOptions.textOption = this.defaultTextOptions
      this.localOptions.imageWidgetOptions = this.defaultImageOptions
    },
    deleteField (index) {
      this.localOptions.items.splice(index, 1)
    },
    duplicate (index) {
      const item = JSON.parse(JSON.stringify(this.localOptions.items[index]))
      this.localOptions.items.splice(index, 0, item)
    }
  }
})
</script>

<style scoped>

</style>
