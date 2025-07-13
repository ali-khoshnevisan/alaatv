<template>
  <div v-if="localOptions.justImage && showImage"
       class="overlay-image"
       @click="closeOverlayImage">
    <image-widget :options="localOptions.imageOptions" />
  </div>
  <q-dialog v-model="dialog"
            :persistent="localOptions.persistent">
    <q-card class="InsideDialog">
      <q-card-section v-if="localOptions.hasHeader"
                      class="InsideDialog__header">
        <div class="InsideDialog__header-content">
          <div v-if="localOptions.headerIcon"
               class="InsideDialog__header-icon">
            <q-icon :name="localOptions.headerIcon"
                    color="primary" />
          </div>
          <div class="InsideDialog__header-title">
            <div class="row">
              <div v-for="(component, index) in localOptions.headerWidgets"
                   :key="index">
                <component :is="component.name"
                           :options="component.options" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="localOptions.closeButton"
             class="headerAction">
          <q-btn v-close-popup
                 flat
                 icon="ph:x"
                 square
                 color="grey"
                 class="size-xs" />
        </div>

      </q-card-section>
      <q-separator />
      <div class="InsideDialog__scroll-area">
        <q-card-section v-if="localOptions.justImage"
                        class="InsideDialog__image">
          <q-img :src="localOptions.image" />
        </q-card-section>
        <q-card-section v-if="localOptions.hasBody"
                        class="InsideDialog__body">
          <div class="row">
            <div v-for="(component, index) in localOptions.bodyWidgets"
                 :key="index"
                 class="col-12">
              <component :is="component.name"
                         :options="component.options" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions v-if="localOptions.hasAction"
                        class="InsideDialog__action">
          <div v-for="(component, index) in localOptions.actionWidgets"
               :key="index"
               class="row">
            <component :is="component.name"
                       :options="component.options" />
          </div>
        </q-card-actions>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import Separator from 'src/components/Widgets/Separator/Separator.vue'
import ImageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'
import ActionButton from 'components/Widgets/ActionButton/ActionButton.vue'

export default defineComponent({
  name: 'PopupWidget',
  components: {
    Separator,
    TextWidget,
    ImageWidget,
    ActionButton
  },
  mixins: [mixinWidget],
  data () {
    return {
      windowWidth: 0,
      dialog: false,
      showImage: false,
      defaultOptions: {
        eventName: 'openPopup',
        refresh: null,
        once: true,
        persistent: false,
        closeButton: false,
        immediate: false,
        hasHeader: false,
        hasBody: false,
        hasAction: false,
        headerIcon: null,
        justImage: false,
        image: '',
        bodyWidgets: [],
        actionWidgets: [],
        headerWidgets: [],
        xs: {
          bodyWidgets: [],
          actionWidgets: [],
          headerWidgets: []
        },
        sm: {
          bodyWidgets: [],
          actionWidgets: [],
          headerWidgets: []
        },
        md: {
          bodyWidgets: [],
          actionWidgets: [],
          headerWidgets: []
        },
        lg: {
          bodyWidgets: [],
          actionWidgets: [],
          headerWidgets: []
        },
        xl: {
          bodyWidgets: [],
          actionWidgets: [],
          headerWidgets: []
        }
      }
    }
  },
  mounted () {
    this.$bus.on(this.localOptions.eventName, () => {
      this.openDialog()
    })
    if (this.localOptions.immediate) {
      this.openDialog()
    }
  },
  methods: {
    closeOverlayImage () {
      this.showImage = false
    },
    openDialog () {
      const popupOpened = localStorage.getItem(`popUpWidgetDialog#${this.localOptions.eventName + this.localOptions.refresh}`)
      if (popupOpened && this.localOptions.once) {
        return
      }
      localStorage.setItem(`popUpWidgetDialog#${this.localOptions.eventName + this.localOptions.refresh}`, 'opened')
      if (this.localOptions.justImage) {
        this.showImage = true
        return
      }
      this.dialog = true
    }
  }
})
</script>

<style lang="scss" scoped>
.overlay-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.InsideDialog {
  width: 100%;
  .InsideDialog__header {
    display: flex;
    padding: $space-4 $space-6;
    align-items: center;
    justify-content: space-between;
    gap: $space-2;
    align-self: stretch;
    .InsideDialog__header-content {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: $space-2;
      .InsideDialog__header-icon {
      }
      .InsideDialog__header-title {

      }
    }
  }
  .InsideDialog__scroll-area {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    .InsideDialog__image {
      padding: 0!important;
    }
    .InsideDialog__body {
      padding: $space-6 !important;
    }
    .InsideDialog__action {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: $space-3;
      padding: $spacing-none $space-6 $space-6 !important;
    }
  }
}
</style>
