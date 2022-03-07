import { dialogAPI } from "../api/dialogs-api";
import { MessagesType } from "../types/types";
import { InferActionsTypes } from "./redux-state";

type DialogsType={
	hasNewMessages: boolean,
id: number,
lastDialogActivityDate: string,
lastUserActivityDate: string,
newMessagesCount: number,
photos: {
	small:string,
	large:string
}
userName:string
}
let initialState = {
  dialogs: [
    {
      hasNewMessages:false,
      id: 0,
      lastDialogActivityDate:'',
      lastUserActivityDate: '',
      newMessagesCount: 0,
      photos: {
        small:'https://avatars.githubusercontent.com/u/6412038?s=200&v=4',
        large:'https://avatars.githubusercontent.com/u/6412038?s=200&v=4'
      },
      userName:'React Developers'
    }
  ] as Array<DialogsType>,
  messages:[],
  dialogsUserId:0
};

let dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SET-DIALOGS":
      return {
        ...state,
        dialogs: action.dialogList ? [...state.dialogs, ...action.dialogList] : [state.dialogs[0]]
      }
        case "SET-ACTUAL-USERID":
          return {
            ...state,
            dialogsUserId:action.userId
          }
          case "SET-MESSAGES":
            return {
              ...state,
              messages:action.messagesList.map((item:any)=>({ id: item.id, message:item.body, userId:item.senderId}))
            }
    default:
      return state;
  }
};

export const actions = {
  setDialogs: (dialogList: any) => ({ type: "SET-DIALOGS", dialogList } as const),
  setMessages: (messagesList: any) => ({ type: "SET-MESSAGES", messagesList } as const),
  setActualUserId:(userId:number)=>({type : "SET-ACTUAL-USERID", userId} as const)
};
export const getDialogsThunk = () => {
  return async (dispatch: any) => {
    let data = await dialogAPI.getAllDialogs();
    dispatch(actions.setDialogs(data));
  };
};

export const setDialogsThunk = (userId:number) => {
  return async (dispatch: any) => {
    let data = await dialogAPI.createDialog(userId);
    console.log(data);
  };
};
export const setMessagesThunk=(userId:Number)=>{
  return async(dispatch:any)=>{
    let data = await dialogAPI.getMessages(userId);
    console.log(data);
    dispatch(actions.setMessages(data.items))
  }
}

export const sendUserMessageThunk=(userId:Number, message:String)=>{
  return async(dispatch:any)=>{
    let data = await dialogAPI.sendMessages(userId, message);
    console.log(data);
  }
}


export default dialogReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
