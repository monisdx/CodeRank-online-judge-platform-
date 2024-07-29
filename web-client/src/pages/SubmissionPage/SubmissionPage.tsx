import React from "react";
import { twMerge } from "tailwind-merge";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

export default function SubmissionPage() {
  const { loading, data } = useApiResponse(api.submission.getMySubmission);

  const mySubmissions = data?.submissionLists;
  console.log(mySubmissions);
  return (
    <section className="min-h-screen widescreen:w-4/5 mx-auto p-page py-10 bg-black-3 flex flex-col gap-y-10">
      <h1 className="font-cabin font-bold text-back text-2xl">
        All My Submissions
      </h1>
      {!loading &&
        (mySubmissions && mySubmissions.length > 0 ? (
          <div className="flex w-full overflow-x-auto scrollbar-primary">
            <table className="flex w-full flex-col min-w-[50rem]">
              <thead className="font-cabin text-lg font-medium text-back bg-primary">
                <tr className="flex">
                  <th className="basis-[30%] p-2 text-nowrap text-start">
                    Time Submitted
                  </th>
                  <th className="basis-[40%] p-2 text-start">Problem</th>
                  <th className="basis-[30%] p-2 text-start">Status</th>
                  <th className="basis-[20%] p-2 text-start">Language</th>
                </tr>
              </thead>
              <tbody className="bg-black-1 text-start font-cabin text-back text-base capitalize font-normal">
                {mySubmissions.map((sub, key) => (
                  <tr
                    key={key}
                    className="flex border-b-2 border-b-black-2 py-1"
                  >
                    <td className="basis-[30%] p-2">{123}</td>
                    <td className="basis-[40%] p-2">
                      <Link
                        to={`/problems/${sub.problem_id._id}`}
                        className="cursor-pointer hover:text-primary"
                      >
                        {sub.problem_id.title}
                      </Link>
                    </td>
                    <td
                      className={twMerge(
                        "basis-[30%] p-2",
                        sub.status ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {sub.message}
                    </td>
                    <td className="basis-[20%] p-2">
                      {idToLang[sub.language]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center min-h-screen mt-[4rem]">
            <img src="/images/emptyState.svg" alt="not found" />
            <h1 className="text-back text-inter text-2xl">No results found</h1>
          </div>
        ))}

      {loading && (
        <div className="flex flex-col justify-start items-center min-h-screen mt-[4rem]">
          <Loader className="w-1/5" />
        </div>
      )}
    </section>
  );
}

const submission = [
  {
    time: "1 hour ago",
    title: "two sum",
    status: true,
    language: "cpp",
  },
  {
    time: "1 hour ago",
    title: "Delete the Middle Node of a Linked List",
    status: false,
    language: "cpp",
  },
  {
    time: "1 hour ago",
    title: "Linked List Cycle II",
    status: true,
    language: "java",
  },
  {
    time: "1 hour ago",
    title: "Remove Nth Node From End of List",
    status: true,
    language: "pyhton",
  },
  {
    time: "1 hour ago",
    title: "Reverse Linked List",
    status: false,
    language: "c",
  },
];

const idToLang: Record<string, string> = {
  cpp: "c++",

  py: "python",

  java: "java",

  c: "c",
};
