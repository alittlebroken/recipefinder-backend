const passport = require('passport')
const checkRoles = (roles) => (req, res, next) => {
   
    /* We should check we are logged in first */
    if(!req.user){
        return next({
            status: 401,
            success: false,
            message: 'Must be logged in to access the specified route'
        })
    }

    /* Check the specified roles against any the user has */
    const rolesFound = roles.includes(req?.user?.roles);
    
    if(!rolesFound){
        return next({
            status: 403,
            success: false,
            message: 'You are not authorized to access the specified route'
        })
    }

    /* As all seems ok, lets just pass on to the next middleware */
    return next();

}

/* Verify the JWT token the user is sending */
const checkToken = async (req,res,next) => {
    return await passport.authenticate(
        'jwt',
        { session: false },
        (err, user, info) => {
            if(err || !user){
                if(info?.message === 'jwt expired'){
                    return res.status(401).json({ 
                        status: 401,
                        success: false,
                        message: 'Your access token has expired, please login'
                    })
                } else if(info?.message === 'No auth token'){
                    return res.status(401).json({
                        status: 401,
                        success: false,
                        message: 'You are not authorized to access this resource, please login'
                    })
                } else {
                    return next(info?.message)
                }
            } else {
                /* Assign the user to the req object */
                
                req.user = user.user
                return next()
            }
        }
    )(req, res, next)
}

module.exports = {
    checkRoles,
    checkToken
}