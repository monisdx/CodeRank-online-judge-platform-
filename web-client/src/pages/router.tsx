import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";
import ErrorPage from "./ErrorPage/ErrorPage";
import HomePage from "./HomePage/HomePage";
import ProblemListPage from "./ProblemListPage/ProblemListPage";
import ProblemPage from "./ProblemPage/ProblemPage";
import AuthPage from "./AuthPage/AuthPage";
import RefreshBoundary from "../common/RefreshBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<PageWrapper/>}>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage/>} />
        <Route path="problems" element={<ProblemListPage/>} />
        <Route path="problems/:id" element={<ProblemPage/>}/>
        <Route path="auth" element={<AuthPage/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
    </Route>
    </>

    
  )
);

function PageWrapper() {
  

  return (
    <RefreshBoundary id="page">
      <Outlet />
    </RefreshBoundary>
  );
}

export default router;
