<template>
  <entity-create ref="EntityCreate"
                 v-model:value="actionInput"
                 :api="api"
                 :before-send-data="beforeSendData"
                 :after-send-data="afterSendData"
                 :default-layout="false">
    <template #after-form-builder>
      <div class="col-12 q-my-md flex justify-end">
        <q-btn label="ثبت رتبه کنکور"
               :disable="disable"
               color="primary"
               class="size-lg"
               @click="submitAction" />
      </div>
    </template>
  </entity-create>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { APIGateway } from 'src/api/APIGateway'
import { FormBuilderAssist } from 'quasar-form-builder'
import { Major } from 'src/models/Major'

export default {
  name: 'RankRecord',
  components: { EntityCreate },
  data () {
    return {
      disable: false,
      actionInput: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-md-12 custom-card q-mt-md',
          value: [
            {
              type: 'separator',
              name: 'title',
              size: '0',
              label: '',
              col: 'col-xs-12 title'
            },
            {
              type: 'hidden',
              name: 'event_id',
              label: 'رویداد'
            },
            {
              type: 'select',
              name: 'major_id',
              label: 'رشته شما',
              optionLabel: 'name',
              optionValue: 'id',
              options: [],
              value: new Major(),
              outlined: true,
              multiple: false,
              readonly: false,
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'select',
              name: 'region_id',
              label: 'منطقه یا سهمیه',
              optionLabel: 'title',
              optionValue: 'id',
              options: [],
              outlined: true,
              multiple: false,
              readonly: false,
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'input',
              name: 'rank',
              // responseKey: 'data.rank',
              label: 'رتبه شما در کشور',
              outlined: true,
              readonly: false,
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'input',
              name: 'participationCode',
              // responseKey: 'data.participationCode',
              label: 'شماره داوطلبی شما',
              outlined: true,
              readonly: false,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'file',
              name: 'reportFile',
              label: 'آپلود فایل کارنامه',
              outlined: true,
              readonly: false,
              placeholder: 'وارد نمایید',
              col: 'col-xs-6 q-pr-md'
            },
            {
              type: 'checkbox',
              name: 'enableReportPublish',
              // responseKey: 'data.enableReportPublish',
              label: 'اجازه انتشار رتبه خود را در سایت میدهم',
              outlined: true,
              placeholder: 'وارد نمایید',
              value: false,
              readonly: false,
              col: 'col-md-12 q-mb-md'
            }
          ]
        }
      ],
      api: APIGateway.user.APIAdresses.storeLastKonkur,
      event: {}
    }
  },
  mounted () {
    this.setUpEventResult()
  },
  methods: {
    setUpEventResult () {
      this.getEventResultOptions()
    },
    setInputsOptions (eventResult) {
      const formTitle = 'ثبت رتبه ' + this.event.title
      FormBuilderAssist.setAttributeByName(this.actionInput, 'title', 'label', formTitle)
      FormBuilderAssist.setAttributeByName(this.actionInput, 'event_id', 'value', this.event.id)
      this.$refs.EntityCreate.setInputAttributeByName('major_id', 'options', eventResult.majors)
      this.$refs.EntityCreate.setInputAttributeByName('region_id', 'options', eventResult.regions)
    },
    async getEventResultOptions () {
      this.$store.commit('loading/loading', true)
      await APIGateway.user.createEventResult()
        .then((eventResult) => {
          const lastEventIndex = eventResult.events.length - 1
          this.event = eventResult.events[lastEventIndex]
          setTimeout(() => {
            this.setInputsOptions(eventResult)
          }, 400)
          this.$store.commit('loading/loading', false)
          this.getRankRecord()
        })
        .catch((e) => {
          this.$store.commit('loading/loading', false)
        })
    },
    getRankRecord () {
      const userId = this.$store.getters['Auth/user'].id
      APIGateway.user.eventResult({ event_id: this.event.id, user_id: userId })
        .then(eventResult => {
          // const firstEventResult = eventResult[0]
          if (eventResult.report_file_link) {
            FormBuilderAssist.setAttributeByName(this.actionInput, 'reportFile', 'type', 'link')
            FormBuilderAssist.setAttributeByName(this.actionInput, 'reportFile', 'label', null)
            FormBuilderAssist.setAttributeByName(this.actionInput, 'reportFile', 'value', 'نمایش کارنامه')
            FormBuilderAssist.setAttributeByName(this.actionInput, 'reportFile', 'url', eventResult.report_file_link)
          }
          if (eventResult.id) {
            this.disable = true
            this.$refs.EntityCreate.getValues().forEach(input => {
              input.readonly = true
            })
            this.event = eventResult.event
            FormBuilderAssist.setAttributeByName(this.actionInput, 'major_id', 'value', new Major(eventResult.major))
            this.$refs.EntityCreate.setInputAttributeByName('region_id', 'value', eventResult.region)
            this.$refs.EntityCreate.setInputAttributeByName('rank', 'value', eventResult.rank)
            this.$refs.EntityCreate.setInputAttributeByName('participationCode', 'value', eventResult.participationCode)
            this.$refs.EntityCreate.setInputAttributeByName('enableReportPublish', 'value', eventResult.enable_report_publish === 1)
          }
        })
        .catch()
    },
    afterSendData () {
      this.$q.notify({
        message: 'ثبت رتبه با موفقیت انجام شد',
        type: 'positive'
      })
      this.$store.commit('loading/loading', false)
    },
    beforeSendData (formData) {
      const isPublished = formData.get('enableReportPublish')
      if (isPublished) {
        formData.set('enableReportPublish', 1)
      } else {
        formData.set('enableReportPublish', 0)
      }
    },
    onActionSuccess () {
      this.$store.commit('loading/loading', false)
    },
    onActionError () {
      this.$store.commit('loading/loading', false)
    },
    submitAction () {
      this.$store.commit('loading/loading', true)

      this.$refs.EntityCreate.createEntity()
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.form-builder-link) {
  .link {
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    background-color: $grey-3;
  }
}
</style>
