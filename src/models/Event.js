import { Collection, Model } from 'js-abstract-model'

class Event extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'name' },
      {
        key: 'logo',
        default: {
          desktop: null,
          main: null,
          mobile: null
        }
      },
      {
        key: 'date_info',
        default: {
          now: null,
          till_konkur: null
        }
      },
      {
        key: 'config',
        default: {
          educational_layers: 'other',
          showDashboard: false,
          showStudyPlan: false,
          showDashboardIfHasPurchased: false,
          showStudyPlanIfHasPurchased: false
        }
      },
      { key: 'title' },
      { key: 'endTime' },
      { key: 'startTime' },
      {
        key: 'showDashboard',
        default: false
      },
      {
        key: 'showStudyPlan',
        default: false
      },
      {
        key: 'showDashboardIfHasPurchased',
        default: false
      },
      {
        key: 'showStudyPlanIfHasPurchased',
        default: false
      },
      { key: 'studyEventId' },
      {
        key: 'study_plan',
        default: {
          category_id: null,
          first_pamphlet: true
        }
      },
      { key: 'steps' }
    ])
  }
}
class EventList extends Collection {
  model () {
    return Event
  }
}
export { Event, EventList }
