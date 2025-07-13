import { Model, Collection } from 'js-abstract-model'
import { CommentList } from 'src/models/Comment.js'

class Timepoint extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'photo' },
      { key: 'title' },
      {
        key: 'comments',
        relatedModel: CommentList
      }
    ])
  }
}

class TimepointList extends Collection {
  model () {
    return Timepoint
  }
}

export { Timepoint, TimepointList }
