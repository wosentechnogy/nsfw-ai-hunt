import type { PricingModel, ToolInput } from "@/lib/validation";

type ExpansionKind = "roleplay" | "image" | "video";

type ExpansionTool = Readonly<{
  slug: string;
  name: string;
  websiteUrl: string;
  focus: string;
  kind: ExpansionKind;
  pricingModel: PricingModel;
  hasFreePlan?: boolean;
  editorScore: number;
  popularityScore: number;
}>;

function createExpansionTool(tool: ExpansionTool): ToolInput {
  const isRoleplay = tool.kind === "roleplay";
  const supportsVideo = tool.kind === "video";

  return {
    slug: tool.slug,
    name: tool.name,
    tagline: `${tool.name} is tracked for ${tool.focus}.`,
    description: `${tool.name} is included in the directory as a software option for buyers comparing ${tool.focus}. This editorial record focuses on product capabilities, pricing posture, privacy signals, and current policy visibility rather than hosting any generated media.`,
    websiteUrl: tool.websiteUrl,
    logoUrl: `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(tool.websiteUrl)}`,
    status: "published",
    editorScore: tool.editorScore,
    popularityScore: tool.popularityScore,
    categorySlugs: [isRoleplay ? "character-roleplay-ai" : "nsfw-ai-image-generators"],
    supportsNsfwChat: false,
    supportsImageGeneration: !isRoleplay,
    supportsVideoGeneration: supportsVideo,
    supportsCharacterCreation: isRoleplay,
    hasWebApp: true,
    hasFreePlan: tool.hasFreePlan ?? false,
    nsfwPolicySummary:
      "This software record does not assume adult-use support; buyers should review the provider's current rules before choosing a sensitive workflow.",
    privacySummary:
      "Privacy review focuses on account requirements, project or conversation storage, public-sharing controls, and visible policy documentation.",
    pricingModel: tool.pricingModel,
    affiliateProgramStatus: "none",
    lastCheckedAt: "2026-07-12"
  };
}

