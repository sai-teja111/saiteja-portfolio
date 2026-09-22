import { useEffect, useState } from "react";

import { navigationItems } from "../data/navigation";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId, behavior = "smooth") => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const navbar = document.querySelector("header");
    const navbarHeight = navbar
      ? navbar.getBoundingClientRect().height
      : 0;

    const gap = 24;
    const sectionTop =
      section.getBoundingClientRect().top + window.scrollY;
    const targetPosition = sectionTop - navbarHeight - gap;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior,
    });
  };

  const handleNavigate = (href) => {
    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    window.history.pushState(null, "", `/#${sectionId}`);
    scrollToSection(sectionId, "smooth");
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const sectionId = window.location.hash.substring(1);

      if (!sectionId) {
        setActiveSection("home");
        return;
      }

      if (!document.getElementById(sectionId)) {
        return;
      }

      setActiveSection(sectionId);

      setTimeout(() => {
        scrollToSection(sectionId, "auto");
      }, 50);
    };

    handleHash();

    window.addEventListener("popstate", handleHash);
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("popstate", handleHash);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return {
    activeSection,
    setActiveSection,
    handleNavigate,
    scrollToSection,
  };
}

export default useActiveSection;
