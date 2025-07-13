<template>
  <div class="row product-demos-widget"
       :class="options.className"
       :style="options.style">
    <div v-if="contents.list && contents.list.length > 0"
         class="demos-container col-md-12 q-mt-md">
      <div ref="contentScroll"
           v-dragscroll
           class="contents-block">
        <div v-if="options.type === 'content'"
             class="row no-wrap">
          <div v-for="content in options.contents.list"
               :key="content.id"
               class="col-lg-3 col-sm-5 col-xs-10">
            <content-item class="q-mr-md"
                          :options="{content,contentLinkTarget: '_blank'}" />
          </div>
        </div>
        <div v-else-if="options.type === 'pamphlet'"
             class="flex no-wrap">
          <div v-for="(pamphlet, index) in options.contents.list"
               :key="index"
               class="pamphlet-block">
            <div v-if="pamphlet.photo">
              <!--              <div class="body1 text-center q-mb-md">{{pamphlet.title}}</div>-->
              <q-img :ref="el => { thumbRef[index] = el }"
                     :src="pamphlet.photo"
                     :class="index === indexZoomed ? 'fixed-top q-mt-md q-mx-auto z-top' : void 0"
                     :style="index === indexZoomed ? 'width: 650px; max-width: 100vw' : 'width: 200px'"
                     spinner-color="primary"
                     spinner-size="82px"
                     @click="zoomImage(index)" />
            </div>
            <div v-if="pamphlet.file.pamphlet.length > 0">
              <q-card class="content-box">
                <q-item class="content-item">
                  <q-item-section middle
                                  avatar>
                    <q-avatar color="white"
                              class="cursor-pointer"
                              text-color="primary"
                              icon="download"
                              @click="downloadPamphlet(pamphlet)" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="ellipsis-2-lines cursor-pointer"
                                  style="line-height: 22px !important;"
                                  @click="downloadPamphlet(pamphlet)">{{pamphlet.title}}</q-item-label>
                  </q-item-section>
                  <q-item-section side
                                  middle>
                    <q-btn color="primary"
                           label="دانلود"
                           @click="downloadPamphlet(pamphlet)" />
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { Product } from 'src/models/Product.js'
import { mixinPrefetchServerData, mixinWidget, mixinCapacitorDownloadFile } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import { morph, openURL } from 'quasar'
// import LazyImg from 'components/lazyImg.vue'

export default {
  name: 'productDemos',
  components: {
    // LazyImg,
    ContentItem
  },
  directives: {
    dragscroll
  },
  mixins: [mixinWidget, mixinPrefetchServerData, mixinCapacitorDownloadFile],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      contents: new ContentList(),
      toggler: false,
      product: new Product(),
      indexZoomed: null,
      thumbRef: []
    }
  },
  computed: {
    productId () {
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    },
    pamphlets () {
      if (this.product.sample_photos) {
        return this.product.sample_photos
      } else {
        return []
      }
    }
  },
  methods: {
    downloadPamphlet (content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else if (this.isNative) {
        this.downloadPdfWithAxios(content.file.pamphlet[0].link)
      } else {
        openURL(content.file.pamphlet[0].link)
      }
    },
    scrollToRight () {
      this.$refs.contentScroll.scrollLeft += 200
    },
    scrollToLeft () {
      this.$refs.contentScroll.scrollLeft -= 200
    },
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = data
      this.getSampleContents()
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct () {
      if (this.options.product) {
        return new Promise(resolve => {
          resolve(new Product(this.options.product))
        })
      } else if (!this.productId) {
        return new Promise((resolve) => {
          resolve()
        })
      }
      this.product.loading = true
      return this.$apiGateway.product.show(this.productId)
    },
    getSampleContents () {
      if (this.options.contents) {
        this.contents = this.options.contents
      } else {
        return this.$apiGateway.product.sampleContent(this.productId)
          .then(contentList => {
            this.contents = contentList
          })
          .catch(() => {

          })
      }
    },
    zoomImage (index) {
      const indexZoomedState = this.indexZoomed
      let cancel = void 0

      this.indexZoomed = void 0

      if (index !== void 0 && index !== indexZoomedState) {
        cancel = morph({
          from: this.thumbRef[index].$el,
          onToggle: () => {
            this.indexZoomed = index
          },
          duration: 500,
          onEnd: end => {
            if (end === 'from' && this.indexZoomed === index) {
              this.indexZoomed = void 0
            }
          }
        })
      }

      if (
        indexZoomedState !== void 0 &&
        (cancel === void 0 || cancel() === false)
      ) {
        morph({
          from: this.thumbRef[indexZoomedState].$el,
          waitFor: 100,
          duration: 300
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-demos-widget {
  display: flex;
  justify-content: center;

  .demos-container {
    width: 1140px;
    max-width: 100%;
  }

  .section-title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    &::before {
      content: ".";
      color: #BAD9FB;
      font-size: 50px;
      font-weight: bold;
      line-height: 10px;
      margin-right: 4px;
    }

  }

  .contents-block {
    //display: flex;
    overflow: auto;
    padding: 10px 0 0;

    .pamphlet-block {
      //max-width: 300px;
      //min-width: 157px;
      margin: 10px 8px 19px;
      cursor: pointer;
      .content-box {
        min-width: 400px;
      }
    }
  }
}
</style>
