import {
  isEmpty,
  seemsLikeValidDate,
} from "../libr/Jack/Check.js";
import { isValidHttpUrl } from "../libr/Jack/Web.js";
import { charCut } from "../libr/Jack/Help.js";

import {
  charMinMax,
  itemsMinMax,
  appUrl,
  supportedMediaTypes,
  timestampPattern,
  idPattern,
  typesMap,
} from "./NxSpecs.js";
import { logErr } from "../logs/NxLog.js";


export function charLimits(catg) {
    if (charMinMax.hasOwnProperty(catg)) {
      return charMinMax[catg];
    }
    logErr("Unknown characters limits category", catg);
    return false;
  }

  export function itmLimits(catg) {
    if (itemsMinMax.hasOwnProperty(catg)) {
      return itemsMinMax[catg];
    }
    logErr("Unknown items limits category", catg);
    return false;
  }

  export function isValidMediaType(mediaType) {
    if (
      hasValidType(mediaType, "type", true) &&
      supportedMediaTypes.includes(mediaType)
    ) {
      return true;
    }

    logErr("Invalid media type", type);
    return false;
  }

  export function extendString(str, catg) {
    var limits = charLimits(catg);
    if (limits !== false) {
      var diff = limits[0] - str.length;
      if (diff > 0) {
        var placeholder = "-";
        str = placeholder.repeat(diff) + str;
      }
      return str;
    }
    logErr("Unable to extend string", catg);
    return null;
  }

  export function validLenghtStr(str, catg) {
    if (!hasValidType(str, catg, true)) {
      str = "";
    }
    if (!strHasValidMinLength(str, catg)) {
      str = extendString(str, catg);
    } else if (!strHasValidMaxLength(str, catg)) {
      str = cutString(str, catg);
    }
    return str;
  }

  export function hasValidType(item, field, nonEmpty = true) {
    if (typesMap.hasOwnProperty(field)) {
      var type = typesMap[field];
      if (
        typeof item !== "undefined" &&
        item !== null &&
        item.constructor.name == type
      ) {
        if (!nonEmpty || !isEmpty(item)) {
          return true;
        }
        logErr("Field is empty", field);
      } else {
        logErr("Invalid field type", field);
      }
    } else {
      logErr("Unknown field", field);
    }

    return false;
  }

  export function validMedia(mediaObj) {
    if (
      hasValidType(mediaObj, "media", true) &&
      isValidUrl(mediaObj.url) &&
      isValidMediaType(mediaObj.type)
    ) {
      mediaObj.caption = validLenghtStr(mediaObj.caption, "caption");
      return mediaObj;
    }
    return { url: "", type: "", caption: "" };
  }

  export function isValidTimestamp(timestamp, strict = false) {
    if (
      hasValidType(timestamp, "timestamp", true) &&
      (timestamp.match(timestampPattern) ||
        (!strict && seemsLikeValidDate(timestamp)))
    ) {
      return true;
    }
    logErr("Invalid timestamp", timestamp);
    return false;
  }

  export function validRecord(record) {
    if (
      hasValidType(record, "record", true) &&
      isValidTimestamp(record.timestamp) &&
      hasValidType(record.main, "main", true)
    ) {
      record.main = validLenghtStr(record.main, "main");

      if (record.main) {
        record.aside = validLenghtStr(record.aside, "aside");
        record.media = validMedia(record.media);
        return record;
      }
    }

    return null;
  }

  export function cutString(item, catg) {
    var limits = charLimits(catg);
    if (limits !== false) {
      return charCut(item, limits[1]);
    }
    logErr("Unable to cut string", catg);
    return "";
  }

  export function strHasValidMaxLength(item, catg) {
    var limits = charLimits(catg);
    if (limits !== false) {
      if (item.length <= limits[1]) {
        return true;
      }
      logErr("Invalid max length", catg);
    }
    return false;
  }
  export function strHasValidMinLength(item, catg) {
    var limits = charLimits(catg);
    if (limits !== false) {
      if (item.length >= limits[0]) {
        return true;
      }
      logErr("Invalid min length", catg);
    }
    return false;
  }

  export function hasValidLength(item, catg) {
    var limits = charLimits(catg);
    if (limits !== false) {
      if (item.length >= limits[0] && item.length <= limits[1]) {
        return true;
      }
      logErr("Invalid length", catg);
    }
    return false;
  }

  export function isValidId(id) {
    if (hasValidType(id, "id", true) && id.match(idPattern)) {
      return true;
    }
    logErr("Invalid thread id", id);
    return false;
  }

  export function isValidUrl(url) {
    if (isValidHttpUrl(url)) {
      return true;
    }
    logErr("Invalid url", url);
    return false;
  }

  export function isValidLinkItm(link) {
    if (
      hasValidType(link, "linked.item", true) &&
      isValidUrl(link.url) &&
      isValidId(link.id)
    ) {
      return true;
    }
    logErr("Invalid linked thread");
    return false;
  }

  export function validLinks(linked) {
   
    linked.slice(0, itmLimits("linked")[1]);


    var done = [];
    for (var i = 0; i < linked.length; i++) {
      if (isValidLinkItm(linked[i])) {
        var concat = linked[i].url + " " + linked[i].id;

        if (!done.includes(concat)) {
          done.push(concat);
          continue;
        }
        logErr("Duplicate linked thread", concat);
      }
      linked.splice(i, 1);
    }

    if (linked.length) {
      linked.sort((a, b) => (a.url < b.url ? 1 : -1));
    }

    return linked;
  }

  export function validThread(thread) {
    if (
      hasValidType(thread, "threads.item", true) &&
      isValidId(thread.id)
    ) {
      thread.record = validRecord(thread.record);

      if (thread.record != null) {
        thread.name = validLenghtStr(thread.name, "name");
        thread.description = validLenghtStr(
          thread.description,
          "description"
        );

        thread.linked = validLinks(thread.linked);
  
        return thread;
      }
    }
    return null;
  }

  export function  validThreads(threads) {
    if (hasValidType(threads, "threads", true)) {
      var ids = [];

      threads = threads.slice(0, itmLimits("threads")[1]);

      for (var i = 0; i < threads.length; i++) {
        threads[i] = validThread(threads[i]);

        if (threads[i] != null) {
          if (!ids.includes(threads[i].id)) {
            ids.push(threads[i].id);
            continue;
          }
          logErr("Duplicate thread id", threads[i].id);
        }
        threads.splice(i, 1);
      }

      if (threads.length) {
        return threads;
      }
    }
    logErr("No valid thread");
    return [];
  }

  export function validAuthor(author) {
    if (
      hasValidType(author, "author", true) &&
      isValidUrl(author.url)
    ) {
      author.handle = validLenghtStr(author.handle, "handle");
      if (author.handle) {
        author.about = validLenghtStr(author.about, "about");
        return author;
      }
    }
    return null;
  }
  export function  isValidAppUrl(url) {
    if (isValidUrl(url) && url == appUrl) {
      return true;
    }
    logErr("Invalid app url");
    return false;
  }
  export function  validAppUrl(url) {
    if (!isValidAppUrl(url)) {
      url = appUrl;
    }
    return url;
  }

  export function validData(data) {
    if (hasValidType(data, "data", true)) {
      data.nexus = validAppUrl(data.url);
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

