class APIFeatures {
    constructor(query, queryString) {
        this.query = query; 
        this.queryString = queryString; 
    }; 
    filter() {
        const queryObj = {...this.queryString}; 
        const excludeFilters = ['sort', 'page','limit','fields']; 

         Object.keys(queryObj).forEach(keyItem => {
            if(excludeFilters.includes(keyItem))
                delete queryObj[keyItem]; 
        }); 
        // TODO : we need to add advanced search 

        this.query.find(queryObj); 
        return this; 
    }
    sort() {
        if (this.queryString.sort)
        {
            const sortBy = this.queryString.sort.split(',').join(" "); 
            this.query.sort(sortBy)
        }
        else 
            this.query.sort('-createdAt'); 
        return this; 
    }
    pagination() {
        const page = +this.queryString.page || 1; 
        const limit = +this.queryString.limit || 20; 
        const skip = (page - 1) * limit; 

        this.query.skip(skip).limit(limit); 

        return this 
    }
    limitFields() {
        if (this.queryString.fields)
        {
            const fields = this.queryString.fields?.split(',')?.join(' '); 
            this.query.select(fields); 
        }
        else 
            this.query.select('-_v'); 
        return this; 

    }
    async getPaginationInfo(Model) {
        const page = +this.queryString.page || 1; 
        const limit = +this.queryString.limit || 20; 

        
        // applying the query to count how much elements will return and calc info based on 
        const filter = this.query.getFilter(); 
        const totalCount = await Model.countDocuments(filter); 
        const totalPages = Math.ceil( totalCount/limit );
        
        return {
            totalPages, 
            totalCount, 
            currentPage : page, 
            limit, 
            hasNextPage : page < totalPages, 
            hasPrevPage : page > 1
        }

    }
}


module.exports = APIFeatures; 