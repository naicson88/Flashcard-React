
import interceptor from "../AxiosInterceptor"

     export const getAllFolders = async (page) => {
        const pageNumber = page != null ? '?page='+page : '';
        return await interceptor.get("/folder/paginated-folder-list"+pageNumber)
     }

     export const saveNewFolder = async (folderName, description) => {
         const f = {
                    name: folderName,
                    description: description
                   }
         return await interceptor.post("/folder/create-folder", f);
     }

     export const deleteFolder = async (folderId) => {
        return await interceptor.delete("/folder/remove-folder?folderId="+folderId)
     }
