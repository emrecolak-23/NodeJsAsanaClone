const BaseService = require('./BaseService');
const BaseModel = require('../models/Tasks');

class Tasks extends BaseService {
  constructor() {
    super(BaseModel)
  }

  list(where) {
    return BaseModel.find(where || {}).populate({
      path: 'user_id',
      select: 'full_name email profile_image'
    })
  }

  read(where) {
    return BaseModel.findOne(where)
    .populate([{
      path: 'user_id',
      select: 'full_name email profile_image'
    },
    {
      path: 'user_id',
      select: 'full_name email profile_image'
    },
    {
      path: 'sub_tasks',
      select: 'title description isCompleted assigned_to due_date order sub_tasks'
    }
    ])
  }

  addComment(data, id) {
    return BaseModel.findByIdAndUpdate(id, {
      $push: {comments: data}
    }, {new: true})
  }

  removeComment(data, id){
    return BaseModel.findByIdAndUpdate(id, {
      $pull : {comments: { user_id: data.user_id, _id: data._id}}
    }, {new: true})
  }

  addSubTask(data, id) {
    return BaseModel.findByIdAndUpdate(id, {
      $push: {sub_tasks : data._id}
    }, {new: true})
  }

}

module.exports = Tasks