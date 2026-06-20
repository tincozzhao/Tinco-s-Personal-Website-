import type { CharacterStage } from "@/content/siteContent";
import styles from "./Storyboard.module.css";

interface CharacterProps {
  stage: CharacterStage;
  label: string;
}

const stageScale: Record<CharacterStage, number> = {
  small: 0.72,
  growing: 0.86,
  making: 0.96,
  present: 1,
};

export function Character({ stage, label }: CharacterProps) {
  const scale = stageScale[stage];
  const isPresent = stage === "present";
  const isMaking = stage === "making";

  return (
    <div className={styles.characterWrap} data-character>
      <svg
        className={styles.character}
        viewBox="0 0 260 520"
        role="img"
        aria-label={`${label}, abstract ${stage} stage illustration`}
        style={{ "--character-scale": scale } as React.CSSProperties}
      >
        <path
          className={styles.characterShadow}
          d="M35 488c34-24 161-24 190 0 24 20-19 32-95 32S10 507 35 488Z"
        />
        <circle className={styles.characterHead} cx="130" cy="89" r="53" />
        <path
          className={styles.characterHair}
          d="M80 89c1-39 21-62 55-62 34 0 53 26 49 57-17-13-35-20-55-19-18 1-34 9-49 24Z"
        />
        <path
          className={styles.characterFace}
          d="M110 98c10 8 30 8 40 0"
        />
        <circle className={styles.characterEye} cx="108" cy="83" r="4" />
        <circle className={styles.characterEye} cx="152" cy="83" r="4" />
        <path
          className={styles.characterBody}
          d={
            isPresent
              ? "M70 173c28-20 92-20 120 0l19 193H51l19-193Z"
              : "M77 171c25-18 81-18 106 0l15 194H62l15-194Z"
          }
        />
        <path
          className={styles.characterAccent}
          d="M87 180h86l-15 67h-56l-15-67Z"
        />
        <path
          className={styles.characterLimb}
          d="M66 189C34 247 25 310 42 361"
        />
        <path
          className={styles.characterLimb}
          d={
            isMaking
              ? "M191 187c31 41 30 86 2 116l-37-31"
              : "M194 189c27 64 30 121 15 170"
          }
        />
        <path className={styles.characterLimb} d="M93 360 78 480" />
        <path className={styles.characterLimb} d="M164 360 181 480" />
        <path className={styles.characterShoe} d="M78 480h-43" />
        <path className={styles.characterShoe} d="M181 480h43" />
        {stage === "small" && (
          <g className={styles.characterProp}>
            <circle cx="202" cy="363" r="31" />
            <path d="m181 346 21-14 21 14-8 25h-26l-8-25Z" />
          </g>
        )}
        {stage === "growing" && (
          <g className={styles.characterProp}>
            <path d="M185 264h56v72h-56z" />
            <path d="m185 264 28 25 28-25" />
          </g>
        )}
        {isMaking && (
          <g className={styles.characterProp}>
            <path d="M137 271h91v62h-91z" />
            <path d="M126 339h113" />
          </g>
        )}
        {isPresent && (
          <path
            className={styles.characterSpark}
            d="m216 153 8 18 18 8-18 8-8 18-8-18-18-8 18-8 8-18Z"
          />
        )}
      </svg>
    </div>
  );
}
