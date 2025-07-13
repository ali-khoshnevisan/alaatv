<template>
  <q-list class="side-menu-list"
          padding>
    <q-item class="menu-item top-search"
            :class="{'show-hamburger': showHamburger}">
      <div v-if="showHamburger"
           class="drawer-btn hamburger">
        <q-btn icon="ph:list"
               flat
               square
               @click="toggleLeftDrawer" />
      </div>
      <q-select v-model="searchValue"
                filled
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="options"
                class="search no-title"
                placeholder="جستجو در محتوا"
                @update:model-value="search"
                @filter="filterFn">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-if="searchText"
                  v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              نتیجه ای یافت نشد!
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-item>
    <template v-if="!productLoading && !setListLoading && topicList.length > 0">
      <menu-item :key="menuKey"
                 :items="topicsRouteArray"
                 :show-child-item-tooltip="true"
                 @item-selected="itemSelected" />
      <q-item v-for="(item, index) in productItems"
              :key="index"
              :active="item.routeName === $route.name || item.name === selectedTopic"
              class="menu-item"
              :to="(item.routeName) ? { name: item.routeName, params: item.params } : null"
              exact>
        <q-item-section>
          {{item.label}}
        </q-item-section>
      </q-item>
    </template>
    <template v-else>
      <q-item v-for="item in 4"
              :key="item"
              class="menu-item">
        <q-skeleton type="text"
                    class="full-width" />
      </q-item>
    </template>
  </q-list>
</template>

<script>
import menuItem from 'src/components/Menu/SideMenu/MenuItem.vue'
import mixinEwano from 'src/components/Widgets/Ewano/mixinEwano.js'

export default {
  name: 'LayoutMenu',
  components: { menuItem },
  mixins: [mixinEwano],
  props: {
    productItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    topicsRouteArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchTopics: {
      type: Array,
      default: () => {
        return []
      }
    },
    topicList: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectedTopic: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  emits: ['itemSelected', 'showSearchedTopics'],
  data () {
    return {
      searchOptions: [],
      options: [],
      menuKey: 0,
      searchText: '',
      searchValue: '',
      clickedProductItem: ''
    }
  },
  computed: {
    setList () {
      return this.$store.getters['TripleTitleSet/setList']
    },
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    layoutLeftDrawerVisible () {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    setListLoading () {
      return this.$store.getters['TripleTitleSet/setListLoading']
    },
    productLoading () {
      return this.$store.getters['TripleTitleSet/productLoading']
    }
  },
  watch: {
    topicList () {
      this.menuKey++
    },
    setList () {
      if (this.$route.query && this.$route.query.expandTitle) {
        this.search(this.$route.query.expandTitle.split('-'))
      }
    }
  },
  mounted () {
    this.fillSearchOptions()
    this.$bus.on('itemSelected', (item) => this.itemSelected(item))
  },
  methods: {
    fillSearchOptions () {
      this.searchOptions = this.$store.getters['TripleTitleSet/setSearchList']
    },
    filterFn (val, update) {
      this.searchText = val
      const backupOptions = this.$store.getters['TripleTitleSet/setSearchList']
      if (val === '') {
        this.options = []
        update(() => {
          this.searchOptions = this.$store.getters['TripleTitleSet/setSearchList']
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.searchOptions = backupOptions.filter((v) => {
          return v.toString().toLowerCase().indexOf(needle) > -1
        })
      })
      this.options = this.searchOptions
    },
    toggleLeftDrawer () {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', !this.layoutLeftDrawerVisible)
    },
    itemSelected (topic) {
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
          }, 100)
        }
      }
      if (!this.$route.params.productId) {
        return
      }
      this.$emit('itemSelected', topic)
      this.$store.commit('TripleTitleSet/updateSelectedTopic', topic.title)
      this.$router.push({
        name: 'UserPanel.Asset.TripleTitleSet.ProductPage',
        params: {
          productId: this.$route.params.productId
        }
      })
    },
    deepSearch (array, title) {
      if (!title) {
        return null
      }
      let matches = {}

      function search (array) {
        for (const item of array) {
          if (item.title === title) {
            matches = item
          } else if (item.children && item.children.length > 0) {
            search(item.children)
          }
        }
      }

      search(array)
      return matches
    },
    search (list, parentContain = false) {
      const searchItems = this.searchValue ? this.searchValue.split('-') : list
      let topicTitle
      if (searchItems.length === 2) {
        topicTitle = searchItems[0]
        this.expandFianlSet(searchItems[1])
      } else {
        topicTitle = searchItems[1]
        this.expandFianlSet(searchItems[2])
      }
      const topic = this.deepSearch(this.searchTopics, topicTitle.trim())
      this.itemSelected(topic)

      // context.commit('updateSetList', normalizedSets)
      // this.$emit('showSearchedTopics', this.deepSearch(list[0].children, this.searchText))
      // if (!list || list.length === 0) {
      //   return false
      // }
      // if (parentContain) {
      //   return true
      // }
      // let flag = false
      // list.forEach(item => {
      //   const contain = item.title.includes(this.searchText)
      //   if (this.search(item.children, contain) || contain) {
      //     flag = true
      //     item.show = true
      //     item.open = true
      //   } else {
      //     item.open = false
      //     item.show = false
      //   }
      // })
      // return flag
    },
    expandFianlSet (setTitle) {
      const setList = this.$store.getters['TripleTitleSet/setList']
      setList.find(set => set.short_title.includes(setTitle.trim())).expand = true
      this.$store.commit('updateTopicList', setList)
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style scoped lang="scss">
.q-list {
  padding: 0;
  height: calc(100vh - 200px);
  &.side-menu-list {
    :deep(.menu-item) {
      .search {
        width: 100%;
      }
      .q-expansion-item {
        margin-left: 0;
        box-shadow: none;
        .q-expansion-item__container {
          .q-item {
            padding-top: $space-2;
            padding-bottom: $space-2;
            min-height: $space-9;
            border-radius: $radius-none;
          }
          .q-expansion-item__content {
            padding-left: 0;
            padding-right: 0;
            .expansion-body {
              & > .q-separator {
                display: none;
              }
              & > .q-list {
                .q-item {
                  //margin-left: $space-1;
                }
              }
            }
          }
        }
      }
    }

    & > .q-item {
      :deep(.q-btn) {
        padding: 0;
        .q-btn__content {
          padding-left: $space-1;
          padding-right: $space-1;
          display: flex;
        }
      }
    }
  }
}
</style>
