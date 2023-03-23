import interceptor from "../AxiosInterceptor"

     export const createQuestion = async (card) => {
        return await interceptor.post("/card/create-card", card);
     }

     export const deleteQuestion = async (cardId) => {
      return await interceptor.delete(`/card/delete-card?cardId=${cardId}`)
     } 

