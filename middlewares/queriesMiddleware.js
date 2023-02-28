
/*
 Extracts parameters from the request query string, processes them and then
 re-inserts them into the request object to be used by the controllers
*/
const setQueryOpts = async (req, res, next) => {

    try{

        /* Extract the pagination options from the query String if set */
        let page = req.query.page ? parseInt(req.query.page) : 1
        let limit = req.query.limit ? parseInt(req.query.limit) : 10

        /* Extract the sorting options if set */
        let sortBy = req.query.sort_by ? req.query.sort_by : null
        let sortOrder = req.query.sort_direction ? req.query.sort_direction : 'desc'

        /* Extract the filter options if set */
        let filterBy = req.query.filter_by ? req.query.filter_by : null
        let filterValue = req.query.filter_values ? req.query.filter_values : null

        /* ensure that the pagination options are set within desired ranges */
        if(limit < 1) limit = 10
        if(limit > 100 ) limit = 100
        if(!page || page < 1) page = 1

        /* Add the details to the request object */
        req.page = page
        req.limit = limit
        req.offset = parseInt((page - 1) * limit)

        /* If set ensure that sorting options are set as we expect them to be */
        if(sortBy){
            if(!sortOrder || typeof sortOrder !== 'string') sortOrder = 'desc'

            /* Add the options to the request */
            req.sortBy = sortBy
            req.sortOrder = sortOrder
        }

        /* Only add the filter to the query if a value has been set as well */
        if(filterBy){
            if(filterValue){
                req.filterBy = filterBy
                req.filterValue = filterValue 
            }
        }

        /* go to the next middleware */
        next()

    } catch(e) {
        /* Send any errors back out the the error handler */
        next(e)
    }

}

module.exports = {
    setQueryOpts
}