import { twMerge } from "tailwind-merge";
import CodeEditor from "./components/CodeEditor";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Icon from "../../common/Icon";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import Loader from "../../common/Loader";

export default function ProblemPage() {
  const { authenticated } = useAuth();
  const params = useParams();
  console.log(params);
  if (!params.id) return <Navigate to={"/problems"} />;

  const { data, loading } = useApiResponse(
    api.problem.getProblemById,
    params.id
  );

  const problem = data?.problem;

  return (
    <section className="mx-auto bg-black-3 px-[2vw] py-8 flex mobile:flex-col justify-between mobile:gap-y-10 widescreen:gap-x-6">
      {!loading && problem && (
        <>
          <div className="h-[82vh] flex widescreen:flex-[.4] flex-col items-center gap-y-4">
            <div className=" w-full flex flex-col gap-y-2 overflow-y-auto scrollbar-primary">
              <h1 className="font-inter font-bold text-back text-2xl">
                {problem.title}
              </h1>
              <div
                className={twMerge(
                  "flex items-center justify-center px-2 py-1 bg-opacity-20 rounded-lg w-fit",
                  problem.difficulty === "Easy"
                    ? "bg-green-500"
                    : problem.difficulty === "Medium"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                )}
              >
                <p
                  className={twMerge(
                    "text-sm font-poppins",
                    problem.difficulty === "Easy"
                      ? "text-green-500"
                      : problem.difficulty === "Medium"
                        ? "text-yellow-500"
                        : "text-red-500"
                  )}
                >
                  {problem.difficulty}
                </p>
              </div>
              <figure className="h-[0.05rem] bg-back/20 w-full my-2" />
              <p className="text-secondary font-poppins">
                {problem.description}
              </p>
              <h3 className="font-inter font-medium text-back text-xl">
                Input Format
              </h3>
              <p className="text-secondary font-poppins">
                {problem.inputformat}
              </p>
              <h3 className="font-inter font-medium text-back text-xl">
                Output Format
              </h3>
              <p className="text-secondary font-poppins">
                {problem.outputformat}
              </p>
              <h3 className="font-inter font-medium text-back text-xl">
                Constraints
              </h3>
              <pre className="text-secondary font-poppins break-words whitespace-pre-wrap">
                {problem.constraints}
              </pre>
              <h3 className="font-inter font-medium text-back text-xl">
                Example
              </h3>
              <div className="flex flex-col gap-y-1">
                <p className="text-back font-poppins">input</p>
                <pre className="w-full rounded-lg bg-black-1 p-2 text-secondary font-poppins break-words whitespace-pre-wrap">
                  {problem.exampleinput}
                </pre>
                <p className="text-back font-poppins">output</p>
                <pre className="w-full rounded-lg bg-black-1 p-2 text-secondary font-poppins break-words whitespace-pre-wrap">
                  {problem.exampleoutput}
                </pre>
              </div>
            </div>
          </div>
          <div className="h-[82vh] flex flex-col widescreen:flex-[.6] items-center bg-black-1 rounded-xl p-1 relative">
            {!authenticated && (
              <article className="absolute flex flex-col gap-y-10 justify-center items-center z-[999] mt-[10rem]">
                <Icon icon="locked" className="text-primary text-9xl" />
                <h1 className="text-back font-medium font-inter text-4xl">
                  Please SignIn To Continue{" "}
                  <span className="text-primary">Solving Problem</span>
                </h1>
                <Link
                  to="/auth"
                  className="bg-primary px-4 py-2 text-back font-inter font-medium rounded-lg"
                >
                  Sign In
                </Link>
              </article>
            )}
            <CodeEditor problem={problem} />
          </div>
        </>
      )}

      {loading && (
        <div className="flex w-full h-screen flex-col justify-center items-center">
          <Loader className="w-1/5" />
        </div>
      )}
    </section>
  );
}
