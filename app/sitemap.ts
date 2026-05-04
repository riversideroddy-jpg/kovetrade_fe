import type { MetadataRoute } from "next";

const BASE = "https://kovetrade.com";
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    { url: BASE,                            lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/autoguard`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/become-a-leader`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/affiliate`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/brokers`,               lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/user-guide`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/leader-guide`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Auth
    { url: `${BASE}/register`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/login`,                 lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    // Legal
    { url: `${BASE}/terms`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/privacy`,               lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/eula`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/consent`,               lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/cookies`,               lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/risk-disclaimer`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/conflict-of-interest`,  lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
