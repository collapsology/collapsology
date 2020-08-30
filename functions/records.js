const axios = require("axios");

/**
 * Format publication type
 *
 * @param {String} type - type
 * @return {Object} translations for type
 */

function formatType(type) {
  let transations;
  switch (type) {
    case "webpage":
      transations = {
        fr: "Site internet",
        en: "Website"
      };
      break;
    case "journalArticle":
      transations = {
        fr: "Article de journal",
        en: "Journal article"
      };
      break;
    case "thesis":
      transations = {
        fr: "Thèse",
        en: "Thesis"
      };
      break;
    case "report":
      transations = {
        fr: "Rapport",
        en: "Report"
      };
      break;
    case "newspaperArticle":
      transations = {
        fr: "Article de presse",
        en: "Press article"
      };
      break;
    case "magazineArticle":
      transations = {
        fr: "Article de magasine",
        en: "Magazine Article"
      };
      break;
    case "encyclopediaArticle":
      transations = {
        fr: "Article d'encyclopédie",
        en: "Encyclopedia Article"
      };
      break;
    case "document":
      transations = {
        fr: "Document",
        en: "Document"
      };
      break;
    case "conferencePaper":
      transations = {
        fr: "Actes de conférence",
        en: "Conference paper"
      };
      break;
    case "book":
      transations = {
        fr: "Livre",
        en: "Book"
      };
      break;
    case "bookSection":
      transations = {
        fr: "Chapitre de livre",
        en: "Book section"
      };
      break;
    case "blogPost":
      transations = {
        fr: "Blogpost",
        en: "Blogpost"
      };
      break;
    default:
      transations = {
        fr: type,
        en: type
      };
  }

  return transations;
}

/**
 * Get year from date string
 *
 * @param {String} str - Date string
 * @return {String} year fur digits
 */

function getYear(str) {
  const myDate = new Date(str);
  return myDate.getFullYear();
}

/**
 * Get data from API
 */
exports.handler = async function (event, context, callback) {
  // headers and authorization
  const AXIOS_OPTIONS = {
    headers: {
      "Zotero-API-Version": 3,
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json"
    }
  };

  // get parameters for query or assign default values
  let limit = event.queryStringParameters.limit || 10;
  let start = event.queryStringParameters.start || 0;
  let tag = event.queryStringParameters.tag || "";
  let q = event.queryStringParameters.q || "";

  try {
    // query API and wait for response
    const response = await axios.get(
      `${process.env.API_URL}items/top?start=${start}&limit=${limit}&q=${q}&tag=${tag}&sort=date&direction=desc`,
      AXIOS_OPTIONS
    );

    // if we get a response, get the fields and format
    if (response.status === 200) {
      let zoteroData = response.data.map((item) => {
        return {
          id: item.key,
          type: formatType(item.data.itemType),
          title: item.data.title,
          author: item.meta.creatorSummary,
          year: getYear(item.meta.parsedDate),
          publication: item.data.publicationTitle,
          publisher: item.data.publisher,
          institution: item.data.institution,
          url: item.data.url,
          summary: item.data.abstractNote
        };
      });

      // return statuscode, data, pagination, total records
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          data: zoteroData,
          total: parseInt(response.headers["total-results"], 10)
        })
      });
    } else {
      // log errors if any
      console.error(response.statusText);
      return { statusCode: response.status, body: response.statusText };
    }
  } catch (error) {
    // log erors if API call fails
    console.error(error);
  }
};
