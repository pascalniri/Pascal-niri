"use client";

import { useRef, useState, useEffect } from "react";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { FaHandPointRight } from "react-icons/fa";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import firestore from "../../app/firebase";

const Exp4 = () => {
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
      title: "Agile Principles",
      desc: "Agile is based on iterative development, where requirements and solutions evolve through collaboration between self-organizing cross-functional teams. Key principles include customer satisfaction, welcoming changing requirements, and delivering working software frequently.",
    },
    {
      id: 2,
      title: "Scrum Framework",
      desc: "Scrum is a popular Agile framework that divides work into time-boxed iterations called sprints, typically lasting 1-4 weeks. Key roles include the Product Owner, Scrum Master, and Development Team. Scrum ceremonies include Sprint Planning, Daily Stand-ups, Sprint Reviews, and Retrospectives.",
    },
    {
      id: 3,
      title: "Kanban",
      desc: "Kanban is another Agile approach that focuses on visualizing the workflow, limiting work in progress, and improving efficiency. It uses a Kanban board to track tasks through columns representing different stages of the workflow.",
    },
    {
      id: 4,
      title: "Collaboration Tools",
      desc: "Utilize tools like Jira, Trello, Asana, or Monday.com to manage tasks, track progress, and facilitate collaboration. Communication tools like Slack, Microsoft Teams, and Zoom are essential for remote and distributed teams.",
    },
    {
      id: 5,
      title: "User Stories and Epics",
      desc: "Write user stories to capture requirements from the user's perspective. An epic is a large user story that can be broken down into smaller, more manageable user stories. This approach ensures that development is focused on user needs and business value.",
    },
    {
        id: 6,
        title: "Backlog Grooming",
        desc: "Regularly refine and prioritize the product backlog to ensure that the team is working on the most valuable and relevant tasks. This involves adding new user stories, updating existing ones, and removing outdated or irrelevant tasks.",
      },
      {
        id: 7,
        title: "ontinuous Integration and Continuous Deployment (CI/CD)",
        desc: "Implement CI/CD practices to automate the testing and deployment of code. This ensures that changes are integrated smoothly and deployed frequently, reducing the risk of errors and enabling faster delivery of features.",
      },
      {
        id: 8,
        title: "Feedback Loops",
        desc: "Establish regular feedback loops with stakeholders and users. This can be done through sprint reviews, user testing sessions, and feedback surveys. Continuous feedback helps ensure that the product meets user expectations and allows for timely adjustments.",
      },
      {
        id: 9,
        title: "Retrospectives",
        desc: "Conduct retrospectives at the end of each sprint to reflect on what went well, what didn't, and how processes can be improved. This practice fosters a culture of continuous improvement and learning within the team.",
      },
      {
        id: 10,
        title: "Cross-Functional Teams",
        desc: "Build cross-functional teams that include members with diverse skills, such as designers, developers, testers, and product managers. This diversity allows the team to address all aspects of product development collaboratively and efficiently.",
      },
      {
        id: 11,
        title: "Flexibility and Adaptability",
        desc: "Be prepared to adapt to changes in requirements, technology, and market conditions. Agile methodologies emphasize the ability to pivot and adjust plans based on new information and changing circumstances.",
      },
      {
        id: 12,
        title: "Documentation and Knowledge Sharing",
        desc: "Maintain clear and accessible documentation for processes, decisions, and product features. Encourage knowledge sharing through regular meetings, workshops, and documentation practices to ensure that team members are informed and aligned.",
      },
      {
        id: 13,
        title: "Stakeholder Engagement",
        desc: "Involve stakeholders throughout the development process. Regular updates, demonstrations, and feedback sessions help keep stakeholders informed and engaged, ensuring their needs and expectations are met.",
      },
  ];

  return (
    <div className="mx-auto px-4 min-h-[100vh] sm:px-[50px] md:px-[100px] lg:px-[60px] lg:w-[80%]">
      <div>
        <div className="flex flex-row gap-5 px-[20px] py-[30px] rounded-[10px] bg-[#2C1250] md:mt-[30px]">
          <VscDebugBreakpointLog className="text-[40px]" />
          <div>
            <h1 className="font-alata text-[20px]">Agile and Collaborative Workflows</h1>
            <p className="text-[12px] font-poppins font-light text-[#d4d4d4] mt-[10px]">
            Collaboration and flexibility are key in the fast-paced world of UI/UX design and software development. This experience involves working within Agile frameworks to ensure iterative progress, continuous feedback, and efficient collaboration among team members. Below are some key points I consider:</p>
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

export default Exp4;
