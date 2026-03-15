/**
 * scheme-extractor.js
 * 
 * This script defines the data structure and helper functions
 * used when building interactive React artifacts for the
 * IndianAndKarnatakaGovtProject skill.
 * 
 * When creating a dashboard artifact, embed the scheme data
 * collected from web searches using this structure.
 */

// ── DATA STRUCTURE ──────────────────────────────────────────────────────────

/**
 * @typedef {Object} GovernmentScheme
 * @property {string} id - Unique identifier (slug)
 * @property {string} scheme_name
 * @property {string} ministry_department
 * @property {'Central'|'Karnataka'|'Both'} government_level
 * @property {string|null} launch_date - ISO date string or null
 * @property {'Active'|'Closed'|'Upcoming'|'Unknown'} current_status
 * @property {string|null} last_date_to_apply - ISO date or 'Ongoing' or null
 * @property {string[]} target_beneficiaries
 * @property {string} eligibility_criteria
 * @property {string} benefits
 * @property {string|null} subsidy_or_financial_assistance
 * @property {string} application_process
 * @property {string[]} documents_required
 * @property {string} official_link
 * @property {number|null} total_applicants
 * @property {number|null} total_approved_beneficiaries
 * @property {string|null} budget_allocation
 * @property {string} geographic_coverage
 * @property {'High'|'Medium'|'Low'|'Hidden'} popularity_tier
 * @property {string[]} category_tags
 * @property {boolean} closing_soon
 * @property {boolean} newly_launched
 * @property {string} source_url - Official source verified
 */

// ── SAMPLE DATA TEMPLATE ─────────────────────────────────────────────────────
// Replace this with actual data fetched from official sources

const SCHEME_DATA_TEMPLATE = [
  {
    id: "pm-kisan",
    scheme_name: "PM Kisan Samman Nidhi",
    ministry_department: "Ministry of Agriculture & Farmers Welfare",
    government_level: "Central",
    launch_date: "2019-02-01",
    current_status: "Active",
    last_date_to_apply: "Ongoing",
    target_beneficiaries: ["Small farmers", "Marginal farmers"],
    eligibility_criteria: "Farmer families with combined land holding up to 2 hectares",
    benefits: "₹6,000 per year in 3 equal installments of ₹2,000",
    subsidy_or_financial_assistance: "₹6,000/year direct benefit transfer",
    application_process: "Apply via pmkisan.gov.in or Common Service Centre",
    documents_required: ["Aadhaar card", "Land records", "Bank account details"],
    official_link: "https://pmkisan.gov.in",
    total_applicants: 125000000,
    total_approved_beneficiaries: 110000000,
    budget_allocation: "₹60,000 Crore (2024-25)",
    geographic_coverage: "All India",
    popularity_tier: "High",
    category_tags: ["#farmers", "#central-only", "#financial-inclusion", "#rural", "#popular"],
    closing_soon: false,
    newly_launched: false,
    source_url: "https://pmkisan.gov.in"
  }
  // Add more schemes from web search results here
];

// ── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

/**
 * Filter schemes by category tag
 */
function filterByCategory(schemes, tag) {
  return schemes.filter(s => s.category_tags.includes(tag));
}

/**
 * Get hidden schemes
 */
function getHiddenSchemes(schemes) {
  return schemes.filter(s => s.popularity_tier === 'Hidden');
}

/**
 * Get schemes closing within N days
 */
function getClosingSoon(schemes, withinDays = 30) {
  const now = new Date();
  return schemes.filter(s => {
    if (!s.last_date_to_apply || s.last_date_to_apply === 'Ongoing') return false;
    const deadline = new Date(s.last_date_to_apply);
    const daysLeft = (deadline - now) / (1000 * 60 * 60 * 24);
    return daysLeft > 0 && daysLeft <= withinDays;
  });
}

/**
 * Get newly launched schemes (within 6 months)
 */
function getNewlyLaunched(schemes) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  return schemes.filter(s => {
    if (!s.launch_date) return false;
    return new Date(s.launch_date) >= sixMonthsAgo;
  });
}

/**
 * Get summary statistics
 */
function getSummaryStats(schemes) {
  return {
    total: schemes.length,
    active: schemes.filter(s => s.current_status === 'Active').length,
    closed: schemes.filter(s => s.current_status === 'Closed').length,
    upcoming: schemes.filter(s => s.current_status === 'Upcoming').length,
    hidden: schemes.filter(s => s.popularity_tier === 'Hidden').length,
    newlyLaunched: getNewlyLaunched(schemes).length,
    closingSoon: getClosingSoon(schemes).length,
    centralSchemes: schemes.filter(s => s.government_level === 'Central').length,
    karnatakaSchemes: schemes.filter(s => s.government_level === 'Karnataka').length,
  };
}

