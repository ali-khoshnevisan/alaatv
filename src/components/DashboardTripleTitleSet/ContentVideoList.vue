<template>
  <div class="video-list-container">
    <q-card v-if="!loading && doesHaveSet"
            class="video-list custom-card bg-white q-mx-md ">
      <div class="q-px-md row header">
        <q-btn v-if="!hidePrevBtn"
               flat
               square
               class=""
               icon="ph:caret-right"
               @click="previousSetClicked" />
        <div class="set-title col ">
          {{ set.title || set.short_title }}
        </div>
        <q-btn v-if="!hideNextBtn"
               flat
               square
               icon="ph:caret-left"
               class=""
               @click="nextSetClicked" />
      </div>
      <q-separator class="q-ma-md" />
      <q-scroll-area class="scroll"
                     :class="{'advisor-set': isAdvisor}"
                     :thumb-style="thumbStyle">
        <template v-if="!videoListLoading">
          <div v-for="(content,index) in set.contents.list"
               :key="index"
               ref="items"
               class="other-contents">
            <q-item v-ripple
                    clickable
                    :active="isCurrent(content.id)"
                    class="item-list"
                    @click="itemSelected(content)">
              <div class="content-show items-center">
                <div class="">
                  <q-icon v-if="content.type === 8"
                          :class="{'ph-fill': content.has_watched}"
                          :name="content.has_watched ? 'ph:check-circle' : 'ph:play-circle'"
                          :color="getIconColor(content)"
                          size="xs" />
                  <q-icon v-else
                          name="ph:book-open-text"
                          :color="isCurrent(content.id) ? 'secondary' : 'grey-8'"
                          size="xs" />
                </div>
                <div class="video-title q-pl-sm">
                  {{ content.title || content.short_title }}
                </div>
              </div>
            </q-item>
          </div>
        </template>
        <!--   v-if=      set.contents.list.length < 2 && !videoListLoading-->
        <q-item v-if="false"
                class="item-list"
                @click="itemSelected(content)">
          این مبحث گام سوم ندارد.
          <span class="item-list-last"
                @click="dialog =!dialog"> بیشتر بدانید</span>
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
        <q-item v-if="videoListLoading">
          <q-skeleton type="rect"
                      style="width: 100%;" />
        </q-item>
      </q-scroll-area>
      <q-separator v-if="!isAdvisor"
                   class="q-ma-md" />
      <q-card-section v-if="!isAdvisor"
                      class="text-center">
        <q-btn color="secondary"
               label="مشاهده سرفصل ها"
               flat
               :disable="set.loading"
               icon="ph:list-dashes"
               @click="goToSet" />
      </q-card-section>
    </q-card>
    <q-skeleton v-else
                width="100%"
                height="450px" />
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">گام سوم</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          فقط مباحث مهم و عمیق گام سوم دارن، و تشخیص این موضوع به عهده دبیران و مشاوران آموزشی آلائه، پس خیالت از این بابت راحت باشه.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup
                 label="گرفتم"
                 color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { scroll } from 'quasar'
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { Capacitor } from '@capacitor/core'
import { mixinCapacitorDownloadFile } from 'src/mixin/Mixins.js'

const {
  getScrollTarget,
  setVerticalScrollPosition
} = scroll

export default {
  name: 'ContentVideoList',
  mixins: [mixinCapacitorDownloadFile],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    isAdvisor: {
      type: Boolean,
      default: false
    },
    content: {
      type: [Content, Object],
      default: new Content()
    },
    set: {
      type: [Set, Object],
      default: new Set()
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    videoListLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    hideNextBtn: {
      type: Boolean,
      default () {
        return false
      }
    },
    hidePrevBtn: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  emits: ['contentSelected', 'nextSetClicked', 'previousSetClicked'],
  data () {
    return {
      dialog: false,
      clickedItem: new Content(),
      thumbStyle: {
        left: '2px',
        borderRadius: '1000px',
        backgroundColor: '#26A699',
        width: '6px',
        opacity: '1'
      }
    }
  },
  computed: {
    doesHaveSet () {
      return !!this.set.id
    }
  },
  watch: {
    doesHaveSet () {
      this.scrollToElement()
    }
  },
  methods: {
    getIconColor (content) {
      if (content.has_watched) {
        return 'green-4'
      }
      if (this.isCurrent(content.id)) {
        return 'main-secondary'
      }
      return 'grey-9'
      // :color="isCurrent(content.id) ? 'green4' : 'grey-8'"
    },
    goToSet () {
      const setTitleListForExpand = this.set.short_title.split('-').splice(1).join('-')
      this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.ProductPage', params: { eventName: this.$route.params.eventName, productId: this.$route.params.productId }, query: { expandTitle: setTitleListForExpand } })
    },
    itemSelected (item) {
      this.clickedItem = item
      if (item.isPamphlet()) {
        if (Capacitor.isNativePlatform()) {
          this.downloadPdfWithAxios(item.file?.pamphlet[0]?.link)
        } else {
          window.open(item.file?.pamphlet[0]?.link, '_blank')
        }
        return
      }
      this.$emit('contentSelected', item)
    },
    nextSetClicked () {
      this.$emit('nextSetClicked')
    },
    previousSetClicked () {
      this.$emit('previousSetClicked')
    },
    getContentId () {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    isCurrent (contentId) {
      return this.content.id === contentId
    },
    scrollToElement () {
      const index = this.set.contents.list.findIndex(content => content.id === this.content.id)
      this.$nextTick(() => {
        if (!this.$refs.items || !this.$refs.items[index]) {
          return
        }
        const el = this.$refs.items[index]
        const target = getScrollTarget(el)
        const offset = el.offsetTop
        const duration = 1000
        setVerticalScrollPosition(target, offset, duration)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.video-list-container {
  h6 {
    margin: 0 !important;
    font-size: 20px;
  }

  .download-section {
  }

  .video-list {
    border: 1px solid rgba(203, 209, 217, 1);
    .header {
      padding-top: 16px;
      align-items: center;
      box-shadow: none;
    }

    .main-title{
      font-size: 18px;
      color: #575962;
    }

    .set-title{
      color: rgba(66, 66, 66, 1)
    }

    .last-item-dialog {
      .last-item-dialog-card {
        width: 350px;
        height: 240px;
      }

    }

    .scroll{
      &.advisor-set {
        height: 40vh !important;
      }
      height: 266px !important;
      overflow-x: hidden;

      .other-contents{
        overflow-x: hidden;
        cursor: pointer;

        :deep(.q-item) {
          &.q-item--active {
            color: $secondary;
          }
        }

        .content-show{
          align-items: center;
          display: grid;
          grid-template-columns: 24px auto;
        }

        .content{
          border-radius: 10px;
          margin-left: 30px;
          margin-right: 42px;

          .video-title{
            font-size: 16px;
            font-weight: 400;
            color: #424242;
            width: 250px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

        }

        .current {
          background: #ffd196 12%;
        }
      }

      .item-list-last {
        color: #3e5480;
        cursor: pointer;
      }

      @media (width >= 1023px) {
        height: 80%;
      }

      @media (width <= 1023px) {
        height: 300px !important;
      }
    }
  }
}
</style>
