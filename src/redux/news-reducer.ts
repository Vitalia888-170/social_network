import { newsAPI } from "./../api/news-api";
import { BaseThunkType, InferActionsTypes } from "./redux-state";
import { FormAction } from "redux-form";

let initialState = {
  topNews: [] as Array<Object>,
};

let newsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET-NEWS":
      return {
        ...state,
        topNews: action.news,
      };
    default:
      return state;
  }
};

export const actions = {
  setNews: (news: Array<Object>) => ({ type: "SET-NEWS", news } as const),
};

export const getActualNews = (): ThunkType => {
  return async (dispatch: any) => {
    let data = await newsAPI.getNews();
    dispatch(actions.setNews(data.articles));
  };
};

export const getSearchingNews = (searchString: String): ThunkType => {
  return async (dispatch: any) => {
    let data = await newsAPI.searchNews(searchString);
		dispatch(actions.setNews(data.articles));
  };
};

export default newsReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
