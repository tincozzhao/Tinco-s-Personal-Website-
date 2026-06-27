"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project, SiteContent } from "@/content/siteContent";
import {
  BotanicalCollage,
  JournalNote,
  PaperCard,
  PolaroidPhoto,
  ScrapbookPage,
  StoryChapter,
  TapeDecoration,
} from "./ScrapbookPrimitives";
import styles from "./Storyboard.module.css";

gsap.registerPlugin(ScrollTrigger);

interface StoryboardProps {
  content: SiteContent;
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.projectDialog}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-labelledby={project ? `dialog-${project.id}` : undefined}
    >
      {project && (
        <div className={styles.dialogInner}>
          <TapeDecoration tone="pink" />
          <button
            className={styles.dialogClose}
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close project details"
          >
            close <span aria-hidden="true">×</span>
          </button>
          <p className={styles.dialogNumber}>ENTRY NO. {project.number}</p>
          <h2 id={`dialog-${project.id}`}>{project.title}</h2>
          <PolaroidPhoto
            image={project.image}
            caption={`${project.title} · selected memory`}
            className={styles.dialogImage}
            rotation={-1}
          />
          <div className={styles.dialogGrid}>
            <PaperCard>
              <p className={styles.detailLabel}>THE SHORT VERSION</p>
              <p>{project.summary}</p>
            </PaperCard>
            <PaperCard>
              <p className={styles.detailLabel}>MY ROLE</p>
              <p>{project.role}</p>
            </PaperCard>
            <PaperCard>
              <p className={styles.detailLabel}>TOOLS</p>
              <p>{project.tools.join(" · ")}</p>
            </PaperCard>
            <PaperCard>
              <p className={styles.detailLabel}>OUTCOME</p>
              <p>{project.outcome}</p>
            </PaperCard>
          </div>
        </div>
      )}
    </dialog>
  );
}

function MemorySection({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  return (
    <section className={styles.projectSection} aria-labelledby="projects-title">
      <ScrapbookPage pageNumber="05" className={styles.projectPage}>
        <BotanicalCollage
          className={styles.projectBotanicals}
          index={4}
          variant="project"
        />
        <header className={styles.projectIntro} data-paper>
          <p>SELECTED MEMORIES / OPEN EACH ENTRY</p>
          <h2 id="projects-title">
            Projects &
            <br />
            Experiences
          </h2>
        </header>
        <div className={styles.projectCollage}>
          {projects.map((project, index) => (
            <button
              className={styles.projectCard}
              type="button"
              key={project.id}
              data-paper
              onClick={() => onSelect(project)}
              aria-haspopup="dialog"
              style={{ "--card-index": index } as React.CSSProperties}
            >
              <TapeDecoration tone={index % 2 === 0 ? "sage" : "pink"} />
              <PolaroidPhoto
                image={project.image}
                caption={`${project.number}`}
                rotation={index === 1 ? 3 : -2}
              />
              <span className={styles.projectNumber}>ENTRY {project.number}</span>
              <span className={styles.projectTitle}>{project.title}</span>
              <span className={styles.projectSummary}>{project.summary}</span>
              <span className={styles.projectOpen}>read the entry →</span>
            </button>
          ))}
        </div>
      </ScrapbookPage>
    </section>
  );
}

export function Storyboard({ content }: StoryboardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(content.chapters[0].yearLabel);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    let frame = 0;

    const updateYear = () => {
      const center = window.innerHeight / 2;
      const active = sections.reduce((closest, section) => {
        const current = section.getBoundingClientRect();
        const previous = closest.getBoundingClientRect();
        return Math.abs(current.top + current.height / 2 - center) <
          Math.abs(previous.top + previous.height / 2 - center)
          ? section
          : closest;
      }, sections[0]);
      if (active?.dataset.year) setActiveYear(active.dataset.year);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateYear);
    };

    updateYear();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-paper]").forEach((piece) => {
        gsap.from(piece, {
          y: 30,
          opacity: 0,
          rotate: gsap.utils.random(-2, 2),
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: piece,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((piece, index) => {
        gsap.to(piece, {
          y: index % 2 === 0 ? -12 : 12,
          duration: 3.4 + (index % 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className={styles.site} ref={rootRef}>
      <a className={styles.skipLink} href="#story">
        Skip to story
      </a>

      <header className={styles.header}>
        <a className={styles.monogram} href="#story" aria-label="Back to beginning">
          {content.monogram}
        </a>
        <nav aria-label="Main navigation">
          {content.chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={chapter.id === "present" ? "#contact" : `#${chapter.id}`}
            >
              {chapter.navLabel}
            </a>
          ))}
        </nav>
        <div className={styles.timelineBadge} aria-live="polite">
          <span>current page</span>
          <strong>{activeYear}</strong>
        </div>
      </header>

      <main>
        {content.chapters.map((chapter, index) => (
          <div key={chapter.id}>
            <StoryChapter
              chapter={chapter}
              index={index}
              introduction={index === 0 ? content.introduction : undefined}
              scrollPrompt={index === 0 ? content.scrollPrompt : undefined}
              skipLabel={index === 0 ? content.skipLabel : undefined}
            />
            {chapter.id === "work" && (
              <MemorySection
                projects={content.projects}
                onSelect={setSelectedProject}
              />
            )}
          </div>
        ))}

        <section className={styles.contact} id="contact">
          <ScrapbookPage pageNumber="06" className={styles.contactPage}>
            <BotanicalCollage
              className={styles.contactBotanicals}
              index={5}
              variant="contact"
            />
            <TapeDecoration tone="pink" className={styles.contactTape} />
            <p className={styles.contactEyebrow}>{content.contact.eyebrow}</p>
            <h2>
              {content.contact.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <PaperCard className={styles.contactDetails}>
              <p>{content.contact.note}</p>
              <span>{content.contact.emailLabel}</span>
              <ul>
                {content.contact.socialLinks.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </PaperCard>
            <JournalNote className={styles.contactNote} label="the next page">
              Check out my current projects and experiences!
            </JournalNote>
            <div className={styles.footerLine}>
              <span>{content.name}</span>
              <span>PERSONAL JOURNAL / [2026]</span>
            </div>
          </ScrapbookPage>
        </section>
      </main>

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
