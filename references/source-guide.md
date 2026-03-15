# Source Guide — Official Government Portals

## How to Scrape & Parse Each Source

---

### 1. india.gov.in — National Portal of India

**Best for:** Comprehensive scheme directory, scheme summaries, ministry links

**Key URLs to fetch:**
```
https://www.india.gov.in/my-government/schemes-in-focus
https://www.india.gov.in/spotlight
https://services.india.gov.in/service/listing
```

**What to look for:**
- Scheme cards with name, ministry, category
- "Apply Now" buttons with official links
- Scheme PDF downloads (contain eligibility and benefit details)

**Search strategy:**
```
web_search: "site:india.gov.in scheme [category keyword]"
web_fetch: https://www.india.gov.in/my-government/schemes-in-focus
```

---

### 2. pib.gov.in — Press Information Bureau

**Best for:** New scheme launches (within last 6 months), budget announcements, scheme amendments

**Key URLs:**
```
https://pib.gov.in/allRel.aspx  (all press releases)
https://pib.gov.in/PressReleasePage.aspx?PRID=[ID]
```

**Search strategy:**
```
web_search: "site:pib.gov.in new scheme launched 2024"
web_search: "site:pib.gov.in Karnataka scheme"
```

**What to extract:** Launch date, announced by whom, official scheme name (exact), budget allocated

---

### 3. data.gov.in — Open Government Data

**Best for:** Statistical data — beneficiary counts, budget figures, geographic coverage, applicant stats

**Key URLs:**
```
https://data.gov.in/search?q=scheme+beneficiaries
https://data.gov.in/catalog/[scheme-name]
```

**Search strategy:**
```
web_search: "site:data.gov.in [scheme name] beneficiaries dataset"
```

**What to extract:** Total beneficiaries, district-wise coverage, annual spend, time-series data

---

### 4. karnataka.gov.in — Karnataka Government Portal

**Best for:** All Karnataka state schemes directory

**Key URLs:**
```
https://www.karnataka.gov.in/english/Pages/Schemes.aspx
https://www.karnataka.gov.in/english/Pages/Programmes.aspx
```

**Department portals to check for hidden schemes:**
```
https://rdpr.karnataka.gov.in  (Rural Development)
https://samajkalyana.karnataka.gov.in  (Social Welfare)
https://dwcd.karnataka.gov.in  (Women & Child)
https://kswc.kar.nic.in  (SC/ST Welfare)
https://minorities.karnataka.gov.in  (Minority Welfare)
https://labour.karnataka.gov.in  (Labour schemes)
https://msme.karnataka.gov.in  (MSME)
https://startupkarnataka.gov.in  (Startup)
```

**Search strategy:**
```
web_search: "site:karnataka.gov.in scheme yojana 2024"
web_fetch: https://www.karnataka.gov.in/english/Pages/Schemes.aspx
```

---

### 5. sevasindhu.karnataka.gov.in — Seva Sindhu Portal

**Best for:** Scheme application status, list of digitally accessible Karnataka services

**Key URLs:**
```
https://sevasindhu.karnataka.gov.in/Sevasindhu/English
```

**What to extract:** Which schemes are online-application-enabled, current application stats

---

### 6. mygov.in — Citizen Engagement Platform

**Best for:** New launches, citizen awareness campaigns, PM-level flagship schemes

**Key URLs:**
```
https://www.mygov.in/schemes/
https://www.mygov.in/campaigns/
```

**Search strategy:**
```
web_search: "site:mygov.in new scheme 2024"
```

---

### 7. Ministry Websites — Hidden Scheme Detection

When hunting for hidden schemes, always check ministry-specific portals:

| Ministry | Portal | Hidden Schemes Likely |
|---|---|---|
| Textile | texmin.nic.in | Craft, weaver schemes |
| Tribal Affairs | tribal.gov.in | Tribal welfare, forest rights |
| Minority Affairs | minorityaffairs.gov.in | Scholarship, Waqf schemes |
| Fisheries | dof.gov.in | Fisherman schemes |
| MSME | msme.gov.in | Credit, tech, export schemes |
| Skill Dev | skillindia.gov.in | Training, certification |
| Handicrafts | handicrafts.nic.in | Artisan, GI tag schemes |

---

## Search Query Templates

### For listing schemes:
```
"[state/central] government scheme 2024 list official"
"site:[portal] scheme yojana"
"[ministry] government scheme beneficiary apply"
```

### For hidden schemes:
```
"[category] government scheme lesser known 2024"
"government yojana not popular apply [state]"
"minority scheme artisan farmer [state] government"
```

### For new launches:
```
"new government scheme launched [month] [year]"
"site:pib.gov.in new scheme [year]"
"Karnataka budget 2024 new scheme announced"
```

### For deadlines:
```
"government scheme last date apply [month] [year]"
"[scheme name] application deadline 2024"
```

---

## Data Quality Notes

| Source | Data Quality | Update Frequency |
|---|---|---|
| pib.gov.in | Very High (official) | Daily |
| india.gov.in | High | Weekly |
| karnataka.gov.in | Medium-High | Monthly |
| sevasindhu.karnataka.gov.in | High (live) | Real-time |
| data.gov.in | Medium (lags) | Quarterly |
| Ministry sites | Variable | Irregular |

Always prefer `pib.gov.in` for scheme launch dates and official names.
Always prefer `data.gov.in` for beneficiary statistics.
Always verify scheme status on the official application portal before stating "Active".
