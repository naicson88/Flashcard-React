import interceptor from "../AxiosInterceptor"

     export const deleteSubject = async (subjectId) => {
        return await interceptor.delete("/subject/delete-subject?subjectId="+subjectId);
     }

     export const getById = async (subjectId) => {
         return await interceptor.get("/subject/get-subject?subjectId="+subjectId);
     }
