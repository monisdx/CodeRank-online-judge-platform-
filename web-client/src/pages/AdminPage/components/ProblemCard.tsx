import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { Problem } from "../../../types";

export default function ProblemCard({
  problem,
  loadDelete,
  deleteProblem,
  editProblem,
}: {
  problem: Problem;
  loadDelete: boolean;
  deleteProblem: () => void;
  editProblem: () => void;
}) {
  return (
    <div className="flex bg-black-1 justify-between rounded-lg p-5 border border-black-2">
      <div className="flex flex-col gap-2 items-start">
        <h1 className="text-back font-poppins font-medium text-xl">
          {problem.title}
        </h1>
        <div
          className={twMerge(
            "flex items-center justify-center px-2 py-1 bg-opacity-20 rounded-lg",
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
      </div>
      <div className="">
        <button
          onClick={editProblem}
          className="rounded-lg mr-2 bg-primary text-back p-1"
        >
          <Icon icon="edit" />
        </button>
        <button
          onClick={deleteProblem}
          disabled={loadDelete}
          className="rounded-lg bg-red-500 text-back p-1 disabled:cursor-not-allowed disabled:animate-pulse disabled:opacity-60"
        >
          <Icon icon="delete" />
        </button>
      </div>
    </div>
  );
}
