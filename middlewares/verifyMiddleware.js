const checkRoles = (...roles) => (req, res, next) => {

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

module.exports = {
    checkRoles
}