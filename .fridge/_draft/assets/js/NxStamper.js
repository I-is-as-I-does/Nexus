import * as Check from "./lib/Jack/Check.js";
import { isValidHttpUrl } from "./lib/Jack/Web.js";
import { charCut } from "./lib/Jack/Help.js";

export function charLimits(catg) {
  var limits = {
    handle: [3, 30],
    about: [0, 400],
    id: [3, 36],
    name: [3, 30],
    description: [0, 400],
    main: [1, 1000],
    aside: [0, 400],
    caption: [0, 200],
  };
  if (limits.hasOwnProperty(catg)) {
    return limits[catg];
  }
  return false;
}

export function itmLimits(catg) {
  var limits = {
    threads: 100,
    linked: 100,
  };
  if (limits.hasOwnProperty(catg)) {
    return limits[catg];
  }
  return false;
}

export function isValidMediaType(type) {
  return (
    Check.isNonEmptyStr(type) &&
    [
      "page",
      "video",
      "image",
      "audio",
      "youtube",
      "vimeo",
      "soundcloud",
    ].includes(type)
  );
}

export function validLenghtItem(item, catg) {
  if (Check.isNonEmptyStr(item) && hasValidMinLength(item, catg)) {
    if (!hasValidMaxLength(item, catg)) {
      item = cutItemLength(item, catg);
    }
    return item;
  }
  var min = charLimits(catg);
  if(min === 0){
    return "";
  }
  var placeholder = "-";
  return placeholder.repeat(min);
}

export function validMedia(mediaObj) {
  if (
    Check.isNonEmptyObj(mediaObj) &&
    isValidHttpUrl(mediaObj.url) &&
    isValidMediaType(mediaObj.type)
  ) {
    mediaObj.caption = validLenghtItem(mediaObj.caption, "caption");
    return mediaObj;
  }
  return { url: "", type: "", caption: "" };
}

export function validRecord(record) {
  if (
    Check.isNonEmptyObj(record) &&
    Check.seemsLikeValidDate(record.timestamp) &&
    Check.isNonEmptyStr(record.main)
  ) {
    record.main = validLenghtItem(record.main, "main");

    if (record.main) {
      record.aside = validLenghtItem(record.aside, "aside");
      record.media = validMedia(record.media);
      return record;
    }
  }

  return null;
}

export function cutItemLength(item, catg) {
  var limits = charLimits(catg);
  if (limits) {
    return charCut(item, limits[1]);
  }
  return item;
}

export function hasValidMaxLength(item, catg) {
  var limits = charLimits(catg);
  if (limits !== false) {
    return item.length <= limits[1];
  }
  return true;
}
export function hasValidMinLength(item, catg) {
  var limits = charLimits(catg);
  if (limits) {
    return item.length >= limits[0];
  }
  return true;
}

export function hasValidLength(item, catg) {
  var limits = charLimits(catg);
  if (limits) {
    return item.length >= limits[0] && item.length <= limits[1];
  }
  return true;
}

export function isValidId(id) {
  return (
    Check.isNonEmptyStr(id) &&
    hasValidLength(id, "id") &&
    id.replace(/[^a-zA-Z0-9-]/, "") === id
  );
}

export function isValidLinkItm(link) {
  return (
    Check.isNonEmptyObj(link) && isValidHttpUrl(link.url) && isValidId(link.id)
  );
}

export function validLinks(linked) {
  var items = linked.slice(0, itmLimits("linked"));
  var map = [];
  for (var i = 0; i < items.length; i++) {
    if (isValidLinkItm(items[i])) {
      var concat = items[i].id + items[i].url;
      if (!map.includes(concat)) {
        map.push(concat);
        continue;
      }
    }
    items.splice(i, 1);
  }
  if (items.length) {
    items.sort((a, b) => (a.url < b.url ? 1 : -1));
  }
  return items;
}

export function validThread(thread) {
  if (Check.isNonEmptyObj(thread) && isValidId(thread.id)) {
    thread.record = validRecord(thread.record);
    if (thread.record) {
      thread.name = validLenghtItem(thread.name, "name");
      thread.description = validLenghtItem(thread.description, "description");
      thread.linked = validLinks(thread.linked);
      return thread;
    }
  }
  return null;
}

export function validThreads(threads) {
  if (Check.isNonEmptyArr(threads)) {
    threads = threads.slice(0, itmLimits("threads"));
    for (var i = 0; i < threads.length; i++) {
      threads[i] = validThread(threads[i]);
      if (!threads[i]) {
        threads.splice(i, 1);
      }
    }
    return threads;
  }
  return [];
}

export function validAuthor(author) {
  if (Check.isNonEmptyObj(author) && isValidHttpUrl(author.url)) {
    author.handle = validLenghtItem(author.handle, "handle");
    if (author.handle) {
      author.about = validLenghtItem(author.about, "about");
      return author;
    }
  }
  return null;
}

export function validData(data) {
  if (Check.isNonEmptyObj(data) && isValidHttpUrl(data.nexus)) {
    data.author = validAuthor(data.author);
    if (data.author) {
      data.threads = validThreads(data.threads);
      if (data.threads.length) {
        return data;
      }
    }
  }
  return null;
}
