<template>
  <div class="contact-us row">
    <div class="col-12 text-center q-mb-lg">
      <div class="title">
        <h5>
          ارتباط با ما
        </h5>
        <q-separator color="primary"
                     inset />
      </div>
      <div class="sub-title q-mt-md">
        از راه‌های زیر میتونی با آلاء در تماس باشی
      </div>
    </div>
    <div class="col-6">
      <q-card>
        <q-card-section>
          <div class="flex">
            <q-icon name="ph:headphones"
                    size="24px"
                    class="q-mr-sm"
                    color="primary" />
            <h6>
              ثبت تیکت پشتیبانی
            </h6>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="ticket-sub-title body1 q-mt-sm q-mb-lg">
            اگر سوالی داری یا به مشکلی خوردی از قسمت پشتیبانی آلاء کمک بگیر.
          </div>
        </q-card-section>
        <q-card-section class="text-right">
          <router-link :to="{name: 'UserPanel.Ticket.Index'}">
            <q-btn label="رفتن به پشتیبانی"
                   icon-right="ph:arrow-left"
                   color="primary" />
          </router-link>
        </q-card-section>
      </q-card>
      <div class="contact-form q-mt-xl">
        <div class="title flex">
          <q-icon name="ph:phone"
                  color="primary"
                  class="q-mr-sm"
                  size="21px" />
          <h6>
            درخواست مشاوره رایگان
          </h6>
        </div>
        <div class="sub-title body1 q-my-md">
          اگه درباره دوره‌های آلاء نیاز به مشاوره داری پس از تکمیل فرم و ارسال درخواست، همکاران آلایی باهات تماس میگیرن تا راهنماییت کنن.
        </div>
        <form-builder v-model:value="inputs" />
      </div>
    </div>
    <div class="col-5 offset-1">
      <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2024-10/rr1730119419.png" />
      <div class="address">
        <div class="address-title flex">
          <q-icon name="ph:map-pin-line"
                  size="24px"
                  class="q-mr-sm"
                  color="primary" />
          <h6>
            نشانی
          </h6>
        </div>
        <div class="address">
          تهران، بلوار آیت الله کاشانی، بلوار شقایق شمالی، کوچه پرواز یکم، پلاک 6
        </div>
      </div>
      <div class="phone-number">
        <div class="phone-title flex">
          <q-icon name="ph:phone"
                  size="24px"
                  class="q-mr-sm"
                  color="primary" />
          <h6>
            شماره تماس (اداری)
          </h6>
        </div>
        <div class="phone">
          021-37641000
        </div>
      </div>
      <div class="social-media">
        <div class="social-title flex">
          <q-icon name="ph:newspaper"
                  size="24px"
                  class="q-mr-sm"
                  color="primary" />
          <h6>
            شبکه اجتماعی
          </h6>
        </div>
        <div class="social">
          @Alaa_Sanatisharif
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lazyImg from 'components/lazyImg.vue'
import { FormBuilder } from 'quasar-form-builder'

export default {
  name: 'ContactUs',
  components: {
    lazyImg,
    FormBuilder
  },
  data () {
    return {
      inputs: [
        {
          type: 'input',
          name: 'first_name',
          outlined: true,
          label: 'نام',
          placeholder: 'وارد کنید',
          col: 'col-6',
          inputType: 'input'
        },
        {
          type: 'input',
          name: 'last_name',
          outlined: true,
          label: 'نام خانوادگی',
          placeholder: 'وارد کنید',
          col: 'col-6',
          inputType: 'input'
        },
        {
          type: 'input',
          name: 'mobile',
          outlined: true,
          label: 'شماره همراه',
          placeholder: 'وارد کنید',
          col: 'col-12',
          inputType: 'input'
        },
        {
          type: 'input',
          name: 'subject',
          outlined: true,
          label: 'درباره چه موضوعی به راهنمایی نیاز داری؟',
          placeholder: 'وارد کنید',
          col: 'col-12',
          inputType: 'input'
        },
        {
          type: 'input',
          name: 'comment',
          outlined: true,
          label: 'شرح سوال',
          placeholder: 'سوال خود را وارد کنید',
          col: 'col-12',
          inputType: 'textarea',
          uid: '0c4e1ed7-d82c-4bcc-83e1-3e4eb5c4c239'
        }]

    }
  }
}
</script>

<style scoped lang="scss">
.contact-us {
  font-family: IRANSansXFaNum;
  margin: 32px 288px 84px;

  .title {
    .q-separator {
      width: 78px;
      height: 2px;
      margin: auto;
    }
  }

  .phone-number {
    margin: 20px 0;
  }

  .address-title, .phone-title, .social-title {
    margin-bottom: 8px;
  }
}
</style>
