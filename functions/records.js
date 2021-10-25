const axios = require("axios");

/**
 * Format publication type
 *
 * @param {String} type - type
 * @return {Object} translations for type
 */

function formatType(type) {
  let translations;
  switch (type) {
    case "webpage":
      translations = {
        fr: "Site internet",
        en: "Website",
      };
      break;
    case "journalArticle":
      translations = {
        fr: "Article de journal",
        en: "Journal article",
      };
      break;
    case "thesis":
      translations = {
        fr: "Thèse",
        en: "Thesis",
      };
      break;
    case "report":
      translations = {
        fr: "Rapport",
        en: "Report",
      };
      break;
    case "newspaperArticle":
      translations = {
        fr: "Article de presse",
        en: "Press article",
      };
      break;
    case "magazineArticle":
      translations = {
        fr: "Article de magasine",
        en: "Magazine Article",
      };
      break;
    case "encyclopediaArticle":
      translations = {
        fr: "Article d'encyclopédie",
        en: "Encyclopedia Article",
      };
      break;
    case "document":
      translations = {
        fr: "Document",
        en: "Document",
      };
      break;
    case "conferencePaper":
      translations = {
        fr: "Actes de conférence",
        en: "Conference paper",
      };
      break;
    case "book":
      translations = {
        fr: "Livre",
        en: "Book",
      };
      break;
    case "bookSection":
      translations = {
        fr: "Chapitre de livre",
        en: "Book section",
      };
      break;
    case "blogPost":
      translations = {
        fr: "Blogpost",
        en: "Blogpost",
      };
      break;
    default:
      translations = {
        fr: type,
        en: type,
      };
  }

  return translations;
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
 * Build Zotero Url
 * @param {String} q
 * @param {String} tag
 * @returns {String} Full Zotero URL
 */
function buildZoteroUrl(limit, start, q, tag) {
  let qParam = q ? `&q=${q}` : "";
  let tagParam = tag ? `&tag=${tag}` : "";
  let fullUrl = `${process.env.API_URL}items/top?start=${start}&limit=${limit}${qParam}${tagParam}&sort=date&direction=desc`;
  return fullUrl;
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
      "Content-Type": "application/json",
    },
  };

  // get parameters for query or assign default values
  let limit = event.queryStringParameters.limit || 10;
  let start = event.queryStringParameters.start || 0;
  let q = event.queryStringParameters.q;
  let tag = event.queryStringParameters.tag;

  // build Zotero Url from params
  let zoteroUrl = buildZoteroUrl(limit, start, q, tag);

  try {
    // query API and wait for response
    const response = await axios.get(zoteroUrl, AXIOS_OPTIONS);

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
          summary: item.data.abstractNote,
        };
      });

      // return statuscode, data, pagination, total records
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          data: zoteroData,
          total: parseInt(response.headers["total-results"], 10),
        }),
      });
    } else {
      // log errors if any
      console.error(response.statusText);
      return {
        statusCode: response.status,
        body: response.statusText,
      };
    }
  } catch (error) {
    // log erors if API call fails
    console.error(error);
  }
};
