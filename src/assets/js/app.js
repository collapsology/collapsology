import Alpine from "alpinejs";
import zotero from "./alpine/zotero.js";

// call external script for x-data
Alpine.data("zotero", zotero);

// useful for debugging
window.Alpine = Alpine;

// start Alpine
Alpine.start();
