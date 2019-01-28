module.exports.home = (application, req, resp) => {
	resp.render('index', {validacao: {}});
}