import {
  isEmpty,
  isNonEmptyStr,
  seemsLikeValidDate,
} from "../libr/Jack/Trades/Check.js";
import { isValidHttpUrl } from "../libr/Jack/Trades/Web.js";
import { charCut } from "../libr/Jack/Trades/Help.js";

import {
  charMinMax,
  itemsMinMax,
  appUrl,
  supportedMediaTypes,
  timestampPattern,
  idPattern,
  typesMap,
} from "./NxConstants.js";

class Stamper {
  #logs;
  constructor() {
    this.#logs = [];
  }

  #logErr(msg, detail = null) {
    var entry = { msg: msg };
    if (isNonEmptyStr(detail)) {
      entry["detail"] = detail;
    }
    this.#logs.push(entry);
  }

  resetLogs() {
    this.#logs = [];
  }

  getLogs() {
    return this.#logs;
  }

  charLimits(catg) {
    if (charMinMax.hasOwnProperty(catg)) {
      return charMinMax[catg];
    }
    this.#logErr("Unknown characters limits category", catg);
    return false;
  }

  itmLimits(catg) {
    if (itemsMinMax.hasOwnProperty(catg)) {
      return itemsMinMax[catg];
    }
    this.#logErr("Unknown items limits category", catg);
    return false;
  }

  isValidMediaType(mediaType) {
    if (
      this.hasValidType(mediaType, "type", true) &&
      supportedMediaTypes.includes(mediaType)
    ) {
      return true;
    }

    this.#logErr("Invalid media type", type);
    return false;
  }

  extendString(str, catg) {
    var limits = this.charLimits(catg);
    if (limits !== false) {
      var diff = limits[0] - str.length;
      if (diff > 0) {
        var placeholder = "-";
        str = placeholder.repeat(diff) + str;
      }
      return str;
    }
    this.#logErr("Unable to extend string", catg);
    return null;
  }

  validLenghtStr(str, catg) {
    if (!this.hasValidType(str, catg, true)) {
      str = "";
    }
    if (!this.strHasValidMinLength(str, catg)) {
      str = this.extendString(str, catg);
    } else if (!this.strHasValidMaxLength(str, catg)) {
      str = this.cutString(str, catg);
    }
    return str;
  }

  hasValidType(item, field, nonEmpty = true) {
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
        this.#logErr("Field is empty", field);
      } else {
        this.#logErr("Invalid field type", field);
      }
    } else {
      this.#logErr("Unknown field", field);
    }

    return false;
  }

  validMedia(mediaObj) {
    if (
      this.hasValidType(mediaObj, "media", true) &&
      this.isValidUrl(mediaObj.url) &&
      this.isValidMediaType(mediaObj.type)
    ) {
      mediaObj.caption = this.validLenghtStr(mediaObj.caption, "caption");
      return mediaObj;
    }
    return { url: "", type: "", caption: "" };
  }

  isValidTimestamp(timestamp, strict = false) {
    if (
      this.hasValidType(timestamp, "timestamp", true) &&
      (timestamp.match(timestampPattern) ||
        (!strict && seemsLikeValidDate(timestamp)))
    ) {
      return true;
    }
    this.#logErr("Invalid timestamp", timestamp);
    return false;
  }

  validRecord(record) {
    if (
      this.hasValidType(record, "record", true) &&
      this.isValidTimestamp(record.timestamp) &&
      this.hasValidType(record.main, "main", true)
    ) {
      record.main = this.validLenghtStr(record.main, "main");

      if (record.main) {
        record.aside = this.validLenghtStr(record.aside, "aside");
        record.media = this.validMedia(record.media);
        return record;
      }
    }

    return null;
  }

  cutString(item, catg) {
    var limits = this.charLimits(catg);
    if (limits !== false) {
      return charCut(item, limits[1]);
    }
    this.#logErr("Unable to cut string", catg);
    return "";
  }

  strHasValidMaxLength(item, catg) {
    var limits = this.charLimits(catg);
    if (limits !== false) {
      if (item.length <= limits[1]) {
        return true;
      }
      this.#logErr("Invalid max length", catg);
    }
    return false;
  }
  strHasValidMinLength(item, catg) {
    var limits = this.charLimits(catg);
    if (limits !== false) {
      if (item.length >= limits[0]) {
        return true;
      }
      this.#logErr("Invalid min length", catg);
    }
    return false;
  }

  hasValidLength(item, catg) {
    var limits = this.charLimits(catg);
    if (limits !== false) {
      if (item.length >= limits[0] && item.length <= limits[1]) {
        return true;
      }
      this.#logErr("Invalid length", catg);
    }
    return false;
  }

  isValidId(id) {
    if (this.hasValidType(id, "id", true) && id.match(idPattern)) {
      return true;
    }
    this.#logErr("Invalid thread id", id);
    return false;
  }

  isValidUrl(url) {
    if (isValidHttpUrl(url)) {
      return true;
    }
    this.#logErr("Invalid url", url);
    return false;
  }

  isValidLinkItm(link) {
    if (
      this.hasValidType(link, "linked.item", true) &&
      this.isValidUrl(link.url) &&
      this.isValidId(link.id)
    ) {
      return true;
    }
    this.#logErr("Invalid linked thread");
    return false;
  }

  validLinks(linked) {
    linked = linked.slice(0, this.itmLimits("linked")[1]);

    var done = [];
    for (var i = 0; i < linked.length; i++) {
      if (this.isValidLinkItm(linked[i])) {
        var concat = linked[i].url + " " + linked[i].id;

        if (!done.includes(concat)) {
          done.push(concat);
          continue;
        }
        this.#logErr("Duplicate linked thread", concat);
      }
      linked.splice(i, 1);
    }

    if (linked.length) {
      linked.sort((a, b) => (a.url < b.url ? 1 : -1));
    }

    return linked;
  }

  validThread(thread) {
    if (
      this.hasValidType(thread, "threads.item", true) &&
      this.isValidId(thread.id)
    ) {
      thread.record = this.validRecord(thread.record);

      if (thread.record != null) {
        thread.name = this.validLenghtStr(thread.name, "name");
        thread.description = this.validLenghtStr(
          thread.description,
          "description"
        );
        thread.linked = this.validLinks(thread.linked);

        return thread;
      }
    }
    return null;
  }

  validThreads(threads) {
    if (this.hasValidType(threads, "threads", true)) {
      var ids = [];

      threads = threads.slice(0, this.itmLimits("threads")[1]);

      for (var i = 0; i < threads.length; i++) {
        threads[i] = this.validThread(threads[i]);

        if (threads[i] != null) {
          if (!ids.includes(threads[i].id)) {
            ids.push(threads[i].id);
            continue;
          }
          this.#logErr("Duplicate thread id", threads[i].id);
        }
        threads.splice(i, 1);
      }

      if (threads.length) {
        return threads;
      }
    }
    this.#logErr("No valid thread");
    return [];
  }

  validAuthor(author) {
    if (
      this.hasValidType(author, "author", true) &&
      this.isValidUrl(author.url)
    ) {
      author.handle = this.validLenghtStr(author.handle, "handle");
      if (author.handle) {
        author.about = this.validLenghtStr(author.about, "about");
        return author;
      }
    }
    return null;
  }
  isValidAppUrl(url) {
    if (this.isValidUrl(url) && url == appUrl) {
      return true;
    }
    this.#logErr("Invalid app url");
    return false;
  }
  validAppUrl(url) {
    if (!this.isValidAppUrl(url)) {
      url = appUrl;
    }
    return url;
  }

  validMap(data) {
    if (this.hasValidType(data, "data", true)) {
      data.url = this.validAppUrl(data.url);
      data.author = this.validAuthor(data.author);
      if (data.author) {
        data.threads = this.validThreads(data.threads);

        if (data.threads.length) {
          return data;
        }
      }
    }
    return null;
  }
}

export var NxStamper = new Stamper();
