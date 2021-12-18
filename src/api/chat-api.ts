let subscribers = {
   'received-message': [] as MessagesReceivedType[],
   'changed-status': [] as StatusChangedType[]
}



let ws: WebSocket;
const notifyAboutStatus = (status: StatusType) => {
   subscribers['changed-status'].forEach(s => s(status));
}
const openWebsocketHandler = () => {
   console.log('Websocket is opened');
   notifyAboutStatus('ready');
}

const closeWebsocketHandler = () => {
   console.log('Websocket is closed');
   notifyAboutStatus('pending');
   // setTimeout(createChannel, 3000);
}

const errorHandler = () => {
   notifyAboutStatus('error');
   console.error('Something got wrong! Refresh page')
}
const messageHandler = (e: any) => {
   let newMessages = JSON.parse(e.data);
   subscribers['received-message'].forEach(s => s(newMessages));
}


const cleanUpListeners = () => {
   if (ws) {
      ws.removeEventListener('close', closeWebsocketHandler);
      ws.removeEventListener('message', messageHandler);
      ws.removeEventListener('open', openWebsocketHandler);
      ws.removeEventListener('error', errorHandler);
   }
}
function createChannel() {
   cleanUpListeners();
   ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
   notifyAboutStatus('pending');
   ws.addEventListener('close', closeWebsocketHandler);
   ws.addEventListener('message', messageHandler);
   ws.addEventListener('open', openWebsocketHandler);
   ws.addEventListener('error', errorHandler);
}
export const chatAPI = {
   start() {
      createChannel();
   },
   stop() {
      subscribers['received-message'] = [];
      subscribers['changed-status'] = [];
      cleanUpListeners();
      ws.close();
   },
   subscribe(eventsName: EventsType, callback: MessagesReceivedType | StatusChangedType) {
      //@ts-ignore
      subscribers[eventsName].push(callback);
      return () => {
         //@ts-ignore
         subscribers[eventsName] = subscribers[eventsName].filter(s => s !== callback)
      }
   },
   unsubscribe(eventsName: EventsType, callback: MessagesReceivedType | StatusChangedType) {
      //@ts-ignore
      subscribers[eventsName] = subscribers[eventsName].filter(s => s !== callback);
   },
   send(message: string) {
      ws.send(message);
   }
}


export type MessageType = {
   message: string,
   photo: string,
   userId: number,
   userName: string
}
export type StatusType = 'pending' | 'ready' | 'error';
type MessagesReceivedType = (messages: MessageType[]) => void;
export type StatusChangedType = (status: StatusType) => void;
type EventsType = 'received-message' | 'changed-status'