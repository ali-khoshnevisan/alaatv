<template>
  <q-card class="dialog-card">
    <q-card-section class="dialog-title">
      ثبت نام
    </q-card-section>
    <q-card-section class="dialog-subtitle">شماره همراه خود را وارد کنید</q-card-section>
    <q-card-section class="login-input-wrapper">
      <q-input v-model="mobile"
               class="landing-text-input dialog-input"
               placeholder="09 - - - - - - - - -"
               :rules="rules"
               outlined
               color="primary"
               dir="ltr" />
    </q-card-section>
    <q-card-actions class="dialog-action">
      <q-btn class="send-btn"
             :disabled="loading"
             color="primary"
             @click="getCodeForLogin">
        {{verification ? 'ارسال کد تایید' : 'ثبت شماره'}}

      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>

import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'SignupStep',
  props: {
    verification: {
      type: Boolean,
      default: false
    },
    eventId: {
      type: Number,
      default: null
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  emits: ['gotoNextStep', 'updateUser', 'toggleDialog'],
  data () {
    return {
      loading: false,
      newsletter: [],
      rules: {
        required: value => !!value || 'این فیلد الزامی است'
      },
      mobile: null
    }
  },
  methods: {
    checkNewsletterStatus () {
      return new Promise((resolve, reject) =>
        APIGateway.user.newsletterStatus({ mobile: this.mobile, event_id: this.eventId })
          .then(newsletter => {
            this.newsletter = newsletter
            resolve(newsletter)
          })
          .catch(() => {
            reject()
          })
      )
    },
    getCodeForLogin () {
      this.checkNewsletterStatus()
        .then(newsletter => {
          if (newsletter.id) {
            this.$q.notify({
              message: 'قبلا ثبت نام شده‌اید.',
              color: 'warning',
              position: 'top'
            })
            this.$emit('updateUser', {
              mobile: newsletter.mobile
            })
            this.$emit('toggleDialog')
            return
          }
          const loginData = {
            mobile: this.mobile
          }
          this.sendCodeRequest(loginData)
        })
        .catch()
    },
    setLoading (loading) {
      this.loading = loading
    },
    sendCodeRequest (userInfo) {
      this.setLoading(true)
      this.$apiGateway.user.resendGuest(userInfo)
        .then(userData => {
          if (this.verification) {
            this.showMessage(userData.message, 'success')
          }
          this.$emit('updateUser', {
            mobile: this.mobile,
            code: userData.data.code ? userData.data.code : null
          })
          this.$emit('gotoNextStep')
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    showMessage (message, type = 'negative') {
      this.$q.notify({
        message,
        color: type,
        position: 'top',
        multiLine: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-card {
    background: transparent;
    box-shadow: none !important;

    .dialog-title {
        display: flex;
        justify-content: center;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;
        padding-top: 0;
        padding-bottom: 0;
    }

    .dialog-subtitle {
        margin-top: 24px;
        padding-bottom: 0;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;

        @media screen and (width <= 1439px) {
            margin-top: 16px;
        }

        @media screen and (width <= 1023px) {
            margin-top: 16px;
        }

        @media screen and (width <= 599px) {
            margin-top: 16px;
        }
    }

    .login-input-wrapper {
        margin-top: 20px;

        .dialog-input {
          width: 100%;
        }

        @media screen and (width <= 1920px) {
        }

        @media screen and (width <= 1439px) {
            margin-top: 60px;
        }

        @media screen and (width <= 1023px) {
            margin-top: 60px;
        }

        @media screen and (width <= 599px) {
            margin-top: 66px;
        }
    }

    .dialog-action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;

        .send-btn {
            width: 100%;
            margin-bottom: 24px;
            box-shadow: none;

            @media screen and (width <= 1439px) {
                width: 280px;
            }

            @media screen and (width <= 1023px) {
                width: 280px;
            }

            @media screen and (width <= 599px) {
                width: 240px;
            }
        }

        @media screen and (width <= 1439px) {
            margin-top: 60px;
        }

        @media screen and (width <= 1023px) {
            margin-top: 60px;
        }

        @media screen and (width <= 599px) {
            margin-top: 49px;
        }
    }
}
</style>
