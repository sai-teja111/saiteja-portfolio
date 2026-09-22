import { Braces, Database } from "lucide-react";
import {
  SiBootstrap,
  SiCss,
  SiFastapi,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";

export const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "SQLModel", icon: Database, color: "#38BDF8" },
      { name: "ORM", icon: Braces, color: "#60A5FA" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React JS", icon: SiReact, color: "#61DAFB" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    ],
  },
  {
    title: "Cloud",
    skills: [
      { name: "Render", icon: SiRender, color: "#46E3B7" },
      { name: "Vercel", icon: SiVercel, color: "#E2E8F0" },
    ],
  },
];

export default skillCategories;
