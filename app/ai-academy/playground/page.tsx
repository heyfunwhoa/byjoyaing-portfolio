import { completePageMetadata } from "@/lib/page-metadata";
import {Playground} from "@/components/ai-academy/playground";
import {robotsNoindex} from "@/lib/indexing";
import type {Metadata} from "next";
export const metadata:Metadata=completePageMetadata({title:"AI Playground",description:"Practice source verification, prompting and tool selection using safe fictional exercises.",robots:robotsNoindex}, "/ai-academy/playground");
export default function Page(){return <Playground/>;}
