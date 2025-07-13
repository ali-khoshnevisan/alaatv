<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="q-mt-xl">
        eventId
      </div>
      <q-input v-model="localOptions.eventId" />
      <div class="q-mt-xl">
        setId
        <br>
        کد دوره مشاوره
      </div>
      <q-input v-model="localOptions.setId" />
      <div class="q-mt-xl">
        product1Id
        <br>
        ابریشم 2
      </div>
      <q-input v-model="localOptions.product1Id" />
      <div class="q-mt-xl">
        product2Id
        <br>
        ویژه کاربران راه ابریشم ۱
      </div>
      <q-input v-model="localOptions.product2Id" />
      <div class="q-mt-xl">
        product3Id
        <q-checkbox v-model="localOptions.product3Enable"
                    @update:model-value="updateEnableProduct($event, localOptions.product3Id, 'product4Enable', 'product5Enable')" />
        <br>
        صفر تا صد توسط تیم آلا
        <br>
        اولی
      </div>
      <q-input v-model="localOptions.product3Id" />
      <div class="q-mt-xl">
        product4Id
        <q-checkbox v-model="localOptions.product4Enable"
                    @update:model-value="updateEnableProduct($event, localOptions.product4Id, 'product3Enable', 'product5Enable')" />
        <br>
        صفر تا صد توسط تیم آلا
        <br>
        دومی
      </div>
      <q-input v-model="localOptions.product4Id" />
      <div class="q-mt-xl">
        product5Id
        <q-checkbox v-model="localOptions.product5Enable"
                    @update:model-value="updateEnableProduct($event, localOptions.product5Id, 'product3Enable', 'product4Enable')" />
        <br>
        صفر تا صد توسط تیم آلا
        <br>
        سومی
      </div>
      <q-input v-model="localOptions.product5Id" />
      <div class="q-mt-xl">
        کد دپارتمان تیکت پشتیبانی انتخاب رشته
      </div>
      <q-input v-model="localOptions.ticketDepartmentId" />
    </template>
  </option-panel-tabs>
</template>
<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        eventId: 13,
        setId: 13,
        product1Id: 1239,
        product2Id: 1240,
        product3Id: 1241,
        product3Enable: true,
        product4Id: 1242,
        product4Enable: false,
        product5Id: 1243,
        product5Enable: false,
        limitedProductEnable: 1241,
        ticketDepartmentId: 15
      }
    }
  },
  methods: {
    updateEnableProduct (value, id, disable1, disable2) {
      if (value) {
        this.localOptions.limitedProductEnable = id
        this.localOptions[disable1] = this.localOptions[disable2] = false
      } else {
        this.localOptions.product3Enable = true
        this.localOptions.limitedProductEnable = this.localOptions.product3Id
      }
    }
  }
}
</script>
