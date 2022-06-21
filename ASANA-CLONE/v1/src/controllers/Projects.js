// Import Packages
const httpStatus = require('http-status');
// Import service
const Service = require('../services/Projects');
const ProjectService = new Service();

// Import Error
const ApiError = require('../errors/ApiError')

class Projects {

  index(req, res) {
    ProjectService.list().then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  }

  create(req, res){
    req.body.user_id = req.user
    ProjectService.create(req.body).then(response => {
      res.status(httpStatus.CREATED).send(response);
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    })
  }

  update(req, res, next){
    if(!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({message: 'Id bilgisi eksik'})
    }
    ProjectService.update(req.body, req.params.id).then(updatedProject => {
      if(!updatedProject) return next(new ApiError('Böyle bir kayıt bulunamadı', 404))
      res.status(httpStatus.CREATED).send(updatedProject)
    }).catch(error => {
      next(new ApiError(error?.message))
    })
  }

  remove(req, res){
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({message: 'Id bilgisi eksik'})
    }
    ProjectService.delete(req.params.id).then(deletedProject => {
      if (!deletedProject) {
        return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kayıt bulunamamıştır'})
      }
      res.status(httpStatus.OK).send({ message: 'Proje silinmiştir'})
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: 'Silinme işlemi sırasında hata oluştu'})
    })
  }

}


module.exports = new Projects()