'use strict';

import chaiString from 'chai-string'
chai.use(chaiString)

// tests
import Utils from './Utils.js'
import compareVersion from './compareVersion.js'
import paramToString from './paramToString.js'
import getUrl from './getUrl.js'
import resolveFetch from './resolveFetch.js'
import getGeohash from './getGeohash.js'
