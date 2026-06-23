import { siteConfig, type SiteConfig } from "@/lib/config/site";

const checkedConfig: SiteConfig = siteConfig;

checkedConfig.name satisfies "NSFW AI Hunt";
checkedConfig.url satisfies "https://nsfwaihunt.com";
checkedConfig.ageNotice satisfies string;
checkedConfig.affiliateDisclosure satisfies string;
checkedConfig.mainNav satisfies readonly { title: string; href: `/${string}` }[];
checkedConfig.footerNav satisfies readonly { title: string; href: `/${string}` }[];

