import React, { useState, useEffect } from "react";
import { Link, useSearchParams,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { getMovies } from "../helpers";
import { FaStar, FaEye } from "react-icons/fa";
import appConfig from "../configs";

const MainPage = () => {
  const MotionLink = motion(Link);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchedTerm, setSearchedTerm] = useState(searchParams.get("search"));
  const [movieDetails, setMovieDetails] = useState({
    status: "nodata",
    result: [],
  });

  useEffect(() => {
    setSearchedTerm(searchParams.get("search"));
  }, [searchParams.get("search")]);

  useEffect(() => {
    if (searchedTerm) {
      setMovieDetails({ status: "loading", result: [] });
      getMovies(searchedTerm, "/search/movie")
        .then((res) => {
          if (res?.length) setMovieDetails({ status: "success", result: res });
          else setMovieDetails({ status: "nodata", result: res });
        })
        .catch((err) => setMovieDetails({ status: "error", result: [] }));
    } else {
      setMovieDetails({ status: "loading", result: [] });
      getMovies(searchedTerm, "/movie/popular")
        .then((res) => {
          console.log(res);
          setMovieDetails({ status: "success", result: res });
        })
        .catch((err) => setMovieDetails({ status: "error", result: [] }));
    }
  }, [searchedTerm]);

  return (
    <div className="flex flex-col gap-2 bg-gradient-to-br from-dark to-secondary h-screen">
      <Header searchTab={true} />
      <div className="h-full w-full flex flex-col gap-2 grow overflow-y-auto">
        {movieDetails.status == "loading" ? (
          <div className="w-full h-full flex">
            <img className="w-1/6 m-auto" src="/projects/loader.svg" />
          </div>
        ) : movieDetails.status == "error" ? (
          <div className="text-primary">Failed Fetching Data</div>
        ) : movieDetails.status == "nodata" ? (
          <div className="w-[90%] lg:w-1/4 h-[70%] m-auto text-dark bg-white rounded-3xl">
              <div className="h-full flex flex-col font-inter items-center justify-center gap-4 p-4 sm:p-12 text-center">
                <img src="/projects/EmptyState.png" width="300"  className="object-cover"/>
                <p className="text-2xl font-semibold">Sorry, couldn't find data</p>
                <p className="text-lg font-medium">please provide other movie name or refresh for top movies</p>
                <button className="w-1/2 p-2 bg-dark text-light rounded-lg font-semibold" onClick={()=>navigate(`/mainpage?search=`)}>Refresh</button>
              </div>
          </div>
        ) : (
          <div className="px-[5%] py-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            {movieDetails?.result?.length &&
              movieDetails?.result.map((movie) => {
                return (
                  <MotionLink
                    key={movie.id}
                    to={`/anime/${movie.id}?search=${searchedTerm}`}
                  >
                    <div className="w-full overflow-hidden rounded-lg flex flex-col bg-white/10 text-light group">
                      <div className=" w-full overflow-hidden ">
                        <img
                          className="mx-auto h-auto group-hover:scale-110 transition-all duration-200 ease-in"
                          src={appConfig.img_path + movie?.poster_path}
                        />
                      </div>
                      <div className="px-2 pb-2 pt-3 shrink-0">
                        <h1 className="font-inter font-bold text-xl truncate pr-1 mb-2">
                          {movie?.title}
                        </h1>
                        <div className="flex gap-2 items-center flex-wrap">
                          <div
                            title="Average votes"
                            className="flex gap-2 items-center bg-secondary border border-grey px-3 py-1 w-fit rounded-full"
                          >
                            <p className="text-xs font-inter font-bold">
                              {(movie?.vote_average / 2)?.toFixed(1)}
                            </p>
                            <FaStar className="h-3 w-3 " />
                          </div>
                          <div
                            title="Average votes"
                            className="flex gap-2 items-center bg-secondary border border-grey  px-3 py-1 w-fit rounded-full"
                          >
                            <p className="text-xs font-inter font-bold">
                              {movie?.vote_count}
                            </p>
                            <FaEye className="h-3 w-3 " />
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionLink>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
