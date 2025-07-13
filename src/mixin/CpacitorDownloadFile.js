import { useQuasar, Notify } from 'quasar'
import { Capacitor } from '@capacitor/core'
import { NativeFileDownloader } from '@eoscz/capacitor-plugin-native-file-downloader'

const mixinCapacitorDownloadFile = {
  data () {
    return {
      $q: useQuasar()
    }
  },
  computed: {
    isNative () {
      return Capacitor.isNativePlatform()
    }
  },
  methods: {
    downloadPdfWithAxios (url) {
      const options = {
        url,
        fileName: url.replace(/^.*[\\/]/, '').replace('?download=1', '')
      }
      NativeFileDownloader.scheduleFileDownload(options)
        .then(() => {
          Notify.create({
            type: 'positive',
            color: 'positive',
            message: 'دانلود شروع شد.',
            icon: 'check_circle'
          })
        })
        .catch(e => {
          console.error(e)
        })
    }
  }
}
export default mixinCapacitorDownloadFile
