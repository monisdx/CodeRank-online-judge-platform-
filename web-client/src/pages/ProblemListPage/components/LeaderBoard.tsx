import { twMerge } from "tailwind-merge";

export default function LeaderBoard() {
  return (
    <>
      <article className="absolute top-[30%] right-[10%] text-primary font-bold text-3xl z-[3]">
        Coming soon
      </article>
      <div className="flex flex-col h-1/2 widescreen:flex-[.3] bg-black-1 rounded-2xl p-5 justify-center items-center blur-sm">
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
    </>
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
