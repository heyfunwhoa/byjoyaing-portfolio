import { config, fields, singleton } from "@keystatic/core";

const text = (label: string, multiline = false) =>
  fields.text({ label, multiline, validation: { isRequired: true } });

// A singleton fixes the file identity: no create/delete/rename curriculum UI.
export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "Academy · local editorial pilot" } },
  singletons: {
    verification: singleton({
      label: "Verification lesson",
      path: "content/academy/lessons/verification",
      format: "json",
      schema: {
        id: fields.select({
          label: "Stable lesson ID (fixed)",
          options: [{ label: "verification", value: "verification" }],
          defaultValue: "verification",
        }),
        title: text("Title"),
        track: fields.select({
          label: "Track",
          options: [
            "Foundations",
            "Prompting",
            "Responsible AI",
            "GTM",
            "Builder",
          ].map((value) => ({ label: value, value })),
          defaultValue: "Responsible AI",
        }),
        minutes: fields.integer({
          label: "Minutes",
          validation: { isRequired: true, min: 1 },
        }),
        level: fields.select({
          label: "Level",
          options: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
          ],
          defaultValue: "Beginner",
        }),
        summary: text("Summary", true),
        analogy: text("Analogy", true),
        takeaways: fields.array(text("Takeaway", true), {
          label: "Takeaways",
          itemLabel: (props) => props.value,
          validation: { length: { min: 1 } },
        }),
        exercise: text("Exercise", true),
        sources: fields.array(
          fields.object({
            label: text("Source label"),
            url: fields.url({
              label: "Source URL",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Sources",
            itemLabel: (props) => props.fields.label.value,
            validation: { length: { min: 1 } },
          },
        ),
        owner: text("Owner"),
        reviewer: text("Reviewer / pending review"),
        contentVersion: fields.integer({
          label: "Content version",
          validation: { isRequired: true, min: 1 },
        }),
        lastReviewed: fields.date({
          label: "Last reviewed (blank until reviewed)",
        }),
        reviewDue: fields.date({
          label: "Review due",
          validation: { isRequired: true },
        }),
        classification: fields.select({
          label: "Classification",
          options: [
            { label: "Public", value: "public" },
            { label: "Synthetic", value: "synthetic" },
          ],
          defaultValue: "public",
        }),
        publicationStatus: fields.select({
          label: "Editorial status (not deployment approval)",
          options: ["draft", "review", "pilot", "published", "retired"].map(
            (value) => ({ label: value, value }),
          ),
          defaultValue: "pilot",
        }),
      },
    }),
  },
});
