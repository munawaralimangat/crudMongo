const protectRoute = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    console.log("please log in to continue")
    res.redirect('/login')
}
const allowif = ()=>{
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/dashbord')
}
module.exports = {
    protectRoute,
    allowif,
}