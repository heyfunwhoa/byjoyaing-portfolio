import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InquiryForm } from "../app/inquiry-form";
import { SiteHeader } from "./site-header";
import { WorkExplorer } from "./work-explorer";

const meta = {
  title: "Portfolio/Shared interactions",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true, navigation: { pathname: "/work" } },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Navigation: Story = {
  render: () => (
    <>
      <SiteHeader />
      <main id="main-content" className="min-h-screen px-5 py-24">
        <h1 className="text-3xl font-semibold">Portfolio navigation</h1>
        <p className="mt-4">Use the navigation with a keyboard or a pointer.</p>
      </main>
    </>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <main id="main-content" className="mx-auto max-w-3xl space-y-6 px-5 py-12">
      <h1 className="text-3xl font-semibold">Contact Kristen</h1>
      <InquiryForm />
    </main>
  ),
};

export const WorkDisclosures: Story = {
  render: () => (
    <main id="main-content" className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Professional work</h1>
      <WorkExplorer
        stories={["Enterprise Sales", "People & Leadership", "GTM Strategy"].map((label) => (
          <div key={label}>
            <h2 className="text-xl font-semibold">{label} story details</h2>
            <p className="mt-3">Storybook interaction fixture for this disclosure.</p>
          </div>
        ))}
      />
    </main>
  ),
};
