import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { Problem } from "../../../types";
import { Link } from "react-router-dom";

export default function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      to={`/problems/${232423}`}
      role="listitem"
      className="flex bg-black-1 justify-between rounded-lg p-5 border border-black-2 cursor-pointer group"
    >
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
      <div className="flex items-center justify-center">
        <button className="flex items-center gap-x-2 rounded-lg px-6 py-2 text-back p-1 border border-primary group-hover:bg-primary">
          {true ? (
            <p className="text-primary group-hover:text-back">Solve</p>
          ) : (
            <>
              <p className="text-back">Solved</p>
              <Icon icon="checked" className="text-back text-2xl" />
            </>
          )}
        </button>
      </div>
    </Link>
  );
}
