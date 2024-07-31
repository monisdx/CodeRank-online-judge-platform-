import { twMerge } from "tailwind-merge";
import useApiResponse from "../../../hooks/useApiResponse";
import api from "../../../utils/api";
import Loader from "../../../common/Loader";
import { User } from "../../../types";

export default function LeaderBoard() {
  const { data, loading } = useApiResponse(api.user.getLeaderBoardUsers);

  const users = data?.usersList;

  return (
    <>
      <div className="flex flex-col max-h-[70vh] widescreen:flex-[.3] bg-black-1 rounded-2xl p-5 items-center">
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
        {!loading &&
          users &&
          (users.length > 0 ? (
            <div className="flex w-full flex-col justify-center items-center">
              {users.map((user, rank) => (
                <div
                  key={rank}
                  className="w-full flex items-center justify-between text-back py-5 px-4 border-t-2 border-t-black-2 cursor-pointer hover:bg-black-2"
                >
                  <div className="flex items-center gap-x-14">
                    <p className={twMerge(rank > 2 && "min-w-5")}>
                      {rank == 0 && "🥇"}
                      {rank == 1 && "🥈"}
                      {rank == 2 && "🥉"}
                      {rank > 2 && `${rank + 1}`}
                    </p>
                    <p className="flex gap-x-2 items-center">
                      {user.picture ? (
                        <span className="flex justify-center items-center font-medium  h-9 w-9 rounded-full text-lg text-back bg-primary capitalize">
                          <img
                            src={user.picture}
                            alt="username"
                            className="w-full h-full rounded-full"
                          />
                        </span>
                      ) : (
                        <span className="flex justify-center items-center font-medium  h-9 w-9 rounded-full text-lg text-back bg-primary capitalize">
                          {user.name.charAt(0)}
                        </span>
                      )}
                      <span>{user.name}</span>
                    </p>
                  </div>
                  <p>{user.problems.length}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center min-h-screen mt-[4rem]">
              <img src="/images/emptyState.svg" alt="not found" />
              <h1 className="text-back text-inter text-2xl">
                No results found
              </h1>
            </div>
          ))}
        {loading && (
          <div className="flex flex-col justify-start items-center">
            <Loader className="w-1/6" />
          </div>
        )}
      </div>
    </>
  );
}
