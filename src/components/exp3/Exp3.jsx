"use client";

import { useRef, useState, useEffect } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaHandPointRight } from "react-icons/fa";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firestore from "../../app/firebase";

const Exp3 = () => {
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
      title: "User Research",
      desc: "Conduct surveys, interviews, and usability testing to gather qualitative and quantitative data. Understanding your users' needs, preferences, and pain points will help you design interfaces that are intuitive and meet their expectations..",
    },
    {
      id: 2,
      title: "Responsive Design",
      desc: "Ensure your designs are responsive, meaning they work well on a variety of devices and screen sizes. This includes using flexible grid layouts, scalable images, and CSS media queries to create a seamless user experience across desktops, tablets, and mobile devices.",
    },
    {
      id: 3,
      title: "Accessibility",
      desc: "Design with accessibility in mind to ensure that your interfaces are usable by people with disabilities. Implementing features like keyboard navigation, screen reader compatibility, and sufficient color contrast will make your site inclusive and compliant with standards like WCAG (Web Content Accessibility Guidelines).",
    },
    {
      id: 4,
      title: "Performance Optimization",
      desc: "Optimize your website's performance by minimizing file sizes, leveraging browser caching, and using efficient coding practices. Faster load times improve user experience and can positively impact search engine rankings.",
    },
    {
      id: 5,
      title: "Usability",
      desc: "Focus on usability to make your interfaces easy to navigate and interact with. This includes clear labeling, intuitive navigation, and providing feedback for user actions. Conducting usability testing can help identify areas for improvement.",
    },
    {
        id: 6,
        title: "Cross-Browser Compatibility",
        desc: "Ensure your website works correctly across different browsers and their various versions. Test your site in browsers like Chrome, Firefox, Safari, and Edge to identify and fix any compatibility issues.",
      },
      {
        id: 7,
        title: "Consistent Design Language",
        desc: "Maintain a consistent design language throughout your site. This includes using a cohesive color scheme, typography, and design elements. Consistency helps users understand and navigate your site more easily.",
      },
      {
        id: 8,
        title: "Interactivity",
        desc: "Incorporate interactive elements like animations, transitions, and dynamic content to engage users. Ensure these elements enhance the user experience without causing distractions or performance issues.",
      },
      {
        id: 9,
        title: "Component-Based Architecture",
        desc: "Use a component-based architecture, such as in frameworks like React, Angular, or Vue.js, to build reusable and maintainable code. This approach allows for modular development and easier updates.",
      },
      {
        id: 10,
        title: "Testing and Debugging",
        desc: "Regularly test your code for bugs and issues. Use tools like Jest, Mocha, or Cypress for automated testing, and browser developer tools for debugging. Continuous testing ensures a reliable and stable product.",
      },
      {
        id: 11,
        title: "Version Control",
        desc: "Use version control systems like Git to manage your codebase. Version control allows you to track changes, collaborate with other developers, and revert to previous versions if necessary.",
      },
      {
        id: 12,
        title: "Documentation",
        desc: "Maintain thorough documentation for your code and design decisions. Good documentation helps new team members get up to speed quickly and ensures that everyone understands the project's architecture and standards.",
      },
  ];

  return (
    <div className="mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px] lg:w-[80%]">
      <div>
        <div className="flex flex-row gap-5 px-[20px] py-[30px] rounded-[10px] bg-[#2C1250] md:mt-[30px]">
          <VscDebugBreakpointLog className="text-[40px]" />
          <div>
            <h1 className="font-alata text-[20px]">Front-End Development</h1>
            <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[10px]">
            Understanding user needs and behaviors is crucial for designing intuitive and user-friendly interfaces. This experience involves conducting surveys, interviews, and analyzing user data to inform design decisions. Below are some key points I consider:            </p>
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

export default Exp3;
