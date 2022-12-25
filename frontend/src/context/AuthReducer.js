const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCES":
            return {
                user: action.payload,
                isFetching: false,
                error: false
        };
        case "LOGIN_FAILED":
            return {
                user: null,
                isFetching: false,
                error: action.payload
        };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]
                },

        };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    )
                },

        };
        case "UPDATE":
            return {
                ...state.user,
                user: {
                    ...state.user,
                    username: action.payload.username,
                    city: action.payload.city,
                    description: action.payload.description,
                    from: action.payload.from,
                    profilePicture: action.payload.profilePicture 
                                    ? action.payload.profilePicture 
                                    : state.user.profilePicture,
                    coverPicture: action.payload.coverPicture 
                                  ? action.payload.coverPicture 
                                  : state.user.coverPicture,
                }
        };
    
        default:
            return state;
    }
};

export default AuthReducer;