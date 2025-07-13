import SmsAPI from 'src/api/models/sms.js'
import SetAPI from 'src/api/models/set.js'
import SeoAPI from 'src/api/models/Seo.js'
import CartAPI from 'src/api/models/cart.js'
import AuthAPI from 'src/api/models/Auth.js'
import UserAPI from 'src/api/models/user.js'
import TreeAPI from 'src/api/models/tree.js'
import VastAPI from 'src/api/models/Vast.js'
import OrderAPI from 'src/api/models/order.js'
import ShadAPI from 'src/api/models/Shad.js'
import PagesAPI from 'src/api/models/pages.js'
import EwanoAPI from 'src/api/models/Ewano.js'
import YaldaAPI from 'src/api/models/Yalda.js'
import RubikaAPI from 'src/api/models/Rubika.js'
import BonyadAPI from 'src/api/models/bonyad.js'
import TicketAPI from 'src/api/models/ticket.js'
import CouponAPI from 'src/api/models/coupon.js'
import EventsAPI from 'src/api/models/Events.js'
import ContentAPI from 'src/api/models/content.js'
import ProductAPI from 'src/api/models/product.js'
import ForrestAPI from 'src/api/models/Forrest.js'
import CommentAPI from 'src/api/models/comment.js'
import ChannelAPI from 'src/api/models/Channel.js'
import VoucherAPI from 'src/api/models/voucher.js'
import VersionAPI from 'src/api/models/Version.js'
import ContactAPI from 'src/api/models/contact.js'
import PostcardAPI from 'src/api/models/postcard.js'
import AbrishamAPI from 'src/api/models/Abrisham.js'
import ConductorAPI from 'src/api/models/Conductor.js'
import AttributeAPI from 'src/api/models/attribute.js'
import StudyPlanAPI from 'src/api/models/studyPlan.js'
import FileUploadAPI from 'src/api/models/FileUpload.js'
import PageSettingAPI from 'src/api/models/PageSetting.js'
import BlackFridayAPI from 'src/api/models/BlackFriday.js'
import ReferralCodeAPI from 'src/api/models/ReferralCode.js'
import LiveDescriptionAPI from 'src/api/models/LiveDescription.js'
import ContentTimepointAPI from 'src/api/models/ContentTimepoint.js'
/* Exporting the APIGateway object. */
export const APIGateway = {
  set: new SetAPI(),
  seo: new SeoAPI(),
  sms: new SmsAPI(),
  auth: new AuthAPI(),
  user: new UserAPI(),
  cart: new CartAPI(),
  tree: new TreeAPI(),
  vast: new VastAPI(),
  pages: new PagesAPI(),
  ewano: new EwanoAPI(),
  order: new OrderAPI(),
  yalda: new YaldaAPI(),
  rubika: new RubikaAPI(),
  shad: new ShadAPI(),
  events: new EventsAPI(),
  coupon: new CouponAPI(),
  ticket: new TicketAPI(),
  bonyad: new BonyadAPI(),
  forrest: new ForrestAPI(),
  comment: new CommentAPI(),
  voucher: new VoucherAPI(),
  content: new ContentAPI(),
  contact: new ContactAPI(),
  channel: new ChannelAPI(),
  product: new ProductAPI(),
  version: new VersionAPI(),
  abrisham: new AbrishamAPI(),
  postcard: new PostcardAPI(),
  conductor: new ConductorAPI(),
  attribute: new AttributeAPI(),
  studyPlan: new StudyPlanAPI(),
  fileUpload: new FileUploadAPI(),
  pageSetting: new PageSettingAPI(),
  blackFriday: new BlackFridayAPI(),
  referralCode: new ReferralCodeAPI(),
  liveDescription: new LiveDescriptionAPI(),
  contentTimepoint: new ContentTimepointAPI()
}
