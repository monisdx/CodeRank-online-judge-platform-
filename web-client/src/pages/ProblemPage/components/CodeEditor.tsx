import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../../../contexts/authContext";
import { Problem, Testresult } from "../../../types";
import api from "../../../utils/api";
import useToast from "../../../hooks/useToast";
import Loader from "../../../common/Loader";

export default function CodeEditor(props: { problem: Problem }) {
  const { problem } = props;

  const editorRef = useRef();
  const [code, setCode] = useState<string>(codesnippets["cpp"]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [lang, setLang] = useState<{ fileName: string; value: string }>({
    fileName: "cpp",
    value: "C++",
  });
  const [input, setInput] = useState<string>("");
  const [active, setActive] = useState<number>(1);
  const [output, setOutput] = useState<string>("");
  const [result, setResult] = useState<{
    verdict: string;
    status: boolean;
    testresults: Testresult[];
  }>();

  const [stdErrorMsg, setStdErrorMsg] = useState<{
    output: string;
    verdict: string;
  }>({ output: "", verdict: "" });

  const [loading, setLoading] = useState<{ output: boolean; verdict: boolean }>(
    { output: false, verdict: false }
  );

  const { authenticated } = useAuth();
  const toast = useToast();

  const options = {
    minimap: {
      enabled: false,
    },
  };

  function onSelect(l: { value: string; fileName: string }) {
    setLang(l);
    setCode(codesnippets[l.fileName]);
  }

  function onMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  function runHandler() {
    if (!input) {
      toast.error({ title: "Please Enter Input" });
      return;
    }
    setResult(undefined);
    setStdErrorMsg({ output: "", verdict: "" });
    setActive(2);
    setLoading({ ...loading, output: true });
    api.compiler
      .runCode(lang.fileName, code, input)
      .then((res) => setOutput(res.output))
      .catch((err) => {
        if (err.isStdError) {
          setStdErrorMsg({ verdict: "", output: err.errMsg });
        } else {
          toast.error({ title: err.errMsg || "Something went wrong" });
        }
      })
      .finally(() => {
        setLoading({ ...loading, output: false });
      });
  }

  function submitHandler() {
    setResult(undefined);
    setStdErrorMsg({ output: "", verdict: "" });
    setActive(3);
    setLoading({ ...loading, verdict: true });
    api.compiler
      .submitCode(lang.fileName, code, problem.testcases, problem?._id)
      .then((res) => setResult(res))
      .catch((err) => {
        if (err.isStdError) {
          setStdErrorMsg({ output: "", verdict: err.errMsg });
        } else {
          toast.error({ title: err.errMsg || "Something went wrong" });
        }
      })
      .finally(() => setLoading({ ...loading, verdict: false }));
  }

  return (
    <>
      <div
        className={twMerge(
          "w-full flex flex-col overflow-y-auto scrollbar-primary",
          !authenticated && "blur-sm brightness-90"
        )}
      >
        <div className="flex justify-between items-center p-4 w-full">
          <p className="text-back flex items-center gap-x-2 font-medium text-lg font-inter">
            <Icon icon="code" className="text-primary text-2xl" />
            Code
          </p>
          <label className="flex relative">
            <div
              className={twMerge(
                "min-w-[10rem] flex items-center justify-between bg-black-3 py-4 px-6 rounded-lg outline-none font-medium cursor-pointer",
                dropDown && "ring-primary ring-[1px]"
              )}
              onClick={() => setDropDown(!dropDown)}
            >
              <p className="text-back">{lang.value}</p>
              <Icon
                icon="expand_more"
                className={twMerge(
                  "mx-1 scale-125 text-xl duration-300",
                  dropDown ? "rotate-180 text-back " : "text-secondary"
                )}
              />
            </div>
            <div
              className=" bg-black-3 absolute mt-1 top-full w-full z-10 flex flex-col items-start justify-start border-primary border duration-300"
              style={{
                clipPath: !dropDown
                  ? "polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)"
                  : "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
              }}
            >
              {language.map((data, key) => (
                <div
                  key={key}
                  className={twMerge(
                    "px-4 py-2 text-back text-nowrap font-cabin text-sm font-bold w-full text-start capitalize hover:bg-primary",
                    lang.fileName === data.fileName && "bg-primary"
                  )}
                  onClick={() => {
                    onSelect(data);
                    setDropDown(!dropDown);
                  }}
                >
                  {data.value}
                </div>
              ))}
            </div>
          </label>
        </div>
        <div className="flex items-center justify-center bg-black-3 min-h-[50vh] w-full">
          <Editor
            language={lang.fileName}
            value={code}
            theme="vs-dark"
            onMount={onMount}
            options={options}
            onChange={(value) => setCode(value || "")}
          />
        </div>
        <div className="flex flex-col rounded-lg bg-black-3 border border-black-2 p-4 mt-4">
          <nav className="flex items-center gap-x-1">
            {navlink.map((item) => (
              <button
                onClick={() => setActive(item.id)}
                key={item.id}
                className={twMerge(
                  "p-2 text-back rounded-t-lg font-inter font-medium text-lg cursor-pointer",
                  active === item.id && "bg-black-1"
                )}
              >
                {item.value}
              </button>
            ))}
          </nav>
          {active === 1 && (
            <textarea
              rows={4}
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="resize-none w-full bg-black-1 py-4 px-6 text-back rounded-b-lg rounded-tr-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
            />
          )}
          {active === 2 && (
            <>
              {!loading.output && (
                <div
                  className={twMerge(
                    "w-full h-32 flex flex-col gap-y-2  bg-black-1 py-4 px-6 rounded-lg font-medium overflow-y-auto scrollbar-primary",
                    stdErrorMsg.output.length ? "text-red-500" : "text-back"
                  )}
                >
                  <h3
                    className={twMerge(
                      "font -inter capitalize text-lg",
                      stdErrorMsg.output.length ? "block" : "hidden"
                    )}
                  >
                    Compilation Error
                  </h3>
                  <pre
                    className={twMerge(
                      "break-words font-inter whitespace-pre-wrap"
                    )}
                  >
                    {stdErrorMsg.output.length ? stdErrorMsg.output : output}
                  </pre>
                </div>
              )}
              {loading.output && (
                <div className="w-full h-32 flex items-center justify-center bg-black-1 py-4 px-6 text-back rounded-lg font-medium">
                  <Loader className="w-12" />
                </div>
              )}
            </>
          )}
          {active === 3 && (
            <div className="w-full h-32 flex justify-center bg-black-1 py-4 px-6 rounded-lg font-medium overflow-y-auto scrollbar-primary">
              {!loading.verdict && (
                <div className="flex flex-col w-full gap-y-2">
                  <h3
                    className={twMerge(
                      "font-inter capitalize text-lg",
                      stdErrorMsg.verdict.length
                        ? "text-red-500"
                        : result?.status
                          ? "text-green-500"
                          : "text-red-500"
                    )}
                  >
                    {stdErrorMsg.verdict.length
                      ? "Compilation Error"
                      : result?.verdict}
                  </h3>
                  {stdErrorMsg.verdict.length ? (
                    <pre className="break-words font-inter whitespace-pre-wrap text-red-500">
                      {stdErrorMsg.verdict}
                    </pre>
                  ) : (
                    <div className="flex flex-wrap gap-x-2 w-full">
                      {result?.testresults.map((testresult, key) => (
                        <p
                          key={key}
                          className={twMerge(
                            "px-2 py-1 rounded-lg  bg-opacity-20",
                            testresult.status
                              ? "bg-green-500 text-green-500"
                              : "bg-red-500 text-red-500"
                          )}
                        >
                          test case {testresult.testcase}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {loading.verdict && (
                <div className="flex items-center justify-center">
                  <Loader className="w-12" />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-x-4 my-4">
          <button
            onClick={runHandler}
            disabled={loading.output}
            className="flex items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-back p-1 border-none outline-none bg-black-3 hover:bg-black-3/70 min-w-[10rem] disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon icon="play" className="text-back text-2xl" />
            <p className="text-back font-inter font-medium text-lg">Run</p>
          </button>
          <button
            onClick={submitHandler}
            disabled={loading.verdict}
            className="flex items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-back p-1 border-none outline-none bg-primary hover:bg-primary/70 min-w-[10rem] disabled:animate-pulse disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Icon icon="upload" className="text-back text-2xl" />
            <p className="text-back font-inter font-medium text-lg">Submit</p>
          </button>
        </div>
      </div>
    </>
  );
}

const language = [
  {
    fileName: "cpp",
    value: "C++",
  },
  {
    fileName: "c",
    value: "C",
  },
  {
    fileName: "java",
    value: "Java",
  },
  {
    fileName: "py",
    value: "Python",
  },
];

const codesnippets: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
  using namespace std;

  int main() {

    cout << "Hello World";

    return 0;

  }`,

  py: `print('Hello World')`,

  java: `public class Main {
    public static void main(String[] args) {

      System.out.println("Hello World");

    }
  }`,

  c: `#include <stdio.h>
  int main() {

    printf("Hello, World!");
    return 0;
}
`,
};

const navlink = [
  {
    id: 1,
    value: "Input",
  },
  {
    id: 2,
    value: "Output",
  },
  {
    id: 3,
    value: "Verdict",
  },
] as const;
{
}

{
  /* <textarea
rows={4}
name="verdict"
disabled
value={
  stdErrorMsg.length > 0
    ? "Compilation Error:\n" + stdErrorMsg
    : output
}
className={twMerge(
  " resize-none w-full bg-black-1 py-4 px-6 rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary",
  stdErrorMsg.length ? "text-red-500" : "text-back"
)}
/> */
}
