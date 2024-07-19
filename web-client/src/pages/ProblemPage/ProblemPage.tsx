import { twMerge } from "tailwind-merge";
import CodeEditor from "./components/CodeEditor";

const problem = {
  title: "Title of the problems",
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat ex perspiciatis iure a assumenda magnam consequuntur! Quo quisquam quas nihil minus sed consectetur eos dolorem amet ipsa reiciendis tempore, qui nesciunt, ex itaque cupiditate eligendi explicabo quidem doloribus ipsum omnis distinctio sit suscipit. Laudantium optio enim fuga officia, illum hic!",
  difficulty: "Easy",
  inputformat:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum libero molestias sed quisquam, minus ipsa.",
  outputformat: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
  exampleinput: ["4", "1 2 3 4"],
  exampleoutput: ["5"],
  constraints: ["N <= 300", "M > 1000"],
};

export default function ProblemPage() {
  return (
    <section className="mx-auto bg-black-3 px-[2vw] py-8 flex mobile:flex-col justify-between mobile:gap-y-10 widescreen:gap-x-6">
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
          <figure className="h-[0.05rem] bg-back/20 w-full my-2"></figure>
          <p className="text-secondary font-poppins">{problem.description}</p>
          <h3 className="font-inter font-medium text-back text-xl">
            Input Format
          </h3>
          <p className="text-secondary font-poppins">{problem.inputformat}</p>
          <h3 className="font-inter font-medium text-back text-xl">
            Output Format
          </h3>
          <p className="text-secondary font-poppins">{problem.outputformat}</p>
          <h3 className="font-inter font-medium text-back text-xl">
            Constraints
          </h3>
          <div className="flex flex-col gap-y-1">
            {problem.constraints.map((cons, key) => (
              <p key={key} className="text-secondary font-poppins">
                {cons}
              </p>
            ))}
          </div>
          <h3 className="font-inter font-medium text-back text-xl">Example</h3>
          <div className="flex flex-col gap-y-1">
            <p className="text-back font-poppins">input</p>
            <div className="w-full flex flex-col gap-y-1 rounded-lg bg-black-1 p-2">
              {problem.exampleinput.map((input, key) => (
                <p key={key} className="text-secondary font-poppins">
                  {input}
                </p>
              ))}
            </div>
            <p className="text-back font-poppins">output</p>
            <div className="w-full flex flex-col gap-y-1 rounded-lg bg-black-1 p-2">
              {problem.exampleoutput.map((output, key) => (
                <p key={key} className="text-secondary font-poppins">
                  {output}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[82vh] flex flex-col widescreen:flex-[.6] items-center bg-black-1 rounded-xl p-1">
        <CodeEditor />
      </div>
    </section>
  );
}
