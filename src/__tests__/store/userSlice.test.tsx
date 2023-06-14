import userReducer, { getUserList, createUserOnStore } from '../../store/userSlice';

describe('userSlice', () => {
  const initialState = {
    users: [],
  };

  it('should handle getUserList', () => {
    const userList = [
      { id: 1, name: 'Smit' },
      { id: 2, name: 'Jay' },
    ];
    const action = { type: getUserList.type, payload: userList };
    const newState = userReducer(initialState, action);
    expect(newState.users).toEqual(userList);
  });

  it('should handle createUserOnStore', () => {
    const user = { id: 3, name: 'Raj' };
    const action = { type: createUserOnStore.type, payload: user };
    const newState = userReducer(initialState, action);
    expect(newState.users).toEqual([user]);
  });
});
