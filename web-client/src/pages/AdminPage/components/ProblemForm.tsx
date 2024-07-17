import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { generateArray, generateString } from "../../../utils";
import api from "../../../utils/api";
import useToast from "../../../hooks/useToast";
import { Problem } from "../../../types";

const difficultyoptions = ["Easy", "Medium", "Hard"] as const;

export default function ProblemForm(props: {
  default: Problem | null;
  saveCallback?: Function;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "",
    constraint: "",
    inputformat: "",
    outputformat: "",
    exampleinput: "",
    exampleoutput: "",
  });
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (props.default?._id) {
      setForm({
        title: props.default?.title,
        description: props.default?.description,
        difficulty: props.default?.difficulty,
        constraint: generateString(props.default?.constraints),
        inputformat: props.default?.inputformat,
        outputformat: props.default?.outputformat,
        exampleinput: generateString(props.default?.exampleinput),
        exampleoutput: generateString(props.default?.exampleoutput),
      });
    }
  }, []);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const dataform = {
      title: form.title,
      description: form.description,
      difficulty: form.difficulty,
      constraints: generateArray(form.constraint),
      inputformat: form.inputformat,
      outputformat: form.outputformat,
      exampleinput: generateArray(form.exampleinput),
      exampleoutput: generateArray(form.exampleoutput),
    };

    if (props.default?._id) {
      api.problem
        .updateProblem(
          props.default?._id,
          dataform.title,
          dataform.description,
          dataform.difficulty,
          dataform.constraints,
          dataform.inputformat,
          dataform.outputformat,
          dataform.exampleinput,
          dataform.exampleoutput
        )
        .then((res) => {
          toast.display({ title: res });
        })
        .catch((err) =>
          toast.error({ title: err || "Error : Something bad happened" })
        )
        .finally(() => {
          props.saveCallback && props.saveCallback();
          setLoading(false);
        });
    } else {
      api.problem
        .addProblem(
          dataform.title,
          dataform.description,
          dataform.difficulty,
          dataform.constraints,
          dataform.inputformat,
          dataform.outputformat,
          dataform.exampleinput,
          dataform.exampleoutput
        )
        .then((res) => {
          console.log(res);
          toast.display({ title: res });
          props.saveCallback && props.saveCallback();
        })
        .catch((err) =>
          toast.error({ title: err || "Error : Something bad happened" })
        )
        .finally(() => setLoading(false));
    }
  }
  return (
    <section className="flex mt-10 w-full">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-8">
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            required={true}
            onChange={handleChange}
            placeholder="Enter title for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Description</span>
          <textarea
            rows={4}
            name="description"
            value={form.description}
            required={true}
            onChange={handleChange}
            placeholder="Enter description for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col relative">
          <span className="text-back font-medium mb-4">Difficulty</span>
          <div
            className={twMerge(
              "flex items-center justify-between bg-black-1 py-4 px-6 rounded-lg outline-none font-medium cursor-pointer",
              dropDown && "border-primary border"
            )}
            onClick={() => setDropDown(!dropDown)}
          >
            <p>
              {form.difficulty ? (
                <span className="text-back">{form.difficulty}</span>
              ) : (
                <span className="text-secondary">Select Difficulty</span>
              )}
            </p>
            <Icon
              icon="expand_more"
              className={twMerge(
                "mx-1 scale-125 text-xl duration-300",
                dropDown ? "rotate-180 text-back " : "text-secondary"
              )}
            />
          </div>
          <div
            className=" bg-black-1 absolute mt-1 top-full w-full z-10 flex flex-col items-start justify-start border-primary border rounded-lg duration-300"
            style={{
              clipPath: !dropDown
                ? "polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)"
                : "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
            }}
          >
            {difficultyoptions.map((data, key) => (
              <div
                key={key}
                className={twMerge(
                  "px-4 py-2 text-back text-nowrap font-cabin text-sm font-bold w-full text-start capitalize hover:bg-primary rounded-lg",
                  form.difficulty === data && "bg-primary"
                )}
                onClick={() => {
                  setForm({ ...form, difficulty: data });
                  setDropDown(!dropDown);
                }}
              >
                {data}
              </div>
            ))}
          </div>
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Input Format</span>
          <textarea
            rows={2}
            name="inputformat"
            value={form.inputformat}
            required={true}
            onChange={handleChange}
            placeholder="Enter description for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Output Format</span>
          <textarea
            rows={2}
            name="outputformat"
            value={form.outputformat}
            required={true}
            onChange={handleChange}
            placeholder="Enter description for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Constraints</span>
          <input
            type="text"
            name="constraint"
            value={form.constraint}
            required={true}
            onChange={handleChange}
            placeholder="Enter constraints for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Example input</span>
          <input
            type="text"
            name="exampleinput"
            value={form.exampleinput}
            required={true}
            onChange={handleChange}
            placeholder="Enter input for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-back font-medium mb-4">Example output</span>
          <input
            type="text"
            name="exampleoutput"
            value={form.exampleoutput}
            required={true}
            onChange={handleChange}
            placeholder="Enter output for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <div className="flex items-center justify-end w-full">
          <button
            type="submit"
            disabled={loading}
            className="flex px-5 py-2 font-medium font-poppins text-md rounded-xl text-back bg-primary outline-none border-nonr disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
