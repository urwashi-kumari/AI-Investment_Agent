import { PromptTemplate } from "@langchain/core/prompts";

export const investmentPrompt = PromptTemplate.fromTemplate(`
You are a Senior Investment Research Analyst.

Analyze the company: {company}

Company Profile:
{profile}

Stock Quote:
{quote}

Latest News:
{news}

Latest Web Search:
{webSearch}

Return ONLY valid JSON.

Do not use markdown.
Do not use \`\`\`.
Do not explain anything outside JSON.

Rules:

1. Company name should be official.
2. Industry should contain only ONE industry.
3. Financial Health should be between 0 and 100.
4. Risk Level should be Low, Medium or High.
5. Recommendation should ONLY be:
   - INVEST
   - WATCH
   - PASS
6. Confidence should be between 0 and 100.
Return this exact JSON:

{{
  "company":"",
  "industry":"",
  "quickSummary":"",
  "financialHealth":0,
  "riskLevel":"",
  "recommendation":"",
  "confidence":0,
  "strengths":[],
  "weaknesses":[],
  "opportunities":[],
  "threats":[],
  "reason":""
}}

`);