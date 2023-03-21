
export const createToastrObject = (title, msg, status) => {
    let toastrObj = {
        'title' : title,
        'msg': msg,
        'status': status,
     }
     return toastrObj;
}