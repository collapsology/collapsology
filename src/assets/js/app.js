import "alpinejs";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

window.zotero = function () {
  return {
    records: [],
    filtersOpen: false,
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0,
    currentTag: "",
    searchActive: false,
    needle: "",
    loading: true,
    tags: [],
    async getRecords() {
      try {
        // set loading
        this.loading = true;

        // hit proxy
        const response = await axios.get("/.netlify/functions/records", {
          params: {
            limit: ITEMS_PER_PAGE,
            start: (this.currentPage - 1) * ITEMS_PER_PAGE,
            q: this.needle,
            tag: this.currentTag
          }
        });

        // assign data
        let { data, total } = response.data;

        // set state
        this.records = data;
        this.totalRecords = total;
        this.totalPages = Math.ceil(total / ITEMS_PER_PAGE);
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },
    async getAllTags() {
      try {
        let { data } = await axios.get("/.netlify/functions/tags");
        this.tags = data;
      } catch (err) {
        console.log(err);
      }
    },
    init() {
      this.getRecords();
      this.getAllTags();
    },
    getAllRecords() {
      this.needle = "";
      this.currentTag = "";
      this.currentPage = 1;
      this.getRecords();
    },
    getRecordsByTag(tagId) {
      this.currentTag = tagId;
      this.currentPage = 1;
      this.getRecords();
    },
    getRecordsBySearch() {
      if (!this.needle.length) {
        return;
      }
      this.searchActive = true;
      this.currentTag = "";
      this.currentPage = 1;
      this.getRecords();
    },
    clearSearch() {
      if (this.needle.length !== 0) {
        this.searchActive = false;
        this.getAllRecords();
      }
    },
    prevPage() {
      this.currentPage--;
      this.getRecords();
    },
    nextPage() {
      this.currentPage++;
      this.getRecords();
    },
    firstPage() {
      this.currentPage = 1;
      this.getRecords();
    },
    lastPage() {
      this.currentPage = this.totalPages;
      this.getRecords();
    }
  };
};
