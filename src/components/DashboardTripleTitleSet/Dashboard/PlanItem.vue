<template>
  <div class="col-md-4 plan-item-box cursor-pointer"
       :style="{borderRight: `4px solid ${plan.borderColor}` }"
       @click="openDialog">
    <!--    <div class="plan-item-header">-->
    <!--      <div class="plan-time"-->
    <!--           :class="{'now': isNow(plan.date, plan.start, plan.end)}">-->
    <!--        <div class="from">{{ plan.start.substring(0,5) }}</div>-->
    <!--        <div class="text">تا</div>-->
    <!--        <div class="till">{{ plan.end.substring(0,5) }}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="plan-item-info">
      <div class="item-title ellipsis">{{ plan.title || plan.product.lesson_name }}</div>
      <q-scroll-area visible
                     class="scroll">
        <div v-for="(video, index) in planContents"
             :key="index"
             class="item-plan">
          <q-icon name="import_contacts"
                  size="18px"
                  class="q-mr-sm" />
          {{ video?.title || 'ویدیو ندارد' }}
        </div>
      </q-scroll-area>
    </div>
    <q-separator />
    <div class="plan-item-footer">
      <div class="plan-time"
           :class="{'now': isNow(plan.date, plan.start, plan.end)}">
        <div class="from">{{ plan.start.substring(0,5) }}</div>
        <div class="text">تا</div>
        <div class="till">{{ plan.end.substring(0,5) }}</div>
      </div>
      <!--            <div class="footer-text"-->
      <!--           :class="{'watched-text': hasWatchedPlan}">-->
      <!--        {{ hasWatchedPlan ? 'دیده شده' : 'مشاهده' }}-->
      <!--            </div>-->
      <div class="footer-action">
        <q-btn v-if="!hasWatchedPlan && isNow(plan.date, plan.start, plan.end)"
               color="secondary"
               class="size-sm"
               round
               unelevated
               icon="ph:play" />
        <q-btn v-else-if="!hasWatchedPlan && !isNow(plan.date, plan.start, plan.end)"
               class="future size-sm"
               label="مشاهده"
               icon-right="chevron_left" />
        <div v-else
             class="watched">
          <q-icon color="secondary"
                  name="ph:check"
                  size="16px" />
          <span>دیده شده</span>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="dialog">
    <inside-dialog>
      <template #header>
        <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-Clock.png"
               width="24px" />
        {{calculateEventDate()}} - {{plan.start.substring(0, 5)}} الی {{plan.end.substring(0, 5)}}
      </template>
      <template #body>
        <plan-contents :educational-layers="event.study_plan.educationalLayers"
                       :first-pamphlet="event.study_plan.firstPamphlet"
                       :plan="plan" />
        <div class="event-description q-mt-md">
          {{plan.description}}
        </div>
      </template>
      <template #action>
        <q-btn class="btn q-mx-sm"
               label="بازگشت"
               size="md"
               color="positive"
               @click="dialog = false" />
      </template>
    </inside-dialog>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { Plan } from 'src/models/Plan.js'
import { Content } from 'src/models/Content'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import planContents
  from 'src/components/Widgets/User/TripleTitleSetPanel/TripleTitleSetStudyPlan/components/PlanContents.vue'
import moment from 'moment-jalaali'

export default defineComponent({
  name: 'PlanItem',
  components: {
    InsideDialog,
    planContents
  },
  props: {
    event: {
      type: Object,
      default: null
    },
    plan: {
      type: Plan
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    hasWatchedPlan () {
      if (this.plan.contents.list.length > 0) {
        return this.plan.contents.list?.every(content => content.has_watched)
      }
      return new Date().getTime() > this.toDateWithOutTimeZone(this.plan.date, this.plan.end).getTime()
    },
    planContents () {
      return this.plan.contents?.list?.filter(x => x.type.id === 8) || [new Content()]
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    calculateEventDate () {
      return moment(this.plan.date).format('jYYYY/jM/jD')
    },
    isNow (date, start, end) {
      const now = new Date()
      const startDate = this.toDateWithOutTimeZone(date, start)
      const endDate = this.toDateWithOutTimeZone(date, end)
      const hour = now.getHours()
      const minute = now.getMinutes()
      const startHour = startDate.getHours()
      const startMin = startDate.getMinutes()
      const endHour = endDate.getHours()
      const endMin = endDate.getMinutes()

      return (startHour <= hour && startMin <= minute) && (hour <= endHour && minute <= endMin)
    },
    getTime (time) {
      const date = new Date(time)
      let min = date.getMinutes()
      if (min === 0) {
        min = '00'
      }
      return date.getHours() + ':' + min
    },
    toDateWithOutTimeZone (date, time) {
      const tempTime = time.split(':')
      const dt = new Date(date)
      dt.setHours(tempTime[0])
      dt.setMinutes(tempTime[1])
      dt.setSeconds(tempTime[2])
      return dt
    }
  }
})
</script>

<style lang="scss" scoped>
.plan-item-box{
  border: 1px solid rgba(203, 209, 217, 1);
  width: 390px;
  //height: 240px;
  border-radius: 12px;
  background: #FFF;
  padding: 20px 24px 12px 20px;

  @include media-max-width('sm') {
    width: 290px;
    //height: 210px;
  }

  .plan-item-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .plan-time {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 6px 4px;
      border-radius: 8px;
      background: #ECEFF1;

      &.now {
        background: #FFD54F;
      }
    }
  }

  .plan-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 12px;

    @include media-max-width('sm') {
      margin-bottom: 20px;
    }

    .item-title {
      max-width: 100%;
      color:#424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;
      margin: 15px 0;

      @include media-max-width('sm') {
        margin: 5px 0 8px;
      }
    }

    .scroll {
      width: 100%;
      height: 50px;
    }

    .item-plan {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-width: 100%;
      color: #757575;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.24px;
    }
  }

  .plan-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;

    @include media-max-width('sm') {
      margin-top: 16px;
    }

    .plan-time {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 6px 4px;
      border-radius: $radius-round;
      border: 1px solid #CBD1D9;
      //background: #ECEFF1;

      &.now {
        //background: #FFD54F;
      }
    }

    .footer-text {
      color: #424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.32px;

      &.watched-text {
        color: #26A69A;
      }
    }

    .footer-action {
      &:deep(.q-btn) {
        border-radius: 50%;
      }

      .future{
        color: $grey-9;
        //background: #ECEFF1;
      }

      .watched {
        color: #44B96E;
      }
    }
  }
}
</style>
