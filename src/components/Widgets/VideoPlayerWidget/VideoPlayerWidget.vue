<template>
  <div class="video-player-widget-container"
       :style="localOptions.style"
       :class="localOptions.customClass">
    <video-player ref="videoPlayer"
                  :key="playerKey"
                  :play-button-color="localOptions.playBtn.background"
                  :play-button-border="localOptions.playBtn.border"
                  :source="localOptions.url"
                  :poster="localOptions.poster"
                  :showBtn="localOptions.showBtn" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'

export default {
  name: 'VideoPlayerWidget',
  components: { VideoPlayer },
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        },
        boxShadows: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        playBtn: {
          background: '#ffca28',
          border: '#ffca28'
        },
        src: '',
        url: '',
        poster: '',
        srcType: '',
        showBtn: true
      },
      playerKey: Date.now()
    }
  },
  computed: {
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component.scss";
$responsiveSpacing: (
  xs: (
    marginTop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
    marginLeft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
    marginRight: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
    marginBottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
    paddingTop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
    paddingLeft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
    paddingRight: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
    paddingBottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
  ),
  sm: (
    marginTop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
    marginLeft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
    marginRight: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
    marginBottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
    paddingTop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
    paddingLeft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
    paddingRight: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
    paddingBottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
  ),
  md: (
    marginTop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
    marginLeft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
    marginRight: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
    marginBottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
    paddingTop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
    paddingLeft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
    paddingRight: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
    paddingBottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
  ),
  lg: (
    marginTop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
    marginLeft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
    marginRight: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
    marginBottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
    paddingTop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
    paddingLeft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
    paddingRight: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
    paddingBottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
  ),
  xl: (
    marginTop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
    marginLeft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
    marginRight: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
    marginBottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
    paddingTop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
    paddingLeft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
    paddingRight: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
    paddingBottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
  )
);
$shadows: v-bind('shadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
.video-player-widget-container {
  @include media-query-spacings($responsiveSpacing, $sizes);
  box-shadow: $shadows;
  overflow: hidden;
  border-radius: $borderRadius;
  border: $border;
  //border-radius: 24px;
  padding: 0 !important;
}
</style>
