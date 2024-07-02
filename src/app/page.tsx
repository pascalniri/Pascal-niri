import pascal from "/public/pascal.jpg";
import Image from "next/image";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col justify-center text-left mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px]">
        <div className="flex flex-col justify-center items-center md:flex md:flex-row gap-[30px]">
          <div className=" w-full flex justify-left md:justify-center items-center">
            <Image
              src={pascal}
              alt="profile"
              width={300}
              height={200}
              className="rounded-lg border-[5px] border-[#693B93]"
            />
          </div>

          <div className="w-full">
            <div>
              <p className="font-alata font-bold text-[50px]">
                Pascal <span>Niri</span>
              </p>
            </div>
            <div className="font-poppins mt-[20px]">
              <h1 className="text-[25px] font-semibold">
                I am a <span className="text-[#7127BA]">Software Engineer</span>.
              </h1>
              <p className="text-[10px]">
                Currently, I am a Software Engineer at CodetyHub
              </p>
              <p className="mt-[20px] text-[14px] font-extralight text-[#d4d4d4]">
                A self-taught UI/UX designer, functioning in the industry for 3+
                years now. I make meaningful and delightful digital products
                that create an equilibrium between user needs and business
                goals.
              </p>
            </div>
            <div className="mt-[20px]">
            <button className="bg-[#2C1250] px-[30px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#ffffff] outline-none border border-[#7127BA] hover:bg-[#855bbf60] mt-[10px]">
                Hire me
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px]">
        <About />
      </section>
      <section className="mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px]">
        <Projects />
      </section>
    </div>
  );
}
