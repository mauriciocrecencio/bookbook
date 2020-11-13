const defaultState = { currentToken: "", user: "", sought: [], lastSearch: "", indexSought: 0, booksTimeline: [], books: [], userProfile: "" };

const login = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      const { currentToken, user } = action;
      return { ...state, currentToken, user };
    case "SAVE_SEARCH":
      const { sought, lastSearch } = action;
      return { ...state, sought, lastSearch };
    case "TIMELINE":
      const { booksTimeline } = action;
      return { ...state, booksTimeline: [...booksTimeline] };
    case "CONTINUOS_SEARCH":
      return { ...state, indexSought: state.indexSought + 9 };
    case "BACK_SEARCH":
      return { ...state, indexSought: state.indexSought - 9 };
    case "USER_PROFILE":
      const { userProfile } = action;
      return { ...state, userProfile };
    default:
      return state;
  }
};


export default login
