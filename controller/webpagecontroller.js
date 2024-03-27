function webpage1(req, res) {
    res.render('pages/webpage1')
}

function webpage2(req, res) {
    res.render('pages/webpage2')

}
function webpage3(req, res) {
    res.render('pages/webpage3')

}

module.exports = { webpage1, webpage2, webpage3 }