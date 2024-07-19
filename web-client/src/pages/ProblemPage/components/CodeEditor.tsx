import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";

export default function CodeEditor() {
  const editorRef = useRef();
  const [code, setCode] = useState<string>(codesnippets["cpp"]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("cpp");
  const [active, setActive] = useState<number>(1);

  const options = {
    minimap: {
      enabled: false,
    },
  };

  function onSelect(l: string) {
    setLang(l);
    setCode(codesnippets[l]);
  }

  function onMount(editor: any) {
    editorRef.current = editor;
    editor.focus();
  }

  return (
    <>
      <div className="w-full flex flex-col overflow-y-auto scrollbar-primary">
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
              <p className="text-back">{lang}</p>
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
                    lang === data && "bg-primary"
                  )}
                  onClick={() => {
                    onSelect(data);
                    setDropDown(!dropDown);
                  }}
                >
                  {data}
                </div>
              ))}
            </div>
          </label>
        </div>
        <div className="flex items-center justify-center bg-black-3 h-[60vh] w-full">
          <Editor
            language={lang}
            value={code}
            theme="vs-dark"
            onMount={onMount}
            options={options}
            className=""
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
              rows={3}
              name="input"
              // value={form.inputformat}
              // onChange={handleChange}
              className="w-full bg-black-1 py-4 px-6 text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
            />
          )}
          {active === 2 && (
            <textarea
              rows={3}
              name="output"
              // value={form.inputformat}
              // onChange={handleChange}
              className="w-full bg-black-1 py-4 px-6 text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
            />
          )}
          {active === 3 && (
            <textarea
              rows={3}
              name="verdict"
              // value={form.inputformat}
              // onChange={handleChange}
              className="w-full bg-black-1 py-4 px-6 text-back rounded-lg outline-none border-none font-medium  focus-visible:ring-primary focus-visible:ring-1 caret-primary"
            />
          )}
        </div>
        <div className="flex gap-x-4 mt-4">
          <button className="flex items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-back p-1 border-none outline-none bg-black-3 min-w-[10rem]">
            <Icon icon="play" className="text-back text-2xl" />
            <p className="text-back font-inter font-medium text-lg">Run</p>
          </button>
          <button className="flex items-center justify-center gap-x-2 rounded-lg px-4 py-2 text-back p-1 border-none outline-none bg-primary min-w-[10rem]">
            <Icon icon="upload" className="text-back text-2xl" />
            <p className="text-back font-inter font-medium text-lg">Submit</p>
          </button>
        </div>
      </div>
    </>
  );
}

const language = ["cpp", "python", "java"];

const codesnippets: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
  using namespace std;

  int main() {

    cout << "Hello World";

    return 0;

  }`,

  python: `print('Hello World')`,

  java: `public class Main {
    public static void main(String[] args) {

      System.out.println("Hello World");

    }
  }`,
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
