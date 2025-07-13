<template>
  <div ref="videoPlayerWrapper"
       class="vPlayer">
    <video-player v-if="content.photo && content.isVideo() && content.hasVideoSource() && content.can_see?.toString() !== '0'"
                  ref="videoPlayer"
                  :key="playerKey"
                  :source="content.getVideoSource()"
                  :contentId="content.id"
                  :contentTitle="content.title"
                  :poster="content.photo"
                  :over-player="hasTimepoint"
                  :over-player-width="'250px'"
                  :subtitle="content.subtitle_file"
                  :vast="content.vast"
                  :has-vast="canInitVAST && contentHasVast"
                  :use-over-player="hasTimepoint"
                  :use-advertise-banner="useAdvertiseBanner"
                  @time-updated="updateTime"
                  @adStarted="adStarted">
      <template #overPlayer>
        <div class="timepoint-list">
          <q-banner class="timepoint-list-title">
            <span class="title">
              زمانکوب ها
              ({{ currentContent.timepoints.list.length }})
            </span>
          </q-banner>
          <q-list class="timepoint-list-items">
            <q-item v-for="timepoint in currentContent.timepoints.list"
                    :key="timepoint.id"
                    v-ripple
                    clickable
                    @click="goToTimpoint(timepoint)">
              <!--              <q-item-section avatar>-->
              <!--              </q-item-section>-->
              <q-item-section class="text-section">
                <bookmark :is-favored="timepoint.is_favored"
                          :loading="timepoint.loading"
                          :class-name="'size-lg'"
                          :flat="true"
                          @clicked="handleTimepointBookmark(timepoint.id)" />
                <span>{{ timepoint.title }}</span>
                <span v-if="currentContent.can_user_use_timepoint">
                  {{ timepoint.formattedTime() }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
      <template #advertisingBanner>
        <div class="advertising-banner">
          <image-widget :options="advertisingBanner" />
        </div>
      </template>
      <template #inWatchingBanner>
        <div v-if="inWatchingBanner?.photo_file"
             class="advertising-banner">
          <q-img :src="inWatchingBanner.photo_file" />
        </div>
      </template>
    </video-player>
    <div v-else>
      <q-card class="flex justify-center items-center">
        <q-img v-if="content.photo"
               :src="content.photo" />
        <div v-else
             class="flex justify-center items-center"
             style="height: 420px; justify-content: center">
          ویدیویی وجود ندارد!
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { createMetaMixin } from 'quasar'
import { Content } from 'src/models/Content.js'
import { mixinAuth } from 'src/mixin/Mixins.js'
import Bookmark from 'src/components/Bookmark.vue'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import ContentManager from 'src/assets/js/ContentManager.js'
import TimeElapsedSinceLastEvent from 'src/assets/js/TimeElapsedSinceLastEvent.js'
import ImageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'
import SeoMeta from 'src/assets/js/SeoMeta.js'

export default {
  name: 'ContentVideoPlayer',
  components: { VideoPlayer, Bookmark, ImageWidget },
  mixins: [mixinAuth, createMetaMixin(function () {
    const title = this.content.title + '-' + this.content.author.first_name + ' ' + this.content.author.last_name
    const description = this.content.description
    const robots = this.$store.getters['SEO/robots']
    const ogTitle = this.content.title + '-' + this.content.author.first_name + ' ' + this.content.author.last_name
    const keyWords = this.content.meta_keywords ? this.content.meta_keywords.join(', ') : ''
    const ogUrl = ''
    const ogDescription = this.content.description
    const ogImage = ''

    return SeoMeta.getMixin({
      title,
      description,
      robots,
      ogTitle,
      keyWords,
      ogUrl,
      ogDescription,
      ogImage
    })
  })
  ],
  props: {
    content: {
      type: Content
    },
    showTimePoints: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String,
      default () {
        return ''
      }
    },
    useAdvertiseBanner: {
      type: Boolean,
      default: false
    },
    advertisingBanner: {
      type: Object
    },
    keepCalculating: {
      type: Boolean,
      default () {
        return true
      }
    },
    currentTimed: {
      type: Number
    }
  },
  emits: ['seeked', 'timeUpdated'],
  data () {
    return {
      inWatchingBanner: null,
      canInitVAST: false,
      playerKey: Date.now(),
      currentContent: new Content()
    }
  },
  computed: {
    contentHasVast () {
      return this.content.has_vast
    },
    hasTimepoint () {
      return this.content.timepoints.list.length > 0
    }
  },
  watch: {
    content: {
      handler (newVal) {
        this.playerKey = Date.now()
        this.currentContent = newVal
        if (!this.currentContent.can_user_use_timepoint) {
          this.currentContent.timepoints.removeAllTimes()
        }
      },
      immediate: true,
      deep: true
    }
  },
  beforeUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  },
  beforeMount () {
    this.canInitVAST = TimeElapsedSinceLastEvent.canInitVAST()
  },
  methods: {
    setInWatchingBanner (currentTime) {
      const bannerData = this.content.in_watching_banners.find(banner => banner.end >= currentTime && currentTime >= banner.start)
      if (JSON.stringify(bannerData) !== JSON.stringify(this.inWatchingBanner)) {
        this.inWatchingBanner = bannerData
      }
    },
    updateTime (data) {
      this.$emit('timeUpdated', data)
      if (this.isUserLogin && data.currentTime >= 1) {
        ContentManager.checkAndStoreContent({
          id: this.content.id,
          sent: 0,
          set_id: this.content?.set?.id,
          duration: data.duration,
          watched_seconds: data.currentTime,
          lastWatchedDate: Date.now()
        })
      }
      if (this.content.in_watching_banners.length > 0) {
        this.setInWatchingBanner(data.currentTime)
      }
    },
    adStarted () {
      TimeElapsedSinceLastEvent.setEventOccurrenceTime()
    },
    getCurrentContentTimepoint (timepointId) {
      return this.currentContent.timepoints.list.find(item => item.id === timepointId)
    },
    handleTimepointBookmark (timepointId) {
      const timepointIndex = this.currentContent.timepoints.list.findIndex(item => item.id === timepointId)
      const currentContentTimepoint = this.getCurrentContentTimepoint(timepointId)
      this.currentContent.timepoints.list[timepointIndex].loading = true
      const isFavoredStatus = currentContentTimepoint.is_favored ? 'unfavored' : 'favored'
      this.changeTimepointStatus({
        timepointId,
        isFavoredStatus,
        timepointIndex,
        currentContentTimepoint
      })
    },
    changeTimepointStatus (data) {
      this.$apiGateway.content.setBookmarkTimepointFavoredStatus({
        id: data.timepointId,
        status: data.isFavoredStatus
      })
        .then(() => {
          this.currentContent.timepoints.list[data.timepointIndex].is_favored = !data.currentContentTimepoint.is_favored
          this.toggleFavorite(this.content.id)
          this.currentContent.timepoints.list[data.timepointIndex].loading = false
        })
        .catch(() => {
          this.currentContent.timepoints.list[data.timepointIndex].loading = false
        })
    },
    goToTimpoint (timepoint) {
      if (!this.$refs.videoPlayer) {
        return
      }
      if (!this.currentContent.can_user_use_timepoint) {
        this.$refs.videoPlayer.toggleFullScreen()
        this.$q.dialog({
          title: 'استفاده از زمان کوب',
          message: 'جهت استفاده از زمان کوب می بایست اشتراک خریداری کنید.',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$router.push({ name: 'Public.Landing.DynamicName', params: { landing_name: 'timepoint' } })
        }).onCancel(() => {
          // this.$router.push({ name: 'Public.Home' })
        })
        return
      }
      this.$refs.videoPlayer.changeCurrentTime(timepoint.time)
    },
    activate (time) {
      this.player.currentTime(time)
      this.player.play()
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
    },
    setSources () {
      this.options.sources = this.source
    },
    setPoster () {
      this.options.poster = this.poster
    },
    reInitVideo () {
      this.player.src(this.source)
      this.player.poster(this.poster)
    },
    toggleFavorite (id) {
      const that = this
      let count = -1
      // let currentTimepointIndex = null
      this.timePoints.forEach(function (item) {
        count++
        if (parseInt(item.id) === parseInt(id)) {
          // currentTimepointIndex = index
          item.loading = true
          item.is_favored = !item.is_favored
          that.postIsFavored = {
            id: item.id,
            isFavored: item.is_favored,
            numberOfTimestamp: count
          }
        }
      })
      const requiredElement = document.querySelector('.video-js')
      requiredElement.focus()
      this.$emit('toggleBookmark', this.postIsFavored)
      // setTimeout(function() { that.timePoints[currentTimepointIndex].loading = false }, 200) // vue/no-mutating-props
    },
    // postIsFavored(timeStampData){
    //     var postStatus = 'unfavored'
    //     if (timeStampData.isFavored){
    //         postStatus = 'favored'
    //     }
    //     // /api/v2/timepoint/{timepoint_id}/favored
    //     axios.post('/api/v2/c/timepoint/' + parseInt(timeStampData.id) + '/'+ postStatus)
    //         .then(response => {
    //             if (response.status === 200){
    //                 this.timePoints.forEach( function (item) {
    //                     if (parseInt(item.id) === parseInt(timeStampData.id)) {
    //                         item.loading = false
    //                     }
    //                 })
    //             }
    //         })
    //         .catch(err => console.error(err));
    // },
    calcWatchedPercentage (currentTime, duration) {
      const watchedPercentage = ((currentTime / duration) * 100)
      const videoPlayerTimeData = {
        currentTime,
        duration,
        watchedPercentage
      }
      this.$emit('calcTimeData', videoPlayerTimeData)
    },
    videoStatus (val) {
      this.videoIsPlaying = val
    }
  }
}
</script>

<style scoped lang="scss">
.vPlayer {
  width: 100%;

  .timepoint-list {
    font-family: IRANSansXFaNum;
    direction: ltr;
    width: 100%;
    color: white;
    height: 100%;
    padding-bottom: 30px;
    background: rgba(0 0 0 / 56%);
    border-radius: 8px;

    .timepoint-list-title {
      text-align: center;
      background: transparent;
      .title {
        font-size: 16px;
        font-weight: 600;
      }
    }

    .timepoint-list-items {
      .text-section {
        line-height: 22px;
        display: flex;
        flex-flow: row;
        font-size: 16px;
        font-weight: 400;
        align-items: center;
        justify-content: space-evenly;
      }
    }

    :deep(.q-list) {
      height: calc(100% - 54px);
      overflow: auto;

      .bookmark-btn.q-btn {
        //width: 25px !important;
        height: 20px !important;
        padding: 0;
        //font-size: 25px !important;
        color: #fff !important;

        .q-btn__content {
          margin: 3px;

          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }

  .advertising-banner {
  }
}
</style>
