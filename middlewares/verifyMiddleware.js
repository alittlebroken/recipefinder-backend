const passport = require('passport')
const userModel = require('../models/userModel');

const checkRoles = (roles) => (req, res, next) => {
   
    /* We should check we are logged in first */
    if(!req.user){
        return next({
            status: 401,
            success: false,
            message: 'Must be logged in to access the specified route'
        })
    }

    /* Check the specified roles against any the user has, convert both to lowercase before comparing */
    let userRole = req.user.roles.toLowerCase()
    
    //const rolesFound = roles.includes(userRole);
    const rolesFound = roles.some(role => role.toLowerCase() == userRole)
    
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
        async (err, user, info) => {
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

                /* Populate the request with a new user object containing the user details 
                 * 
                 * Use the userModel to retrieve the data
                 */
                let userid = user.user ? user.user.id : user.id;
                const foundUser = await userModel.findById(userid)
                
                /* Assign the found user to the req object */
                if(foundUser && foundUser.length > 0){
                    req.user = foundUser[0]
                } else {
                    return res.status(404).json({
                        status: 404,
                        success: false,
                        message: 'No user found matching supplied id, please login'
                    })
                }
                
                return next()

            }

        }
    )(req, res, next)
}

module.exports = {
    checkRoles,
    checkToken
}