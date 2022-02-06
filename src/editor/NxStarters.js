/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { randomInt, randomString } from "@i-is-as-i-does/jack-js/src/modules/Help.js";
import { appUrl } from "../core/validt/NxSpecs.js";


export function newData() {

    var randomId = randomString(10);
       return { "nexus": appUrl,
        "author": {
          "handle": "Anonymous-"+randomInt(100,999),
          "about": "",
          "url": "http://"
        },
        "threads": [
            newThread(randomId)
        ],
        "index":[randomId]
};
}

export function newThread(randomId){
    return {
      "id": randomId,
      "title": randomId,
      "description": "...",
      "content": {
        "timestamp": new Date().toISOString().substring(0,16),
        "main": "...",
        "aside": "",
        "media": {
          "url": "",
          "type": "",
          "caption": ""
        }
      },
      "linked": [
      ]
    };
  }
  