/**
 * Status badge config for React rendering
 */
const STATUS_CONFIG = {
  Active: { emoji: '✅', color: 'green', label: 'Active' },
  Closed: { emoji: '❌', color: 'red', label: 'Closed' },
  Upcoming: { emoji: '🔜', color: 'blue', label: 'Upcoming' },
  Unknown: { emoji: '❓', color: 'gray', label: 'Unknown' },
};

const POPULARITY_CONFIG = {
  High: { emoji: '📢', label: 'Popular' },
  Medium: { emoji: '📋', label: 'Known' },
  Low: { emoji: '🔍', label: 'Low Awareness' },
  Hidden: { emoji: '💎', label: 'Hidden Gem' },
};

const GOV_LEVEL_CONFIG = {
  Central: { emoji: '🇮🇳', label: 'Central Govt' },
  Karnataka: { emoji: '🏛️', label: 'Karnataka Govt' },
  Both: { emoji: '🤝', label: 'Central + Karnataka' },
};

// ── URL VALIDATION & LINK HELPERS ────────────────────────────────────────────

/**
 * Validates whether a URL is real and usable.
 * Returns false for nulls, placeholders, and malformed strings.
 */
function isValidUrl(url) {
  if (!url) return false;
  const invalid = ['null', 'n/a', 'undefined', '[url]', '[link]', '(url)', 'tbd', 'coming soon', ''];
  if (invalid.includes(String(url).toLowerCase().trim())) return false;
  try { new URL(url); return true; } catch { return false; }
}

/**
 * Returns the best available URL for a scheme.
 * Falls back to Google search if no valid URL exists.
 */
function resolveSchemeUrl(scheme) {
  if (isValidUrl(scheme.official_link)) return scheme.official_link;
  // Fallback: Google search for the scheme name + official apply
  return `https://www.google.com/search?q=${encodeURIComponent(scheme.scheme_name + ' official apply India government')}`;
}

/**
 * JSX component to use in React artifacts for every scheme link.
 * 
 * COPY THIS INTO YOUR ARTIFACT — do not use window.open() or onClick for navigation.
 * 
 * Usage: <SchemeLink scheme={scheme} />
 * 
 * @example
 * // In your React artifact JSX:
 * const SchemeLink = ({ scheme }) => {
 *   const url = isValidUrl(scheme.official_link)
 *     ? scheme.official_link
 *     : `https://www.google.com/search?q=${encodeURIComponent(scheme.scheme_name + ' official apply')}`;
 *   const isReal = isValidUrl(scheme.official_link);
 *   return (
 *     <a
 *       href={url}
 *       target="_blank"
 *       rel="noopener noreferrer"
 *       title={isReal ? 'Open official application portal' : 'Search for official portal'}
 *       className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium
 *         ${isReal
 *           ? 'bg-blue-600 text-white hover:bg-blue-700'
 *           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
 *     >
 *       {isReal ? '🔗 Apply Now ↗' : '🔍 Find Portal ↗'}
 *     </a>
 *   );
 * };
 */

// Export helpers for use in artifact
module.exports.isValidUrl = isValidUrl;
module.exports.resolveSchemeUrl = resolveSchemeUrl;



/**
 * ── REACT ARTIFACT USAGE ────────────────────────────────────────────────────
 * 
 * When building a React dashboard artifact:
 * 
 * 1. Paste collected scheme data as const SCHEMES = [...] at top of file
 * 2. Use useState for: activeTab, selectedCategory, searchQuery, selectedScheme
 * 3. Tab structure:
 *    - "Overview" tab: Summary cards + Intelligence highlights
 *    - "All Schemes" tab: Filterable table + expandable rows
 *    - "Analytics" tab: recharts BarChart + PieChart
 *    - "Hidden Gems" tab: Filtered hidden schemes with discovery signals
 * 
 * Key recharts imports:
 *   import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 * 
 * Color palette for charts:
 *   const COLORS = ['#FF6B35', '#004E89', '#1A936F', '#C6AC8F', '#8338EC', '#FB5607'];
 * 
 * ── CRITICAL: LINK RENDERING ─────────────────────────────────────────────────
 *
 * NEVER use window.open() or onClick for navigation — it is blocked in the artifact sandbox.
 * ALWAYS use <a href="..." target="_blank" rel="noopener noreferrer"> for all links.
 *
 * Use the SchemeLink component below for every apply/portal link in the artifact.
 */
