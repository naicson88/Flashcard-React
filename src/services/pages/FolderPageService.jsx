
import interceptor from "../AxiosInterceptor"

     export const getAllFolders = async () => {
        return await interceptor.get("/folder/list-folder")
     }

     export const saveNewFolder = async (folderName, description) => {
         const f = {
                    name: folderName,
                    description: description
                   }
         return await interceptor.post("/folder/create-folder", f);
     }
