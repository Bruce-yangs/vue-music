webpackJsonp([1],{"9B0S":function(t,i,n){var e=n("qD6m");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("MO7y")("21ae2287",e,!0)},"Aet+":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"music-list"},[n("div",{staticClass:"back",on:{click:t.back}},[n("i",{staticClass:"icon-back"})]),t._v(" "),n("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),n("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[n("div",{staticClass:"play-wrapper"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"playBtn",staticClass:"play",on:{click:t.random}},[n("i",{staticClass:"icon-play"}),t._v(" "),n("span",{staticClass:"text"},[t._v("随机播放全部")])])]),t._v(" "),n("div",{ref:"filter",staticClass:"filter"})]),t._v(" "),n("div",{ref:"layer",staticClass:"bg-layer"}),t._v(" "),n("scroll",{ref:"list",staticClass:"list",attrs:{"probe-type":t.probeType,"listen-scroll":t.listenScroll,data:t.songs},on:{scroll:t.scroll}},[n("div",{staticClass:"song-list-wrapper"},[n("song-list",{attrs:{rank:t.rank,songs:t.songs},on:{select:t.selectItem}})],1),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[n("loading")],1)])],1)},s=[],a={render:e,staticRenderFns:s};i.a=a},GDEV:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{title:t.title,"bg-image":t.bgImage,songs:t.songs}})],1)},s=[],a={render:e,staticRenderFns:s};i.a=a},L9jZ:function(t,i,n){i=t.exports=n("xCkK")(!0),i.push([t.i,".music-list{position:fixed;z-index:100;top:0;left:0;right:0;bottom:0;background:#222}.music-list .back{position:absolute;top:0;left:6px;z-index:50}.music-list .back .icon-back{display:block;padding:10px;font-size:22px;color:#ffcd32}.music-list .title{position:absolute;top:0;left:10%;z-index:40;width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;line-height:40px;font-size:18px;color:#fff}.music-list .bg-image{position:relative;width:100%;height:0;padding-top:70%;-webkit-transform-origin:top;transform-origin:top;background-size:cover}.music-list .bg-image .play-wrapper{position:absolute;bottom:20px;z-index:50;width:100%}.music-list .bg-image .play-wrapper .play{-webkit-box-sizing:border-box;box-sizing:border-box;width:135px;padding:7px 0;margin:0 auto;text-align:center;border:1px solid #ffcd32;color:#ffcd32;border-radius:100px;font-size:0}.music-list .bg-image .play-wrapper .play .icon-play{display:inline-block;vertical-align:middle;margin-right:6px;font-size:16px}.music-list .bg-image .play-wrapper .play .text{display:inline-block;vertical-align:middle;font-size:12px}.music-list .bg-image .filter{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(7,17,27,.4)}.music-list .bg-layer{position:relative;height:100%;background:#222}.music-list .list{position:fixed;top:0;bottom:0;width:100%;background:#222}.music-list .list .song-list-wrapper{padding:20px 30px}.music-list .list .loading-container{position:absolute;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["F:/2017学习集合/vue-music/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,YACE,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,OAAQ,AACR,QAAS,AACT,SAAU,AACV,eAAiB,CAClB,AACD,kBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,UAAY,CACf,AACD,6BACM,cAAe,AACf,aAAc,AACd,eAAgB,AAChB,aAAe,CACpB,AACD,mBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAW,AACX,uBAAwB,AACxB,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACf,AACD,sBACI,kBAAmB,AACnB,WAAY,AACZ,SAAU,AAEV,gBAAiB,AACjB,6BAA8B,AACtB,qBAAsB,AAC9B,qBAAuB,CAC1B,AACD,oCACM,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,UAAY,CACjB,AACD,0CACQ,8BAA+B,AACvB,sBAAuB,AAC/B,YAAa,AACb,cAAe,AACf,cAAe,AACf,kBAAmB,AACnB,yBAA0B,AAC1B,cAAe,AACf,oBAAqB,AACrB,WAAa,CACpB,AACD,qDACU,qBAAsB,AACtB,sBAAuB,AACvB,iBAAkB,AAClB,cAAgB,CACzB,AACD,gDACU,qBAAsB,AACtB,sBAAuB,AACvB,cAAgB,CACzB,AACD,8BACM,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,2BAAiC,CACtC,AACD,sBACI,kBAAmB,AACnB,YAAa,AACb,eAAiB,CACpB,AACD,kBACI,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,eAAiB,CACpB,AACD,qCACM,iBAAmB,CACxB,AACD,qCACM,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACzC",file:"music-list.vue",sourcesContent:["\n.music-list {\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #222;\n}\n.music-list .back {\n    position: absolute;\n    top: 0;\n    left: 6px;\n    z-index: 50;\n}\n.music-list .back .icon-back {\n      display: block;\n      padding: 10px;\n      font-size: 22px;\n      color: #ffcd32;\n}\n.music-list .title {\n    position: absolute;\n    top: 0;\n    left: 10%;\n    z-index: 40;\n    width: 80%;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    text-align: center;\n    line-height: 40px;\n    font-size: 18px;\n    color: #fff;\n}\n.music-list .bg-image {\n    position: relative;\n    width: 100%;\n    height: 0;\n    /*z-index: 1;*/\n    padding-top: 70%;\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    background-size: cover;\n}\n.music-list .bg-image .play-wrapper {\n      position: absolute;\n      bottom: 20px;\n      z-index: 50;\n      width: 100%;\n}\n.music-list .bg-image .play-wrapper .play {\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        width: 135px;\n        padding: 7px 0;\n        margin: 0 auto;\n        text-align: center;\n        border: 1px solid #ffcd32;\n        color: #ffcd32;\n        border-radius: 100px;\n        font-size: 0;\n}\n.music-list .bg-image .play-wrapper .play .icon-play {\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 6px;\n          font-size: 16px;\n}\n.music-list .bg-image .play-wrapper .play .text {\n          display: inline-block;\n          vertical-align: middle;\n          font-size: 12px;\n}\n.music-list .bg-image .filter {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(7, 17, 27, 0.4);\n}\n.music-list .bg-layer {\n    position: relative;\n    height: 100%;\n    background: #222;\n}\n.music-list .list {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    background: #222;\n}\n.music-list .list .song-list-wrapper {\n      padding: 20px 30px;\n}\n.music-list .list .loading-container {\n      position: absolute;\n      width: 100%;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n}\n"],sourceRoot:""}])},"Sgn/":function(t,i,n){"use strict";function e(){var t=o()({},{channel:"singer",page:"list",key:"all_all_all",pagesize:100,pagenum:1,g_tk:5381,loginUin:0,hostUin:0,format:"jsonp",inCharset:"utf8",outCharset:"utf-8",notice:0,platform:"yqq",needNewCode:0});return Object(A.a)("https://c.y.qq.com/v8/fcg-bin/v8.fcg",t,l.c)}function s(t){var i=o()({},{g_tk:5381,loginUin:0,hostUin:0,format:A.a,inCharset:"utf8",outCharset:"utf-8",notice:0,platform:"yqq",needNewCode:0,singermid:t,order:"listen",begin:0,num:200,songstatus:1});return Object(A.a)("https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",i,l.c)}i.b=e,i.a=s;var a=n("mOK0"),o=n.n(a),A=n("Gak4"),l=n("T452")},hMZe:function(t,i,n){"use strict";var e=n("B2YR"),s=n.n(e),a=n("ZV4u"),o=n("qwAB"),A=n("y/jF"),l=n("3Q4o"),r=n("F4+m"),c=n("E661"),g=Object(l.c)("transform"),p=Object(l.c)("backdrop-filter");i.a={mixins:[r.b],data:function(){return{scrollY:0}},props:{bgImage:{type:String,default:""},songs:{type:Array,default:[]},title:{type:String,default:""},rank:{type:Boolean,default:!1}},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},components:{SongList:a.a,Scroll:o.a,Loading:A.a},created:function(){this.probeType=3,this.listenScroll=!0},mounted:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTranslateY=40-this.imageHeight,this.$refs.list.$el.style.top=this.imageHeight+"px"},methods:s()({handlePlaylist:function(t){var i=t.length>0?"60px":"";this.$refs.list.$el.style.bottom=i,this.$refs.list.refresh()},scroll:function(t){this.scrollY=t.y},back:function(){this.$router.back()},selectItem:function(t,i){console.log(i),this.selectPlay({list:this.songs,index:i})},random:function(){this.randomPlay({list:this.songs})}},Object(c.b)(["selectPlay","randomPlay"])),watch:{scrollY:function(t){var i=Math.max(this.minTranslateY,t),n=0,e=1,s=0;this.$refs.layer.style[g]="translate3d(0,"+i+"px,0)";var a=Math.abs(t/this.imageHeight);t>0?(e=1+a,n=10):s=Math.min(20*a,20),this.$refs.filter.style[p]="blur("+s+"px)",t<this.minTranslateY?(n=10,this.$refs.bgImage.style.paddingTop=0,this.$refs.bgImage.style.height="40px",this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height=0,this.$refs.playBtn.style.display=""),this.$refs.bgImage.style.zIndex=n,this.$refs.bgImage.style[g]="scale("+e+")"}}}},kvay:function(t,i,n){"use strict";function e(t){n("zFsR")}var s=n("hMZe"),a=n("Aet+"),o=n("Cut0"),A=e,l=o(s.a,a.a,!1,A,null,null);i.a=l.exports},lEJ1:function(t,i,n){"use strict";function e(t){n("9B0S")}Object.defineProperty(i,"__esModule",{value:!0});var s=n("szYa"),a=n("GDEV"),o=n("Cut0"),A=e,l=o(s.a,a.a,!1,A,null,null);i.default=l.exports},qD6m:function(t,i,n){i=t.exports=n("xCkK")(!0),i.push([t.i,".slide-enter-active,.slide-leave-active{-webkit-transition:all .3s;transition:all .3s}.slide-enter,.slide-leave-to{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}","",{version:3,sources:["F:/2017学习集合/vue-music/src/components/singer-detail/singer-detail.vue"],names:[],mappings:"AACA,wCACE,2BAA6B,AAC7B,kBAAqB,CACtB,AACD,6BACE,wCAA2C,AACnC,+BAAmC,CAC5C",file:"singer-detail.vue",sourcesContent:["\n.slide-enter-active, .slide-leave-active {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.slide-enter, .slide-leave-to {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n"],sourceRoot:""}])},szYa:function(t,i,n){"use strict";var e=n("B2YR"),s=n.n(e),a=n("E661"),o=n("Sgn/"),A=n("T452"),l=n("PvFA"),r=n("kvay");i.a={data:function(){return{songs:[]}},computed:s()({title:function(){return this.singer.name},bgImage:function(){return this.singer.avatar}},Object(a.c)(["singer"])),created:function(){this._getDetail()},methods:{_getDetail:function(){var t=this;if(!this.singer.id)return void this.$router.push("/singer");Object(o.a)(this.singer.id).then(function(i){i.code===A.a&&(t.songs=t._normalizeSongs(i.data.list))})},_normalizeSongs:function(t){var i=[];return t.forEach(function(t){var n=t.musicData;n.songid&&n.albummid&&i.push(Object(l.a)(n))}),i}},components:{MusicList:r.a}}},zFsR:function(t,i,n){var e=n("L9jZ");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("MO7y")("664d8c1c",e,!0)}});
//# sourceMappingURL=1.3d3ca9364f3c6c6d0263.js.map