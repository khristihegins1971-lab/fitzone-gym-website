// ===== ALL JS - NO INLINE ONCLICK - ALL EVENTS ATTACHED IN JS =====
(function () {
    "use strict";

    // ===== CONSTANTS =====
    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MUSCLES = ['All', 'Chest', 'Back', 'Biceps', 'Triceps', 'Shoulders', 'Core', 'Legs', 'Forearms'];
    var MCOL = { Chest: '#ff2d55', Back: '#2979ff', Biceps: '#00e676', Triceps: '#bf5fff', Shoulders: '#ff6a00', Core: '#ffe600', Legs: '#00d4ff', Forearms: '#ff4081' };

    var EX = [
        { id: 'pushup', n: 'Push-ups', m: 'Chest', ic: 'chest', e: ['Bodyweight'], r: 15, s: 3 },
        { id: 'declinepush', n: 'Decline Push-ups', m: 'Chest', ic: 'chest', e: ['Bodyweight'], r: 15, s: 3 },
        { id: 'chestpress', n: 'Chest Press', m: 'Chest', ic: 'chest', e: ['Dumbbell', 'Barbell'], r: 12, s: 3 },
        { id: 'pullup', n: 'Pull-ups', m: 'Back', ic: 'back', e: ['Bodyweight', 'Handmade Machine'], r: 10, s: 4 },
        { id: 'row', n: 'Dumbbell Row', m: 'Back', ic: 'back', e: ['Dumbbell'], r: 12, s: 3 },
        { id: 'latpull', n: 'Lat Pulldown', m: 'Back', ic: 'back', e: ['Cable', 'Resistance Band'], r: 12, s: 3 },
        { id: 'normalcurl', n: 'Bicep Curl', m: 'Biceps', ic: 'biceps', e: ['Dumbbell', 'Barbell', 'Resistance Band'], r: 12, s: 4 },
        { id: 'hammercurl', n: 'Hammer Curl', m: 'Biceps', ic: 'biceps', e: ['Dumbbell', 'Resistance Band'], r: 12, s: 4 },
        { id: 'reversecurl', n: 'Reverse Curl', m: 'Biceps', ic: 'biceps', e: ['Dumbbell', 'Barbell'], r: 12, s: 3 },
        { id: 'concentration', n: 'Concentration Curl', m: 'Biceps', ic: 'biceps', e: ['Dumbbell'], r: 10, s: 3 },
        { id: 'cablebicep', n: 'Cable Curl', m: 'Biceps', ic: 'biceps', e: ['Cable'], r: 12, s: 3 },
        { id: 'tricepdown', n: 'Triceps Pushdown', m: 'Triceps', ic: 'triceps', e: ['Cable', 'Resistance Band'], r: 15, s: 4 },
        { id: 'overtricep', n: 'Overhead Triceps', m: 'Triceps', ic: 'triceps', e: ['Dumbbell', 'Cable', 'Resistance Band'], r: 15, s: 3 },
        { id: 'tricdip', n: 'Tricep Dips', m: 'Triceps', ic: 'triceps', e: ['Bodyweight'], r: 12, s: 3 },
        { id: 'shoulderpress', n: 'Shoulder Press', m: 'Shoulders', ic: 'shoulders', e: ['Dumbbell', 'Barbell', 'Resistance Band'], r: 15, s: 4 },
        { id: 'frontraise', n: 'Front Raise', m: 'Shoulders', ic: 'shoulders', e: ['Dumbbell', 'Resistance Band'], r: 15, s: 3 },
        { id: 'sideraise', n: 'Lateral Raise', m: 'Shoulders', ic: 'shoulders', e: ['Dumbbell', 'Resistance Band', 'Cable'], r: 15, s: 3 },
        { id: 'plank', n: 'Plank', m: 'Core', ic: 'core', e: ['Bodyweight'], r: 45, s: 3 },
        { id: 'crunches', n: 'Crunches', m: 'Core', ic: 'core', e: ['Bodyweight'], r: 20, s: 3 },
        { id: 'legrise', n: 'Leg Raises', m: 'Core', ic: 'core', e: ['Bodyweight'], r: 15, s: 3 },
        { id: 'squat', n: 'Squats', m: 'Legs', ic: 'legs', e: ['Bodyweight', 'Dumbbell', 'Barbell'], r: 20, s: 3 },
        { id: 'lunge', n: 'Lunges', m: 'Legs', ic: 'legs', e: ['Bodyweight', 'Dumbbell'], r: 12, s: 3 },
        { id: 'calfrise', n: 'Calf Raises', m: 'Legs', ic: 'legs', e: ['Bodyweight', 'Dumbbell'], r: 20, s: 3 },
        { id: 'wristcurl', n: 'Wrist Curl', m: 'Forearms', ic: 'forearms', e: ['Dumbbell', 'Resistance Band'], r: 20, s: 3 },
        { id: 'forearmband', n: 'Forearm Band Work', m: 'Forearms', ic: 'forearms', e: ['Resistance Band'], r: 15, s: 3 },
        { id: 'revwristcurl', n: 'Reverse Wrist Curl', m: 'Forearms', ic: 'forearms', e: ['Dumbbell'], r: 15, s: 3 }
    ];

    var EX_ICONS = { chest: '&#128170;', back: '&#128248;', biceps: '&#128170;', triceps: '&#128170;', shoulders: '&#11014;&#65039;', core: '&#129490;', legs: '&#129466;', forearms: '&#127337;&#65039;' };

    var DEF_PLAN = {
        0: { n: 'SUNDAY', f: 'Full Rest', rest: true, tips: ['Complete rest', 'Light stretching', 'Sleep 8+ hours', 'Meal prep'] },
        1: { n: 'MONDAY', f: 'Back + Biceps', ex: ['pullup', 'hammercurl', 'normalcurl', 'reversecurl', 'wristcurl'] },
        2: { n: 'TUESDAY', f: 'Chest + Triceps', ex: ['pushup', 'declinepush', 'tricepdown', 'overtricep'] },
        3: { n: 'WEDNESDAY', f: 'Shoulders + Core', ex: ['shoulderpress', 'frontraise', 'sideraise', 'plank'] },
        4: { n: 'THURSDAY', f: 'Recovery Day', rest: true, tips: ['Light walk 20-30 min', 'Stretching', 'No heavy arms', 'Hydrate well'] },
        5: { n: 'FRIDAY', f: 'Back + Biceps', ex: ['pullup', 'normalcurl', 'hammercurl', 'reversecurl', 'forearmband'] },
        6: { n: 'SATURDAY', f: 'Chest + Triceps + Shoulders', ex: ['pushup', 'tricepdown', 'shoulderpress', 'frontraise'] }
    };

    var DEF_CHK = [
        { id: 'creatine', l: 'Creatine 3g', i: '&#128138;' },
        { id: 'eggs', l: '4 Eggs', i: '&#129370;' },
        { id: 'shake', l: 'Night Shake', i: '&#129379;' },
        { id: 'water3l', l: '3L+ Water', i: '&#128167;' },
        { id: 'workout', l: 'Workout Done', i: '&#127947;' },
        { id: 'english', l: 'English Study', i: '&#128216;' },
        { id: 'datascience', l: 'Data Science', i: '&#128187;' },
        { id: 'prayer', l: 'Prayer', i: '&#129330;' },
        { id: 'sleep', l: 'Sleep 7 Hours+', i: '&#128564;' }
    ];

    var DIET_DATA = [
        { t: '7:00 AM', items: [{ id: 'd1', l: 'Water 500ml', c: 0 }] },
        { t: '9:00 AM', items: [{ id: 'd2', l: 'Chai + 1 tsp Ghee', c: 80 }] },
        { t: '11:00 AM', items: [{ id: 'd3', l: '3 Roti', c: 240 }, { id: 'd4', l: 'Sabji', c: 100 }, { id: 'd5', l: 'Dal', c: 120 }] },
        { t: '3-4 PM', items: [{ id: 'd6', l: '4 Eggs', c: 280 }] },
        { t: '7:30-8 PM', items: [{ id: 'd7', l: 'Dinner Roti (3)', c: 240 }, { id: 'd8', l: 'Sabji', c: 100 }, { id: 'd9', l: 'Dal', c: 120 }] },
        { t: '9:00 PM', items: [{ id: 'd10', l: 'Night Shake', c: 350 }, { id: 'd11', l: 'Banana (optional)', c: 90 }] }
    ];

    var PR_FIELDS = [
        { id: 'weight', l: 'Body Weight', u: 'kg' },
        { id: 'pullup_max', l: 'Max Pull-ups', u: 'reps' },
        { id: 'pushup_max', l: 'Max Push-ups', u: 'reps' },
        { id: 'arm_size', l: 'Arm Size', u: 'cm' },
        { id: 'waist', l: 'Waist Size', u: 'cm' }
    ];

    // ===== STORAGE =====
    function today() { return new Date().toISOString().slice(0, 10); }
    function pad2(n) { return String(n).padStart(2, '0'); }

    function LS(key, def) {
        try {
            var v = localStorage.getItem(key);
            return (v !== null && v !== undefined) ? JSON.parse(v) : def;
        } catch (e) { return def; }
    }
    function SS(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
    }

    var T = today();
    var S = LS('gymlog_settings', { waterGoal: 3500, calGoal: 2200, userName: '' });
    var CHK_ITEMS = LS('gymlog_chk_items', DEF_CHK);
    var W_PLAN = LS('gymlog_wplan', DEF_PLAN);

    function getWLogs() { return LS('gymlog_water_' + T, []); }
    function getChkData() { return LS('gymlog_chkdata_' + T, {}); }
    function getDietData() { return LS('gymlog_diet_' + T, {}); }
    function getWkData() { return LS('gymlog_wk_' + T, {}); }

    function saveWLogs(v) { SS('gymlog_water_' + T, v); }
    function saveChkData(v) { SS('gymlog_chkdata_' + T, v); }
    function saveDietData(v) { SS('gymlog_diet_' + T, v); }
    function saveWkData(v) { SS('gymlog_wk_' + T, v); }

    function getHist() { return LS('gymlog_history', {}); }
    function saveHist(v) { SS('gymlog_history', v); }
    function getPR() { return LS('gymlog_pr', {}); }
    function savePR(v) { SS('gymlog_pr', v); }

    // ===== NAVIGATION =====
    var PAGES = ['today', 'workout', 'water', 'exercises', 'diet', 'calendar', 'progress', 'master'];
    var currentPage = 'today';

    function go(pg) {
        currentPage = pg;
        PAGES.forEach(function (p) {
            var el = document.getElementById('page-' + p);
            var tab = document.getElementById('tab-' + p);
            var nav = document.getElementById('nav-' + p);
            if (el) el.classList.toggle('on', p === pg);
            if (tab) tab.classList.toggle('on', p === pg);
            if (nav) nav.classList.toggle('on', p === pg);
        });
        document.getElementById('content').scrollTop = 0;
        if (pg === 'workout') renderWorkout();
        if (pg === 'calendar') renderCal();
        if (pg === 'progress') renderProgress();
        if (pg === 'exercises') renderExPage();
        if (pg === 'master') renderMaster();
    }

    // ===== WEATHER =====
    function loadWeather() {
        var url = 'https://api.open-meteo.com/v1/forecast?latitude=22.8329&longitude=72.7398&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature&timezone=Asia%2FKolkata';
        var WIM = { '0': '&#9728;&#65039;', '1': '&#127780;&#65039;', '2': '&#9925;', '3': '&#9729;', '45': '&#127787;&#65039;', '51': '&#127782;&#65039;', '61': '&#127783;&#65039;', '71': '&#10052;', '80': '&#127783;&#65039;', '95': '&#9928;&#65039;' };
        var WDM = { '0': 'Clear Sky', '1': 'Mainly Clear', '2': 'Partly Cloudy', '3': 'Overcast', '45': 'Foggy', '51': 'Light Drizzle', '61': 'Rain', '71': 'Snow', '80': 'Rain Showers', '95': 'Thunderstorm' };
        fetch(url).then(function (r) { return r.json(); }).then(function (d) {
            var c = d.current;
            document.getElementById('wx-temp').innerHTML = Math.round(c.temperature_2m) + '&deg;C';
            document.getElementById('wx-desc').textContent = (WDM[c.weathercode] || 'Clear') + ' - Feels ' + Math.round(c.apparent_temperature) + String.fromCharCode(176);
            document.getElementById('wx-icon').innerHTML = WIM[String(c.weathercode)] || '&#127780;&#65039;';
            document.getElementById('wx-ext').textContent = 'Humidity: ' + c.relativehumidity_2m + '% | Wind: ' + Math.round(c.windspeed_10m) + 'km/h';
        }).catch(function () {
            document.getElementById('wx-desc').textContent = 'Weather unavailable - check internet';
        });
    }
    setInterval(loadWeather, 600000);

    // ===== HEADER UPDATE =====
    function updateHdr() {
        var wk = getWkData();
        var sets = 0;
        Object.keys(wk).forEach(function (id) {
            (wk[id].sets || []).forEach(function (s) { if (s && s.done) sets++; });
        });
        var chk = getChkData();
        var done = 0;
        Object.keys(chk).forEach(function (k) { if (chk[k]) done++; });
        var wlogs = getWLogs();
        var ml = wlogs.reduce(function (a, b) { return a + b.amount; }, 0);
        document.getElementById('h-w').textContent = ml;
        document.getElementById('h-s').textContent = sets;
        document.getElementById('h-c').textContent = done + '/' + CHK_ITEMS.length;
    }

    function calcStreak() {
        var hist = getHist();
        var streak = 0;
        var d = new Date();
        for (var i = 0; i < 365; i++) {
            var k = d.toISOString().slice(0, 10);
            var day = hist[k];
            if (day && (day.sets > 0 || day.checks > 0)) streak++;
            else if (i > 0) break;
            d.setDate(d.getDate() - 1);
        }
        document.getElementById('h-stk').textContent = '&#128293;' + streak;
        document.getElementById('h-stk').innerHTML = '&#128293;' + streak;
    }

    // ===== TODAY PAGE =====
    function renderToday() {
        var d = new Date();
        var dow = d.getDay();
        document.getElementById('hdate').textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
        var plan = W_PLAN[dow] || DEF_PLAN[dow];
        document.getElementById('day-name').textContent = plan.n || DAYS[dow].toUpperCase();
        document.getElementById('day-focus').textContent = plan.f || '';
        renderChk();
        renderTodayEx();
        updateHdr();
        calcStreak();
    }

    function renderChk() {
        var chk = getChkData();
        var html = '';
        CHK_ITEMS.forEach(function (item) {
            var done = !!chk[item.id];
            html += '<div class="chk-item" data-id="' + item.id + '">';
            html += '<div class="chk-box' + (done ? ' done' : '') + '">' + (done ? '&#10003;' : '') + '</div>';
            html += '<span style="font-size:15px">' + item.i + '</span>';
            html += '<span class="chk-lbl' + (done ? ' done' : '') + '">' + item.l + '</span>';
            html += '</div>';
        });
        document.getElementById('chklist').innerHTML = html;
        document.getElementById('chklist').querySelectorAll('.chk-item').forEach(function (el) {
            el.addEventListener('click', function () {
                var id = el.getAttribute('data-id');
                var chk2 = getChkData();
                chk2[id] = !chk2[id];
                saveChkData(chk2);
                renderChk();
                updateHdr();
                var item = CHK_ITEMS.find(function (x) { return x.id === id; });
                if (chk2[id]) showToast((item ? item.l : 'Task') + ' done!');
            });
        });
    }

    function renderTodayEx() {
        var dow = new Date().getDay();
        var plan = W_PLAN[dow] || DEF_PLAN[dow];
        var el = document.getElementById('today-exlist');
        if (!plan || plan.rest) {
            el.innerHTML = '<div style="color:var(--mu);text-align:center;padding:18px;font-size:13px">Rest day - recover well! &#129490;</div>';
            return;
        }
        var wk = getWkData();
        var html = '';
        (plan.ex || []).forEach(function (exId) {
            var ex = EX.find(function (e) { return e.id === exId; }) || { id: exId, n: exId, m: 'Other', r: 12, s: 3 };
            var exd = wk[exId] || { sets: [], targetSets: ex.s };
            var sets = exd.sets || [];
            var ts = exd.targetSets || ex.s;
            var done = sets.filter(function (s) { return s && s.done; }).length;
            var isDone = done >= ts && ts > 0;
            var col = MCOL[ex.m] || '#aaa';
            var prog = isDone ? 'Complete &#10003;' : (done > 0 ? done + '/' + ts + ' sets' : 'Not started');
            html += '<div class="tex' + (isDone ? ' done' : '') + '" data-exid="' + exId + '">';
            html += '<div class="tex-ico">' + (EX_ICONS[ex.ic] || '&#128170;') + '</div>';
            html += '<div style="flex:1"><div class="tex-name">' + ex.n + '</div><div class="tex-sub" style="color:' + col + '">' + ex.m + ' - <span>' + prog + '</span></div></div>';
            html += '<div class="tex-chk' + (isDone ? ' done' : '') + '">' + (isDone ? '&#10003;' : '&#9675;') + '</div>';
            html += '</div>';
        });
        el.innerHTML = html;
        el.querySelectorAll('.tex').forEach(function (card) {
            card.addEventListener('click', function () {
                var exId = card.getAttribute('data-exid');
                toggleTodayEx(exId);
            });
        });
    }

    function toggleTodayEx(exId) {
        var wk = getWkData();
        var ex = EX.find(function (e) { return e.id === exId; }) || { r: 12, s: 3, e: ['Bodyweight'] };
        if (!wk[exId]) wk[exId] = { sets: [], targetSets: ex.s, equip: ex.e[0] };
        var exd = wk[exId];
        var ts = exd.targetSets || ex.s;
        var done = (exd.sets || []).filter(function (s) { return s && s.done; }).length;
        var shouldDone = done < ts;
        while (exd.sets.length < ts) exd.sets.push({ reps: ex.r, weight: '', done: false });
        for (var i = 0; i < ts; i++) {
            if (!exd.sets[i]) exd.sets[i] = { reps: ex.r, weight: '', done: false };
            exd.sets[i].done = shouldDone;
        }
        saveWkData(wk);
        renderTodayEx();
        updateHdr();
        if (shouldDone) showToast(ex.n + ' complete! &#128170;');
        if (currentPage === 'workout') renderWorkout();
    }

    // ===== WORKOUT PAGE =====
    function getExIcon(ex) { return EX_ICONS[ex.ic] || '&#128170;'; }

    function renderWorkout() {
        var dow = new Date().getDay();
        var plan = W_PLAN[dow] || DEF_PLAN[dow];
        document.getElementById('wk-day').textContent = plan.n || DAYS[dow].toUpperCase();
        document.getElementById('wk-focus').textContent = plan.f || '';
        var el = document.getElementById('wk-list');
        if (plan.rest) {
            var tipsHtml = (plan.tips || []).map(function (t) {
                return '<div style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:13px;color:var(--mu2)">&#8594; ' + t + '</div>';
            }).join('');
            el.innerHTML = '<div style="background:linear-gradient(135deg,rgba(255,230,0,.08),transparent);border:1px solid rgba(255,230,0,.2);border-radius:14px;padding:22px;text-align:center"><div style="font-size:44px;margin-bottom:8px">&#129490;</div><div style="font-family:Orbitron,monospace;font-size:19px;color:var(--y);letter-spacing:3px">' + plan.f + '</div><div style="margin-top:12px;text-align:left">' + tipsHtml + '</div></div>';
            return;
        }
        var wk = getWkData();
        var exIds = plan.ex || [];
        exIds.forEach(function (exId) {
            if (!wk[exId]) {
                var ex2 = EX.find(function (e) { return e.id === exId; }) || { r: 12, s: 3, e: ['Bodyweight'] };
                wk[exId] = { sets: [], targetSets: ex2.s, equip: ex2.e[0] };
            }
            var exd = wk[exId];
            if (!exd.sets || exd.sets.length === 0) {
                var ex3 = EX.find(function (e) { return e.id === exId; }) || { r: 12, s: 3 };
                for (var i = 0; i < (exd.targetSets || ex3.s); i++) exd.sets.push({ reps: ex3.r, weight: '', done: false });
            }
        });
        var extraIds = Object.keys(wk).filter(function (id) { return exIds.indexOf(id) < 0; });
        saveWkData(wk);
        var allIds = exIds.concat(extraIds);
        el.innerHTML = allIds.map(function (id) { return buildWkCard(id, wk); }).join('');
        attachWkEvents(allIds);
        checkAllDone(allIds, wk);
    }

    function buildWkCard(exId, wk) {
        var ex = EX.find(function (e) { return e.id === exId; }) || { id: exId, n: exId, m: 'Other', ic: 'chest', e: ['Bodyweight'], r: 12, s: 3 };
        var exd = wk[exId] || { sets: [], targetSets: ex.s, equip: ex.e[0] };
        var sets = exd.sets || [];
        var ts = exd.targetSets || ex.s;
        var done = sets.filter(function (s) { return s && s.done; }).length;
        var col = MCOL[ex.m] || '#aaa';
        var ratio = ts > 0 ? done / ts : 0;
        var sc = ratio >= 1 ? 'sg' : ratio >= 0.7 ? 'sy' : ratio >= 0.4 ? 'sr' : done > 0 ? 'sb' : '';
        var emoji = ratio >= 1 ? '&#128994;' : ratio >= 0.7 ? '&#128993;' : ratio >= 0.4 ? '&#128308;' : done > 0 ? '&#128309;' : '&#9898;';
        var eqHtml = (ex.e || ['Bodyweight']).map(function (eq) {
            return '<button class="eqb' + ((exd.equip || ex.e[0]) === eq ? ' on' : '') + '" data-exid="' + exId + '" data-eq="' + eq + '">' + eq + '</button>';
        }).join('');
        var setsHtml = sets.map(function (s, i) {
            return '<div class="srow" data-exid="' + exId + '" data-idx="' + i + '">'
                + '<span class="snum">' + (i + 1) + '</span>'
                + '<button class="schk' + (s.done ? ' done' : '') + '" data-action="toggleset" data-exid="' + exId + '" data-idx="' + i + '">' + (s.done ? '&#10003;' : '&#9675;') + '</button>'
                + '<div class="stepper">'
                + '<button class="stpb" data-action="stepr" data-exid="' + exId + '" data-idx="' + i + '" data-delta="-1">&#8722;</button>'
                + '<input class="stpv" type="number" value="' + (s.reps || ex.r) + '" data-action="updater" data-exid="' + exId + '" data-idx="' + i + '">'
                + '<button class="stpb" data-action="stepr" data-exid="' + exId + '" data-idx="' + i + '" data-delta="1">+</button>'
                + '</div>'
                + '<span style="font-size:9px;color:var(--mu)">reps</span>'
                + '<input class="kgi" type="number" placeholder="kg" value="' + (s.weight || '') + '" data-action="updatew" data-exid="' + exId + '" data-idx="' + i + '">'
                + (s.done ? '<button class="rest-btn-s" data-action="startrest">&#9201;</button>' : '')
                + '<button class="delbtn" data-action="delset" data-exid="' + exId + '" data-idx="' + i + '">&#215;</button>'
                + '</div>';
        }).join('');
        return '<div class="wcard ' + sc + '" id="wc-' + exId + '">'
            + '<div class="wcard-h" data-action="togglebody" data-exid="' + exId + '">'
            + '<div style="display:flex;align-items:center;gap:9px">'
            + '<div style="width:35px;height:35px;border-radius:9px;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:17px">' + getExIcon(ex) + '</div>'
            + '<div><div style="font-size:14px;font-weight:700">' + ex.n + '</div>'
            + '<div style="font-size:10px;color:var(--mu2);margin-top:2px"><span style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;border:1px solid ' + col + '55;color:' + col + '">' + ex.m + '</span> ' + done + '/' + ts + ' sets' + (ratio >= 1 ? ' &#10003;' : '') + '</div></div>'
            + '</div><span style="font-size:22px">' + emoji + '</span>'
            + '</div>'
            + '<div class="wcard-body" id="wb-' + exId + '">'
            + '<div class="eq-row">' + eqHtml + '</div>'
            + '<div id="sets-' + exId + '">' + setsHtml + '</div>'
            + '<button class="add-set-btn" data-action="addset" data-exid="' + exId + '">+ ADD SET</button>'
            + '</div></div>';
    }

    function attachWkEvents(allIds) {
        var el = document.getElementById('wk-list');
        el.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-action]');
            if (!btn) return;
            var action = btn.getAttribute('data-action');
            var exId = btn.getAttribute('data-exid');
            var idx = parseInt(btn.getAttribute('data-idx'));
            if (action === 'togglebody') {
                var body = document.getElementById('wb-' + exId);
                if (body) body.classList.toggle('open');
            } else if (action === 'toggleset') {
                var wk = getWkData();
                if (!wk[exId] || !wk[exId].sets[idx]) return;
                wk[exId].sets[idx].done = !wk[exId].sets[idx].done;
                saveWkData(wk);
                rebuildCard(exId);
                updateHdr();
                renderTodayEx();
                if (wk[exId].sets[idx].done) { showToast('Set ' + (idx + 1) + ' done! &#128293;'); startRest(60); }
            } else if (action === 'stepr') {
                var delta = parseInt(btn.getAttribute('data-delta'));
                var wk = getWkData();
                if (!wk[exId] || !wk[exId].sets[idx]) return;
                wk[exId].sets[idx].reps = Math.max(1, (wk[exId].sets[idx].reps || 12) + delta);
                saveWkData(wk);
                var inp = document.querySelector('.stpv[data-exid="' + exId + '"][data-idx="' + idx + '"]');
                if (inp) inp.value = wk[exId].sets[idx].reps;
            } else if (action === 'delset') {
                var wk = getWkData();
                if (!wk[exId]) return;
                wk[exId].sets.splice(idx, 1);
                if (wk[exId].targetSets > 0) wk[exId].targetSets--;
                saveWkData(wk);
                renderWorkout();
            } else if (action === 'addset') {
                var wk = getWkData();
                var ex = EX.find(function (e) { return e.id === exId; }) || { r: 12, s: 3 };
                if (!wk[exId]) wk[exId] = { sets: [], targetSets: ex.s, equip: ex.e[0] };
                wk[exId].sets.push({ reps: ex.r, weight: '', done: false });
                wk[exId].targetSets = (wk[exId].targetSets || ex.s) + 1;
                saveWkData(wk);
                renderWorkout();
            } else if (action === 'startrest') {
                startRest(60);
            }
        });
        el.addEventListener('change', function (e) {
            var inp = e.target.closest('[data-action]');
            if (!inp) return;
            var action = inp.getAttribute('data-action');
            var exId = inp.getAttribute('data-exid');
            var idx = parseInt(inp.getAttribute('data-idx'));
            var wk = getWkData();
            if (!wk[exId] || !wk[exId].sets[idx]) return;
            if (action === 'updater') { wk[exId].sets[idx].reps = Math.max(1, parseInt(inp.value) || 1); }
            if (action === 'updatew') { wk[exId].sets[idx].weight = inp.value; }
            if (action === 'eq') { }
            saveWkData(wk);
        });
        el.addEventListener('click', function (e) {
            var btn = e.target.closest('.eqb');
            if (!btn) return;
            var exId = btn.getAttribute('data-exid');
            var eq = btn.getAttribute('data-eq');
            var wk = getWkData();
            if (wk[exId]) { wk[exId].equip = eq; saveWkData(wk); }
            renderWorkout();
        });
    }

    function rebuildCard(exId) {
        var wk = getWkData();
        var old = document.getElementById('wc-' + exId);
        if (!old) return;
        var wasOpen = document.getElementById('wb-' + exId) && document.getElementById('wb-' + exId).classList.contains('open');
        var tmp = document.createElement('div');
        tmp.innerHTML = buildWkCard(exId, wk);
        old.parentNode.replaceChild(tmp.firstChild, old);
        if (wasOpen) { var b = document.getElementById('wb-' + exId); if (b) b.classList.add('open'); }
        var dow = new Date().getDay();
        var plan = W_PLAN[dow] || DEF_PLAN[dow];
        var allIds = (plan.ex || []).concat(Object.keys(wk).filter(function (id) { return (plan.ex || []).indexOf(id) < 0; }));
        checkAllDone(allIds, wk);
        // re-attach events
        var newCard = document.getElementById('wc-' + exId);
        if (newCard) {
            newCard.addEventListener('click', function (e) {
                var btn2 = e.target.closest('[data-action]');
                if (!btn2) return;
                var act = btn2.getAttribute('data-action');
                var eid = btn2.getAttribute('data-exid');
                var idx2 = parseInt(btn2.getAttribute('data-idx'));
                if (act === 'togglebody') {
                    var body2 = document.getElementById('wb-' + eid);
                    if (body2) body2.classList.toggle('open');
                } else if (act === 'toggleset') {
                    var wk2 = getWkData();
                    if (!wk2[eid] || !wk2[eid].sets[idx2]) return;
                    wk2[eid].sets[idx2].done = !wk2[eid].sets[idx2].done;
                    saveWkData(wk2);
                    rebuildCard(eid);
                    updateHdr();
                    renderTodayEx();
                    if (wk2[eid].sets[idx2].done) { showToast('Set ' + (idx2 + 1) + ' done! &#128293;'); startRest(60); }
                } else if (act === 'stepr') {
                    var delta2 = parseInt(btn2.getAttribute('data-delta'));
                    var wk2 = getWkData();
                    if (!wk2[eid] || !wk2[eid].sets[idx2]) return;
                    wk2[eid].sets[idx2].reps = Math.max(1, (wk2[eid].sets[idx2].reps || 12) + delta2);
                    saveWkData(wk2);
                    var sv2 = document.querySelector('.stpv[data-exid="' + eid + '"][data-idx="' + idx2 + '"]');
                    if (sv2) sv2.value = wk2[eid].sets[idx2].reps;
                } else if (act === 'delset') {
                    var wk2 = getWkData(); if (!wk2[eid]) return;
                    wk2[eid].sets.splice(idx2, 1); if (wk2[eid].targetSets > 0) wk2[eid].targetSets--;
                    saveWkData(wk2); renderWorkout();
                } else if (act === 'addset') {
                    var wk2 = getWkData();
                    var ex2 = EX.find(function (e2) { return e2.id === eid; }) || { r: 12, s: 3 };
                    if (!wk2[eid]) wk2[eid] = { sets: [], targetSets: ex2.s, equip: ex2.e[0] };
                    wk2[eid].sets.push({ reps: ex2.r, weight: '', done: false });
                    wk2[eid].targetSets = (wk2[eid].targetSets || ex2.s) + 1;
                    saveWkData(wk2); renderWorkout();
                } else if (act === 'startrest') { startRest(60); }
            });
        }
    }

    function checkAllDone(ids, wk) {
        var banner = document.getElementById('cbanner');
        if (!banner || !ids.length) return;
        var allDone = ids.every(function (id) {
            var exd = wk[id] || { sets: [], targetSets: 3 };
            var ts = exd.targetSets || 3;
            var done = (exd.sets || []).filter(function (s) { return s && s.done; }).length;
            return done >= ts;
        });
        banner.classList.toggle('on', allDone);
    }

    function saveDay() {
        var hist = getHist();
        var dow = new Date().getDay();
        var plan = W_PLAN[dow] || DEF_PLAN[dow];
        var wk = getWkData();
        var chk = getChkData();
        var diet = getDietData();
        var sets = 0;
        Object.keys(wk).forEach(function (id) {
            (wk[id].sets || []).forEach(function (s) { if (s && s.done) sets++; });
        });
        var chkDone = 0;
        Object.keys(chk).forEach(function (k) { if (chk[k]) chkDone++; });
        var cal = 0;
        DIET_DATA.forEach(function (m) { m.items.forEach(function (it) { if (diet[it.id]) cal += it.c; }); });
        var wlogs = getWLogs();
        var water = wlogs.reduce(function (a, b) { return a + b.amount; }, 0);
        var exArr = [];
        Object.keys(wk).forEach(function (id) {
            var d = (wk[id].sets || []).filter(function (s) { return s && s.done; }).length;
            if (d > 0) exArr.push({ id: id, sets: d });
        });
        hist[T] = { date: T, water: water, sets: sets, checks: chkDone, totalChecks: CHK_ITEMS.length, day: plan.n, focus: plan.f, calories: cal, exercises: exArr };
        saveHist(hist);
        updateHdr();
        calcStreak();
        showToast('Day saved! &#127919;');
    }

    // ===== WATER =====
    function renderWater() {
        var logs = getWLogs();
        var goal = S.waterGoal || 3500;
        var tot = logs.reduce(function (a, b) { return a + b.amount; }, 0);
        var pct = Math.min(tot / goal * 100, 100);
        var circ = 2 * Math.PI * 70;
        var ring = document.getElementById('w-ring');
        ring.style.strokeDasharray = circ;
        ring.style.strokeDashoffset = circ * (1 - pct / 100);
        document.getElementById('r-pct').textContent = Math.round(pct) + '%';
        document.getElementById('r-ml').textContent = tot + '/' + goal + 'ml';
        document.getElementById('r-ltr').textContent = (tot / 1000).toFixed(2) + ' L';
        var rem = Math.max(0, goal - tot);
        document.getElementById('wi-1').textContent = tot + ' ml';
        document.getElementById('wi-2').textContent = (tot / 1000).toFixed(2) + ' L';
        document.getElementById('wi-2').style.color = tot >= goal ? 'var(--g)' : 'var(--c)';
        document.getElementById('wi-3').textContent = rem + ' ml';
        document.getElementById('wi-3').style.color = rem === 0 ? 'var(--g)' : 'var(--y)';
        document.getElementById('wi-4').textContent = goal + ' ml';
        document.getElementById('h-w').textContent = tot;
        var logEl = document.getElementById('w-log');
        if (!logs.length) {
            logEl.innerHTML = '<div style="color:var(--mu);text-align:center;padding:20px;font-size:12px">NO WATER LOGGED YET &#128167;</div>';
            return;
        }
        var html = '';
        for (var i = logs.length - 1; i >= 0; i--) {
            var l = logs[i];
            html += '<div class="wlog-item">';
            html += '<span style="color:var(--b);font-family:Orbitron,monospace;font-size:13px;font-weight:700">' + l.amount + 'ml <span style="font-size:10px;color:var(--c)">' + (l.amount / 1000).toFixed(2) + 'L</span></span>';
            html += '<span style="color:var(--mu);font-size:11px">' + new Date(l.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span>';
            html += '</div>';
        }
        logEl.innerHTML = html;
    }

    function addWater(amt) {
        var logs = getWLogs();
        logs.push({ amount: amt, time: Date.now() });
        saveWLogs(logs);
        renderWater();
        updateHdr();
        showToast('+' + amt + 'ml &#128167;');
    }

    // ===== EXERCISES PAGE =====
    var exPageDow = new Date().getDay();
    var activeMuscle = 'All';

    function renderExPage() {
        var todayDow = new Date().getDay();
        var dtHtml = '';
        DAYS.forEach(function (name, i) {
            dtHtml += '<button class="dtb' + (i === exPageDow ? ' on' : '') + (i === todayDow ? ' td' : '') + '" data-dow="' + i + '">' + name.slice(0, 3).toUpperCase() + (i === todayDow ? ' *' : '') + '</button>';
        });
        document.getElementById('day-tabs').innerHTML = dtHtml;
        document.getElementById('day-tabs').querySelectorAll('.dtb').forEach(function (btn) {
            btn.addEventListener('click', function () { exPageDow = parseInt(btn.getAttribute('data-dow')); renderExPage(); });
        });
        var mHtml = '';
        MUSCLES.forEach(function (m) {
            mHtml += '<button class="mfb' + (activeMuscle === m ? ' on' : '') + '" data-muscle="' + m + '">' + m + '</button>';
        });
        document.getElementById('muscle-row').innerHTML = mHtml;
        document.getElementById('muscle-row').querySelectorAll('.mfb').forEach(function (btn) {
            btn.addEventListener('click', function () { activeMuscle = btn.getAttribute('data-muscle'); renderExPage(); });
        });
        renderExLib();
    }

    function renderExLib() {
        var q = (document.getElementById('ex-search').value || '').toLowerCase();
        var todayDow = new Date().getDay();
        var isToday = exPageDow === todayDow;
        var plan = W_PLAN[exPageDow] || DEF_PLAN[exPageDow];
        var dayKey = 'gymlog_wk_' + (isToday ? T : (function () {
            var d = new Date(); d.setDate(d.getDate() + (exPageDow - d.getDay())); return d.toISOString().slice(0, 10);
        })());
        var dayStored = LS(dayKey, {});
        var planIds = plan.rest ? [] : (plan.ex || []);
        var extraIds = Object.keys(dayStored).filter(function (id) { return planIds.indexOf(id) < 0; });
        var filtered = EX.filter(function (ex) {
            var mOk = activeMuscle === 'All' || ex.m === activeMuscle;
            var qOk = !q || ex.n.toLowerCase().indexOf(q) >= 0 || ex.m.toLowerCase().indexOf(q) >= 0;
            return mOk && qOk;
        });
        var html = '';
        if (!q && activeMuscle === 'All') {
            if (plan.rest) {
                html += '<div style="background:rgba(255,230,0,.07);border:1px solid rgba(255,230,0,.2);border-radius:14px;padding:18px;text-align:center;margin-bottom:12px"><div style="font-size:34px">&#129490;</div><div style="font-family:Orbitron,monospace;font-size:16px;color:var(--y);letter-spacing:2px;margin-top:6px">' + plan.f + '</div></div>';
            } else {
                html += '<div class="st" style="margin-bottom:8px">' + DAYS[exPageDow].toUpperCase() + (isToday ? ' (TODAY)' : '') + (plan.f ? ' - ' + plan.f : '') + '</div>';
                planIds.forEach(function (id) {
                    var ex = EX.find(function (e) { return e.id === id; }) || { id: id, n: id, m: 'Other', e: ['Bodyweight'] };
                    var exd = dayStored[id];
                    var done = exd ? (exd.sets || []).filter(function (s) { return s && s.done; }).length : 0;
                    var ts = exd ? (exd.targetSets || ex.s || 3) : (ex.s || 3);
                    var col = MCOL[ex.m] || '#aaa';
                    var prog = done >= ts && ts > 0 ? '&#10003; DONE' : done + '/' + ts;
                    html += '<div class="lib-card" data-addex="' + id + '" style="border-color:' + (done >= ts && ts > 0 ? 'rgba(0,230,118,.4)' : col + '44') + '">'
                        + '<div style="display:flex;align-items:center;gap:10px"><div class="lib-ico">' + getExIcon(ex) + '</div>'
                        + '<div><div class="lib-name">' + ex.n + '</div><div class="lib-meta">' + ex.e.join(' - ') + '</div>'
                        + '<div class="lib-meta" style="color:' + (done >= ts && ts > 0 ? 'var(--g)' : col) + '">' + prog + '</div></div></div>'
                        + '<span class="mtag" style="border-color:' + col + ';color:' + col + '">' + ex.m + '</span>'
                        + '</div>';
                });
                if (extraIds.length) {
                    html += '<div class="st" style="margin:10px 0 8px">EXTRA TODAY</div>';
                    extraIds.forEach(function (id) {
                        var ex = EX.find(function (e) { return e.id === id; }) || { id: id, n: id, m: 'Other', ic: 'chest' };
                        var col = MCOL[ex.m] || '#aaa';
                        html += '<div class="lib-card" data-addex="' + id + '" style="border-color:rgba(0,230,118,.3)">'
                            + '<div style="display:flex;align-items:center;gap:10px"><div class="lib-ico">' + getExIcon(ex) + '</div>'
                            + '<div><div class="lib-name">' + ex.n + '</div><div class="lib-meta" style="color:var(--g)">Extra - Added</div></div></div>'
                            + '<span class="mtag" style="border-color:' + col + ';color:' + col + '">' + ex.m + '</span>'
                            + '</div>';
                    });
                }
                html += '<div class="st" style="margin:14px 0 8px">ALL EXERCISES - TAP TO ADD</div>';
            }
        }
        filtered.forEach(function (ex) {
            var col = MCOL[ex.m] || '#aaa';
            var inPlan = planIds.indexOf(ex.id) >= 0 || !!dayStored[ex.id];
            html += '<div class="lib-card" data-addex="' + ex.id + '">'
                + '<div style="display:flex;align-items:center;gap:10px"><div class="lib-ico" style="border:1px solid ' + col + '33">' + getExIcon(ex) + '</div>'
                + '<div><div class="lib-name">' + ex.n + (inPlan ? ' <span style="color:var(--g);font-size:9px">&#10003;</span>' : '') + '</div>'
                + '<div class="lib-meta">' + ex.e.join(' - ') + '</div>'
                + '<div class="lib-meta">' + ex.s + 'x ' + ex.r + ' reps default</div></div></div>'
                + '<span class="mtag" style="border-color:' + col + ';color:' + col + '">' + ex.m + '</span>'
                + '</div>';
        });
        if (!filtered.length && q) html += '<div style="color:var(--mu);text-align:center;padding:22px;font-size:12px">No exercises found</div>';
        document.getElementById('ex-lib').innerHTML = html;
        document.getElementById('ex-lib').querySelectorAll('[data-addex]').forEach(function (card) {
            card.addEventListener('click', function () {
                var exId = card.getAttribute('data-addex');
                var isT = exPageDow === new Date().getDay();
                var dKey = 'gymlog_wk_' + (isT ? T : (function () { var d = new Date(); d.setDate(d.getDate() + (exPageDow - d.getDay())); return d.toISOString().slice(0, 10); })());
                var all = LS(dKey, {});
                if (!all[exId]) {
                    var ex2 = EX.find(function (e) { return e.id === exId; }) || { r: 12, s: 3, e: ['Bodyweight'] };
                    all[exId] = { sets: [], targetSets: ex2.s, equip: ex2.e[0] };
                    SS(dKey, all);
                }
                var nm = (EX.find(function (e) { return e.id === exId; }) || { n: exId }).n;
                showToast(nm + ' added to ' + DAYS[exPageDow]);
                renderExPage();
                if (isT && currentPage === 'workout') renderWorkout();
            });
        });
    }

    // ===== DIET =====
    function renderDiet() {
        var diet = getDietData();
        var goal = S.calGoal || 2200;
        var eaten = 0;
        DIET_DATA.forEach(function (m) { m.items.forEach(function (it) { if (diet[it.id]) eaten += it.c; }); });
        var pct = Math.min(eaten / goal * 100, 100);
        var rem = goal - eaten;
        document.getElementById('cal-eat').textContent = eaten;
        document.getElementById('cal-goal').textContent = goal;
        document.getElementById('cal-rem').textContent = Math.max(0, rem);
        document.getElementById('cal-rem').style.color = rem < 0 ? 'var(--r)' : 'var(--g)';
        document.getElementById('cal-bar').style.width = pct + '%';
        var html = '';
        DIET_DATA.forEach(function (meal) {
            html += '<div class="mcard"><div style="font-family:Orbitron,monospace;font-size:10px;color:var(--o);letter-spacing:2px;margin-bottom:7px">' + meal.t + '</div>';
            meal.items.forEach(function (item) {
                var done = !!diet[item.id];
                html += '<div class="di" data-dietid="' + item.id + '">'
                    + '<div class="dc' + (done ? ' done' : '') + '">' + (done ? '&#10003;' : '') + '</div>'
                    + '<span class="dl' + (done ? ' done' : '') + '">' + item.l + '</span>'
                    + (item.c ? '<span style="font-size:10px;color:var(--o);font-family:Orbitron,monospace">' + item.c + '</span>' : '')
                    + '</div>';
            });
            html += '</div>';
        });
        document.getElementById('diet-cards').innerHTML = html;
        document.getElementById('diet-cards').querySelectorAll('[data-dietid]').forEach(function (el) {
            el.addEventListener('click', function () {
                var id = el.getAttribute('data-dietid');
                var diet2 = getDietData();
                diet2[id] = !diet2[id];
                saveDietData(diet2);
                renderDiet();
            });
        });
    }

    // ===== CALENDAR =====
    var calY = new Date().getFullYear();
    var calM = new Date().getMonth();

    function renderCal() {
        var hist = getHist();
        document.getElementById('cal-title').textContent = MONTHS[calM] + ' ' + calY;
        var first = new Date(calY, calM, 1).getDay();
        var total = new Date(calY, calM + 1, 0).getDate();
        var ts = T;
        var html = '';
        ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].forEach(function (d) { html += '<div class="cdh">' + d + '</div>'; });
        for (var i = 0; i < first; i++) html += '<div class="cd ce"></div>';
        for (var d = 1; d <= total; d++) {
            var ds = calY + '-' + pad2(calM + 1) + '-' + pad2(d);
            var day = hist[ds];
            var cls = 'cd';
            if (ds === ts) cls += ' ct';
            var dots = '';
            if (day) {
                var wok = day.water >= (S.waterGoal || 3500) * .8;
                var sok = day.sets >= 6;
                var cpct = (day.checks || 0) / (day.totalChecks || 9);
                if (ds !== ts) {
                    if (wok && sok && cpct >= .7) cls += ' cg';
                    else if (wok || sok || cpct > .3) cls += ' cy';
                    else cls += ' cr';
                }
                dots = '<div class="cdots">'
                    + (wok ? '<div class="cdot" style="background:var(--b)"></div>' : '')
                    + (sok ? '<div class="cdot" style="background:var(--g)"></div>' : '')
                    + (cpct >= .7 ? '<div class="cdot" style="background:var(--y)"></div>' : '')
                    + '</div>';
            }
            html += '<div class="' + cls + '" data-date="' + ds + '"><span class="cdn">' + d + '</span>' + dots + '</div>';
        }
        document.getElementById('cal-grid').innerHTML = html;
        document.getElementById('cal-grid').querySelectorAll('[data-date]').forEach(function (el) {
            el.addEventListener('click', function () { showDD(el.getAttribute('data-date')); });
        });
        renderCalCharts();
        renderWeekView(0);
    }

    function showDD(ds) {
        var hist = getHist(); var d = hist[ds];
        var el = document.getElementById('day-detail');
        if (!d) { el.innerHTML = '<div class="ddc"><div class="ddt">' + ds + '</div><div style="color:var(--mu);font-size:13px">No data saved.</div></div>'; return; }
        var cp = Math.round(((d.checks || 0) / (d.totalChecks || 9)) * 100);
        var exHtml = '';
        if (d.exercises && d.exercises.length) {
            var names = d.exercises.map(function (e) {
                var x = EX.find(function (ex) { return ex.id === e.id; }); return (x ? x.n : e.id) + '(' + e.sets + ')';
            });
            exHtml = '<div class="ddr"><span style="color:var(--mu2)">Exercises</span><span style="font-size:11px;color:#f0f4ff">' + names.join(', ') + '</span></div>';
        }
        el.innerHTML = '<div class="ddc">'
            + '<div class="ddt">' + (d.day || ds) + ' - ' + (d.focus || '') + '</div>'
            + '<div class="ddr"><span style="color:var(--mu2)">&#128167; Water</span><span style="color:var(--b);font-weight:700">' + (d.water || 0) + 'ml - ' + ((d.water || 0) / 1000).toFixed(2) + 'L</span></div>'
            + '<div class="ddr"><span style="color:var(--mu2)">&#128170; Sets</span><span style="color:var(--g);font-weight:700">' + (d.sets || 0) + '</span></div>'
            + '<div class="ddr"><span style="color:var(--mu2)">&#9989; Tasks</span><span style="color:var(--y);font-weight:700">' + (d.checks || 0) + '/' + (d.totalChecks || 9) + ' (' + cp + '%)</span></div>'
            + '<div class="ddr"><span style="color:var(--mu2)">&#128293; Calories</span><span style="color:var(--o);font-weight:700">' + (d.calories || 0) + ' kcal</span></div>'
            + exHtml + '</div>';
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function renderCalCharts() {
        var hist = getHist();
        var dim = new Date(calY, calM + 1, 0).getDate();
        var wv = [], sv2 = [], lb = [];
        for (var d = 1; d <= dim; d++) {
            var ds = calY + '-' + pad2(calM + 1) + '-' + pad2(d);
            var day = hist[ds] || {};
            wv.push(day.water || 0); sv2.push(day.sets || 0); lb.push(d);
        }
        drawBars('cal-cw', lb, wv, 'var(--b)', function (v) { return v >= 1000 ? Math.round(v / 100) / 10 + 'L' : v || ''; });
        drawBars('cal-cs', lb, sv2, 'var(--g)', function (v) { return v || ''; });
    }

    function renderWeekView(offset) {
        var hist = getHist();
        var tod = new Date(); var dow = tod.getDay();
        var sow = new Date(tod); sow.setDate(tod.getDate() - dow + (offset * 7));
        var labels = [], wvals = [], svals = [];
        for (var i = 0; i < 7; i++) {
            var d = new Date(sow); d.setDate(sow.getDate() + i);
            var ds = d.toISOString().slice(0, 10);
            labels.push(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()]);
            var day = hist[ds] || {};
            wvals.push(day.water || 0); svals.push(day.sets || 0);
        }
        var el = document.getElementById('cal-wk'); if (!el) return;
        var mx = 1; wvals.forEach(function (v) { if (v > mx) mx = v; });
        var h = '<div class="bline"></div>';
        labels.forEach(function (lb, i) {
            var pct = Math.round((wvals[i] / mx) * 80) + 2;
            h += '<div class="bc"><div class="bb" style="height:' + pct + '%;background:var(--y);opacity:.8;border-radius:3px 3px 0 0">'
                + '<span class="bv" style="color:var(--y)">' + (wvals[i] ? Math.round(wvals[i] / 100) / 10 + 'L' : '') + '</span>'
                + '<span class="bl">' + lb + (svals[i] ? '&#183;' + svals[i] : '') + '</span>'
                + '</div></div>';
        });
        el.innerHTML = h;
    }

    // ===== PROGRESS =====
    function renderProgress() {
        renderPRs();
        drawHistChart('ch-water', 7, 'water', 'var(--b)', function (v) { return v + 'ml'; });
        drawHistChart('ch-sets', 7, 'sets', 'var(--g)', function (v) { return v; });
        drawHistChart('ch-tasks', 7, 'checks', 'var(--y)', function (v) { return v; });
        drawHistChart('ch-cals', 7, 'calories', 'var(--o)', function (v) { return v; });
    }

    function drawHistChart(elId, days, key, color, fmt) {
        var hist = getHist(), dates = [], vals = [];
        for (var i = days - 1; i >= 0; i--) {
            var d = new Date(); d.setDate(d.getDate() - i);
            var ds = d.toISOString().slice(0, 10);
            dates.push(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][d.getDay()]);
            vals.push((hist[ds] || {})[key] || 0);
        }
        drawBars(elId, dates, vals, color, fmt);
    }

    function drawBars(elId, labels, vals, color, fmtFn) {
        var el = document.getElementById(elId); if (!el) return;
        var mx = 1; vals.forEach(function (v) { if (v > mx) mx = v; });
        var h = '<div class="bline"></div>';
        labels.forEach(function (lb, i) {
            var pct = Math.round((vals[i] / mx) * 80) + 2;
            var dsp = vals[i] > 0 ? fmtFn(vals[i]) : '';
            var isT = i === labels.length - 1;
            h += '<div class="bc"><div class="bb" style="height:' + pct + '%;background:' + color + ';opacity:' + (isT ? 1 : .6) + ';box-shadow:' + (isT ? '0 0 7px ' + color + '44' : '') + ';border-radius:3px 3px 0 0">'
                + (dsp ? '<span class="bv" style="color:' + color + '">' + dsp + '</span>' : '')
                + ('<span class="bl">' + lb + '</span>')
                + '</div></div>';
        });
        el.innerHTML = h;
    }

    function renderPRs() {
        var prs = getPR();
        var html = '';
        PR_FIELDS.forEach(function (f) {
            html += '<div class="prc">'
                + '<div class="prl">' + f.l + '</div>'
                + '<div class="prv">' + (prs[f.id] || '&#8212;') + '</div>'
                + '<div class="pru">' + f.u + '</div>'
                + '<div class="prr">'
                + '<input class="pri" type="number" id="pri-' + f.id + '" placeholder="New...">'
                + '<button class="btn btn-b" style="padding:5px 9px;font-size:10px" data-prid="' + f.id + '">SAVE</button>'
                + '</div></div>';
        });
        document.getElementById('pr-grid').innerHTML = html;
        document.getElementById('pr-grid').querySelectorAll('[data-prid]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = btn.getAttribute('data-prid');
                var v = parseFloat(document.getElementById('pri-' + id).value);
                if (!v) return;
                var prs2 = getPR(); prs2[id] = v; savePR(prs2);
                renderPRs(); showToast('PR Saved! &#127942;');
            });
        });
    }

    // ===== MASTER =====
    function renderMaster() {
        document.getElementById('mp-wg').value = S.waterGoal || 3500;
        document.getElementById('mp-cg').value = S.calGoal || 2200;
        document.getElementById('mp-nm').value = S.userName || '';
        var html = '';
        CHK_ITEMS.forEach(function (it, i) {
            html += '<div class="ec"><div class="er">'
                + '<input class="ei" type="text" value="' + it.i + '" style="width:36px" data-chkidx="' + i + '" data-chkfield="i">'
                + '<input class="ei" type="text" value="' + it.l + '" data-chkidx="' + i + '" data-chkfield="l">'
                + '<button class="dbtn" data-delchk="' + i + '">&#215;</button>'
                + '</div></div>';
        });
        document.getElementById('mp-chk').innerHTML = html;
        document.getElementById('mp-chk').querySelectorAll('[data-chkidx]').forEach(function (inp) {
            inp.addEventListener('change', function () {
                var i = parseInt(inp.getAttribute('data-chkidx'));
                var f = inp.getAttribute('data-chkfield');
                CHK_ITEMS[i][f] = inp.value;
                SS('gymlog_chk_items', CHK_ITEMS);
            });
        });
        document.getElementById('mp-chk').querySelectorAll('[data-delchk]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var i = parseInt(btn.getAttribute('data-delchk'));
                CHK_ITEMS.splice(i, 1);
                SS('gymlog_chk_items', CHK_ITEMS);
                renderMaster(); renderChk();
            });
        });
        var planHtml = '';
        Object.keys(W_PLAN).sort(function (a, b) { return Number(a) - Number(b); }).forEach(function (dow) {
            var plan = W_PLAN[dow];
            var exNames = (!plan.rest && plan.ex) ? plan.ex.map(function (id) { var ex = EX.find(function (e) { return e.id === id; }); return ex ? ex.n : id; }).join(' - ') : '';
            planHtml += '<div class="ec">'
                + '<div style="font-family:Orbitron,monospace;font-size:9px;color:var(--b);letter-spacing:2px;margin-bottom:7px">' + DAYS[dow].toUpperCase() + '</div>'
                + '<div class="er" style="margin-bottom:4px"><input class="ei" type="text" value="' + (plan.f || '') + '" placeholder="Focus" data-plandow="' + dow + '"></div>'
                + (plan.rest ? '<div style="color:var(--y);font-size:10px">&#129490; Rest Day</div>' : '<div style="font-size:10px;color:var(--mu)">' + exNames + '</div>')
                + '</div>';
        });
        document.getElementById('mp-plan').innerHTML = planHtml;
        document.getElementById('mp-plan').querySelectorAll('[data-plandow]').forEach(function (inp) {
            inp.addEventListener('change', function () {
                var dow = inp.getAttribute('data-plandow');
                if (!W_PLAN[dow]) W_PLAN[dow] = {};
                W_PLAN[dow].f = inp.value;
                SS('gymlog_wplan', W_PLAN);
            });
        });
        var hist = getHist();
        var days = Object.keys(hist).length;
        var ts = 0, tw = 0;
        Object.keys(hist).forEach(function (k) { ts += (hist[k].sets || 0); tw += (hist[k].water || 0); });
        document.getElementById('mp-stats').innerHTML =
            '<div class="mpr"><span class="mpk">Days Tracked</span><span style="color:var(--b);font-weight:700;font-family:Orbitron,monospace">' + days + '</span></div>'
            + '<div class="mpr"><span class="mpk">Total Sets</span><span style="color:var(--g);font-weight:700;font-family:Orbitron,monospace">' + ts + '</span></div>'
            + '<div class="mpr"><span class="mpk">Total Water</span><span style="color:var(--b);font-weight:700;font-family:Orbitron,monospace">' + (tw / 1000).toFixed(1) + 'L</span></div>'
            + '<div class="mpr"><span class="mpk">Data Size</span><span style="color:var(--mu2)">' + (JSON.stringify(hist).length / 1024).toFixed(1) + ' KB</span></div>';
    }

    // ===== REST TIMER =====
    var restSec = 0, restIv = null;
    function startRest(s) {
        if (restIv) { clearInterval(restIv); }
        restSec = s;
        document.getElementById('rov').classList.add('on');
        document.getElementById('rt-sec').textContent = restSec;
        restIv = setInterval(function () {
            restSec--;
            document.getElementById('rt-sec').textContent = restSec;
            if (restSec <= 0) { clearInterval(restIv); restIv = null; document.getElementById('rov').classList.remove('on'); showToast('GO! &#128170;'); }
        }, 1000);
    }

    // ===== TOAST =====
    var toastT;
    function showToast(msg) {
        var el = document.getElementById('toast');
        el.innerHTML = msg; el.classList.add('on');
        clearTimeout(toastT);
        toastT = setTimeout(function () { el.classList.remove('on'); }, 2200);
    }

    // ===== BACKUP/RESTORE =====
    function exportData() {
        var all = {
            gymlog_settings: S, gymlog_chk_items: CHK_ITEMS, gymlog_wplan: W_PLAN,
            gymlog_history: getHist(), gymlog_pr: getPR(),
            exportDate: new Date().toISOString(), version: '4.0'
        };
        all['gymlog_water_' + T] = getWLogs();
        all['gymlog_chkdata_' + T] = getChkData();
        all['gymlog_diet_' + T] = getDietData();
        all['gymlog_wk_' + T] = getWkData();
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' }));
        a.download = 'GymLog_' + T + '.json';
        a.click();
        showToast('Exported! &#128190;');
    }

    function importData(file) {
        var r = new FileReader();
        r.onload = function (e) {
            try {
                var d = JSON.parse(e.target.result);
                Object.keys(d).forEach(function (k) {
                    if (k !== 'exportDate' && k !== 'version') SS(k, d[k]);
                });
                S = LS('gymlog_settings', { waterGoal: 3500, calGoal: 2200, userName: '' });
                CHK_ITEMS = LS('gymlog_chk_items', DEF_CHK);
                W_PLAN = LS('gymlog_wplan', DEF_PLAN);
                renderToday(); renderWater(); renderDiet(); updateHdr(); renderMaster();
                showToast('Restored! &#9989;');
            } catch (err) { showToast('Invalid file!'); }
        };
        r.readAsText(file);
    }

    // ===== ATTACH ALL EVENTS =====
    function attachAllEvents() {
        // Tab buttons
        PAGES.forEach(function (p) {
            var tab = document.getElementById('tab-' + p);
            var nav = document.getElementById('nav-' + p);
            if (tab) tab.addEventListener('click', function () { go(p); });
            if (nav) nav.addEventListener('click', function () { go(p); });
        });

        // Save buttons
        document.getElementById('btn-save-today').addEventListener('click', saveDay);
        document.getElementById('btn-save-workout').addEventListener('click', saveDay);

        // Water buttons
        [150, 200, 300, 350, 500, 1000].forEach(function (amt) {
            var btn = document.getElementById('w' + amt);
            if (btn) btn.addEventListener('click', function () { addWater(amt); });
        });
        document.getElementById('btn-add-custom').addEventListener('click', function () {
            var v = parseInt(document.getElementById('cml').value);
            if (v > 0 && v < 9999) { addWater(v); document.getElementById('cml').value = ''; }
        });
        document.getElementById('cml').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { var v = parseInt(e.target.value); if (v > 0 && v < 9999) { addWater(v); e.target.value = ''; } }
        });
        document.getElementById('btn-undo-w').addEventListener('click', function () {
            var logs = getWLogs();
            if (!logs.length) return;
            logs.pop(); saveWLogs(logs); renderWater(); updateHdr(); showToast('Removed &#8617;');
        });

        // Exercise search
        document.getElementById('ex-search').addEventListener('input', function () { renderExLib(); });

        // Calendar nav
        document.getElementById('cal-prev').addEventListener('click', function () { calM--; if (calM < 0) { calM = 11; calY--; } renderCal(); });
        document.getElementById('cal-next').addEventListener('click', function () { calM++; if (calM > 11) { calM = 0; calY++; } renderCal(); });
        document.getElementById('wv-this').addEventListener('click', function () {
            this.classList.add('on'); document.getElementById('wv-last').classList.remove('on');
            renderWeekView(0);
        });
        document.getElementById('wv-last').addEventListener('click', function () {
            this.classList.add('on'); document.getElementById('wv-this').classList.remove('on');
            renderWeekView(-1);
        });

        // Progress chart filters
        document.querySelectorAll('[data-type]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var type = btn.getAttribute('data-type');
                var days = parseInt(btn.getAttribute('data-days'));
                btn.closest('.chf').querySelectorAll('.cf').forEach(function (b) { b.classList.remove('on'); });
                btn.classList.add('on');
                var keys = { water: 'water', sets: 'sets', tasks: 'checks', cals: 'calories' };
                var colors = { water: 'var(--b)', sets: 'var(--g)', tasks: 'var(--y)', cals: 'var(--o)' };
                var fmts = { water: function (v) { return v + 'ml'; }, sets: function (v) { return v; }, tasks: function (v) { return v; }, cals: function (v) { return v; } };
                drawHistChart('ch-' + type, days, keys[type], colors[type], fmts[type]);
            });
        });

        // Rest timer
        document.getElementById('btn-skip-rest').addEventListener('click', function () {
            clearInterval(restIv); restIv = null; document.getElementById('rov').classList.remove('on');
        });
        document.getElementById('btn-add-rest').addEventListener('click', function () {
            restSec += 30; document.getElementById('rt-sec').textContent = restSec;
        });

        // Master settings
        document.getElementById('mp-wg').addEventListener('change', function () { S.waterGoal = +this.value; SS('gymlog_settings', S); renderWater(); showToast('Saved!'); });
        document.getElementById('mp-cg').addEventListener('change', function () { S.calGoal = +this.value; SS('gymlog_settings', S); renderDiet(); showToast('Saved!'); });
        document.getElementById('mp-nm').addEventListener('change', function () { S.userName = this.value; SS('gymlog_settings', S); showToast('Saved!'); });
        document.getElementById('btn-add-chk').addEventListener('click', function () {
            CHK_ITEMS.push({ id: 'ci' + Date.now(), l: 'New Task', i: '&#11088;' });
            SS('gymlog_chk_items', CHK_ITEMS); renderMaster(); renderChk();
        });
        document.getElementById('btn-export').addEventListener('click', exportData);
        document.getElementById('btn-import-trigger').addEventListener('click', function () { document.getElementById('import-file').click(); });
        document.getElementById('import-file').addEventListener('change', function () { if (this.files[0]) importData(this.files[0]); });
        document.getElementById('btn-clear').addEventListener('click', function () {
            if (!confirm('Clear today\'s data?')) return;
            saveWLogs([]); saveChkData({}); saveDietData({}); saveWkData({});
            renderToday(); renderWater(); renderDiet(); updateHdr(); showToast('Today cleared!');
        });
    }

    // ===== INIT =====
    attachAllEvents();
    renderToday();
    renderWater();
    renderDiet();
    loadWeather();

})(); // end IIFE