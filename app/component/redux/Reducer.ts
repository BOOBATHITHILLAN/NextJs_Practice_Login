'use client'
const initialState = [{
    name: "",
    email: "",
    password: ""
}];

const reducer = (state = initialState, action: any) => {
    switch (action.type) {

        case "Register":
            if (state[0].name === "") {
                return ([action.payload])
            }
            return ([...state, action.payload])
        default:
            return state;
    }
}

export default reducer;