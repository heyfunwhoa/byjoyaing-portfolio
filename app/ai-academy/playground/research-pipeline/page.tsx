import type {Metadata} from "next";import {AdvancedPlayground} from "@/components/ai-academy/advanced-playground";
export const metadata:Metadata={title:"Research Pipeline Simulator | AI Academy",description:"Practice source capture, versioning, evidence and review using synthetic cases."};
export default function Page(){return <AdvancedPlayground mode="pipeline"/>;}
