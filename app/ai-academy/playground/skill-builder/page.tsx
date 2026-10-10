import type {Metadata} from "next";import {AdvancedPlayground} from "@/components/ai-academy/advanced-playground";
export const metadata:Metadata={title:"Build a Skill | AI Academy",description:"Draft and validate a reusable AI skill using a structured learning exercise."};
export default function Page(){return <AdvancedPlayground mode="skill"/>;}
