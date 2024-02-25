import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import AcceptInvite from "./components/AcceptInvite/AcceptInvite";
import AuthRoute from "./components/AuthRoute";
import BoardLayout from "./components/BoardLayout";
import PageLayout from "./components/PageLayout";
import PageLayoutAuth from "./components/PageLayoutAuth";
import RedirectAuthRoute from "./components/RedirectAuthRoute";
import Dashboards from "./pages/Dashboards/Dashboards";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
import KanbanBoardSettings from "./pages/KanbanBoardSettings/KanbanBoardSettings";
import { Login } from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { Registration } from "./pages/Registration/Registration";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PageLayout>
              <Login />
            </PageLayout>
          }
        />
        <Route path="/" element={<RedirectAuthRoute />} />
        <Route
          path="/register"
          element={
            <PageLayout>
              <Container maxWidth="lg">
                <Registration />
              </Container>
            </PageLayout>
          }
        />

        <Route
          path="/user/:idUser/dashboards/"
          element={
            <PageLayoutAuth>
              <AuthRoute>
                <Dashboards />
              </AuthRoute>
            </PageLayoutAuth>
          }
        />
        <Route
          path="/accept-invite/:token"
          element={
            <PageLayoutAuth>
              <AuthRoute>
                <AcceptInvite />
              </AuthRoute>
            </PageLayoutAuth>
          }
        />
        <Route
          path="/dashboard/:idProject/"
          element={
            <BoardLayout>
              <AuthRoute>
                <KanbanBoard />
              </AuthRoute>
            </BoardLayout>
          }
        />
        <Route
          path="/dashboard/:idProject/settings"
          element={
            <BoardLayout>
              <AuthRoute>
                <KanbanBoardSettings />
              </AuthRoute>
            </BoardLayout>
          }
        />
        <Route
          path="*"
          element={
            <PageLayoutAuth>
              <AuthRoute>
                <NotFound />
              </AuthRoute>
            </PageLayoutAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
