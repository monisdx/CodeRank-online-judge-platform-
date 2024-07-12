import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../layout";
import ErrorPage from "./ErrorPage/ErrorPage";
import HomePage from "./HomePage/HomePage";
import ProblemListPage from "./ProblemListPage/ProblemListPage";
import ProblemPage from "./ProblemPage/ProblemPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout.Default />}>
        <Route index element={<HomePage/>} />
        <Route path="problems" element={<ProblemListPage/>} />
        <Route path="problems/:id" element={<ProblemPage/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>}/>
    </>

    
  )
);

export default router;
