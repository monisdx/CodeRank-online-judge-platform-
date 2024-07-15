import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import Icon from "../../../common/Icon";
import { generateArray } from "../../../utils";

const difficultyoptions = ["Easy", "Medium", "Hard"] as const;

export default function ProblemForm() {
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

    console.log(dataform);
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
            onChange={handleChange}
            placeholder="Enter output for problem"
            className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
          />
        </label>
        <div className="flex items-center justify-end w-full">
          <button
            type="submit"
            className="flex px-5 py-2 font-medium font-poppins text-md rounded-xl text-back bg-primary outline-none border-nonr"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
