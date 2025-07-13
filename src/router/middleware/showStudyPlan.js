import { APIGateway } from 'src/api/APIGateway'

export default function showStudyPlan ({ next, store, to }) {
  const user = store.getters['Auth/user']
  const isAdmin = user.hasPermission('insertStudyPlan') || user.hasPermission('updateStudyPlan') || user.hasPermission('deleteStudyPlan')
  const checkHasPurchased = function (eventId) {
    return new Promise((resolve, reject) => {
      APIGateway.events.checkHasPurchased(eventId)
        .then(purchasedProducts => {
          if (purchasedProducts.length > 0) {
            resolve(purchasedProducts)
          } else {
            reject()
          }
        })
        .catch(() => {
          reject()
        })
    })
  }
  if (isAdmin) {
    return next()
  }
  const eventInfo = function () {
    APIGateway.events.getEventInfoByName(to.params.eventName)
      .then(info => {
        if (info.showStudyPlan) {
          return next()
        }
        if (info.showStudyPlanIfHasPurchased) {
          checkHasPurchased(info.id)
            .then(() => {
              return next()
            })
            .catch(() => {
              return next({ name: 'login' })
            })
        }
      })
      .catch(() => {
        return next({ name: 'login' })
      })
  }

  eventInfo()
}
