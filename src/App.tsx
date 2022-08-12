import React, { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppBar from "./componnents/nav/AppBarComponent";
import { createContext } from "vm";
const MainComponent = lazy(() => import("./componnents/main/MainComponent"));
const CreatePlace = lazy(() => import("./componnents/createPlace/CreatePlace"));
const AddProducts = lazy(() => import("./componnents/addProduct/AddProducts"));
const Login = lazy(() => import("./componnents/userAuth/Login"));
// export const isUserAuthContext = createContext(undefined);
// const initialState:boolean = false;
// const reducer = (state: boolean) => {
//   if (localStorage.getItem("bearerToken") !== null) {
//     if (JSON.parse(localStorage.getItem("userInfo")!).user_scope) state = true;
//     else state = false;
//   } else state = false;
// };
function App() {
  // const [state, dispatch] = React.useReducer(reducer, initialState as boolean);
  const [isUserAuth, setisUserAuth] = React.useState<boolean>(false);
  const chechIsUserAuth = () => {
    if (localStorage.getItem("bearerToken") !== null) {
      if (JSON.parse(localStorage.getItem("userInfo")!).user_scope)
        setisUserAuth(true);
      else setisUserAuth(false);
    } else setisUserAuth(false);
  };
  React.useEffect(() => {
    chechIsUserAuth();
  }, []);

  return (
    <div className="App">
      {/* <isUserAuthContext.Provider value={chechIsUserAuth}> */}
      <AppBar isUserAuth={isUserAuth} />
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<MainComponent />}>
            {isUserAuth && (
              <>
                <Route path="create-place" element={<CreatePlace />} />
                <Route path="add-products" element={<AddProducts />} />
              </>
            )}
          </Route>
          <Route
            path="/login"
            element={<Login chechIsUserAuth={chechIsUserAuth} />}
          />
        </Routes>
      </Suspense>
      {/* </isUserAuthContext.Provider> */}
    </div>
  );
}

export default App;
