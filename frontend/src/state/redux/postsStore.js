import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./postsReducer";

const postsStore =
    configureStore({
        reducer: postsReducer
    })
export default postsStore