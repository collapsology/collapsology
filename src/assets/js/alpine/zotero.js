const ITEMS_PER_PAGE = 10;

export default () => {
  return {
    records: [],
    tags: [],
    q: "",
    searchQuery: "",
    currentTag: "",
    currentPage: 1,
    limit: ITEMS_PER_PAGE,
    totalRecords: 0,
    totalPages: 0,
    loadingRecords: true,
    loadingTags: true,
    filtersOpen: false,

    setSearch() {
      this.currentPage = 1;
      this.q = this.searchQuery;
    },

    clearSearch() {
      this.currentPage = 1;
      this.searchQuery = "";
      this.q = "";
    },

    setTag(tagId) {
      this.currentPage = 1;
      this.currentTag = tagId;
    },

    clearTag() {
      this.currentPage = 1;
      this.currentTag = "";
    },

    getFirstPage() {
      this.currentPage = 1;
    },

    getPrevPage() {
      this.currentPage--;
    },

    getNextPage() {
      this.currentPage++;
    },

    getLastPage() {
      this.currentPage = Math.ceil(this.totalRecords / ITEMS_PER_PAGE);
    },

    async getTags() {
      try {
        // set loading to true
        this.loadingTags = true;

        // get data from proxy
        let response = await fetch("/.netlify/functions/tags/");
        let jsonData = await response.json();

        // assign data to values
        this.tags = jsonData.data;

        // set loading to false
        this.loadingTags = false;
      } catch (error) {
        throw new Error(error);
      }
    },

    /**
     * Get records from proxy
     * - getRecords() is called with x-effect
     *   so it runs everytime a variable it uses (reads)
     *   is changed (currentPage, searchQuery, currentTag)
     */
    async getRecords() {
      // set loading to true
      this.loadingRecords = true;

      try {
        // build URL params
        const urlParams = new URLSearchParams({
          start: (this.currentPage - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
          q: this.q,
          tag: this.currentTag,
        });

        // get data from proxy
        let response = await fetch(`/.netlify/functions/records/?${urlParams}`);
        let jsonData = await response.json();

        // assign data to values
        this.records = jsonData.data;
        this.totalRecords = jsonData.total;
        this.totalPages = Math.ceil(jsonData.total / ITEMS_PER_PAGE);

        // set loading to false
        this.loadingRecords = false;
      } catch (error) {
        throw new Error(error);
      }
    },

    init() {
      this.currentPage = 1;
      this.getTags();
    },
  };
};
