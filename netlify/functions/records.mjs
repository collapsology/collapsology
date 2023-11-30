const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const TYPES_TRANSLATIONS = {
  annotation: {
    en: "Annotation",
    fr: "Annotation",
  },
  artwork: {
    en: "Artwork",
    fr: "Illustration",
  },
  attachment: {
    en: "Attachment",
    fr: "Pièce jointe",
  },
  audioRecording: {
    en: "Audio Recording",
    fr: "Enregistrement audio",
  },
  bill: {
    en: "Bill",
    fr: "Projet de loi",
  },
  blogPost: {
    en: "Blog Post",
    fr: "Billet de blog",
  },
  book: {
    en: "Book",
    fr: "Livre",
  },
  bookSection: {
    en: "Book Section",
    fr: "Chapitre de livre",
  },
  case: {
    en: "Case",
    fr: "Affaire",
  },
  computerProgram: {
    en: "Software",
    fr: "Logiciel",
  },
  conferencePaper: {
    en: "Conference Paper",
    fr: "Article de colloque",
  },
  dataset: {
    en: "Dataset",
    fr: "Données",
  },
  dictionaryEntry: {
    en: "Dictionary Entry",
    fr: "Entrée de dictionnaire",
  },
  document: {
    en: "Document",
    fr: "Document",
  },
  email: {
    en: "E-mail",
    fr: "E-mail",
  },
  encyclopediaArticle: {
    en: "Encyclopedia",
    fr: "Encyclopédie",
  },
  film: {
    en: "Film",
    fr: "Film",
  },
  forumPost: {
    en: "Forum Post",
    fr: "Message de forum",
  },
  hearing: {
    en: "Hearing",
    fr: "Audience",
  },
  instantMessage: {
    en: "Instant Message",
    fr: "Message instantané",
  },
  interview: {
    en: "Interview",
    fr: "Interview",
  },
  journalArticle: {
    en: "Journal Article",
    fr: "Article de revue",
  },
  letter: {
    en: "Letter",
    fr: "Lettre",
  },
  magazineArticle: {
    en: "Magazine Article",
    fr: "Article de magazine",
  },
  manuscript: {
    en: "Manuscript",
    fr: "Manuscrit",
  },
  map: {
    en: "Map",
    fr: "Carte",
  },
  newspaperArticle: {
    en: "Newspaper Article",
    fr: "Article de journal",
  },
  note: {
    en: "Note",
    fr: "Note",
  },
  patent: {
    fr: "Brevet",
    en: "Patent",
  },
  podcast: {
    en: "Podcast",
    fr: "Podcast",
  },
  preprint: {
    en: "Preprint",
    fr: "Preprint",
  },
  presentation: {
    en: "Presentation",
    fr: "Présentation",
  },
  radioBroadcast: {
    en: "Radio Broadcast",
    fr: "Émission de radio",
  },
  report: {
    en: "Report",
    fr: "Rapport",
  },
  standard: {
    en: "Standard",
    fr: "Norme",
  },
  statute: {
    en: "Statute",
    fr: "Acte juridique",
  },
  thesis: {
    en: "Thesis",
    fr: "Thèse",
  },
  tvBroadcast: {
    en: "TV Broadcast",
    fr: "Émission de TV",
  },
  videoRecording: {
    en: "Video Recording",
    fr: "Enregistrement vidéo",
  },
  webpage: {
    en: "Web Page",
    fr: "Page Web",
  },
};

/**
 * Format record tags
 * @param {Array} tags - array of tag objects { tag: 'name-of-tag' }
 * @returns {Array} - formatted tag array for display
 */
function formatTags(tags) {
  let formattedTags = tags.map((tagObject) => {
    return tagObject.tag.replace(/-/g, " ");
  });
  return formattedTags;
}

/**
 * Format publication type
 * @param {String} type - type
 * @returns {Object} translations for type
 */
function typeTranslations(type) {
  if (type in TYPES_TRANSLATIONS) {
    return {
      fr: TYPES_TRANSLATIONS[type].fr,
      en: TYPES_TRANSLATIONS[type].en,
    };
  } else {
    return {
      fr: "Ressource",
      en: "Resource",
    };
  }
}

/**
 * Get year from date string
 * @param {String} str - Date string
 * @returns {String} year fur digits
 */
function getYear(str) {
  const myDate = new Date(str);
  return myDate.getFullYear();
}

/**
 * Get records
 * @param {String} url - valid Zotero URL
 * @returns {Object} data - records from Zotero API
 */
async function getRecords(limit, start, q, tag) {
  try {
    const urlParams = new URLSearchParams({
      sort: "date",
      direction: "desc",
      start: start,
      limit: limit,
      q: q,
      tag: tag,
    });

    const apiUrl = `${API_URL}/items/top?${urlParams}`;

    let response = await fetch(apiUrl, {
      headers: {
        "Zotero-API-Version": 3,
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // get data
    let data = await response.json();

    // get total number of records (if we need to pagiate)
    let totalRecords = parseInt(response.headers.get("total-results"), 10);

    // format data
    // get records and format
    let formattedData = data.map((item) => {
      // return formatted record object
      return {
        id: item.key,
        type: typeTranslations(item.data.itemType),
        title: item.data.title,
        author: item.meta.creatorSummary,
        year: getYear(item.meta.parsedDate),
        publication: item.data.publicationTitle,
        publisher: item.data.publisher,
        institution: item.data.institution,
        url: item.data.url,
        summary: item.data.abstractNote,
        tags: formatTags(item.data.tags),
      };
    });

    return {
      data: formattedData,
      total: totalRecords,
    };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Get data from API
 */
export default async (request, context) => {
  // get parameters for query or assign default values
  let urlParams = new URL(request.url).searchParams;
  let limit = urlParams.get("limit");
  let start = urlParams.get("start");
  let q = urlParams.get("q");
  let tag = urlParams.get("tag");

  try {
    // query API and wait for response
    const records = await getRecords(limit, start, q, tag);

    // return data
    return Response.json({
      data: records.data,
      total: records.total,
    });
  } catch (error) {
    // log erors if API call fails
    console.error(error);
    throw new Error(error);
  }
};
