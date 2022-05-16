const tutorailRouts = require('./tutorial.routes')
const teacherRoutes = require('./teacher.routes')
const imageRoutes = require('./image.routes')
const categoryRoutes = require('./category.routes')
const articleRoutes = require('./article.routes')
const authorRoutes = require('./author.routes')
const routes = [
    ...articleRoutes,
    ...categoryRoutes,
    ...tutorailRouts,
    ...teacherRoutes,
    ...imageRoutes,
    ...authorRoutes
]
module.exports = routes