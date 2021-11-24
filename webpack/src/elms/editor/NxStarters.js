import { randomInt, randomString } from "../../libr/Jack/Help.js";
import { appUrl } from "../../validt/NxSpecs.js";


export function newData() {

    var randomId = randomString(10);
       return { "nexus": appUrl,
        "author": {
          "handle": "Anonymous-"+randomInt(100,999),
          "about": "",
          "url": "https://"
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
      "name": randomId,
      "description": "...",
      "record": {
        "timestamp": new Date().toISOString().substr(0,16),
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
  