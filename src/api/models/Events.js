import { Set } from 'src/models/Set.js'
import { apiV2 } from 'src/boot/axios.js'
import { ProductList } from 'src/models/Product.js'
import APIRepository from '../classes/APIRepository.js'
import { EventResult } from 'src/models/EventResult.js'
import { Event, EventList } from 'src/models/Event.js'
import { MajorList } from 'src/models/Major'

const APIAdresses = {
  base: '/events',
  formBuilder: '/admin/form-builder',
  entekhabReshte: '/entekhab-reshte',
  getInfoByEvent: (eventId) => '/event-result/event/' + eventId,
  getEventById: (eventId) => '/events/' + eventId,
  getEventMajors: (eventId) => '/events/' + eventId + '/majors',
  sinaPishraftOrder: '/sinaPishraft/order',
  sinaPishraftProducts: '/sinaPishraft/products',
  eventsProducts: (eventId) => `/events/${eventId}/products`,
  eventsProductsAdmin: (eventId) => `/admin/events/${eventId}/products`,
  eventAdvisor: (eventId) => `/events/${eventId}/advisor`,
  hasPurchased: (eventId) => `/events/${eventId}/purchase`
}
export default class EventsAPI extends APIRepository {
  constructor () {
    super('Chatr', apiV2, 'chatr', {}, APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      formBuilder: this.name + this.APIAdresses.formBuilder,
      eventsProducts: (eventId) => this.name + this.APIAdresses.eventsProducts(eventId),
      eventsProductsAdmin: (eventId) => this.name + this.APIAdresses.eventsProductsAdmin(eventId),
      getInfoByEvent: (eventId) => this.name + this.APIAdresses.getInfoByEvent(eventId),
      getEventById: (eventId) => this.name + this.APIAdresses.getEventById(eventId),
      getEventMajors: (eventId) => this.name + this.APIAdresses.getEventMajors(eventId),
      eventAdvisor: (eventId) => this.name + this.APIAdresses.eventAdvisor(eventId),
      hasPurchased: (eventId) => this.name + this.APIAdresses.hasPurchased(eventId)
    }
    this.eventList = [
      {
        route: { name: 'UserPanel.Asset.Abrisham.Progress' },
        title: 'راه ابریشم 1',
        logo: {
          main: 'https://nodes.alaatv.com/upload/abrisham-panel-logotype.png',
          desktop: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/abrisham1-11727515156.png',
          mobile: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/mabrisham11727515982.png'
        },
        groups: [
          'alaa'
        ]
      },
      {
        id: 22,
        name: 'abrisham2',
        title: 'راه ابریشم ۲',
        logo: {
          main: 'https://nodes.alaatv.com/upload/alaaPages/2024-05/11714569767.png',
          desktop: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/abrisham1-21727515207.png',
          mobile: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/mabrisham21727516205.png'
        },
        study_plan: {
          category_id: 1,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: true,
        showStudyPlanIfHasPurchased: true,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 26,
        name: 'chatre-nejat',
        title: 'چتر نجات',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-05/21714569572.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/ch11727515394.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/mch21727516224.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 24,
        name: 'sin8',
        title: 'سین 8',
        logo: 'https://nodes.alaatv.com/upload/landing/SIN8/logo_sin8_2.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/sin81727515439.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/msin81727516249.png',
        study_plan: {
          category_id: 2,
          first_pamphlet: true,
          educational_layers: ['گام اول', 'گام دوم', 'گام سوم']
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: true,
        showStudyPlan: true,
        groups: [
          'alaa'
        ]
      },
      {
        id: 18,
        name: 'emtahan-nahaee-9',
        title: 'امتحانات نهایی نهم',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-05/31714569432.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/emtehan91727515513.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/m91727516135.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 29,
        name: 'emtehan-nahaee-10',
        title: ' امتحان نهایی دهم',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-04/101714226273.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/sh101727515590.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/m101727516275.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 30,
        name: 'emtehan-nahaee--11',
        title: ' امتحان نهایی یازدهم',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-04/111714226302.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/sh121727515707.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/m111727516307.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 15,
        name: 'emtahan-nahaee',
        title: 'امتحانات نهایی دوازدهم',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-05/12om1714569816.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/sh111727515673.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/msh121727516334.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 34,
        name: 'haftane',
        title: 'هفتانه یازدهم',
        logo: 'https://nodes.alaatv.com/upload/alaaPages/2024-08/111724667763.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/haftane1727515777.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/mhaftane1727516357.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: true,
        showStudyPlanIfHasPurchased: true,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 28,
        name: '110',
        title: '110',
        logo: 'https://nodes.alaatv.com/upload/landing/panel/110-logo.png',
        desktopImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/1101727515800.png',
        mobileImg: 'https://nodes.alaatv.com/upload/alaaPages/2024-09/m1101727516371.png',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'alaa'
        ]
      },
      {
        id: 27,
        name: 'ehsan-abrisham2',
        title: 'راه ابریشم ۲ بنیاد احسان',
        logo: 'https://nodes.alaatv.com/upload/landing/RAHABRISHAM/logo-abrisham2.png',
        desktopImg: '',
        mobileImg: '',
        study_plan: {
          category_id: null,
          first_pamphlet: true,
          educational_layers: []
        },
        showDashboardIfHasPurchased: false,
        showStudyPlanIfHasPurchased: false,
        showDashboard: false,
        showStudyPlan: false,
        groups: [
          'emtahan'
        ]
      }
    ]
  }

  checkHasPurchased (eventId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.hasPurchased(eventId),
      cacheKey: this.CacheList.hasPurchased(eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  index (cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(cache && { cache }),
      data: {
        enable: 1,
        has_dashboard: 1
      },
      resolveCallback: (response) => {
        return new EventList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventInfoById (eventId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getEventById(eventId),
      cacheKey: this.CacheList.getEventById(eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Event(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventMajors (eventId, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getEventMajors(eventId),
      cacheKey: this.CacheList.getEventMajors(eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new MajorList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getAlaaPanels () {
    return new Promise((resolve, reject) => {
      if (!this.eventList) {
        reject()
      }

      resolve(this.eventList.filter(item => item.groups.includes('alaa')))
    })
  }

  getEventInfoByName (eventName) {
    return new Promise((resolve, reject) => {
      const event = this.eventList.find(eventItem => eventItem.name === eventName)
      if (!event) {
        reject()
      }

      resolve(event)
    })
  }

  getEventProductsAdmin (data, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventsProductsAdmin(data.eventId),
      cacheKey: this.CacheList.eventsProductsAdmin(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  getEventsProducts (data, cache = { TTL: 500 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventsProducts(data.eventId),
      cacheKey: this.CacheList.eventsProducts(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }

  getSinaProducts (data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.sinaPishraftProducts,
      resolveCallback: (response) => {
        return new ProductList(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      },
      data: data.data
    })
  }

  setSinaProduct (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.sinaPishraftOrder,
      data: this.getNormalizedSendData({
        product_id: null, // Number
        sina_code: null // String
      }, data),
      resolveCallback: (response) => {
        return {
          product: response.data.product,
          panel_name: response.data.panel_name
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  formBuilder (data = {}, cache = { TTL: 1000 }) {
    const routeWithParams = function (defaultRoute, payload) {
      if (!Array.isArray(payload.types)) {
        const types = []
        payload.types.forEach(type => {
          types.push(type)
        })
        return defaultRoute.concat('?types[]=', types)
      }
      return defaultRoute + '?types[]=' + payload.types.join('&types[]=')
    }
    const requestRoute = routeWithParams(this.APIAdresses.formBuilder, {
      types: data.params // array or number
    })
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: requestRoute,
      cacheKey: this.CacheList.formBuilder,
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getEventsAdvisor (data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.eventAdvisor(data.eventId),
      cacheKey: this.CacheList.eventAdvisor(data.eventId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Set(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
    // const products = new Promise((resolve, reject) => {
    //   const productList = fake.fakeData(product, 5)
    //   resolve(productList)
    // })
    // return products
  }

  getKonkurResultByEvent (data = {}, cache = 1000) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getInfoByEvent(data.eventId),
      cacheKey: this.CacheList.getInfoByEvent(data.eventId),
      data: this.getNormalizedSendData({
        user_id: null // Number
      }, data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new EventResult(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
