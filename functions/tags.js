const axios = require("axios");
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

/**
 *
 * @param {string} tag
 * @returns formatted tag for display
 */
function formatTag(tag) {
  const formattedTag = tag.replace(/-/g, " ");
  return formattedTag;
}

exports.handler = async function (event, context, callback) {
  let tags = [];
  const TAGS_PER_QUERY = 100;
  const AXIOS_OPTIONS = {
    headers: {
      "Zotero-API-Version": 3,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    // first query
    const response = await axios.get(`${API_URL}/items/top/tags?limit=${TAGS_PER_QUERY}`, AXIOS_OPTIONS);

    if (response.status === 200) {
      // push first results
      response.data.map((item) => {
        tags.push({
          id: item.tag,
          name: formatTag(item.tag),
        });
      });

      // calculate additional queries
      const totalTags = response.headers["total-results"];
      const moreQueries = Math.ceil(totalTags / TAGS_PER_QUERY) - 1;

      // build array of promises for additional queries
      const newQueries = [];
      for (let i = 1; i <= moreQueries; i++) {
        let start = i * TAGS_PER_QUERY;
        let query = axios.get(`${API_URL}/items/top/tags?start=${start}limit=${TAGS_PER_QUERY}`, AXIOS_OPTIONS);
        newQueries.push(query);
      }

      // resolve promises in parallel
      const allResponses = await Promise.all(newQueries);
      allResponses.forEach((response) => {
        response.data.map((item) => {
          tags.push({
            id: item.tag,
            name: formatTag(item.tag),
          });
        });
      });

      // sort array
      tags = tags.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      // send data
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(tags),
      });
    } else {
      console.error(response.statusText);
      return { statusCode: response.status, body: response.statusText };
    }
  } catch (err) {
    console.error(err);
  }
};
