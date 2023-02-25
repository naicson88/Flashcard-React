import interceptor from "../AxiosInterceptor"

     export const getFolderById = async (id) => {
        return await interceptor.get("/folder/find-by-id?folderId="+id);
     }

    //  export const saveNewFolder = async (folderName, description) => {
    //      const f = {
    //                 name: folderName,
    //                 description: description
    //                }
    //      return await interceptor.post("/folder/create-folder", f);
    //  }

    //  export const deleteFolder = async (folderId) => {
    //     return await interceptor.delete("/folder/remove-folder?folderId="+folderId);
    //  }

    //  export const editFolder = async (folder) => {
    //      return await interceptor.put("/folder/edit-folder", folder);
    //  }
