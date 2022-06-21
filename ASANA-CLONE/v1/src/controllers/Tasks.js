// Import Packages
const httpStatus = require('http-status');

// Import Services
const Service = require('../services/Tasks');
const TaskService = new Service()

class Tasks {
  index(req, res){
    TaskService.list().then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error =>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

  create(req, res) {
    req.body.user_id = req.user
    TaskService.create(req.body).then(createdTask =>{
      res.status(httpStatus.CREATED).send(createdTask)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }) 
  }

  update(req, res) {
    if(!req.params.id) return res.status(httpStatus.NOT_FOUND).send({
      error: 'Task id bilgisi eksik' 
    })
    TaskService.update(req.body, req.params.id).then(response =>{
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

  deleteTask(req, res) {
    if(!req.params.id) return res.status(httpStatus.NOT_FOUND).send({
      error: 'Task id bilgisi eksik'
    })
    TaskService.update(req.params.id).then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

  
  makeComment(req, res) {
    
    const userComment = {
      ...req.body,
      user_id: req.user,
      commented_at: new Date()
    }
    TaskService.addComment(userComment, req.params.id).then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }) 
  }

  deleteComment(req,res) {
    const deletedComment = {
      ...req.body,
      user_id: req.user
    }
    TaskService.removeComment(deletedComment, req.params.id).then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

  makeSubTask(req, res) {
    if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: 'Task id bilgisi gereklidir'})
    TaskService.create({...req.body, user_id: req.user}).then(response => {
      TaskService.addSubTask(response, req.params.id).then(subResponse => {
        res.status(httpStatus.OK).send(response)
      }).catch(error => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  
  }


  fetchTask(req, res) {
    if(!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: 'Task id bilgisi eksik'})
    TaskService.read({_id: req.params.id}).then(task => {
      if(!task) return res.status(httpStatus.NOT_FOUND).send({error: 'Task bulunamadı'})
      res.status(httpStatus.OK).send(task)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

}


module.exports = new Tasks()