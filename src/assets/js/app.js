import axios from "axios";
import { createApp } from "petite-vue";

const ITEMS_PER_PAGE = 10;

createApp({
  records: [],
  tags: [],
  loading: true,
  filtersOpen: false,
  totalRecords: 0,
  currentPage: 1,
  totalPages: 0,
  currentTag: "",
  needle: "",
  searchQuery: "",
  /**
   * Fetch records from proxy
   * - fetchRecords() is called with v-effect
   *   so it runs everytime a variable it uses (reads)
   *   is changed (currentPage, searchQuery, currentTag)
   */
  async fetchRecords() {
    try {
      // set loading
      this.loading = true;

      // hit proxy to get data
      const response = await axios.get("/.netlify/functions/records", {
        params: {
          limit: ITEMS_PER_PAGE,
          start: (this.currentPage - 1) * ITEMS_PER_PAGE,
          q: this.searchQuery,
          tag: this.currentTag,
        },
      });

      // assign data and total
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
  async fetchTags() {
    try {
      let { data } = await axios.get("/.netlify/functions/tags");
      this.tags = data;
    } catch (err) {
      console.log(err);
    }
  },
  setSearch() {
    this.searchQuery = this.needle;
    this.currentPage = 1;
  },
  clearSearch() {
    this.searchQuery = "";
    this.needle = "";
    this.currentPage = 1;
  },
  setTag(id) {
    this.currentTag = id;
    this.currentPage = 1;
  },
  clearTag() {
    this.currentTag = "";
    this.currentPage = 1;
  },
  prevPage() {
    if (this.currentPage === 1) return;
    this.currentPage--;
  },
  nextPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage++;
  },
  firstPage() {
    if (this.currentPage === 1) return;
    this.currentPage = 1;
  },
  lastPage() {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = this.totalPages;
  },
}).mount("#app");
