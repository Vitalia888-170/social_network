import usersReducer, { actions, InitialStateType } from "./users-reducer"

let state: InitialStateType;
beforeEach(() => {
   state = {
      users: [
         { id: 0, name: 'User1', followed: false, photos: { small: null, large: null }, status: 'status1' },
         { id: 1, name: 'User2', followed: false, photos: { small: null, large: null }, status: 'status2' },
         { id: 2, name: 'User3', followed: true, photos: { small: null, large: null }, status: 'status3' },
         { id: 3, name: 'User4', followed: true, photos: { small: null, large: null }, status: 'status4' }
      ],
      totalCountPage: 20000,
      pageSize: 20,
      currentPage: 1,
      isFetching: true,
      isAllowedFollow: []
   }
});
test('followed success', () => {
   const newState = usersReducer(state, actions.followed(1));
   expect(newState.users[0].followed).toBeFalsy();
   expect(newState.users[1].followed).toBeTruthy();
});

test('unfollowed success', () => {
   const newState = usersReducer(state, actions.unfollowed(2));
   expect(newState.users[3].followed).toBeTruthy();
   expect(newState.users[2].followed).toBeFalsy();
});