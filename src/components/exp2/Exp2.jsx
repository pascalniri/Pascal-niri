"use client";

import { useRef, useState, useEffect } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaHandPointRight } from "react-icons/fa";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firestore from "../../app/firebase";

const Exp2 = () => {
  const nameRef = useRef();
  const commentRef = useRef();
  const [comments, setComments] = useState([]);
  const [passwordInput, setPasswordInput] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [errors, setErrors] = useState({ name: "", comment: "" });

  const password = "2002"; // Set the password directly in the code

  useEffect(() => {
    const fetchComments = async () => {
      const ref = collection(firestore, "messages");
      const snapshot = await getDocs(ref);
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    };

    fetchComments();
  }, []);

  const fetchComments = async () => {
    const ref = collection(firestore, "messages");
    const snapshot = await getDocs(ref);
    const commentsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentsData);
  };

  const validateTextOnly = (text) => {
    const regex = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}\p{Emoji}]*$/u;
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!validateTextOnly(editedComment)) {
      setErrors({ ...errors, comment: "Comment can only contain letters and spaces." });
      return;
    }

    try {
      const commentRef = doc(firestore, "messages", commentToEdit);
      await updateDoc(commentRef, { comment: editedComment });
      console.log("Document successfully updated!");
      setCommentToEdit(null);
      setEditedComment("");
      fetchComments();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const experiences = [
    {
      id: 1,
      title: "Purpose and Goals",
      desc: "Define the primary objectives of your prototyping and wireframing process. Are you aiming to validate a new concept, improve user experience, or test specific functionalities? Knowing your goals will help guide the level of detail and fidelity required for your prototypes and wireframes.",
    },
    {
      id: 2,
      title: "Audience",
      desc: "Identify who will be using or reviewing your prototypes and wireframes. Whether it's stakeholders, developers, or end-users, tailoring your approach to your audience ensures that the prototypes and wireframes are relevant and understandable to them.",
    },
    {
      id: 3,
      title: "Fidelity Level",
      desc: "Decide between low-fidelity and high-fidelity prototypes and wireframes based on the stage of the design process. Low-fidelity versions are quicker and easier to produce and are great for early-stage exploration, while high-fidelity versions are more detailed and suitable for later stages when specific interactions and design elements need testing.",
    },
    {
      id: 4,
      title: "Tools and Resources",
      desc: "Choose the right tools for your prototyping and wireframing needs. Tools like Adobe XD, Figma, Sketch, and Balsamiq each have unique strengths, so select one that aligns with your project's requirements and your team's expertise.",
    },
    {
      id: 5,
      title: "Iterative Process",
      desc: "Approach prototyping and wireframing as iterative processes. Start with basic versions, gather feedback, and refine your designs through multiple iterations. This approach allows you to continuously improve and align with user needs and project goals.",
    },
    {
        id: 6,
        title: "User Feedback",
        desc: "Incorporate user feedback early and often. Conduct usability testing with real users to gather insights into how they interact with your prototypes and wireframes. This feedback is invaluable for making informed design decisions.",
      },
      {
        id: 7,
        title: "Collaboration",
        desc: "Foster collaboration among designers, developers, and stakeholders. Use collaborative tools and maintain open communication channels to ensure everyone is aligned and can contribute to the design process effectively.",
      },
      {
        id: 8,
        title: "Usability and Accessibility",
        desc: "Ensure your prototypes and wireframes adhere to usability and accessibility standards. Consider how different users, including those with disabilities, will interact with your designs. Implement best practices for navigation, readability, and interaction to create inclusive user experiences.",
      },
      {
        id: 9,
        title: "Scope and Detail",
        desc: "Balance the scope and level of detail in your prototypes and wireframes. Too much detail can overwhelm and slow down the process, while too little may not provide enough information. Aim for a level of detail that supports clear communication and effective testing.",
      },
      {
        id: 10,
        title: "Scalability",
        desc: "Design your wireframes and prototypes to be scalable. Consider how your design will adapt to different screen sizes and devices. Responsive design principles should be integrated early to ensure your final product is versatile and user-friendly across platforms.",
      },
  ];

  return (
    <div className="mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px] lg:w-[80%]">
      <div>
        <div className="flex flex-row gap-5 px-[20px] py-[30px] rounded-[10px] bg-[#2C1250] md:mt-[30px]">
          <VscDebugBreakpointLog className="text-[40px]" />
          <div>
            <h1 className="font-alata text-[20px]">Prototyping and Wireframing</h1>
            <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[10px]">
            This experience includes creating low-fidelity sketches to high-fidelity interactive prototypes. Below are some key points I consider:
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

          <h1 className="font-alata text-[20px] mt-[50px]">Leave your comment</h1>
          <div className="mt-[30px]">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-[20px]">
                <p className="text-[12px] font-poppins font-light text-[#b3b3b3]">
                  <strong className="font-medium">{comment.name}:</strong> {comment.comment}
                </p>
              </div>
            ))}
          </div>

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

export default Exp2;
