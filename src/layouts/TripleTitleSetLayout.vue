<template>
  <div class="TripleTitleSetLayout bg-triple-title-set-panel">
    <div class="side-menu-main-layout bg-white">
      <div class="header">
        <div class="product-box">
          <div class="photo row no-wrap">
            <q-img v-if="!productLoading"
                   :src="productImg"
                   class="product-image" />
            <q-skeleton v-else
                        size="50px"
                        class="q-pb-md" />
            <div class="back-btn">
              <q-btn flat
                     icon="ph:caret-right"
                     :to="{ name: 'UserPanel.Asset.TripleTitleSet.Products' }">بازگشت</q-btn>
            </div>
          </div>
          <div class="title">
            <template v-if="productLoading">
              <q-skeleton />
            </template>
            <template v-else>
              {{ productTitle }}
            </template>
          </div>
          <div class="product-item-progress">
            <div class="progress-description">
              <div class="progress-title">
                پیشرفت دوره
              </div>
              <div class="progress-percent">
                {{ selectedProduct.contents_progress }}%
              </div>
            </div>
            <div class="progress-bar">
              <q-linear-progress reverse
                                 color="teal-4"
                                 :value="progress"
                                 class="q-mt-md" />
            </div>
          </div>
        </div>
      </div>
      <layout-menu :topics-route-array="topicsRouteArray"
                   :topic-list="topicList"
                   :selected-topic="selectedTopic"
                   :search-topics="topicRoutesSearch"
                   :product-items="productItems"
                   @show-searched-topics="showSearchedTopics"
                   @item-selected="itemSelected" />
    </div>
    <div class="container">
      <div class="header">
        <div v-if="showHamburger"
             class="drawer-btn hamburger">
          <q-btn class="toolbar-button"
                 icon="ph:list"
                 square
                 color="grey"
                 @click="toggleLeftDrawer" />
        </div>
        <div v-if="$q.screen.gt.xs"
             class="breadcrumbs flex items-center">
          <div class="product-title">
            {{ productTitle }}
            <q-skeleton v-if="productLoading"
                        type="QBadge" />
          </div>
          <q-icon v-if="!!selectedTopic"
                  name="ph:caret-left" />
          <div v-if="!!selectedTopic"
               class="set-title">{{ selectedTopic }}</div>
          <q-icon v-if="!!selectedContentTitle"
                  name="ph:caret-left" />
          <div v-if="!!selectedContentTitle"
               class="content-title">{{ selectedContentTitle }}</div>
        </div>
        <!--        <div class="back-btn">-->
        <!--          <q-btn flat-->
        <!--                 icon-right="ph:caret-left"-->
        <!--                 @click="goBack">بازگشت</q-btn>-->
        <!--        </div>-->
      </div>
      <div class="content">
        <router :include="keepAliveComponents" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Router from 'src/router/Router.vue'
import { Content } from 'src/models/Content.js'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'
import LayoutMenu from 'src/components/DashboardTripleTitleSet/LayoutMenu.vue'

