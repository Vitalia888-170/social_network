import { v4 as uuidv4 } from "uuid";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-state";
import { FormAction } from "redux-form";

type ImageType = {
  id: string;
  src: string;
};
type CommentsType = {
  id: string;
  author: string;
  comment: string;
  date: number;
  likes: number;
};
type PostsType = {
  id: string;
  text: string;
  image: ImageType;
  timeCreation: number;
  likesCount: number;
  comments: Array<CommentsType>;
};

let initialState = {
  posts: [] as Array<PostsType>,
};

let postsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "ADD-POST":
      return {
        ...state,
        posts: [
					{	id: uuidv4(),
					text:action.textPost,
					image: { id: uuidv4(), src: "" },
					timeCreation: Date.now(),
					likesCount: 0,
					comments: []
				},
					 ...state.posts],
      };
    default:
      return state;
  }
};

export const actions = {
  addPost: (id:number, textPost: string) => ({ type: "ADD-POST", textPost } as const),
  deletePost: (userId: number) => ({ type: "DELETE-POST", userId } as const),
};

export default postsReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
