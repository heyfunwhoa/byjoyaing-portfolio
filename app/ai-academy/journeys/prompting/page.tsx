import { completePageMetadata } from "@/lib/page-metadata";
import type {Metadata} from "next";
import {PromptJourney} from "@/components/ai-academy/prompt-journey";
export const metadata:Metadata=completePageMetadata({title:"Prompting Journey",description:"Practice making an evidence-grounded prompt with transparent feedback."}, "/ai-academy/journeys/prompting");
export default function Page(){return <PromptJourney/>;}
