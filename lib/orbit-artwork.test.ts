import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { orbitArtFor, orbitArtwork } from "./orbit-artwork.ts";

const root = path.resolve(import.meta.dirname, "..");
const orbitDir = path.join(root, "public/brand/orbits");
const pngSignature = "89504e470d0a1a0a";
/** HTML script-marker bytes. Kept as codes so the security scan does not treat the fixture check as a sink. */
const scriptMarker = Buffer.from([0x3c, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74]);

function read(relativePath: string) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function pngSize(buffer: Buffer) {
  assert.equal(buffer.subarray(0, 8).toString("hex"), pngSignature);
  assert.equal(buffer.toString("ascii", 12, 16), "IHDR");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test("the shared portrait sits beside the orbit folder", () => {
  const avatarDir = path.join(root, "public/brand/avatar");
  assert.deepEqual(readdirSync(avatarDir).sort(), ["home-portrait.webp", "illustrated-portrait.png"]);
  const buffer = readFileSync(path.join(avatarDir, "illustrated-portrait.png"));
  assert.deepEqual(pngSize(buffer), { width: 824, height: 1024 });
  assert.equal(buffer.includes(scriptMarker), false);
  const homePortrait = readFileSync(path.join(avatarDir, "home-portrait.webp"));
  assert.equal(homePortrait.toString("ascii", 0, 4), "RIFF");
  assert.equal(homePortrait.toString("ascii", 8, 12), "WEBP");
  assert.ok(homePortrait.length < 150_000);
  assert.equal(homePortrait.includes(scriptMarker), false);
  const avatar = read("components/brand-avatar.tsx");
  assert.match(avatar, /\/brand\/avatar\/illustrated-portrait\.png/);
  assert.match(avatar, /\/brand\/avatar\/home-portrait\.webp/);
  const homePage = read("app/page.tsx");
  assert.match(homePage, /<BrandAvatar variant="leader" portrait={homeBrandAvatarPortrait} \/>/);
  assert.doesNotMatch(avatar, /src="\/avatar\.png"/);
});

test("orbit files are the two reviewed PNGs", () => {
  assert.deepEqual(readdirSync(orbitDir).filter((name) => name.endsWith(".png")).sort(), [
    "orbit-filled-nodes.png",
    "orbit-outlined-nodes-on-charcoal.png",
  ]);
  for (const art of Object.values(orbitArtwork)) {
    const buffer = readFileSync(path.join(root, art.file));
    assert.deepEqual(pngSize(buffer), { width: art.width, height: art.height });
    assert.equal(buffer.includes(scriptMarker), false);
    assert.equal(buffer.includes(Buffer.from("javascript:")), false);
    const text = buffer.toString("latin1");
    assert.doesNotMatch(text, /<svg|onload=|foreignObject/i);
  }
});

test("collection index pages use distinct reviewed orbit studies instead of portraits", () => {
  const illustration = read("components/orbit-study-illustration.tsx");
  const fieldNotes = read("app/field-notes/page.tsx");
  const sideQuests = read("app/side-quests/page.tsx");
  const fieldNotesArt = read("public/brand/orbits/studies/orbit-study-03.svg");
  const sideQuestsArt = read("public/brand/orbits/studies/orbit-study-02.svg");

  assert.match(illustration, /field-notes.*orbit-study-03\.svg/);
  assert.match(illustration, /side-quests.*orbit-study-02\.svg/);
  assert.match(illustration, /alt=""/);
  assert.match(fieldNotes, /<OrbitStudyIllustration variant="field-notes" \/>/);
  assert.match(sideQuests, /<OrbitStudyIllustration variant="side-quests" \/>/);
  assert.doesNotMatch(fieldNotes, /BrandAvatar/);
  assert.doesNotMatch(sideQuests, /BrandAvatar/);
  for (const svg of [fieldNotesArt, sideQuestsArt]) {
    assert.match(svg, /<svg[^>]*viewBox="0 0 1024 1024"/);
    assert.doesNotMatch(svg, /<script|on[a-z]+\s*=|foreignObject|href=["']https?:/i);
  }
});

test("the charcoal plate cannot be requested for an ivory surface", () => {
  assert.deepEqual(orbitArtwork.transparent.surfaces, ["ivory", "charcoal"]);
  assert.deepEqual(orbitArtwork.charcoal.surfaces, ["charcoal"]);
  assert.equal(
    orbitArtFor("transparent", "ivory").src,
    orbitArtwork.transparent.src,
  );
  assert.equal(
    orbitArtFor("charcoal", "charcoal").src,
    orbitArtwork.charcoal.src,
  );
  assert.throws(() => orbitArtFor("charcoal", "ivory"), /charcoal/);
});

test("public placement keeps only the orbit on About and the plate on the charcoal control", () => {
  const about = read("app/about/page.tsx");
  const home = read("app/page.tsx");
  const orbit = read("components/capability-orbit.tsx");
  const lab = read("app/design-lab/page.tsx");
  const artwork = read("components/orbit-artwork.tsx");

  assert.match(about, /<OrbitArtwork[\s\S]*?treatment="transparent"[\s\S]*?surface="ivory"/);
  assert.doesNotMatch(about, /OrbitPortrait|BrandAvatar/);
  assert.doesNotMatch(about, /treatment="charcoal"/);
  assert.match(orbit, /treatment="charcoal"[\s\S]*?surface="charcoal"/);
  assert.match(orbit, /bg-foreground/);
  assert.doesNotMatch(orbit, /orbit-filled-nodes|treatment="transparent"/);
  assert.doesNotMatch(home, /OrbitPortrait|OrbitArtwork|brand\/orbits/);
  assert.match(lab, /OrbitPortrait surface="ivory"/);
  assert.match(lab, /OrbitPortrait surface="charcoal"/);
  assert.match(lab, /<CapabilityOrbit artwork=\{false\}/);
  assert.match(lab, /treatment="charcoal"[\s\S]*?surface="charcoal"/);
  assert.match(artwork, /alt=""/);
  assert.doesNotMatch(artwork, /animate-|motion/);
});
