webpackJsonp([2],{"4yUK":function(t,i,n){"use strict";var e=n("B2YR"),s=n.n(e),a=n("kvay"),o=n("E661"),A=n("m40h"),l=n("T452"),r=n("PvFA");i.a={data:function(){return{songs:[]}},computed:s()({title:function(){return this.disc.dissname},bgImage:function(){return this.disc.imgurl}},Object(o.c)(["disc"])),created:function(){this._getSongList()},methods:{_getSongList:function(){var t=this;if(!this.disc.dissid)return void this.$router.push("/recommend");Object(A.c)(this.disc.dissid).then(function(i){i.code===l.a&&(t.songs=t._normalizeSongs(i.cdlist[0].songlist))})},_normalizeSongs:function(t){var i=[];return t.forEach(function(t){t.songid&&t.albumid&&i.push(Object(r.a)(t))}),i}},components:{MusicList:a.a}}},"6dm6":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{title:t.title,"bg-image":t.bgImage,songs:t.songs}})],1)},s=[],a={render:e,staticRenderFns:s};i.a=a},"96K7":function(t,i,n){var e=n("bGgJ");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("MO7y")("6c8f8aa8",e,!0)},"Aet+":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"music-list"},[n("div",{staticClass:"back",on:{click:t.back}},[n("i",{staticClass:"icon-back"})]),t._v(" "),n("h1",{staticClass:"title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),n("div",{ref:"bgImage",staticClass:"bg-image",style:t.bgStyle},[n("div",{staticClass:"play-wrapper"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"playBtn",staticClass:"play",on:{click:t.random}},[n("i",{staticClass:"icon-play"}),t._v(" "),n("span",{staticClass:"text"},[t._v("随机播放全部")])])]),t._v(" "),n("div",{ref:"filter",staticClass:"filter"})]),t._v(" "),n("div",{ref:"layer",staticClass:"bg-layer"}),t._v(" "),n("scroll",{ref:"list",staticClass:"list",attrs:{"probe-type":t.probeType,"listen-scroll":t.listenScroll,data:t.songs},on:{scroll:t.scroll}},[n("div",{staticClass:"song-list-wrapper"},[n("song-list",{attrs:{rank:t.rank,songs:t.songs},on:{select:t.selectItem}})],1),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"},[n("loading")],1)])],1)},s=[],a={render:e,staticRenderFns:s};i.a=a},L9jZ:function(t,i,n){i=t.exports=n("xCkK")(!0),i.push([t.i,".music-list{position:fixed;z-index:100;top:0;left:0;right:0;bottom:0;background:#222}.music-list .back{position:absolute;top:0;left:6px;z-index:50}.music-list .back .icon-back{display:block;padding:10px;font-size:22px;color:#ffcd32}.music-list .title{position:absolute;top:0;left:10%;z-index:40;width:80%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;text-align:center;line-height:40px;font-size:18px;color:#fff}.music-list .bg-image{position:relative;width:100%;height:0;padding-top:70%;-webkit-transform-origin:top;transform-origin:top;background-size:cover}.music-list .bg-image .play-wrapper{position:absolute;bottom:20px;z-index:50;width:100%}.music-list .bg-image .play-wrapper .play{-webkit-box-sizing:border-box;box-sizing:border-box;width:135px;padding:7px 0;margin:0 auto;text-align:center;border:1px solid #ffcd32;color:#ffcd32;border-radius:100px;font-size:0}.music-list .bg-image .play-wrapper .play .icon-play{display:inline-block;vertical-align:middle;margin-right:6px;font-size:16px}.music-list .bg-image .play-wrapper .play .text{display:inline-block;vertical-align:middle;font-size:12px}.music-list .bg-image .filter{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(7,17,27,.4)}.music-list .bg-layer{position:relative;height:100%;background:#222}.music-list .list{position:fixed;top:0;bottom:0;width:100%;background:#222}.music-list .list .song-list-wrapper{padding:20px 30px}.music-list .list .loading-container{position:absolute;width:100%;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}","",{version:3,sources:["F:/2017学习集合/vue-music/src/components/music-list/music-list.vue"],names:[],mappings:"AACA,YACE,eAAgB,AAChB,YAAa,AACb,MAAO,AACP,OAAQ,AACR,QAAS,AACT,SAAU,AACV,eAAiB,CAClB,AACD,kBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,UAAY,CACf,AACD,6BACM,cAAe,AACf,aAAc,AACd,eAAgB,AAChB,aAAe,CACpB,AACD,mBACI,kBAAmB,AACnB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,UAAW,AACX,uBAAwB,AACxB,gBAAiB,AACjB,mBAAoB,AACpB,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACf,AACD,sBACI,kBAAmB,AACnB,WAAY,AACZ,SAAU,AAEV,gBAAiB,AACjB,6BAA8B,AACtB,qBAAsB,AAC9B,qBAAuB,CAC1B,AACD,oCACM,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,UAAY,CACjB,AACD,0CACQ,8BAA+B,AACvB,sBAAuB,AAC/B,YAAa,AACb,cAAe,AACf,cAAe,AACf,kBAAmB,AACnB,yBAA0B,AAC1B,cAAe,AACf,oBAAqB,AACrB,WAAa,CACpB,AACD,qDACU,qBAAsB,AACtB,sBAAuB,AACvB,iBAAkB,AAClB,cAAgB,CACzB,AACD,gDACU,qBAAsB,AACtB,sBAAuB,AACvB,cAAgB,CACzB,AACD,8BACM,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,2BAAiC,CACtC,AACD,sBACI,kBAAmB,AACnB,YAAa,AACb,eAAiB,CACpB,AACD,kBACI,eAAgB,AAChB,MAAO,AACP,SAAU,AACV,WAAY,AACZ,eAAiB,CACpB,AACD,qCACM,iBAAmB,CACxB,AACD,qCACM,kBAAmB,AACnB,WAAY,AACZ,QAAS,AACT,mCAAoC,AAC5B,0BAA4B,CACzC",file:"music-list.vue",sourcesContent:["\n.music-list {\n  position: fixed;\n  z-index: 100;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: #222;\n}\n.music-list .back {\n    position: absolute;\n    top: 0;\n    left: 6px;\n    z-index: 50;\n}\n.music-list .back .icon-back {\n      display: block;\n      padding: 10px;\n      font-size: 22px;\n      color: #ffcd32;\n}\n.music-list .title {\n    position: absolute;\n    top: 0;\n    left: 10%;\n    z-index: 40;\n    width: 80%;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    text-align: center;\n    line-height: 40px;\n    font-size: 18px;\n    color: #fff;\n}\n.music-list .bg-image {\n    position: relative;\n    width: 100%;\n    height: 0;\n    /*z-index: 1;*/\n    padding-top: 70%;\n    -webkit-transform-origin: top;\n            transform-origin: top;\n    background-size: cover;\n}\n.music-list .bg-image .play-wrapper {\n      position: absolute;\n      bottom: 20px;\n      z-index: 50;\n      width: 100%;\n}\n.music-list .bg-image .play-wrapper .play {\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        width: 135px;\n        padding: 7px 0;\n        margin: 0 auto;\n        text-align: center;\n        border: 1px solid #ffcd32;\n        color: #ffcd32;\n        border-radius: 100px;\n        font-size: 0;\n}\n.music-list .bg-image .play-wrapper .play .icon-play {\n          display: inline-block;\n          vertical-align: middle;\n          margin-right: 6px;\n          font-size: 16px;\n}\n.music-list .bg-image .play-wrapper .play .text {\n          display: inline-block;\n          vertical-align: middle;\n          font-size: 12px;\n}\n.music-list .bg-image .filter {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: rgba(7, 17, 27, 0.4);\n}\n.music-list .bg-layer {\n    position: relative;\n    height: 100%;\n    background: #222;\n}\n.music-list .list {\n    position: fixed;\n    top: 0;\n    bottom: 0;\n    width: 100%;\n    background: #222;\n}\n.music-list .list .song-list-wrapper {\n      padding: 20px 30px;\n}\n.music-list .list .loading-container {\n      position: absolute;\n      width: 100%;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n}\n"],sourceRoot:""}])},NSSj:function(t,i,n){"use strict";function e(t){n("96K7")}Object.defineProperty(i,"__esModule",{value:!0});var s=n("4yUK"),a=n("6dm6"),o=n("Cut0"),A=e,l=o(s.a,a.a,!1,A,"data-v-ec111780",null);i.default=l.exports},bGgJ:function(t,i,n){i=t.exports=n("xCkK")(!0),i.push([t.i,".slide-enter-active[data-v-ec111780],.slide-leave-active[data-v-ec111780]{-webkit-transition:all .3s;transition:all .3s}.slide-enter[data-v-ec111780],.slide-leave-to[data-v-ec111780]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}","",{version:3,sources:["F:/2017学习集合/vue-music/src/components/disc/disc.vue"],names:[],mappings:"AACA,0EACE,2BAA6B,AAC7B,kBAAqB,CACtB,AACD,+DACE,wCAA2C,AACnC,+BAAmC,CAC5C",file:"disc.vue",sourcesContent:["\n.slide-enter-active[data-v-ec111780], .slide-leave-active[data-v-ec111780] {\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}\n.slide-enter[data-v-ec111780], .slide-leave-to[data-v-ec111780] {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n"],sourceRoot:""}])},hMZe:function(t,i,n){"use strict";var e=n("B2YR"),s=n.n(e),a=n("ZV4u"),o=n("qwAB"),A=n("y/jF"),l=n("3Q4o"),r=n("F4+m"),c=n("E661"),d=Object(l.c)("transform"),p=Object(l.c)("backdrop-filter");i.a={mixins:[r.b],data:function(){return{scrollY:0}},props:{bgImage:{type:String,default:""},songs:{type:Array,default:[]},title:{type:String,default:""},rank:{type:Boolean,default:!1}},computed:{bgStyle:function(){return"background-image:url("+this.bgImage+")"}},components:{SongList:a.a,Scroll:o.a,Loading:A.a},created:function(){this.probeType=3,this.listenScroll=!0},mounted:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTranslateY=40-this.imageHeight,this.$refs.list.$el.style.top=this.imageHeight+"px"},methods:s()({handlePlaylist:function(t){var i=t.length>0?"60px":"";this.$refs.list.$el.style.bottom=i,this.$refs.list.refresh()},scroll:function(t){this.scrollY=t.y},back:function(){this.$router.back()},selectItem:function(t,i){console.log(i),this.selectPlay({list:this.songs,index:i})},random:function(){this.randomPlay({list:this.songs})}},Object(c.b)(["selectPlay","randomPlay"])),watch:{scrollY:function(t){var i=Math.max(this.minTranslateY,t),n=0,e=1,s=0;this.$refs.layer.style[d]="translate3d(0,"+i+"px,0)";var a=Math.abs(t/this.imageHeight);t>0?(e=1+a,n=10):s=Math.min(20*a,20),this.$refs.filter.style[p]="blur("+s+"px)",t<this.minTranslateY?(n=10,this.$refs.bgImage.style.paddingTop=0,this.$refs.bgImage.style.height="40px",this.$refs.playBtn.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height=0,this.$refs.playBtn.style.display=""),this.$refs.bgImage.style.zIndex=n,this.$refs.bgImage.style[d]="scale("+e+")"}}}},kvay:function(t,i,n){"use strict";function e(t){n("zFsR")}var s=n("hMZe"),a=n("Aet+"),o=n("Cut0"),A=e,l=o(s.a,a.a,!1,A,null,null);i.a=l.exports},m40h:function(t,i,n){"use strict";function e(){var t=r()({},d.b,{uin:0,platform:"h5",needNewCode:1});return Object(c.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",t,d.c)}function s(){var t=r()({},d.b,{hostUin:0,platform:"yqq",needNewCode:0,sortId:5,sin:0,ein:29,categoryId:1e7,rnd:Math.random(),format:"json"});return g.a.get("/api/getDiscList",{params:t}).then(function(t){return A.a.resolve(t.data)})}function a(t){var i=r()({},d.b,{disstid:t,type:1,json:1,utf8:1,onlysong:0,platform:"yqq",hostUin:0,needNewCode:0});return g.a.get("/api/getSongList",{params:i}).then(function(t){return A.a.resolve(t.data)})}i.b=e,i.a=s,i.c=a;var o=n("Hcuw"),A=n.n(o),l=n("mOK0"),r=n.n(l),c=n("Gak4"),d=n("T452"),p=n("GYbZ"),g=n.n(p)},zFsR:function(t,i,n){var e=n("L9jZ");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("MO7y")("664d8c1c",e,!0)}});
//# sourceMappingURL=2.9d41d6b105a537bb2d13.js.map