const queries = require('../middlewares/queriesMiddleware')

describe('queriesMiddleware', () => {

    beforeEach(() => {

    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('setQueryOpts', () => {

        beforeEach(() => {

            /* Set the request, response and next object mocks */
            mockReq = {};
            mockResponse = () => {
                const response = {};
                response.status = jest.fn().mockReturnValue(response);
                response.json = jest.fn().mockReturnValue(response);
                return response;
            }
            mockRes = mockResponse();
            mockNxt = jest.fn();

        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should set all query options correctly in the request', async () => {

            /* Setup */
            // Set the values passed in via the request query params
            const queryParams = {
                sort_by: 'created_at',
                sort_direction: 'asc',
                filter_by: 'open',
                filter_values: 'yes',
                page: 1,
                limit: 2
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            /* Execute */
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            /* Assert */

            // Check that all expected options have been set on the request
            expect(mockReq.sortBy).toBeDefined()
            expect(mockReq.sortBy).toEqual('created_at')

            expect(mockReq.sortOrder).toBeDefined()
            expect(mockReq.sortOrder).toEqual('asc')

            expect(mockReq.filterBy).toBeDefined()
            expect(mockReq.filterBy).toEqual('open')

            expect(mockReq.filterValue).toBeDefined()
            expect(mockReq.filterValue).toEqual('yes')

            expect(mockReq.page).toBeDefined()
            expect(mockReq.page).toEqual(1)

            expect(mockReq.limit).toBeDefined()
            expect(mockReq.limit).toEqual(2)

            expect(mockReq.offset).toBeDefined()
            expect(mockReq.offset).toEqual(0)

            // if all is OK then next should be called
            expect(mockNxt).toHaveBeenCalled()

        }) 

        it('should set default pagination values if not set', async () => {

            // Setup
            const queryParams = {
                sort_by: 'created_at',
                sort_direction: 'asc',
                filter_by: 'open',
                filter_values: false,
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            // Execute
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            // Assert
            expect(mockReq.page).toBeDefined()
            expect(mockReq.page).toEqual(1)

            expect(mockReq.limit).toBeDefined()
            expect(mockReq.limit).toEqual(10)

            expect(mockReq.offset).toBeDefined()
            expect(mockReq.offset).toEqual(0)

            expect(mockNxt).toHaveBeenCalled()

        })

        it('should ensure that the limit if defined is set in the correct format', async () => {

            /* Setup */
             // Set the values passed in via the request query params
             const queryParams = {
                page: 1,
                limit: 2
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            /* Execute */
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            /* Assert */
            expect(mockReq.limit).toBeDefined()
            expect(mockReq.limit).toEqual(2)

            expect(mockNxt).toHaveBeenCalled()

        })

        it('should ensure the limit is not set below 1 if it is defined', async() => {

            /* Setup */
             // Set the values passed in via the request query params
             const queryParams = {
                page: 1,
                limit: -2
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            /* Execute */
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            /* Assert */
            expect(mockReq.limit).toBeDefined()
            expect(mockReq.limit).toBe(10)

            expect(mockNxt).toHaveBeenCalled()

        })

        it('should ensure the limit is not set too high if it is defined', async () => {

            // Setup
            // Setup
            const queryParams = {
                page: 1,
                limit: 250
            }

            // Attach the query params to the request object
            mockReq.query = queryParams

            // Execute
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            // Assert
            expect(mockReq.limit).toBeDefined()
            expect(mockReq.limit).toEqual(100)

            expect(mockNxt).toHaveBeenCalled()

        })

        it('should ensure that sort direction is set if a sort_column is set as well', async () => {

            /* Setup */

             // Set the values passed in via the request query params
             const queryParams = {
                sort_by: 'created_at',
                page: 1,
                limit: 10
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            /* Execute */
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            /* Assert */
            expect(mockReq.sortBy).toBeDefined()
            expect(mockReq.sortBy).toEqual('created_at')

            expect(mockReq.sortOrder).toBeDefined()
            expect(mockReq.sortOrder).toEqual('desc')

            expect(mockNxt).toHaveBeenCalled()

        })

        it('should ensure that a filter is skipped if no filter value is set', async () => {

            /* Setup */
             // Set the values passed in via the request query params
             const queryParams = {
                filter_by: 'open',
                page: 1,
                limit: 10
            }

            // Attach the query params to the mocked request object
            mockReq.query = queryParams

            /* Execute */
            await queries.setQueryOpts(mockReq, mockRes, mockNxt)

            /* Assert */
            expect(mockReq.filterBy).toBeUndefined()

            expect(mockReq.filterValue).toBeUndefined()

            expect(mockNxt).toHaveBeenCalled()

        })

    })

})