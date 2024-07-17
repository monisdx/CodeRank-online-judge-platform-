import { useState } from "react";
import Header from "./components/Header";
import ProblemForm from "./components/ProblemForm";
import Footer from "../../common/Footer";
import ProblemCard from "./components/ProblemCard";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import Toasts from "../../common/Toasts";
import useToast from "../../hooks/useToast";
import Loader from "../../common/Loader";

export default function AdminPage() {
  const {
    loading,
    data,
    refetch: refetchProblems,
  } = useApiResponse(api.problem.getAllProblems);

  const problems = data?.problemlist;
  const toast = useToast();
  const [loadDelete, setLoadDelete] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [problemId, setProblemId] = useState<string>("");

  const selectedProblem =
    problemId.length > 0 && problems
      ? problems.find((pro) => pro._id === problemId) || null
      : null;

  function deleteProblem(id: string) {
    setLoadDelete(true);

    api.problem
      .removeProblem(id)
      .then((res) => toast.display({ title: res }))
      .catch((err) =>
        toast.error({ title: err || "Error : Something bad happened" })
      )
      .finally(() => {
        setLoadDelete(false);
        refetchProblems();
      });
  }
  return (
    <>
      <Toasts />
      <Header />
      <section className="widescreen:w-3/4 mx-auto p-page py-10 bg-black-3 flex-col justify-center items-center gap-y-8">
        <div className="flex justify-between items-center">
          <h1 className="font-poppins font-bold text-back text-2xl">
            Problems
          </h1>
          {!openForm ? (
            <button
              onClick={() => setOpenForm(!openForm)}
              className="flex px-5 py-2 font-medium font-poppins text-md rounded-xl text-back bg-primary outline-none border-nonr"
            >
              Add +
            </button>
          ) : (
            <button
              onClick={() => setOpenForm(!openForm)}
              className="flex px-5 py-2 font-medium font-poppins text-md rounded-xl text-back bg-primary outline-none border-nonr"
            >
              Back
            </button>
          )}
        </div>
        {openForm ? (
          <ProblemForm
            default={selectedProblem}
            saveCallback={() => {
              setOpenForm(false);
              setProblemId("");
              refetchProblems();
            }}
          />
        ) : (
          !loading &&
          data &&
          (problems && problems.length > 0 ? (
            <div className="flex min-h-screen flex-col gap-y-4 mt-10">
              {problems.map((pro, key) => (
                <ProblemCard
                  problem={pro}
                  key={pro._id}
                  loadDelete={loadDelete}
                  editProblem={() => {
                    setProblemId(pro._id);
                    setOpenForm(true);
                  }}
                  deleteProblem={() => deleteProblem(pro._id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-back min-h-screen">
              No problem found, please add a new problem
            </div>
          ))
        )}
        {loading && (
          <div className="flex flex-col justify-start items-center min-h-screen mt-[8rem]">
            <Loader className="w-1/3" />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
