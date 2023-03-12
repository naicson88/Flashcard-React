import interceptor from "../AxiosInterceptor"

     export const createQuestion = async (card) => {
        return await interceptor.post("/card/create-card", card);
     }

