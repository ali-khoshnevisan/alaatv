<template>
  <div v-if="showLoading"
       class="product-info-container">
    <div class="mobile-header">
      <q-skeleton height="40px" />
    </div>
    <div class="header-info">
      <q-skeleton height="80px" />
    </div>
    <div class="description">
      <q-skeleton v-for="i in 3"
                  :key="i"
                  class="q-my-md"
                  height="200px" />
    </div>
  </div>
  <div v-else
       class="product-info-container">
    <div v-if="localOptions.product.children.length > 0"
         class="selectable-product">
      <div class="row items-center header">
        <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-11/Rectangle1700578454.png" />
        <h6 class="q-ml-sm">
          انتخاب محتوا
        </h6>
      </div>
      <div class="content">
        <div v-for="children in localOptions.product.children"
             :key="children"
             class="child-product-container">
          <child-product :product="children"
                         @add-child="addChildToProduct" />
        </div>
      </div>
    </div>
    <div v-if="products.list.length > 0"
         class="next-steps">
      <card-slider :title="'قدم های بعدی'"
                   :products="products" />
    </div>
    <div ref="headerSticky"
         class="mobile-header">
      <q-tabs v-model="activeTab"
              inline-label
              outside-arrows
              mobile-arrows
              align="left"
              breakpoint="md"
              indicator-color="primary"
              active-color="primary"
              class="text-grey">
        <q-tab name="description"
               label="توضیحات دوره"
               @click="scrollTo('description', 200)" />
        <q-tab v-if="setList.length !== 0"
               name="sections"
               label="سرفصل ها"
               @click="scrollTo('sections', 200)" />
        <q-tab v-if="contentListLength !== 0"
               name="documents"
               label="نمونه محتوا"
               @click="scrollTo('documents', 200)" />
        <q-tab v-if="pamphletListLength !== 0"
               name="pamphlets"
               label="نمونه جزوه"
               @click="scrollTo('pamphlets')" />
      </q-tabs>
    </div>
    <div class="header-info"
         :class="{'sticky': isSticky}">
      <q-card class="outline-card">
        <q-card-section>
          <div class="row items-center">
            <div class="col-10">
              <q-tabs v-model="activeTab"
                      inline-label
                      outside-arrows
                      mobile-arrows
                      align="left"
                      breakpoint="md"
                      indicator-color="primary"
                      active-color="primary"
                      class="text-grey">
                <q-tab name="description"
                       label="توضیحات دوره"
                       @click="scrollTo('description', 188)" />
                <q-tab v-if="setList.length !== 0"
                       name="sections"
                       label="سرفصل ها"
                       @click="scrollTo('sections', 200)" />
                <q-tab v-if="contentListLength !== 0"
                       name="documents"
                       label="نمونه محتوا"
                       @click="scrollTo('documents', 200)" />
                <q-tab v-if="pamphletListLength !== 0"
                       name="pamphlets"
                       label="نمونه جزوه"
                       @click="scrollTo('pamphlets')" />
                <!--      <q-tab v-if="giftListLength !== 0"-->
                <!--             name="gifts"-->
                <!--             label="هدیه ها" />-->
                <!--      <q-tab v-if="faqListLength !== 0"-->
                <!--             name="faq"-->
                <!--             label="سوالات متداول" />-->
              </q-tabs>
            </div>
            <div class="col-2">
              <div class="flex justify-end">
                <q-btn class="size-md"
                       icon="ph:arrow-up"
                       square
                       flat
                       @click="scrollTop" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section />
      </q-card>
    </div>
    <div ref="description"
         class="description">
      <div @enter="activeTab = 'description'">
        <course-explain v-model:height="courseExplainHeight"
                        :title="'توضیحات دوره'">
          <template v-slot:content>
            <div class="product-long-description body2"
                 v-html="localOptions.product.description?.long" />
          </template>
        </course-explain>
      </div>
    </div>
    <div v-if="setList.length !== 0"
         ref="sections"
         class="sections">
      <div @enter="activeTab = 'sections'">
        <course-explain v-model:height="sectionsHeight"
                        :more-button-label="'مشاهده سرفصل ها'"
                        :content-type="'expansion-panel'"
                        :title="'سرفصل ها'">
          <template v-slot:content>
            <product-set-list :options="{product: localOptions.product, setList:setList}"
                              @update-set-list="onUpdateSetList($event)" />
          </template>
        </course-explain>
      </div>
    </div>
    <div v-if="contentListLength !== 0"
         ref="documents"
         class="documents">
      <div @enter="activeTab = 'documents'">
        <card-slider :title="'نمونه محتوا'"
                     :contents="contents"
                     :product="localOptions.product"
                     :slider-type="'content'" />
      </div>
    </div>
    <div v-if="pamphletListLength !== 0"
         ref="pamphlets"
         class="pamphlets">
      <div @enter="activeTab = 'pamphlets'">
        <card-slider :title="'نمونه جزوه'"
                     :contents="pamphlets"
                     :product="localOptions.product"
                     :slider-type="'pamphlet'" />
      </div>
    </div>
    <!--    <q-tab-panels v-model="tab"-->
    <!--                  animated>-->
    <!--      <q-tab-panel name="description"-->
    <!--                   class="product-tab-panel">-->
    <!--        <course-explain :title="'توضیحات دوره'" />-->
    <!--        <div class="product-description-title">-->
    <!--          توضیحات تکمیلی دوره-->
    <!--        </div>-->
    <!--        <div class="product-long-description"-->
    <!--             v-html="localOptions.product.description?.long" />-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="sections"-->
    <!--                   class="product-tab-panel">-->
    <!--        <product-set-list :options="{product: localOptions.product, setList:setList}"-->
    <!--                          @update-set-list="onUpdateSetList($event)" />-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="documents">-->
    <!--        <div class="product-tab-panel">-->
    <!--          <product-demos :options="{-->
    <!--            contents: contents,-->
    <!--            product: localOptions.product-->
    <!--          }" />-->
    <!--        </div>-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel name="gifts">-->
    <!--        <div class="product-tab-panel">-->
    <!--          <product-gifts :options="{products: gifts}" />-->
    <!--        </div>-->
    <!--      </q-tab-panel>-->
    <!--      <q-tab-panel class="product-tab-panel"-->
    <!--                   name="faq">-->
    <!--        <product-f-a-q :options="{faqList:faqList}" />-->
    <!--      </q-tab-panel>-->
    <!--    </q-tab-panels>-->
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product, ProductList } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
// import ProductGifts from 'src/components/Widgets/Product/ProductGifts/ProductGifts.vue'
// import ProductFAQ from 'src/components/Widgets/Product/ProductFAQ/ProductFAQ.vue'
import ProductSetList from 'src/components/Widgets/Product/ProductSetList/ProductSetList.vue'
import CourseExplain from 'components/Widgets/Product/ProductPage/components/CourseExplain/CourseExplain.vue'
import childProduct from 'components/Widgets/Product/ProductPage/components/ChildProduct.vue'
import CardSlider from 'components/Widgets/Product/ProductPage/components/CardSlider.vue'
import lazyImg from 'components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway'

