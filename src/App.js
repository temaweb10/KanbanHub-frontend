import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import PageLayout from "./components/PageLayout";
import RedirectAuthRoute from "./components/RedirectAuthRoute";
import Dashboards from "./pages/Dashboards/Dashboards";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard";
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
          path="/board"
          element={
            <PageLayout>
              <KanbanBoard />
            </PageLayout>
          }
        />
        <Route
          path="/user/:idUser/dashboards/"
          element={
            <PageLayout>
              <AuthRoute>
                <Dashboards />
              </AuthRoute>
            </PageLayout>
          }
        />
        <Route
          path="/dashboard/:idProject/"
          element={
            <PageLayout>
              <AuthRoute>
                <KanbanBoard />
              </AuthRoute>
            </PageLayout>
          }
        />
        <Route
          path="*"
          element={
            <PageLayout>
              <NotFound />
            </PageLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
