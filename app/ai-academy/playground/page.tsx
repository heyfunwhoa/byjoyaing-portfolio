import type {Metadata} from "next";
import {Playground} from "@/components/ai-academy/playground";
export const metadata:Metadata={title:"AI Playground | AI Foundations",description:"Practice source verification, prompting and tool selection using safe fictional exercises.",robots:{index:false,follow:false}};
export default function Page(){return <Playground/>;}
