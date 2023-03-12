import interceptor from "../AxiosInterceptor"

     export const deleteSubject = async (subjectId) => {
        return await interceptor.delete("/subject/delete-subject?subjectId="+subjectId);
     }

