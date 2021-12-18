import { usersFollow, actions, usersUnfollow } from './users-reducer';
import { userAPI } from '../api/user-api';
import { ResponseType, resultCodeEnum } from '../api/api';
jest.mock('../api/user-api');
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;
const result: ResponseType = {
   resultCode: resultCodeEnum.Success,
   messages: [],
   data: {}
}
//@ts-ignore
userAPIMock.follow.mockReturnValue(result);
//@ts-ignore
userAPIMock.unfollow.mockReturnValue(result);

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
   dispatchMock.mockClear();
   getStateMock.mockClear();
   userAPIMock.follow.mockClear();
   userAPIMock.unfollow.mockClear();
})

test("user followed thunk success", async () => {
   const thunk = usersFollow(1);
   await thunk(dispatchMock, getStateMock, {});

   expect(dispatchMock).toBeCalledTimes(3);

   expect(dispatchMock).toHaveBeenCalledWith(actions.setUserFollowingProgress(true, 1))
   expect(dispatchMock).toHaveBeenCalledWith(actions.followed(1))
   expect(dispatchMock).toHaveBeenCalledWith(actions.setUserFollowingProgress(false, 1))
});

test("user unfollowed thunk success", async () => {
   const thunk = usersUnfollow(1);

   await thunk(dispatchMock, getStateMock, {});

   expect(dispatchMock).toBeCalledTimes(3);

   expect(dispatchMock).toHaveBeenCalledWith(actions.setUserFollowingProgress(true, 1))
   expect(dispatchMock).toHaveBeenCalledWith(actions.unfollowed(1))
   expect(dispatchMock).toHaveBeenCalledWith(actions.setUserFollowingProgress(false, 1))
});