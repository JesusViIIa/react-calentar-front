import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginScreen } from "../auth/LoginScreen";
import { CalendarScreen } from "../calendar/CalendarScreen";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startChecking } from "../../actions/auth";
import { useSelector } from "react-redux";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { RegisterScreen } from "../auth/RegisterScreen";
import { AuthRouter } from "./AuthRouter";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  


  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking)
    return (
      <div className="login-container login-form-2">
        <h5>Cargando...</h5>
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes loggedIn={!!uid}>
              <AuthRouter/>
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes loggedIn={!!uid}>
              <CalendarScreen />
            </PrivateRoutes>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};
