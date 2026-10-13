import { completePageMetadata } from "@/lib/page-metadata";
import type {Metadata} from "next";
import {SourceJourney} from "@/components/ai-academy/source-journey";
export const metadata:Metadata=completePageMetadata({title:"Source Verification Journey",description:"Learn, practice, evaluate, and apply evidence verification with fictional security research."}, "/ai-academy/journeys/source-verification");
export default function Page(){return <SourceJourney/>;}
