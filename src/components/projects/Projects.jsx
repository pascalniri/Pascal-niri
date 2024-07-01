import React from "react";
import Image from "next/image";
import globe from "/public/globe.svg";
import ss from "/public/ss.png";
import Link from "next/link";

const Projects = () => {
  return (
    <div className="flex flex-col justify-center items-center md:mt-[100px]">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="font-alata text-[20px]">
          I am currently looking to join a{" "}
          <span className="text-[#7127BA]">cross-functional</span> team
        </h1>
        <p className="text-[12px] font-poppins font-extralight text-[#d4d4d4] mt-[10px]">
          One that values improving people's lives through accessible design
        </p>
        <div className="w-full mt-[50px] relative">
          <Image src={globe} alt="globe" width={500} height={400} />
        </div>
      </div>

      <div className="mt-[60px] lg:mt-[150px] gap-x-[20px] gap-y-[30px] flex flex-col justify-center items-center  md:grid md:grid-cols-1 lg:grid lg:grid-cols-2">
        <div className="h-full w-full">
          <Image
            src={ss}
            alt="pascal"
            height={400}
            width={400}
            className="w-full rounded-3xl border border-white"
          />
        </div>
        <div className="h-full w-full">
          <p className="text-[#ffffff] text-[14px] font-poppins font-light mb-[10px]">
            Featured project
          </p>
          <div className="bg-[#7027ba24] px-[20px] py-[30px] rounded-[10px]">
            <h1 className="font-alata text-[20px]">First project name</h1>
            <p className="text-[12px] font-poppins font-extralight text-[#d4d4d4] mt-[10px]">
            This will be the full sescription of a project either I featured on or the one I have built personally without anyones help. I hope this description will provide more information on about my skills in UI/UX design or software engineering bottom will be also a button which directs someone to that project listed in my portfolio section
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="border-[2px] border-[#693B93] bg-[#2C1250] px-[30px] py-[10px] rounded-md text-[12px] font-medium text-[#ffffff] mt-5"
              >
                Visit the site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[60px] lg:mt-[150px] gap-x-[20px] gap-y-[30px] flex flex-col-reverse justify-center items-center  md:grid md:grid-cols-1 lg:grid lg:grid-cols-2">
        <div className="h-full w-full">
          <p className="text-[#ffffff] text-[14px] font-poppins font-light mb-[10px]">
            Featured project
          </p>
          <div className="bg-[#7027ba24] px-[20px] py-[30px] rounded-[10px]">
            <h1 className="font-alata text-[20px]">First project name</h1>
            <p className="text-[12px] font-poppins font-extralight text-[#d4d4d4] mt-[10px]">
              This will be the full sescription of a project either I featured on or the one I have built personally without anyones help. I hope this description will provide more information on about my skills in UI/UX design or software engineering bottom will be also a button which directs someone to that project listed in my portfolio section
            </p>
            <div className="mt-5">
              <Link
                href="#"
                className="border-[2px] border-[#693B93] bg-[#2C1250] px-[30px] py-[10px] rounded-md text-[12px] font-medium text-[#ffffff] mt-5"
              >
                Visit the site
              </Link>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <Image
            src={ss}
            alt="pascal"
            height={400}
            width={400}
            className="w-full rounded-3xl border border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
