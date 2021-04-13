import Vue from 'vue';
import Request from '/common/request.js';
import autoPagination from '/common/utils/autoPagination.js';
import uniMethosUtils from "/common/utils/uniMethosUtils.js";
import utils from '/common/utils/utils.js'

const zhttp=new Request();
const zuniMethosUtils=new UniMethosUtils();
const zutils=new utils();


Vue.prototype.$http=zhttp.Request;
Vue.prototype.$https=zhttp;
Vue.prototype.$autoPage=autoPagination;
Vue.prototype.$uniMethosUtils=zuniMethosUtils;
Vue.prototype.$utils=zutils;
