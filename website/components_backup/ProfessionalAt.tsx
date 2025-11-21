"use client";

import MouseFollow from "./MouseFollow";
import Copy from "./Copy";
import Link from "next/link";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiPytorch,
  SiTailwindcss
} from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

// Tech stack items with their icons and links - 根據專題報告的實際技術棧
const techStack = [
  // First row (3 items) - 前端技術
  {
    name: "React",
    href: "https://react.dev/",
    Icon: SiReact,
    size: 90,
  },
  {
    name: "Next.js",
    href: "https://nextjs.org/",
    Icon: SiNextdotjs,
    size: 150,
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    Icon: SiTypescript,
    size: 70,
  },
  // Second row (7 items) - 後端與 AI 技術
  {
    name: "Python",
    href: "https://www.python.org/",
    Icon: SiPython,
    size: 80,
  },
  {
    name: "PyTorch",
    href: "https://pytorch.org/",
    Icon: SiPytorch,
    size: 80,
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    Icon: SiTailwindcss,
    size: 70,
  },
  {
    name: "FastAPI",
    href: "https://fastapi.tiangolo.com/",
    Icon: SiPython,
    size: 50,
  },
  {
    name: "YOLOv11",
    href: "https://github.com/ultralytics/ultralytics",
    Icon: SiPytorch,
    size: 50,
  },
  {
    name: "ONNX",
    href: "https://onnxruntime.ai/",
    Icon: SiPython,
    size: 50,
  },
  {
    name: "OpenCV",
    href: "https://opencv.org/",
    Icon: SiPython,
    size: 60,
  },
];

export default function ProfessionalAt() {
  const { t } = useLanguage();
  const firstRow = techStack.slice(0, 3);
  const secondRow = techStack.slice(3);

  return (
    <section id="tech" className="pb-24 px-4 lg:px-8">
      <Copy delay={0.1}>
        <h4 className="font-semibold uppercase mb-4 text-slate-100 text-blue-400">
          {t.tech.title}
        </h4>
        <p className="text-sm text-slate-400 mb-8">
          {t.tech.subtitle}
        </p>
      </Copy>

      <MouseFollow className="relative">
        {/* Desktop Grid - 2 rows */}
        <div className="hidden lg:grid grid-rows-2">
          {/* First row - 3 columns */}
          <div className="grid grid-cols-3 border-b border-slate-700 h-[clamp(200px,20vw,400px)]">
            {firstRow.map((tech) => (
              <Link
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid-item flex flex-col items-center justify-center gap-3 border-r border-slate-700 last:border-r-0 group cursor-pointer bg-slate-900 transition-colors duration-300 hover:bg-slate-800"
                aria-label={`Visit ${tech.name} website`}
              >
                <tech.Icon
                  className="z-10 transition-all duration-300 text-slate-100 group-hover:scale-110"
                  style={{ width: tech.size, height: tech.size }}
                />
                <span className="text-sm text-slate-400 group-hover:text-blue-400 transition-colors">
                  {tech.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Second row - 7 columns */}
          <div className="grid grid-cols-7 h-[clamp(200px,15vw,400px)]">
            {secondRow.map((tech, index) => (
              <Link
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`grid-item flex flex-col items-center justify-center gap-2 border-r border-slate-700 ${index === secondRow.length - 1 ? 'border-r-0' : ''} group cursor-pointer bg-slate-900 transition-colors duration-300 hover:bg-slate-800`}
                aria-label={`Visit ${tech.name} website`}
              >
                <tech.Icon
                  className="z-10 transition-all duration-300 text-slate-100 group-hover:scale-110"
                  style={{ width: tech.size, height: tech.size }}
                />
                <span className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
                  {tech.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Grid - 2 columns */}
        <div className="grid grid-cols-2 lg:hidden">
          {techStack.map((tech, index) => {
            const isLastRow = index >= techStack.length - 2;
            const isRightColumn = index % 2 === 1;

            return (
              <Link
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`grid-item flex items-center justify-center border-r border-b border-slate-700 ${isRightColumn ? 'border-r-0' : ''} ${isLastRow ? 'border-b-0' : ''} group cursor-pointer h-[clamp(200px,20vw,400px)] bg-slate-900 transition-colors duration-300 hover:bg-slate-800`}
                aria-label={`Visit ${tech.name} website`}
              >
                <div className="flex flex-col items-center gap-2">
                  <tech.Icon
                    className="z-10 transition-all duration-300 text-slate-100 group-hover:scale-110"
                    style={{ width: tech.size * 0.8, height: tech.size * 0.8 }}
                  />
                  <span className="text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
                    {tech.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </MouseFollow>
    </section>
  );
}

