server.js
const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/heyreach", async (req, res) => {
  try {

    console.log("Webhook received:", req.body);

    const lead = req.body;

    await axios.post(
      "https://api.apollo.io/api/v1/contacts",
      {
        api_key: process.env.APOLLO_API_KEY,
        first_name: lead.firstName || "",
        last_name: lead.lastName || "",
        email: lead.email || "",
        organization_name: lead.company || "",
        title: lead.title || "",
        linkedin_url: lead.linkedinUrl || "",
        run_dedupe: true
      }
    );

    res.status(200).send("Success");

  } catch (error) {

    console.error(error.response?.data || error);

    res.status(500).send("Apollo failed");

  }
});

app.get("/", (req,res)=>{
  res.send("Webhook live");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
 console.log(`Running on ${PORT}`);
});
