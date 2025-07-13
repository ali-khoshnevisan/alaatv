import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { Order } from 'src/models/Order'

export default class OrderAPI extends APIRepository {
  constructor () {
    super('order', apiV2)
    this.APIAdresses = {
      orderCoupon: '/orderCoupon',
      getProductsShouldSelect: '/orderproduct/get-products-should-select',
      selectProductBetweenMulti: '/orderproduct/select-product-between-multi',
      create: '/reqres/api/users',
      edit: '/admin/order',
      index: '/admin/order',
      show: '/admin/order',
      status: '/admin/form-builder?types[]=paymentStatuses',
      orderProduct: (id) => `/admin/orderproduct/${id}`,
      orderById: (id) => '/user/order/' + id
    }
  }

  getOrderById (orderId) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.orderById(orderId),
      resolveCallback: (response) => {
        return new Order(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getPaymentStatus () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.status,
      resolveCallback: (response) => {
        return response.data.data.paymentStatuses
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  SubmitCouponOnOrder (data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.orderCoupon,
      data: this.getNormalizedSendData({
        code: '', // String
        order_id: '' // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  DeleteCouponFromOrder (data = {}) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderCoupon,
      data: this.getNormalizedSendData({
        order_id: '' // Number
      }, data.data),
      resolveCallback: (response) => {
        return response
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  AdminDeleteOrderProduct (orderProductId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.APIAdresses.orderProduct(orderProductId),
      resolveCallback: (response) => {
        return response.data.message // String
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getProductsShouldSelect () {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getProductsShouldSelect,
      resolveCallback: (response) => {
        return response.data // Array of Object
        /*
        [
          ...
          {
            orderId: 1
            packages: [
              ...
              {
                packageProductId: 243,
                packageTitle: 'ابریشم ۲',
                products: [
                  ...
                  {
                      "productId": 10,
                      "name": "فیزیک ۱",
                      "shortDescription": "توضیح خلاضه فیزیک ۱",
                      "longDescription": "توضیح طولانی فیزیک ۱",
                      "image": "..."
                  },
                  ...
                ]
              }
              ...
            ]
          }
          ...
        ]
        */
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  selectProductBetweenMulti (data) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.selectProductBetweenMulti,
      data: {
        data // Array of Object
        /*
        [
          ...
          {
            orderId: 1,
            packageProductId: 1,
            productId: 1
          },
          {
            orderId: 1,
            packageProductId: 1,
            productId: 1
          },
          ...
        ]
        */
      },
      resolveCallback: (response) => {
        return response.data
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
