// dailyupdate-trigger.js

export default async function handler(req: any, res: any) {
  try {
    // Make a request to your FastAPI endpoint
    const response = await fetch(
      "https://www.opusglobals.com/api/routers/dailyupdate",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers if needed
        },
        // body: JSON.stringify({ /* data if required */ }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error triggering daily update: ${response.statusText}`);
    }

    res.status(200).send("Daily update triggered successfully.");
  } catch (error: any) {
    console.error(error);
    res.status(500).send(`Failed to trigger daily update: ${error.message}`);
  }
}
