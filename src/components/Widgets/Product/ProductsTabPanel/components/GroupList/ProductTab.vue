<template>
  <div ref="productTab"
       class="tabs-wrapper"
       :style="options.tabsStyle">
    <div v-if="options.showSelectBox"
         class="select-tab">
      <q-select v-model="tab"
                label="انتخاب رشته"
                option-label="label"
                option-value="name"
                :options="tabs"
                class="select"
                @update:model-value="updateTabModel" />
    </div>
    <q-tabs v-model="tabModel"
            :active-color="options.activeColor"
            :active-bg-color="options.activeBgColor"
            :indicator-color="options.indicatorColor"
            class="product-tabs"
            @update:model-value="updateTab">
      <div v-for="(tab, index) in data"
           :key="index"
           class="flex no-wrap">
        <q-tab :name="`productTab_${index}`"
               :label="tab.options.label"
               :icon="tab.options.icon"
               class="product-tab"
               content-class="product-tab-content" />
        <q-separator v-if="index < data.length - 1"
                     class="separator"
                     vertical />
      </div>
    </q-tabs>
    <div v-if="options.showSelectBox"
         class="select-tab" />
  </div>
  <div class="tab-panels-wrapper">
    <q-tab-panels v-model="tabModel"
                  animated
                  class="product-tab-panels">
      <q-tab-panel v-for="(item, index) in data"
                   :key="index"
                   :name="`productTab_${index}`"
                   class="product-tab-panel">
        <product-panel :loading="loading"
                       :data="[item]"
                       :options="item.options" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ProductsTab',
  components: {
    ProductPanel: defineAsyncComponent(() =>
      import('../ProductPanel.vue')
    )
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'scroll'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tabModel: '',
      tabs: [],
      tab: '',
      defaultOptions: {
        options: {
          activeBgColor: '',
          activeColor: '',
          indicatorColor: '',
          layout: 'ProductTab',
          productTabColor: '#F8F4F0',
          productTabsBackground: '#F8F4F0',
          productTabsBorderRadius: '16px',
          productTabsPadding: '5px',
          productTabsBorder: null,
          tabsStyle: {
            marginTop: '',
            marginLeft: '',
            marginBottom: '',
            paddingTop: '',
            paddingLeft: '',
            paddingRight: '',
            paddingBottom: ''
          }
        },
        data: [],
        type: 'GroupList'
      }
    }
  },
  watch: {

  },
  mounted () {
    this.tabModel = 'productTab_0'
    this.data.forEach((item, index) => {
      this.tabs.push({ ...item.options, name: 'productTab_' + index })
    })
    this.tab = this.tabs[0]
  },
  methods: {
    updateTabModel () {
      this.tabModel = this.tab.name
    },
    updateTab () {
      this.tab = this.tabs.find(tab => tab.name === this.tabModel)
    },
    changeTab (tabName) {
      this.tabModel = tabName
      const el = this.$refs.productTab
      const headerOffset = 150
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    isProduct (item) {
      return item.type === 'ProductList'
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  display: flex;
  overflow-x: auto;
  justify-content: space-evenly;
  align-items: center;

  .select-tab {
    @media screen and (max-width: 1440px){
      width: 144px;
    }
    @media screen and (width < 1024px){
      display: none;
    }
    width: 207px;
    &:deep(.q-field__control) {
      &:before {
        border-radius: 32px;
        border: 1.5px solid $grey-8;
      }
    }
  }

  .product-tabs {
    display: flex;
    height: 62px;
    border: v-bind('options.productTabsBorder');
    background: v-bind('options.productTabsBackground');
    border-radius: v-bind('options.productTabsBorderRadius');
    padding: v-bind('options.productTabsPadding');

    &:deep(.q-tab--active) {
      .q-tab__content {
        .q-tab__label {
          color: v-bind('options.activeColor') !important;
        }
      }
    }

    &:deep(.q-tab--inactive) {
      .q-tab__content {
        .q-tab__label {
          color: v-bind('options.productTabColor') !important;
        }
      }
    }

    .product-tab {
      border-radius: 10px;
      width: 160px;

      @media screen and (max-width: 600px){
        width: 100%;
      }

      &:deep(.q-tab__content .q-focus-helper) {
        display: none;
      }

      &:deep(.q-tab__label) {
        @media screen and (width <= 600px){
          font-size: 16px;
        }

        font-size: 18px;
        line-height: 31px;
        text-align: center;
        font-weight: 700;
      }
    }

    .separator {
      height: 32px;
      align-self: center;

      //margin: 0 30px;
      color: $grey4;
    }
  }
}

.tab-panels-wrapper {
  .product-tab-panels {
    background: transparent;
    :deep(.q-tab-panel) {
     padding: 0;
    }
    .product-tab-panel {
      .product-panel-content {
        justify-content: space-between;
        padding: 40px 0;
        width: 100%;

        @media screen and (width <= 600px){
          padding: 0;
        }
      }
    }
  }

}
</style>
