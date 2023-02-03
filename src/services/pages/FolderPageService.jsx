
import interceptor from "../AxiosInterceptor"

     export const getAllFolders = async () => {
        return await interceptor.get("/folder/list-folder")
     }

