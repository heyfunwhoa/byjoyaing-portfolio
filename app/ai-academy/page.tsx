import type { Metadata } from "next";
import { Academy } from "@/components/ai-academy/academy";
export const metadata: Metadata = {title:"AI Enablement Academy | Learn, Apply, Build",description:"An approachable AI learning path and task-based workflow library with responsible-use guidance."};
export default function Page(){return <Academy/>;}
