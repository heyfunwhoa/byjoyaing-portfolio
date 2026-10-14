import { completePageMetadata } from "@/lib/page-metadata";
import type {Metadata} from "next";import {AdvancedPlayground} from "@/components/ai-academy/advanced-playground";
export const metadata:Metadata=completePageMetadata({title:"Build a Skill",description:"Draft and validate a reusable AI skill using a structured learning exercise."}, "/ai-academy/playground/skill-builder");
export default function Page(){return <AdvancedPlayground mode="skill"/>;}
