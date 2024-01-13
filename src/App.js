import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import { Login } from "./pages/Login/Login";
import { Registration } from "./pages/Registration/Registration";
import { fetchAuthMe, selectorIsAuth } from "./redux/slices/auth";
/* 
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
 */
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          {/*      <Route path="/" element={<Home />} /> */}
          {/*           <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/board" element={<KanbanBoard />} />
          <Route path="*" element={<notFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
