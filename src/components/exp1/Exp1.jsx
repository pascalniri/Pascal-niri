"use client";

import { useRef, useState, useEffect } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaHandPointRight } from "react-icons/fa";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import firestore from "../../app/firebase";

const Exp1 = () => {
  const nameRef = useRef();
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [passwordInput, setPasswordInput] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [errors, setErrors] = useState({ name: "", comment: "" });

  const password = "2002"; // Set the password directly in the code

  useEffect(() => {
    const fetchComments = async () => {
      const ref = collection(firestore, "messages");
      const snapshot = await getDocs(ref);
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(commentsData);
    };

    fetchComments();
  }, []);

  const fetchComments = async () => {
    const ref = collection(firestore, "messages");
    const snapshot = await getDocs(ref);
    const commentsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setComments(commentsData);
  };

  const validateTextOnly = (text) => {
    const regex = /^[A-Za-z\s]*$/;
    return regex.test(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const comment = commentRef.current.value;

    let formErrors = { name: "", comment: "" };
    let hasError = false;

    if (!name) {
      formErrors.name = "Name is required.";
      hasError = true;
    } else if (!validateTextOnly(name)) {
      formErrors.name = "Name can only contain letters and spaces.";
      hasError = true;
    }

    if (!comment) {
      formErrors.comment = "Comment is required.";
      hasError = true;
    } else if (!validateTextOnly(comment)) {
      formErrors.comment = "Comment can only contain letters and spaces.";
      hasError = true;
    }

    setErrors(formErrors);

    if (!hasError) {
      try {
        const ref = collection(firestore, "messages");
        await addDoc(ref, { name, comment });
        console.log("Document successfully written!");
        nameRef.current.value = "";
        commentRef.current.value = "";
        fetchComments();
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    }
  };

  const handleDelete = async () => {
    if (passwordInput === password && commentToDelete) {
      try {
        await deleteDoc(doc(firestore, "messages", commentToDelete));
        console.log("Document successfully deleted!");
        setPasswordInput("");
        setCommentToDelete(null);
        fetchComments();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    } else {
      alert("Incorrect password or no comment selected");
    }
  };

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

  return (
    <div className='mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px] lg:w-[80%]'>
      <div>
        <div className="flex flex-row gap-5 px-[20px] py-[30px] rounded-[10px] bg-[#2C1250] md:mt-[30px]">
          <VscDebugBreakpointLog className="text-[40px]" />
          <div>
            <h1 className="font-alata text-[20px]">User Research and Analysis</h1>
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
                <h2 className="font-alata">{experience.title}</h2>
              </div>
              <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[5px] ml-[40px]">
                {experience.desc}
              </p>
            </div>
          ))}

          <h1 className="font-alata text-[20px] underline">Comments</h1>
          <div className="mt-[30px]">
            {comments.map(comment => (
              <div key={comment.id} className="mb-[20px] p-[20px] bg-[#2C1250] rounded-[7px]">
                <p className="text-[14px] font-poppins font-light text-[#d4d4d4]">
                  <strong>{comment.name}:</strong> {comment.comment}
                </p>
                <button 
                  className="bg-red-500 px-[10px] py-[5px] rounded-[7px] text-[12px] font-poppins font-light text-[#ffffff] outline-none border border-red-700 hover:bg-red-700 mt-[10px]"
                  onClick={() => setCommentToDelete(comment.id)}
                >
                  Delete
                </button>
                {commentToDelete === comment.id && (
                  <>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full bg-[#2C1250] px-[20px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#d4d4d4] outline-none border border-[#7127BA] mt-[10px]"
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <button 
                      className="bg-red-500 px-[10px] py-[5px] rounded-[7px] text-[12px] font-poppins font-light text-[#ffffff] outline-none border border-red-700 hover:bg-red-700 mt-[10px]"
                      onClick={handleDelete}
                    >
                      Confirm Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <h1 className="font-alata text-[20px] underline">Leave your comment</h1>
          <div className="mt-[30px]">
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                ref={nameRef}
                type="text"
                placeholder="Enter your name"
                className="w-full bg-[#2C1250] px-[20px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#d4d4d4] outline-none border border-[#7127BA]"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              <textarea
                id="message"
                name="message"
                ref={commentRef}
                type="text"
                placeholder="Your comment"
                className="w-full h-[200px] bg-[#2C1250] px-[20px] py-[10px] rounded-[7px] text-[12px] font-poppins font-light text-[#d4d4d4] outline-none border border-[#7127BA] mt-[20px]"
              />
              {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
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
