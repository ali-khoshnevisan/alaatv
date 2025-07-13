<template>
  <div class="comment-box">
    <div class="add-comment row items-center">
      <q-icon name="ph:notepad"
              size="20px" />
      <div class="text">
        افزودن یادداشت در
        {{formattedTime(currentVideoTime)}}
      </div>
      <div class="action">
        <q-btn icon="ph:plus"
               square
               flat
               @click="addComment" />
      </div>
    </div>
    <div v-if="showCommentInput"
         class="comments-container">
      <div v-if="commentLoading"
           class="row q-col-gutter-md">
        <div v-for="i in 3"
             :key="i"
             class="col-md-4 col-xs-12">
          <q-skeleton height="148px" />
        </div>
      </div>
      <div v-else
           class="row comments q-col-gutter-md">
        <div v-for="comment in customizedTimepoint.comments.list"
             :key="comment.id"
             class="col-md-4 col-xs-12 ">
          <div class="comment-container">
            <div class="comment ellipsis-3-lines">
              {{ comment.comment }}
            </div>
            <q-separator />
            <div class="action flex justify-between items-center">
              <div class="badge">
                {{formattedTime(comment.time)}}
              </div>
              <q-btn label="مشاهده"
                     icon="ph:eye"
                     flat
                     @click="seeComment(comment)" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="badge col-1">
          {{formattedTime(timePoint)}}
        </div>
        <div class="comment-input col-md-11 col-xs-12">
          <q-input v-model="note"
                   class="comment-text no-title"
                   auto-grow
                   outlined
                   type="textarea"
                   placeholder="یادداشت خود را وارد کنید" />
          <!--    <div v-else-->
          <!--         class="preview-comment"-->
          <!--         v-html="note.replace(/\r?\n/g, '<br/>')" />-->
          <div class="flex justify-end q-pt-md action-btns">
            <!--            <q-btn v-if="saveMode"-->
            <!--                   :disabled="doesntHaveContent"-->
            <!--                   :loading="loading"-->
            <!--                   color="grey"-->
            <!--                   class="cancel btn-size"-->
            <!--                   label="لغو"-->
            <!--                   @click="cancel" />-->
            <q-btn unelevated
                   dark
                   outline
                   color="grey-9"
                   label="انصراف"
                   class="cancel btn-size"
                   @click="showCommentInput = false" />
            <q-btn :disabled="doesntHaveContent"
                   :loading="loading"
                   color="secondary"
                   label="ذخیره"
                   class="submit btn-size"
                   @click="createTimePoint" />
            <!--            <q-btn v-else-->
            <!--                   unelevated-->
            <!--                   :loading="loading"-->
            <!--                   :disabled="doesntHaveContent"-->
            <!--                   color="primary"-->
            <!--                   dark-->
            <!--                   label="ویرایش"-->
            <!--                   class="edit btn-size"-->
            <!--                   @click="edit" />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { Timepoint } from 'src/models/Timepoint.js'

export default {
  name: 'CommentBox',
  props: {
    value: {
      type: String,
      default: ''
    },
    currentVideoTime: {
      type: Number,
      default: 0
    },
    contentId: {
      type: Number,
      default: 0
    },
    doesntHaveContent: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      customizedTimepoint: new Timepoint(),
      commentLoading: false,
      showCommentInput: false,
      timePoint: 0,
      note: null,
      saveMode: false,
      showCancel: false,
      canCheck: true
    }
  },
  computed: {
    canEdit () {
      return this.saveMode || this.value.length === 0
    },
    setPlaceHolder () {
      if (this.doesntHaveContent) {
        return 'یادداشت در این مرحله فعال نمیاشد'
      } else {
        return 'یادداشت این جلسه'
      }
    }
  },
  watch: {
    currentVideoTime (newVal) {
      this.timePoint = newVal
    },
    value (newValue) {
      // this.note = newValue
      // this.checkEditMode(newValue)
    }
  },
  methods: {
    seeComment (comment) {
      this.note = comment.comment
      this.timePoint = comment.time
      this.$bus.emit('goToTimepoint', comment.time)
    },
    formattedTime (time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    },
    addComment () {
      this.showCommentInput = true
      this.timePoint = this.currentVideoTime
      this.getContentsWithCustomizeTimepoints()
    },
    getContentsWithCustomizeTimepoints () {
      this.commentLoading = true
      APIGateway.user.getContentsWithCustomizeTimepoints()
        .then((timepoints) => {
          this.commentLoading = false
          const currentContentTimepoint = timepoints.list.filter(timepoint => timepoint.id === this.contentId)
          this.customizedTimepoint = new Timepoint(currentContentTimepoint[0])
        })
        .catch(() => {
          this.commentLoading = false
        })
    },
    createTimePoint () {
      this.$store.dispatch('loading/overlayLoading', true)
      const data = {
        content_id: this.contentId,
        comment: this.note,
        time: Math.trunc(this.timePoint)
      }
      APIGateway.content.setCustomizeTimepoint(data)
        .then(r => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    edit () {
      this.saveMode = true
    },
    cancel () {
      this.note = this.value
      this.saveMode = false
    },
    saveComment () {
      this.saveMode = false
      this.$emit('updateComment', this.note)
    },
    checkEditMode (data) {
      if (this.canCheck && data.length > 0) {
        this.saveMode = false
        this.canCheck = false
      } else if (this.canCheck) {
        this.saveMode = true
        this.canCheck = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-bg {
  background: #eff3ff;
}

.comment-box {
  $textarea-height: 140px;
  $textarea-background: #eff3ff;
  font-family: IRANSansXFaNum;
  .add-comment {
    border: 1px solid rgba(203, 209, 217, 1);
    border-radius: $radius-4;
    padding: 12px 16px 12px 12px;
    margin-bottom: 20px;
    .text {
      font-size: 16px;
      font-weight: 600;
      margin-left: 8px;
    }
    .action {
      margin-left: auto;
    }
  }

  .comments-container {
    .comments {
      margin-bottom: 42px;
      .comment-container {
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #CBD1D9;
        height: 148px;

        .comment {
          height: 60px;
          line-height: 20px;
          margin-bottom: 12px;
          font-size: 12px;
          font-weight: 400;
        }
        .action {
          margin-top: 12px;
        }
      }
    }

    .badge {
      color: #26A699;
      border: 1px solid #26A699;
      border-radius: 1000px;
      background: rgba(38, 166, 153, 0.08);
      height: 24px;
      width: 54px;
      text-align: center;
      margin-right: 8px;
    }

    .comment-input {
      @include media-max-width('sm') {
        margin-top: 11px;
        margin-bottom: 24px;
      }
    }
  }

  .action-btns {
    .cancel {
      margin-right: 12px;
    }
  }

  :deep(.q-textarea) {
    border: 1px solid rgba(203, 209, 217, 1);
    border-radius: $radius-3;
    background: $textarea-background;
    min-height: $textarea-height;
    .q-field__inner {
      border-radius: $radius-6;
      .q-field__control {
        min-height: $textarea-height;
        padding: $spacing-none;
        border-radius: $radius-6;
        &:before {
          border: none;
          background: $textarea-background;
          border-radius: $radius-6;
        }
        .q-field__control-container {
          textarea {
            height: max-content;
            overflow: auto;
            min-height: $textarea-height;
          }
        }
      }
    }
  }
  .preview-comment {
    padding: $space-4;
    background: $textarea-background;
    min-height: $textarea-height;
    border-radius: $radius-6;
    color: $blue-grey-7;
  }
}
</style>
