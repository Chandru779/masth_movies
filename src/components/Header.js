import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { IoSearch  } from "react-icons/io5";
import { TiArrowBackOutline } from "react-icons/ti";


export const Header = ({searchTab}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleSearch = (e)=>{
      setSearchParams({search:e.target.value})
  }

  return (
    <header className="text-light py-3 px-[2%] tracking-wider flex justify-between items-center">
      <Link to="/">
        <p className="hidden sm:block border border-grey sm:border-0 font-inter font-extrabold text-light sm:text-2xl px-3 py-1 ">
          Masth Movies
        </p>
        <img title="Masth movies" src="/brand/apple-touch-icon.png" width="40px" className=" sm:hidden border-2 border-primary rounded-full p-1" />
      </Link>
      {searchTab ? 
      <div
        title="Search Movies title"
        className=" sm:w-1/2 md:w-1/3 lg:w-1/4 flex gap-2 justify-between items-center rounded-md px-3 bg-white/10 border border-grey outline-none "
      >
        <input
          className="flex-1 sm:px-2 py-2 bg-transparent outline-none border-r border-grey"
          placeholder="Search your favourite movies"
          value={searchParams.get("search")}
          onChange={handleSearch}
        />
        <IoSearch
          onClick={() => {
            navigate({
              pathname: `/mainpage`,
              search: `${searchParams}`,
            });
          }}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
      :
      <div className="font-inter cursor-pointer flex gap-2 items-center border border-secondary bg-secondary px-3 rounded-lg h-[30px]" onClick={()=>navigate(-1)}>
        <TiArrowBackOutline 
          className="h-5 w-5"
        />
        <button>Back</button>  
      </div>}
    </header>
  );
};