const task24ExpansionCandidates = [
  { slug: "kajiwoto", name: "Kajiwoto", websiteUrl: "https://kajiwoto.com", focus: "custom AI companions, character configuration, and hosted chat workflows", kind: "roleplay", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.7, popularityScore: 48 },
  { slug: "myanima", name: "MyAnima", websiteUrl: "https://myanima.ai", focus: "companion chat, mobile-oriented access, and subscription comparisons", kind: "roleplay", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.5, popularityScore: 50 },
  { slug: "simsimi", name: "SimSimi", websiteUrl: "https://simsimi.com", focus: "conversational AI, mobile access, and account-based chat controls", kind: "roleplay", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.1, popularityScore: 67 },
  { slug: "agnai", name: "Agnai", websiteUrl: "https://agnai.chat", focus: "self-managed character chat, model-provider choice, and local-first controls", kind: "roleplay", pricingModel: "free", hasFreePlan: true, editorScore: 6.6, popularityScore: 42 },
  { slug: "faraday", name: "Faraday", websiteUrl: "https://faraday.dev", focus: "local character chat, model management, and privacy-conscious setup choices", kind: "roleplay", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.8, popularityScore: 51 },
  { slug: "kobold-ai", name: "KoboldAI", websiteUrl: "https://koboldai.net", focus: "self-hosted text generation, model controls, and narrative workflows", kind: "roleplay", pricingModel: "free", hasFreePlan: true, editorScore: 6.5, popularityScore: 53 },
  { slug: "lm-studio", name: "LM Studio", websiteUrl: "https://lmstudio.ai", focus: "local model access, offline chat, and private inference workflows", kind: "roleplay", pricingModel: "free", hasFreePlan: true, editorScore: 7.1, popularityScore: 70 },
  { slug: "jan", name: "Jan", websiteUrl: "https://jan.ai", focus: "local AI assistants, model selection, and desktop privacy controls", kind: "roleplay", pricingModel: "free", hasFreePlan: true, editorScore: 6.7, popularityScore: 55 },
  { slug: "characterhub", name: "CharacterHub", websiteUrl: "https://characterhub.org", focus: "character discovery, prompt organization, and roleplay setup", kind: "roleplay", pricingModel: "free", hasFreePlan: true, editorScore: 6.2, popularityScore: 46 },
  { slug: "dreamily", name: "Dreamily", websiteUrl: "https://dreamily.ai", focus: "AI writing, story continuation, and character-led creative workflows", kind: "roleplay", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.4, popularityScore: 49 },
  { slug: "seaart", name: "SeaArt", websiteUrl: "https://seaart.ai", focus: "image generation, model selection, and browser-based creative workflows", kind: "image", pricingModel: "credits", hasFreePlan: true, editorScore: 6.6, popularityScore: 65 },
  { slug: "mage-space", name: "Mage Space", websiteUrl: "https://www.mage.space", focus: "web image generation, model choice, and free-access comparisons", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.3, popularityScore: 52 },
  { slug: "playground-ai", name: "Playground AI", websiteUrl: "https://playground.com", focus: "AI image creation, canvas-style editing, and plan comparisons", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.7, popularityScore: 69 },
  { slug: "nightcafe", name: "NightCafe", websiteUrl: "https://nightcafe.studio", focus: "AI art generation, credit-based creation, and community-setting controls", kind: "image", pricingModel: "credits", hasFreePlan: true, editorScore: 6.5, popularityScore: 61 },
  { slug: "artbreeder", name: "Artbreeder", websiteUrl: "https://www.artbreeder.com", focus: "image mixing, character-oriented creation, and account-based projects", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.2, popularityScore: 58 },
  { slug: "imagine-art", name: "Imagine.art", websiteUrl: "https://www.imagine.art", focus: "browser image generation, style controls, and paid-credit options", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.4, popularityScore: 60 },
  { slug: "fotor-ai", name: "Fotor AI", websiteUrl: "https://www.fotor.com", focus: "AI image tools, editing workflows, and subscription comparisons", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.3, popularityScore: 68 },
  { slug: "picsart-ai", name: "Picsart AI", websiteUrl: "https://picsart.com", focus: "mobile-friendly image tools, editing, and plan comparisons", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.4, popularityScore: 72 },
  { slug: "fooocus", name: "Fooocus", websiteUrl: "https://github.com/lllyasviel/Fooocus", focus: "local image generation, model setup, and self-managed workflows", kind: "image", pricingModel: "free", hasFreePlan: true, editorScore: 6.8, popularityScore: 66 },
  { slug: "comfyui", name: "ComfyUI", websiteUrl: "https://github.com/Comfy-Org/ComfyUI", focus: "node-based image workflows, local models, and reproducible pipelines", kind: "image", pricingModel: "free", hasFreePlan: true, editorScore: 7.0, popularityScore: 75 },
  { slug: "invoke-ai", name: "InvokeAI", websiteUrl: "https://invoke.ai", focus: "image generation, canvas editing, and self-hosted creative controls", kind: "image", pricingModel: "free", hasFreePlan: true, editorScore: 6.8, popularityScore: 62 },
  { slug: "stable-diffusion-webui", name: "Stable Diffusion WebUI", websiteUrl: "https://github.com/AUTOMATIC1111/stable-diffusion-webui", focus: "local image generation, extension support, and model-management workflows", kind: "image", pricingModel: "free", hasFreePlan: true, editorScore: 6.9, popularityScore: 78 },
  { slug: "dreamstudio", name: "DreamStudio", websiteUrl: "https://beta.dreamstudio.ai", focus: "hosted image generation, credit use, and official model access", kind: "image", pricingModel: "credits", hasFreePlan: false, editorScore: 6.5, popularityScore: 59 },
  { slug: "clipdrop", name: "Clipdrop", websiteUrl: "https://clipdrop.co", focus: "AI image editing, cleanup tools, and browser-based creative tasks", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.5, popularityScore: 64 },
  { slug: "krea-ai", name: "Krea AI", websiteUrl: "https://www.krea.ai", focus: "real-time image generation, style experimentation, and account-based projects", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.7, popularityScore: 67 },
  { slug: "openart-ai", name: "OpenArt", websiteUrl: "https://openart.ai", focus: "AI image creation, model discovery, and prompt-driven workflows", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.5, popularityScore: 63 },
  { slug: "promeai", name: "PromeAI", websiteUrl: "https://www.promeai.com", focus: "design-oriented image generation, rendering, and credit-based workflows", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.3, popularityScore: 57 },
  { slug: "artguru", name: "Artguru", websiteUrl: "https://www.artguru.ai", focus: "AI art tools, portrait-style editing, and credit-based access", kind: "image", pricingModel: "credits", hasFreePlan: true, editorScore: 6.1, popularityScore: 50 },
  { slug: "piclumen", name: "PicLumen", websiteUrl: "https://www.piclumen.com", focus: "text-to-image creation, style controls, and free-credit access", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.3, popularityScore: 54 },
  { slug: "dzine", name: "Dzine", websiteUrl: "https://www.dzine.ai", focus: "design automation, image editing, and browser-based creative workflows", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.4, popularityScore: 56 },
  { slug: "gencraft", name: "Gencraft", websiteUrl: "https://gencraft.com", focus: "AI image creation, style selection, and account-based generation", kind: "image", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.2, popularityScore: 55 },
  { slug: "rendernet", name: "RenderNet", websiteUrl: "https://rendernet.ai", focus: "AI visual creation, character consistency, and credit-based projects", kind: "image", pricingModel: "credits", hasFreePlan: true, editorScore: 6.5, popularityScore: 58 },
  { slug: "pika", name: "Pika", websiteUrl: "https://pika.art", focus: "AI video creation, image-to-video tools, and credit-based workflows", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.6, popularityScore: 70 },
  { slug: "luma-dream-machine", name: "Luma Dream Machine", websiteUrl: "https://lumalabs.ai/dream-machine", focus: "AI video generation, motion workflows, and credit-based access", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.7, popularityScore: 73 },
  { slug: "runway", name: "Runway", websiteUrl: "https://runwayml.com", focus: "AI video creation, editing, and creative-team plan comparisons", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.8, popularityScore: 79 },
  { slug: "hailuo-ai", name: "Hailuo AI", websiteUrl: "https://hailuoai.video", focus: "AI video generation, text-to-video tools, and credit-based creation", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.4, popularityScore: 62 },
  { slug: "pixverse", name: "PixVerse", websiteUrl: "https://pixverse.ai", focus: "AI video generation, mobile-friendly creation, and credit-based plans", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.5, popularityScore: 65 },
  { slug: "pollo-ai", name: "Pollo AI", websiteUrl: "https://pollo.ai", focus: "AI image and video creation, model choice, and credit-based comparisons", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.4, popularityScore: 59 },
  { slug: "hedra", name: "Hedra", websiteUrl: "https://www.hedra.com", focus: "AI character video, voice-enabled creation, and credit-based workflows", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.5, popularityScore: 61 },
  { slug: "vidu", name: "Vidu", websiteUrl: "https://www.vidu.com", focus: "AI video generation, reference-driven creation, and credit-based projects", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.4, popularityScore: 60 },
  { slug: "fal-ai", name: "fal.ai", websiteUrl: "https://www.fal.ai", focus: "AI media APIs, model access, and developer-oriented credit workflows", kind: "image", pricingModel: "credits", hasFreePlan: false, editorScore: 6.6, popularityScore: 64 },
  { slug: "dreamina", name: "Dreamina", websiteUrl: "https://dreamina.capcut.com", focus: "AI image creation, editing tools, and account-based creative projects", kind: "image", pricingModel: "credits", hasFreePlan: true, editorScore: 6.3, popularityScore: 57 },
  { slug: "higgsfield", name: "Higgsfield", websiteUrl: "https://higgsfield.ai", focus: "AI video generation, camera-motion controls, and credit-based creation", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.5, popularityScore: 63 },
  { slug: "kling-ai", name: "Kling AI", websiteUrl: "https://klingai.com", focus: "AI video generation, image-to-video tools, and credit-based workflows", kind: "video", pricingModel: "credits", hasFreePlan: true, editorScore: 6.7, popularityScore: 74 },
  { slug: "ltx-studio", name: "LTX Studio", websiteUrl: "https://ltx.studio", focus: "AI video planning, scene generation, and creative-project workflows", kind: "video", pricingModel: "freemium", hasFreePlan: true, editorScore: 6.5, popularityScore: 58 }
] as const satisfies readonly ExpansionTool[];

export const task24ExpansionTools = task24ExpansionCandidates.map(createExpansionTool);
