import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
function CarouselPreview() {
  return <div className="w-80 px-12"><Carousel aria-label="Portfolio component carousel" opts={{ loop: false }}><CarouselContent>{["Explore", "Build", "Learn"].map(item=><CarouselItem key={item}><div className="flex h-32 items-center justify-center rounded-lg border border-border bg-card text-lg font-semibold">{item}</div></CarouselItem>)}</CarouselContent><CarouselPrevious aria-label="Previous slide"/><CarouselNext aria-label="Next slide"/></Carousel></div>;
}
const meta={title:"Design System/Carousel",component:CarouselPreview} satisfies Meta<typeof CarouselPreview>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={};
