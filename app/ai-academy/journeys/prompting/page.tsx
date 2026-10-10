import type {Metadata} from "next";
import {PromptJourney} from "@/components/ai-academy/prompt-journey";
export const metadata:Metadata={title:"Prompting Journey | AI Academy",description:"Practice making an evidence-grounded prompt with transparent feedback."};
export default function Page(){return <PromptJourney/>;}
