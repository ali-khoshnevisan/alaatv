import { User } from 'src/models/User.js'
import { Event } from 'src/models/Event.js'
import { Content } from 'src/models/Content.js'
import { StudyPlanInfo } from 'src/models/StudyPlanInfo'
import { APIGateway } from 'src/api/APIGateway.js'

const mixinTripleTitleSet = {
  data () {
    return {
      mounted: false,
      dialog: false,
      loading: false,
      user: new User(),
      event: new Event(),
      isUserLogin: false,
      studyPlanId: null,
      studyPlanInfo: new StudyPlanInfo()
    }
  },
  mounted () {
    this.mounted = true
    this.updateLeftDrawer()
    this.$bus.on('onLoggedIn', () => {
      this.$store.commit('AppLayout/updateLoginDialog', false)
      this.setEvent()
    })
    this.loadAuthData()
    if (this.isUserLogin) {
      setTimeout(() => {
        this.setEvent()
      }, 500)
    }
  },
  methods: {
    checkHasPurchased () {
      return new Promise((resolve, reject) => {
        APIGateway.events.checkHasPurchased(this.event.id)
          .then(purchasedProducts => {
            if (purchasedProducts.length > 0) {
              resolve(purchasedProducts)
              return
            }
            reject()
          })
          .catch(() => {
            reject()
          })
      })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    onToggleDialog () {
      this.dialog = !this.dialog
    },
    onConfirmChangeStudyPlan () {
      this.getMyStudyPlan()
    },
    afterSetEvent () {},
    getMyStudyPlan (withoutResponseMessage = false) {
      this.loading = true
      let sendData = {}
      if (withoutResponseMessage) {
        sendData = {
          event_id: this.event.id,
          withoutResponseMessage
        }
      } else {
        sendData = {
          event_id: this.event.id
        }
      }
      return new Promise((resolve, reject) => {
        APIGateway.studyPlan.getMyStudyPlan(sendData)
          .then(studyPlanInfo => {
            if (!studyPlanInfo || !studyPlanInfo.id) {
              this.dialog = true
            } else {
              this.studyPlanInfo = new StudyPlanInfo(studyPlanInfo)
              this.studyPlanId = studyPlanInfo.id
            }
            this.loading = false
            resolve()
          })
          .catch(() => {
            // this.$router.push({ name: 'Public.Home' })
            // this.$q.notify({
            //   message: 'بارگذاری داشبورد با مشکل روبرو شده است، لطفا دوباره تلاش کنید',
            //   color: 'warning',
            //   position: 'top'
            // })
            this.loading = false
            reject()
          })
      })
    },
    setEvent () {
      if (!this.$route.params.eventName) {
        return
      }
      // if (this.$route.name === 'UserPanel.Asset.TripleTitleSet.Content') {
      //   return
      // }
      this.$store.dispatch('loading/overlayLoading', true)
      APIGateway.events.index()
        .then(eventList => {
          this.event = eventList.list.find(eventItem => eventItem.name === this.$route.params.eventName)
          this.$store.dispatch('loading/overlayLoading', false)
          if (this.event) {
            this.afterSetEvent()
            return
          }
          this.$q.notify({
            type: 'negative',
            message: 'رویداد یافت نشد'
          })
          this.$router.push({ name: 'Public.Home' })
        })
        .catch(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
      // APIGateway.events.getEventInfoByName(this.$route.params.eventName)
      //   .then(event => {
      //     this.$store.dispatch('loading/overlayLoading', false)
      //     this.event = new Event(JSON.parse(JSON.stringify(event)))
      //     this.afterSetEvent()
      //   })
      //   .catch(() => {
      //     // this.$router.push({ name: 'NotFound' })
      //     this.$store.dispatch('loading/overlayLoading', false)
      //     this.$q.notify({
      //       type: 'negative',
      //       message: 'رویداد یافت نشد'
      //     })
      //     this.$router.push({ name: 'Public.Home' })
      //   })
    },
    syncwatchingContentWithContentInList () {
      const targetContentIndex = this.contents.list.indexOf(item => item.id === this.watchingContent.id)
      if (!targetContentIndex) {
        return false
      }

      this.contents.list[targetContentIndex] = new Content(this.watchingContent)
    },
    toggleFavor (value) {
      this.watchingContent.is_favored = value
    },
    async setFavored () {
      try {
        await this.$apiGateway.content.favored(this.watchingContent.id)
        this.watchingContent.is_favored = true
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async setUnfavored () {
      try {
        await this.$apiGateway.content.unfavored(this.watchingContent.id)
        this.watchingContent.is_favored = false
        this.watchingContent.loading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.watchingContent.loading = false
      }
    },
    async updateComment (comment) {
      try {
        this.commentLoading = true
        const updateCommentResponse = await this.$apiGateway.content.updateComment({
          id: this.watchingContent.comments[0].id,
          data: {
            comment,
            _method: 'PUT'
          }
        })
        this.watchingContent.comments[0].comment = updateCommentResponse.comment
        this.comment = this.watchingContent.comments[0].comment
        this.commentLoading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.commentLoading = false
      }
    },
    async saveNewComment (comment) {
      try {
        this.commentLoading = true
        const savedComment = await this.$apiGateway.content.saveComment({
          commentable_id: this.watchingContent.id,
          commentable_type: 'content',
          comment
        })
        this.watchingContent.comments.push({
          id: savedComment.id,
          comment: savedComment.comment
        })
        this.comment = this.watchingContent.comments[0].comment
        this.commentLoading = false
        this.syncwatchingContentWithContentInList()
      } catch {
        this.commentLoading = false
      }
    },
    saveComment (comment) {
      this.watchingContent.comments[0] ? this.updateComment(comment) : this.saveNewComment(comment)
    },
    async bookmarkPostIsFavored (timeStampData) {
      try {
        let postStatus = 'unfavored'
        if (timeStampData.isFavored) {
          postStatus = 'favored'
        }
        await this.$apiGateway.content.setBookmarkTimepointFavoredStatus({
          id: parseInt(timeStampData.id),
          status: postStatus
        })
        this.watchingContent.timepoints.list.forEach(item => {
          if (parseInt(item.id) === parseInt(timeStampData.id)) {
            item.loading = false
            if (postStatus === 'favored') {
              this.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = true
            } else if (postStatus === 'unfavored') {
              this.watchingContent.timepoints.list[timeStampData.numberOfTimestamp].isFavored = false
            }
          }
        })

        this.syncwatchingContentWithContentInList()
      } catch {
      }
    },
    updateLeftDrawer () {
      if (!this.mounted) {
        return
      }
      this.isDesktop = !this.$q.screen.lt.md
      const isIframe = window.self !== window.top
      if (this.$q.screen.gt.sm && !isIframe) {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 100)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
      } else {
        this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 250)
        this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
        if (this.isEwanoUser) {
          setTimeout(() => {
            this.$store.commit('AppLayout/updateLayoutLeftDrawerWidth', 350)
            this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
          }, 10)
        }
      }
    }
  }
}

export default mixinTripleTitleSet