export default defineComponent({
  name: 'ProductInfoTab',
  components: {
    lazyImg,
    childProduct,
    CardSlider,
    // ProductGifts,
    // ProductFAQ,
    ProductSetList,
    CourseExplain
  },
  mixins: [mixinWidget],
  data () {
    return {
      setLoading: false,
      giftLoading: false,
      contentLoading: false,
      faqLoading: false,
      courseExplainHeight: '150px',
      sectionsHeight: '659px',
      activeTab: 'description',
      defaultOptions: {
        product: new Product()
      },
      tab: 'description',
      gifts: new ProductList(),
      contents: new ContentList(),
      pamphlets: new ContentList(),
      products: new ProductList(),
      isSticky: false,
      faqList: [],
      setList: [],
      productData: {
        product_id: null,
        products: []
      }
    }
  },
  computed: {
    showLoading () {
      return this.setLoading || this.giftLoading || this.contentLoading || this.faqLoading
    },
    stickyElement () {
      return this.$refs.headerSticky
    },
    productId () {
      return this.localOptions.product.id ? this.localOptions.product.id : this.localOptions.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
    },
    setListLength () {
      return this.setList.length
    },
    contentListLength () {
      return this.contents.list.length
    },
    pamphletListLength () {
      return this.pamphlets.list.length
    },
    giftListLength () {
      return this.gifts.list.length
    },
    faqListLength () {
      return this.faqList.length
    }
  },
  watch: {
    productId () {
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    },
    activeTab (newValue) {
      // this.scrollTo(newValue)
    }
  },
  mounted () {
    if (this.productId) {
      this.productData.product_id = this.productId
      this.getProductSets()
      this.getProductGifts()
      this.getSampleContents()
      this.getProductFaq()
    }
    if (this.localOptions.product.children.length > 0) {
      this.getNextSteps()
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    getNextSteps () {
      APIGateway.product.getSiblings(1304)
        .then((productList) => {
          this.products = productList
        })
        .catch(() => {})
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    handleScroll () {
      if (!this.$refs.headerSticky) {
        this.isSticky = false
        return
      }
      this.isSticky = this.$refs.headerSticky.offsetTop <= 88
    },
    scrollTo (refName, top = 0) {
      const element = this.$refs[refName]
      if (element) {
        const scroll = element.getClientRects()[0].top - top
        window.scrollBy({ top: scroll, behavior: 'smooth' })
      }
    },
    addChildToProduct (productId) {
      this.productData.products.push(productId)
      this.$bus.emit('updateSelectedProductPrice', this.productData)
    },
    getProductGifts () {
      this.giftLoading = true
      this.$apiGateway.product.gifts(this.productId)
        .then(productList => {
          this.giftLoading = false
          this.gifts = productList
        })
        .catch(() => {
          this.giftLoading = false
        })
    },
    getSampleContents () {
      this.contentLoading = true
      return this.$apiGateway.product.sampleContent(this.productId)
        .then(sampleContents => {
          this.contentLoading = false
          this.contents = sampleContents.videos
          this.pamphlets = sampleContents.pamphlets
          this.pamphlets.list.push(...sampleContents.sample_photos.list)
        })
        .catch(() => {
          this.contentLoading = false
        })
    },
    getProductFaq () {
      this.faqLoading = true
      return this.$apiGateway.product.getProductFaq(this.productId)
        .then(faqList => {
          this.faqLoading = false
          this.faqList = faqList
        })
        .catch(() => {
          this.faqLoading = false
        })
    },
    getProductSets () {
      this.setLoading = true
      this.$apiGateway.product.getSets(this.productId)
        .then((setList) => {
          // normalizedSets
          this.setList = setList.list.map(set => {
            if (set.short_title !== null) {
              const splitted = set.short_title.split('-')
              if (splitted.length === 4) {
                const productName = splitted[0].trim()
                const topicName = splitted[1].trim()
                const gradeName = splitted[2].trim()
                const setName = splitted[3].trim()
                set.short_title = productName + '-' + topicName + '-' + gradeName + '-' + setName
              } else {
                const productName = splitted[0] ? splitted[0].trim() : 'متفرقه'
                const topicName = splitted[1] ? splitted[1].trim() : 'متفرقه'
                const setName = splitted[2] ? splitted[2].trim() : 'متفرقه'
                set.short_title = productName + '-' + topicName + '-' + setName
              }

              return set
            } else {
              set.short_title = 'عنوان ندارد'
              return set
            }
          })
          this.setLoading = false
        }).catch(() => {
          this.setLoading = false
        })
    },
    onUpdateSetList (setList) {
      this.setList = setList
    }
  }
})
</script>

<style lang="scss" scoped>
$page-size-sm: map-get($sizes, "sm");

.product-info-container {
  display: flex;
  flex-direction: column;
  .selectable-product {
    .header {
      margin-bottom: $space-6;
    }
  }
  .mobile-header {
    display: none;
    @include media-max-width('md'){
      padding: $space-3 $space-7;
      background-color: $grey-1;
      display: block;
      position: fixed;
      right: 0;
      width: 100%;
      top: $space-11;
      z-index: 999;
    }
  }
  .header-info {
    margin-bottom: $space-4;
    @include media-max-width('md') {
      display: none;
    }
  }
  .sticky {
    position: sticky;
    top: 88px;
    z-index: 99;
  }
  .sections, .documents, .pamphlets {
    margin-top: $space-4;
  }
}
.product-tab-panel {
  //padding: 30px;

  @media screen and (width <= 1023px) {
    padding: 20px;
  }

  .product-description-title {
    color:#424242;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
.description {
  //height: 294px;
}
.next-steps {
  margin-top: $space-4;
  margin-bottom: $space-4;
}

.content-info {
  margin-top: $space-4;
}
</style>
