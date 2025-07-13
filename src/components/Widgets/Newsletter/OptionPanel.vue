<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-md-6 q-my-sm">
            <div class="outsideLabel">event name</div>
            <q-input v-model="localOptions.eventName" />
          </div>
          <div class="col-md-6 q-my-sm">
            <div class="outsideLabel">event id</div>
            <q-input v-model="localOptions.eventId"
                     type="number" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">verification</div>
            <q-checkbox v-model="localOptions.verification" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">first name</div>
            <q-checkbox v-model="localOptions.userInputs.first_name" />
          </div>
          <div class="col-md-2">
            <div class="outsideLabel">last name</div>
            <q-checkbox v-model="localOptions.userInputs.last_name" />
          </div>
          <div class="col-md-1">
            <div class="outsideLabel">major</div>
            <q-checkbox v-model="localOptions.userInputs.major" />
          </div>
          <div class="col-md-1">
            <div class="outsideLabel">grade</div>
            <q-checkbox v-model="localOptions.userInputs.grade" />
          </div>
          <div class="col-md-3">
            <div class="outsideLabel">نمایش پیغام ثبت نام</div>
            <q-checkbox v-model="localOptions.showStatusNotify" />
          </div>
        </div>
        <div class="row q-col-gutter-md q-mt-xs">
          <div class="col-md-2">
            <div class="outsideLabel">has Redirect</div>
            <q-checkbox v-model="localOptions.hasRedirect" />
          </div>
          <div class="col-md-3">
            <div class="outsideLabel">has Redirect with date</div>
            <q-checkbox v-model="localOptions.hasRedirectWithDate" />
          </div>
          <div v-if="localOptions.hasRedirect"
               class="col-12 col-md-10">
            <q-input v-model="localOptions.redirectUrl"
                     type="text"
                     label="URL" />
          </div>
          <div v-if="localOptions.hasRedirectWithDate"
               class="col-12">
            <q-btn icon="ph:plus"
                   class="q-mb-sm"
                   color="green"
                   @click="addUrl" />
            <form-builder ref="formBuilder"
                          v-model:value="localOptions.redirectUrlsWithDate"
                          @onClick="deleteUrl" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import { FormBuilder } from 'quasar-form-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default {
  name: 'OptionPanel',
  components: { OptionPanelTabs, FormBuilder },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        eventName: 'showNewsletter',
        verification: true,
        hasRedirect: false,
        hasRedirectWithDate: false,
        showStatusNotify: true,
        redirectUrl: '',
        redirectUrlsWithDate: [],
        eventId: null,
        userInputs: {
          first_name: true,
          last_name: true,
          major: true,
          grade: true
        }
      }
    }
  },
  methods: {
    addUrl () {
      this.localOptions.redirectUrlsWithDate.push(
        {
          type: 'date',
          counter: this.localOptions.redirectUrlsWithDate.length,
          name: 'date',
          label: 'تاریخ',
          calendar: 'persian',
          col: 'col-md-4',
          rules: [(val) => !!val || 'field is required']
          // lazyRules: true,
        },
        {
          type: 'input',
          counter: this.localOptions.redirectUrlsWithDate.length,
          name: 'url',
          value: null,
          label: 'لینک',
          col: 'col-md-7'
        },
        {
          type: 'button',
          counter: this.localOptions.redirectUrlsWithDate.length,
          icon: 'ph:trash',
          color: 'red',
          col: 'col-md-1 q-mt-lg',
          square: true
        }
      )
    },
    deleteUrl (data) {
      if (data.input.type === 'button') {
        this.localOptions.redirectUrlsWithDate = this.localOptions.redirectUrlsWithDate.filter(item => item.counter !== data.input.counter)
      }
    }
  }
}
</script>
