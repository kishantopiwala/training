function viewposts(req,res){
    res.render('pages/task11/viewposts')
}

function specificpost(req,res){
    res.render('pages/task11/specificpost')
}
module.exports= { viewposts ,specificpost }