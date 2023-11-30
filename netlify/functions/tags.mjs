const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

/**
 * Get tags
 *
 * @param {number} start - number at which to start
 * @param {number} limit - fetched items per request
 */

async function getTags(start = 0, limit = 20) {
  try {
    // build URL params
    const urlParams = new URLSearchParams({
      sort: "title",
      direction: "asc",
      start: start,
      limit: limit,
    });

    // query using url.href
    const response = await fetch(`${API_URL}/items/top/tags/?${urlParams}`, {
      headers: {
        "Zotero-API-Version": 3,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // make json data
    const jsonData = await response.json();

    // get total results
    const totalResults = parseInt(response.headers.get("total-results"), 10);

    // return data
    return {
      total: totalResults,
      data: jsonData,
    };
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Format tags
 *
 * @param {string} tag
 * @returns formatted tag for display
 */
function formatTagName(tag) {
  const tagName = tag.replace(/-/g, " ");
  return tagName;
}

export default async (request, context) => {
  try {
    // empty array
    let tags = [];

    // limit for queries
    const QUERY_LIMIT = 10;

    // initial query
    let { total, data } = await getTags(0, QUERY_LIMIT);

    // add data to tags array
    tags.push(...data);

    // calculate nbr of additional queries needed
    let additionalQueries = Math.ceil(total / QUERY_LIMIT) - 1;

    // create array of promises
    let newQueries = [];
    for (let i = 1; i <= additionalQueries; i++) {
      let start = i * QUERY_LIMIT;
      newQueries.push(await getTags(start, QUERY_LIMIT));
    }

    // process promises in parallel
    const allResponses = await Promise.all(newQueries);
    allResponses.forEach((response) => {
      tags.push(...response.data);
    });

    // format tags
    let formattedTags = tags.map((item) => {
      return {
        id: item.tag,
        name: formatTagName(item.tag),
      };
    });

    // return response
    return Response.json({
      data: formattedTags,
      total: total,
    });
  } catch (error) {
    return Response.json({ error: "Error fetching data" }, { status: 500 });
  }
};
