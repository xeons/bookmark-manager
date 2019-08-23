const requestBookmarksType = 'REQUEST_BOOKMARKS';
const receiveBookmarksType = 'RECEIVE_BOOKMARKS';
const initialState = { bookmarks: [], isLoading: false };

export const actionCreators = {
    requestBookmarks: () => async (dispatch, getState) => {
        dispatch({ type: requestBookmarksType });

        const url = `api/bookmark`;
        const response = await fetch(url);
        const bookmarks = await response.json();

        dispatch({ type: receiveBookmarksType, bookmarks });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestBookmarksType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveBookmarksType) {
        return {
            ...state,
            bookmarks: action.bookmarks,
            isLoading: false
        };
    }

    return state;
};
