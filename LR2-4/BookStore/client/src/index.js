import React, {createContext} from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import UserStore from './store/UserStore'
import BookStore from './store/BookStore'

export const Context = createContext(null)

const root = createRoot(document.getElementById("root"));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        book: new BookStore()
    }}>
        <App />
    </Context.Provider>
);
