<template>
  <div class="haftaneh-features"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-scroll-area class="scroll">
      <div class="row no-wrap">
        <div v-for="(item, index) in localOptions.items"
             :key="index"
             class="col-grow flex items-center">
          <image-widget :options="item.img" />
          <text-widget :options="item.text" />
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import imageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'

export default {
  name: 'HaftanehFeatures',
  components: {
    TextWidget,
    imageWidget
  },
  mixins: [mixinWidget],
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
      }
    }
  }
}
</script>

<style scoped lang="scss">
.haftaneh-features {
  .scroll {
    max-width: 1347px;
    height: 40px;
    @media screen and (width < 1024px){
      height: 32px ;
    }
  }
}
</style>
