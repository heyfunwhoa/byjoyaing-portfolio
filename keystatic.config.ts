import { config, fields, singleton } from "@keystatic/core";

const text = (label: string, multiline = false) =>
  fields.text({ label, multiline, validation: { isRequired: true } });

const slug = (label: string) =>
  fields.text({
    label,
    validation: {
      isRequired: true,
      pattern: {
        regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        message: "Use a lowercase slug",
      },
    },
  });

function governanceFields() {
  return {
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
  };
}

// Singletons fix file identity: no create/delete/rename for these records.
export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "joy. · local editorial" } },
  singletons: {
    about: singleton({
      label: "About page",
      path: "content/about/page",
      format: "json",
      schema: {
        id: fields.select({
          label: "Stable page ID (fixed)",
          options: [{ label: "about", value: "about" }],
          defaultValue: "about",
        }),
        metaDescription: text("Meta description", true),
        eyebrow: text("Eyebrow"),
        headline: text("Headline"),
        lead: fields.array(text("Lead paragraph", true), {
          label: "Lead paragraphs",
          itemLabel: (props) => props.value,
          validation: { length: { min: 1 } },
        }),
        philosophyLabel: text("Philosophy label"),
        philosophyHeading: text("Philosophy heading"),
        principles: fields.array(
          fields.object({
            name: text("Principle name"),
            body: text("Principle body", true),
          }),
          {
            label: "Principles",
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 3 } },
          },
        ),
        leadershipApproach: text("Leadership approach", true),
        approachEyebrow: text("Approach eyebrow"),
        approachHeading: text("Approach heading"),
        approachIntro: text("Approach introduction", true),
        careerHeading: text("Career heading"),
        careerIntro: text("Career introduction", true),
        educationHeading: text("Education heading"),
        education: fields.array(text("Education item"), {
          label: "Education",
          itemLabel: (props) => props.value,
          validation: { length: { min: 1 } },
        }),
        practiceEyebrow: text("Practice eyebrow"),
        practiceHeading: text("Practice heading"),
        practiceIntro: text("Practice introduction", true),
        exploreHeading: text("Explore heading"),
        beyondLabel: text("Beyond label"),
        beyondHeading: text("Beyond heading"),
        beyondIntro: text("Beyond introduction", true),
        interests: fields.array(
          fields.object({
            id: slug("Interest ID"),
            title: text("Interest title"),
            detail: text("Interest detail", true),
            connection: text("Interest connection", true),
          }),
          {
            label: "Interests",
            itemLabel: (props) => props.fields.title.value,
            validation: { length: { min: 1 } },
          },
        ),
        valuesLabel: text("Values label"),
        values: fields.array(text("Value"), {
          label: "Values",
          itemLabel: (props) => props.value,
          validation: { length: { min: 3 } },
        }),
        contactHeading: text("Contact heading"),
        ...governanceFields(),
      },
    }),
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
        ...governanceFields(),
      },
    }),
  },
});
