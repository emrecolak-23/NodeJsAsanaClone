// Import Packages
const httpStatus = require('http-status');
const uuid = require('uuid')
const path = require('path')
// Import Servises
// const { register, list, loginUser, modify, deleteUser } = require('../services/Users');
const Projects = require('../services/Projects');
const ProjectService = new Projects();

const Service = require('../services/Users');
const UserService = new Service()
// Import Middlewares
const {passwordToHash, generateAccessToken, generateRefreshToken} = require('../scripts/utils/helper');
// Import Emitter
const eventEmitter = require('../scripts/events/eventEmitter')


class Users {
  create(req, res) {

    req.body.password = passwordToHash(req.body.password);
  
    UserService.create(req.body).then(response => {
      res.status(httpStatus.CREATED).send(response)
    }).catch(error => {
      res.status(httpStatus.BAD_REQUEST).send(error)
    })
  }


  login(req, res){
    req.body.password = passwordToHash(req.body.password)
    UserService.read(req.body)
      .then(user => {
        if(!user) return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kullanıcı bulunamadı'})
        // If user exist
        user =  {
          ...user.toObject(),
          tokens: {
            access_token: generateAccessToken(user),
            refresh_token: generateRefreshToken(user)
          }
        }
        delete user.password
        res.status(httpStatus.OK).send(user)
      })
      .catch(error => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
      })
  }

  index(req, res){
    UserService.list().then(response => {
      res.status(httpStatus.OK).send(response)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    })
  } 


  projectList(req, res) {
    ProjectService.list({user_id:req.user?._id}).then(projects => {
      res.status(httpStatus.OK).send(projects)
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Projeler getirilirken beklenmedik bir hdata oluştu'
      })
    })
  }


  resetPassword(req, res) {

    const new_password = uuid.v4()?.split('-')[0] || `usr-${new Date().getTime()}`
    UserService.updateWhere({email: req.body.email}, {password: passwordToHash(new_password)}).then(user => {
      if (!user) return res.status(httpStatus.NOT_FOUND).send({error: 'Böyle bir kullanıcı bulunmamaktadır'})
      eventEmitter.emit('send_email', {
        to: user.email, // list of receivers
        subject: "Şifre Sıfırlama", // Subject line
        html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayın <br/> Yeni şifreniz <b>${new_password}</b>`, // html body
      });
      res.status(httpStatus.OK).send({
        message: 'Şifre sıfırlama işlemi için kayıtlı eposta adresinize gereken bilgileri gönderdik.'
      })
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Şifre değiştirilirken beklenmedik bir hata oluştu'
      })
    })
  }

  update(req, res) {
    UserService.update(req.body,req.user?._id).then(updatedUser => {
      res.status(httpStatus.OK).send(updatedUser)
    }).catch(()=> {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Güncelleme işlemi sırasında bir problem oluştu'
      })
    })
  }


  remove(req, res) {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).send({message: 'Kullanıcı id bilgisi eksik'})
    }
    UserService.delete(req.params.id).then(deletedUser => {
      if (!deletedUser) {
        return res.status(httpStatus.NOT_FOUND).send({message: 'Kullanıcı bulunamadı'})
      }
      res.status(httpStatus.OK).send({message: 'Kullanıcı başarılı bir şekilde silinmiştir'})
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: 'Kullanıcı silme işleminde beklenmedik bir problem oluştu'})
    })
  }

  changePassword(req, res) {
    req.body.password = passwordToHash(req.body.password)
    UserService.update(req.body, req.user?._id)
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(httpStatus.NOT_FOUND).send({message: 'Böyle bir kullanıcı bulunamadı'})
        }
        res.status(httpStatus.OK).send({message: 'Kullanıcı şifresi başarılı bir şekilde değişmiştir'})
      }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: 'Kullanıcı şifresi değiştirme esnasında beklenmedik bir sorun oluştu'})
      })
  }

  updateProfileImage(req, res) {
    // Resim Kontrol
    if(!req.files.profile_image) {
      return res.status(httpStatus.BAD_REQUEST).send({
        message: 'Lütfen geçerli resim dosyası yükleyiniz'
      })
    }
    const extension = path.extname(req.files.profile_image.name)
    const fileName = `${req.user._id}${extension}`
    const folderPath = path.join(__dirname, '../', 'uploads', 'users', fileName);
    // Upload İşlemi
    req.files.profile_image.mv(folderPath, function(err) {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: err
        })
      }
      // DB Save
      UserService.update(req.user._id, {profile_image: fileName}).then(updatedUser=> {
        res.status(httpStatus.OK).send(updatedUser)
      }).catch(error => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          error: 'Upload işlemi yapıldı fakat kayıt sırasında hata oluştu'
        })
      })
      console.log('resim yüklenmiştir')
    })
  }

}


module.exports = new Users()