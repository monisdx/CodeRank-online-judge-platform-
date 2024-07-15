import { useState } from "react";
import Header from "./components/Header";
import ProblemForm from "./components/ProblemForm";
import Footer from "../../common/Footer";

export default function AdminPage() {
  const [openForm, setOpenForm] = useState<boolean>(false);
  return (
    <>
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
            <ProblemForm/>
        ):(
            <div className="text-back h-screen">No problems found, please add a new problem</div>
        )}
      </section>
      <Footer/>
    </>
  );
}
