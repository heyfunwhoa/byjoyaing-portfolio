import { completePageMetadata } from "@/lib/page-metadata";
import type {Metadata} from "next";import {AdvancedPlayground} from "@/components/ai-academy/advanced-playground";
export const metadata:Metadata=completePageMetadata({title:"Research Pipeline Simulator",description:"Practice source capture, versioning, evidence and review using synthetic cases."}, "/ai-academy/playground/research-pipeline");
export default function Page(){return <AdvancedPlayground mode="pipeline"/>;}
