import { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { year } = req.query;

  // Validate the year parameter
  if (!year || isNaN(Number(year))) {
    return res.status(400).json({ error: "Invalid year parameter" });
  }

  try {
    let holidays: { date: string; name: string; source: string }[] = [];

    // Try fetching holidays from Nager.Date API
    const nagerResponse = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/PH?lang=en`);
    if (nagerResponse.ok) {
      const nagerData = await nagerResponse.json();
      holidays = nagerData.map((holiday: any) => ({
        date: holiday.date,
        name: holiday.name, // Already in English
        source: "Nager.Date",
      }));
    } else {
      console.warn("Nager.Date API failed. Falling back to web scraping...");
    }

    // If Nager.Date fails, scrape the Official Gazette for holiday data
    if (!holidays.length) {
      const response = await fetch("https://www.officialgazette.gov.ph/nationwide-holidays/");
      if (!response.ok) throw new Error("Failed to fetch holidays from Official Gazette");

      const html = await response.text();
      const $ = cheerio.load(html);

      $("table tbody tr").each((_, element) => {
        const dateText = $(element).find("td:nth-child(1)").text().trim();
        const name = $(element).find("td:nth-child(2)").text().trim();
        if (dateText && name) {
          holidays.push({
            date: `${year}-${dateText}`,
            name, // No manual translation, keeping it clean
            source: "Official Gazette",
          });
        }
      });
    }

    // Send the response with holidays
    res.status(200).json(holidays);
  } catch (error) {
    console.error("Error fetching holidays:", error);
    res.status(500).json({ error: "Failed to fetch holidays" });
  }
}
