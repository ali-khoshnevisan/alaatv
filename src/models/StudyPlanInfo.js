import { Model } from 'js-abstract-model'

class StudyPlanInfo extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'passed_days' },
      { key: 'major' },
      { key: 'grade' },
      { key: 'count_of_remained_sessions' },
      { key: 'count_of_watched_sessions' },
      { key: 'has_finished' }
    ])
  }
}
export { StudyPlanInfo }
