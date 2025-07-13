<template>
  <div class="triple-title-set-dashboard-container bg-triple-title-set-panel">
    <dashboard-header :study-plan-id="studyPlanId"
                      :event="event" />
    <daily-plan :study-plan-id="studyPlanId"
                :event="event" />
    <div class="status q-my-lg">
      <status-and-review :loading="loading"
                         :study-plan-info="studyPlanInfo" />
    </div>
    <study-plan-selection-dialog :dialog="dialog"
                                 @confirm="onConfirmChangeStudyPlan"
                                 @toggle-dialog="onToggleDialog" />
    <q-dialog v-model="planSettings">
      <inside-dialog>
        <template #header-icon>
          <badge-icon icon="ph:warning"
                      color="orange" />
        </template>
        <template #header>
          تنظیمات برنامه مطالعاتی
        </template>
        <template #body>
          <div>
            برای شروع دوره باید برنامه مطالعاتی خودتو انتخاب کنی
          </div>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-select v-model="planType"
                        label="برنامه"
                        option-label="display_name"
                        :options="planOptions" />
            </div>
            <div class="col-6">
              <q-select v-model="grade"
                        label="مقطع"
                        option-label="title"
                        :options="gradeOptions" />
            </div>
            <div class="col-6">
              <q-select v-model="major"
                        label="رشته"
                        option-label="title"
                        :options="majorOptions" />
            </div>
            <!--              <div class="col-12">-->
            <!--                <q-select v-model="lesson"-->
            <!--                          label="درس مورد نمایش"-->
            <!--                          option-value="id"-->
            <!--                          option-label="lesson_name"-->
            <!--                          :options="lessonOptions" />-->
            <!--              </div>-->
            <!--              <div class="col-12 caption1 text-grey-6">-->
            <!--                میتونید انتخاب کنید توی برنامه مطالعاتی شما یک یا چند درس خاص و یا همه دروس راه ابریشم نمایش داده بشن-->
            <!--              </div>-->
          </div>
        </template>
        <template #action>
          <q-btn class="btn cancel q-mx-sm text-grey-9"
                 size="md"
                 outline
                 label="لغو"
                 @click="planSettings = false" />
          <q-btn class="btn q-mx-sm"
                 label="تایید"
                 size="md"
                 color="positive"
                 @click="updateMyStudyPlan" />
        </template>
      </inside-dialog>
    </q-dialog>
    <q-dialog v-model="successChangePlan">
      <inside-dialog>
        <template #header>
          <q-img src="https://nodes.alaatv.com/upload/TripleTitleSet-CalendarCheck.png"
                 width="24px" />
          تغییر برنامه مطالعاتی
        </template>
        <template #body>
          <div class="flex justify-center items-center">
            <div class="lazy-image-wrapper q-mb-md">
              <lazy-img src="https://nodes.alaatv.com/upload/TripleTitleSet-check.png" />
            </div>
          </div>
          <div>
            برنامه شما با موفقیت تنظیم شد؛ همچنین بعدا میتونید از قسمت برنامه مطالعاتی، اونو تنظیم کنید و یا تغییر بدین.
          </div>
        </template>
        <template #action>
          <q-btn class="btn q-mx-sm"
                 label="متوجه شدم"
                 size="md"
                 color="positive"
                 @click="successChangePlan = false" />
        </template>
      </inside-dialog>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinTripleTitleSet, mixinAuth } from 'src/mixin/Mixins.js'
import DailyPlan from 'src/components/DashboardTripleTitleSet/Dashboard/DailyPlan.vue'
import DashboardHeader from 'src/components/DashboardTripleTitleSet/Dashboard/DashboardHeader.vue'
import StatusAndReview from 'src/components/DashboardTripleTitleSet/Dashboard/StatusAndReview.vue'
import StudyPlanSelectionDialog from 'src/components/DashboardTripleTitleSet/Dashboard/StudyPlanSelectionDialog.vue'
import { APIGateway } from 'src/api/APIGateway'
import InsideDialog from 'src/components/Utils/InsideDialog.vue'
import BadgeIcon from 'src/components/Utils/BadgeIcon.vue'

export default defineComponent({
  name: 'TripleTitleSetDashboard',
  components: {
    DailyPlan,
    InsideDialog,
    BadgeIcon,
    DashboardHeader,
    StatusAndReview,
    StudyPlanSelectionDialog
  },
  mixins: [mixinTripleTitleSet, mixinAuth],
  data () {
    return {
      planSettings: false,
      successChangePlan: false,
      planType: {
        id: null,
        title: null,
        display_name: null
      },
      planOptions: [],
      grade: {},
      gradeOptions: [],
      major: {},
      majorOptions: []
    }
  },
  methods: {
    updateMyStudyPlan (data, date) {
      this.loading = true
      const studyPlanData = {
        event_id: this.event.id,
        major_id: this.major.id,
        grade_id: this.grade.id,
        study_method_id: this.planType.id
      }
      APIGateway.studyPlan.updateMyStudyPlan(studyPlanData)
        .then(studyPlan => {
          this.getMyStudyPlan()
          this.loading = false
          this.planSettings = false
          this.successChangePlan = true
        })
        .catch(() => {
          this.loading = false
        })
    },
    getChangePlanOptions () {
      this.loading = true
      APIGateway.studyPlan.getSelectPlanOptions({ event_id: this.event.id })
        .then(options => {
          this.loading = false
          this.planSettings = true
          this.grade = this.user.grade.id ? this.user.grade : { title: '', id: null }
          this.major = this.user.major.id ? this.user.major : { title: '', id: null }
          this.majorOptions = options.majors
          this.gradeOptions = options.grades
          this.planOptions = options.studyPlans
          // this.lessonOptions = options.products
          // this.lessonOptions.push({
          //   lesson_name: 'همه',
          //   id: null
          // })
          this.planType = options.studyPlans.find(studyPlan => studyPlan.display_name === this.currentStudyPlan.display_name) || {
            id: null,
            title: null,
            display_name: null
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    afterSetEvent () {
      this.getMyStudyPlan(true)
        .catch(() => {
          this.getChangePlanOptions()
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.triple-title-set-dashboard-container {
  padding: 40px 70px 0;

  @include media-max-width('sm') {
    padding: 30px 20px;
  }
}

.q-dialog__backdrop {
  backdrop-filter: blur(7px);
}
</style>
