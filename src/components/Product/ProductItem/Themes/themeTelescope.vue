<template>
  <div class="theme-telescope"
       :class="localOptions.mobileTheme">
    <q-card>
      <div>
        <q-img :src="getSrc"
               :alt="product.title"
               :height="imageHeight"
               :width="imageWidth"
               class="img">
          <div class="image-container">
            <div class="product-price">
              <div class="final-price">
                {{getPrice('final')}}
                <span class="suffix">
                  {{ getSuffix() }}
                </span>
              </div>
              <div class="main-price flex">
                <div v-show="productHasDiscount"
                     class="price">
                  {{getPrice('base')}}
                  <span>{{getSuffix()}}</span>
                </div>
                <div v-show="productHasDiscount"
                     class="discount-badge">
                  <q-badge color="red">%{{product.price.discountInPercent()}}</q-badge>
                </div>
              </div>
            </div>
            <div class="product-info">
              <div class="subscription-time">
                {{product.title}}
              </div>
              <div class="features">
                <div v-for="feature in features"
                     :key="feature"
                     class="feature">
                  <q-icon name="ph:check"
                          class="icon" />
                  {{feature}}
                </div>
              </div>
            </div>
            <div class="action">
              <q-btn class="action-btn size-lg full-width"
                     :loading="cart.loading"
                     round
                     @click="addToCart">
                خرید و فعال سازی
                <q-icon name="ph:arrow-left" />
              </q-btn>
            </div>
          </div>
        </q-img>
      </div>

    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product.js'
// import LazyImg from 'src/components/lazyImg.vue'
// import Bookmark from 'src/components/Bookmark.vue'
// import ProductDiscountBadge from 'src/components/Widgets/Product/ProductDiscountBadge/ProductDiscountBadge.vue'

export default defineComponent({
  name: 'themeTelescope',
  components: {
    // ProductDiscountBadge
    // LazyImg
    // Bookmark
  },
  beforeRouteUpdate () {
    return false
  },
  props: {
    localOptions: {
      type: Object,
      default: () => {}
    },
    product: {
      type: Product,
      default: new Product()
    },
    cart: {
      type: Object,
      default: () => {}
    },
    finalPrice: {
      type: String,
      default: ''
    },
    basePrice: {
      type: String,
      default: ''
    },
    bookmarkLoading: {
      type: Boolean,
      default: false
    },
    imageWidth: {
      type: String,
      default: '100%'
    },
    imageHeight: {
      type: String,
      default: '100%'
    },
    getTeacherOfProduct: {
      type: Function,
      default: () => ''
    },
    getRoutingObject: {
      type: [String, Object, Number],
      default: null
    }
  },
  emits: ['addToCart', 'customActionClicked', 'productClicked', 'handleProductBookmark'],
  data () {
    return {
      btnTextColor: '',
      btnColor: '',
      features: [
        'دسترسی به زمان کوب صفر تا صد ها',
        'دسترسی به زمان کوب نکته و تست ها',
        'دسترسی به زمان کوب دوره های ویژه ها',
        'تخفیف های شگفت انگیز '
      ],
      productDesign: [
        { productId: 444, btnTextColor: '#FFFFFF', btnBackgroundColor: '#C2B2FF33', background: 'https://nodes.alaatv.com/upload/images/product/Group30_20250120132230.png' },
        { productId: 447, btnTextColor: '#6544E1', btnBackgroundColor: '#FFFFFF', background: 'https://nodes.alaatv.com/upload/images/product/Group31_20250120132253.png' },
        { productId: 448, btnTextColor: '#FFFFFF', btnBackgroundColor: '#C2B2FF33', background: 'https://nodes.alaatv.com/upload/images/product/Group30_20250120132308.png' }
      ]
    }
  },
  computed: {
    getSrc () {
      return this.productDesign.find(product => product.productId === this.product.id).background
    },
    productHasDiscount () {
      return this.product.price.discount > 0
    }
  },
  mounted () {
    this.btnColor = this.productDesign.find(product => product.productId === this.product.id).btnBackgroundColor
    this.btnTextColor = this.productDesign.find(product => product.productId === this.product.id).btnTextColor
  },
  methods: {
    getSuffix () {
      if (this.product.price.final / 1000000 > 1) {
        return 'میلیون‌تومان'
      }
      return 'هزارتومان'
    },
    getPrice (type) {
      return this.product.price[type].toLocaleString('de-DE').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
    },
    addToCart () {
      this.$emit('addToCart')
    }
  }
})
</script>

<style lang="scss" scoped>
$btnTextColor: v-bind('btnTextColor');
$btnColor: v-bind('btnColor');

.theme-telescope {
  height: inherit;
  font-family: MeemFaNum;

  .img {
    .image-container {
      width: 100%;
      padding: 40px ;
      background: transparent;
      .product-price {
        .final-price {
          font-weight: 700;
          font-size: 32px;
        }
        .main-price {
          .price {
            text-decoration: line-through;
          }
          .discount-badge {
            margin-left: 8px;
          }
          min-height: 26px;
          font-weight: 550;
          font-size: 16px;
          color: #C2B2FF;
        }
        .suffix {
          font-weight: 700;
          font-size: 16px;
          color: #C2B2FF;
        }
      }
      .product-info {
        height:  197px;
        padding-bottom: 22px;
        margin-top: 20px;
        .subscription-time {
          font-weight: 600;
          font-size: 24px;
        }
        .features {
          margin-top: 12px;
          .feature {
            margin-bottom: 8px;
            font-weight: 300;
            font-size: 16px;
            .icon {
              color: #FFCA28;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .action  {
        margin-top: 20px;
        .action-btn {
          color: $btnTextColor;
          background: $btnColor;
        }
      }
      @include media-max-width('sm') {
        .product-info {
          height: 210px !important;
        }
      }
      @include media-max-width('md') {
        padding: 32px;
        .product-price {
          .final-price {
            font-size: 26px;
          }
          .suffix {
            font-size: 14px;
          }
        }
        .product-info {
          height: 180px;
          margin-top: 10px;
          padding-bottom: 17px;
          .subscription-time {
            font-size: 20px;
          }
          .features {
            margin-top: 16px;
            .feature {
              font-size: 14px;
              .icon {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
