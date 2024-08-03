import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { Problem } from "../../../types";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard(props: ProblemCardProps) {
  const { problem } = props;
  const { data } = useApiResponse(api.user.getCurrentUser);
  const user = data?.user;
  const solved = user?.problems.indexOf(problem._id);

  return (
    <Link
      to={`/problems/${problem._id}`}
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
        <button
          className={twMerge(
            "min-w-[9rem] flex items-center justify-center gap-x-2 rounded-lg px-6 py-2 text-back border border-primary",
            user && solved !== -1 ? "bg-primary" : "group-hover:bg-primary"
          )}
        >
          {user && solved !== -1 ? (
            <>
              <p className="text-back">Solved</p>
              <Icon icon="checked" className="text-back text-2xl" />
            </>
          ) : (
            <p className="text-primary group-hover:text-back">Solve</p>
          )}
        </button>
      </div>
    </Link>
  );
}
