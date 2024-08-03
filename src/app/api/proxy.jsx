import { getToken } from "../../lib/auth";


export default class ApiProxy {

    static async getHeaders(requireAuth){
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    const authToken = getToken();

    //Update header if authToken is available
    if(authToken && requireAuth){
        headers["Authorization"] = `Bearer ${authToken}`
    }//end if

    return headers

    }//end getHeaders

    static async handleFetch(endpoint, requestOptions) {
        let data = {}
        let status = 500

        try {
            const response = await fetch(endpoint, requestOptions)
            data = await response.json()
            status = response.status

            
        } catch (error) {
            data = {message: "Cannot reach Django API Server", 
                error: error
            }
            status = 500
        }//end catch

        return {data, status}
        
    }//end handleFetch

    static async post(endpoint, object, requireAuth) {
        const jsonData = JSON.stringify(object)
        const headers = await ApiProxy.getHeaders(requireAuth)
        
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: jsonData
        }//end requestOptions

        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }//end async post

    static async get(endpoint, requireAuth) {
        const headers = await ApiProxy.getHeaders(requireAuth)
        const requestOptions = {
            method: "GET",
            headers: headers
        }//end requestOptions

        return await ApiProxy.handleFetch(endpoint, requestOptions)
    }//end async post

}//end ApiProxy