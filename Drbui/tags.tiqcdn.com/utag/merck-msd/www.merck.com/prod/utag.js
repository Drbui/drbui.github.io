//tealium universal tag - utag.loader ut4.008.201407011855, Copyright 2014 Tealium.com Inc. All Rights Reserved. 
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_merck-msd_www.merck.com=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/") === -1) {ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/merck-msd/www.merck.com/prod/';}}})();}catch(e){};try{
var base_url = "//tags.tiqcdn.com/utag/merck-msd/msd/prod";
function ul(e,t,a){t=document;a=t.createElement("script");a.language="javascript";a.type="text/javascript";a.src=e;t.getElementsByTagName("head")[0].appendChild(a)}
ul(base_url+"/utag.js");
utag_condload = true;
__tealium_default_path = base_url;
}catch(e){};
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"merck-msd.www.merck.com",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      ft: 0,
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\./.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d) {
        utag.DB('WQ:' + utag.loader.wq.length);
        c = true;
        try {
          utag.loader.GET()
        } catch (e) {};
        var lq = [];
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load>0&&b.send) {
            c = false;
            utag.send[b.id] = b;
          }
	  if(b.load!=0&&b.load!=4){
	    lq.push(b);
            this.f[b.id] = 0;
	  }
        }
        if (c) {
          d = false;
          for (b in utag.loader.GV(utag.send)) d = true;
          if (c && d) this.LOAD('WAIT_FORCE');
        }
        this.wq = [];
        for (a = 0; a < lq.length; a++) {
          utag.DB('utag.loader.WAIT: loading ' + lq[a].id);
          utag.loader.AS(lq[a])
        }
        if(lq.length==0)utag.handler.INIT();
      },
      AS: function(a, b, c, d) {
        utag.sender[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + utag.cfg.v;
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        if (a.load == 2) {
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
        } else if(a.load==1||a.load==3) {
          if (b.createElement) {
            c = 'utag_merck-msd.www.merck.com_'+a.id;
            if (!b.getElementById(c)) {
              if (a.load == 3) {
                d = b.createElement('iframe');
                d.setAttribute('height', '1');
                d.setAttribute('width', '1');
                d.setAttribute('style', 'display:none');
                d.setAttribute('src', a.src);
 	        d.id = c;
                b.getElementsByTagName('head')[0].appendChild(d)
              } else {
                utag.ut.libloader(a.src,c,utag.loader.cfg[a.id].loc);
              }
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      RD: function(o, a, b, c, d, e, f, g) {
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          if (a[b].name && a[b].name != "") o["meta." + a[b].name.toLowerCase()] = a[b].content.toLowerCase();
        }
        a = location.search.toLowerCase();
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            o["qp." + c[0]] = utag.ut.decode(c[1])
          }
        }
        a = (new Date()).getTime();
        b = utag.loader.RC();
        c = a + parseInt(utag.cfg.session_timeout);
        d = a + (Math.ceil(Math.random() * 1000000));
        if ((b.utag_main && (typeof b.utag_main._st == "undefined" || (typeof b.utag_main._st != "undefined" && parseInt(b.utag_main._st) < a))) || !b.utag_main) {
          if (b.utag_main) {
            b.utag_main._st = c;
            b.utag_main.ses_id = d;
          } else {
            b.utag_main = {
              _st: c,
              ses_id: d
            }
          }
          utag.loader.SC("utag_main", {
            "_st": c,
            "ses_id": d + ";exp-session"
          });
        } else {
          utag.loader.SC("utag_main", {
            "_st": c
          })
        }
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
        o["dom.referrer"] = eval("document." + "referrer");
        o["dom.title"] = "" + document.title;
        o["dom.domain"] = "" + location.hostname;
        o["dom.query_string"] = "" + (location.search).substring(1);
        o["dom.url"] = "" + document.URL;
        o["dom.pathname"] = "" + location.pathname;
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        for (c = 0; c < b.length; c++) {
          if (b[c].match(/^(.*?)=(.*)$/)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
	  e = utag.ut.decode(cv);
          if (typeof ck!="undefined" && (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0)) {
            e = e.split("$");
            g = [];
            j = {};
            for (f = 0; f < e.length; f++) {
              try{
                g = e[f].split(":");
                if (g.length > 2) {
                  g[1] = g.slice(1).join(":");
                }
                v = "";
                if (("" + g[1]).indexOf("~") == 0) {
                  h = g[1].substring(1).split("|");
                  for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                  v = h
                } else v = utag.ut.decode(g[1]);
                j[g[0]] = v;
              }catch(er){};
            }
            o[ck] = {};
            e = (new Date()).getTime();
            for (f in utag.loader.GV(j)) {
              if (j[f] instanceof Array) {
                n = [];
                for (m = 0; m < j[f].length; m++) {
                  if (j[f][m].match(/^(.*);exp-(.*)$/)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                    if (k > e) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                  }
                }
                j[f] = n.join("|");
              } else {
                j[f] = "" + j[f];
                if (j[f].match(/^(.*);exp-(.*)$/)) {
                  k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                  j[f] = (k < e) ? null : (x == 0 ? j[f] : RegExp.$1);
                }
              }
              if (j[f]) o[ck][f] = j[f];
            }
          } else if (utag.cl[ck] || utag.cl['_all_']) {
            o[ck] = e
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        x = "Thu, 31 Dec 2099 00:00:00 GMT";
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = (new Date()).getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push(g + ":" + encodeURIComponent(d[g]))
          };
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        utag.DB('utag.loader.LOAD:' + a);
        if (this.f[a] == 0) {
          utag.DB('utag.loader.LOAD:add sender-' + a);
          this.f[a] = 1;
          if (utag.loader.wq.length > 0) return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0) return
          };
          utag.DB('CLEAR FORCE');
          clearTimeout(utag.loader.ft);
          //utag.DB('utag.handler.INIT');
          utag.handler.INIT()
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if (document.readyState === "complete") setTimeout(c, 1);
          else {
            if(typeof utag.loader.ready_q=="undefined"){
              utag.loader.ready_q=[]; 
              utag.loader.run_ready_q=function(){
                for(var i=0;i<utag.loader.ready_q.length;i++){
                  utag.DB("READY_Q:"+i);
                  try{utag.loader.ready_q[i]()}catch(e){};
                }
              }
            }
            utag.loader.ready_q.push(c);

            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie (reduce performance hit of many utag.DB calls) 
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        try{console.log(a)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]));
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')));
      }
    },
    view: function(a,c) {
      return this.track('view',a,c);
    },
    link: function(a,c) {
      return this.track('link',a,c);
    },
    track: function(a,b,c) {
      for(var i in utag.loader.GV(utag.o)){
        try{utag.o[i].handler.trigger(a,b)}catch(e){};
      }
      if(c)try{c()}catch(e){};
      return true;
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        this.iflag = 1;
        utag.DB('utag.handler.INIT');
        a = utag.loader.q.length;
        if (a > 0) {
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b)
          }
        }
	if(utag.cfg.noview!=true)utag.handler.trigger('view', utag.data);
      },
      test: function() {
        return 1
      },
      trigger: function(a, b, c, d) {
        utag.DB('trigger:'+a);
        b = b || {};
        if (!this.iflag) {
          utag.loader.q.push({
            a: a,
            b: b
          });
          return;
        }
        for (c in utag.loader.GV(this.df)) {
          if (typeof this.df[c] != "function" && typeof b[c] == "undefined") b[c] = this.df[c]
        }
        utag.DB('All Tags EXTENSIONS');
        if(typeof this.extend!="undefined"){
          for (c = 0; c < this.extend.length; c++) {
            try {
              this.extend[c](a, b);
              utag.rpt['ex_' + c] = 0
            } catch (e) {
              utag.rpt['ex_' + c] = 1;
	      utag.ut.error({e:e.message,s:utag.cfg.path+'utag.js',l:c,t:'ge'});
            }
          }
        }
        for (c in utag.loader.GV(utag.send)) {
          if (typeof utag.sender[c] != "undefined") {
            try {
              utag.sender[c].send(a, utag.handler.C(b));
              utag.rpt['s_' + c] = 0
            } catch (e) {
              utag.rpt['s_' + c] = 1
            };
            utag.rpt.ts['s'] = new Date();
            for(var r in utag.loader.GV(utag.cond)){
              if(utag.cond[r])utag.rpt['r_'+r]=1;
            }
            utag.RP(utag.rpt);
          }
        }
        c = this.base.split(",");
        for (d = 0; d < c.length; d++) {
          if (typeof b[c[d]] != "undefined") this.df[c[d]] = b[c[d]]
        };
	for(d in utag.loader.GV(b)){if(d.indexOf('dom.')==0)this.df[d]=b[d]};
        this.o = b;
	
      },
      C: function(a, b, c, d) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if (typeof a[c] != "function") b[c] = a[c]
        }
        return b
      }
    },
    ut:{
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){};
        if (b == ""){b = unescape(a)};
        return b;
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
        c='';for(b in a){c+=b+':'+a[b]+" , "};
        utag.DB(c);
      },
      libloader: function(src, id, h, l, a, b, c) {
        a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;if(id){b.id=id};
        if (typeof h=='function') {
          b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;h()}};
          b.onload=function(){if(!b.hFlag){b.hFlag=1;h()}}
        } else {
          l = l || h;
        }
        l = l || 'head';
        c = a.getElementsByTagName(l)[0];
        if (c) {
          if (l == 'script') {
            c.parentNode.insertBefore(b, c);
          } else {
            c.appendChild(b)
          }
          utag.DB("Attach to "+l+": "+src)
        }
      }
    }
  };
  utag.o['merck-msd.www.merck.com']=utag;
  utag.cfg = {
    v: "ut4.008.201407011855",
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    forcetimeout: 15000,
    domain: utag.loader.lh(),
    path: "//tags.tiqcdn.com/utag/merck-msd/www.merck.com/prod/",
    utid: "merck-msd/www.merck.com/201407011855"
  };try{var _gaq=_gaq || [];var pageTracker=pageTracker || {_trackEvent:function(c,d,e,f,g){g={ga_eventCat:c,ga_eventAction:d,ga_eventLabel:e,ga_eventValue:f};utag.link(g);},_trackPageview:function(c){_gaq.push(['_trackPageview',c?c:null]);}}}catch(e){};utag.cond={};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function() {};utag.pre=function() {    utag.loader.initdata();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();        };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){
utag.o["merck-msd.msd"] = utag;
}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={};
utag.loader.cfgsort=[];  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i];};
  utag.loader.SETFORCE = function(a) {
    utag.DB('SETFORCE:' + a);
    if (utag.loader.ft > 0) clearTimeout(utag.loader.ft);
    utag.loader.ft = (utag.cfg.forcetimeout != 0) ? setTimeout(utag.loader.FORCE, utag.cfg.forcetimeout) : 0
  }
  utag.loader.FORCE = function(a, b, c, d) {
    a = utag.sender;
    b = utag.loader.f;
    utag.DB('FORCE:'+a+':'+b);
    for (c in utag.loader.GV(b)) {
      d = a[c].id;
      if (typeof b[c] != 'undefined' && b[c] == 0) {
        utag.DB('FORCEERROR:' + d);
        utag.rpt['f_' + d] = 1;
	utag.ut.error({e:'load error',s:a[c].src,l:0,t:'le'});
        delete utag.sender[d];
        delete utag.send[d];
        utag.loader.LOAD(d)
      }
    }
  }
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    utag.rpt.ts['i'] = new Date();
    if (!utag.cfg.noload) {
      try {
        this.GET()
      } catch (e) {};
      var lq = [];
      d = this.cfgsort || this.cfg;
      for (a in this.GV(d)) {
        e = (this.cfgsort?d[a]:a);
        b = this.cfg[e];
        b.id = e;
        if (b.wait == 1) {
          this.wq.push(b)
        } else if (b.load > 0) {
          if (b.send) {
            c = false;
            utag.send[b.id] = b;
          }
	  if(b.load!=4){
	    lq.push(b);
            this.f[b.id] = 0;
	  }
        }
      }
      for (a = 0; a < lq.length; a++) {
        utag.DB('utag.loader.INIT: loading ' + b.id);
        utag.loader.AS(lq[a])
      }
      if (utag.loader.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
	if(utag.loader.rf==0){
	  utag.loader.rf=1;
          utag.DB('READY:utag.loader.wq');
	  utag.loader.WQ();
	  utag.loader.SETFORCE('WAIT')
	}
      });
      else if(lq.length==0)utag.handler.INIT();
      else utag.loader.SETFORCE('INIT')
    }
    return 1
  };
  

  utag.cfg.readywait ? utag.loader.EV('', 'ready', function(a) {
    if(utag.loader.rf==0){
      utag.loader.rf=1;
      utag.DB('READY:utag.cfg.readywait');
      utag.loader.INIT()
    }
  }) : utag.loader.INIT();
}
