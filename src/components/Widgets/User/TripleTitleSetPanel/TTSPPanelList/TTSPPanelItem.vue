<template>
  <q-card v-if="loading">
    <q-skeleton height="150"
                class="q-mb-sm" />
  </q-card>
  <router-link v-else
               :to="route">
    <div class="ttsp-panel-item"
         @mouseenter="showMobileImage"
         @mouseleave="showDesktopImage">
      <div class="ttsp-panel-item__image">
        <lazy-img :src="src" />
      </div>
      <!--      <div class="ttsp-panel-item__title">{{ item.title }}</div>-->
    </div>
  </router-link>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'TTSPPanel',
  components: { LazyImg },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          id: null,
          name: null,
          title: null,
          logo: null,
          desktopImg: '',
          mobileImg: '',
          study_plan: {
            category_id: null,
            first_pamphlet: true,
            educational_layers: []
          },
          showDashboardIfHasPurchased: false,
          showStudyPlanIfHasPurchased: false,
          showDashboard: false,
          showStudyPlan: false
        }
      }
    }
  },
  data () {
    return {
      src: null,
      route: { path: null },
      loading: false
    }
  },
  mounted () {
    this.getRouteObject()
    this.src = this.$q.screen.gt.sm ? this.item.logo.desktop : this.item.logo.mobile
  },
  methods: {
    showMobileImage () {
      this.src = this.item.logo.mobile
    },
    showDesktopImage () {
      this.src = this.item.logo.desktop
    },
    checkHasPurchased () {
      this.loading = true
      return new Promise((resolve, reject) => {
        APIGateway.events.checkHasPurchased(this.item.id)
          .then(purchasedProducts => {
            this.loading = false
            if (purchasedProducts.length > 0) {
              resolve(purchasedProducts)
            } else {
              reject()
            }
          })
          .catch(() => {
            this.loading = false
            reject()
          })
      })
    },
    getRouteObject () {
      if (this.item.route) {
        this.route = this.item.route
        return
      }
      if (this.item.name === 'abrisham') {
        this.route = { name: 'UserPanel.Asset.Abrisham.Progress' }
        return
      }
      const dashboardRoute = { name: 'UserPanel.Asset.TripleTitleSet.Dashboard', params: { eventName: this.item.name } }
      const productsRoute = { name: 'UserPanel.Asset.TripleTitleSet.Products', params: { eventName: this.item.name } }
      const user = this.$store.getters['Auth/user']
      const isAdmin = user.hasPermission('insertStudyPlan') || user.hasPermission('updateStudyPlan') || user.hasPermission('deleteStudyPlan')
      if (isAdmin || this.item.showDashboard) {
        this.route = dashboardRoute
        return
      }
      if (this.item.showDashboardIfHasPurchased) {
        this.checkHasPurchased()
          .then(() => {
            this.route = dashboardRoute
          })
          .catch(() => {
            this.route = productsRoute
          })
        return
      }
      this.route = productsRoute
    }
  }
}
</script>

<style lang="scss" scoped>
.ttsp-panel-item {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  &__image {
    //width: 60%;
    //padding: $spacing-none $space-1;
    //margin-bottom: $space-6;
    //margin-top: $space-6;
    :deep(*) {
      width: 100%;
    }
  }
  &__title {
    color: $grey-9;
    @include body1;
    text-align: center;
    margin-bottom: $space-3;
  }
  &:hover {
    transform: translateY(-5px);
    //box-shadow: $shadow-6;
  }
}
</style>
