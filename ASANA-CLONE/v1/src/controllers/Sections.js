// Import Packages
// Import Packages
const httpStatus = require('http-status');
// Import Services
const Service = require('../services/Sections')
const SectionService = new Service()

class Sections {
  index(req, res){
    if (!req.params.projectId) return res.status(httpStatus.NOT_FOUND).send({
      error: 'Proje bilgisi eksik'
    })
    SectionService.list({ project_id: req.params.projectId }).then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(e => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
  
  }

  create(req, res) {

    req.body.user_id = req.user
    SectionService.create(req.body).then(response => {
      res.status(httpStatus.CREATED).send(response);
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
    })
  
  }

  update(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
      error: 'Section id bilgisi eksik'
    })
    SectionService.update(req.body,req.params.id).then(updatedSections => {
      res.status(httpStatus.OK).send(updatedSections)
    }).catch(e => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
  }

  deleteSection(req,res){
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({
      error: 'Section id bilgisi eksik'
    })
    SectionService.delete(req.params.id).then(deletedSection => {
      res.status(httpStatus.OK).send({message: 'Section başarılı bir şekilde silinmiştir'})
    }).catch(e =>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
  }
}


module.exports = new Sections()