export default {
  name: 'TripleTitleSetLayout',
  components: {
    Router,
    LayoutMenu
  },
  data () {
    return {
      keepAliveComponents: KeepAliveComponents,
      productItems: [
        {
          name: 'pamphlet',
          routeName: 'UserPanel.Asset.TripleTitleSet.ProductDocuments',
          label: 'جزوات'
        },
        {
          name: 'notes',
          routeName: 'UserPanel.Asset.TripleTitleSet.ProductComments',
          label: 'یادداشت ها'
        },
        {
          name: 'favoredContents',
          routeName: 'UserPanel.Asset.TripleTitleSet.ProductBookmarks',
          label: 'نشان شده ها'
        }
      ],
      clickedItem: null,
      searchText: '',
      topicsRouteArray: [
        {
          title: 'سر فصل ها',
          icon: '',
          routeName: '',
          active: false,
          show: true,
          open: true,
          children: [
            // {
            //   title: 'تایتل ست',
            //   routeName: 'UserPanel.Asset.TripleTitleSet.Products',
            //   active: false,
            //   show: true,
            //   open: false
            // }
          ]
        }
      ],
      topicRoutesSearch: []
    }
  },
  computed: {
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    topicList () {
      return this.$store.getters['TripleTitleSet/setTopicList']
    },
    setList () {
      return this.$store.getters['TripleTitleSet/setList']
    },
    progress () {
      return (this.selectedProduct?.contents_progress) / 100
    },
    selectedProduct () {
      return this.$store.getters['TripleTitleSet/selectedProduct']
    },
    selectedTopic () {
      const topic = this.$store.getters['TripleTitleSet/selectedTopic'] || ''
      if (topic.split('-').length === 2) {
        return topic.split('-')[1]
      }
      return topic
    },
    selectedContent () {
      if (!this.$route.params?.contentId) {
        return new Content()
      }
      return this.$store.getters['TripleTitleSet/selectedContent']
    },
    selectedContentTitle () {
      return this.selectedContent?.title
    },
    productTitle () {
      return this.selectedProduct?.title
    },
    productLoading () {
      return !this.selectedProduct?.title
    },
    productImg () {
      return this.selectedProduct?.photo
    },
    productId () {
      return this.selectedProduct?.id
    }
  },
  watch: {
    topicList (newValue) {
      this.fillTopicsRouteArray(newValue)
    }
  },
  methods: {
    goBack () {
      if (this.$route.name === 'UserPanel.Asset.TripleTitleSet.ProductPage') {
        this.$router.push(
          { name: 'UserPanel.Asset.TripleTitleSet.Products' }
        )
        return
      } else if (this.$route.params?.contentId) {
        this.$router.push(
          { name: 'UserPanel.Asset.TripleTitleSet.ProductPage', params: { productId: this.productId } }
        )
        return
      }
      this.$router.back()
    },
    fillTopicsRouteArray (topicList) {
      this.topicsRouteArray[0].children = []
      const root = {
        title: 'سرفصل ها',
        children: [],
        icon: '',
        routeName: '',
        active: false,
        show: true,
        open: true
      }
      topicList.forEach(topic => {
        const splitted = topic.split('-')
        if (splitted.length === 2) {
          const existingNodeIndex = root.children.findIndex(node => node.title === splitted[0])

          if (existingNodeIndex !== -1) {
            root.children[existingNodeIndex].children.push({
              title: splitted[1],
              value: splitted[1],
              children: [],
              icon: 'ph:book-open',
              active: false,
              show: true,
              open: false
            })
          } else {
            const newNode = {
              title: splitted[0],
              value: splitted[0],
              children: [{
                title: splitted[1],
                value: splitted[1],
                icon: 'ph:book-open',
                children: [],
                active: false,
                show: true,
                open: false
              }],
              active: false,
              show: true,
              open: false
            }
            root.children.push(newNode)
          }
        } else {
          const newNode = {
            title: topic,
            value: topic,
            children: [],
            icon: 'ph:book-open',
            active: false,
            show: true,
            open: false
          }
          root.children.push(newNode)
        }
      })
      //
      this.topicsRouteArray[0] = root
      this.topicRoutesSearch = JSON.parse(JSON.stringify(this.topicsRouteArray))
    },
    showSearchedTopics (list) {
      if (!list) {
        this.topicsRouteArray = JSON.parse(JSON.stringify(this.topicRoutesSearch))
        return
      }
      this.topicsRouteArray[0].children = list
    },
    itemSelected (topic) {
    },
    updateSetList (normalizedSets) {
      this.setList = normalizedSets
    },
    updateTopicList (topicList) {
      this.topicList = topicList
    },
    ...mapMutations('AppLayout', [
      'updateLayoutLeftDrawerVisible'
    ]),
    toggleLeftDrawer () {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      // if (typeof window.zebline.user !== 'undefined') {
      //   window.zebline.user.logout()
      // }
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.TripleTitleSetLayout {
  display: grid;
  grid-template-columns: 466px auto;

  @media screen and (width <= 1024px) {
    grid-template-columns: auto;
  }

  .side-menu-main-layout {
    border: 1px solid #CBD1D9;
    padding: 40px 56px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    //height: calc(100vh - 64px);
    width: 466px;
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    color: #333;

    .back-btn {
      text-align: end;
      cursor: pointer;

      .alaa-logo {
        width: 50px;
      }

      .logo-image {
        text-align: left;

        .q-img__container {
        }
      }
    }

    .header {
      //display: grid;
      //grid-template-columns: auto auto;
      padding-left: 16px;

      .product-box {
        margin-bottom: 20px;

        .photo {
          justify-content: space-between;
          height: 100px;
          margin-bottom: 10px;

          :deep(.q-img) {
            width: 100px;
            border-radius: 10px;
          }
        }

        .title {
          font-weight: 600;
          font-size: 20px;
          line-height: 36px;
        }

        .product-item-progress {
          padding-right: 16px;
          margin-top: 16px;
          .progress-description {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .progress-title {
              color: #424242;
              font-size: 12px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.24px;
            }

            .progress-percent {
              color:#424242;
              font-size: 12px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.24px;
            }
          }
        }
      }

      .back-btn {
        //position: absolute;
        //top: 100px;
        //left: 400px;
      }
    }

    .side-menu-body {
      height: calc(100vh - 200px);
      overflow-x: hidden;
      overflow-y: auto;

      .q-list {
        padding: 0;

        &.side-menu-list {
          .search-input {
            margin-bottom: 30px;
          }

          margin: 0 24px 109px;

          .menu-item-btn {
            :deep(.q-btn__content) {
              width: 100%;
              display: grid;
              grid-template-columns: auto auto auto;

              //width: 100%;
              padding: 5px 10px;
              justify-content: normal;

              .label {
                font-size: 16px;
                font-weight: 400;
                line-height: 28px;
              }
            }
          }

          @media screen and (width <= 1919px) {
            margin: 0 24px 34px;
          }

          @media screen and (width <= 1439px) {
            margin: 0 21px 26px;
          }

          @media screen and (width <= 599px) {
            margin: 0 18px 8px;
          }

          .top-separator {
            margin: 0 40px 32px;

            @media screen and (width <= 1919px) {
              margin: 0 30px 25px;
            }

            @media screen and (width <= 1439px) {
              margin: 0 45px 22px;
            }
          }

          .q-item {
            padding: 0;
            min-height: 0;
          }
        }
      }

      .log-out {
        align-self: end;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        height: 40px !important;

        //width: 232px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        padding: 0 14px 0 10px;
        margin: 0 0 36px 27px;

        @media screen and (width <= 1439px) {
          margin: 0 31px 33px;
        }

        @media screen and (width <= 599px) {
          margin: 0 30px 30px;

          //padding: 0 0 0 10px;
        }

        &:hover {
          background-color: rgb(255 255 255 / 10%);
        }

        .q-avatar {
          height: 22px;
          width: 22px;
          margin-right: 12px;
          transform: matrix(-1, 0, 0, 1, 0, 0);
        }
      }
    }

    &:deep(.side-menu-main-layout) {
      .q-expansion-item__container {
        .q-icon {
          font-size: 21px;
        }
      }
    }

    @media screen and (width <= 1024px) {
      display: none;
    }
  }

  .container {
    //justify-self: center;
    border-top: 1px solid #CBD1D9;
    .header {
      padding-right: 20px;
      padding-left: 20px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      margin: 32px 0;

      @media screen and (width <= 1024px) {
        margin: 0;
        display: grid;
        grid-template-columns: 40px 1fr auto;
      }

      .breadcrumbs {
        @media screen and (width <= 1024px) {
          justify-self: self-start;
          padding-left: 10px;
        }
      }
    }

    .content {
      //height: calc(100vh - 124px);
      //overflow-x: scroll;
    }
  }
}
</style>
