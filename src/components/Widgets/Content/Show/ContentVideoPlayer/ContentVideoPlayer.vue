<template>
  <div class="video-player-container">
    <template v-if="content.loading">
      <div class="video-player q-mx-md q-mb-lg">
        <q-responsive :ratio="3/2">
          <q-skeleton />
        </q-responsive>
      </div>
    </template>
    <template v-else>
      <q-card class="video-player custom-card bg-white"
              :class="options.paginate? 'q-pb-md': ''"
              :style="options.style">
        <video-player :content="content"
                      :use-advertise-banner="localOptions.hasAdvertisingBanner"
                      :advertising-banner="localOptions.advertisingBanner"
                      @time-updated="updateTime" />
        <div v-if="options.paginate"
             class="q-py-sm flex flex-center paginate">
          <q-pagination v-model="contentNumber"
                        :max="set.contents.list.length"
                        :to-fn="goToContentPage"
                        :max-pages="6"
                        direction-links
                        icon-prev="fast_rewind"
                        icon-next="fast_forward" />
        </div>
      </q-card>
    </template>
    <q-dialog v-model="orderDialog"
              class="order-details-dialog">
      <order-details-dialog :order="currentOrder"
                            :is-admin="isAdmin"
                            :show-all-unpaid-transactions="false"
                            @update-orders="onUpdateOrders" />
    </q-dialog>
    <q-dialog v-model="completeProfile"
              persistent>
      <inside-dialog>
        <template #headerAction>
          <div class="hidden" />
        </template>
        <template #header-icon>
          <badge-icon :icon="'ph:warning-circle'"
                      :color="'primary'" />
        </template>
        <template #header>
          اخطار
        </template>
        <template #body>
          برای تماشای ویدیوها، لطفا <b>موارد ستاره دار در پروفایل</b> خود را تکمیل نمایید.
        </template>
        <template #action>
          <q-btn label="رفتن به پروفایل"
                 color="primary"
                 size="md"
                 @click="goToProfile" />
        </template>
      </inside-dialog>
    </q-dialog>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { Content } from 'src/models/Content.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import VideoPlayer from 'src/components/ContentVideoPlayer.vue'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import OrderDetailsDialog from 'src/components/UserOrders/OrderDetailsDialog.vue'
import { Order } from 'src/models/Order'
import BadgeIcon from 'components/Utils/BadgeIcon.vue'

