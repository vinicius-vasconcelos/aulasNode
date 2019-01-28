module.exports = app => app.get('/', (req, res) => app.app.controllers.ctrHome.index(app, req, res));
