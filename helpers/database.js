/*
 * Function using queryBuilder to allow us to
 * add filtering to a query
 */
const buildFilters = (queryBuilder, filters) => {

    /* Make sure to only perform any work if we actually 
     * have a filter to apply
     */
    if(filters){
        /* The filters should be passed to us as an object with each key 
         * being a new filter and it's content to filter by 
        */

        /* Parse the filter we are working with */
        let parsedFilters = JSON.parse(filters)

        /* How many filters do we have */
        let numParsedFilters = Object.getOwnPropertyNames(parsedFilters)

        /* Loop through each filter and apply it */
        numParsedFilters.map(filter => {
            /* Check for presence of an ID field as this could contain 
             * multiple ids */
            if(filter === 'id' || filter === 'ids' || filter === 'userId' || filter === 'userid'){

                /* All items for id or ids need to be integers so we need
               to ensure they are not strings otherwise the length 
               function when it gets to double digits will report
               incorrectly and cause issues */
                let idList = []
                if(Array.isArray(parsedFilters[filter])) {
                    parsedFilters[filter].map(listItem => {
                    idList.push(parseInt(listItem))
                })
                } else {
                    idList.push(parseInt(parsedFilters[filter]))
                }

                /* Check to see if we have multiple values to
                 * filter by
                 */
                if(idList.length > 1){

                    /* Use whereIn, alos check if we are filtering on id or userid */
                    if(filter === 'id' || filter === 'ids'){
                        queryBuilder.whereIn('id', idList)
                    } else if( filter === 'userId'){
                        queryBuilder.whereIn('userId', idList)
                    } else if( filter === 'userid'){
                        queryBuilder.whereIn('userid', idList)
                    }
                    

                } else {

                    /* We know now we only have one value, but we still
                     * need to check if that value has been sent to us
                     * as an array
                     */
                    if(Array.isArray(idList)){
                        /* Ensure we filter on the correct field */
                        if(filter === 'id' || filter === 'ids'){
                            queryBuilder.where('id', idList[0])
                        } else if( filter === 'userId'){
                            queryBuilder.where('userId', idList[0])
                        } else if( filter === 'userid'){
                            queryBuilder.where('userid', idList[0])
                        }
                    } else {
                        /* Ensure we filter on the correct field */
                        if(filter === 'id' || filter === 'ids'){
                            queryBuilder.where('id', idList)
                        } else if( filter === 'userId'){
                            queryBuilder.where('userId', idList)
                        } else if( filter === 'userid'){
                            queryBuilder.where('userid', idList)
                        }
                    }

                }

            } else {
                /* Non id filed, so next we need to determine if the 
                 * value is of type integer or not so we can add the 
                 * appropriate filter operand*/
                if(typeof parsedFilters[filter] !== 'string' || filter === 'resourceid'){
                    queryBuilder.where(filter, '=', parseInt(parsedFilters[filter]))
                } else {
                    queryBuilder.where(filter, 'ilike', `%${parsedFilters[filter]}%`)
                }

            }

        })


    }

}

/*
 * Function to use queryBuilder to allow us to add
 * sorting to a query
 */
const buildSort = (queryBuilder, sort) => {

    if(sort !== undefined && sort !== null){
        if(sort.sortBy === undefined) sort.sortBy = 'id'
        if(sort.sortOrder === undefined) sort.sortOrder = 'ASC'
        queryBuilder.orderBy(sort.sortBy, sort.sortOrder)
    } 

}

/* Function using queryBuilder to set pagination on any results returned */
const buildLimit = (queryBuilder, limit) => {
    if(limit !== null){
        queryBuilder.limit(limit)
    }
}

module.exports = {
    buildFilters,
    buildSort,
    buildLimit
}