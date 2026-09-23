import smartServiceDispatchImg from "../assets/projects/smart-service-dispatch.png";
import developerPortfolioImg from "../assets/projects/developer-portfolio.png";
import todoManagerImg from "../assets/projects/todo-manager.png";

export const projects = [
  {
    id: "project-1",
    title: "Smart Service Dispatch System",
    description:
      "A Python-based service dispatch system that intelligently matches customers with suitable technicians using semantic service detection, skills, location, availability, workload, and ratings.",
    problem: "",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "SQLModel",
      "ChromaDB",
      "JWT",
    ],
    features: [
      "Intelligent technician matching",
      "Semantic service detection with ChromaDB",
      "JWT authentication and role-based access",
      "Service tracking, history, and feedback",
    ],
    github: "",
    liveDemo: "",
    image: smartServiceDispatchImg,
    imagePosition: "top",
    status: "Currently Building",
  },
  {
    id: "project-2",
    title: "Personal Developer Portfolio",
    description:
      "A responsive single-page developer portfolio built to showcase my technical skills, projects, professional experience, education, and contact information with a modern, accessible, and responsive user experience.",
    problem: "",
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Motion",
      "React Router",
      "Lucide React",
    ],
    features: [
      "Responsive single-page layout",
      "Project and experience showcase",
      "Smooth section navigation",
      "Resume download",
      "GitHub, LinkedIn, and WhatsApp integration",
      "Responsive contact form",
    ],
    github: "",
    liveDemo: "",
    image: developerPortfolioImg,
    imagePosition: "top",
    status: "Completed",
  },
  {
    id: "project-3",
    title: "Todo Manager",
    description:
      "A modern task management application built with React and Redux Toolkit to demonstrate scalable state management, reusable components, and efficient task management workflows.",
    problem: "",
    technologies: [
      "React",
      "JavaScript",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Vite",
    ],
    features: [
      "Todo creation, editing, completion, and deletion",
      "Centralized state management with Redux Toolkit",
      "Search, filtering, and sorting functionality",
      "Task priorities, categories, and due dates",
      "Persistent state with localStorage",
      "Responsive and modern user interface",
    ],
    github: "",
    liveDemo: "",
    image: todoManagerImg,
    imagePosition: "top",
    status: "Currently Building",
  },
];

export default projects;
