import React, { useEffect, useRef, useState } from "react";
import Icon from "../../common/Icon";
import useApiResponse from "../../hooks/useApiResponse";
import api from "../../utils/api";
import Loader from "../../common/Loader";
import ProblemCard from "./components/ProblemCard";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deepEqual,
  objectToQueryString,
  searchParamsToObject,
} from "../../utils";
import { Filter } from "../../types";
import useQueryParams from "../../hooks/useQueryParams";
import LeaderBoard from "./components/LeaderBoard";
import { useAuth } from "../../contexts/authContext";

const difficultyoptions = ["Easy", "Medium", "Hard"] as const;

export default function ProblemListPage() {
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const location = useLocation();

  const urlConfig: any = searchParamsToObject(queryParams);

  const [config, setConfig] = useState<Filter>(urlConfig);
  const [search, setSearch] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false);

  const {
    loading,
    data,
    refetch: refetchProblems,
  } = useApiResponse(api.problem.getAllProblems, config);

  const problems = data?.problemlist;

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    if (initialRenderComplete) {
      refetchProblems();
    } else {
      setInitialRenderComplete(true);
    }
  }, [config]);

  useEffect(() => {
    const newconfig = searchParamsToObject(queryParams);

    if (!deepEqual(config, newconfig)) {
      setConfig(newconfig);
    }
  }, [location.search]);

  function handlePressKey(e: any) {
    if (e.keyCode === 13) {
      navigate({
        pathname: "/problems",
        search: objectToQueryString({
          ...config,
          keyword: e.target.value,
        }),
      });
    }
  }

  return (
    <section className="min-h-screen mx-auto bg-black-3 p-page py-10 flex mobile:flex-col-reverse justify-between mobile:gap-y-10 widescreen:gap-x-10">
      <div className="flex widescreen:flex-[.7] flex-col gap-y-8">
        <div className="flex items-center gap-x-2 bg-black-1 py-4 px-6 rounded-lg focus-within:ring-[1px] focus-within:ring-primary">
          <Icon icon="search" className="text-back text-2xl" />
          <input
            type="text"
            name="keyword"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handlePressKey}
            placeholder="Type here to search"
            className=" w-full bg-transparent placeholder:text-secondary text-back outline-none border-none font-medium caret-primary"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="font-inter font-bold text-back text-2xl">Problems</h1>
          <div className="flex gap-x-2 items-center justify-center">
            <label className="flex relative">
              <div
                className={twMerge(
                  "min-w-[10rem] flex items-center justify-between bg-black-1 py-3 px-4 rounded-lg outline-none font-medium cursor-pointer",
                  dropDown && "ring-primary ring-[1px]"
                )}
                onClick={() => setDropDown(!dropDown)}
              >
                <p className="text-sm">
                  {config.difficulty ? (
                    <span className="text-back">{config.difficulty}</span>
                  ) : (
                    <span className="text-secondary text-nowrap">
                      Select Difficulty
                    </span>
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
                className=" bg-black-3 absolute mt-1 top-full w-full z-10 flex flex-col items-start justify-start border-primary border duration-300"
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
                      "px-4 py-2 text-back text-nowrap font-cabin text-sm font-bold w-full text-start capitalize hover:bg-primary",
                      config.difficulty === data && "bg-primary"
                    )}
                    onClick={() => {
                      setDropDown(!dropDown);
                      navigate({
                        pathname: "/problems",
                        search: objectToQueryString({
                          ...config,
                          difficulty: data,
                        }),
                      });
                    }}
                  >
                    {data}
                  </div>
                ))}
              </div>
            </label>
            <button
              onClick={() => {
                setSearch("");
                navigate({ pathname: "/problems", search: "" });
              }}
              className="flex items-center justify-between bg-primary px-4 py-3 rounded-lg outline-none font-medium cursor-pointer"
            >
              <Icon icon="filter_off" className="text-back text-xl" />
              <p className="text-back text-nowrap text-sm">Clear Filters</p>
            </button>
          </div>
        </div>
        {!loading &&
          data &&
          (problems && problems.length > 0 ? (
            <div className="h-[100vh] flex">
              <div className="flex w-full flex-col gap-y-4 overflow-y-auto scrollbar-primary">
                {problems.map((pro) => (
                  <ProblemCard problem={pro} key={pro._id} />
                ))}
              </div>
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
          <div className="flex flex-col justify-start items-center min-h-screen mt-[4rem]">
            <Loader className="w-1/5" />
          </div>
        )}
      </div>
      <LeaderBoard />
    </section>
  );
}
