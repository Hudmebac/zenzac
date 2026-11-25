/* ==========================================================================
   ZenZac - app.js
   Vanilla JavaScript. No build step, no dependencies, no network calls.
   Everything the child or parent creates is stored in localStorage only.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.ZenData;
  var KEY = "zenzac.v1";

  /* ------------------------------ helpers ------------------------------ */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function uid() {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }
  function icon(name, extra) {
    return '<svg class="ico ' + (extra || "") + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function dayKey(ts) {
    var d = new Date(ts);
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function todayKey() { return dayKey(Date.now()); }
  function isToday(ts) { return dayKey(ts) === todayKey(); }
  function clockText(seconds) {
    var s = Math.max(0, Math.round(seconds));
    return pad(Math.floor(s / 60)) + ":" + pad(s % 60);
  }
  function dateLabel(ts) {
    var d = new Date(ts);
    var t = pad(d.getHours()) + ":" + pad(d.getMinutes());
    if (dayKey(ts) === todayKey()) return "Today " + t;
    if (dayKey(ts) === dayKey(Date.now() - 86400000)) return "Yesterday " + t;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return D.dayNames[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()] + ", " + t;
  }

  /* ------------------------------- state ------------------------------- */

  var DEFAULT_MIX = { waves: 0.55, rain: 0.4, white: 0.35, breath: 0.5, tranquil: 0.35, wind: 0.35, whale: 0.3 };

  var DEFAULTS = {
    version: 1,
    settings: {
      name: "",
      sound: true,
      volume: 0.8,
      motion: "full",
      bigText: false,
      voice: false,
      theme: "dusk",
      showHistory: false,
      emojiStyle: "basic",
      whackTheme: "aliens",
      whackLevel: "normal",
      spinTopic: "mix",
      mix: DEFAULT_MIX
    },
    profile: { done: false, mode: "", age: "", hard: [], helps: [], sensory: [], updated: 0 },
    rules: [],
    moods: [],
    behaviour: [],
    routine: { now: null, next: null, queue: [], done: [] },
    routines: [],
    stickers: 0,
    bestWhack: 0,
    whackBest: {},
    whackScores: []
  };

  var state = load();

  function load() {
    var base = JSON.parse(JSON.stringify(DEFAULTS));
    var raw = null;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { raw = null; }
    if (!raw) return base;
    try {
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return base;
      var s = saved.settings || {};
      base.settings.name = typeof s.name === "string" ? s.name : "";
      base.settings.sound = s.sound !== false;
      base.settings.volume = typeof s.volume === "number" ? clamp(s.volume, 0, 1) : 0.8;
      base.settings.motion = s.motion === "calm" ? "calm" : "full";
      base.settings.bigText = !!s.bigText;
      base.settings.voice = !!s.voice;
      base.settings.mix = Object.assign({}, DEFAULT_MIX, s.mix || {});
      base.settings.theme = typeof s.theme === "string" && s.theme ? s.theme : "dusk";
      base.settings.showHistory = s.showHistory === true;
      base.settings.emojiStyle = typeof s.emojiStyle === "string" ? s.emojiStyle : "basic";
      base.settings.whackTheme = typeof s.whackTheme === "string" ? s.whackTheme : "aliens";
      base.settings.whackLevel = typeof s.whackLevel === "string" ? s.whackLevel : "normal";
      base.settings.spinTopic = typeof s.spinTopic === "string" ? s.spinTopic : "mix";
      var p = saved.profile || {};
      base.profile.done = !!p.done;
      base.profile.mode = typeof p.mode === "string" ? p.mode : "";
      base.profile.age = typeof p.age === "string" ? p.age : "";
      base.profile.hard = Array.isArray(p.hard) ? p.hard : [];
      base.profile.helps = Array.isArray(p.helps) ? p.helps : [];
      base.profile.sensory = Array.isArray(p.sensory) ? p.sensory : [];
      base.profile.updated = typeof p.updated === "number" ? p.updated : 0;
      base.rules = Array.isArray(saved.rules) ? saved.rules.filter(function (r) {
        return r && typeof r.text === "string";
      }) : [];
      base.moods = Array.isArray(saved.moods) ? saved.moods : [];
      base.behaviour = Array.isArray(saved.behaviour) ? saved.behaviour : [];
      if (saved.routine && typeof saved.routine === "object") {
        base.routine.now = saved.routine.now || null;
        base.routine.next = saved.routine.next || null;
        base.routine.queue = Array.isArray(saved.routine.queue) ? saved.routine.queue : [];
        base.routine.done = Array.isArray(saved.routine.done) ? saved.routine.done : [];
      }
      base.routines = Array.isArray(saved.routines) ? saved.routines : [];
      base.stickers = typeof saved.stickers === "number" ? saved.stickers : 0;
      base.bestWhack = typeof saved.bestWhack === "number" ? saved.bestWhack : 0;
      if (saved.whackBest && typeof saved.whackBest === "object") {
        base.whackBest = saved.whackBest;
      } else if (base.bestWhack) {
        base.whackBest = { "zacs:normal": base.bestWhack };
      }
      base.whackScores = Array.isArray(saved.whackScores) ? saved.whackScores.filter(function (r) {
        return r && typeof r.score === "number";
      }).slice(0, 5) : [];
    } catch (e) {
      return base;
    }
    return base;
  }

  function save() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      toast("Could not save on this device - storage may be full.");
    }
  }

  function computeStreak() {
    var days = {};
    state.moods.forEach(function (m) { if (m && m.ts) days[dayKey(m.ts)] = true; });
    state.behaviour.forEach(function (b) { if (b && b.ts) days[dayKey(b.ts)] = true; });
    state.routine.done.forEach(function (d) { if (d && d.ts) days[dayKey(d.ts)] = true; });
    var cursor = Date.now();
    if (!days[dayKey(cursor)]) cursor -= 86400000;
    var streak = 0;
    while (days[dayKey(cursor)]) {
      streak++;
      cursor -= 86400000;
      if (streak > 3650) break;
    }
    return streak;
  }

  /* ------------------------------- audio ------------------------------- */

  var AudioEngine = (function () {
    var tracks = {};
    var synths = {};
    var active = {};
    var oneShots = [];
    var ctx = null;
    var noiseBuf = null;

    function soundOn() { return state.settings.sound; }
    function master() { return clamp(state.settings.volume, 0, 1); }
    function mixFor(id) {
      var v = state.settings.mix[id];
      return typeof v === "number" ? v : 0.4;
    }

    function metaFor(id) {
      var found = null;
      D.ambience.forEach(function (a) { if (a.id === id) found = a; });
      return found;
    }

    function ctxOn() {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctx = ctx || new AC();
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        return ctx;
      } catch (e) { return null; }
    }

    function noiseBuffer() {
      var c = ctxOn();
      if (!c) return null;
      if (!noiseBuf) {
        var len = Math.floor(c.sampleRate * 2);
        noiseBuf = c.createBuffer(1, len, c.sampleRate);
        var data = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      }
      return noiseBuf;
    }

    function synthLevel(id) { return clamp(mixFor(id) * master() * 0.6, 0, 1); }

    function fadeTo(node, value, secs) {
      var c = ctxOn();
      if (!c) return;
      try {
        var t = c.currentTime, g = node.gain, now = g.value;
        g.cancelScheduledValues(t);
        g.setValueAtTime(now, t);
        g.linearRampToValueAtTime(value, t + (secs || 0.4));
      } catch (e) {}
    }

    /* Rain is made in the browser from filtered noise, so it needs no file. */
    function makeSynth(id) {
      var c = ctxOn(), buf = noiseBuffer();
      if (!c || !buf) return null;
      try {
        var src = c.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        var hp = c.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 900;
        var lp = c.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = 6200;
        var gain = c.createGain();
        gain.gain.value = 0;
        src.connect(hp); hp.connect(lp); lp.connect(gain); gain.connect(c.destination);
        src.start(0);
        synths[id] = { src: src, gain: gain };
        return synths[id];
      } catch (e) { return null; }
    }

    function makeTrack(id) {
      var meta = null;
      D.ambience.forEach(function (a) { if (a.id === id) meta = a; });
      if (!meta) return null;
      try {
        var el = new window.Audio();
        el.src = encodeURI(meta.file);
        el.loop = true;
        el.preload = "none";
        el.volume = clamp(mixFor(id) * master(), 0, 1);
        el.addEventListener("error", function () { active[id] = false; });
        tracks[id] = el;
        return el;
      } catch (e) {
        return null;
      }
    }

    function toggle(id) {
      if (!soundOn()) { toast("Sound is off - turn it on in Settings."); return false; }
      var meta = metaFor(id);
      if (meta && meta.synth) {
        var synth = synths[id] || makeSynth(id);
        if (!synth) { toast("This browser cannot make that sound."); return false; }
        if (active[id]) { fadeTo(synth.gain, 0); active[id] = false; return false; }
        fadeTo(synth.gain, synthLevel(id));
        active[id] = true;
        return true;
      }
      var el = tracks[id] || makeTrack(id);
      if (!el) return false;
      if (active[id]) {
        try { el.pause(); } catch (e) {}
        active[id] = false;
        return false;
      }
      el.volume = clamp(mixFor(id) * master(), 0, 1);
      try {
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) {}
      active[id] = true;
      return true;
    }

    function setVolume(id) {
      if (tracks[id]) tracks[id].volume = clamp(mixFor(id) * master(), 0, 1);
      if (synths[id] && active[id]) fadeTo(synths[id].gain, synthLevel(id), 0.2);
    }

    function finishShot(shot) {
      if (shot.done) return;
      shot.done = true;
      var i = oneShots.indexOf(shot);
      if (i > -1) oneShots.splice(i, 1);
      if (shot.onEnd) shot.onEnd();
    }

    function stopOneShots() {
      oneShots.slice().forEach(function (shot) {
        try { shot.el.pause(); shot.el.currentTime = 0; } catch (e) {}
        finishShot(shot);
      });
      oneShots = [];
    }

    /* Stop everything: loops, generated sounds and one-off sounds. */
    function stopAll() {
      Object.keys(tracks).forEach(function (id) {
        try { tracks[id].pause(); } catch (e) {}
        active[id] = false;
      });
      Object.keys(synths).forEach(function (id) {
        fadeTo(synths[id].gain, 0, 0.2);
        active[id] = false;
      });
      stopOneShots();
    }

    /* One sound at a time: a new sound always stops the one before it. */
    function playFile(src, vol, onEnd) {
      if (!soundOn()) { toast("Sound is off - turn it on in Settings."); return null; }
      stopOneShots();
      try {
        var el = new window.Audio(encodeURI(src));
        el.volume = clamp((typeof vol === "number" ? vol : 0.8) * master(), 0, 1);
        var shot = { el: el, onEnd: onEnd, done: false };
        oneShots.push(shot);
        el.addEventListener("ended", function () { finishShot(shot); });
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
        return el;
      } catch (e) { return null; }
    }

    /* A soft click for the spinner. Quiet on purpose. */
    function tick(strength) {
      if (!soundOn()) return;
      var c = ctxOn();
      if (!c) return;
      try {
        var t = c.currentTime;
        var osc = c.createOscillator();
        var gain = c.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1400, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.05);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(clamp(0.05 * (strength || 1) * master(), 0.0002, 0.12), t + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } catch (e) {}
    }

    /* Two knocks on a door. Synthesised, so it works offline. */
    function knock() {
      if (!soundOn()) return;
      var c = ctxOn();
      if (!c) return;
      try {
        [0, 0.15].forEach(function (offset, n) {
          var t = c.currentTime + offset;
          var len = Math.floor(c.sampleRate * 0.11);
          var buf = c.createBuffer(1, len, c.sampleRate);
          var data = buf.getChannelData(0);
          for (var i = 0; i < len; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 7);
          }
          var src = c.createBufferSource();
          src.buffer = buf;
          var filter = c.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = n ? 800 : 1050;
          var gain = c.createGain();
          gain.gain.value = clamp((n ? 0.4 : 0.55) * master(), 0.02, 0.8);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(c.destination);
          src.start(t);
        });
      } catch (e) {}
    }

    function chime() {
      if (!soundOn()) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        ctx = ctx || new AC();
        if (ctx.state === "suspended" && ctx.resume) ctx.resume();
        [880, 1174.7].forEach(function (freq, i) {
          var start = ctx.currentTime + i * 0.16;
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.22, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 1);
        });
      } catch (e) {}
    }

    function say(text) {
      if (!state.settings.voice || !soundOn()) return;
      if (!("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        var u = new window.SpeechSynthesisUtterance(text);
        u.rate = 0.88;
        u.pitch = 1.05;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }

    function hush() {
      if (!("speechSynthesis" in window)) return;
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }

    function applyMaster() {
      if (!soundOn()) stopAll();
      Object.keys(tracks).forEach(function (id) {
        tracks[id].volume = clamp(mixFor(id) * master(), 0, 1);
      });
      Object.keys(synths).forEach(function (id) {
        if (active[id]) fadeTo(synths[id].gain, synthLevel(id), 0.2);
      });
    }

    return {
      toggle: toggle,
      setVolume: setVolume,
      stopAll: stopAll,
      playFile: playFile,
      tick: tick,
      knock: knock,
      chime: chime,
      say: say,
      hush: hush,
      applyMaster: applyMaster,
      isPlaying: function (id) { return !!active[id]; }
    };
  })();

  /* ------------------------------- toast ------------------------------- */

  function downloadData() {
    try {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "zenzac-" + todayKey() + ".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      toast("A copy has been downloaded.");
    } catch (e) {
      toast("This browser would not let me download a copy.");
    }
  }

  var toastTimer = null;
  function toast(message) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-on");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 2800);
  }

  /* --------------------------- chrome & routing ------------------------ */

  var SECTIONS = [
    { id: "home", label: "Home", icon: "home" },
    { id: "calm", label: "Calm", icon: "calm" },
    { id: "routine", label: "Now & Next", short: "Now", icon: "routine" },
    { id: "focus", label: "Focus", icon: "focus" },
    { id: "journal", label: "Journal", icon: "journal" },
    { id: "play", label: "Play", icon: "play" },
    { id: "compendium", label: "Compendium", icon: "book" },
    { id: "learn", label: "Learn", icon: "learn" },
    { id: "support", label: "Parent support", short: "Support", icon: "heart" },
    { id: "settings", label: "Settings", icon: "settings" }
  ];

  var TABS = ["home", "calm", "play", "routine", "more"];
  var MORE_ROUTES = ["more", "focus", "journal", "learn", "support", "compendium", "setup", "settings"];

  var TITLES = {
    home: "ZenZac - calm, routines & play",
    calm: "Calm · ZenZac",
    routine: "Now & Next · ZenZac",
    focus: "Focus · ZenZac",
    journal: "Journal · ZenZac",
    play: "Play · ZenZac",
    compendium: "Compendium · ZenZac",
    learn: "Learn · ZenZac",
    support: "Parent support · ZenZac",
    setup: "Set up your plan · ZenZac",
    settings: "Settings · ZenZac",
    more: "More · ZenZac"
  };

  function sectionLabel(id) {
    for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i].label;
    return "More";
  }

  function renderChrome(activeId) {
    var rail = $("#railNav");
    var tabs = $("#tabbar");
    if (rail) {
      rail.innerHTML = SECTIONS.map(function (s) {
        return '<a class="nav-link' + (s.id === activeId ? " is-active" : "") + '" href="#/' + s.id + '"' +
          (s.id === activeId ? ' aria-current="page"' : "") + '>' +
          icon(s.icon) + "<span>" + esc(s.label) + "</span></a>";
      }).join("");
    }
    if (tabs) {
      tabs.innerHTML = TABS.map(function (id) {
        var isActive = id === "more" ? MORE_ROUTES.indexOf(activeId) > -1 : id === activeId;
        var label = id === "more" ? "More" : (sectionLabel(id).split(" ")[0] === "Now" ? "Now" : sectionLabel(id));
        return '<a class="tab' + (isActive ? " is-active" : "") + '" href="#/' + id + '"' +
          (isActive ? ' aria-current="page"' : "") + ">" +
          icon(id === "more" ? "more" : id) + "<span>" + esc(label) + "</span></a>";
      }).join("");
    }
  }

  function applyChrome() {
    var theme = state.settings.theme || "dusk";
    var known = false;
    D.themes.forEach(function (t) { if (t.id === theme) known = true; });
    document.documentElement.setAttribute("data-theme", known ? theme : "dusk");
    document.documentElement.setAttribute("data-motion", state.settings.motion === "calm" ? "calm" : "full");
    document.documentElement.setAttribute("data-bigtext", state.settings.bigText ? "on" : "off");
    var emoji = state.settings.emojiStyle || "basic";
    if (["basic", "soft", "matt", "gloss"].indexOf(emoji) < 0) emoji = "basic";
    document.documentElement.setAttribute("data-emoji", emoji);
    var btn = $("#soundToggle");
    if (btn) {
      btn.setAttribute("aria-pressed", state.settings.sound ? "true" : "false");
      btn.setAttribute("aria-label", state.settings.sound ? "Turn sound off" : "Turn sound on");
      btn.innerHTML = icon(state.settings.sound ? "sound" : "mute");
    }
  }

  var lastRoute = "";

  function route() {
    var id = (window.location.hash || "").replace(/^#\/?/, "").split("?")[0].split("/")[0] || "home";
    if (!VIEWS[id] && id !== "more") id = "home";
    if (id !== "setup") setupOpened = false;
    if (id !== "journal") { journalUnlocked = false; journalEdit = null; }
    stopAllActivity();
    renderChrome(id);
    var view = $("#view");
    if (!view) return;
    view.innerHTML = "";
    (VIEWS[id] || VIEWS.home)(view);
    if (id !== lastRoute) {
      window.scrollTo(0, 0);
      lastRoute = id;
    }
    document.title = TITLES[id] || "ZenZac";
  }

  function stopAllActivity() {
    stopBreath();
    stopWhack();
    stopSpin();
    timerPause();
    AudioEngine.hush();
    redraw = null;
  }

  /* ------------------------- breathing (Calm) ------------------------- */

  var PATTERNS = {
    calm: { label: "Calm", phases: [["Breathe in", 4, "in"], ["Hold", 4, "hold"], ["Breathe out", 6, "out"]] },
    box: { label: "Box", phases: [["Breathe in", 4, "in"], ["Hold", 4, "hold"], ["Breathe out", 4, "out"], ["Hold", 4, "hold"]] },
    balloon: { label: "Balloon", phases: [["Breathe in", 4, "in"], ["Hold", 2, "hold"], ["Breathe out", 6, "out"]] }
  };

  var breath = { pattern: "calm", running: false, timer: null, left: 0, pi: 0, round: 0, scale: 0.82 };

  /* "in 4 · hold 4 · out 6" - the numbers mean nothing without the words. */
  function patternNote(p) {
    return p.phases.map(function (ph, i) {
      var word = ph[2] === "in" ? "in" : ph[2] === "out" ? "out" : "hold";
      return (i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + " " + ph[1];
    }).join(" · ");
  }

  function breathMeta() {
    var el = $("#breathMeta");
    if (!el) return;
    el.textContent = PATTERNS[breath.pattern].label + " · " + breath.round +
      (breath.round === 1 ? " round" : " rounds");
  }

  function applyPhase(phase) {
    breath.left = phase[1];
    var orb = $("#orb");
    if (orb) {
      var target = phase[2] === "in" ? 1 : phase[2] === "out" ? 0.74 : breath.scale;
      breath.scale = target;
      orb.style.transitionDuration = phase[1] + "s";
      orb.style.transform = "scale(" + target + ")";
    }
    var label = $("#breathPhase");
    if (label) label.textContent = phase[0];
    var count = $("#orbCount");
    if (count) count.textContent = String(phase[1]);
    breathMeta();
    AudioEngine.say(phase[0]);
  }

  function startBreath() {
    stopBreath();
    breath.running = true;
    breath.pi = 0;
    breath.round = 0;
    breath.scale = 0.74;
    var pattern = PATTERNS[breath.pattern];
    var phaseStart = Date.now();
    var start = $("#breathStart");
    if (start) { start.disabled = true; start.innerHTML = icon("calm") + " Breathing…"; }
    var stop = $("#breathStop");
    if (stop) stop.disabled = false;

    function frame() {
      if (!breath.running) return;
      var phase = pattern.phases[breath.pi];
      var elapsed = (Date.now() - phaseStart) / 1000;
      if (elapsed >= phase[1]) {
        breath.pi = (breath.pi + 1) % pattern.phases.length;
        if (breath.pi === 0) breath.round++;
        phaseStart = Date.now();
        phase = pattern.phases[breath.pi];
        applyPhase(phase);
        elapsed = 0;
      }
      var count = $("#orbCount");
      if (count) count.textContent = String(Math.max(1, Math.ceil(phase[1] - elapsed)));
      breath.timer = setTimeout(frame, 200);
    }

    applyPhase(pattern.phases[0]);
    frame();
  }

  function stopBreath() {
    breath.running = false;
    if (breath.timer) { clearTimeout(breath.timer); breath.timer = null; }
    AudioEngine.hush();
    var orb = $("#orb");
    if (orb) {
      orb.style.transitionDuration = "1.2s";
      orb.style.transform = "scale(0.82)";
    }
    var count = $("#orbCount");
    if (count) count.textContent = "Ready";
    var label = $("#breathPhase");
    if (label) label.textContent = "Take a comfortable breath";
    var start = $("#breathStart");
    if (start) { start.disabled = false; start.innerHTML = icon("tri") + " Start"; }
    var stop = $("#breathStop");
    if (stop) stop.disabled = true;
    breathMeta();
  }

  /* ---------------------------- Now & Next ----------------------------- */

  var timerState = { left: 0, total: 0, running: false, id: null, warned: false, endAt: 0, ended: false };
  var redraw = null;

  function timerMins() { return (state.routine.now && state.routine.now.mins) || 5; }

  /* When the time runs out the clock stays at 00:00 until the task changes. */
  function timerSecs() {
    if (timerState.ended) return 0;
    return (timerState.running || timerState.left > 0) ? timerState.left : timerMins() * 60;
  }

  function paintClock() {
    var el = $("#routineClock");
    if (!el) return;
    var secs = timerSecs();
    el.textContent = clockText(secs);
    if (secs <= 30) el.classList.add("is-low");
    else el.classList.remove("is-low");
    var fill = $("#timerFill");
    if (fill) fill.style.width = clamp(secs / Math.max(1, timerMins() * 60) * 100, 0, 100).toFixed(2) + "%";
  }

  /* Count from a deadline rather than by subtraction, so a throttled tab or a
     missed tick cannot skip the one-minute warning or the end of the timer. */
  function timerStart() {
    if (!state.routine.now) return;
    if (timerState.running) return;
    if (timerState.left <= 0) timerState.left = timerMins() * 60;
    timerState.running = true;
    timerState.ended = false;
    timerState.warned = timerState.left <= 60;
    timerState.endAt = Date.now() + timerState.left * 1000;
    timerState.id = setInterval(timerTick, 250);
    if (redraw) redraw();
  }

  function timerTick() {
    if (!timerState.running) return;
    var left = Math.max(0, Math.ceil((timerState.endAt - Date.now()) / 1000));
    if (left === timerState.left) return;
    timerState.left = left;
    paintClock();
    if (left <= 0) {
      timerState.ended = true;
      timerPause();
      AudioEngine.chime();
      toast("Time's up.");
      if (redraw) redraw();
      return;
    }
    if (left <= 60 && !timerState.warned) {
      timerState.warned = true;
      AudioEngine.tick(0.9);
      toast("One minute left.");
    }
  }

  function timerPause() {
    if (timerState.id) { clearInterval(timerState.id); timerState.id = null; }
    timerState.running = false;
  }

  function timerReset() {
    timerPause();
    timerState.left = 0;
    timerState.total = 0;
    timerState.warned = false;
    timerState.endAt = 0;
    timerState.ended = false;
    paintClock();
  }

  function normaliseRoutine() {
    var flow = [];
    if (state.routine.now) flow.push(state.routine.now);
    if (state.routine.next) flow.push(state.routine.next);
    flow = flow.concat(state.routine.queue || []);
    state.routine.now = flow.shift() || null;
    state.routine.next = flow.shift() || null;
    state.routine.queue = flow;
  }

  function addTask(task) {
    state.routine.queue = state.routine.queue || [];
    state.routine.queue.push(task);
    normaliseRoutine();
  }

  var PRESETS = {
    morning: [["Wake up", "☀️"], ["Brush teeth", "🦷"], ["Get dressed", "👕"], ["Breakfast", "🥣"], ["Pack bag", "🎒"]],
    bedtime: [["Bath", "🛁"], ["Pyjamas", "🧦"], ["Story", "📖"], ["Bed", "🌙"]],
    homework: [["Snack", "🍎"], ["Homework", "✏️"], ["Screen time", "📱"], ["Dinner", "🍽️"]]
  };

  /* ------------------------------- wheel ------------------------------- */

  var WHEEL_COLORS = ["#4fe3c1", "#8fb4ff", "#b8a5ff", "#ffcc7a", "#ff9a86", "#7ee2c4", "#9ad7ff", "#ffd9a8"];
  var spin = { rot: 0, raf: null, dragging: false, lastAngle: 0, lastTime: 0, vel: 0, items: null, lastSeg: 0, tickAt: 0 };

  function spinTopicById(id) {
    var list = D.spinTopics || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[0];
  }

  function spinTopic() { return spinTopicById(state.settings.spinTopic || "mix"); }

  /* Eight choices from the chosen shelf. "Surprise" mixes every shelf. */
  function pickFaces() {
    var topic = spinTopic();
    var pool = [];
    if (topic.id === "mix" || !topic.items || !topic.items.length) {
      (D.spinTopics || []).forEach(function (t) {
        if (t.items && t.items.length) pool = pool.concat(t.items);
      });
    } else {
      pool = topic.items.slice();
    }
    pool = shuffle(pool);
    return pool.slice(0, 8);
  }

  function wheelFaces() {
    if (!spin.items) spin.items = pickFaces();
    return spin.items;
  }

  function polar(cx, cy, r, deg) {
    var rad = deg * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function wheelParts() {
    var cx = 160, cy = 160, r = 150, seg = 45;
    var faces = wheelFaces();
    var parts = "";
    for (var i = 0; i < 8; i++) {
      var a0 = -90 + i * seg;
      var a1 = a0 + seg;
      var p0 = polar(cx, cy, r, a0);
      var p1 = polar(cx, cy, r, a1);
      parts += '<path d="M' + cx + " " + cy + " L" + p0.x.toFixed(1) + " " + p0.y.toFixed(1) +
        " A" + r + " " + r + " 0 0 1 " + p1.x.toFixed(1) + " " + p1.y.toFixed(1) + ' Z" fill="' +
        WHEEL_COLORS[i] + '" fill-opacity="' + (i % 2 ? "0.82" : "0.62") + '"/>';
      var mid = polar(cx, cy, r * 0.66, a0 + seg / 2);
      parts += '<text x="' + mid.x.toFixed(1) + '" y="' + (mid.y + 11).toFixed(1) +
        '" text-anchor="middle" font-size="34" aria-hidden="true">' + faces[i].e + "</text>";
    }
    return parts;
  }

  function wheelSVG() {
    return '<svg class="wheel" id="wheel" viewBox="0 0 320 320" role="img" ' +
      'aria-label="Spinning choice wheel. Drag it or press spin to pick something.">' +
      '<g id="wheelRotor">' + wheelParts() + "</g>" +
      '<circle class="wheel-cap" cx="160" cy="160" r="34"/>' +
      '<text x="160" y="166" text-anchor="middle" font-size="14" font-weight="700" fill="#dff8ff" ' +
      'font-family="system-ui, sans-serif">SPIN</text>' +
      '<path d="M160 3l10 17h-20z" fill="#ffffff" fill-opacity="0.9"/></svg>';
  }

  function paintFaces() {
    var rotor = $("#wheelRotor");
    if (rotor) rotor.innerHTML = wheelParts();
  }

  function paintWheel() {
    var rotor = $("#wheelRotor");
    if (rotor) rotor.setAttribute("transform", "rotate(" + spin.rot + " 160 160)");
  }

  function stopSpin() {
    if (spin.raf) { cancelAnimationFrame(spin.raf); spin.raf = null; }
    spin.dragging = false;
  }

  function spinMomentum(velocity) {
    if (spin.raf) cancelAnimationFrame(spin.raf);
    var v = velocity;
    spin.lastSeg = Math.floor(spin.rot / 45);
    function step() {
      spin.rot += v;
      v *= 0.988;
      paintWheel();
      tickSpin(v);
      if (Math.abs(v) > 0.05) {
        spin.raf = requestAnimationFrame(step);
      } else {
        spin.raf = null;
        spinSettled();
      }
    }
    spin.raf = requestAnimationFrame(step);
  }

  /* The pointer sits at the top, so work out which slice is under it. */
  function spinSettled() {
    var faces = wheelFaces();
    var deg = ((-spin.rot % 360) + 360) % 360;
    var idx = Math.floor(deg / 45) % 8;
    var item = faces[idx];
    var out = $("#spinResult");
    if (out && item) {
      out.innerHTML = '<span class="spin-result-emoji" aria-hidden="true">' + item.e + "</span>" +
        '<span class="spin-result-text"><small>It landed on</small><strong>' + esc(item.n) + "</strong></span>";
      out.classList.add("is-set");
      AudioEngine.tick(0.8);
    }
  }

  /* One quiet click each time a segment passes the pointer. */
  function tickSpin(v) {
    var speed = Math.abs(v);
    if (speed < 0.5) return;
    var seg = Math.floor(spin.rot / 45);
    if (seg === spin.lastSeg) return;
    spin.lastSeg = seg;
    var now = Date.now();
    if (now - spin.tickAt < 45) return;
    spin.tickAt = now;
    AudioEngine.tick(clamp(speed / 18, 0.25, 1));
  }

  function spinButton() {
    if (!spin.items) spin.items = pickFaces();
    paintFaces();
    var out = $("#spinResult");
    if (out) {
      out.innerHTML = '<span class="spin-result-text"><small>Spinning…</small><strong>&nbsp;</strong></span>';
      out.classList.remove("is-set");
    }
    spinMomentum((26 + Math.random() * 18) * (Math.random() < 0.5 ? -1 : 1));
    AudioEngine.tick(0.9);
  }

  function bindWheel() {
    var wheel = $("#wheel");
    if (!wheel) return;
    function centre() {
      var r = wheel.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    wheel.addEventListener("pointerdown", function (e) {
      if (wheel.setPointerCapture) {
        try { wheel.setPointerCapture(e.pointerId); } catch (err) {}
      }
      stopSpin();
      spin.dragging = true;
      var c = centre();
      spin.lastAngle = Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180 / Math.PI;
      spin.lastTime = Date.now();
      spin.vel = 0;
      e.preventDefault();
    });
    wheel.addEventListener("pointermove", function (e) {
      if (!spin.dragging) return;
      var c = centre();
      var angle = Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180 / Math.PI;
      var delta = angle - spin.lastAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      spin.lastAngle = angle;
      spin.rot += delta;
      var now = Date.now();
      var dt = Math.max(8, now - spin.lastTime);
      spin.vel = delta / dt * 16;
      spin.lastTime = now;
      paintWheel();
      e.preventDefault();
    });
    function release() {
      if (!spin.dragging) return;
      spin.dragging = false;
      spinMomentum(clamp(spin.vel, -60, 60));
    }
    wheel.addEventListener("pointerup", release);
    wheel.addEventListener("pointercancel", release);
    wheel.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        spinMomentum(22);
      }
    });
  }

  /* ---------------------------- whack-a-mole --------------------------- */

  /* ---------------------------- Wac-A-Zac ------------------------------ */

  var WHACK_THEMES = [
    { id: "aliens",   name: "Aliens",   emoji: "👽", bonus: "🛸", mover: "🪐", grump: "👾", line: "Tap the aliens before they fly off." },
    { id: "monsters", name: "Monsters", emoji: "👾", bonus: "⭐", mover: "🦠", grump: "🥦", line: "Tap the monsters before they bounce away." },
    { id: "robots",   name: "Robots",   emoji: "🤖", bonus: "⚡", mover: "🔧", grump: "🔌", line: "Tap the robots before they power down." },
    { id: "sea",      name: "Sea",      emoji: "🐙", bonus: "🐚", mover: "🐠", grump: "🦈", line: "Tap the sea creatures before they swim off." },
    { id: "snacks",   name: "Snacks",   emoji: "🍕", bonus: "🍩", mover: "🍿", grump: "🌶️", line: "Tap the snacks before they disappear." },
    { id: "zacs",     name: "Zacs",     emoji: "🐹", bonus: "🌟", mover: "⚡", grump: "🧦", line: "Tap the Zacs before they duck." }
  ];

  var WHACK_LEVELS = [
    { id: "calm",   name: "Calm",   secs: 45, gap: [900, 1500], up: 1500 },
    { id: "normal", name: "Normal", secs: 30, gap: [560, 1000], up: 1000 },
    { id: "quick",  name: "Quick",  secs: 20, gap: [360, 680],  up: 700 }
  ];

  var whack = { running: false, paused: false, score: 0, left: 30, clock: null, next: null };

  function whackTheme() {
    for (var i = 0; i < WHACK_THEMES.length; i++) {
      if (WHACK_THEMES[i].id === state.settings.whackTheme) return WHACK_THEMES[i];
    }
    return WHACK_THEMES[0];
  }

  function whackLevel() {
    for (var i = 0; i < WHACK_LEVELS.length; i++) {
      if (WHACK_LEVELS[i].id === state.settings.whackLevel) return WHACK_LEVELS[i];
    }
    return WHACK_LEVELS[1];
  }

  function whackKey() { return state.settings.whackTheme + ":" + state.settings.whackLevel; }

  function whackBest() {
    var map = state.whackBest || {};
    return map[whackKey()] || 0;
  }

  function whackSay(text) {
    var msg = $("#whackMsg");
    if (msg) msg.textContent = text;
  }

  function paintWhack() {
    var score = $("#whackScore"); if (score) score.textContent = String(whack.score);
    var time = $("#whackTime"); if (time) time.textContent = String(Math.max(0, whack.left));
    var best = $("#whackBest"); if (best) best.textContent = String(whackBest());
  }

  function hideHole(hole) {
    if (hole._whackTimer) { clearTimeout(hole._whackTimer); hole._whackTimer = null; }
    hole.classList.remove("is-up", "is-bonus", "is-mover", "is-grump");
    delete hole.dataset.kind;
  }

  function stopWhack() {
    whack.running = false;
    whack.paused = false;
    if (whack.clock) { clearInterval(whack.clock); whack.clock = null; }
    if (whack.next) { clearTimeout(whack.next); whack.next = null; }
    $$(".hole").forEach(function (hole) {
      hideHole(hole);
      hole.classList.remove("is-hit");
    });
  }

  function popWhack() {
    if (!whack.running || whack.paused) return;
    var free = $$(".hole").filter(function (h) { return !h.classList.contains("is-up"); });
    if (free.length) {
      var hole = free[Math.floor(Math.random() * free.length)];
      var theme = whackTheme();
      var roll = Math.random();
      var kind = roll < 0.09 ? "grump" : roll < 0.22 ? "bonus" : roll < 0.36 ? "mover" : "normal";
      var face = hole.querySelector(".mole");
      if (face) {
        face.textContent = kind === "bonus" ? theme.bonus : kind === "mover" ? theme.mover :
          kind === "grump" ? theme.grump : theme.emoji;
      }
      hole.dataset.kind = kind;
      hole.dataset.points = String(kind === "bonus" ? 5 : kind === "mover" ? 2 : kind === "grump" ? -1 : 1);
      hole.classList.remove("is-bonus", "is-mover", "is-grump");
      if (kind !== "normal") hole.classList.add("is-" + kind);
      hole.classList.add("is-up");
      hole._whackTimer = setTimeout(function () { hideHole(hole); }, whackLevel().up);
    }
    var gap = whackLevel().gap;
    whack.next = setTimeout(popWhack, gap[0] + Math.random() * (gap[1] - gap[0]));
  }

  function whackBoardHTML() {
    var list = (state.whackScores || []).slice(0, 5);
    if (!list.length) {
      return '<p class="tiny muted" style="margin-top:8px">Your best rounds will show here once you have played one.</p>';
    }
    return '<ol class="whack-board">' + list.map(function (row, i) {
      return '<li><span class="whack-rank">' + (i + 1) + '</span>' +
        '<strong>' + row.score + '</strong>' +
        '<span class="whack-who">' + esc(row.theme || "Zacs") + " · " + esc(row.level || "Normal") + "</span>" +
        '<small>' + dateLabel(row.ts) + "</small></li>";
    }).join("") + "</ol>";
  }

  function paintWhackBoard() {
    var board = $("#whackBoard");
    if (board) board.innerHTML = whackBoardHTML();
  }

  function startWhack() {
    stopWhack();
    var level = whackLevel();
    whack.running = true;
    whack.score = 0;
    whack.left = level.secs;
    paintWhack();
    whackSay("Go! " + whackTheme().line);
    var btn = $("#whackStart");
    if (btn) { btn.disabled = true; btn.innerHTML = "Playing…"; }
    var pause = $("#whackPause");
    if (pause) { pause.hidden = false; pause.textContent = "Pause"; }

    whack.clock = setInterval(function () {
      if (whack.paused) return;
      whack.left--;
      paintWhack();
      if (whack.left <= 0) endWhack();
    }, 1000);
    popWhack();
  }

  function toggleWhackPause() {
    if (!whack.running) return;
    whack.paused = !whack.paused;
    var pause = $("#whackPause");
    if (pause) pause.textContent = whack.paused ? "Resume" : "Pause";
    if (whack.paused) {
      if (whack.next) { clearTimeout(whack.next); whack.next = null; }
      $$(".hole").forEach(hideHole);
      whackSay("Paused. Take your time.");
    } else {
      whackSay(whackTheme().line);
      popWhack();
    }
  }

  function hitWhack(hole) {
    if (!whack.running || whack.paused || !hole.classList.contains("is-up")) return;
    var kind = hole.dataset.kind || "normal";
    var points = parseInt(hole.dataset.points || "1", 10);
    if (kind === "grump") {
      whack.score = Math.max(0, whack.score - 1);
      whackSay("That one was a grump. Minus one - no harm done.");
      AudioEngine.tick(0.3);
    } else {
      whack.score += points;
      if (kind === "bonus") whackSay("Gold! Five points.");
      else if (kind === "mover") whackSay("That one was moving - two points!");
      AudioEngine.tick(points > 1 ? 1 : 0.65);
    }
    hideHole(hole);
    hole.classList.add("is-hit");
    setTimeout(function () { hole.classList.remove("is-hit"); }, 260);
    paintWhack();
  }

  function endWhack() {
    var score = whack.score;
    var theme = whackTheme();
    stopWhack();
    var key = whackKey();
    state.whackBest = state.whackBest || {};
    var best = state.whackBest[key] || 0;
    var isBest = score > best;
    if (isBest) { state.whackBest[key] = score; save(); best = score; }
    whackSay(score === 0
      ? "Good try. Nothing lost - have another go."
      : isBest
        ? "New best for " + theme.name + ": " + score + "! 🎉"
        : "You scored " + score + ". Best for " + theme.name + ": " + best + ".");
    var btn = $("#whackStart");
    if (btn) { btn.disabled = false; btn.innerHTML = icon("tri") + " Play again"; }
    var pause = $("#whackPause");
    if (pause) pause.hidden = true;
    paintWhack();
    if (score > 0) {
      state.whackScores = state.whackScores || [];
      state.whackScores.push({
        score: score, theme: theme.name, level: whackLevel().name, ts: Date.now()
      });
      state.whackScores.sort(function (a, b) { return b.score - a.score; });
      state.whackScores = state.whackScores.slice(0, 5);
      save();
      paintWhackBoard();
      AudioEngine.chime();
    }
  }

  /* ------------------------------- views ------------------------------- */

  var VIEWS = {};

  var EMOJI_STYLES = [
    { id: "basic", name: "Basic", note: "Plain, exactly as your device draws it." },
    { id: "soft",  name: "Soft",  note: "Rounded, gently tinted and blurred at the edges." },
    { id: "matt",  name: "Matt",  note: "Flat and quiet, with no shine or depth." },
    { id: "gloss", name: "Gloss", note: "A little shine and depth, like a button." }
  ];

  function pageHead(eyebrow, title, sub) {
    return '<div class="page-head"><p class="eyebrow">' + esc(eyebrow) + "</p>" +
      '<h1 class="page-title">' + title + "</h1>" +
      (sub ? '<p class="page-sub">' + sub + "</p>" : "") + "</div>";
  }

  /* The wordmark is real type: Z-e-n-Z-e-n, one span per letter, each turning
     on its own axis. An e upside down reads as an a, and an n reads as itself
     or a u, so the word keeps folding between ZenZen and ZenZac as it turns. */
  function wordmarkHTML() {
    return '<div class="wordmark" role="img" aria-label="ZenZac">' +
      ["Z", "e", "n", "Z", "e", "n"].map(function (ch, i) {
        return '<span class="wm-l" style="--p:' + i + '">' + ch + "</span>";
      }).join("") + "</div>";
  }

  function tileHTML(href, emoji, title, sub, colour) {
    return '<a class="tile" href="' + href + '">' +
      '<span class="tile-ico ' + (colour || "") + '" aria-hidden="true">' + emoji + "</span>" +
      '<span class="tile-title">' + esc(title) + "</span>" +
      '<span class="tile-sub">' + esc(sub) + "</span></a>";
  }

  /* ---- Home helpers ---- */

  function enabledRules() {
    return state.rules.filter(function (r) { return r.on; });
  }

  function planStripHTML() {
    var p = state.profile;
    var m = D.mode(p.mode);
    var rules = enabledRules();
    return '<div class="plan-strip">' +
      '<div class="plan-main">' +
        '<span class="plan-badge">' + (m ? m.emoji : "🌱") + " " + esc(m ? m.name : "Your plan") + "</span>" +
        '<span class="plan-note">' + (p.age ? "Age " + esc(p.age) + " · " : "") +
          (rules.length ? rules.length + (rules.length === 1 ? " house rule" : " house rules") : "No house rules yet") +
        "</span>" +
      "</div>" +
      '<div class="plan-actions"><a class="btn sm" href="#/setup">Tweak answers</a>' +
        '<a class="btn sm ghost" href="#/setup?step=rules">House rules</a></div>' +
      "</div>";
  }

  function setupCTAHtml() {
    return '<div class="card setup-cta">' +
      '<div class="setup-cta-text"><h2 class="card-title">Make it fit your child</h2>' +
      '<p class="card-sub">Seven quick questions choose a starting point, your house rules and the colours. About two minutes, and you can change any answer later.</p></div>' +
      '<a class="btn primary" href="#/setup">Set up my plan</a></div>';
  }

  function suggestionSection() {
    var ids = state.profile.hard.slice(0, 3);
    if (!ids.length) ids = ["feelings", "morning", "noise"];
    var tiles = ids.map(function (id) {
      var t = D.hardTools[id];
      if (!t) return "";
      return tileHTML(t.href, t.emoji, t.title, t.note, "");
    }).join("");
    if (!tiles) return "";
    return '<div class="section-head"><h2 class="section-title"><span class="emoji">✨</span>Start here today</h2>' +
      '<a class="tiny muted" href="#/compendium">Or browse the compendium →</a></div>' +
      '<div class="grid grid-auto">' + tiles + "</div>";
  }

  function rulesCardHTML() {
    var rules = enabledRules();
    if (!rules.length) {
      return '<div class="card rules-card" style="margin-top:18px">' +
        '<div class="row-between"><div><h2 class="card-title">Our house rules</h2>' +
        '<p class="card-sub">Agree a few rules once, so nobody has to argue at 7am.</p></div>' +
        '<a class="btn sm primary" href="#/setup?step=rules">Set rules</a></div></div>';
    }
    return '<div class="card rules-card" style="margin-top:18px">' +
      '<div class="row-between"><div><h2 class="card-title">Our house rules</h2>' +
      '<p class="card-sub">The short version, for everyone in the house.</p></div>' +
      '<a class="btn sm" href="#/setup?step=rules">Edit</a></div>' +
      '<ul class="rules-list">' + rules.slice(0, 6).map(function (r) {
        return '<li><span class="rule-tick">' + icon("check") + "</span>" + esc(r.text) + "</li>";
      }).join("") + "</ul>" +
      (rules.length > 6 ? '<p class="tiny muted" style="margin-top:10px">+' + (rules.length - 6) + " more in your plan.</p>" : "") +
      "</div>";
  }

  function ruleStripHTML() {
    var rules = enabledRules().slice(0, 3);
    if (!rules.length) return "";
    return '<div class="rule-strip" aria-label="House rules">' + rules.map(function (r) {
      return '<span class="rule-chip">' + icon("check") + esc(r.text) + "</span>";
    }).join("") + '<a class="rule-chip ghost" href="#/setup?step=rules">All rules</a></div>';
  }

  /* ---- Home ---- */

  function moodButtons(selected) {
    return D.moods.map(function (m) {
      var on = selected === m.v;
      return '<button type="button" class="mood-btn' + (on ? " is-on" : "") + '" data-mood="' + m.v +
        '" aria-pressed="' + (on ? "true" : "false") + '">' + D.face(m.v) +
        "<span>" + esc(m.label) + "</span></button>";
    }).join("");
  }

  VIEWS.home = function (view) {
    var name = (state.settings.name || "").trim();
    var moodsToday = state.moods.filter(function (m) { return isToday(m.ts); }).length;
    var doneToday = state.routine.done.filter(function (d) { return isToday(d.ts); }).length;
    var streak = computeStreak();
    var lastMood = state.moods.length ? state.moods[state.moods.length - 1] : null;
    var picked = lastMood && isToday(lastMood.ts) ? lastMood.v : 0;
    var nowTask = state.routine.now;

    view.innerHTML =
      '<section class="hero">' +
        wordmarkHTML() +
        "<h1>" + (name ? "Hi " + esc(name) + " 👋" : "Hello there 👋") + "</h1>" +
        "<p>This is your calm corner. Breathe, see what&rsquo;s next, or play for a while.</p>" +
        '<div class="hero-actions">' +
          '<a class="btn primary lg" href="#/calm">' + icon("calm") + " Breathe with me</a>" +
          '<a class="btn lg" href="#/routine">' + icon("routine") + " What&rsquo;s next?</a>" +
        "</div>" +
        '<div class="mood-check">' +
          '<p id="moodQ">How are you feeling right now?</p>' +
          '<div class="mood-row" role="group" aria-labelledby="moodQ">' + moodButtons(picked) + "</div>" +
          '<p class="tiny muted" id="moodHint" style="margin-top:10px">Tap a face. It stays on this device.</p>' +
        "</div>" +
      "</section>" +

      (state.profile.done ? planStripHTML() : setupCTAHtml()) +
      (state.profile.done ? suggestionSection() : "") +

      '<div class="section-head"><h2 class="section-title"><span class="emoji">🧰</span>Pick something</h2>' +
        '<a class="tiny muted" href="#/more">See everything →</a></div>' +
      '<div class="grid grid-auto">' +
        tileHTML("#/calm", "🫧", "Calm", "Breathing, soothing sounds, grounding.", "mint") +
        tileHTML("#/routine", "📋", "Now & Next", "One step at a time, with a timer.", "sky") +
        tileHTML("#/focus", "🎯", "Focus", "Fidget wheel and Wac-A-Zac.", "lilac") +
        tileHTML("#/journal", "📔", "Journal", "Feelings and behaviour, kept private.", "amber") +
        tileHTML("#/play", "😂", "Play", "Knock-knock jokes and fart sounds.", "coral") +
        tileHTML("#/learn", "📚", "Learn", "Short, practical guides for grown-ups.", "") +
      "</div>" +

      '<div class="grid grid-2" style="margin-top:18px">' +
        '<div class="card">' +
          '<div class="row-between"><div><h2 class="card-title">Today</h2>' +
            '<p class="card-sub">' + (streak > 1 ? streak + " days in a row - lovely." : "Small steps count.") + "</p></div>" +
            '<span class="badge mint">' + icon("star") + " " + (state.stickers || 0) + "</span></div>" +
          '<div class="today-grid" style="margin-top:14px">' +
            '<div class="today-item"><span class="stat-num">' + moodsToday + '</span><span class="stat-label">Check-ins</span></div>' +
            '<div class="today-item"><span class="stat-num">' + doneToday + '</span><span class="stat-label">Tasks done</span></div>' +
            '<div class="today-item"><span class="stat-num">' + streak + '</span><span class="stat-label">Day streak</span></div>' +
          "</div>" +
          (nowTask
            ? '<div class="saved-row" style="margin-top:14px"><span class="task-emoji">' + esc(nowTask.emoji || "🎯") + "</span>" +
              '<span class="task-name">Right now: ' + esc(nowTask.name) + "</span>" +
              '<a class="btn sm" href="#/routine">Open</a></div>'
            : '<p class="tiny muted" style="margin-top:14px">Nothing planned yet. Now &amp; Next can help with that.</p>') +
        "</div>" +
        '<div class="card">' +
          '<h2 class="card-title">For grown-ups</h2>' +
          '<p class="card-sub">No lectures. Short things that work on hard days.</p>' +
          '<div class="stack" style="margin-top:14px">' +
            '<a class="saved-row" href="#/learn"><span class="task-emoji">🫧</span><span class="task-name">Breathing that actually helps</span>' + icon("back") + "</a>" +
            '<a class="saved-row" href="#/learn"><span class="task-emoji">🌊</span><span class="task-name">Spotting sensory overload early</span>' + icon("back") + "</a>" +
            '<a class="saved-row" href="#/journal"><span class="task-emoji">📔</span><span class="task-name">Log what happened, spot the pattern</span>' + icon("back") + "</a>" +
          "</div>" +
          '<p class="tiny muted" style="margin-top:14px">ZenZac is a support tool, not medical advice.</p>' +
        "</div>" +
      "</div>" +
      rulesCardHTML();

    $$(".mood-btn", view).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = parseInt(btn.getAttribute("data-mood"), 10);
        checkIn(value);
        $$(".mood-btn", view).forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        var hint = $("#moodHint");
        if (hint) {
          var meta = D.mood(value);
          hint.innerHTML = esc(meta.hint) + (value <= 2 ? ' <a href="#/calm">Let&rsquo;s breathe together →</a>' : "");
        }
      });
    });
  };

  function checkIn(value) {
    state.moods.push({ id: uid(), ts: Date.now(), v: value, note: "", kind: "checkin" });
    if (state.moods.length > 500) state.moods = state.moods.slice(-500);
    save();
    toast(D.mood(value).hint);
  }

  /* ---- Calm ---- */

  var calmTab = "breathe";
  var groundScene = "home";
  var groundStep = 0;
  var groundFound = {};
  var groundDone = false;

  VIEWS.calm = function (view) {
    function panelHTML() {
      if (calmTab === "sounds") return soundsPanel();
      if (calmTab === "ground") return groundPanel();
      return breathePanel();
    }

    function render() {
      stopBreath();
      /* One line per tool, so a tired parent knows which to reach for. */
      var lead = calmTab === "sounds"
        ? "For winding down, or covering a noisy room."
        : calmTab === "ground"
          ? "For when talking feels hard. Choose where you are, then find a few things with each sense."
          : "For when feelings are already big.";
      var foot = calmTab === "sounds"
        ? "Nothing to get right here. Change the volume or stop whenever you like."
        : calmTab === "ground"
          ? "Go at your own pace. Stopping after any step is fine."
          : "Breathe out for longer than you breathe in. If you feel dizzy, stop and rest.";
      view.innerHTML = pageHead("Calm", "Let&rsquo;s slow things down",
        "Three ways to settle. Pick one - you do not have to do them all.") +
        '<div class="pill-toggle" role="group" aria-label="Calm tools">' +
          '<button type="button" data-ctab="breathe" aria-pressed="' + (calmTab === "breathe") + '">Breathe</button>' +
          '<button type="button" data-ctab="sounds" aria-pressed="' + (calmTab === "sounds") + '">Sounds</button>' +
          '<button type="button" data-ctab="ground" aria-pressed="' + (calmTab === "ground") + '">Look around</button>' +
        "</div>" +
        '<p class="calm-lead">' + lead + "</p>" +
        '<div id="calmPanel">' + panelHTML() + "</div>" +
        '<p class="tiny muted" style="margin-top:16px">' + foot + "</p>";

      $$("[data-ctab]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          calmTab = btn.getAttribute("data-ctab");
          render();
        });
      });

      if (calmTab === "breathe") bindBreathe();
      else if (calmTab === "sounds") bindSounds();
      else bindGround();
    }

    function breathePanel() {
      return '<div class="card">' +
        '<div class="breath-wrap">' +
          '<div class="orb-stage">' +
            '<span class="orb-ring"></span><span class="orb-ring"></span><span class="orb-ring"></span>' +
            '<div class="orb" id="orb"><span class="orb-count" id="orbCount">Ready</span></div>' +
          "</div>" +
          '<p class="breath-phase" id="breathPhase" aria-live="polite">Take a comfortable breath</p>' +
          '<p class="breath-meta" id="breathMeta">' + PATTERNS[breath.pattern].label + " · 0 rounds</p>" +
          '<div class="breath-controls">' +
            '<button type="button" class="btn primary lg" id="breathStart">' + icon("tri") + " Start</button>" +
            '<button type="button" class="btn" id="breathStop" disabled>Stop</button>' +
          "</div>" +
          '<div class="row-wrap" style="justify-content:center;margin-top:6px" role="group" aria-label="Breathing pattern">' +
            Object.keys(PATTERNS).map(function (key) {
              return '<button type="button" class="chip' + (breath.pattern === key ? " is-on" : "") +
                '" data-pattern="' + key + '" aria-pressed="' + (breath.pattern === key) + '">' + PATTERNS[key].label + "</button>";
            }).join("") +
          "</div>" +
          '<p class="tiny muted center" id="patternNote" style="margin-top:8px">' + patternNote(PATTERNS[breath.pattern]) + "</p>" +
        "</div>" +
      "</div>" +
      '<div class="card tight" style="margin-top:14px">' +
        '<h2 class="card-title">If it feels hard</h2>' +
        '<p class="card-sub">The out-breath is the part that helps. Two minutes is plenty, and stopping early is fine.</p>' +
        '<p class="card-sub" style="margin-top:10px">Counting on your fingers is easier than counting in your head. ' +
          "Tracing up and down each finger works too.</p>" +
      "</div>";
    }

    function bindBreathe() {
      var start = $("#breathStart");
      if (start) start.addEventListener("click", startBreath);
      var stop = $("#breathStop");
      if (stop) stop.addEventListener("click", function () { stopBreath(); toast("Nicely done."); });
      $$("[data-pattern]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          breath.pattern = btn.getAttribute("data-pattern");
          $$("[data-pattern]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          breathMeta();
          var note = $("#patternNote");
          if (note) note.textContent = patternNote(PATTERNS[breath.pattern]);
          if (breath.running) startBreath();
        });
      });
    }

    function soundsPanel() {
      return '<div class="card">' +
        '<div class="row-between"><div><h2 class="card-title">Sound mixer</h2>' +
          '<p class="card-sub">Layer as many as you like. Headphones can help.</p></div>' +
          '<button type="button" class="btn sm" id="stopAllSounds">Stop all</button></div>' +
        '<div class="sound-list" style="margin-top:14px">' +
          D.ambience.map(function (a) {
            var playing = AudioEngine.isPlaying(a.id);
            return '<div class="sound-row' + (playing ? " is-playing" : "") + '" data-sound="' + a.id + '">' +
              '<span class="sound-emoji" aria-hidden="true">' + a.emoji + "</span>" +
              "<div><div class=\"sound-name\">" + esc(a.name) + "</div>" +
                '<input class="sound-vol" type="range" min="0" max="1" step="0.05" value="' +
                  (typeof state.settings.mix[a.id] === "number" ? state.settings.mix[a.id] : a.vol) +
                  '" data-vol="' + a.id + '" aria-label="' + esc(a.name) + ' volume"></div>' +
              '<button type="button" class="sound-play" data-play="' + a.id + '" aria-pressed="' + playing +
                '" aria-label="' + (playing ? "Pause " : "Play ") + esc(a.name) + '">' +
                icon(playing ? "pause" : "tri") + "</button>" +
            "</div>";
          }).join("") +
        "</div>" +
        '<p class="tiny muted" style="margin-top:12px">Nothing autoplays. Big files load only when you tap play.</p>' +
      "</div>";
    }

    function bindSounds() {
      $$("[data-play]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-play");
          var on = AudioEngine.toggle(id);
          var row = $('[data-sound="' + id + '"]', view);
          if (row) row.classList.toggle("is-playing", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
          btn.innerHTML = icon(on ? "pause" : "tri");
          var meta = null;
          D.ambience.forEach(function (a) { if (a.id === id) meta = a; });
          btn.setAttribute("aria-label", (on ? "Pause " : "Play ") + (meta ? meta.name : id));
        });
      });
      $$("[data-vol]", view).forEach(function (input) {
        input.addEventListener("input", function () {
          var id = input.getAttribute("data-vol");
          state.settings.mix[id] = parseFloat(input.value);
          AudioEngine.setVolume(id);
          save();
        });
      });
      var stop = $("#stopAllSounds");
      if (stop) {
        stop.addEventListener("click", function () {
          AudioEngine.stopAll();
          $$(".sound-row", view).forEach(function (row) { row.classList.remove("is-playing"); });
          $$("[data-play]", view).forEach(function (btn) {
            btn.setAttribute("aria-pressed", "false");
            btn.innerHTML = icon("tri");
          });
          toast("All sounds stopped.");
        });
      }
    }

    function groundPicksFor() {
      var key = groundScene + ":" + groundStep;
      if (!Array.isArray(groundFound[key])) groundFound[key] = [];
      return groundFound[key];
    }

    function groundCountText(found, total) {
      return found
        ? found + " of " + total + " tapped. It is fine to name something that is not in the list."
        : "Nothing tapped yet - tapping is optional. It is fine to name something that is not in the list.";
    }

    function groundPanel() {
      var scene = groundSceneData();
      var step = scene.steps[groundStep] || scene.steps[0];
      var picks = groundPicksFor();
      var sceneChips = GROUND_SCENES.map(function (s) {
        var on = s.id === scene.id;
        return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-ground-scene="' + s.id +
          '" aria-pressed="' + on + '">' + s.emoji + " " + esc(s.name) + "</button>";
      }).join("");

      var body;
      if (groundDone) {
        body = '<div class="ground-done">' +
          '<span class="ground-done-mark" aria-hidden="true">🌿</span>' +
          '<h2 class="card-title">You looked, listened and noticed.</h2>' +
          '<p class="card-sub" style="max-width:46ch;margin:8px auto 0">That is the whole exercise. If your body feels a little slower, it worked. ' +
            "If not, nothing is broken - you can go again or move on." + "</p>" +
          '<div class="row-wrap" style="justify-content:center;margin-top:16px">' +
            '<button type="button" class="btn primary" data-ground-again="1">Go again</button>' +
            '<button type="button" class="btn" data-ground-close="1">Back to the steps</button>' +
          "</div></div>";
      } else {
        body = '<div class="ground-stage">' +
          '<p class="eyebrow">' + esc(scene.name) + " · step " + (groundStep + 1) + " of " + scene.steps.length + "</p>" +
          '<div class="ground-num" aria-hidden="true">' + step.n + "</div>" +
          '<p class="breath-phase">' + esc(step.sense) + "</p>" +
          '<p class="ground-tip">' + esc(step.tip) + "</p>" +
          '<p class="label ground-pick-label">Soft ideas - tap any you find, or say your own out loud</p>' +
          '<div class="ground-picks">' + step.picks.map(function (p, i) {
            var on = picks.indexOf(i) > -1;
            return '<button type="button" class="ground-pick' + (on ? " is-on" : "") + '" data-ground-pick="' + i +
              '" aria-pressed="' + on + '">' +
              '<span class="ground-pick-img" aria-hidden="true">' + p.e + "</span>" +
              "<span>" + esc(p.l) + "</span>" +
              '<span class="ground-tick" aria-hidden="true">' + (on ? "✓" : "") + "</span></button>";
          }).join("") + "</div>" +
          '<p class="tiny muted" id="groundFoundCount">' + groundCountText(picks.length, step.picks.length) + "</p>" +
          '<div class="ground-dots" aria-hidden="true">' + scene.steps.map(function (_, i) {
            return '<span' + (i === groundStep ? ' class="is-on"' : "") + "></span>";
          }).join("") + "</div>" +
          '<div class="row-wrap ground-nav">' +
            '<button type="button" class="btn" id="groundBack"' + (groundStep === 0 ? " disabled" : "") + ">Back</button>" +
            '<button type="button" class="btn primary" id="groundNext">' +
              (groundStep === scene.steps.length - 1 ? "Finish" : "Next sense") + "</button>" +
            '<button type="button" class="btn ghost sm" data-ground-reset="1">Start again</button>' +
          "</div>" +
        "</div>";
      }

      return '<div class="card ground-card">' +
        '<div class="ground-top"><div><h2 class="card-title">Look around, slowly</h2>' +
          '<p class="card-sub">A 5-4-3-2-1 grounding exercise with a place to start from. Pick where you are, then work through one sense at a time.</p></div>' +
          '<span class="ground-badge">5 · 4 · 3 · 2 · 1</span></div>' +
        '<div class="ground-how"><h3 class="mini-title">How this works</h3><ol>' +
          "<li><strong>Pick where you are.</strong> At home, outside, in the car or in bed. The ideas change with the place, so it fits where you actually are.</li>" +
          "<li><strong>One sense at a time.</strong> Look, listen, touch or sniff slowly. There is no need to rush, and you do not have to find all of them.</li>" +
          "<li><strong>Tap a picture, or say your own.</strong> The pictures are only soft suggestions. Your answer can be anything you really notice.</li>" +
        "</ol></div>" +
        '<div class="chips" role="group" aria-label="Where are you?" style="margin-top:16px">' + sceneChips + "</div>" +
        body +
        '<p class="tiny muted center" style="margin-top:14px">If five of something feels too many, finding two is still doing it. You can stop after any step.</p>' +
      "</div>";
    }

    function bindGround() {
      $$("[data-ground-scene]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          groundScene = chip.getAttribute("data-ground-scene");
          groundStep = 0;
          groundDone = false;
          render();
        });
      });

      function resetGround() {
        groundStep = 0;
        groundDone = false;
        groundFound = {};
      }

      $$("[data-ground-reset]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          resetGround();
          render();
          toast("Back to the first sense.");
        });
      });
      $$("[data-ground-again]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          resetGround();
          render();
        });
      });
      $$("[data-ground-close]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          groundDone = false;
          render();
        });
      });

      if (groundDone) return;

      $$("[data-ground-pick]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var index = parseInt(btn.getAttribute("data-ground-pick"), 10);
          var picks = groundPicksFor();
          var at = picks.indexOf(index);
          if (at > -1) picks.splice(at, 1); else picks.push(index);
          var on = picks.indexOf(index) > -1;
          btn.classList.toggle("is-on", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
          var tick = btn.querySelector(".ground-tick");
          if (tick) tick.textContent = on ? "✓" : "";
          var count = $("#groundFoundCount");
          if (count) count.textContent = groundCountText(picks.length, btn.parentNode.children.length);
          AudioEngine.tick(on ? 0.55 : 0.3);
        });
      });

      var back = $("#groundBack");
      if (back) back.addEventListener("click", function () {
        if (groundStep > 0) { groundStep--; render(); }
      });
      var next = $("#groundNext");
      if (next) next.addEventListener("click", function () {
        if (groundStep < groundSceneData().steps.length - 1) { groundStep++; render(); }
        else { groundDone = true; render(); }
      });

      var step = groundSceneData().steps[groundStep];
      if (step) AudioEngine.say(step.sense + ". " + step.tip);
    }

    render();
  };

  function groundSceneData() {
    var found = null;
    GROUND_SCENES.forEach(function (s) { if (s.id === groundScene) found = s; });
    return found || GROUND_SCENES[0];
  }

  /* Four places, because "look around" lands differently in a car or in bed.
     The pictures are soft prompts, never a checklist to complete. */
  var GROUND_SCENES = [
    {
      id: "home", name: "At home", emoji: "🏠",
      intro: "Any room will do. You do not need to move, tidy or find anything special.",
      steps: [
        { n: 5, sense: "things you can see", tip: "Start close to you, then let your eyes travel further. Corners and small things count too.",
          picks: [{ e: "💡", l: "A lamp" }, { e: "🌱", l: "A plant" }, { e: "🖼️", l: "A picture" }, { e: "🚪", l: "A door" }] },
        { n: 4, sense: "things you can touch", tip: "Press your feet into the floor. Notice your back on the chair, your sleeves, the air on your skin.",
          picks: [{ e: "🧸", l: "Something soft" }, { e: "🛋️", l: "The sofa" }, { e: "👕", l: "Your sleeve" }, { e: "🦶", l: "Your feet" }] },
        { n: 3, sense: "things you can hear", tip: "Listen for a near sound, a far sound, and then your own breathing. Nothing has to be named perfectly.",
          picks: [{ e: "🕰️", l: "A clock" }, { e: "🚪", l: "A door" }, { e: "🐦", l: "A bird" }, { e: "🎵", l: "Music" }] },
        { n: 2, sense: "things you can smell", tip: "Take one slow sniff. If you cannot smell anything, think of two smells you like instead.",
          picks: [{ e: "🍞", l: "Toast" }, { e: "🧼", l: "Soap" }, { e: "🌸", l: "Flowers" }, { e: "☕", l: "A drink" }] },
        { n: 1, sense: "thing you can taste", tip: "Or one thing you are looking forward to today. A sip of water counts.",
          picks: [{ e: "💧", l: "Water" }, { e: "🍎", l: "An apple" }, { e: "🍫", l: "Chocolate" }, { e: "🥛", l: "Milk" }] }
      ]
    },
    {
      id: "outside", name: "Outside", emoji: "🌳",
      intro: "In a garden, on a walk or waiting at the gate. Cold, wet and windy days count.",
      steps: [
        { n: 5, sense: "things you can see", tip: "Look up, look down, then look far away. Clouds and cracks in the pavement are both allowed.",
          picks: [{ e: "🌳", l: "A tree" }, { e: "☁️", l: "A cloud" }, { e: "🐦", l: "A bird" }, { e: "🌸", l: "A flower" }] },
        { n: 4, sense: "things you can feel", tip: "The wind, the sun, your coat, the ground under your shoes. Notice which one you feel first.",
          picks: [{ e: "🌬️", l: "The wind" }, { e: "☀️", l: "The sun" }, { e: "🧥", l: "Your coat" }, { e: "🌿", l: "A leaf" }] },
        { n: 3, sense: "things you can hear", tip: "Near traffic, far traffic, birds, footsteps. Let the sounds come to you rather than hunting for them.",
          picks: [{ e: "🍃", l: "Leaves" }, { e: "🚗", l: "Traffic" }, { e: "🐕", l: "A dog" }, { e: "🌧️", l: "Rain" }] },
        { n: 2, sense: "things you can smell", tip: "Wet grass, flowers, a bakery, fresh air. One slow breath is plenty.",
          picks: [{ e: "🌸", l: "Flowers" }, { e: "🌿", l: "Grass" }, { e: "🍞", l: "A bakery" }, { e: "🌧️", l: "Rain" }] },
        { n: 1, sense: "thing you can taste", tip: "A drink, a snack, or the cold air on your tongue. Anything you can actually taste.",
          picks: [{ e: "💧", l: "Water" }, { e: "🍦", l: "Ice cream" }, { e: "🍎", l: "A snack" }, { e: "🍬", l: "A sweet" }] }
      ]
    },
    {
      id: "car", name: "In the car", emoji: "🚗",
      intro: "On a journey, waiting to set off, or parked somewhere. You can do this without touching anything.",
      steps: [
        { n: 5, sense: "things you can see", tip: "Look through the window and around the inside of the car. Lights, trees and clouds all count.",
          picks: [{ e: "🚗", l: "A car" }, { e: "🚦", l: "Lights" }, { e: "🌳", l: "Trees" }, { e: "☁️", l: "Clouds" }] },
        { n: 4, sense: "things you can feel", tip: "Your seat, the air from a vent, your coat, your own hands in your lap.",
          picks: [{ e: "🚗", l: "Your seat" }, { e: "🌬️", l: "The air" }, { e: "🧥", l: "Your coat" }, { e: "✋", l: "Your hands" }] },
        { n: 3, sense: "things you can hear", tip: "The engine, the radio, rain on the roof, a bird outside. Pick the quietest one you can find.",
          picks: [{ e: "🎵", l: "The radio" }, { e: "🌧️", l: "Rain" }, { e: "🚗", l: "The engine" }, { e: "🐦", l: "Birds" }] },
        { n: 2, sense: "things you can smell", tip: "Fresh air from the window, a drink, a snack. If nothing smells strong, that is an answer too.",
          picks: [{ e: "🌿", l: "Fresh air" }, { e: "🍊", l: "A freshener" }, { e: "☕", l: "A drink" }, { e: "🍞", l: "Snacks" }] },
        { n: 1, sense: "thing you can taste", tip: "A sip of water, a sweet, or the taste of the air. Anything you can notice.",
          picks: [{ e: "💧", l: "Water" }, { e: "🍬", l: "A sweet" }, { e: "🍎", l: "A snack" }, { e: "🍫", l: "Chocolate" }] }
      ]
    },
    {
      id: "bed", name: "In bed", emoji: "🛏️",
      intro: "For the end of the day, or a lie-down in the afternoon. You can stay exactly where you are.",
      steps: [
        { n: 5, sense: "things you can see", tip: "Let your eyes move slowly around the room. Shapes in the dark count, and so does the ceiling.",
          picks: [{ e: "🌙", l: "The moon" }, { e: "⭐", l: "Stars" }, { e: "🧸", l: "Teddy" }, { e: "💡", l: "A night light" }] },
        { n: 4, sense: "things you can touch", tip: "The mattress under you, the quilt, your pillow, your own feet. Let each one take a slow breath.",
          picks: [{ e: "🛏️", l: "Your bed" }, { e: "🧸", l: "Teddy" }, { e: "🧶", l: "Blanket" }, { e: "👣", l: "Your feet" }] },
        { n: 3, sense: "things you can hear", tip: "Rain, a clock, quiet music, the wind. Near sounds first, then far ones if you can.",
          picks: [{ e: "🌧️", l: "Rain" }, { e: "🕰️", l: "A clock" }, { e: "🎵", l: "Quiet music" }, { e: "🌬️", l: "The wind" }] },
        { n: 2, sense: "things you can smell", tip: "Soap, fresh sheets, a warm drink. Two slow sniffs, then let your shoulders drop.",
          picks: [{ e: "🧼", l: "Soap" }, { e: "🛏️", l: "Fresh sheets" }, { e: "🌸", l: "Flowers" }, { e: "☕", l: "A warm drink" }] },
        { n: 1, sense: "thing you can taste", tip: "A sip of water, a mint, or one thing you are looking forward to tomorrow.",
          picks: [{ e: "💧", l: "Water" }, { e: "🍬", l: "Mint" }, { e: "🍎", l: "A snack" }, { e: "🥛", l: "Milk" }] }
      ]
    }
  ];

  /* ---- Now & Next ---- */

  var PRESET_LABELS = { morning: "Morning", bedtime: "Bedtime", homework: "After school" };
  /* The name box is rebuilt on every change, so keep what was typed. */
  var routineNameDraft = "";

  /* One big Now card and a quiet Next strip. A child who finds handovers hard
     only ever has to read the first box; Next is a heads-up, not a second task. */
  function nowCardHTML(task) {
    if (!task) {
      return '<div class="now-card is-empty">' +
        '<span class="slot-label">Now</span>' +
        '<p class="now-empty">Nothing here yet. Pick one thing to start with.</p>' +
        '<div class="slot-actions"><button type="button" class="btn primary" data-addfocus="now">' +
          icon("plus") + " Add the first task</button></div>" +
      "</div>";
    }
    var secs = timerSecs();
    var total = Math.max(1, timerMins() * 60);
    var pct = clamp(Math.round(secs / total * 100), 0, 100);
    return '<div class="now-card">' +
      '<span class="slot-label">Now</span>' +
      '<div class="now-main">' +
        '<span class="now-emoji" aria-hidden="true">' + esc(task.emoji || "🎯") + "</span>" +
        '<span class="now-task">' + esc(task.name) + "</span>" +
      "</div>" +
      '<div class="timer-big' + (secs <= 30 ? " is-low" : "") + '" id="routineClock">' + clockText(secs) + "</div>" +
      '<div class="timer-bar" aria-hidden="true"><span id="timerFill" style="width:' + pct + '%"></span></div>' +
      '<div class="slot-actions">' +
        '<button type="button" class="btn primary" data-act="done">' + icon("check") + " Done</button>" +
        '<button type="button" class="btn" data-act="timer">' +
          (timerState.running ? icon("pause") + " Pause" : icon("clock") + " Start timer") + "</button>" +
        '<button type="button" class="btn ghost sm" data-act="reset">Reset time</button>' +
        '<button type="button" class="btn ghost sm" data-act="clear">Remove</button>' +
      "</div>" +
    "</div>";
  }

  function nextStripHTML(task) {
    return '<div class="next-strip">' +
      '<span class="slot-label">Next</span>' +
      (task
        ? '<span class="next-emoji" aria-hidden="true">' + esc(task.emoji || "🎯") + "</span>" +
          '<span class="next-task">' + esc(task.name) + "</span>" +
          '<button type="button" class="btn sm" data-act="promote">Make this Now</button>'
        : '<span class="next-empty">Nothing after that yet.</span>' +
          '<button type="button" class="btn sm" data-addfocus="next">' + icon("plus") + " Add something to follow</button>") +
    "</div>";
  }

  function routineBodyHTML() {
    var r = state.routine;
    var done = r.done.filter(function (d) { return isToday(d.ts); }).slice(0, 10);
    return '<div class="routine-plan">' +
        nowCardHTML(r.now) +
        nextStripHTML(r.next) +
      "</div>" +

      (r.queue.length
        ? '<div class="section-head"><h2 class="section-title">Then</h2>' +
            '<span class="tiny muted">' + r.queue.length + " more</span></div>" +
          '<div class="tasklist">' + r.queue.map(function (t, i) {
            return '<div class="task-row">' +
              '<span class="task-emoji" aria-hidden="true">' + esc(t.emoji || "🎯") + "</span>" +
              '<span class="task-name">' + esc(t.name) + "</span>" +
              '<button type="button" class="btn sm ghost" data-qnext="' + i + '">Make Next</button>' +
              '<button type="button" class="icon-btn" data-qdel="' + i + '" aria-label="Remove ' + esc(t.name) + '">' +
                icon("x") + "</button>" +
            "</div>";
          }).join("") + "</div>"
        : "") +

      '<p class="tiny muted center" style="margin-top:12px">Tap <strong>Done</strong> when a thing is finished - ' +
        "the next one moves up on its own.</p>" +

      '<div class="row-wrap" style="margin-top:14px">' +
        '<button type="button" class="btn sm" data-preset="morning">☀️ Morning</button>' +
        '<button type="button" class="btn sm" data-preset="bedtime">🌙 Bedtime</button>' +
        '<button type="button" class="btn sm" data-preset="homework">📚 After school</button>' +
      "</div>" +

      '<div class="card" id="addCard" style="margin-top:14px">' +
        '<h2 class="card-title">Add a task</h2>' +
        '<p class="card-sub">Tap one, or type your own. It joins the end of the list.</p>' +
        '<div class="chips" style="margin-top:12px">' +
          D.routineChips.map(function (c) {
            return '<button type="button" class="chip" data-chip="' + esc(c.name) + '" data-emoji="' + c.emoji + '">' +
              c.emoji + " " + esc(c.name) + "</button>";
          }).join("") +
        "</div>" +
        '<form class="row" id="addTaskForm" style="margin-top:12px;flex-wrap:wrap">' +
          '<input class="input" id="addTaskInput" placeholder="Type your own task…" maxlength="48" ' +
            'aria-label="New task name" style="flex:1;min-width:170px">' +
          '<button type="submit" class="btn primary">' + icon("plus") + " Add</button>" +
        "</form>" +
      "</div>" +

      '<div class="section-head"><h2 class="section-title">Saved lists</h2>' +
        '<span class="tiny muted">one tap on a busy morning</span></div>' +
      '<div class="card tight">' +
        '<div class="row" style="flex-wrap:wrap">' +
          '<input class="input" id="routineName" placeholder="Name this list" maxlength="32" ' +
            'aria-label="List name" style="flex:1;min-width:170px" value="' + esc(routineNameDraft) + '">' +
          '<button type="button" class="btn" id="saveRoutine">Save this list</button>' +
        "</div>" +
        (state.routines.length
          ? '<div class="stack" style="margin-top:12px">' + state.routines.map(function (rt) {
              return '<div class="saved-row">' +
                '<span class="task-emoji" aria-hidden="true">💾</span>' +
                '<span class="task-name">' + esc(rt.name) + "</span>" +
                '<span class="tiny muted">' + rt.items.length + (rt.items.length === 1 ? " task" : " tasks") + "</span>" +
                '<button type="button" class="btn sm" data-load="' + rt.id + '">Load</button>' +
                '<button type="button" class="icon-btn" data-delroutine="' + rt.id + '" aria-label="Delete ' + esc(rt.name) + '">' +
                  icon("trash") + "</button>" +
              "</div>";
            }).join("") + "</div>"
          : '<p class="tiny muted" style="margin-top:10px">Nothing saved yet. Build a list above, then save it here.</p>') +
      "</div>" +

      (done.length
        ? '<div class="section-head"><h2 class="section-title">Done today</h2>' +
            '<span class="badge mint">' + icon("star") + " " + (state.stickers || 0) + "</span></div>" +
          '<div class="tasklist">' + done.map(function (d) {
            return '<div class="task-row is-done"><span class="task-emoji" aria-hidden="true">' + esc(d.emoji || "⭐") + "</span>" +
              '<span class="task-name">' + esc(d.name) + '</span><span class="tiny muted">' + dateLabel(d.ts).replace("Today ", "") + "</span></div>";
          }).join("") + "</div>"
        : "") +

      '<div class="row" style="justify-content:center;margin-top:24px">' +
        '<button type="button" class="btn ghost sm" id="clearDay">Reset the whole day</button>' +
      "</div>";
  }

  VIEWS.routine = function (view) {
    view.innerHTML = pageHead("Now &amp; Next", "One thing at a time",
      "Now is the only thing that needs attention for the moment. Next is a heads-up, so the handover is not a surprise.") +
      ruleStripHTML() +
      '<div id="routineBody"></div>';
    var body = $("#routineBody");
    if (!body) return;

    function commit(message) {
      save();
      draw();
      if (message) toast(message);
    }

    function draw() {
      body.innerHTML = routineBodyHTML();
      bind();
      paintClock();
    }

    function bind() {
      $$("[data-chip]", body).forEach(function (chip) {
        chip.addEventListener("click", function () {
          addTask({ name: chip.getAttribute("data-chip"), emoji: chip.getAttribute("data-emoji"), mins: 5 });
          commit("Added " + chip.getAttribute("data-chip") + ".");
        });
      });

      var form = $("#addTaskForm", body);
      if (form) form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = $("#addTaskInput", body);
        var value = input ? input.value.trim() : "";
        if (!value) return;
        addTask({ name: value.slice(0, 48), emoji: "🎯", mins: 5 });
        commit("Added " + value.slice(0, 48) + ".");
      });

      $$("[data-act]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var act = btn.getAttribute("data-act");
          if (act === "done") {
            var now = state.routine.now;
            if (!now) return;
            state.routine.done.unshift({ name: now.name, emoji: now.emoji, ts: Date.now() });
            state.routine.done = state.routine.done.slice(0, 200);
            state.stickers = (state.stickers || 0) + 1;
            state.routine.now = null;
            normaliseRoutine();
            timerReset();
            AudioEngine.chime();
            commit("⭐ " + now.name + " done" + (state.routine.now ? ". Next up: " + state.routine.now.name : ""));
          } else if (act === "timer") {
            if (timerState.running) {
              timerPause();
              draw();
            } else {
              timerStart();
            }
          } else if (act === "reset") {
            timerReset();
            draw();
          } else if (act === "clear") {
            state.routine.now = null;
            normaliseRoutine();
            timerReset();
            commit("Removed from Now.");
          } else if (act === "promote") {
            if (!state.routine.next) return;
            if (state.routine.now) state.routine.queue.unshift(state.routine.now);
            state.routine.now = state.routine.next;
            state.routine.next = state.routine.queue.shift() || null;
            timerReset();
            commit(state.routine.now.name + " is up now.");
          }
        });
      });

      $$("[data-addfocus]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var card = $("#addCard", body);
          var input = $("#addTaskInput", body);
          if (card) {
            card.classList.add("is-target");
            setTimeout(function () { card.classList.remove("is-target"); }, 1800);
            if (typeof card.scrollIntoView === "function") {
              try { card.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
            }
          }
          if (input) input.focus();
          toast("Pick a task below, or type your own.");
        });
      });

      $$("[data-qnext]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = parseInt(btn.getAttribute("data-qnext"), 10);
          var task = state.routine.queue.splice(i, 1)[0];
          if (!task) return;
          if (state.routine.next) state.routine.queue.unshift(state.routine.next);
          state.routine.next = task;
          commit(task.name + " is next.");
        });
      });

      $$("[data-qdel]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = parseInt(btn.getAttribute("data-qdel"), 10);
          var removed = state.routine.queue.splice(i, 1)[0];
          commit(removed ? "Removed " + removed.name + "." : "Removed.");
        });
      });

      $$("[data-preset]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var key = btn.getAttribute("data-preset");
          var items = (PRESETS[key] || []).map(function (p) {
            return { name: p[0], emoji: p[1], mins: 5 };
          });
          if (!items.length) return;
          var hasPlan = !!(state.routine.now || state.routine.next || state.routine.queue.length);
          if (hasPlan && !window.confirm("Replace the list you have now with the " + (PRESET_LABELS[key] || key) + " one?")) return;
          state.routine.now = items.shift() || null;
          state.routine.next = items.shift() || null;
          state.routine.queue = items;
          timerReset();
          commit((PRESET_LABELS[key] || "New") + " list ready.");
        });
      });

      var nameInput = $("#routineName", body);
      if (nameInput) nameInput.addEventListener("input", function () { routineNameDraft = nameInput.value; });

      var saveBtn = $("#saveRoutine", body);
      if (saveBtn) saveBtn.addEventListener("click", function () {
        var input = $("#routineName", body);
        var name = (input ? input.value : routineNameDraft).trim();
        if (!name) { if (input) input.focus(); toast("Give the list a name first."); return; }
        var items = [];
        if (state.routine.now) items.push(state.routine.now);
        if (state.routine.next) items.push(state.routine.next);
        items = items.concat(state.routine.queue);
        if (!items.length) { toast("Add a task or two first."); return; }
        state.routines.unshift({ id: uid(), name: name.slice(0, 32), items: items.slice(0, 20) });
        state.routines = state.routines.slice(0, 8);
        routineNameDraft = "";
        commit("Saved “" + name.slice(0, 32) + "”.");
      });

      $$("[data-load]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-load");
          var found = null;
          state.routines.forEach(function (r) { if (r.id === id) found = r; });
          if (!found) return;
          var items = found.items.slice();
          state.routine.now = items.shift() || null;
          state.routine.next = items.shift() || null;
          state.routine.queue = items;
          timerReset();
          commit("Loaded " + found.name + ".");
        });
      });

      $$("[data-delroutine]", body).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-delroutine");
          state.routines = state.routines.filter(function (r) { return r.id !== id; });
          commit("List deleted.");
        });
      });

      var clear = $("#clearDay", body);
      if (clear) clear.addEventListener("click", function () {
        if (!window.confirm("Clear Now, Next, the list and today's done list? Saved lists are kept.")) return;
        state.routine.now = null;
        state.routine.next = null;
        state.routine.queue = [];
        state.routine.done = [];
        timerReset();
        commit("Fresh start.");
      });
    }

    redraw = draw;
    draw();
  };

  /* ---- Focus ---- */

  /* Energy first: the active game is the first thing a wired-up child meets. */
  var focusTab = "whack";

  VIEWS.focus = function (view) {
    function render() {
      stopWhack();
      stopSpin();
      view.innerHTML = pageHead("Focus", "Busy hands, calmer head",
        "One to burn energy off, one to settle. Pick by what the moment needs, not by what looks tidiest.") +
        '<div class="pill-toggle" role="group" aria-label="Focus tools">' +
          '<button type="button" data-ftab="whack" aria-pressed="' + (focusTab === "whack") + '">Wac-A-Zac</button>' +
          '<button type="button" data-ftab="spinner" aria-pressed="' + (focusTab === "spinner") + '">Spinner</button>' +
        "</div>" +
        '<p class="calm-lead">' + (focusTab === "whack"
          ? "For burning off energy. Standing up is allowed, and nothing is at stake."
          : "For settling down, or busy hands that need something quiet to do.") + "</p>" +
        '<div id="focusPanel">' + (focusTab === "whack" ? whackPanel() : spinnerPanel()) + "</div>";

      $$("[data-ftab]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          focusTab = btn.getAttribute("data-ftab");
          render();
        });
      });

      if (focusTab === "whack") bindWhack();
      else bindSpinner();
    }

    function spinnerPanel() {
      var topic = spinTopic();
      var chips = (D.spinTopics || []).map(function (t) {
        var on = t.id === topic.id;
        return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-spin-topic="' + t.id +
          '" aria-pressed="' + on + '">' + t.emoji + " " + esc(t.name) + "</button>";
      }).join("");
      return '<div class="card spinner-card">' +
        '<div class="row-between" style="gap:12px">' +
          '<div><h2 class="card-title">What shall we pick?</h2>' +
            '<p class="card-sub">' + esc(topic.note || "Spin it and let the wheel decide.") + "</p></div>" +
          '<button type="button" class="btn sm ghost" id="spinShuffle">' + icon("shuffle") + " New choices</button>" +
        "</div>" +
        '<div class="chips" role="group" aria-label="What to spin for" style="margin-top:14px">' + chips + "</div>" +
        '<div class="spinner-stage">' + wheelSVG() + "</div>" +
        '<div class="spin-result" id="spinResult" aria-live="polite">' +
          '<span class="spin-result-text"><small>Ready when you are</small><strong>Give it a spin</strong></span>' +
        "</div>" +
        '<div class="row-wrap" style="justify-content:center;margin-top:14px">' +
          '<button type="button" class="btn primary lg" id="spinNow">' + icon("shuffle") + " Spin</button>" +
          '<button type="button" class="btn ghost" id="spinStop">Stop</button>' +
        "</div>" +
        '<p class="tiny muted center" style="margin-top:10px">Drag the wheel, or press Spin. It always tells you what it landed on.</p>' +
      "</div>" +
      '<div class="grid grid-2" style="margin-top:14px">' +
        '<div class="card tight"><h2 class="card-title">Ways to use it</h2>' +
          '<ul class="stack" style="margin-top:10px;color:var(--ink-2);font-size:0.94rem">' +
            "<li>🍽️ Tea, snack or takeaway - the wheel decides, not the argument.</li>" +
            "<li>🎮 Which game next, when nobody can agree.</li>" +
            "<li>🌳 What to do outside, when 'I&rsquo;m bored' arrives.</li>" +
            "<li>🌬️ A slow one: breathe out each time it passes the top.</li>" +
          "</ul>" +
        "</div>" +
        '<div class="card tight"><h2 class="card-title">Make it feel nice</h2>' +
          '<p class="card-sub">Sit comfortably. Let your shoulders drop. Spin it as fast or slow as you like.</p>' +
          '<p class="tiny muted" style="margin-top:10px">No result is a bad result. If the wheel picks something you cannot do, spin again - that is allowed too.</p>' +
        "</div>" +
      "</div>";
    }

    function whackPanel() {
      var theme = whackTheme();
      var level = whackLevel();
      var holes = "";
      for (var i = 0; i < 9; i++) {
        holes += '<button type="button" class="hole" data-hole="' + i + '" aria-label="Spot ' + (i + 1) + '">' +
          '<span class="mole" aria-hidden="true">' + theme.emoji + "</span></button>";
      }
      var themes = WHACK_THEMES.map(function (t) {
        return '<button type="button" class="chip sm' + (t.id === theme.id ? " is-on" : "") +
          '" data-whack-theme="' + t.id + '" aria-pressed="' + (t.id === theme.id) + '">' +
          t.emoji + " " + esc(t.name) + "</button>";
      }).join("");
      var levels = WHACK_LEVELS.map(function (l) {
        return '<button type="button" class="chip sm' + (l.id === level.id ? " is-on" : "") +
          '" data-whack-level="' + l.id + '" aria-pressed="' + (l.id === level.id) + '">' +
          esc(l.name) + " · " + l.secs + "s</button>";
      }).join("");
      return '<div class="card">' +
        '<div class="whack-hud">' +
          '<div class="row" style="gap:18px">' +
            '<div class="stat"><span class="stat-num" id="whackScore">0</span><span class="stat-label">Score</span></div>' +
            '<div class="stat"><span class="stat-num" id="whackTime">' + level.secs + '</span><span class="stat-label">Seconds</span></div>' +
            '<div class="stat"><span class="stat-num" id="whackBest">' + whackBest() + '</span><span class="stat-label">Best</span></div>' +
          "</div>" +
          '<div class="row" style="gap:8px">' +
            '<button type="button" class="btn primary" id="whackStart">' + icon("tri") + " Play</button>" +
            '<button type="button" class="btn ghost" id="whackPause" hidden>Pause</button>' +
          "</div>" +
        "</div>" +
        '<p class="card-sub" id="whackMsg" aria-live="polite">' + esc(theme.line) + "</p>" +
        '<div class="whack-legend">' +
          '<span>' + theme.bonus + " Gold <strong>5</strong></span>" +
          '<span>' + theme.mover + " Mover <strong>2</strong></span>" +
          '<span>' + theme.grump + " Grump <strong>−1</strong> - leave it</span>" +
        "</div>" +
        '<div class="whack-grid" style="margin-top:12px">' + holes + "</div>" +
        '<div class="whack-picks">' +
          '<div class="row-wrap"><span class="label">Who</span>' + themes + "</div>" +
          '<div class="row-wrap"><span class="label">How long</span>' + levels + "</div>" +
        "</div>" +
        '<hr class="divider">' +
        '<div class="row-between"><h2 class="card-title">Best rounds</h2>' +
          '<span class="tiny muted">Top 5, on this device</span></div>' +
        '<div id="whackBoard">' + whackBoardHTML() + "</div>" +
        '<p class="tiny muted" style="margin-top:12px">Nothing is lost if you miss one. ' +
          "Gold is worth 5, movers are worth 2, and the grump costs you one - so leave it be.</p>" +
      "</div>";
    }

    function bindSpinner() {
      bindWheel();
      var btn = $("#spinNow");
      if (btn) btn.addEventListener("click", spinButton);
      var halt = $("#spinStop");
      if (halt) halt.addEventListener("click", function () {
        stopSpin();
        paintWheel();
        spinSettled();
      });
      var again = $("#spinShuffle");
      if (again) again.addEventListener("click", function () {
        stopSpin();
        spin.rot = 0;
        spin.items = pickFaces();
        paintFaces();
        paintWheel();
        var out = $("#spinResult");
        if (out) {
          out.innerHTML = '<span class="spin-result-text"><small>New choices</small><strong>Ready to spin</strong></span>';
          out.classList.remove("is-set");
        }
        AudioEngine.tick(0.6);
      });
      $$("[data-spin-topic]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          state.settings.spinTopic = chip.getAttribute("data-spin-topic");
          save();
          stopSpin();
          spin.rot = 0;
          spin.items = pickFaces();
          render();
        });
      });
      paintWheel();
    }

    function bindWhack() {
      $$(".hole", view).forEach(function (hole) {
        hole.addEventListener("click", function () { hitWhack(hole); });
      });
      var start = $("#whackStart");
      if (start) start.addEventListener("click", startWhack);
      var pause = $("#whackPause");
      if (pause) pause.addEventListener("click", toggleWhackPause);
      $$("[data-whack-theme]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (whack.running) { toast("Finish this round first."); return; }
          state.settings.whackTheme = chip.getAttribute("data-whack-theme");
          save();
          render();
        });
      });
      $$("[data-whack-level]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          if (whack.running) { toast("Finish this round first."); return; }
          state.settings.whackLevel = chip.getAttribute("data-whack-level");
          save();
          render();
        });
      });
    }

    render();
  };

  /* ---- Journal ---- */

  var journalTab = "mood";
  var journalUnlocked = false;
  var holdTimer = null;
  var moodPick = 0;
  var triggerPicks = [];
  var helpPicks = [];
  /* Which saved entry is open for editing, and the working choices while it is open. */
  var journalEdit = null;

  VIEWS.journal = function (view) {
    function render() {
      view.innerHTML = pageHead("Journal", "How is it really going?",
        "A quick way to notice how things are going. It stays on this device, and the detail is kept for grown-ups.") +
        '<div class="pill-toggle" role="group" aria-label="Journal type">' +
          '<button type="button" data-jtab="mood" aria-pressed="' + (journalTab === "mood") + '">How I feel</button>' +
          '<button type="button" data-jtab="behaviour" aria-pressed="' + (journalTab === "behaviour") + '">Tricky moments</button>' +
          '<button type="button" data-jtab="grownups" aria-pressed="' + (journalTab === "grownups") + '">Grown-ups</button>' +
        "</div>" +
        '<div style="margin-top:16px">' + panelHTML() + "</div>";

      $$("[data-jtab]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          journalTab = btn.getAttribute("data-jtab");
          render();
        });
      });

      if (journalTab === "behaviour") bindBehaviour();
      else if (journalTab === "grownups") bindGrownups();
      else bindMood();
    }

    function panelHTML() {
      if (journalTab === "behaviour") return behaviourPanel();
      if (journalTab === "grownups") return grownupsPanel();
      return moodPanel();
    }

    function weekChart() {
      var cols = "";
      for (var i = 6; i >= 0; i--) {
        var ts = Date.now() - i * 86400000;
        var key = dayKey(ts);
        var vals = state.moods.filter(function (m) { return dayKey(m.ts) === key; })
          .map(function (m) { return m.v; });
        var avg = vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : 0;
        var height = vals.length ? Math.max(12, Math.round(avg / 5 * 100)) : 4;
        cols += '<div class="chart-col">' +
          '<div class="chart-bar' + (vals.length ? "" : " is-empty") + '" style="height:' + height + '%"></div>' +
          '<span class="chart-day">' + D.dayNames[new Date(ts).getDay()] + "</span></div>";
      }
      return '<div class="chart" role="img" aria-label="Average mood for each of the last seven days">' + cols + "</div>";
    }

    function moodEntriesHTML(list, withManage) {
      if (!list.length) {
        return '<div class="empty"><strong>Nothing saved yet.</strong>Check-ins you save will be kept here.</div>';
      }
      return '<div class="timeline">' + list.map(function (e) {
        if (withManage && journalEdit && journalEdit.kind === "mood" && journalEdit.id === e.id) {
          return '<article class="entry entry-editing">' + moodEditHTML(e) + "</article>";
        }
        var note = e.note ? '<p class="entry-note">' + esc(e.note) + "</p>" : "";
        return '<article class="entry">' +
          '<span class="entry-face">' + D.face(e.v) + "</span>" +
          '<div class="entry-body"><div class="entry-head">' +
            '<span class="entry-mood">' + esc(D.mood(e.v).label) + "</span>" +
            '<span class="entry-time">' + dateLabel(e.ts) + "</span></div>" + note +
          "</div>" +
          (withManage
            ? '<div class="entry-actions">' +
                '<button type="button" class="icon-btn sm" data-edit-mood="' + e.id + '" aria-label="Edit this check-in">' + icon("sliders") + "</button>" +
                '<button type="button" class="icon-btn sm" data-del-mood="' + e.id + '" aria-label="Delete this check-in">' + icon("trash") + "</button>" +
              "</div>"
            : "") +
        "</article>";
      }).join("") + "</div>";
    }

    function moodEditHTML(e) {
      var picked = journalEdit && typeof journalEdit.v === "number" ? journalEdit.v : e.v;
      return '<div class="entry-body entry-edit">' +
        '<p class="entry-mood">Edit check-in <span class="entry-time">' + dateLabel(e.ts) + "</span></p>" +
        '<div class="field"><span class="label">How did it feel?</span>' +
          '<div class="chips" role="group" aria-label="Mood">' + D.moods.map(function (m) {
            var on = m.v === picked;
            return '<button type="button" class="chip sm' + (on ? " is-on" : "") + '" data-edit-mood-v="' + m.v +
              '" aria-pressed="' + on + '">' + esc(m.label) + "</button>";
          }).join("") + "</div></div>" +
        '<div class="field"><label class="label" for="editMoodNote">What happened?</label>' +
          '<textarea class="textarea" id="editMoodNote" maxlength="240" placeholder="Optional.">' + esc(e.note || "") + "</textarea></div>" +
        '<div class="row-wrap">' +
          '<button type="button" class="btn primary sm" data-save-mood="' + e.id + '">Save changes</button>' +
          '<button type="button" class="btn ghost sm" data-cancel-edit="1">Cancel</button>' +
        "</div>";
    }

    function moodPanel() {
      return '<div class="grid grid-2">' +
        '<div class="card">' +
          '<h2 class="card-title">Add a check-in</h2>' +
          '<p class="card-sub">A face is enough. A few words only if you feel like it.</p>' +
          '<div class="composer" style="margin-top:12px">' +
            '<div class="mood-picker" role="group" aria-label="Mood">' + moodButtons(moodPick) + "</div>" +
            '<div class="field"><label class="label" for="moodNote">What happened?</label>' +
              '<textarea class="textarea" id="moodNote" maxlength="240" placeholder="Optional - a sentence is enough."></textarea></div>' +
            '<button type="button" class="btn primary" id="saveMood">Save check-in</button>' +
          "</div>" +
        "</div>" +
        '<div class="card">' +
          '<h2 class="card-title">This week</h2>' +
          '<p class="card-sub">Average mood per day. A mixed week is still a week.</p>' +
          '<div style="margin-top:14px">' + weekChart() + "</div>" +
          '<hr class="divider">' +
          '<p class="tiny muted">Earlier notes - and the buttons to edit or delete them - are on the Grown-ups tab, so they are not on show.</p>' +
        "</div>" +
      "</div>" +
      (state.settings.showHistory
        ? '<div class="section-head"><h2 class="section-title">Earlier check-ins</h2>' +
            '<span class="tiny muted">' + state.moods.length + " kept</span></div>" +
          moodEntriesHTML(state.moods.slice().reverse().slice(0, 10), false)
        : "");
    }

    function grownupsPanel() {
      if (!journalUnlocked) {
        return '<div class="card journal-gate">' +
          '<h2 class="card-title">Grown-ups area</h2>' +
          '<p class="card-sub">Earlier check-ins, notes and the buttons to manage them live here. ' +
            "The weekly average stays on the other tabs either way.</p>" +
          '<button type="button" class="btn primary" id="journalUnlock">Press and hold to open</button>' +
          '<p class="tiny muted" style="margin-top:10px">Hold for a second or two. It is a pause, not a password - ' +
            "but it keeps hard moments out of a child's eyeline.</p>" +
        "</div>";
      }
      var moods = state.moods.slice().reverse();
      var moments = state.behaviour.slice().reverse();
      return '<div class="card">' +
        '<div class="row-between"><div><h2 class="card-title">Grown-ups</h2>' +
          '<p class="card-sub">' + state.moods.length + " check-in" + (state.moods.length === 1 ? "" : "s") + " · " +
            state.behaviour.length + " moment" + (state.behaviour.length === 1 ? "" : "s") + " stored on this device.</p></div>" +
          '<button type="button" class="btn sm" id="journalLock">Hide</button></div>' +
        '<label class="switch" style="margin-top:16px">' +
          '<input type="checkbox" id="showHistory"' + (state.settings.showHistory ? " checked" : "") + ">" +
          '<span class="track"><span class="thumb"></span></span>' +
          '<span class="switch-text"><strong>Show earlier check-ins on the Journal tab</strong>' +
            '<small>Off by default. The weekly average shows either way.</small></span></label>' +
        '<div class="row-wrap" style="margin-top:16px">' +
          '<button type="button" class="btn" id="journalExport">' + icon("download") + " Download a copy</button>" +
          '<button type="button" class="btn danger" id="clearMoods">Delete check-ins</button>' +
          '<button type="button" class="btn danger" id="clearMoments">Delete moments</button>' +
        "</div>" +
        '<p class="tiny muted" style="margin-top:10px">Deleting clears them from this device. Download a copy first if you want to keep them.</p>' +
      "</div>" +
      '<div class="section-head"><h2 class="section-title">Earlier check-ins</h2>' +
        '<span class="tiny muted">' + moods.length + " kept</span></div>" +
      moodEntriesHTML(moods, true) +
      '<div class="section-head"><h2 class="section-title">Tricky moments</h2>' +
        '<span class="tiny muted">' + moments.length + " logged</span></div>" +
      momentEntriesHTML(moments, true);
    }

    function bindGrownups() {
      var unlock = $("#journalUnlock", view);
      if (unlock) {
        function begin(e) {
          if (holdTimer) clearTimeout(holdTimer);
          unlock.classList.add("is-holding");
          if (e && e.pointerId != null && unlock.setPointerCapture) {
            try { unlock.setPointerCapture(e.pointerId); } catch (err) {}
          }
          holdTimer = setTimeout(function () {
            holdTimer = null;
            journalUnlocked = true;
            render();
          }, 1400);
        }
        function cancel() {
          if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
          unlock.classList.remove("is-holding");
        }
        unlock.addEventListener("pointerdown", begin);
        unlock.addEventListener("pointerup", cancel);
        unlock.addEventListener("pointerleave", cancel);
        unlock.addEventListener("pointercancel", cancel);
        unlock.addEventListener("keydown", function (e) {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); begin(); }
        });
        unlock.addEventListener("keyup", cancel);
        unlock.addEventListener("blur", cancel);
        return;
      }

      var lock = $("#journalLock", view);
      if (lock) lock.addEventListener("click", function () {
        journalUnlocked = false;
        render();
        toast("Grown-ups area hidden.");
      });

      var show = $("#showHistory", view);
      if (show) show.addEventListener("change", function () {
        state.settings.showHistory = show.checked;
        save();
        toast(show.checked ? "Earlier check-ins will show on the Journal tab." : "Earlier check-ins hidden again.");
      });

      var exp = $("#journalExport", view);
      if (exp) exp.addEventListener("click", downloadData);

      bindEditors();

      var clearMoods = $("#clearMoods", view);
      if (clearMoods) clearMoods.addEventListener("click", function () {
        if (!state.moods.length) { toast("No check-ins to delete."); return; }
        if (!window.confirm("Delete all " + state.moods.length + " check-in entries on this device? This cannot be undone.")) return;
        state.moods = [];
        save();
        render();
        toast("Check-ins deleted.");
      });

      var clearMoments = $("#clearMoments", view);
      if (clearMoments) clearMoments.addEventListener("click", function () {
        if (!state.behaviour.length) { toast("No moments to delete."); return; }
        if (!window.confirm("Delete all " + state.behaviour.length + " logged moments on this device? This cannot be undone.")) return;
        state.behaviour = [];
        save();
        render();
        toast("Moments deleted.");
      });

      $$("[data-del-mood]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-del-mood");
          state.moods = state.moods.filter(function (m) { return m.id !== id; });
          save();
          render();
          toast("Entry deleted.");
        });
      });
      $$("[data-del-beh]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-del-beh");
          state.behaviour = state.behaviour.filter(function (b) { return b.id !== id; });
          save();
          render();
          toast("Entry deleted.");
        });
      });
    }

    function bindMood() {
      $$(".mood-btn", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          moodPick = parseInt(btn.getAttribute("data-mood"), 10);
          $$(".mood-btn", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      var saveBtn = $("#saveMood");
      if (saveBtn) saveBtn.addEventListener("click", function () {
        if (!moodPick) { toast("Pick a face first."); return; }
        var note = $("#moodNote");
        state.moods.push({
          id: uid(), ts: Date.now(), v: moodPick,
          note: note ? note.value.trim().slice(0, 240) : "", kind: "mood"
        });
        if (state.moods.length > 500) state.moods = state.moods.slice(-500);
        moodPick = 0;
        save();
        render();
        toast("Saved. Thank you for sharing.");
      });

      $$("[data-del-mood]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-del-mood");
          state.moods = state.moods.filter(function (m) { return m.id !== id; });
          save();
          render();
          toast("Entry deleted.");
        });
      });
    }

    /* Editing works on the saved entry itself. The working copy lives in
       journalEdit, so cancelling really does put it back as it was. */
    function bindEditors() {
      $$("[data-edit-mood]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-edit-mood");
          var entry = null;
          state.moods.forEach(function (m) { if (m.id === id) entry = m; });
          if (!entry) return;
          journalEdit = { kind: "mood", id: id, v: entry.v };
          render();
        });
      });

      $$("[data-edit-beh]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-edit-beh");
          var entry = null;
          state.behaviour.forEach(function (b) { if (b.id === id) entry = b; });
          if (!entry) return;
          journalEdit = {
            kind: "behaviour", id: id,
            triggers: (entry.triggers || []).slice(),
            helps: (entry.helps || []).slice()
          };
          render();
        });
      });

      $$("[data-cancel-edit]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          journalEdit = null;
          render();
        });
      });

      $$("[data-edit-mood-v]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!journalEdit) return;
          journalEdit.v = parseInt(btn.getAttribute("data-edit-mood-v"), 10);
          $$("[data-edit-mood-v]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      ["edit-trig", "edit-help"].forEach(function (attr) {
        $$("[data-" + attr + "]", view).forEach(function (chip) {
          chip.addEventListener("click", function () {
            if (!journalEdit) return;
            var key = attr === "edit-trig" ? "triggers" : "helps";
            var name = chip.getAttribute("data-" + attr);
            var list = journalEdit[key] || (journalEdit[key] = []);
            var i = list.indexOf(name);
            if (i > -1) list.splice(i, 1); else list.push(name);
            var on = list.indexOf(name) > -1;
            chip.classList.toggle("is-on", on);
            chip.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      $$("[data-save-mood]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!journalEdit) return;
          var id = btn.getAttribute("data-save-mood");
          var ta = $("#editMoodNote", view);
          var v = journalEdit.v;
          state.moods = state.moods.map(function (m) {
            if (m.id !== id) return m;
            return Object.assign({}, m, { v: v, note: ta ? ta.value.trim().slice(0, 240) : m.note });
          });
          journalEdit = null;
          save();
          render();
          toast("Check-in updated.");
        });
      });

      $$("[data-save-beh]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (!journalEdit) return;
          var id = btn.getAttribute("data-save-beh");
          var ta = $("#editBehNote", view);
          var next = {
            triggers: (journalEdit.triggers || []).slice(),
            helps: (journalEdit.helps || []).slice(),
            note: ta ? ta.value.trim().slice(0, 300) : ""
          };
          state.behaviour = state.behaviour.map(function (b) {
            if (b.id !== id) return b;
            return Object.assign({}, b, next);
          });
          journalEdit = null;
          save();
          render();
          toast("Moment updated.");
        });
      });
    }

    function chipRow(list, picks, attr) {
      return list.map(function (name) {
        var on = picks.indexOf(name) > -1;
        return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-' + attr + '="' + esc(name) +
          '" aria-pressed="' + on + '">' + esc(name) + "</button>";
      }).join("");
    }

    function momentEntriesHTML(list, withManage) {
      if (!list.length) {
        return '<div class="empty"><strong>Nothing logged.</strong>Moments you save will be kept here.</div>';
      }
      return '<div class="timeline">' + list.map(function (b) {
        if (withManage && journalEdit && journalEdit.kind === "behaviour" && journalEdit.id === b.id) {
          return '<article class="entry entry-editing">' + momentEditHTML(b) + "</article>";
        }
        var tags = (b.triggers || []).map(function (t) {
          return '<span class="badge">' + esc(t) + "</span>";
        }).concat((b.helps || []).map(function (h) {
          return '<span class="badge mint">' + esc(h) + "</span>";
        })).join("");
        return '<article class="entry">' +
          '<span class="entry-face" aria-hidden="true">📝</span>' +
          '<div class="entry-body"><div class="entry-head">' +
            '<span class="entry-mood">Tricky moment</span>' +
            '<span class="entry-time">' + dateLabel(b.ts) + "</span></div>" +
            (b.note ? '<p class="entry-note">' + esc(b.note) + "</p>" : "") +
            '<div class="entry-tags">' + tags + "</div></div>" +
          (withManage
            ? '<div class="entry-actions">' +
                '<button type="button" class="icon-btn sm" data-edit-beh="' + b.id + '" aria-label="Edit this moment">' + icon("sliders") + "</button>" +
                '<button type="button" class="icon-btn sm" data-del-beh="' + b.id + '" aria-label="Delete this moment">' + icon("trash") + "</button>" +
              "</div>"
            : "") +
        "</article>";
      }).join("") + "</div>";
    }

    function momentEditHTML(b) {
      var triggers = journalEdit && journalEdit.triggers ? journalEdit.triggers : (b.triggers || []).slice();
      var helps = journalEdit && journalEdit.helps ? journalEdit.helps : (b.helps || []).slice();
      return '<div class="entry-body entry-edit">' +
        '<p class="entry-mood">Edit moment <span class="entry-time">' + dateLabel(b.ts) + "</span></p>" +
        '<div class="field"><span class="label">What set it off?</span>' +
          '<div class="chips" role="group" aria-label="Triggers">' + chipRow(D.triggers, triggers, "edit-trig") + "</div></div>" +
        '<div class="field"><span class="label">What helped?</span>' +
          '<div class="chips" role="group" aria-label="What helped">' + chipRow(D.helps, helps, "edit-help") + "</div></div>" +
        '<div class="field"><label class="label" for="editBehNote">Anything else?</label>' +
          '<textarea class="textarea" id="editBehNote" maxlength="300">' + esc(b.note || "") + "</textarea></div>" +
        '<div class="row-wrap">' +
          '<button type="button" class="btn primary sm" data-save-beh="' + b.id + '">Save changes</button>' +
          '<button type="button" class="btn ghost sm" data-cancel-edit="1">Cancel</button>' +
        "</div>";
    }

    function behaviourPanel() {
      var week = state.behaviour.filter(function (b) { return Date.now() - b.ts < 7 * 86400000; });
      var triggerCount = {};
      var helpCount = {};
      week.forEach(function (b) {
        (b.triggers || []).forEach(function (t) { triggerCount[t] = (triggerCount[t] || 0) + 1; });
        (b.helps || []).forEach(function (h) { helpCount[h] = (helpCount[h] || 0) + 1; });
      });
      /* Counted, ranked and listed, so a pattern is visible rather than hidden
         behind one "most common" label. Every saved moment is editable below. */
      function topList(counts, cls, empty) {
        var keys = Object.keys(counts).sort(function (a, b) {
          return counts[b] - counts[a] || a.localeCompare(b);
        });
        if (!keys.length) return '<p class="tiny muted">' + esc(empty) + "</p>";
        return '<ul class="top-list">' + keys.slice(0, 4).map(function (k) {
          return '<li><span class="badge ' + cls + '">' + esc(k) + "</span>" +
            '<span class="top-count">' + counts[k] + "×</span></li>";
        }).join("") + "</ul>";
      }

      return '<div class="grid grid-2">' +
        '<div class="card">' +
          '<h2 class="card-title">Log a moment</h2>' +
          '<p class="card-sub">No blame, no judgement - just the facts.</p>' +
          '<div class="composer" style="margin-top:12px">' +
            '<div><p class="label" style="margin-bottom:8px">What set it off?</p>' +
              '<div class="chips" role="group" aria-label="Triggers">' + chipRow(D.triggers, triggerPicks, "trig") + "</div></div>" +
            '<div><p class="label" style="margin-bottom:8px">What helped?</p>' +
              '<div class="chips" role="group" aria-label="What helped">' + chipRow(D.helps, helpPicks, "help") + "</div></div>" +
            '<div class="field"><label class="label" for="behNote">Anything else?</label>' +
              '<textarea class="textarea" id="behNote" maxlength="300" placeholder="Optional. What you saw, what you tried."></textarea></div>' +
            '<button type="button" class="btn primary" id="saveBeh">Save entry</button>' +
          "</div>" +
        "</div>" +
        '<div class="card">' +
          '<h2 class="card-title">This week</h2>' +
          (week.length
            ? '<p class="card-sub" style="margin-top:4px">' + week.length + " moment" + (week.length === 1 ? "" : "s") +
                " logged this week. The full list is below, and every entry can be edited." + "</p>" +
              '<div class="top-group"><h3 class="mini-title">What set things off</h3>' +
                topList(triggerCount, "coral", "No triggers tagged yet.") + "</div>" +
              '<div class="top-group"><h3 class="mini-title">What helped</h3>' +
                topList(helpCount, "mint", "No helps tagged yet.") + "</div>" +
              '<button type="button" class="btn sm" data-review-entries="1" style="margin-top:14px">' +
                icon("sliders") + " Review and edit saved moments</button>"
            : '<p class="card-sub" style="margin-top:10px">Log a few moments and the patterns will appear here.</p>') +
          '<hr class="divider">' +
          '<p class="tiny muted">This journal is for your own notes. It is not a diagnosis.</p>' +
        "</div>" +
      "</div>" +
      '<p class="tiny muted center" style="margin-top:16px">Saved moments are kept on the <strong>Grown-ups</strong> tab, ' +
        "where you can edit or delete them, so a child is not reading back over the hard ones.</p>";
    }

    function bindBehaviour() {
      $$("[data-trig]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          var name = chip.getAttribute("data-trig");
          var i = triggerPicks.indexOf(name);
          if (i > -1) triggerPicks.splice(i, 1); else triggerPicks.push(name);
          chip.classList.toggle("is-on");
          chip.setAttribute("aria-pressed", triggerPicks.indexOf(name) > -1 ? "true" : "false");
        });
      });
      $$("[data-help]", view).forEach(function (chip) {
        chip.addEventListener("click", function () {
          var name = chip.getAttribute("data-help");
          var i = helpPicks.indexOf(name);
          if (i > -1) helpPicks.splice(i, 1); else helpPicks.push(name);
          chip.classList.toggle("is-on");
          chip.setAttribute("aria-pressed", helpPicks.indexOf(name) > -1 ? "true" : "false");
        });
      });
      var review = $("[data-review-entries]", view);
      if (review) review.addEventListener("click", function () {
        journalTab = "grownups";
        render();
      });

      var saveBtn = $("#saveBeh");
      if (saveBtn) saveBtn.addEventListener("click", function () {
        var note = $("#behNote");
        if (!triggerPicks.length && !helpPicks.length && !(note && note.value.trim())) {
          toast("Add a tag or a note first.");
          return;
        }
        state.behaviour.push({
          id: uid(), ts: Date.now(),
          triggers: triggerPicks.slice(), helps: helpPicks.slice(),
          note: note ? note.value.trim().slice(0, 300) : ""
        });
        if (state.behaviour.length > 300) state.behaviour = state.behaviour.slice(-300);
        triggerPicks = [];
        helpPicks = [];
        save();
        render();
        toast("Logged. That is how patterns start.");
      });
      $$("[data-del-beh]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-del-beh");
          state.behaviour = state.behaviour.filter(function (b) { return b.id !== id; });
          save();
          render();
        });
      });
    }

    render();
  };

  /* ---- Play ---- */

  var playTab = "jokes";
  var jokeDeck = { order: [], pos: 0, stage: 0, current: null };

  function nextJoke() {
    if (jokeDeck.pos >= jokeDeck.order.length) {
      jokeDeck.order = shuffle(D.jokes.map(function (_, i) { return i; }));
      jokeDeck.pos = 0;
    }
    jokeDeck.current = D.jokes[jokeDeck.order[jokeDeck.pos++]];
    jokeDeck.stage = 0;
  }

  VIEWS.play = function (view) {
    function render() {
      view.innerHTML = pageHead("Play", "Silly, on purpose",
        "Laughter is a real reset, and there is nothing to get right here. Two tabs, no scores.") +
        '<div class="pill-toggle" role="group" aria-label="Play type">' +
          '<button type="button" data-ptab="jokes" aria-pressed="' + (playTab === "jokes") + '">Jokes</button>' +
          '<button type="button" data-ptab="sounds" aria-pressed="' + (playTab === "sounds") + '">Sounds</button>' +
        "</div>" +
        '<div style="margin-top:16px">' + (playTab === "sounds" ? soundsPanel() : jokesPanel()) + "</div>";

      $$("[data-ptab]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          playTab = btn.getAttribute("data-ptab");
          render();
        });
      });

      if (playTab === "sounds") bindSounds();
      else bindJokes();
    }

    function jokesPanel() {
      if (!jokeDeck.current) nextJoke();
      var j = jokeDeck.current;
      var stage = jokeDeck.stage;
      var content;
      if (stage === 0) {
        content = '<p class="joke-step">Step 1</p>' +
          '<p class="joke-setup">Knock knock!</p>' +
          '<p class="tiny muted" style="margin-top:-6px">Press the door and hear the knock.</p>' +
          '<div class="row-wrap" style="justify-content:center">' +
            '<button type="button" class="btn primary lg" id="jokeNext">' + icon("sound") + " Who&rsquo;s there?</button>" +
            '<button type="button" class="btn ghost" id="jokeKnock" aria-label="Play the knock knock sound again">🔊 Knock again</button>' +
          "</div>";
      } else if (stage === 1) {
        content = '<p class="joke-step">Step 2</p>' +
          '<p class="joke-setup">' + esc(j.setup) + "</p>" +
          '<button type="button" class="btn primary lg" id="jokeNext">' + esc(j.setup) + " who?</button>";
      } else {
        content = '<p class="joke-step">The punchline</p>' +
          '<p class="joke-punch">' + esc(j.punchline) + "</p>" +
          '<div class="row-wrap" style="justify-content:center">' +
            '<button type="button" class="btn primary" id="jokeAgain">Another joke</button>' +
            '<a class="btn ghost" href="#/focus">Tap game →</a>' +
          "</div>";
      }
      return '<div class="joke-card">' + content + "</div>" +
        '<div class="grid grid-2" style="margin-top:14px">' +
          '<div class="card tight"><h2 class="card-title">Make it a game</h2>' +
            '<p class="card-sub">Take turns. Whoever laughs first does the next silly dance.</p></div>' +
          '<div class="card tight"><h2 class="card-title">' + D.jokes.length + " jokes in the deck</h2>" +
            '<p class="card-sub">Shuffled, so you will not get the same one twice in a row.</p></div>' +
        "</div>";
    }

    function bindJokes() {
      var next = $("#jokeNext");
      if (next) next.addEventListener("click", function () {
        AudioEngine.knock();
        jokeDeck.stage++;
        render();
      });
      var knock = $("#jokeKnock");
      if (knock) knock.addEventListener("click", function () { AudioEngine.knock(); });
      var again = $("#jokeAgain");
      if (again) again.addEventListener("click", function () {
        nextJoke();
        render();
      });
    }

    function padHTML(attrs, emoji, label, pressed) {
      return '<button type="button" class="pad"' + attrs +
        (pressed === undefined ? "" : ' aria-pressed="' + pressed + '"') + ">" +
        '<span class="pad-emoji" aria-hidden="true">' + emoji + "</span>" + esc(label) + "</button>";
    }

    function soundGroup(title, note, pads) {
      return '<div class="sound-group"><h3 class="sound-group-title">' + esc(title) + "</h3>" +
        (note ? '<p class="tiny muted">' + esc(note) + "</p>" : "") +
        '<div class="sound-grid" style="margin-top:10px">' + pads + "</div></div>";
    }

    function soundsPanel() {
      var backgrounds = D.ambience.map(function (a) {
        return padHTML(' data-amb="' + a.id + '"', a.emoji, a.name, AudioEngine.isPlaying(a.id));
      }).join("");
      var fartPads = D.farts.map(function (f, i) {
        return padHTML(' data-fart="' + i + '"', f.emoji, f.name);
      }).join("");
      return '<div class="card">' +
        '<div class="row-between"><div><h2 class="card-title">Sounds</h2>' +
          '<p class="card-sub">Tap a pad. A new silly sound stops the last one; backgrounds can layer.</p></div>' +
          '<button type="button" class="btn" id="stopSounds">' + icon("pause") + " Stop everything</button></div>" +
        soundGroup("Background", "Calm and looping. Tap one again to stop it.", backgrounds) +
        soundGroup("Fart sounds 💨", "It is what it is. Tap a pad, or let the app surprise you.", fartPads) +
        soundGroup("Animals", "", padHTML(' id="animalSound"', "🐘", "Animal noises")) +
        '<div class="row-wrap" style="margin-top:16px">' +
          '<button type="button" class="btn primary" id="randomFart">' + icon("shuffle") + " Surprise me</button>" +
        "</div>" +
        '<p class="tiny muted" style="margin-top:12px">Volume follows the sound setting. Turn sound off upstairs.</p>' +
      "</div>";
    }

    function oneShot(pad, src, vol, message) {
      /* Backgrounds keep running; only the one-off sounds hand over. */
      $$(".pad.is-playing:not([data-amb])", view).forEach(function (p) { p.classList.remove("is-playing"); });
      AudioEngine.playFile(src, vol, function () { pad.classList.remove("is-playing"); });
      pad.classList.add("is-playing");
      if (message) toast(message);
    }

    function bindSounds() {
      $$("[data-amb]", view).forEach(function (pad) {
        pad.addEventListener("click", function () {
          var on = AudioEngine.toggle(pad.getAttribute("data-amb"));
          pad.classList.toggle("is-playing", on);
          pad.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
      $$("[data-fart]", view).forEach(function (pad) {
        pad.addEventListener("click", function () {
          var f = D.farts[parseInt(pad.getAttribute("data-fart"), 10)];
          if (f) oneShot(pad, "Fart/" + f.file, 0.85);
        });
      });
      var animals = $("#animalSound", view);
      if (animals) animals.addEventListener("click", function () {
        oneShot(animals, "animal_sounds.mp3", 0.75, "Animal noises 🐘");
      });
      var random = $("#randomFart", view);
      if (random) random.addEventListener("click", function () {
        var f = D.farts[Math.floor(Math.random() * D.farts.length)];
        var pad = $('[data-fart="' + D.farts.indexOf(f) + '"]', view) || random;
        oneShot(pad, "Fart/" + f.file, 0.9, f.name + " 💨");
      });
      var stop = $("#stopSounds", view);
      if (stop) stop.addEventListener("click", function () {
        AudioEngine.stopAll();
        $$(".pad.is-playing", view).forEach(function (p) { p.classList.remove("is-playing"); });
        $$("[data-amb]", view).forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        toast("All quiet.");
      });
    }

    render();
  };

  /* ---- Learn ---- */

  var learnTag = "All";

  VIEWS.learn = function (view) {
    function tags() {
      var seen = ["All"];
      D.guides.forEach(function (g) { if (seen.indexOf(g.tag) < 0) seen.push(g.tag); });
      return seen;
    }

    function guidesHTML() {
      var list = D.guides.filter(function (g) { return learnTag === "All" || g.tag === learnTag; });
      if (!list.length) return '<div class="empty">Nothing here yet.</div>';
      return list.map(function (g) {
        return '<details class="guide">' +
          "<summary><span class=\"guide-emoji\" aria-hidden=\"true\">" + g.emoji + "</span>" +
            "<span>" + esc(g.title) + '</span><span class="guide-tag">' + esc(g.tag) + "</span></summary>" +
          '<div class="guide-body"><p>' + esc(g.summary) + "</p><ul>" +
            g.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
          "</ul></div></details>";
      }).join("");
    }

    function sourcesHTML() {
      var groups = D.sources || [];
      if (!groups.length) return "";
      var total = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
      return '<details class="guide learn-sources">' +
        "<summary><span class=\"guide-emoji\" aria-hidden=\"true\">🏛️</span>" +
          "<span>Official guidance &amp; trusted sources</span>" +
          '<span class="guide-tag">' + total + " links</span></summary>" +
        '<div class="guide-body">' +
          "<p>The organisations that actually set the guidance, so you can check anything here against the source. " +
          "Links open their own site in a new tab. ZenZac is not affiliated with any of them.</p>" +
          groups.map(function (group) {
            return '<div class="source-group"><h3>' + esc(group.group) + '</h3><ul class="source-list">' +
              group.items.map(function (item) {
                return '<li><a href="' + item.url + '" target="_blank" rel="noopener">' + esc(item.name) + "</a>" +
                  "<span>" + esc(item.note) + "</span></li>";
              }).join("") + "</ul></div>";
          }).join("") +
        "</div></details>";
    }

    function shelfHTML() {
      var shelves = [
        { id: "food", emoji: "🍎", label: "Nutrition" },
        { id: "health", emoji: "🌡️", label: "Health" },
        { id: "activity", emoji: "🤸", label: "Activities" },
        { id: "behaviour", emoji: "📝", label: "Behaviour" }
      ];
      return '<div class="card tight" style="margin-top:18px">' +
        '<h2 class="card-title">More on the shelf</h2>' +
        '<p class="card-sub">Nutrition, health, activities and behaviour tracking now have their own shelves in the Compendium.</p>' +
        '<div class="row-wrap" style="margin-top:12px">' +
          shelves.map(function (s) {
            return '<button type="button" class="btn sm" data-comp-cat="' + s.id + '">' +
              s.emoji + " " + esc(s.label) + "</button>";
          }).join("") +
        "</div></div>";
    }

    function render() {
      view.innerHTML = pageHead("Learn", "Short guides that help today",
        "Written for tired grown-ups. Every one of these works on a bad afternoon, not just a good one.") +
        '<div class="chips" role="group" aria-label="Filter guides">' +
          tags().map(function (t) {
            return '<button type="button" class="chip' + (learnTag === t ? " is-on" : "") + '" data-tag="' + esc(t) +
              '" aria-pressed="' + (learnTag === t) + '">' + esc(t) + "</button>";
          }).join("") +
        "</div>" +
        '<div style="margin-top:16px" id="guideList">' + guidesHTML() + "</div>" +
        '<div class="grid grid-2" style="margin-top:18px">' +
          '<div class="card tight"><h2 class="card-title">Need a hand now?</h2>' +
            '<p class="card-sub">Breathing, sounds and a five-step settling exercise are on the Calm page.</p>' +
            '<a class="btn sm primary" href="#/calm" style="margin-top:12px">Open Calm</a></div>' +
          '<div class="card tight"><h2 class="card-title">Need the long version?</h2>' +
            '<p class="card-sub">Scripts, school meetings, sleep, money, and what to do when it gets physical.</p>' +
            '<a class="btn sm" href="#/support" style="margin-top:12px">Parent support</a></div>' +
                "  </div>" +
        shelfHTML() +
        '<div style="margin-top:18px">' + sourcesHTML() + "</div>" +
        '<p class="tiny muted" style="margin-top:12px">ZenZac is a support tool, not a medical device or a diagnosis. ' +
          "If you are worried, speak to your GP, health visitor or school SENCO.</p>";

      $$("[data-tag]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          learnTag = btn.getAttribute("data-tag");
          render();
        });
      });

      $$("[data-comp-cat]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          openCompCat(btn.getAttribute("data-comp-cat"));
        });
      });
    }

    render();
  };

  /* ---- Compendium ---- */

  var compQuery = "";
  var compCat = "All";

  /* Deep link from Learn into one Compendium shelf. */
  function openCompCat(id) {
    compCat = id;
    compQuery = "";
    var here = (window.location.hash || "").replace(/^#\/?/, "").split("?")[0];
    window.location.hash = "#/compendium";
    if (here === "compendium") route();
    else route();
  }

  VIEWS.compendium = function (view) {
    var C = window.ZenCompendium;
    if (!C) {
      view.innerHTML = pageHead("Compendium", "The shelf did not load",
        "The content file is missing. Check that assets/compendium.js sits next to the app.");
      return;
    }

    function catName(id) {
      for (var i = 0; i < C.categories.length; i++) if (C.categories[i].id === id) return C.categories[i].name;
      return "";
    }

    function matches(e) {
      if (compCat !== "All" && e.cat !== compCat) return false;
      var q = compQuery.trim().toLowerCase();
      if (!q) return true;
      var hay = (e.title + " " + e.summary + " " + e.steps.join(" ") + " " + catName(e.cat)).toLowerCase();
      return hay.indexOf(q) > -1;
    }

    function entryHTML(e) {
      return '<details class="comp-entry">' +
        "<summary>" +
          '<span class="comp-entry-emoji" aria-hidden="true">' + e.emoji + "</span>" +
          '<span class="comp-entry-title">' + esc(e.title) + "</span>" +
          '<span class="comp-entry-tag">' + esc(catName(e.cat)) + "</span>" +
          '<span class="comp-entry-caret" aria-hidden="true"></span>' +
        "</summary>" +
        '<div class="comp-entry-body"><p class="comp-entry-sum">' + esc(e.summary) + "</p><ul>" +
          e.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") +
        "</ul>" +
        (e.link ? '<a class="btn sm" href="' + e.link.href + '">' + esc(e.link.label) + "</a>" : "") +
        "</div></details>";
    }

    function listHTML() {
      var found = C.entries.filter(matches);
      if (!found.length) {
        return '<div class="empty"><strong>Nothing matched that.</strong>Try a shorter word - noise, sleep, school, waiting.</div>';
      }
      var cats = compCat === "All" ? C.categories : C.categories.filter(function (c) { return c.id === compCat; });
      return cats.map(function (c) {
        var items = found.filter(function (e) { return e.cat === c.id; });
        if (!items.length) return "";
        return '<section class="comp-section">' +
          '<div class="comp-cat"><span class="comp-cat-ico" aria-hidden="true">' + c.emoji + "</span>" +
            "<div><h2>" + esc(c.name) + "</h2><p>" + esc(c.blurb) + "</p></div>" +
            '<span class="badge">' + items.length + "</span></div>" +
          '<div class="comp-grid">' + items.map(entryHTML).join("") + "</div></section>";
      }).join("");
    }

    function paint() {
      var list = $("#compList", view);
      if (!list) return;
      list.innerHTML = listHTML();
      var found = C.entries.filter(matches).length;
      var count = $("#compCount", view);
      if (count) {
        count.textContent = found + (found === 1 ? " entry" : " entries") +
          (compQuery.trim() ? ' for "' + compQuery.trim() + '"' : "") +
          (compCat === "All" ? "" : " in " + catName(compCat));
      }
    }

    function render() {
      view.innerHTML = pageHead("Compendium", "Everything, in one place",
        C.entries.length + " short entries: what to try, why it works, and what to say. Built for ADHD, autism and both - no jargon, no lectures.") +
        '<div class="comp-toolbar">' +
          '<label class="search-box">' + icon("search") +
            '<span class="sr-only">Search the compendium</span>' +
            '<input type="search" id="compSearch" placeholder="Search: noise, bedtime, school, waiting…" value="' + esc(compQuery) + '">' +
          "</label>" +
          '<a class="btn sm ghost" href="#/support">Parent support</a>' +
        "</div>" +
        '<div class="chips" role="group" aria-label="Filter by topic">' +
          '<button type="button" class="chip' + (compCat === "All" ? " is-on" : "") + '" data-cat="All" aria-pressed="' + (compCat === "All") + '">All</button>' +
          C.categories.map(function (c) {
            var on = compCat === c.id;
            return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-cat="' + c.id + '" aria-pressed="' + on + '">' +
              c.emoji + " " + esc(c.name) + "</button>";
          }).join("") +
        "</div>" +
        '<p class="tiny muted comp-count" id="compCount"></p>' +
        '<div id="compList"></div>' +
        '<div class="card" style="margin-top:22px"><h2 class="card-title">Using this with a child</h2>' +
          '<p class="card-sub">Pick one entry, try it for a week, then change one thing. Ten things at once is how plans fail. Everything here is general guidance - not a diagnosis or medical advice.</p></div>';

      paint();

      var input = $("#compSearch", view);
      if (input) {
        input.addEventListener("input", function () {
          compQuery = input.value;
          paint();
        });
      }

      $$("[data-cat]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          compCat = btn.getAttribute("data-cat");
          render();
        });
      });
    }

    render();
  };

  /* ---- Parent support: the long version ---- */

  var supQuery = "";
  var supTopic = "All";

  VIEWS.support = function (view) {
    var S = window.ZenSupport;
    if (!S || !S.entries || !S.entries.length) {
      view.innerHTML = pageHead("Parent support", "The long version did not load",
        "Check that assets/support.js sits next to the app.");
      return;
    }

    function topicOf(id) {
      for (var i = 0; i < S.topics.length; i++) if (S.topics[i].id === id) return S.topics[i];
      return null;
    }

    function plain(s) {
      var secs = s.sections.map(function (x) {
        return (x.h || "") + " " + (x.p ? [].concat(x.p).join(" ") : "") + " " +
          (x.list || []).join(" ") + " " + (x.say || []).join(" ") + " " + (x.try || []).join(" ");
      }).join(" ");
      return (s.title + " " + s.summary + " " + secs + " " + ((topicOf(s.topic) || {}).name || "")).toLowerCase();
    }

    function matches(e) {
      if (supTopic !== "All" && e.topic !== supTopic) return false;
      var q = supQuery.trim().toLowerCase();
      if (!q) return true;
      return plain(e).indexOf(q) > -1;
    }

    function blockHTML(sec) {
      var paras = sec.p ? [].concat(sec.p) : [];
      return '<div class="sup-block">' +
        (sec.h ? "<h3>" + esc(sec.h) + "</h3>" : "") +
        paras.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
        (sec.list ? '<ul class="sup-list">' + sec.list.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" : "") +
        (sec.say ? '<div class="sup-call"><strong>Say this</strong><ul>' +
          sec.say.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" : "") +
        (sec.try ? '<div class="sup-call sup-try"><strong>Try this</strong><ul>' +
          sec.try.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" : "") +
      "</div>";
    }

    function entryHTML(e) {
      var t = topicOf(e.topic);
      return '<details class="guide sup-entry">' +
        "<summary><span class=\"guide-emoji\" aria-hidden=\"true\">" + e.emoji + "</span>" +
          '<span class="sup-head"><strong>' + esc(e.title) + '</strong>' +
            '<small class="sup-sum">' + esc(e.summary) + "</small></span>" +
          (t ? '<span class="guide-tag">' + esc(t.name) + "</span>" : "") +
        "</summary>" +
        '<div class="guide-body">' + e.sections.map(blockHTML).join("") + "</div></details>";
    }

    function listHTML() {
      var found = S.entries.filter(matches);
      if (!found.length) {
        return '<div class="empty"><strong>Nothing matched that.</strong>Try a shorter word - sleep, school, meltdown, money.</div>';
      }
      var topics = supTopic === "All" ? S.topics : S.topics.filter(function (t) { return t.id === supTopic; });
      return topics.map(function (t) {
        var items = found.filter(function (e) { return e.topic === t.id; });
        if (!items.length) return "";
        return '<section class="sup-section">' +
          '<div class="comp-cat"><span class="comp-cat-ico" aria-hidden="true">' + t.emoji + "</span>" +
            "<div><h2>" + esc(t.name) + "</h2><p>" + esc(t.blurb) + "</p></div>" +
            '<span class="badge">' + items.length + "</span></div>" +
          '<div class="stack">' + items.map(entryHTML).join("") + "</div></section>";
      }).join("");
    }

    function paint() {
      var list = $("#supList", view);
      if (!list) return;
      list.innerHTML = listHTML();
      var found = S.entries.filter(matches).length;
      var count = $("#supCount", view);
      if (count) {
        count.textContent = found + (found === 1 ? " entry" : " entries") +
          (supQuery.trim() ? ' for "' + supQuery.trim() + '"' : "") +
          (supTopic === "All" ? " for grown-ups" : " in " + ((topicOf(supTopic) || {}).name || ""));
      }
    }

    function render() {
      view.innerHTML = pageHead("Parent support", "The long version, for the grown-ups",
        "Scripts, explanations and the practical detail that never fits on a school letter. General guidance, not medical advice.") +
        '<div class="comp-toolbar">' +
          '<label class="search-box">' + icon("search") +
            '<span class="sr-only">Search parent support</span>' +
            '<input type="search" id="supSearch" placeholder="Search: meltdown, school, sleep, money…" value="' + esc(supQuery) + '">' +
          "</label>" +
          '<a class="btn sm ghost" href="#/compendium">Compendium</a>' +
        "</div>" +
        '<div class="chips" role="group" aria-label="Filter by topic">' +
          '<button type="button" class="chip' + (supTopic === "All" ? " is-on" : "") + '" data-suptopic="All" aria-pressed="' + (supTopic === "All") + '">All</button>' +
          S.topics.map(function (t) {
            var on = supTopic === t.id;
            return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-suptopic="' + t.id + '" aria-pressed="' + on + '">' +
              t.emoji + " " + esc(t.name) + "</button>";
          }).join("") +
        "</div>" +
        '<p class="tiny muted comp-count" id="supCount"></p>' +
        '<div id="supList"></div>' +
        '<div class="card sup-chat" style="margin-top:22px">' +
          '<h2 class="card-title">Just want a general chat?</h2>' +
          '<p class="card-sub">ZenZac is made by Craig, one parent, not a clinic. If you want to compare notes, ask a question, ' +
            "or just say that this is hard, you can email him directly. No forms, no newsletter, no automation. " +
            "Even if it is just a general chat, that is a good enough reason to write.</p>" +
          '<p class="sup-email"><a href="mailto:craigheggie@googlemail.com">craigheggie@googlemail.com</a></p>' +
          '<div class="row-wrap" style="margin-top:12px">' +
            '<a class="btn sm" href="mailto:craigheggie@googlemail.com">✉️ Email Craig</a>' +
            '<a class="btn sm soft" href="https://buy.stripe.com/cNi14m8fK7lF8x35MX4wM05" target="_blank" rel="noopener">💙 Support ZenZac</a>' +
          "</div>" +
          '<p class="tiny muted" style="margin-top:12px">Replies are slow and honest. This is not a crisis service - if you or your child are at risk, ' +
            "call 999, or Samaritans on 116 123, free, any time.</p>" +
        "</div>" +
        '<div class="card" style="margin-top:14px">' +
          '<h2 class="card-title">If you need a person, not a page</h2>' +
          '<p class="card-sub">If you are worried about your child, start with your GP. For school problems, ask for the SENCO in writing.</p>' +
          '<div class="row-wrap" style="margin-top:12px">' +
            '<a class="btn sm ghost" href="https://www.nhs.uk/conditions/attention-deficit-hyperactivity-disorder-adhd/" target="_blank" rel="noopener">NHS - ADHD</a>' +
            '<a class="btn sm ghost" href="https://www.autism.org.uk/" target="_blank" rel="noopener">National Autistic Society</a>' +
            '<a class="btn sm ghost" href="https://www.adhdfoundation.org.uk/" target="_blank" rel="noopener">ADHD Foundation</a>' +
            '<a class="btn sm ghost" href="https://www.ipsea.org.uk/" target="_blank" rel="noopener">IPSEA - school rights</a>' +
            '<a class="btn sm ghost" href="https://contact.org.uk/" target="_blank" rel="noopener">Contact - money &amp; support</a>' +
          "</div>" +
          '<p class="tiny muted" style="margin-top:12px">General guidance for UK families. Not a diagnosis, not medical advice, ' +
            "and not a substitute for the professionals who know your child.</p>" +
        "</div>";

      paint();

      var input = $("#supSearch", view);
      if (input) input.addEventListener("input", function () {
        supQuery = input.value;
        paint();
      });

      $$("[data-suptopic]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          supTopic = btn.getAttribute("data-suptopic");
          supQuery = "";
          render();
        });
      });
    }

    render();
  };

  /* ---- Setup: questions, mode, rules, look ---- */

  var SETUP_STEPS = ["who", "mode", "hard", "helps", "sensory", "rules", "look", "done"];
  var setupStep = 0;
  var setupOpened = false;
  var rulesMergedMode = null;

  var STEP_TITLES = {
    who: "Who is this for?",
    mode: "Which fits best right now?",
    hard: "What is hardest right now?",
    helps: "What already helps?",
    sensory: "Anything that feels too much?",
    rules: "Our house rules",
    look: "How should it look?",
    done: "Here is your plan"
  };

  var STEP_SHORT = {
    who: "Name", mode: "Mode", hard: "Hard bits", helps: "What helps",
    sensory: "Senses", rules: "Rules", look: "Colours"
  };

  var STEP_SUBS = {
    who: "A first name or nickname is enough. You can leave anything blank, and nothing leaves this device.",
    mode: "This changes what the app puts first. It is a starting point, not a label - and you can change it whenever you like.",
    hard: "Pick the ones that matter most. They become your shortcuts on Home.",
    helps: "Include the small things that work. The app will offer these first.",
    sensory: "So the app can plan ahead and avoid surprises - never to label anyone.",
    rules: "Short agreements for the whole household. Switch on what fits, and add your own in your own words.",
    look: "Six soft palettes, no harsh white. Your choice saves straight away.",
    done: "Nothing here is permanent. Change an answer whenever your child changes."
  };

  function setupStartStep() {
    var hash = window.location.hash || "";
    var q = hash.indexOf("?") > -1 ? hash.split("?")[1] : "";
    if (q.indexOf("step=rules") > -1) return SETUP_STEPS.indexOf("rules");
    if (q.indexOf("step=look") > -1) return SETUP_STEPS.indexOf("look");
    return 0;
  }

  function rulesForMode(id) {
    return D.ruleDefaults.filter(function (r) {
      return r.modes.indexOf(id || "unsure") > -1;
    }).map(function (r) {
      return { id: r.id, text: r.text, why: r.why, on: r.on };
    });
  }

  function mergeSuggestedRules() {
    var mode = state.profile.mode || "unsure";
    if (rulesMergedMode === mode) return;
    rulesMergedMode = mode;
    var have = {};
    state.rules.forEach(function (r) { have[r.id] = true; });
    var added = 0;
    rulesForMode(mode).forEach(function (r) {
      if (!have[r.id]) { state.rules.push(r); added++; }
    });
    if (added) save();
  }

  function chipLabel(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i].label;
    return "";
  }

  function chipButtons(list, selected, attr) {
    return list.map(function (c) {
      var on = selected.indexOf(c.id) > -1;
      return '<button type="button" class="chip big' + (on ? " is-on" : "") + '" data-' + attr + '="' + c.id +
        '" aria-pressed="' + on + '"><span aria-hidden="true">' + c.emoji + "</span> " + esc(c.label) + "</button>";
    }).join("");
  }

  VIEWS.setup = function (view) {
    if (!setupOpened) {
      setupStep = setupStartStep();
      setupOpened = true;
      rulesMergedMode = null;
    }
    if (!state.rules.length) {
      state.rules = rulesForMode(state.profile.mode);
      save();
    }
    if (setupStep === SETUP_STEPS.indexOf("rules")) mergeSuggestedRules();

    function bodyHTML() {
      var step = SETUP_STEPS[setupStep];
      if (step === "who") {
        return '<div class="setup-grid">' +
          '<div class="field"><label class="label" for="setupName">First name or nickname - optional</label>' +
            '<input class="input input-lg" id="setupName" maxlength="24" autocomplete="off" placeholder="e.g. Zac" value="' + esc(state.settings.name) + '"></div>' +
          '<div class="field"><span class="label">Age band</span>' +
            '<div class="chip-row">' + D.ageBands.map(function (a) {
              var on = state.profile.age === a;
              return '<button type="button" class="chip big' + (on ? " is-on" : "") + '" data-age="' + esc(a) + '" aria-pressed="' + on + '">' + esc(a) + "</button>";
            }).join("") + "</div></div>" +
          '<p class="tiny muted">No email, no account, no cloud. This is a local profile, not a login.</p>' +
        "</div>";
      }

      if (step === "mode") {
        return '<div class="mode-grid">' + D.modes.map(function (m) {
          var on = state.profile.mode === m.id;
          return '<button type="button" class="mode-card' + (on ? " is-on" : "") + '" data-mode="' + m.id + '" aria-pressed="' + on + '">' +
            '<span class="mode-emoji" aria-hidden="true">' + m.emoji + "</span>" +
            '<span class="mode-name">' + esc(m.name) + "</span>" +
            '<span class="mode-note">' + esc(m.note) + "</span>" +
            '<span class="mode-tick" aria-hidden="true">' + icon("check") + "</span></button>";
        }).join("") + "</div>" +
        '<p class="tiny muted" style="margin-top:12px">You can also pick both, or change this later without losing anything.</p>';
      }

      if (step === "hard") {
        return '<div class="chip-row">' + chipButtons(D.hardBits, state.profile.hard, "hard") + "</div>" +
          '<p class="tiny muted" style="margin-top:12px">Tap to choose, tap again to undo. ' +
          (state.profile.hard.length ? state.profile.hard.length + " chosen." : "Nothing chosen yet - that is fine.") + "</p>";
      }

      if (step === "helps") {
        return '<div class="chip-row">' + chipButtons(D.helpChips, state.profile.helps, "help") + "</div>" +
          '<p class="tiny muted" style="margin-top:12px">' +
          (state.profile.helps.length ? state.profile.helps.length + " chosen." : "Nothing chosen yet - that is fine.") + "</p>";
      }

      if (step === "sensory") {
        return '<div class="chip-row">' + chipButtons(D.sensoryChips, state.profile.sensory, "sense") + "</div>" +
          '<p class="tiny muted" style="margin-top:12px">Choose “Nothing obvious” if you are not sure, or if sensitivities change from day to day.</p>';
      }

      if (step === "rules") {
        mergeSuggestedRules();
        return '<div class="stack">' + state.rules.map(function (r) {
          return '<div class="rule-item' + (r.on ? " is-on" : "") + '">' +
            '<label class="switch"><input type="checkbox" data-rule="' + esc(r.id) + '"' + (r.on ? " checked" : "") + ">" +
              '<span class="track"><span class="thumb"></span></span>' +
              '<span class="switch-text"><strong>' + esc(r.text) + "</strong>" +
              (r.why ? "<small>" + esc(r.why) + "</small>" : "") + "</span></label>" +
            (r.custom ? '<button type="button" class="icon-btn sm" data-rule-del="' + esc(r.id) + '" aria-label="Remove this rule">' + icon("x") + "</button>" : "") +
          "</div>";
        }).join("") + "</div>" +
        '<form class="row" id="addRuleForm" style="margin-top:14px">' +
          '<input class="input" id="addRuleInput" maxlength="90" placeholder="Add your own rule…" aria-label="Add your own rule">' +
          '<button class="btn" type="submit">Add</button></form>' +
        '<p class="tiny muted" style="margin-top:10px">These show on Home and Now &amp; Next. Keep them short, and agree them out loud together.</p>';
      }

      if (step === "look") {
        return '<div class="theme-grid" role="group" aria-label="Colour theme">' + D.themes.map(function (t) {
          var on = state.settings.theme === t.id;
          return '<button type="button" class="theme-btn' + (on ? " is-on" : "") + '" data-pick-theme="' + t.id +
            '" aria-pressed="' + on + '">' +
            '<span class="theme-swatch" aria-hidden="true">' + t.sw.map(function (c) {
              return '<i style="background:' + c + '"></i>';
            }).join("") + "</span>" +
            '<span class="theme-name">' + esc(t.name) + "</span>" +
            '<span class="theme-note">' + esc(t.note) + "</span></button>";
        }).join("") + "</div>" +
        '<div class="card" style="margin-top:16px"><div class="stack">' +
          '<label class="switch"><input type="checkbox" id="setupMotion"' + (state.settings.motion === "calm" ? " checked" : "") + ">" +
            '<span class="track"><span class="thumb"></span></span>' +
            '<span class="switch-text"><strong>Calm motion</strong><small>Stops the background drift and hover movement.</small></span></label>' +
          '<label class="switch"><input type="checkbox" id="setupBig"' + (state.settings.bigText ? " checked" : "") + ">" +
            '<span class="track"><span class="thumb"></span></span>' +
            '<span class="switch-text"><strong>Bigger text</strong><small>Increases all text by about 12%.</small></span></label>' +
        "</div></div>";
      }

      var m = D.mode(state.profile.mode);
      var hard = state.profile.hard.map(function (id) { return chipLabel(D.hardBits, id); }).filter(Boolean);
      var helps = state.profile.helps.map(function (id) { return chipLabel(D.helpChips, id); }).filter(Boolean);
      var senses = state.profile.sensory.map(function (id) { return chipLabel(D.sensoryChips, id); }).filter(Boolean);
      var themeName = "Dusk";
      D.themes.forEach(function (t) { if (t.id === state.settings.theme) themeName = t.name; });
      return '<div class="plan-summary">' +
        '<div class="plan-summary-head"><span class="plan-emoji" aria-hidden="true">' + (m ? m.emoji : "🌱") + "</span>" +
          "<div><h2>" + esc(state.settings.name ? state.settings.name + "’s plan" : "Your plan") + "</h2>" +
          "<p>" + esc(m ? m.name : "No mode chosen") + (state.profile.age ? " · age " + esc(state.profile.age) : "") + "</p></div></div>" +
        '<dl class="plan-list">' +
          "<div><dt>Hard right now</dt><dd>" + esc(hard.join(", ") || "Not answered yet") + "</dd></div>" +
          "<div><dt>What helps</dt><dd>" + esc(helps.join(", ") || "Not answered yet") + "</dd></div>" +
          "<div><dt>Sensory notes</dt><dd>" + esc(senses.join(", ") || "Nothing noted") + "</dd></div>" +
          "<div><dt>House rules</dt><dd>" + enabledRules().length + " switched on</dd></div>" +
          "<div><dt>Colours</dt><dd>" + esc(themeName) + "</dd></div>" +
        "</dl></div>" +
        '<div class="row-wrap" style="margin-top:16px">' +
          '<button type="button" class="btn primary lg" id="setupFinish">Start using it</button>' +
          '<button type="button" class="btn" id="setupAgain">Tweak answers</button></div>';
    }

    function footerHTML() {
      var step = SETUP_STEPS[setupStep];
      if (step === "done") return "";
      var nextLabel = step === "look" ? "See my plan" : "Next";
      if (step === "who") {
        return '<div class="setup-foot"><span class="tiny muted">Every answer is optional</span>' +
          '<button type="button" class="btn primary" id="setupNext">' + nextLabel + "</button></div>";
      }
      return '<div class="setup-foot"><button type="button" class="btn ghost" id="setupBack">' + icon("back") + " Back</button>" +
        '<div class="row" style="gap:8px"><button type="button" class="btn ghost sm" id="setupSkip">Skip</button>' +
        '<button type="button" class="btn primary" id="setupNext">' + nextLabel + "</button></div></div>";
    }

    function go(next) {
      setupStep = clamp(next, 0, SETUP_STEPS.length - 1);
      render(true);
    }

    function finish() {
      state.profile.done = true;
      state.profile.updated = Date.now();
      save();
      toast("Your plan is ready.");
      window.location.hash = "#/home";
    }

    function paintChips(attr, selected) {
      $$("[data-" + attr + "]", view).forEach(function (b) {
        var on = selected.indexOf(b.getAttribute("data-" + attr)) > -1;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    function bind() {
      var nameInput = $("#setupName", view);
      if (nameInput) nameInput.addEventListener("input", function () {
        state.settings.name = nameInput.value.trim().slice(0, 24);
        save();
      });

      $$("[data-age]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var age = btn.getAttribute("data-age");
          state.profile.age = state.profile.age === age ? "" : age;
          save();
          $$("[data-age]", view).forEach(function (b) {
            var on = b.getAttribute("data-age") === state.profile.age;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      $$("[data-mode]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.profile.mode = btn.getAttribute("data-mode");
          save();
          $$("[data-mode]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      function multi(attr, key) {
        $$("[data-" + attr + "]", view).forEach(function (btn) {
          btn.addEventListener("click", function () {
            var id = btn.getAttribute("data-" + attr);
            var arr = state.profile[key];
            var i = arr.indexOf(id);
            if (i > -1) arr.splice(i, 1); else arr.push(id);
            if (key === "sensory") {
              if (id === "none" && arr.indexOf("none") > -1) {
                state.profile.sensory = ["none"];
              } else if (id !== "none") {
                var n = state.profile.sensory.indexOf("none");
                if (n > -1) state.profile.sensory.splice(n, 1);
              }
            }
            save();
            paintChips(attr, state.profile[key]);
          });
        });
      }
      multi("hard", "hard");
      multi("help", "helps");
      multi("sense", "sensory");

      $$("[data-rule]", view).forEach(function (box) {
        box.addEventListener("change", function () {
          var id = box.getAttribute("data-rule");
          state.rules.forEach(function (r) { if (r.id === id) r.on = box.checked; });
          save();
          var row = box;
          while (row && row.className && row.className.indexOf("rule-item") < 0) row = row.parentNode;
          if (row && row.classList) row.classList.toggle("is-on", box.checked);
        });
      });

      $$("[data-rule-del]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var id = btn.getAttribute("data-rule-del");
          state.rules = state.rules.filter(function (r) { return r.id !== id; });
          save();
          render(true);
        });
      });

      var addForm = $("#addRuleForm", view);
      if (addForm) addForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = $("#addRuleInput", view);
        var text = input ? input.value.trim().slice(0, 90) : "";
        if (!text) return;
        state.rules.push({ id: uid(), text: text, why: "", on: true, custom: true });
        save();
        render(true);
        toast("Rule added.");
      });

      $$("[data-pick-theme]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.settings.theme = btn.getAttribute("data-pick-theme");
          save();
          applyChrome();
          $$("[data-pick-theme]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
        });
      });

      var motion = $("#setupMotion", view);
      if (motion) motion.addEventListener("change", function () {
        state.settings.motion = motion.checked ? "calm" : "full";
        save();
        applyChrome();
      });

      var big = $("#setupBig", view);
      if (big) big.addEventListener("change", function () {
        state.settings.bigText = big.checked;
        save();
        applyChrome();
      });

      var next = $("#setupNext", view);
      if (next) next.addEventListener("click", function () { go(setupStep + 1); });
      var back = $("#setupBack", view);
      if (back) back.addEventListener("click", function () { go(setupStep - 1); });
      var skip = $("#setupSkip", view);
      if (skip) skip.addEventListener("click", function () { go(setupStep + 1); });
      var finishBtn = $("#setupFinish", view);
      if (finishBtn) finishBtn.addEventListener("click", finish);
      var again = $("#setupAgain", view);
      if (again) again.addEventListener("click", function () { go(0); });
      $$("[data-jump]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          go(parseInt(btn.getAttribute("data-jump"), 10));
        });
      });
    }

    function render(keepScroll) {
      var y = keepScroll ? window.scrollY : 0;
      var step = SETUP_STEPS[setupStep];
      var total = SETUP_STEPS.length - 1;
      var shown = Math.min(setupStep + 1, total);
      var pct = Math.round((shown / total) * 100);
      var eyebrow = step === "done" ? "Your plan" : "Set-up";
      var stepNote = step === "done" ? "All done" : "Step " + shown + " of " + total;
      var jump = "";
      if (state.profile.done && step !== "done") {
        jump = '<div class="setup-jump" role="group" aria-label="Jump to a step">' +
          '<span class="tiny muted">Jump to</span>' +
          SETUP_STEPS.slice(0, -1).map(function (id, i) {
            return '<button type="button" class="chip sm' + (i === setupStep ? " is-on" : "") + '" data-jump="' + i + '">' +
              esc(STEP_SHORT[id]) + "</button>";
          }).join("") + "</div>";
      }
      view.innerHTML = '<div class="setup-wrap">' +
        '<div class="setup-head">' +
          '<div class="row-between"><a class="btn sm ghost" href="#/home">' + icon("back") + " Home</a>" +
            '<span class="tiny muted">' + stepNote + (shown === 1 && step !== "done" ? " · about 2 minutes" : "") + "</span></div>" +
          '<div class="setup-progress" role="progressbar" aria-label="Set-up progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><span style="width:' + pct + '%"></span></div>' +
        "</div>" +
        '<div class="setup-card">' +
          '<p class="eyebrow">' + esc(eyebrow) + "</p>" +
          '<h1 class="page-title">' + esc(STEP_TITLES[step]) + "</h1>" +
          '<p class="page-sub">' + esc(STEP_SUBS[step]) + "</p>" +
          jump +
          '<div class="setup-body">' + bodyHTML() + "</div>" +
          footerHTML() +
        "</div>" +
        (step === "done" ? "" :
          '<p class="tiny muted center" style="margin-top:16px">Answers save as you go · <a href="#/settings">Settings</a></p>') +
      "</div>";
      bind();
      try { window.scrollTo(0, y); } catch (e) {}
    }

    render(false);
  };

  /* ---- More ---- */

  VIEWS.more = function (view) {
    view.innerHTML = pageHead("More", "Everything else",
      "The whole toolkit, in one place.") +
      '<div class="grid grid-auto">' +
        tileHTML("#/focus", "🎯", "Focus", "Fidget wheel and Wac-A-Zac.", "lilac") +
        tileHTML("#/journal", "📔", "Journal", "Feelings check-ins and tricky moments.", "amber") +
        tileHTML("#/play", "😂", "Play", "Knock-knock jokes and fart sounds.", "coral") +
        tileHTML("#/compendium", "📖", "Compendium", "Nutrition, health, activities, behaviour and more.", "mint") +
        tileHTML("#/setup", "🎛️", "Your plan", "Mode, answers and house rules.", "") +
        tileHTML("#/learn", "📚", "Learn", "Practical guides, no lectures.", "") +
        tileHTML("#/support", "💗", "Parent support", "Scripts, school, sleep and the long version.", "lilac") +
        tileHTML("#/settings", "⚙️", "Settings", "Colours, icons, creator and your data.", "sky") +
        tileHTML("#/calm", "🫧", "Calm", "Breathing, sounds, grounding.", "mint") +
      "</div>" +
      '<div class="card" style="margin-top:18px">' +
        '<h2 class="card-title">About ZenZac</h2>' +
        '<p class="card-sub">ZenZac is a small, quiet toolkit for children who find big feelings, routines and focus hard - and for the grown-ups beside them.</p>' +
        '<hr class="divider">' +
        '<ul class="stack" style="color:var(--ink-2);font-size:0.92rem">' +
          "<li>🔒 Everything you type stays in this browser. No accounts, no tracking, no adverts.</li>" +
          "<li>📶 Works offline once loaded - no fonts or icons fetched from the internet.</li>" +
          "<li>🧩 Built to be used at 7am on a school morning, not in a lab.</li>" +
          "<li>⚠️ Not a medical device and not a diagnosis. Trust your instincts and ask for help early.</li>" +
        "</ul>" +
        '<div class="row-wrap" style="margin-top:16px">' +
          '<a class="btn" href="#/support">Parent support</a>' +
          '<a class="btn ghost" href="#/settings">Settings &amp; data</a>' +
          '<a class="btn ghost" href="#/learn">Short guides</a>' +
        "</div>" +
      "</div>" +
      '<div class="card creator-card" style="margin-top:14px">' +
        '<div class="creator-head">' +
          '<span class="creator-avatar" aria-hidden="true">💙</span>' +
          '<div><h2 class="card-title">Craig Heggie</h2>' +
            '<p class="card-sub">Parent, builder of ZenZac, and someone who knows the hard mornings.</p></div>' +
        "</div>" +
        '<p class="creator-story">ZenZac is free to use and made by one parent. If you want to compare notes, ask a question or just have a general chat, email me. If you would like to help with the hosting and the hours, there is an optional one-off support link too.</p>' +
        '<div class="creator-links">' +
          '<a class="btn sm" href="mailto:craigheggie@googlemail.com">✉️ craigheggie@googlemail.com</a>' +
          '<a class="btn sm soft" href="https://buy.stripe.com/cNi14m8fK7lF8x35MX4wM05" target="_blank" rel="noopener">💙 Support ZenZac</a>' +
        "</div>" +
      "</div>";
  };

  /* ---- Settings ---- */

  VIEWS.settings = function (view) {
    function render() {
      view.innerHTML = pageHead("Settings", "Make it fit your family",
        "Changes are saved on this device straight away.") +
        '<div class="settings-jump" role="group" aria-label="Jump to a settings section">' +
          '<button type="button" class="chip sm" data-jump="setIcons">🧸 Icons &amp; emoji</button>' +
          '<button type="button" class="chip sm" data-jump="setColours">🎨 Colours</button>' +
          '<button type="button" class="chip sm" data-jump="setCreator">💙 Creator &amp; support</button>' +
          '<button type="button" class="chip sm" data-jump="setData">🔒 Your data</button>' +
        "</div>" +
        '<div class="card plan-card">' +
          '<div class="row-between"><div><h2 class="card-title">Your plan</h2>' +
            '<p class="card-sub">' + esc(planText()) + '</p></div>' +
            '<a class="btn sm" href="#/setup">' + icon("sliders") + " Change answers</a></div>" +
        "</div>" +

        '<div class="grid grid-2" style="margin-top:14px">' +
          '<div class="card">' +
            '<h2 class="card-title">Names &amp; sound</h2>' +
            '<div class="stack" style="margin-top:14px">' +
              '<div class="field"><label class="label" for="childName">Child&rsquo;s first name (optional)</label>' +
                '<input class="input" id="childName" maxlength="24" value="' + esc(state.settings.name) + '" placeholder="e.g. Zac"></div>' +
              '<label class="switch">' +
                '<input type="checkbox" id="soundSwitch"' + (state.settings.sound ? " checked" : "") + ">" +
                '<span class="track"><span class="thumb"></span></span>' +
                '<span class="switch-text"><strong>Sound</strong><small>Music, sounds and chimes.</small></span>' +
              "</label>" +
              '<div class="field"><label class="label" for="masterVol">Volume</label>' +
                '<input type="range" id="masterVol" min="0" max="1" step="0.05" value="' + state.settings.volume + '"></div>' +
              '<label class="switch">' +
                '<input type="checkbox" id="voiceSwitch"' + (state.settings.voice ? " checked" : "") + ">" +
                '<span class="track"><span class="thumb"></span></span>' +
                '<span class="switch-text"><strong>Spoken cues</strong><small>Reads breathing and grounding prompts aloud. Uses the device voice.</small></span>' +
              "</label>" +
            "</div>" +
          "</div>" +
          '<div class="card">' +
            '<h2 class="card-title">Comfort</h2>' +
            '<div class="stack" style="margin-top:14px">' +
              '<label class="switch">' +
                '<input type="checkbox" id="motionSwitch"' + (state.settings.motion === "calm" ? " checked" : "") + ">" +
                '<span class="track"><span class="thumb"></span></span>' +
                '<span class="switch-text"><strong>Calm motion</strong><small>Removes background drift and hover movement.</small></span>' +
              "</label>" +
              '<label class="switch">' +
                '<input type="checkbox" id="bigTextSwitch"' + (state.settings.bigText ? " checked" : "") + ">" +
                '<span class="track"><span class="thumb"></span></span>' +
                '<span class="switch-text"><strong>Bigger text</strong><small>Increases all text by about 12%.</small></span>' +
              "</label>" +
              '<p class="tiny muted">Your device&rsquo;s own reduce-motion setting is always respected, whatever this says.</p>' +
            "</div>" +
          "</div>" +
        "</div>" +

        '<div class="section-head"><h2 class="section-title" id="setIcons">Icons &amp; emoji</h2>' +
          '<span class="tiny muted">Same pictures, four finishes. Saved straight away.</span></div>' +
        '<div class="card"><div class="emoji-style-grid" role="group" aria-label="Icon style">' +
          EMOJI_STYLES.map(function (st) {
            var on = (state.settings.emojiStyle || "basic") === st.id;
            return '<button type="button" class="emoji-style-btn s-' + st.id + (on ? " is-on" : "") +
              '" data-pick-emoji="' + st.id + '" aria-pressed="' + on + '">' +
              '<span class="emoji-style-sample" aria-hidden="true"><span>🧸</span><span>🌿</span><span>⭐</span></span>' +
              '<span class="emoji-style-name">' + esc(st.name) + "</span>" +
              '<span class="emoji-style-note">' + esc(st.note) + "</span></button>";
          }).join("") +
        '</div><p class="tiny muted" style="margin-top:12px">Soft, Matt and Gloss pick up the tint of whichever colour palette you choose. Basic uses the plain emoji your device draws.</p></div>' +

        '<div class="section-head"><h2 class="section-title" id="setColours">Colours</h2>' +
          '<span class="tiny muted">Six low-glare palettes, shown as they will look. Saved straight away.</span></div>' +
        '<div class="card"><div class="theme-grid" role="group" aria-label="Colour theme">' +
          D.themes.map(function (t) {
            var on = state.settings.theme === t.id;
            return '<button type="button" class="theme-btn' + (on ? " is-on" : "") + '" data-pick-theme="' + t.id +
              '" aria-pressed="' + (on ? "true" : "false") + '" aria-label="' + esc(t.name) + ": " + esc(t.note) + '">' +
              '<span class="theme-mini" aria-hidden="true" style="background:' + t.sw[0] + ";color:" + t.ink + '">' +
                '<span class="theme-mini-row"><span class="theme-mini-title">Aa</span>' +
                  '<span class="theme-mini-pill" style="background:' + t.sw[1] + ";color:" + t.accentInk + '">Start</span></span>' +
                '<span class="theme-mini-copy" style="color:' + t.mute + '">A calm corner</span>' +
              "</span>" +
              '<span class="theme-swatch" aria-hidden="true">' + t.sw.map(function (c) {
                return '<i style="background:' + c + '"></i>';
              }).join("") + "</span>" +
              '<span class="theme-name">' + esc(t.name) + "</span>" +
              '<span class="theme-note">' + esc(t.note) + "</span></button>";
          }).join("") +
        "</div></div>" +

        '<div class="section-head"><h2 class="section-title" id="setData">Your data</h2></div>' +
        '<div class="card">' +
          '<p class="card-sub">Check-ins, notes and routines live in this browser only. Export a copy before clearing your browser data.</p>' +
          '<div class="row-wrap" style="margin-top:14px">' +
            '<button type="button" class="btn" id="exportData">' + icon("download") + " Export a copy</button>" +
            '<button type="button" class="btn danger" id="resetData">' + icon("trash") + " Delete everything</button>" +
          "</div>" +
          '<hr class="divider">' +
          '<p class="tiny muted">' + state.moods.length + " check-ins · " + state.behaviour.length +
            " tricky moments · " + state.routines.length + " saved lists · " + (state.stickers || 0) + " stickers</p>" +
        "</div>" +

        '<div class="card" style="margin-top:14px">' +
          '<div class="row-between"><div><h2 class="card-title">More help than the app can give</h2>' +
            '<p class="card-sub">Scripts for hard moments, school meetings, sleep, money and your own wellbeing - written for the grown-ups.</p></div>' +
            '<a class="btn sm" href="#/support">Parent support</a></div>' +
        "</div>" +

        '<div class="section-head"><h2 class="section-title" id="setCreator">Creator</h2>' +
          '<span class="tiny muted">Made by a parent, for parents.</span></div>' +
        '<div class="card creator-card">' +
          '<div class="creator-head">' +
            '<span class="creator-avatar" aria-hidden="true">💙</span>' +
            '<div><h2 class="card-title">Craig Heggie</h2>' +
              '<p class="card-sub">Parent, builder of ZenZac, and someone who knows the hard mornings.</p></div>' +
          "</div>" +
          '<p class="creator-story">I am a parent, not a clinician. I built ZenZac after too many mornings where the shoes were missing, everyone was already at the end of their rope and I had no idea what to try next. ADHD and autism are part of my family life, so most of what is in here is what I actually use at home. If any of that sounds familiar and you want to compare notes - or just have a general chat - you can email me directly. No forms, no newsletter, no automation.</p>' +
          '<div class="creator-links">' +
            '<a class="btn sm" href="mailto:craigheggie@googlemail.com">✉️ craigheggie@googlemail.com</a>' +
            '<a class="btn sm soft" href="https://buy.stripe.com/cNi14m8fK7lF8x35MX4wM05" target="_blank" rel="noopener">💙 Support ZenZac</a>' +
          "</div>" +
          '<p class="tiny muted" style="margin-top:12px">ZenZac stays free: no adverts, no accounts and nothing to sign up to. A one-off contribution helps with hosting and the hours behind it, and it is never expected. Replies are slow and honest. This is not a crisis service - if you or your child are at risk, call 999.</p>' +
        "</div>" +

        '<div class="card" style="margin-top:14px">' +
          '<h2 class="card-title">About</h2>' +
          '<p class="card-sub">ZenZac v2 - rebuilt as one calm, offline-friendly app by Craig Heggie. Built for real mornings. Not a medical device.</p>' +
        "</div>";

      bind();
    }

    function planText() {
      var m = D.mode(state.profile.mode);
      var bits = state.profile.hard.length
        ? state.profile.hard.length + (state.profile.hard.length === 1 ? " thing listed" : " things listed")
        : "no answers yet";
      var rules = enabledRules().length;
      return (m ? m.name + " mode" : "No mode set yet") + " · " + bits + " as hard · " + rules +
        (rules === 1 ? " house rule" : " house rules");
    }

    function bind() {
      $$("[data-jump]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var target = document.getElementById(btn.getAttribute("data-jump"));
          if (!target) return;
          if (target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "start" });
          target.setAttribute("tabindex", "-1");
          if (target.focus) target.focus({ preventScroll: true });
        });
      });

      $$("[data-pick-theme]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.settings.theme = btn.getAttribute("data-pick-theme");
          save();
          applyChrome();
          $$("[data-pick-theme]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          toast("Colours changed.");
        });
      });

      $$("[data-pick-emoji]", view).forEach(function (btn) {
        btn.addEventListener("click", function () {
          state.settings.emojiStyle = btn.getAttribute("data-pick-emoji");
          save();
          applyChrome();
          $$("[data-pick-emoji]", view).forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("is-on", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
          });
          toast("Icon style changed.");
        });
      });

      var nameInput = $("#childName");
      if (nameInput) {
        nameInput.addEventListener("change", function () {
          state.settings.name = nameInput.value.trim().slice(0, 24);
          save();
          toast(state.settings.name ? "Hello, " + state.settings.name + "." : "Name cleared.");
        });
      }

      var sound = $("#soundSwitch");
      if (sound) sound.addEventListener("change", function () {
        state.settings.sound = sound.checked;
        AudioEngine.applyMaster();
        save();
        applyChrome();
        toast(sound.checked ? "Sound on." : "Sound off.");
      });

      var vol = $("#masterVol");
      if (vol) vol.addEventListener("input", function () {
        state.settings.volume = parseFloat(vol.value);
        AudioEngine.applyMaster();
        save();
      });

      var voice = $("#voiceSwitch");
      if (voice) voice.addEventListener("change", function () {
        state.settings.voice = voice.checked;
        save();
        toast(voice.checked ? "Spoken cues on." : "Spoken cues off.");
      });

      var motion = $("#motionSwitch");
      if (motion) motion.addEventListener("change", function () {
        state.settings.motion = motion.checked ? "calm" : "full";
        save();
        applyChrome();
        toast(motion.checked ? "Calm motion on." : "Calm motion off.");
      });

      var big = $("#bigTextSwitch");
      if (big) big.addEventListener("change", function () {
        state.settings.bigText = big.checked;
        save();
        applyChrome();
        toast(big.checked ? "Bigger text on." : "Text size reset.");
      });

      var exportBtn = $("#exportData");
      if (exportBtn) exportBtn.addEventListener("click", exportData);

      var reset = $("#resetData");
      if (reset) reset.addEventListener("click", function () {
        if (!window.confirm("Delete all check-ins, notes, routines and settings on this device? This cannot be undone.")) return;
        try { window.localStorage.removeItem(KEY); } catch (e) {}
        state = load();
        applyChrome();
        route();
        toast("Everything deleted. Fresh start.");
      });
    }

    function exportData() { downloadData(); }

    render();
  };

  /* ------------------------------- boot -------------------------------- */

  function init() {
    applyChrome();
    if (!window.location.hash) {
      try { window.history.replaceState(null, "", "#/home"); } catch (e) { window.location.hash = "#/home"; }
    }
    var soundBtn = $("#soundToggle");
    if (soundBtn) {
      soundBtn.addEventListener("click", function () {
        state.settings.sound = !state.settings.sound;
        if (!state.settings.sound) AudioEngine.stopAll();
        save();
        applyChrome();
        toast(state.settings.sound ? "Sound on." : "Sound off.");
      });
    }
    window.addEventListener("hashchange", route);
    route();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
