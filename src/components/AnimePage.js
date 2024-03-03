import React, { useState, useEffect } from "react";
// import fire from '../fire';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getMovieById, getMovieVideosById } from "../helpers";
import { Header } from "./Header";
import YouTube from "react-youtube";
import appConfig from "../configs";
import { CiCalendarDate, CiTimer } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const AnimePage = () => {
  const { id } = useParams();
  const [movieData, setmovieData] = useState({
    status: "nodata",
    result: null,
  });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (id) {
      setmovieData({ status: "loading", result: [] });
      getMovieById(id)
        .then((res) => {
          console.log(res);
          setmovieData({ status: "success", result: res });
        })
        .catch((err) => {
          setmovieData({ status: "failed", result: [] });
        });

      getMovieVideosById(id)
        .then((res) => {
          setVideos(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const opts = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
      frameborder: 1,
    },
  };

  return (
    <div className="h-screen flex flex-col bg-dark">
      <Header searchTab={false} />
      <div className="h-full w-full overflow-y-auto">
        {movieData.result ? (
          <>
           {/* <LazyLoadImage
                          alt={movieData?.backdrop_path}
                          src={appConfig.img_path + movieData.result?.backdrop_path}
                          effect="blur"
                          width="100%"
                          className="w-[100%] h-[200px] sm:h-[300px] md:h-[500px] object-cover"
                        /> */}
            <img
              className="w-[100%] h-[200px] sm:h-[300px] md:h-[500px] object-cover"
              src={appConfig.img_path + movieData.result?.backdrop_path}
            />
            <div className="flex gap-10">
              {/* <img
                src={appConfig.img_path + movieData.result?.poster_path}
                width="250px"
                className="-mt-20 ml-[5%] rounded-md shadow-[-2px_2px_6px_0px] shadow-grey/70 h-[400px] hidden md:block z-50"
              /> */}
              <div className="-mt-20 ml-[5%] ">
               <LazyLoadImage
                          alt={movieData.result?.poster_path}
                          src={appConfig.img_path + movieData.result?.poster_path}
                          effect="blur"
                          width="250px"
                          className="rounded-md shadow-[-2px_2px_6px_0px] shadow-grey/70 h-[400px] hidden md:block z-50"
                        />
                        </div>
              <div className="flex flex-col px-2 gap-2">
                <h2 className="text-primary text-3xl sm:text-4xl md:text-6xl font-inter font-bold py-2 bg-gradient-to-b from-light to-grey bg-clip-text text-transparent">
                  {movieData.result?.title}
                </h2>
                <div className="flex gap-4 font-inter text-light text-sm flex-wrap">
                  <div className="flex items-center ">
                    <p className="border border-grey px-1">12+</p>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    <CiCalendarDate className="h-8 w-6" />
                    <p>{movieData.result?.release_date}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <CiTimer className="h-8 w-6" />
                    <p>{(movieData.result?.runtime / 60).toFixed(2)} hr</p>
                  </div>

                  <div className="flex items-center bg-secondary/50 px-4 py-1 rounded-lg">
                    {movieData?.result?.status}
                  </div>

                  <button className="font-inter bg-primary px-4 py-1 font-medium tracking-wide rounded-lg">
                    <a
                      href={appConfig.video_path + videos[0]?.key}
                      target="_blank"
                    >
                      Watch Trailer
                    </a>
                  </button>
                </div>

                <div className="flex gap-4 ">
                  {movieData?.result?.genres?.map((type) => {
                    return (
                      <p className="my-2 px-2 py-0 sm:py-1 text-sm md:text-md bg-secondary text-light rounded-lg min-w-[60px] font-inter ">
                        {type.name}
                      </p>
                    );
                  })}
                </div>

                <p className="text-light text-base font-inter font-semibold tracking-widest bg-gradient-to-br from-grey to-light  bg-clip-text text-transparent">
                  {movieData.result?.overview}
                </p>

                <div className="py-4 flex flex-col font-inter text-light">
                  <p className="font-medium text-lg md:text-2xl">Production Companies</p>
                  <div className="flex gap-4 p-4 flex-wrap">
                    {movieData.result?.production_companies?.map((company) => {
                      return (
                        company?.logo_path && (
                          <div className="flex w-max gap-3 items-center py-1 px-2 bg-gradient-to-tr from-grey to-secondary rounded-md ">
                            <img
                              src={appConfig.img_path + company?.logo_path}
                              className="h-[30px] w-[30px] rounded-full"
                            />
                            <p className="text-sm">{company.name}</p>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col font-inter text-light">
                  <p className="font-medium text-lg md:text-2xl">Brief Introduction</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 p-4 gap-6">
                    <div className="flex flex-col ">
                      <p className="font-medium text-md  md:text-lg">
                        {movieData?.result?.spoken_languages?.length
                          ? movieData?.result?.spoken_languages?.map(
                              (lang) => lang.english_name + ","
                            )
                          : "-"}
                      </p>
                      <p className="text-sm text-grey">Languages</p>
                    </div>

                    <div className="flex flex-col ">
                      <p className="font-medium text-lg">
                        {movieData.result?.budget
                          ? movieData.result?.budget
                          : "-"}
                      </p>
                      <p className="text-sm text-grey">Budget</p>
                    </div>

                    <div className="flex flex-col ">
                      <p className="font-medium text-lg">
                        {movieData.result?.revenue
                          ? movieData.result?.revenue
                          : "-"}
                      </p>
                      <p className="text-sm text-grey">Revenue</p>
                    </div>

                    <div className="flex flex-col ">
                      <p className="font-medium text-lg">
                        {(movieData.result?.vote_average / 2)?.toFixed(1)}
                      </p>
                      <p className="text-sm text-grey">Rating</p>
                    </div>

                    <div className="flex flex-col ">
                      <p className="font-medium text-lg">
                        {movieData.result?.vote_count}
                      </p>
                      <p className="text-sm text-grey">Votes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-2 border border-grey/40" />
            <div className="w-full font-inter flex flex-col px-[5%] py-2  text-light">
              <p className="font-medium text-2xl">Top Billed Cast</p>
              <div className="flex gap-6 overflow-x-auto py-6">
                {movieData.result?.credits?.cast?.map((cast) => {
                  return (
                    cast.profile_path && (
                      <div className="flex flex-col bg-light text-secondary rounded-lg w-[200px] ">
                        <div className="flex w-[200px] h-[200px] ">
                          <img src={appConfig.img_path + cast.profile_path} width="100%" height="100%"  className="object-cover"/>
                        </div>
                        <div>
                        <p className="px-2 py-1 text-lg font-semibold ">
                          {cast.name}
                        </p>
                        <p className="px-2 text-sm">{cast.character}</p>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>

            <hr className="my-2 border border-grey/40" />
            <div className="w-full font-inter flex flex-col px-[5%] py-2 text-light">
              <p className="font-medium text-2xl">Trailer and shots</p>
              <div className="flex gap-6 overflow-x-auto py-6">
                {videos?.length &&
                  videos.map((video) => {
                    return (
                      <div>
                        <YouTube videoId={video?.key} opts={opts} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <div className="loader">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AnimePage;
