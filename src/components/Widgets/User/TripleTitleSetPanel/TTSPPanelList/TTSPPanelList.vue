<template>
  <div class="ttsp-panel-list row q-col-gutter-md-lg q-col-gutter-xs-md justify-center"
       :style="localOptions.style">
    <div v-for="(item, index) in panels.list"
         :key="index"
         class="col-md-3 col-sm-6 col-xs-12">
      <t-t-s-p-panel-item :item="item" />
    </div>
  </div>
</template>

<script>
import TTSPPanelItem from './TTSPPanelItem.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { EventList } from 'src/models/Event'

export default {
  name: 'TTSPPanelList',
  components: { TTSPPanelItem },
  mixins: [mixinWidget],
  data () {
    return {
      panels: new EventList(),
      loading: false,
      defaultOptions: {
        className: '',
        style: {}
      }
    }
  },
  created () {
    // this.panels = new EventList(APIGateway.events.eventList.filter(item => item.groups.includes('alaa')))
    this.getEvents()
    // this.panels.push({
    //   route: { name: 'UserPanel.Asset.Abrisham.Progress' },
    //   title: 'راه ابریشم 1',
    //   logo: 'https://nodes.alaatv.com/upload/abrisham-panel-logotype.png'
    // })
    // this.panels.push({
    //   route: { name: 'UserPanel.Asset.AbrishamPro.Progress' },
    //   title: 'راه ابریشم پرو',
    //   logo: 'https://nodes.alaatv.com/upload/abrisham-panel-logotype.png'
    // })
  },
  methods: {
    getEvents () {
      APIGateway.events.index()
        .then(eventList => {
          this.panels = eventList
        })
        .catch()
    }
  }
}
</script>

<style lang="scss" scoped>
.ttsp-panel-list {
  //padding: ;
}
</style>
