import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import type { Chapter, ImagePlaceholder } from "@/content/siteContent";
import { Character } from "./Character";
import styles from "./Storyboard.module.css";

interface ClassNameProps {
  className?: string;
}

export function TapeDecoration({
  className = "",
  tone = "sage",
}: ClassNameProps & { tone?: "sage" | "pink" | "beige" }) {
  return (
    <span
      className={`${styles.tape} ${styles[`tape_${tone}`]} ${className}`}
      aria-hidden="true"
    />
  );
}

const chapterBotanicals = [
  [
    "/flowers/lotus-white.png",
    "/flowers/lotus-leaf.png",
    "/flowers/botanical-vine.png",
  ],
  [
    "/flowers/lotus-blush.png",
    "/flowers/lily-ivory.png",
    "/flowers/lotus-pods.png",
  ],
  [
    "/flowers/lotus-rose.png",
    "/flowers/lily-pads.png",
    "/flowers/lotus-leaf.png",
  ],
  [
    "/flowers/lotus-stem.png",
    "/flowers/lotus-pods.png",
    "/flowers/lotus-white.png",
  ],
] as const;

const standaloneBotanicals = {
  project: [
    "/flowers/lotus-blush.png",
    "/flowers/lily-ivory.png",
    "/flowers/botanical-vine.png",
  ],
  contact: [
    "/flowers/lotus-stem.png",
    "/flowers/lily-pads.png",
    "/flowers/lotus-pods.png",
  ],
} as const;

function withBasePath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export function BotanicalCollage({
  className = "",
  index = 0,
  variant = "chapter",
}: ClassNameProps & {
  index?: number;
  variant?: "chapter" | "project" | "contact";
}) {
  const images =
    variant === "chapter"
      ? chapterBotanicals[index % chapterBotanicals.length]
      : standaloneBotanicals[variant];
  const pieceClasses = [
    styles.botanicalPiecePrimary,
    styles.botanicalPieceSecondary,
    styles.botanicalPieceAccent,
  ];
  const variantClass =
    variant === "chapter" ? "" : styles[`botanicalCollage_${variant}`];

  return (
    <figure
      className={`${styles.botanicalCollage} ${variantClass} ${className}`}
      aria-hidden="true"
      data-float
    >
      <span className={styles.botanicalSwatch} />
      {images.map((src, pieceIndex) => (
        <span
          className={`${styles.botanicalPiece} ${pieceClasses[pieceIndex]}`}
          key={src}
        >
          <Image
            src={withBasePath(src)}
            alt=""
            width={1200}
            height={1200}
            sizes={
              variant === "chapter"
                ? "(max-width: 760px) 58vw, 34vw"
                : "(max-width: 760px) 70vw, 42vw"
            }
          />
        </span>
      ))}
      <figcaption>
        FLORA ARCHIVE / {String(index + 1).padStart(2, "0")}
      </figcaption>
    </figure>
  );
}

export function PaperCard({
  children,
  className = "",
}: ClassNameProps & { children: ReactNode }) {
  return (
    <div className={`${styles.paperCard} ${className}`} data-paper>
      {children}
    </div>
  );
}

export function JournalNote({
  children,
  className = "",
  label,
}: ClassNameProps & { children: ReactNode; label?: string }) {
  return (
    <aside className={`${styles.journalNote} ${className}`} data-paper>
      {label && <span>{label}</span>}
      <p>{children}</p>
    </aside>
  );
}

export function PolaroidPhoto({
  image,
  caption,
  className = "",
  rotation = 0,
}: ClassNameProps & {
  image: ImagePlaceholder;
  caption?: string;
  rotation?: number;
}) {
  const hasImage = image.path.trim().length > 0;

  return (
    <figure
      className={`${styles.polaroid} ${className}`}
      style={{ "--rotation": `${rotation}deg` } as CSSProperties}
      data-paper
      data-float
    >
      <TapeDecoration tone={rotation > 0 ? "pink" : "sage"} />
      <div
        className={styles.polaroidImage}
        style={{ aspectRatio: image.aspectRatio }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={withBasePath(image.path)} alt={image.alt} />
        ) : (
          <div className={styles.photoPlaceholder}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <path d="M8 74 32 49l17 17 15-14 28 28" />
              <circle cx="69" cy="29" r="9" />
            </svg>
            <span>{image.label}</span>
          </div>
        )}
      </div>
      <figcaption>{caption ?? image.label}</figcaption>
    </figure>
  );
}

export function ScrapbookPage({
  children,
  className = "",
  pageNumber,
}: ClassNameProps & { children: ReactNode; pageNumber: string }) {
  return (
    <div className={`${styles.scrapbookPage} ${className}`}>
      <span className={styles.bindingLine} aria-hidden="true" />
      <span className={styles.pageCorner} aria-hidden="true" />
      <span className={styles.pageNumber}>PAGE {pageNumber}</span>
      {children}
    </div>
  );
}

export function StoryChapter({
  chapter,
  index,
  introduction,
  scrollPrompt,
  skipLabel,
}: {
  chapter: Chapter;
  index: number;
  introduction?: string;
  scrollPrompt?: string;
  skipLabel?: string;
}) {
  const chapterNumber = String(index + 1).padStart(2, "0");
  const titleLines = chapter.title.split("\n");

  return (
    <section
      className={`${styles.chapter} ${styles[`theme_${chapter.theme}`]}`}
      id={chapter.id}
      data-chapter
      data-year={chapter.yearLabel}
    >
      <ScrapbookPage pageNumber={chapterNumber}>
        <BotanicalCollage
          className={styles.chapterBotanicals}
          index={index}
        />
        <span className={styles.inkLoop} aria-hidden="true" data-float />
        <header className={styles.chapterHeading} data-paper>
          <p>{chapter.eyebrow}</p>
          <h1>
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </header>

        <PolaroidPhoto
          image={chapter.image}
          caption={`${chapter.yearLabel} · ${chapter.image.label}`}
          className={styles.chapterPhoto}
          rotation={index % 2 === 0 ? 3 : -3}
        />

        <div className={styles.characterCameo} data-paper data-float>
          <TapeDecoration tone="beige" />
          <Character
            stage={chapter.characterStage}
            label={`${chapter.title.replaceAll("\n", " ")} placeholder character`}
          />
          <span className={styles.cameoCaption}>a little portrait of becoming</span>
        </div>

        <PaperCard className={styles.storyCard}>
          <span className={styles.dateStamp}>{chapter.yearLabel}</span>
          <p>{chapter.story}</p>
        </PaperCard>

        <div className={styles.memoryList} data-paper>
          <span className={styles.memoryLabel}>collected details</span>
          <ul>
            {chapter.highlights.map((highlight, highlightIndex) => (
              <li key={highlight}>
                <span>{String(highlightIndex + 1).padStart(2, "0")}</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {introduction && (
          <JournalNote className={styles.introNote} label="note to self">
            {introduction}
          </JournalNote>
        )}

        {scrollPrompt && (
          <div className={styles.scrollCue}>
            <span>{scrollPrompt}</span>
            <span aria-hidden="true">↓</span>
          </div>
        )}

        {skipLabel && (
          <a className={styles.skipPresent} href="#present">
            {skipLabel} ↘
          </a>
        )}
      </ScrapbookPage>
    </section>
  );
}