export default {
  name: 'ContentVideoPlayer',
  components: { BadgeIcon, VideoPlayer, OrderDetailsDialog, InsideDialog },
  mixins: [mixinWidget, mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: ['timeUpdated', 'videoIsWatched'],
  data () {
    return {
      content: new Content(),
      set: new Set(),
      sources: new PlayerSourceList(),
      poster: '',
      orderDialog: false,
      completeProfile: false,
      currentOrder: new Order(),
      lastSeenPercentage: 0,
      contentNumber: 1 // content order may not be continuously
    }
  },
  computed: {
    isShadUser () {
      return window.localStorage.getItem('ShadToken')
    },
    userId () {
      return this.$store.getters['Auth/user'].id
    },
    isAdmin () {
      return this.$store.getters['Auth/isAdmin']
    }
  },
  watch: {
    options (newVal, oldVal) {
      if (newVal.content.id === oldVal.content.id) {
        this.getSetByRequest()
        return
      }
      this.loadContent()
    },
    'data.id': function () {
      this.loadContent()
    }
  },
  mounted () {
    if (this.userId && !this.isShadUser) {
      this.checkProfileStatus()
    }
  },
  methods: {
    goToProfile () {
      this.$router.push({ name: 'UserPanel.Profile' })
    },
    checkProfileStatus () {
      APIGateway.user.showUser()
        .then(user => {
          this.completeProfile = user.profile_completion !== 100
        })
        .catch()
    },
    checkCanSeeContent () {
      APIGateway.user.ordersById({
        data: {
          userId: this.userId
        },
        params: {
          product_ids: [this.content.related_product.id],
          is_installment_late: 1
        }
      })
        .then(orderList => {
          if (orderList.list.length > 0 && orderList.list[0].unpaid_transaction) {
            const latedOrderIndex = orderList.list[0].unpaid_transaction.findIndex(order => order.is_late)
            if (latedOrderIndex !== -1) {
              this.currentOrder = new Order(orderList.list[0])
              this.orderDialog = true
            }
          }
        })
        .catch(() => {})
    },
    checkWatchTimePercentage (data) {
      if (this.content.completelyWatched) {
        return
      }
      const percentage = (data.currentTime / data.duration)
      if (isNaN(percentage) || percentage - this.lastSeenPercentage <= 0.1) {
        return
      }

      if (percentage >= 0.9) {
        if (!this.options.studyEventId) {
          this.videoIsWatched()
        } else {
          this.$emit('videoIsWatched')
        }
      }

      this.lastSeenPercentage = percentage
    },
    videoIsWatched () {
      return new Promise((resolve, reject) => {
        const sendData = {
          completely_watched: 1,
          watchable_id: this.content.id
        }
        APIGateway.content.setVideoWatched(sendData)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    updateTime (data) {
      // if (!this.options.studyEventId) {
      this.checkWatchTimePercentage(data)
      // }
      this.$emit('timeUpdated', data)
    },
    prefetchServerDataPromise () {
      this.content.loading = true
      return this.getContentByRequest()
    },
    prefetchServerDataPromiseThen (data) {
      this.content = new Content(data)
      if (this.content.can_see?.toString() === '3') {
        this.checkCanSeeContent()
      }
      this.poster = this.content.photo ? this.content.photo : ''
      this.setSources(this.content.file.video)
      this.getSetByRequest()
      this.content.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.content.loading = false
    },

    loadContent () {
      if (this.options.noRequestMode || (this.options.content && this.options.content.id)) {
        this.content = new Content(this.options.content)
        this.poster = this.content.photo ? this.content.photo : ''
        this.setSources(this.content.file.video)
        this.getSetByRequest()
        return
      }
      this.prefetchServerDataPromise()
        .then((content) => {
          this.prefetchServerDataPromiseThen(content)
        })
        .catch(() => {
          this.prefetchServerDataPromiseCatch()
        })
    },
    getContentIdByNumberInList (numberInList) {
      return this.set.contents.list[numberInList - 1]?.id
    },
    getContentNumberInListById (contentId) {
      return this.set.contents.list.findIndex(content => parseInt(content.id) === parseInt(contentId)) + 1
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
    getContentByRequest () {
      const contentId = this.getContentId()
      this.content.loading = true
      return APIGateway.content.show(contentId)
    },
    getSetByRequest () {
      const setId = this.content.set?.id || this.$route.params.setId
      if (!setId) {
        return
      }
      this.set.loading = true
      APIGateway.set.show(setId)
        .then((response) => {
          this.set = new Set(response)
          this.contentNumber = this.getContentNumberInListById(this.$route.params.id)
          this.set.loading = false
        })
        .catch(() => {
          this.set = new Set()
          this.set.loading = false
        })
    },
    setSources (sources) {
      this.sources = new PlayerSourceList(sources)
    },
    goToContentPage (number) {
      const id = this.getContentIdByNumberInList(number)
      if (!id) {
        return null
      }
      return {
        name: 'Public.Content.Show',
        params: { id }
      }
    },
    onUpdateOrders () {
      // this.$refs.orderList.search()
    }
  }
}
</script>

<style scoped lang="scss">
.video-player{
  border-radius: 10px;
  box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  overflow: hidden;

  .paginate {
    flex-wrap: wrap;

    :deep(.q-pagination) {
      .q-btn {
        width: 30px;
        height: 30px;
      }

      .q-pagination__content {
        .q-pagination__middle {
          display: inline-flex;
          vertical-align: middle;
        }
      }
    }

    @media screen and (width <= 400px) {
      &:deep(.q-pagination__content) {
        display: block !important;
      }
    }
  }
}
</style>
