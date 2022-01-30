import { instance} from './api';

export const dialogAPI = {
   createDialog(userId: Number) {
      return instance.put(`/dialogs/${userId}`).then(res => res.data)
   },
   getAllDialogs(){
    return instance.get('/dialogs').then(res => res.data)
   },
   getMessages(userId:Number){
    return instance.get(`dialogs/${userId}/messages`).then(res => res.data)
   },
   sendMessages(userId:Number, message:String){
    return instance.post(`dialogs/${userId}/messages` , {body:message}).then(res => res.data)
   },
}