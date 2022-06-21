// Import Packages
const express = require('express');
const fileUpload = require('express-fileupload')
const helmet = require('helmet');
const path = require('path')

const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events')

config();
loaders();
events();

// Import Routes
const {ProjectRoutes, UserRoutes, SectionRoutes, TaskRoutes} = require('./routes')

const errorHandler = require('./middlewares/errorHandler')

// Initialize Express
const app = express()

// Middlewares
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')))
app.use(express.json())
app.use(helmet())
app.use(fileUpload())

// Declare Port
const PORT = process.env.APP_PORT


// Listen Server
app.listen(PORT, () => {
  console.log(`${PORT} portunda server çalışıyor`)
  app.use('/projects', ProjectRoutes)
  app.use('/users', UserRoutes)
  app.use('/sections', SectionRoutes)
  app.use('/tasks', TaskRoutes)

  app.use((req, res, next) => {
    const error = new Error('Aradığınız sayfa bulunamadı')
    error.status = 404;
    next(error);
  })

  app.use(errorHandler)
  
})