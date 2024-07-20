import React from "react";
import Icon from "../../common/Icon";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import Loader from "../../common/Loader";
import ProblemCard from "./components/ProblemCard";
import { twMerge } from "tailwind-merge";

export default function ProblemListPage() {
  const {
    loading,
    data,
    refetch: refetchProblems,
  } = useApiResponse(api.problem.getAllProblems);

  const problems = data?.problemlist;

  return (
    <section className="min-h-screen mx-auto bg-black-3 p-page py-10 flex mobile:flex-col-reverse justify-between mobile:gap-y-10 widescreen:gap-x-10">
      <div className="flex widescreen:flex-[.7] flex-col gap-y-8">
        <div className="flex items-center gap-x-2 bg-black-1 py-4 px-6 rounded-lg focus-within:ring-[1px] focus-within:ring-primary">
          <Icon icon="search" className="text-back text-2xl" />
          <input
            type="text"
            name="search"
            autoComplete="off"
            placeholder="Type here to search"
            className=" w-full bg-transparent placeholder:text-secondary text-back outline-none border-none font-medium caret-primary"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-inter font-bold text-back text-2xl">Problems</h1>
        </div>
        {!loading &&
          data &&
          (problems && problems.length > 0 ? (
            <div className="flex min-h-screen flex-col gap-y-4 ">
              {problems.map((pro) => (
                <ProblemCard problem={pro} key={pro._id} />
              ))}
            </div>
          ) : (
            <div className="text-back min-h-screen">
              No problem found, please add a new problem
            </div>
          ))}
        {loading && (
          <div className="flex flex-col justify-start items-center min-h-screen mt-[4rem]">
            <Loader className="w-1/5" />
          </div>
        )}
      </div>
      <div className="flex flex-col h-1/2 widescreen:flex-[.3] bg-black-1 rounded-2xl p-5 justify-center items-center">
        <h1 className="font-inter font-bold text-back text-2xl">Leaderboard</h1>
        <p className="font-inter font-medium text-secondary">
          Top Problem Solvers
        </p>
        <div className="w-full flex items-center justify-between text-back py-5 px-4 mt-6">
          <div className="flex items-center gap-x-10">
            <p>Rank</p>
            <p>Name</p>
          </div>
          <p>Total Problems</p>
        </div>
        <div className="flex w-full flex-col justify-center items-center">
          {solvers.map((user, rank) => (
            <div className="w-full flex items-center justify-between text-back py-5 px-4 border-t-2 border-t-black-2 cursor-pointer hover:bg-black-2">
              <div className="flex items-center gap-x-14">
                <p className={twMerge(rank > 2 && "min-w-5")}>
                  {rank == 0 && "🥇"}
                  {rank == 1 && "🥈"}
                  {rank == 2 && "🥉"}
                  {rank > 2 && `${rank + 1}`}
                </p>
                <p className="flex gap-x-2 items-center">
                  <span className="flex justify-center items-center font-medium  h-9 w-9 rounded-full text-lg text-back bg-primary capitalize">
                    {user.name.charAt(0)}
                  </span>
                  <span>{user.name}</span>
                </p>
              </div>
              <p>{user.problems}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const solvers = [
  {
    name: "Monis",
    problems: 34,
  },
  {
    name: "Lokesh",
    problems: 28,
  },
  {
    name: "Aaroh",
    problems: 20,
  },
  {
    name: "Mushtafa",
    problems: 15,
  },
  {
    name: "Rahul",
    problems: 4,
  },
] as const;
