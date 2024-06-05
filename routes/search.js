const express = require("express");
const router = express.Router();


/* GET quotes listing. */
router.get("/", async function (req, res, next) {
  try {
    res.json({hi: 'hello'});
  } catch (err) {
    console.error(`Error while getting search items `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

function getStore() {
  return [
    {
      id: "suiteanswers_doc_1",
      title: "Installing the Workforce Management SuiteApp",
      text: "As an Administrator, install the Workforce Management SuiteApp using the following details: Bundle Name: Adi Insights \nBundle ID: 317115 \nFor more information about how to install a SuiteApp in your account, see Installing a Bundle. \nTo continue setting up WFM, see Assigning the Adi Insights Integration Role.",
      url: "https://suiteanswers.custhelp.com/app/answers/detail/a_id/108569/loc/en_US",
      created_at: "2023-11-13T20:09:31Z",
    },
    {
      id: "suiteanswers_doc_2",
      title:
        "Rolling back the SuitePeople Time Clock Windows Application to AdiClock",
      text: "SuitePeople Workforce management customers who upgrade to SuitePeople Time Clock version 2.0.0.0 for Windows have an option to roll back to the previous AdiClock version. \nIn line with the acquisition of Adi Insights by Oracle, the AdiClock Windows app is targeted for an upgrade that rebrands its visual components to align with the Oracle NetSuite colors and themes and rename the application from AdiClock to SuitePeople Time Clock. \nStarting June 5, 2024, Oracle will upgrade the AdiClock Windows application to SuitePeople Time Clock version 2.0.0.0.",
      url: "https://suiteanswers.custhelp.com/app/answers/detail/a_id/1016217/loc/en_US",
      created_at: "2023-11-25T20:09:31Z",
    },
  ];
}
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

/* POST search */
router.post("/", async function (req, res, next) {
  try {
    const userQuery = req.body.query;
    const results = search(userQuery);
    res.json(JSON.stringify({ results }));

    // res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting search items `, err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

module.exports = router;
