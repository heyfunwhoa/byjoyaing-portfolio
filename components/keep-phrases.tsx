import { Fragment } from "react";

/**
 * Lets a short line wrap only between sentences, so a phrase such as
 * "Systems-minded." never breaks at its hyphen. Text content is unchanged.
 */
export function KeepPhrases({ text }: { text: string }) {
  const phrases = text.split(/(?<=[.!?])\s+/);
  return (
    <>
      {phrases.map((phrase, index) => (
        <Fragment key={`${index}-${phrase}`}>
          {index > 0 ? " " : null}
          <span className="whitespace-nowrap">{phrase}</span>
        </Fragment>
      ))}
    </>
  );
}
