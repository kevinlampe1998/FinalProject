import { useReducer, createContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// npm i react-router-dom

import Layout from "./components/Layout/Layout.jsx";
import Contact from "./components/Contact/Contact.jsx";
import TeamProject from "./components/TeamProject/TeamProject.jsx";
import NewInStore from "./components/NewInStore/NewInStore.jsx";
import SetUsedProduct from "./components/SetUsedProduct/SetUsedProduct.jsx";
import HelpChat from "./components/HelpChat/HelpChat.jsx";
import Rating from "./components/Rating/Rating.jsx";
import UsedItems from "./components/UsedItems/UsedItems.jsx";
import UsedItem from "./components/UsedItem/UsedItem.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
// import MailSystem from './components/MailSystem/MailSystem.jsx';
import SeeMyProducts from "./components/SeeMyProducts/SeeMyProducts.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";

const initialState = {
    user: "philipp",
    admin: undefined,
};

const reducer = (state, action) => {
    if (action.type === "hello, pls register me") {
        return { ...state, user: action.payload };
    }

    if (action.type === "users-login") {
        return { ...state, user: action.payload };
    }

    return state;
};

// dispatch({ type: 'hello, pls register me', payload: 'philipp' });

export const TheContext = createContext();

const App = () => {
    const [localDataBank, dispatch] = useReducer(reducer, initialState);

    const loginAtStart = async () => {
        try {
            const res = await fetch(
                "http://localhost:3000/users/login-at-start",
                {
                    method: "POST",
                    // credentials: "include",
                }
            );

            const data = await res.json();

            data = {
                searchedUser: "philipp",
            };

            dispatch({ type: "users-login", payload: data.searchedUser });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loginAtStart();
    }, []);

    return (
        <TheContext.Provider value={{ localDataBank, dispatch }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<NewInStore />} />
                        <Route path="/used-items" element={<UsedItems />} />
                        <Route path="/user-profile" element={<UserProfile />}>
                            <Route path="/:id" element />
                        </Route>

                        <Route path="/contact" element={<Contact />} />
                        <Route path="/team" element={<TeamProject />} />
                        <Route
                            path="/set-used-item"
                            element={<SetUsedProduct />}
                        />
                        <Route path="/used-item/:_id" element={<UsedItem />} />
                        <Route path="/help-chat" element={<HelpChat />} />
                        <Route path="/rating" element={<Rating />} />
                        {/* <Route path='/mail-system/:product_id' element={<MailSystem />} /> */}
                        <Route
                            path="/see-my-products"
                            element={<SeeMyProducts />}
                        />
                        <Route path="/faq" element={<FAQ />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            //{" "}
        </TheContext.Provider>
    );
};

export default App;

//----------------------------------------------------------------
import { useContext } from "react";
import { TheContext } from ".../App.jsx";

const Example = () => {
    const { localDB, dispatch } = useContext(TheContext);
    
    return (
        <>
            Example
            {localDB.user}
        </>
    );
};

export default Example;
