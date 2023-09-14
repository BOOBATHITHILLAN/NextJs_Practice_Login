'use client'
import {createStore} from "redux"
import reducer from "./app/component/redux/Reducer"

// const initialState: any = {} 

export const store = createStore(reducer)