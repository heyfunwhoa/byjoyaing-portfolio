import { config, collection, fields } from "@keystatic/core";

const tracks = [
  { label: "Foundations", value: "Foundations" },
  { label: "Prompting", value: "Prompting" },
  { label: "Responsible AI", value: "Responsible AI" },
  { label: "GTM", value: "GTM" },
  { label: "Builder", value: "Builder" },
] as const;

const levels = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
] as const;

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "joy. Academy" },
    navigation: {
      Academy: ["lessons"],
    },
  },
  collections: {
    lessons: collection({
      label: "Lessons",
      slugField: "title",
      path: "content/academy/lessons/*",
      format: { data: "json" },
      entryLayout: "form",
      previewUrl: "/ai-academy",
      columns: ["title", "track", "level"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "Slug",
            description:
              "Stable lesson id. Do not change it after the lesson is published.",
          },
        }),
        track: fields.select({
          label: "Track",
          options: tracks,
          defaultValue: "Builder",
        }),
        minutes: fields.integer({
          label: "Minutes",
          validation: { isRequired: true, min: 1, max: 180 },
        }),
        level: fields.select({
          label: "Level",
          options: levels,
          defaultValue: "Beginner",
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        analogy: fields.text({ label: "Analogy", multiline: true }),
        takeaways: fields.array(
          fields.text({ label: "Takeaway", multiline: true }),
          {
            label: "Takeaways",
            itemLabel: (props) => props.value || "Takeaway",
            validation: { length: { min: 1 } },
          },
        ),
        exercise: fields.text({ label: "Exercise", multiline: true }),
        check: fields.object(
          {
            question: fields.text({ label: "Question", multiline: true }),
            choices: fields.array(fields.text({ label: "Choice" }), {
              label: "Choices",
              itemLabel: (props) => props.value || "Choice",
              validation: { length: { min: 2 } },
            }),
            answer: fields.integer({
              label: "Correct choice index",
              description: "Zero-based index into Choices.",
              validation: { isRequired: true, min: 0 },
            }),
            explanation: fields.text({ label: "Explanation", multiline: true }),
          },
          { label: "Knowledge check" },
        ),
        companion: fields.object(
          {
            label: fields.text({ label: "Link label" }),
            url: fields.url({ label: "URL", validation: { isRequired: true } }),
          },
          { label: "Companion guide" },
        ),
        sources: fields.array(
          fields.object(
            {
              label: fields.text({ label: "Label" }),
              url: fields.url({
                label: "URL",
                validation: { isRequired: true },
              }),
            },
            { label: "Source" },
          ),
          {
            label: "Sources",
            itemLabel: (props) => props.fields.label.value || "Source",
            validation: { length: { min: 1 } },
          },
        ),
      },
    }),
  },
});
