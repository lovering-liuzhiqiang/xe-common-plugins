// // 全局
// export class commonMapLink {
//     constructor() {
//         this.maplinkData = {
//             '/ac/': "http://paas-web-test.xianyiscm.com/"
//         };
//     }
//     _splitUrl(url) {
//         const reg = /\/\w+\//g;
//         return url.match(reg)[0];
//     }
//     scaleLink(url) {
//         var httplink = this._splitUrl(url);
//         return this.maplinkData[httplink] + url;
//     }
// }
