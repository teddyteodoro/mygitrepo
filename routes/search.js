const express = require("express");
const router = express.Router();
// const axios = require("axios");

/* POST search */
router.post("/", async function (req, res, next) {

  return [];
  try {
    const userQuery = req.body.query;
    const results = search(userQuery);
    results =[]
    res.json(results);

    // res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting search items `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

function search(searchPhrase) {

  if ((searchPhrase || "") == "") {
    return [];
  }
  const hasSpace = searchPhrase.indexOf(" ") > -1;
  const searchWords = hasSpace ? searchPhrase.split(" ") : [searchPhrase];
  const allSearchEntries = getStore();
  return allSearchEntries.filter((entry) => {
    for (let i = 0; i < searchWords.length; i++) {
      let searchWord = searchWords[i];
      searchWord = searchWord.toLowerCase();
      if (entry.title.toLowerCase().indexOf(searchWord) > -1) {
        return true;
      }
      if (entry.text.toLowerCase().indexOf(searchWord) > -1) {
        return true;
      }
    }
    return false;
  });
}

function getStore() {
  return [
    {
      "id": "suiteanswers_doc_1",
      "title": "Installing the Workforce Management SuiteApp",
      "text": "As an Administrator, install the Workforce Management SuiteApp using the following details: Bundle Name: Adi Insights",
      "url": "https://suiteanswers.custhelp.com/app/answers/detail/a_id/108569/loc/en_US",
    },
    {
      id: "suiteanswers_doc_2",
      title:
        "Rolling back the SuitePeople Time Clock Windows Application to AdiClock",
      text: "helo",
      url: "https://suiteanswers.custhelp.com/app/answers/detail/a_id/1016217/loc/en_US",
    },
  ];
}




/* GET quotes listing. */
router.get("/", async function (req, res, next) {
  try {
    res.json({ hi: "hello" });
  } catch (err) {
    console.error(`Error while getting search items `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = router;
