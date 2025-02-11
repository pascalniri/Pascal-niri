import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  const experience = [
    {
      id: 1,
      image: "../one.svg",
      title: "User Research and Analysis",
      desc: "Understanding user needs and behaviors is crucial for designing intuitive and user-friendly interfaces. This experience involves conducting surveys, interviews,..",
      path:"/exp1"
    },
    {
      id: 2,
      image: "../two.svg",
      title: "Prototyping and Wireframing",
      desc: "Prototyping and wireframing are essential skills for visualizing and testing design concepts before development begins. This experience includes creating low-fidelity...",
       path:"/exp2"
    },
    {
      id: 3,
      image: "../three.svg",
      title: "Front-End Development",
      desc: "Understanding user needs and behaviors is crucial for designing intuitive and user-friendly interfaces. This experience involves conducting surveys, interviews,...",
       path:"/exp3"
    },
    {
      id: 4,
      image: "../four.svg",
      title: "Agile and Collaborative Workflows",
      desc: "Collaboration and flexibility are key in the fast-paced world of UI/UX design and software development. This experience involves working within Agile frameworks...",
       path:"/exp4"
    },
  ];

  return (
    <div
      id="about"
      className="mx-auto py-[100px] md:py-[20px] flex flex-col justify-center items-center lg:w-[80%]"
    >
      <h1 className="mb-[70px] font-alata text-[30px]">
        <span className="text-[#7127BA]">X</span>-periences
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {experience.map((experience) => (
          <div
            key={experience.id}
            className="flex justify-center flex-col text-left md:flex-row gap-[20px] bg-[#38156881] px-[20px] py-[10px] rounded-md border-t-[4px] border-[#693B93]"
          >
            <Image src={experience.image} alt="one" width="100" height="100" />
            <div className="font-poppins ">
              <h1 className="font-alata text-[18px]">{experience.title}</h1>
              <p className="text-[12px] font-extralight text-[#d4d4d4] mt-[10px]">
                {experience.desc}
              </p>

              <Link href={experience.path}>
                <button className="bg-[#2C1250] px-[30px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#ffffff] outline-none border border-[#7127BA] hover:bg-[#855bbf60] mt-[10px]">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
