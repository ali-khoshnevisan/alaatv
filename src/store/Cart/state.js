import { Cart } from 'src/models/Cart'
import { Product } from 'src/models/Product.js'

export default function () {
  return {
    cart: new Cart(),
    draftProduct: new Product()
  }
}
