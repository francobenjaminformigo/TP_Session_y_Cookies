function checkCookie(req,res,next) {
    res.locals.isLogged = false
   
    let colorFromCookie = req.cookies.backgroundColor;
    let nombreFromCookie = req.cookies.name;
   
   if (colorFromCookie) {
        req.session.user = {
            backgroundColor : colorFromCookie,
            name : nombreFromCookie
        }
   }

   if (req.session.user) {
         res.locals.isLogged= true;
         res.locals.user = req.session.user
   }
   next()
}

module.exports= checkCookie;