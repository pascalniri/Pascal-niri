"use client"
import { useState, useEffect } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaHandPointRight } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const Exp1 = () => {
  const experiences = [
    {
      id: 1,
      title: "Conducting Surveys and Interviews",
      desc:
        "Gathering qualitative and quantitative data through direct interactions with users to understand their needs, preferences, and pain points.",
    },
    {
      id: 2,
      title: "Analyzing User Behavior",
      desc:
        "Utilizing tools and techniques such as user observations, usability testing, and analytics to gain insights into how users interact with interfaces.",
    },
    {
      id: 3,
      title: "Creating User Personas",
      desc:
        "Developing detailed user personas to represent different user types and guide design decisions.",
    },
    {
      id: 4,
      title: "Synthesizing Data",
      desc:
        "Compiling and interpreting data to identify trends and inform design strategies that enhance the user experience.",
    },
    {
      id: 5,
      title: "Iterative Testing",
      desc:
        "Continuously testing and refining designs based on user feedback to ensure the final product meets user expectations and business goals.",
    },
  ];

  // Load submitted comments from localStorage on initial render
  const initialComments = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("submittedComments")) || [] : [];
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedComments, setSubmittedComments] = useState(initialComments);

  // Save submitted comments to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Update localStorage on every change
      localStorage.setItem("submittedComments", JSON.stringify(submittedComments));
    }
  }, [submittedComments]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !message) {
      setError('Please fill in both fields.');
    } else {
      setError('');
      // Create a new comment object
      const newComment = {
        name: name,
        message: message,
      };
      // Update the state with the new comment
      setSubmittedComments([...submittedComments, newComment]);

      // Clear name and message fields after submission
      setName('');
      setMessage('');
    }
  }

  return (
    <div className='mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px]" lg:w-[80%]'>
      <div>
        <div className="flex flex-row gap-5 px-[20px] py-[30px] rounded-[10px] bg-[#2C1250] md:mt-[30px]">
          <VscDebugBreakpointLog className="text-[40px]" />
          <div>
            <h1 className="font-alata text-[20px]">
              User Research and Analysis
            </h1>
            <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[10px]">
              Understanding user needs and behaviors is crucial for designing
              intuitive and user-friendly interfaces. In my experience, this
              involves:
            </p>
          </div>
        </div>

        <div className="p-[40px] flex flex-col justify-center mt-[30px]">
          {experiences.map((experience) => (
            <div key={experience.id} className="mb-[30px]">
              <div className="flex items-center gap-5">
                <FaHandPointRight className="text-[20px]" />
                <h2 className="font-alata">
                  {experience.title}
                </h2>
              </div>
              <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[5px] ml-[40px]">
                {experience.desc}
              </p>
            </div>
          ))}
          <h1 className="font-alata text-[20px] underline">Leave your comment !</h1>

          {/* Display submitted comments */}
          {submittedComments.map((comment, index) => (
            <div key={index} className="mt-[30px]">
              <h1 className="font-alata flex items-center"><TbPointFilled />
                {comment.name}
              </h1>
              <p className="text-[12px] font-poppins font-light text-[#d4d4d4] ml-[16px]">
                {comment.message}
              </p>
            </div>
          ))}

          <div className="mt-[30px]">
            <form className="w-full" onSubmit={handleSubmit} >
              <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" className="w-full bg-[#2C1250] px-[20px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#d4d4d4] outline-none border border-[#7127BA]" />
              <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} type="text"  placeholder="Your comment" className="w-full h-[200px] bg-[#2C1250] px-[20px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#d4d4d4] outline-none border border-[#7127BA] mt-[20px]"  />
              {error && <p className="text-[12px] font-poppins font-light text-red-500">{error}</p>}
              <button className="bg-[#2C1250] px-[30px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#ffffff] outline-none border border-[#7127BA] hover:bg-[#855bbf60] mt-[10px]">
                Send it!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exp1;
