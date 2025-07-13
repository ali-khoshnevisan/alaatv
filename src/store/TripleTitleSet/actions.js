import { APIGateway } from 'src/api/APIGateway.js'

const actions = {
  showConfirmDialog: (context, newInfo) => {
    context.commit('AppLayout/showConfirmDialog', newInfo)
  },
  getSet: (context, productId) => {
    context.commit('toggleSetListLoading')
    APIGateway.product.getSets(productId)
      .then((setList) => {
        const oldSelectedTopic = context.getters.selectedTopic
        const normalizedSets = setList.list.map(set => {
          if (set.short_title !== null) {
            const splitted = set.short_title.split('-')
            if (splitted.length === 4) {
              const productName = splitted[0].trim()
              const topicName = splitted[1].trim()
              const gradeName = splitted[2].trim()
              const setName = splitted[3].trim()
              set.short_title = productName + '-' + topicName + '-' + gradeName + '-' + setName
            } else {
              const productName = splitted[0] ? splitted[0].trim() : 'متفرقه'
              const topicName = splitted[1] ? splitted[1].trim() : 'متفرقه'
              const setName = splitted[2] ? splitted[2].trim() : 'متفرقه'
              set.short_title = productName + '-' + topicName + '-' + setName
            }

            return set
          } else {
            set.short_title = 'عنوان ندارد'
            return set
          }
        })
        const topicList = normalizedSets.map(set => {
          const splitted = set.short_title.split('-')
          if (splitted.length === 4) {
            return splitted[1] + '-' + splitted[2]
          }
          return splitted[1] ? splitted[1] : 'متفرقه' // topicName
        })
          .filter((topic, topicIndex, topics) => topics.findIndex(topicItem => topicItem === topic) === topicIndex)

        const selectedTopicIndex = topicList.findIndex(item => item === oldSelectedTopic)
        const targetSelectedTopicIndex = selectedTopicIndex > -1 ? selectedTopicIndex : 0
        const searchList = []
        normalizedSets.forEach(set => {
          searchList.push(set.short_title.split('-').slice(1).join('-'))
        })
        context.commit('updateSetSearchList', searchList)
        context.commit('updateSetList', normalizedSets)
        context.commit('updateTopicList', topicList)
        context.commit('updateSelectedTopic', topicList[targetSelectedTopicIndex])
        context.commit('toggleSetListLoading')
      }).catch(() => {
        context.commit('toggleSetListLoading')
      })
  },
  setSelectedTopic: (context, topic) => {
    context.commit('updateSelectedTopic', topic)
  },
  updateSet: (context, setId) => {
    context.commit('toggleSetLoading')
    APIGateway.set.getContents(setId)
      .then(contentList => {
        context.commit('updateSet', { contentList, setId })
        context.commit('toggleSetLoading')
      })
      .catch(() => {
        context.commit('toggleSetLoading')
      })
  },
  setSelectedProduct: (context, product) => {
    context.commit('setSelectedProduct', product)
  },
  getSelectedProduct: (context, payload) => {
    context.commit('updateProductLoading', true)
    return new Promise((resolve, reject) => {
      APIGateway.events.getEventsProducts({ eventId: payload.eventId, data: { products: [payload.productId] } })
        .then(product => {
          context.commit('setSelectedProduct', product.list[0])
          context.commit('updateProductLoading', false)
          resolve(product.list[0])
        })
        .catch((error) => {
          context.commit('updateProductLoading', false)
          reject(error)
        })
    })
  },
  getSelectedContent: (context, contentId) => {
    APIGateway.content.show(contentId).then(res => {
      context.commit('setSelectedContent', res)
    }).catch(() => { })
  }
}

export default actions
