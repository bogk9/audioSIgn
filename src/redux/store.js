import { configureStore } from "@reduxjs/toolkit";
import {appReducer} from './appReducer'

let reducer = {
    app: appReducer
}

export const store = configureStore({reducer});