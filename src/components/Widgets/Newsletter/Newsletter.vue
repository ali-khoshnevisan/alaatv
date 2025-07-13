<template>
  <q-dialog :model-value="dialog"
            persistent>
    <q-card class="custom-card signup-dialog-card">
      <q-card-section>
        <q-btn color="primary"
               flat
               icon="close"
               @click="toggleDialog(false, true)" />
      </q-card-section>
      <q-card-section>
        <q-stepper ref="stepper"
                   v-model="step"
                   color="primary"
                   flat
                   header-class="stepper-fire-day-landing-header-less"
                   class="signup-dialog-stepper"
                   animated>
          <q-step :name="'signup'"
                  title="signup">
            <signup-step :verification="localOptions.verification"
                         :eventId="localOptions.eventId"
                         @goto-next-step="gotoNextStep('signup')"
                         @toggle-dialog="toggleDialog(true, true)"
                         @update-user="updateUser($event)" />
          </q-step>
          <q-step :name="'verification'"
                  title="verification">
            <verification-step :userInfo="userForm"
                               @update-user="updateUser($event)"
                               @goto-next-step="gotoNextStep()"
                               @goto-prev-step="gotoPrevStep" />
          </q-step>
          <q-step :name="'info'"
                  title="info">
            <info-completion :options="localOptions.userInputs"
                             :hasRedirect="localOptions.hasRedirect"
                             :redirectUrl="localOptions.redirectUrl"
                             :userInfo="userForm"
                             :eventId="localOptions.eventId"
                             @toggle-dialog="toggleDialog(true, true)" />
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import SignupStep from './components/SignupStep.vue'
import InfoCompletion from './components/InfoCompletion.vue'
import VerificationStep from './components/VerificationStep.vue'
import moment from 'moment-jalaali'

export default {
  name: 'Newsletter',
  components: {
    SignupStep,
    VerificationStep,
    InfoCompletion
  },
  mixins: [mixinWidget],
  data () {
    return {
      dialog: false,
      userForm: {
        mobile: null,
        code: null
      },
      step: 'signup',
      defaultOptions: {
        eventName: 'showNewsletter',
        verification: true,
        hasRedirect: false,
        hasRedirectWithDate: false,
        showStatusNotify: true,
        redirectUrlsWithDate: [],
        redirectUrl: '',
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
  mounted () {
    this.$bus.on(this.localOptions.eventName, this.toggleDialog)
  },
  methods: {
    toggleDialog (completion = false, close = false) {
      if (close) {
        if (completion) {
          localStorage.setItem(`newsletter#${this.localOptions.eventName + this.localOptions.eventId}`, this.userForm.mobile)
          this.dialog = !this.dialog
          this.$bus.emit('newsletterCompleted', this.localOptions.eventName)
          this.checkRedirectLinks()
          return
        }
        this.dialog = !this.dialog
        return
      }
      const newsletterCompleted = localStorage.getItem(`newsletter#${this.localOptions.eventName + this.localOptions.eventId}`)
      if (newsletterCompleted) {
        this.$bus.emit('newsletterCompleted', this.localOptions.eventName)
        if (this.localOptions.showStatusNotify) {
          this.$q.notify({
            message: 'قبلا ثبت نام شده‌اید، بزودی با شما تماس خواهیم گرفت.',
            color: 'warning',
            position: 'top'
          })
        }
        this.checkRedirectLinks()
        return
      }
      this.dialog = !this.dialog
    },
    checkRedirectLinks () {
      if (this.localOptions.hasRedirect && this.localOptions.redirectUrl) {
        window.location.href = this.localOptions.redirectUrl
        return
      }
      if (this.localOptions.hasRedirectWithDate) {
        this.localOptions.redirectUrlsWithDate.forEach((item, index) => {
          if (moment(new Date()).format('YYYY-M-D') === item.value) {
            this.$router.push({ path: this.localOptions.redirectUrlsWithDate[index + 1].value })
          }
        })
      }
    },
    gotoNextStep (currentStep) {
      if (currentStep === 'signup' && !this.localOptions.verification) {
        this.$refs.stepper.goTo('info')
      } else {
        this.$refs.stepper.next()
      }
    },
    gotoPrevStep () {
      this.$refs.stepper.previous()
    },
    updateUser (userInfo) {
      this.userForm = userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.signup-dialog-card{
  width: 432px;
  height: 516px;

  @media screen and (width <= 600px) {
    width: 100%;
  }

  &:deep(.q-stepper__header) {
    display: none !important;
  }

  &:deep(.q-stepper__step-inner) {
    padding: 0 !important;
  }
}

</style>
