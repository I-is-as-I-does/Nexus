import { charMinMax, idPattern, supportedMediaTypes, timestampPattern, urlPattern } from "./NxSpecs.js";

export const NxSchema = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "type": "object",
    "properties": {
      "nexus": {
        "type": "string",
        "pattern": urlPattern
      },
      "author": {
        "type": "object",
        "required": ["handle", "url"],
        "properties": {
          "handle": {
            "type": "string",
            "maxLength": charMinMax.handle[1]
          },
          "about": {
            "type": "string",
            "maxLength": charMinMax.about[1]
          },
          "url": {
            "type": "string",
            "pattern": urlPattern
          }
        },
        "additionalProperties": false
      },
      "threads": {
        "type": "array",
        "uniqueItems": true,
        "additionalItems": true,
        "items": {
              "type": "object",
              "required": ["id", "name", "record"],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": idPattern
                },
                "name": {
                  "type": "string",
                  "minLength": charMinMax.name[0],
                  "maxLength": charMinMax.name[1]
                },
                "description": {
                  "type": "string",
                  "maxLength": charMinMax.description[1]
                },
                "record": {
                  "type": "object",
                  "required": ["timestamp", "main"],
                  "properties": {
                    "timestamp": {
                      "type": "string",
                      "pattern": timestampPattern
                    },
                    "main": {
                      "type": "string",
                      "minLength": charMinMax.main[0],
                      "maxLength": charMinMax.main[1]
                    },
                    "aside": {
                      "type": "string",
                      "maxLength": charMinMax.aside[1]
                    },
                    "media": {
                      "type": "object",
                      "required": ["url", "type"],
                      "properties": {
                        "url": {
                          "type": "string",
                          "pattern": urlPattern
                        },
                        "type": {
                          "type": "string",
                          "enum": supportedMediaTypes
                        },
                        "caption": {
                          "type": "string",
                          "maxLength": charMinMax.caption[1]
                        }
                      },
                      "additionalProperties": false
                    }
                  },
                  "additionalProperties": false
                },
                "linked": {
                  "type": "array",
                  "uniqueItems": true,
                  "additionalItems": true,
                  "items": {
       
                        "type": "object",
                        "required": ["url", "id"],
                        "properties": {
                          "url": {
                            "type": "string",
                            "pattern": urlPattern
                          },
                          "id": {
                            "type": "string",
                            "pattern": idPattern
                          }
                        },
                        "additionalProperties": false
             
                  }
                }
              },
              "additionalProperties": false
     
        }
      }
    },
    "required": [
      "nexus",
      "author",
      "threads"
    ],
    "additionalProperties": false
  };  