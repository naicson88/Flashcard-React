import interceptor from "../AxiosInterceptor"

     export const getToDo = async () => {
        return await interceptor.get("/todo/get-todo")
     }

     export const updateToDo = async (day, task) => {
      return await interceptor.put(`/todo/update-todo?day=${day}`, task);
     }

     export const removeTask = async (day, index) => {
      return await interceptor.delete(`/todo/remove-task?day=${day}&index=${index}`)
     }

     export const updateDailyTasks = async (dailyTasks) => {
      return await interceptor.put("/todo/update-daily-tasks", dailyTasks);
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
