<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-sm-12">
      <div class="row info-col">
        <div class="col-12 col-md-6">
          <plan-status :passed-days="studyPlanInfo?.passed_days"
                       :has-finished="studyPlanInfo?.has_finished"
                       :loading="loading" />
        </div>
        <div class="col-12 col-md-6">
          <plan-statics :watched="studyPlanInfo?.count_of_watched_sessions"
                        :remained="studyPlanInfo?.count_of_remained_sessions"
                        :loading="loading" />
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-12">
      <div class="report-col">
        <plan-reviews :studyPlanId="studyPlanInfo?.id"
                      :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PlanStatus from 'src/components/DashboardTripleTitleSet/Dashboard/PlanStatus.vue'
import PlanStatics from 'src/components/DashboardTripleTitleSet/Dashboard/PlanStatics.vue'
import PlanReviews from 'src/components/DashboardTripleTitleSet/Dashboard/PlanReviews.vue'
import { StudyPlanInfo } from 'src/models/StudyPlanInfo'

export default defineComponent({
  name: 'StatusAndReview',
  components: {
    PlanStatus,
    PlanStatics,
    PlanReviews
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    studyPlanInfo: {
      type: Object,
      default: new StudyPlanInfo()
    }
  }
})
</script>

<style lang="scss" scoped>
.info-col, .report-col {
  border: 1px solid rgba(203, 209, 217, 1);
  background: #FFF;
  border-radius: 12px;
  //box-shadow: 0 1px 2px 0 rgb(16 24 40 / 6%), 0 1px 3px 0 rgb(16 24 40 / 8%);
  padding: 24px 24px 24px 24px;
  min-height: 400px;
}
</style>
