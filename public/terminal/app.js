(function(){
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var PILL={teach:'Teach',show:'Show',believe:'Believe',entertain:'Entertain'};
var PC={teach:'var(--teach)',show:'var(--show)',believe:'var(--believe)',entertain:'var(--entertain)'};
var PLATN={ig:'Instagram',tt:'TikTok',yt:'YouTube Shorts',li:'LinkedIn'},PLAT={ig:'IG',tt:'TT',yt:'YT',li:'in'};
function bizName(){return (S&&S.co&&S.co.company)||'your business'}
var WPS=2.1; /* ~126 words a minute: a natural on-camera pace */

/* ---------- categories: Jayden Huszczo, co-founder and CEO of Sandlot ---------- */
var CATS=[
 {id:'origin',name:'Origin story',pillar:'believe',desc:'How Sandlot started',
  titles:['We built Sandlot in 8 hours','How four of us started a company in one weekend','We had no business starting this company'],
  hooks:[["Four of us had never built anything together. Then we had 8 hours.","We built the first version of our app in 8 hours.","This company started at a hackathon table at Ohio State."],
         ["Here's exactly how we started a startup in one weekend.","What I learned building an app in 8 hours.","How to find cofounders: build something first."],
         ["You don't need a business plan to start a company.","Most cofounders meet the wrong way.","We had no business pitching investors that weekend."]],
  open:["Picture four college students at a hackathon table, way too much caffeine, and a deadline.","","Everyone says find your cofounders first, then build. We did it backwards."],
  beats:["Sandlot started at the Ohio State hackathon. There were four of us: me, AJ, Sam, and Wyatt. We'd never built anything together. Two of us had startups that couldn't find people to hire. The other two had watched a startup fail partly because they couldn't find people to build with.",
   "So we picked the problem we all had. Startups need talent, and students want real experience, but they never find each other. Especially in the Midwest. Every campus, every incubator, every founder is on its own island.",
   "We had 8 hours. Sam wrote code nonstop. AJ and Wyatt worked out how the marketplace would actually work. I worked on the pitch and the story. Nobody slept much. By the end we had a working first version of the app.",
   "Then we pitched it to investors at the event. Four students who had only just become a team, pitching a company that was hours old. And people leaned in. That's when we looked at each other and realized this might be real.",
   "We decided to keep going. Sam is our CTO, AJ runs operations, Wyatt runs finance, and I'm the CEO, which mostly means I talk to everyone. We've run four hackathons since, and more than a hundred student builders across eleven schools are already on board.",
   "The lesson I keep coming back to: you don't find your cofounders by talking about building. You find them by building. The people who are still there at 2 a.m. are the ones you want next to you."],
  loops:["But the idea isn't what got investors interested. I'll get to that.","And then hour six happened.","Stay with me, because the pitch almost went sideways.","There's one thing we did that weekend I'd tell every founder to copy.","And the real reason we kept going isn't the app."]},
 {id:'name',name:'Why "Sandlot"',pillar:'believe',desc:'The idea behind the name',
  titles:['Why we named it Sandlot','How the sandlot taught me to hire','Getting picked should work like the sandlot'],
  hooks:[["When you were a kid, nobody asked for your resume at the sandlot.","Remember how you got picked for a pickup game?","The name Sandlot came from every summer of my childhood."],
         ["Here's the idea behind the name Sandlot.","How startups should actually find talent.","Proof beats promises. Here's how that works."],
         ["Hiring is broken because it skips the sandlot.","Interviews are a terrible way to find talent.","A resume can't show what you can actually do."]],
  open:["Think back to being ten years old, glove in hand, walking up to a pickup game.","","Most hiring asks you to describe your skills instead of showing them. That's backwards."],
  beats:["When you were a kid and you walked up to the sandlot, nobody asked where you went to school. You got picked by stepping up and playing. If you could hit, you were on the team. That's the whole idea behind Sandlot.",
   "Startups should work the same way. A founder posts a real problem in a one-minute video. Builders scroll a feed of those problems, find one that fits their skills, and pitch how they'd solve it. Every problem has a bounty, so the work gets paid.",
   "So instead of guessing from a resume and a thirty-minute interview, a founder sees what you can actually do. You still have a profile and a resume. But the work is what gets you noticed.",
   "That's why founders get a bat in our app, and builders get a ball. Founders pitch the problem. Builders step up to the plate. It sounds like a gimmick, but it's how most of us first learned to compete.",
   "And we made it a game on purpose. There are leagues. You can join with your school. There are campus leaderboards for who's solving the most problems. Students already compete at everything. Now it counts toward a career.",
   "The best players at the sandlot never waited to be invited. They showed up and proved it. That's who Sandlot is for, on both sides of the plate."],
  loops:["But the name is only half of it. The other half is how you get picked.","And there's a reason founders get a bat.","Stay with me, because this part changes how startups hire.","Here's where it turns into a game.","And here's who it's actually for."]},
 {id:'bts',name:'Building in public',pillar:'show',desc:'Show the work behind the app',
  titles:['A week building a startup in college','What it takes to get an app ready to launch','Nobody shows this part of a startup'],
  hooks:[["This is what a startup looks like before launch.","We're about to launch an app. Here's the messy part.","Come with me through a week of building Sandlot."],
         ["Here's exactly where Sandlot is right now.","What it takes to get an app ready for the App Store.","How we test an app before anyone sees it."],
         ["Most startups hide this part. I'm showing you.","Launch day is the easy part.","Your favorite apps looked this rough before launch."]],
  open:["Monday morning, between classes, laptop open in the library.","","Startups love to post the launch. They don't post the months before it."],
  beats:["Right now Sandlot is in TestFlight, which means a small group of people use the app before it hits the App Store. Every bug they find, we fix. Every confusing screen, we redo. It's not glamorous, but it's where the app actually gets good.",
   "This fall we tore up onboarding, profiles, and most of the design. Sam, our CTO, rebuilt it while I pushed on how it should feel. Dark mode, mint green, and a bat and a ball so you always know whether you're a founder or a builder.",
   "Then there's the work nobody sees. Calls with startups who want to post problems. Planning hackathons. We've run four so far. Each one teaches us what students actually want and what founders actually need.",
   "And we're doing all of this as college students. Class in the morning, a call with a founder at lunch, a team meeting at night. Some weeks that's a lot. Most weeks it's exactly what I want to be doing.",
   "Last month we pitched at the Startup Cincy competition. Fifty companies applied from eleven universities across five states. Five got picked to pitch on stage. We were one of them, and we won.",
   "Next up: an exclusive launch at a few universities, more hackathons across the Midwest, and the App Store. I'll keep showing you every part of it, including the parts that go wrong."],
  loops:["But the bugs aren't the hard part. This is.","And then we redesigned almost everything.","Stay with me, because the hackathons taught us the most.","There's one week this fall I'll never forget.","Here's what's coming next."]},
 {id:'advice',name:'Advice for builders',pillar:'teach',desc:'Help students get in the game',
  titles:['What actually gets founders to notice you','How to get hired by a startup with no experience','Stop applying to startups the normal way'],
  hooks:[["Founders don't read your application. Here's what they notice instead.","I learned this the hard way in college.","The fastest way into a startup isn't the careers page."],
         ["How to get hired by a startup with zero experience.","Three steps to get a founder's attention.","How to pitch a founder in sixty seconds."],
         ["Stop applying to startups through job boards.","Your GPA doesn't matter to founders.","Cover letters are a waste of your time."]],
  open:["Freshman year I thought you got opportunities by applying. I was wrong.","","Job boards are where startup applications go to die."],
  beats:["Startups don't hire like big companies. A founder with ten people doesn't have time to read two hundred applications. They hire the person who already showed them they can do the work.",
   "So step one: pick a startup you actually like and find a real problem they have. Their site is broken on mobile. Their videos get no views. Their onboarding is confusing. Real problems are everywhere if you look.",
   "Step two: fix a small piece of it before anyone asks. Redesign one screen. Edit one video. Write the email sequence. Don't wait for permission. Show up with the work done.",
   "Step three: pitch it in under a minute. Here's the problem I noticed, here's what I made, here's what I'd do next. Short, specific, and about them, not you.",
   "Do that three times and you'll learn more than any class, and you'll have a portfolio that actually means something. That's exactly what we built Sandlot to make easier: real problems, posted by founders, waiting for you.",
   "The students who win aren't the ones with the longest resume. They're the ones who stepped up to the plate first. Go find a problem and swing."],
  loops:["But step two is the one almost nobody does.","And the pitch is where most people blow it.","Stay with me, because step three takes under sixty seconds.","Here's what happens when you do this three times.","And here's the shortcut."]},
 {id:'beliefs',name:'Hot takes',pillar:'believe',desc:'Say what you stand for',
  titles:['The Midwest is not missing talent','What I believe about building','You don\'t have to move to San Francisco'],
  hooks:[["Everyone says the startup world is in San Francisco. I disagree.","People told me I'd have to leave Ohio to build a real startup.","Here's what I believe after a year of building in the Midwest."],
         ["Four things I believe about building a company.","What I believe about failing.","Why the Midwest is underrated for startups."],
         ["The Midwest isn't missing talent. It's missing connections.","Fail as much as you can.","Your circle decides your ceiling."]],
  open:["Everyone told me the real startup world was two thousand miles away.","","Unpopular opinion: some of the best builders in the country are in the Midwest, and nobody can find them."],
  beats:["The Midwest isn't missing talent. It's missing connections. There are incredible builders at every school out here. The problem is every campus, every incubator, and every founder is on its own island. In San Francisco, everyone is a coffee away from each other.",
   "So we're not trying to turn the Midwest into San Francisco. We're trying to connect what's already here. One feed where a founder in Cincinnati can find a builder in Columbus in a day instead of a year.",
   "Second thing I believe: fail as much as you can, as early as you can. Every time I've failed, I've learned more than when I won. College is the cheapest place to fail you'll ever have.",
   "Third: find killers. That's what I call people who make you better just by being around them. People who want more for you than you want for yourself. Your circle decides your ceiling.",
   "And last: proof beats promises. Anyone can say they're a hard worker. Show me something you built. That goes for students, founders, and me too. It's why I post all of this publicly.",
   "You don't have to agree with all of it. But if any of it hit, you're probably one of the people we built Sandlot for."],
  loops:["But that's not even the belief people push back on most.","And this next one gets me into arguments.","Stay with me, because the third one is my whole life.","Here's the one I hold myself to.","And here's who I'm really talking to."]},
 {id:'day',name:'Founder life',pillar:'entertain',desc:'College student, startup CEO',
  titles:['A day as a college student running a startup','What a student CEO actually does all day','Running a startup in college is not cool'],
  hooks:[["Class at 9. Founder call at noon. Here's my whole day.","Come with me for a day as a student founder.","This is what running a startup in college actually looks like."],
         ["Hour by hour: how I balance school and a startup.","How I fit a startup into a full class schedule.","My actual schedule as a student CEO."],
         ["Running a startup in college is not cool.","Nobody posts this part of being a founder.","You don't want my schedule. Here's why I love it."]],
  open:["My alarm goes off and the first thing I check is the app, not my texts.","","Everyone thinks a startup in college means skipping class. It doesn't."],
  beats:["7:30. First thing I do is check Sandlot. New builders, new bugs, new messages from founders. Then coffee, then class. I study Emerging Technology in Business Design, so some days class and the company actually overlap.",
   "11:00. Between classes I'm on the phone with a startup about posting a problem. Most of my job is talking to people: founders, students, clubs, anyone who might use what we're building.",
   "2:00. Team meeting. Sam shows us what he shipped, AJ updates us on partnerships, Wyatt tells us where the money is. We argue about something. Usually the design. Usually I lose.",
   "5:00. Content. I film, I edit, I post. Building in public is half of our marketing, so if I don't post, fewer people find Sandlot.",
   "9:00. Homework, finally. Then one last check on the app before bed. Some nights it's 1 a.m. before I'm done. That's the part nobody posts.",
   "It's a lot. But I'd rather be tired building something I care about than rested doing something I don't. And I get to do it with three people I'd go to war with."],
  loops:["And then the real job starts between classes.","Stay for 2:00, because that's where it gets loud.","Here's the part of my day nobody sees.","And then the second half of my day starts.","And here's why I wouldn't trade it."]}
];
var ANGLES=['Story-led','Straight answer','Contrarian'];
var LENS={1:[0,5],2:[0,1,2,5],3:[0,1,2,3,4,5]};
var ENDS=[{id:'offer',name:'Offer'},{id:'inform',name:'Inform'},{id:'follow',name:'Follow for more'},{id:'question',name:'Ask a question'},{id:'visit',name:'Join us'}];
function endText(id,offer){
  return {offer:'Here\'s the deal. '+(offer||'[FILL: your offer]')+'. The link is in my bio. Bring your crew.',
   inform:'So that\'s the real answer. Save this so you have it next time, and send it to the one friend who needs it.',
   follow:'Tomorrow I\'ll show you the part I couldn\'t fit in here. Follow so you don\'t miss it.',
   question:'Now I want to hear yours. Drop it in the comments, and I\'ll answer the best one in my next video.',
   visit:'Come build with us. Our next hackathon is [FILL: date] at [FILL: campus]. Sign up through the link in my bio, and bring your crew.'}[id];
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function fills(s){return esc(s).replace(/\[FILL:([^\]]*)\]/g,'<mark class="fill">FILL:$1</mark>')}
function words(s){return s.trim()?s.trim().split(/\s+/).length:0}
function mmss(sec){sec=Math.round(sec);return Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0')}
function rot(a,n){n=((n%a.length)+a.length)%a.length;return a.slice(n).concat(a.slice(0,n))}
function allCats(){return CATS.concat(S.custom)}
function cat(id){return allCats().filter(function(c){return c.id===id})[0]||CATS[0]}
var toastT;function toast(m){var t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(function(){t.classList.remove('show')},2000)}
function plats(a){return '<span class="plats">'+a.map(function(p){return '<span class="plat '+p+'" title="'+PLATN[p]+'">'+PLAT[p]+'</span>'}).join('')+'</span>'}
var LOOPIC='<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/></svg>';

/* Build a category from the owner's own story */
function customCat(name,text){
  var sents=text.replace(/\s+/g,' ').trim().split(/(?<=[.!?])\s+/).filter(Boolean);
  var beats=[],cur='';
  sents.forEach(function(s){cur+=(cur?' ':'')+s;if(words(cur)>=45){beats.push(cur);cur=''}});
  if(cur)beats.push(cur);
  var pad=['That moment changed how we run '+bizName()+'.','[FILL: what happened next]','[FILL: what you learned from it]','Here\'s what that means for you: [FILL: the takeaway for your customers].','And it\'s why we still do things the way we do today.'];
  while(beats.length<6)beats.push(pad[Math.min(beats.length-1,pad.length-1)]);
  beats=beats.slice(0,5).concat([beats[beats.length-1]]);
  var fw=(sents[0]||'Here\'s a story I\'ve never told.').split(' '),first=fw.length<=13?fw.join(' '):fw.slice(0,10).join(' ')+'…';
  var t=name||'Your story';
  return {id:'c'+Date.now(),name:t,pillar:'believe',desc:'Your own story',custom:true,
   titles:[t,t+': what I learned',t+': the part nobody tells you'],
   hooks:[[first,'I\'ve never told this story on camera.','This is the real story behind '+bizName()+'.'],[first,'Here\'s what this taught me about running a business.','One story that explains everything about '+bizName()+'.'],['Nobody talks about this part of owning a business.',first,'This almost didn\'t happen.']],
   open:['','',''],beats:beats,
   loops:['But that\'s not even the important part.','Stay with me, because this is where it turns.','And what happened next surprised me too.','Here\'s the part I\'ve never said out loud.','And the lesson isn\'t what you\'d expect.']};
}

function compose(c,angle,len,end,seed){
  var idx=LENS[len],beats=idx.map(function(i){return c.beats[Math.min(i,c.beats.length-1)]});
  if(c.open[angle])beats[0]=c.open[angle]+' '+beats[0];
  var loops=rot(c.loops,seed+angle),hooks=rot(c.hooks[angle],seed);
  var items=[],n=beats.length-1;
  beats.forEach(function(b,i){items.push({type:'beat',text:b});if(i<n)items.push({type:'loop',text:loops[i%loops.length]})});
  items.push({type:'end',text:endText(end,S.offer)});
  return {title:c.titles[angle],pillar:c.pillar,hooks:hooks,items:items};
}
function timed(sc,hook){
  var all=[{type:'hook',text:hook}].concat(sc.items),t=0;
  all.forEach(function(it){it.at=t;t+=words(it.text)/WPS+(it.type==='loop'?0.8:0.4)});
  return {lines:all,secs:t,loops:all.filter(function(x){return x.type==='loop'}).length,words:all.reduce(function(n,x){return n+words(x.text)},0)};
}
function scriptText(sc,hook){return [hook].concat(sc.items.map(function(i){return i.text})).join('\n\n')}
/* ---------- glass segmented thumbs ---------- */
function syncThumbs(){
  document.querySelectorAll('.seg').forEach(function(seg){
    var th=seg.querySelector('.thumb'),on=seg.querySelector('.on');if(!th)return;
    if(!on||!on.offsetWidth){th.style.opacity='0';return}
    th.style.opacity='1';th.style.width=on.offsetWidth+'px';th.style.transform='translateX('+on.offsetLeft+'px)';
  });
}

/* ---------- views ---------- */
var V={};
/* ---------- state ---------- */
var S={cat:'origin',len:2,end:'offer',offer:'We\'re opening Sandlot to a few campuses first, and the waitlist decides which ones',angle:1,seed:0,hookSel:0,custom:[],ownOpen:false,
  approved:[{title:'We built Sandlot in 8 hours',pillar:'believe',secs:128,scene:'desk',hook:'Four of us had never built anything together. Then we had 8 hours.',text:'Sandlot started at the Ohio State hackathon. There were four of us: me, AJ, Sam, and Wyatt. We had never built anything together.\n\nWe had 8 hours. Sam wrote code nonstop. AJ and Wyatt worked out how the marketplace would actually work. I worked on the pitch and the story.\n\nThen we pitched it to investors at the event, and people leaned in.'},
            {title:'Why we named it Sandlot',pillar:'believe',secs:66,scene:'walk',hook:'When you were a kid, nobody asked for your resume at the sandlot.',text:'When you walked up to the sandlot, you got picked by stepping up and playing. If you could hit, you were on the team.\n\nThat is the whole idea behind Sandlot.'}],
  edits:[{title:'The Midwest isn\'t missing talent',pillar:'believe',secs:71,hook:'The Midwest isn\'t missing talent. It\'s missing connections.',text:'There are incredible builders at every school out here. The problem is every campus, every incubator, and every founder is on its own island. So we are not trying to turn the Midwest into San Francisco. We are trying to connect what is already here.'}],
  scheduled:[{title:'How to get hired by a startup with no experience',p:['ig','li'],d:3,t:'12:15 PM'}],
  style:'mint',connected:{ig:true,tt:false,yt:false,li:true},approvedIds:{},
  co:{name:'Jayden Huszczo',role:'Co-founder & CEO',company:'Sandlot',site:'',one:'Sandlot connects Midwest startups with student builders who prove themselves by solving real problems for real bounties.',ind:'tech',aud:['College students','Startup founders','Investors'],soc:{ig:'huzzsco',tt:'',yt:'',li:'jayden-huszczo'},look:'bold',accent:'mint',goal:'trust',mins:60,cam:'natural',where:'phone'},
  onboarded:false,ob:0,
  myStyles:['mint','bold','clean','film','vhs'],defStyle:'mint',
  clips:{},takes:{},scene:'desk',format:null,libTab:'trending',fmtPillar:'all'};

/* Per-viewer conveniences: remember the onboarding answers and the look in this browser. */
var CO_KEY='frontman-company';
/* Live app: window.FM_BOOT comes from the server (signed-in user, their business, saved state). */
var BOOT=window.FM_BOOT||null,LIVE=!!BOOT;
var SAVE_KEYS=['co','onboarded','offer','approved','edits','scheduled','custom','approvedIds','rhythm','connected','style','myStyles','defStyle','bank','audit','chat','cat','refStyles','refs'];
if(LIVE){
  S.co={name:'',role:'',company:'',site:'',one:'',ind:'',aud:[],soc:{ig:'',tt:'',yt:'',li:''},look:S.co.look,accent:S.co.accent,goal:'trust',mins:60,cam:'natural',where:'phone'};
  S.offer='';S.approved=[];S.edits=[];S.scheduled=[];S.custom=[];S.approvedIds={};S.connected={ig:false,tt:false,yt:false,li:false};S.postInit=1;S.bank=[];S.rhythm={per:5,days:[0,1,2,3,4],auto:true,mode:'best'};S.postSel=null;
  var st0=BOOT.state||{};
  SAVE_KEYS.forEach(function(k){if(st0[k]===undefined)return;if(k==='co'){for(var x in st0.co)S.co[x]=st0.co[x]}else S[k]=st0[k]});
  S.onboarded=!!st0.onboarded;
  CATS=S.bank||[];if(!allCats().some(function(c){return c.id===S.cat}))S.cat=(allCats()[0]||{}).id||'';
}else{
try{var savedCo=JSON.parse(localStorage.getItem(CO_KEY)||'null');if(savedCo&&savedCo.co){for(var k in savedCo.co)S.co[k]=savedCo.co[k];S.onboarded=!!savedCo.onboarded}}catch(e){}
}
var saveT=null,lastSaved=LIVE?JSON.stringify(snapshot()):'',saving=null;
function snapshot(){var o={};SAVE_KEYS.forEach(function(k){if(S[k]!==undefined)o[k]=S[k]});return o}
function saveNow(){
  if(!LIVE)return Promise.resolve();clearTimeout(saveT);
  var o=snapshot(),j=JSON.stringify(o);if(j===lastSaved&&BOOT.businessId)return saving||Promise.resolve();
  saving=fetch('/api/terminal/state',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({businessId:BOOT.businessId,state:o})})
    .then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||'Couldn\'t save. Check your connection.');lastSaved=j;BOOT.businessId=d.businessId})})
    .catch(function(e){toast(e.message||'Couldn\'t save. Check your connection.')}).then(function(){saving=null});
  return saving;
}
function saveState(){if(!LIVE)return;clearTimeout(saveT);saveT=setTimeout(saveNow,700)}
function saveCo(){if(!LIVE){try{localStorage.setItem(CO_KEY,JSON.stringify({co:S.co,onboarded:S.onboarded}))}catch(e){}}saveState()}
if(LIVE){setInterval(function(){if(JSON.stringify(snapshot())!==lastSaved)saveNow()},5000);
  window.addEventListener('pagehide',function(){var j=JSON.stringify(snapshot());if(j!==lastSaved&&navigator.sendBeacon)navigator.sendBeacon('/api/terminal/state',new Blob([JSON.stringify({businessId:BOOT.businessId,state:snapshot()})],{type:'application/json'}))})}
/* Server calls from the live app */
function api(path,body){return fetch(path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body||{})}).then(function(r){return r.json().then(function(d){if(!r.ok)throw new Error(d.error||'Something went wrong. Try again.');return d})})}
function stage(t){var b=document.getElementById('b-tag');if(b&&route()==='build')b.textContent=t}
function runAudit(){return saveNow().then(function(){return api('/api/terminal/brand',{businessId:BOOT.businessId})}).then(function(d){S.audit=d.audit;applyAudit();saveState();return d.audit})}
function liveBuild(){return saveNow().then(function(){stage('Reading your website and answers');return api('/api/terminal/analyze',{businessId:BOOT.businessId}).catch(function(){return null})})
  .then(function(){stage('Doing your brand deep dive');return runAudit()}).then(function(){stage('Writing your story bank');return buildBank()})}
function buildBank(extra){return saveNow().then(function(){return api('/api/terminal/bank',{businessId:BOOT.businessId,extra:extra||''})}).then(function(d){S.bank=d.bank;CATS=S.bank;S.cat=(allCats()[0]||{}).id||'';applyAudit();saveState();return d.bank})}


/* ---------- each company's own Terminal look ---------- */
var LOOKS={
  clean:{name:'Clean',font:'var(--sans)',w:600,ls:'-.035em',desc:'Calm and simple'},
  bold:{name:'Bold',font:"'Bricolage Grotesque',var(--sans)",w:800,ls:'-.045em',desc:'Loud and confident'},
  warm:{name:'Warm',font:"'Fraunces',Georgia,serif",w:600,ls:'-.025em',desc:'Friendly and human'},
  editorial:{name:'Editorial',font:"'Instrument Serif',Georgia,serif",w:400,ls:'-.01em',desc:'Like a magazine'}};
var ACCENTS={blue:['Blue','#0071E3','#2997FF'],mint:['Mint','#1E9E5A','#3CCF7B'],coral:['Coral','#E2553E','#FF7A63'],violet:['Violet','#7A4FE0','#A585FF'],amber:['Amber','#C47D08','#F0A93A'],graphite:['Graphite','#3A3F4A','#C5CAD3']};
function hexA(h,a){h=h.replace('#','');var n=parseInt(h,16);return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')'}
function initials(n){var p=String(n||'').trim().split(/\s+/).filter(Boolean);return ((p[0]||'?')[0]+(p.length>1?p[p.length-1][0]:'')).toUpperCase()}
function firstName(){return (String(S.co.name||'').trim().split(/\s+/)[0])||'there'}
function coName(){return String(S.co.company||'').trim()||'Your company'}
function applyLook(){
  var L=LOOKS[S.co.look]||LOOKS.clean,A=ACCENTS[S.co.accent]||ACCENTS.blue;
  var lt='--blue:'+A[1]+';--blue-soft:'+hexA(A[1],.13)+';--blob-1:'+hexA(A[1],.40)+';',dk='--blue:'+A[2]+';--blue-soft:'+hexA(A[2],.18)+';--blob-1:'+hexA(A[2],.30)+';';
  document.getElementById('look-css').textContent=':root{'+lt+'--display:'+L.font+';--display-w:'+L.w+';--display-ls:'+L.ls+'}'+
   '@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){'+dk+'}}:root[data-theme="dark"]{'+dk+'}';
  brandChrome();
}
function brandChrome(){
  var ob=document.body.classList.contains('ob');
  document.getElementById('wm-mono').textContent=ob?'F':initials(coName()).slice(0,1);
  document.getElementById('wm-name').textContent=ob?'Frontman':coName();
  document.getElementById('wm-sub').textContent=ob?'Setting up your Terminal':'Terminal by Frontman';
  var ini=initials(S.co.name);
  document.getElementById('who-av').textContent=ini;document.getElementById('sh-av').textContent=ini;
  document.getElementById('who-first').textContent=firstName();
  document.getElementById('who-co').textContent='· '+coName();
  document.getElementById('sh-name').textContent=S.co.name||'You';
  document.getElementById('sh-role').textContent=(S.co.role||'Owner')+', '+coName();
}

/* ---------- caption styles: a style is data, so people can make, save, share and sell them ---------- */
var SANS='var(--sans)',BRIC="'Bricolage Grotesque',sans-serif",FRAU="'Fraunces',Georgia,serif",INST="'Instrument Serif',Georgia,serif",MONO='var(--mono)',TYPE="'Courier New',monospace";
var STYLE_LIB={
  bold:{name:'Bold',by:'Frontman',font:SANS,w:800,size:19,color:'#fff',hl:'#FFD60A',shadow:'0 2px 10px rgba(0,0,0,.6)'},
  clean:{name:'Clean',by:'Frontman',font:SANS,w:600,size:16,color:'#fff',hl:'#fff',bg:'rgba(0,0,0,.45)',radius:12,ul:1},
  film:{name:'Film',by:'Frontman',font:'Georgia,serif',w:400,ital:1,size:17,color:'#fff',hl:'#FFE2B8',shadow:'0 1px 8px rgba(0,0,0,.5)',shot:'sepia(.18) contrast(1.06)'},
  vhs:{name:'VHS',by:'Frontman',font:MONO,w:700,size:16,color:'#E8F1FF',hl:'#E8F1FF',hlbg:'rgba(0,0,0,.4)',shadow:'-1.5px 0 rgba(255,60,90,.7),1.5px 0 rgba(0,220,230,.6)',shot:'sepia(.35) saturate(1.25)',tag:'PLAY ►  SP'},
  mint:{name:'Sandlot Mint',by:'You',font:BRIC,w:800,size:20,color:'#fff',hl:'#0B1A12',hlbg:'#3CCF7B',upper:1,shadow:'0 2px 10px rgba(0,0,0,.45)'},
  karaoke:{name:'Karaoke',by:'Frontman',font:SANS,w:800,size:21,color:'rgba(255,255,255,.55)',hl:'#fff',shadow:'0 2px 12px rgba(0,0,0,.5)'},
  news:{name:'Newsroom',by:'Frontman',font:SANS,w:700,size:15,color:'#fff',bg:'#C8102E',radius:3,upper:1,hl:'#FFE14D'},
  neon:{name:'Neon',by:'Frontman',font:SANS,w:800,size:20,color:'#fff',hl:'#7CF9FF',shadow:'0 0 8px #00E5FF,0 0 20px #00A3FF',shot:'saturate(1.2) brightness(.85)'},
  type:{name:'Typewriter',by:'Frontman',font:TYPE,w:700,size:15,color:'#111',bg:'#F4EFE3',radius:3,hl:'#111',hlbg:'#FFE58A'},
  serif:{name:'Big Serif',by:'Frontman',font:INST,w:400,size:28,color:'#fff',hl:'#FFD9A8',ital:1,shadow:'0 2px 12px rgba(0,0,0,.45)'},
  paper:{name:'Paper Cutout',by:'Frontman',font:BRIC,w:800,size:18,color:'#111',bg:'#fff',radius:4,hl:'#E2553E',rot:-2},
  lower:{name:'Quiet',by:'Frontman',font:SANS,w:500,size:16,color:'#fff',lower:1,hl:'#fff',ul:1,shadow:'0 1px 8px rgba(0,0,0,.5)'},
  retro:{name:'Retro 70s',by:'Frontman',font:FRAU,w:600,size:20,color:'#FFE7B8',hl:'#FF8A3D',shadow:'2px 2px 0 #7A3B12',shot:'sepia(.3) saturate(1.3) hue-rotate(-8deg)'},
  bw:{name:'Black and White',by:'Frontman',font:INST,w:400,size:24,color:'#fff',hl:'#fff',ul:1,shot:'grayscale(1) contrast(1.15)'},
  /* marketplace (example listings) */
  grain:{name:'Grain Lab',by:'@grainlab',price:'Free',installs:'12.4K',font:FRAU,w:500,ital:1,size:18,color:'#F6EEDD',hl:'#F6EEDD',ul:1,shot:'contrast(1.12) sepia(.25) saturate(.8)',grain:1,mkt:1},
  wire:{name:'Mono Wire',by:'@wireframe.ed',price:'$4',installs:'3.1K',font:MONO,w:500,size:13,color:'#fff',upper:1,bg:'rgba(0,0,0,.72)',radius:4,hl:'#00FF85',mkt:1},
  chalk:{name:'Chalkboard',by:'@chalkandtalk',price:'$6',installs:'5.8K',font:TYPE,w:700,size:17,color:'#F2F2EA',hl:'#FFE680',shadow:'0 0 2px rgba(255,255,255,.6)',shot:'saturate(.6) hue-rotate(60deg) brightness(.7)',mkt:1},
  tabloid:{name:'Tabloid',by:'@poppress',price:'$9',installs:'21.7K',font:SANS,w:900,size:22,upper:1,color:'#FFE600',hl:'#fff',hlbg:'#E4002B',shadow:'3px 3px 0 #000',mkt:1},
  pastel:{name:'Pastel Pop',by:'@softserve',price:'Free',installs:'9.2K',font:BRIC,w:800,size:19,color:'#fff',hl:'#FFB3D9',shadow:'0 3px 0 #7A4FE0',mkt:1},
  docu:{name:'Documentary',by:'@longform.kim',price:'$5',installs:'4.4K',font:SANS,w:500,size:14,color:'#fff',bg:'rgba(0,0,0,.55)',radius:2,hl:'#fff',shot:'contrast(1.1) saturate(.75)',tag:'CHAPTER 1',mkt:1},
  sticker:{name:'Sticker Bomb',by:'@stickerkid',price:'$3',installs:'15.9K',font:BRIC,w:800,size:19,color:'#111',bg:'#FFE14D',radius:14,hl:'#E2553E',rot:3,mkt:1},
  cinema:{name:'Cinema Bars',by:'@frame.rate',price:'$7',installs:'6.6K',font:INST,w:400,ital:1,size:20,color:'#fff',hl:'#fff',bars:1,shot:'contrast(1.08) saturate(.9)',mkt:1}
};
function capStyle(st,k){k=k||1;var s='font-family:'+st.font+';font-weight:'+st.w+';font-size:'+(st.size*k).toFixed(1)+'px;color:'+st.color+';--hl:'+(st.hl||st.color)+';--hlbg:'+(st.hlbg||'transparent')+';';
  s+=st.shadow?'text-shadow:'+st.shadow+';':'text-shadow:none;';
  if(st.bg)s+='background:'+st.bg+';border-radius:'+((st.radius||0)*k)+'px;padding:'+(6*k).toFixed(1)+'px '+(9*k).toFixed(1)+'px;'+(st.bg.indexOf('rgba(0,0,0')===0?'-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);':'');
  if(st.ital)s+='font-style:italic;';if(st.upper)s+='text-transform:uppercase;letter-spacing:.01em;';if(st.lower)s+='text-transform:lowercase;';
  if(st.rot)s+='transform:rotate('+st.rot+'deg);';if(st.ul)s+='--ul:1;';
  return s;}
function capHTML(ws,st){return ws.map(function(x,j){return j===1?'<em'+(st.ul?' style="text-decoration:underline;text-underline-offset:3px"':'')+'>'+esc(x)+'</em>':esc(x)}).join(' ')}
var SCENE_BG={desk:'linear-gradient(160deg,#cdbb9f,#6d5a45)',walk:'linear-gradient(180deg,#a8cdea,#d9cba9 58%,#7b8a5c)',pod:'radial-gradient(70% 70% at 50% 40%,#8a5632,#1b0f08)',board:'linear-gradient(180deg,#f3f3ef,#c9ccc6)',screen:'linear-gradient(135deg,#1d2b4a,#3b6fd8)',green:'linear-gradient(180deg,#3fd35b,#25a33d)',street:'linear-gradient(180deg,#e7b98d,#5a4a5f)',car:'linear-gradient(180deg,#9db5c3,#2b2f36)'};
function stylePrev(id,txt,scene,hook){var st=STYLE_LIB[id]||STYLE_LIB.bold;var ws=(txt||'Proof beats promises every time').split(' ');
  return '<div class="sp'+(st.grain?' grainy':'')+'"><span class="shot" style="'+(scene?'background:'+SCENE_BG[scene]+';':'')+(st.shot?'filter:'+st.shot:'')+'"></span><span class="person"></span>'+
   (st.bars?'<span style="position:absolute;left:0;right:0;top:0;height:11%;background:#000;z-index:1"></span><span style="position:absolute;left:0;right:0;bottom:0;height:11%;background:#000;z-index:1"></span>':'')+
   (hook?'<div class="hk2">'+esc(hook)+'</div>':'')+(st.tag?'<span class="vtag">'+st.tag+'</span>':'')+'<div class="cap" style="'+capStyle(st,.78)+'">'+capHTML(ws,st)+'</div></div>';}

/* ---------- trending formats (example data: the real gallery links to the original posts and stores only the structure) ---------- */
var FORMATS=[
 {id:'greenscreen',name:'Green-screen take',uses:'2.1M',hot:'+48%',pillar:'teach',style:'bold',scene:'green',hook:'This headline is wrong',beats:['The post or headline behind you','Your one-line take','Why it matters to your customer','What to do instead'],why:'Borrowed attention: people already care about the thing behind you.'},
 {id:'walktalk',name:'Walk and talk',uses:'1.4M',hot:'+22%',pillar:'believe',style:'clean',scene:'walk',hook:'Here is what I believe',beats:['Start mid-sentence, already walking','One belief, said plainly','A story that proves it','Stop walking for the last line'],why:'Movement holds the eye, and it feels like a real conversation.'},
 {id:'three',name:'3 things nobody tells you',uses:'3.8M',hot:'+12%',pillar:'teach',style:'karaoke',scene:'desk',hook:'3 things nobody tells you',beats:['The promise in the first second','Thing 1, with an example','Thing 2, with a hook loop','Thing 3 is the surprise'],why:'Numbered lists tell people how long to stay, so they stay.'},
 {id:'dayin',name:'Day in the life, hour by hour',uses:'5.2M',hot:'+31%',pillar:'entertain',style:'type',scene:'street',hook:'7:30 AM. Here is my day',beats:['Time stamp on screen every cut','Fast cuts in the morning','One honest moment midday','Wrap with why you do it'],why:'Shows the work behind the business, so people trust the person.'},
 {id:'beforeafter',name:'Before and after reveal',uses:'2.9M',hot:'+40%',pillar:'show',style:'paper',scene:'screen',hook:'This is what it looked like before',beats:['The before, held for 2 seconds','What was wrong','The process, sped up','The after, held longer'],why:'Proof you can see. The reveal pays off the hook.'},
 {id:'whiteboard',name:'Whiteboard breakdown',uses:'860K',hot:'+9%',pillar:'teach',style:'chalk',scene:'board',hook:'Let me draw this out',beats:['Draw the problem in one line','Explain with arrows','The answer, circled','Point at the camera'],why:'Teaching on a board reads as expertise without a word of bragging.'},
 {id:'hottake',name:'Hot take, then receipts',uses:'1.7M',hot:'+27%',pillar:'believe',style:'tabloid',scene:'desk',hook:'Unpopular opinion',beats:['The take, in 7 words','The pushback you expect','Receipts: numbers or a story','Your take, said again'],why:'Disagreement drives comments; receipts keep trust.'},
 {id:'podclip',name:'Podcast clip',uses:'4.1M',hot:'+18%',pillar:'believe',style:'neon',scene:'pod',hook:'I said this on a podcast',beats:['Open on the strongest line','Cut to the question','The full answer','A reaction shot'],why:'Looks like a bigger stage, and the format already signals depth.'},
 {id:'build',name:'Screen-share build',uses:'640K',hot:'+35%',pillar:'show',style:'wire',scene:'screen',hook:'Building this live',beats:['Face in the corner, screen full','What you are making and why','Sped-up build','It works: the reveal'],why:'Shows real skill. Builders trust builders.'},
 {id:'car',name:'Car confessional',uses:'1.2M',hot:'+15%',pillar:'entertain',style:'lower',scene:'car',hook:'Need to tell you something',beats:['Parked, phone on the dash','The honest thing','What you learned','A small laugh to close'],why:'Private setting feels like a friend telling you the truth.'},
 {id:'question',name:'Customer question, answered',uses:'2.4M',hot:'+20%',pillar:'teach',style:'clean',scene:'desk',hook:'Someone asked me this',beats:['The question on screen','The straight answer first','The why','What to do next'],why:'Answers real questions, so it gets found in search.'},
 {id:'pov',name:'POV: founder edition',uses:'6.3M',hot:'+52%',pillar:'entertain',style:'pastel',scene:'street',hook:'POV: you run a startup in college',beats:['Text on screen sets the scene','Act it out, no talking','One quick twist','End on a look to camera'],why:'Trending wrapper from outside your niche, with your story inside.'}
];
var SCENES=[
 {id:'desk',name:'Desk, eye level',frame:'Camera at eye level. Head near the top third.',light:'Face a window. Add a lamp behind the screen if it gets dark.',sound:'Close the door. Soft things in the room cut the echo.',broll:['Typing close-up','Screen recording','Notebook and coffee']},
 {id:'walk',name:'Walk and talk',frame:'Phone at arm\'s length, a little above your eyes.',light:'Keep the sun behind the camera, not behind you.',sound:'AirPods or a clip-on mic. Turn off of busy streets.',broll:['Feet walking','Signs and buildings','Wide shot of campus']},
 {id:'pod',name:'Podcast table',frame:'Two angles: one wide, one close.',light:'Warm lamp behind you, soft light in front.',sound:'Mic about 4 inches from your mouth.',broll:['Mic close-up','Guest reacting','Two-shot']},
 {id:'board',name:'Whiteboard',frame:'Board and you both in frame. Step aside to reveal.',light:'Light the board evenly so it doesn\'t glare.',sound:'Stand close to the mic; boards echo.',broll:['Marker close-up','The finished drawing','Pointing at the answer']},
 {id:'screen',name:'Screen + face',frame:'Record your screen, then film your reaction on your phone.',light:'Turn the screen brightness down so your face reads.',sound:'Laptop mic is fine in a quiet room.',broll:['Zoom on the key click','Before and after','Your reaction']},
 {id:'green',name:'Green screen',frame:'Plain wall behind you. Frontman cuts you out and puts the post behind you.',light:'Light the wall evenly, then light yourself.',sound:'Quiet room, mic close.',broll:['The post itself','The headline','A zoom on the key line']},
 {id:'street',name:'On location',frame:'Vertical, eye level, background with something happening.',light:'Shade beats direct sun.',sound:'Mic is a must outside.',broll:['Establishing shot','Details of the place','People, with permission']},
 {id:'car',name:'Car',frame:'Phone on a dash mount, parked, a bit above your eyes.',light:'Daylight through the windshield.',sound:'Engine off, windows up.',broll:['Hands on the wheel','View out the window','Pulling into a spot']}
];
function scene(id){return SCENES.filter(function(s){return s.id===id})[0]||SCENES[0]}
function fmt(id){return FORMATS.filter(function(f){return f.id===id})[0]}

/* ---------- onboarding: a deck of cards that tumble away like pages ---------- */
var IND=[['food','Food and drink','<path d="M5 8h12v5a6 6 0 0 1-12 0zM17 9h2a2 2 0 0 1 0 4h-2"/>'],['fitness','Fitness','<path d="M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12"/>'],['beauty','Beauty','<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'],['tech','Tech and apps','<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>'],
 ['realestate','Real estate','<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>'],['health','Health','<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>'],['services','Home services','<path d="M14.5 5.5a4 4 0 0 0 4 5.5l-8 8-3-3 8-8a4 4 0 0 1-1-2.5z"/>'],['coaching','Coaching','<path d="M4 5h16v11H9l-5 4z"/>'],
 ['retail','Retail','<path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/>'],['hospitality','Hospitality','<path d="M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/>'],['finance','Finance','<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'],['other','Something else','<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>']];
var AUD=['College students','Startup founders','Investors','Small business owners','Local families','Parents','Professionals','Gen Z','Homeowners','Creators','Hiring managers','Your city'];
var GOALS=[['trust','Build trust','So people pick you over a cheaper option'],['customers','Get customers','Turn views into sales and sign-ups'],['hire','Hire people','Show what it\'s like to work with you'],['raise','Raise money','Let investors watch you build']];
var ROLES=['Founder','Co-founder & CEO','Owner','CEO','Creator'];
var CAMS=[['new','New to it','Give me the words and short takes.','<path d="M12 3v3M5 12H2M22 12h-3M6 6l2 2M18 6l-2 2"/><circle cx="12" cy="14" r="5"/>'],['ok','Getting comfortable','Teleprompter, with room to riff.','<path d="M4 15c2-3 4-3 8 0s6 3 8 0"/><path d="M4 9c2-3 4-3 8 0s6 3 8 0"/>'],['natural','Natural','Give me bullet points and let me talk.','<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/>']];
var WHERE=[['phone','Phone'],['camera','Camera'],['both','Both']];
var CARDS=10;

function obCards(){
  var c=S.co,soc=[['ig','IG','Instagram','@'],['tt','TT','TikTok','@'],['yt','YT','YouTube','@'],['li','in','LinkedIn','in/']];
  var lk=Object.keys(LOOKS).map(function(k){var L=LOOKS[k];return '<button type="button" class="look'+(c.look===k?' on':'')+'" data-look="'+k+'"><span class="sample" style="font-family:'+L.font+';font-weight:'+L.w+';letter-spacing:'+L.ls+'">Aa</span><b>'+L.name+'</b><small>'+L.desc+'</small></button>'}).join('');
  var sw=Object.keys(ACCENTS).map(function(k){return '<button type="button" data-accent="'+k+'" class="'+(c.accent===k?'on':'')+'" style="background:'+ACCENTS[k][1]+'" aria-label="'+ACCENTS[k][0]+'"></button>'}).join('');
  var list=[
   ['Welcome','<div class="row" style="gap:22px;align-items:center"><span class="welcome-orb" aria-hidden="true"></span><div class="stack" style="gap:10px;flex:1;min-width:220px"><h2 class="q">Let\'s build your Terminal.</h2><p class="q-sub" style="margin:0">Nine quick questions, about 90 seconds. Then our agents study your business and set everything up around you.</p></div></div><ul class="welcome-list"><li><span>1</span>Tell us who you are</li><li><span>2</span>We study your site and your socials</li><li><span>3</span>Your Terminal is ready, with your first scripts</li></ul>','Let\'s go'],
   ['You','<h2 class="q">First, what\'s your name?</h2><input class="big-in" id="ob-name" value="'+esc(c.name)+'" placeholder="Your name" autocomplete="name" aria-label="Your name"><div class="stack" style="gap:8px"><h3>And your role</h3><div class="pills" id="ob-role">'+ROLES.map(function(r){return '<button type="button" class="pill'+(c.role===r?' on':'')+'" data-role="'+esc(r)+'">'+esc(r)+'</button>'}).join('')+'</div></div>'],
   ['Company','<h2 class="q">What\'s the company called?</h2><div class="co-row"><span class="co-tile" id="ob-tile">'+esc(initials(c.company).slice(0,1))+'</span><div class="stack" style="gap:10px"><input class="input" id="ob-co" value="'+esc(c.company)+'" placeholder="Company name" aria-label="Company name" style="font-size:20px;font-weight:600;padding:12px 14px"><label class="url"><span>https://</span><input id="ob-site" value="'+esc(c.site)+'" placeholder="yourcompany.com" aria-label="Website" inputmode="url"></label></div></div><p class="q-sub" style="margin:0">We read your site so you don\'t have to explain it twice.</p>'],
   ['In one line','<h2 class="q">Say what it does in one sentence.</h2><div class="one-wrap"><textarea class="one" id="ob-one" maxlength="140" aria-label="What your company does">'+esc(c.one)+'</textarea><span class="cring"><svg viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" fill="none" stroke="var(--well)" stroke-width="3"/><circle id="ob-ring" cx="11" cy="11" r="9" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linecap="round" stroke-dasharray="0 57"/></svg><span id="ob-left" class="tnum">140</span></span></div><p class="examples">Like: <b>We make protein bars that taste like dessert.</b> Or: <b>We fix roofs in Dayton the same week you call.</b></p>'],
   ['Industry','<h2 class="q">What space are you in?</h2><div class="ind" id="ob-ind">'+IND.map(function(x){return '<button type="button" data-ind="'+x[0]+'" class="'+(c.ind===x[0]?'on':'')+'"><svg viewBox="0 0 24 24">'+x[2]+'</svg>'+x[1]+'</button>'}).join('')+'</div>'],
   ['Audience','<h2 class="q">Who should trust you most?</h2><p class="q-sub">Pick as many as you like.</p><div class="cloud" id="ob-aud">'+AUD.concat(c.aud.filter(function(a){return AUD.indexOf(a)<0})).map(function(a){return '<button type="button" class="pill'+(c.aud.indexOf(a)>-1?' on':'')+'" data-aud="'+esc(a)+'">'+esc(a)+'</button>'}).join('')+'</div><form class="addrow" id="ob-addaud"><input class="input" id="ob-audin" placeholder="Add your own" aria-label="Add an audience" style="border-radius:980px"><button class="btn" type="submit">Add</button></form>'],
   ['Socials','<h2 class="q">Where do you post now?</h2><p class="q-sub">We study what you\'ve posted: what landed, what didn\'t, and how you talk.</p><div class="soc">'+soc.map(function(s){return '<label class="'+(c.soc[s[0]]?'has':'')+'"><span class="plat '+s[0]+'">'+s[1]+'</span><span class="row" style="gap:2px;flex-wrap:nowrap;min-width:0"><span class="faint">'+s[3]+'</span><input data-soc="'+s[0]+'" value="'+esc(c.soc[s[0]]||'')+'" placeholder="'+s[2]+' handle" aria-label="'+s[2]+' handle" style="flex:1"></span><span class="ok">Found</span></label>'}).join('')+'</div>'],
   ['Your look','<h2 class="q">Pick a look for your Terminal.</h2><div class="looks">'+lk+'</div><div class="row between" style="gap:14px;align-items:flex-start"><div class="stack" style="gap:8px"><h3>Accent</h3><div class="sw">'+sw+'</div></div><div class="mini-term" style="flex:1;min-width:220px" aria-hidden="true"><div class="mt-top"><i id="mt-mono">'+esc(initials(c.company).slice(0,1))+'</i><b id="mt-co" style="font-family:var(--display);font-weight:var(--display-w)">'+esc(coName())+'</b></div><div class="mt-h">Good morning, <span id="mt-first">'+esc(firstName())+'</span>.</div><div class="mt-bar"><span></span><span></span><span></span></div></div></div>'],
   ['Goal','<h2 class="q">What should video do for you?</h2><div class="goals">'+GOALS.map(function(g){return '<button type="button" class="goal'+(c.goal===g[0]?' on':'')+'" data-goal="'+g[0]+'"><b>'+g[1]+'</b><span>'+g[2]+'</span></button>'}).join('')+'</div><div class="mins"><h3>Time you can give each week</h3><div class="big tnum" id="ob-minv">'+c.mins+' <span>minutes</span></div><input type="range" id="ob-mins" min="30" max="120" step="15" value="'+c.mins+'" aria-label="Minutes per week"></div>'],
   ['Camera','<h2 class="q">How do you feel on camera?</h2><div class="cam-opts">'+CAMS.map(function(x){return '<button type="button" class="cam-opt'+(c.cam===x[0]?' on':'')+'" data-cam="'+x[0]+'"><span class="ic"><svg viewBox="0 0 24 24">'+x[3]+'</svg></span><span><b>'+x[1]+'</b><span>'+x[2]+'</span></span></button>'}).join('')+'</div><div class="stack" style="gap:8px"><h3>Where you\'ll record</h3><div class="seg full" id="ob-where"><span class="thumb"></span>'+WHERE.map(function(w){return '<button type="button" data-where="'+w[0]+'" class="'+(c.where===w[0]?'on':'')+'">'+w[1]+'</button>'}).join('')+'</div></div>','Build my Terminal']
  ];
  return list.map(function(x,i){
    return '<section class="card glass t'+i+'" data-card="'+i+'" aria-label="'+x[0]+'"><div class="q-top"><span class="n">'+(i?String(i).padStart(2,'0')+' / 09':'Frontman')+'</span><span>'+x[0]+'</span></div><div class="q-body">'+x[1]+'</div>'+
     '<div class="q-foot"><button class="btn primary lg" type="button" data-next>'+(x[2]||'Continue')+'</button><span class="hint">or press Enter ↵</span>'+(i>0&&i<9?'<button class="btn plain skip" type="button" data-next>Skip</button>':'')+'</div></section>';
  }).join('');
}
V.onboard=function(){
  return '<div class="ob-wrap"><div class="ob-bar"><button class="btn sm plain" id="ob-back" type="button">‹ Back</button><div class="ob-dots" aria-hidden="true">'+Array.apply(null,{length:9}).map(function(){return '<i></i>'}).join('')+'</div><span class="faint tnum" style="font-size:13px" id="ob-time"></span></div>'+
   '<div class="deck" id="deck">'+obCards()+'</div><p style="text-align:center;margin-top:2px"><a href="#home" id="ob-skip" class="faint" style="font-size:13px">Skip to the Terminal</a></p></div>';
};
function layDeck(){
  var deck=document.getElementById('deck');if(!deck)return;var H=deck.clientHeight;
  deck.querySelectorAll('.card').forEach(function(card,i){
    var d=i-S.ob,t,o;
    if(d<0){t='translateY(18%) rotateX(-96deg) scale(.96)';o=0}
    else if(d===0){t='none';o=1}
    else{var dd=Math.min(d,3),s=1-.05*dd;t='translateY('+(-(22*dd)-(1-s)*H).toFixed(1)+'px) scale('+s+')';o=d>3?0:1-.2*dd}
    card.style.transform=t;card.style.opacity=o;card.style.zIndex=20-Math.abs(d)-(d<0?5:0);card.style.pointerEvents=d===0?'auto':'none';
    card.classList.toggle('cur',d===0);card.inert=d!==0;card.setAttribute('aria-hidden',d===0?'false':'true');
  });
  document.querySelectorAll('.ob-dots i').forEach(function(x,i){x.classList.toggle('on',i<S.ob)});
  var left=Math.max(0,9-Math.max(S.ob-1,0))*12;
  document.getElementById('ob-time').textContent=S.ob>=9?'Last one':'About '+mmss(left)+' left';
  document.getElementById('ob-back').style.visibility=S.ob?'visible':'hidden';
  requestAnimationFrame(syncThumbs);
}
function obGo(n){
  S.ob=Math.max(0,Math.min(CARDS-1,n));layDeck();saveCo();
  var card=document.querySelector('.card[data-card="'+S.ob+'"]'),f=card&&card.querySelector('input.big-in,#ob-co,textarea.one');
  if(f&&matchMedia('(pointer:fine)').matches)setTimeout(function(){try{f.focus({preventScroll:true})}catch(e){}},reduce?0:420);
}
function obNext(){if(S.ob>=CARDS-1){saveCo();location.hash='#build';return}obGo(S.ob+1)}
function obLive(){
  var t=document.getElementById('ob-tile'),m=document.getElementById('mt-mono'),co=document.getElementById('mt-co'),fn=document.getElementById('mt-first');
  var ini=initials(coName()).slice(0,1);if(t)t.textContent=ini;if(m)m.textContent=ini;if(co)co.textContent=coName();if(fn)fn.textContent=firstName();
}
V.onboard.after=function(){
  var q=function(id){return document.getElementById(id)};
  layDeck();
  document.querySelectorAll('[data-next]').forEach(function(b){b.onclick=obNext});
  q('ob-back').onclick=function(){obGo(S.ob-1)};
  q('ob-skip').onclick=function(){S.onboarded=true;saveCo()};
  q('ob-name').oninput=function(){S.co.name=this.value;obLive()};
  document.querySelectorAll('[data-role]').forEach(function(b){b.onclick=function(){S.co.role=b.getAttribute('data-role');document.querySelectorAll('[data-role]').forEach(function(x){x.classList.toggle('on',x===b)})}});
  q('ob-co').oninput=function(){S.co.company=this.value;obLive()};
  q('ob-site').oninput=function(){S.co.site=this.value.trim()};
  var one=q('ob-one'),ring=q('ob-ring'),left=q('ob-left');
  function ringUp(){var n=one.value.length,C=2*Math.PI*9;ring.setAttribute('stroke-dasharray',(C*n/140).toFixed(1)+' '+C.toFixed(1));left.textContent=140-n;ring.setAttribute('stroke',n>125?'var(--warn)':'var(--blue)')}
  one.oninput=function(){S.co.one=one.value;ringUp()};ringUp();
  document.querySelectorAll('[data-ind]').forEach(function(b){b.onclick=function(){S.co.ind=b.getAttribute('data-ind');document.querySelectorAll('[data-ind]').forEach(function(x){x.classList.toggle('on',x===b)});setTimeout(obNext,reduce?0:380)}});
  function audBind(b){b.onclick=function(){var a=b.getAttribute('data-aud'),i=S.co.aud.indexOf(a);if(i>-1)S.co.aud.splice(i,1);else S.co.aud.push(a);b.classList.toggle('on',i<0)}}
  document.querySelectorAll('[data-aud]').forEach(audBind);
  q('ob-addaud').onsubmit=function(e){e.preventDefault();var v=q('ob-audin').value.trim();if(!v)return;if(S.co.aud.indexOf(v)<0)S.co.aud.push(v);q('ob-aud').insertAdjacentHTML('beforeend','<button type="button" class="pill on" data-aud="'+esc(v)+'">'+esc(v)+'</button>');audBind(q('ob-aud').lastElementChild);q('ob-audin').value=''};
  document.querySelectorAll('[data-soc]').forEach(function(inp){inp.oninput=function(){var p=inp.getAttribute('data-soc');S.co.soc[p]=inp.value.replace(/^@/,'').trim();inp.closest('label').classList.toggle('has',!!S.co.soc[p])}});
  document.querySelectorAll('[data-look]').forEach(function(b){b.onclick=function(){S.co.look=b.getAttribute('data-look');document.querySelectorAll('[data-look]').forEach(function(x){x.classList.toggle('on',x===b)});applyLook()}});
  document.querySelectorAll('[data-accent]').forEach(function(b){b.onclick=function(){S.co.accent=b.getAttribute('data-accent');document.querySelectorAll('[data-accent]').forEach(function(x){x.classList.toggle('on',x===b)});applyLook()}});
  document.querySelectorAll('[data-goal]').forEach(function(b){b.onclick=function(){S.co.goal=b.getAttribute('data-goal');document.querySelectorAll('[data-goal]').forEach(function(x){x.classList.toggle('on',x===b)})}});
  q('ob-mins').oninput=function(){S.co.mins=+this.value;q('ob-minv').innerHTML=S.co.mins+' <span>minutes</span>'};
  document.querySelectorAll('[data-cam]').forEach(function(b){b.onclick=function(){S.co.cam=b.getAttribute('data-cam');document.querySelectorAll('[data-cam]').forEach(function(x){x.classList.toggle('on',x===b)})}});
  document.querySelectorAll('[data-where]').forEach(function(b){b.onclick=function(){S.co.where=b.getAttribute('data-where');document.querySelectorAll('[data-where]').forEach(function(x){x.classList.toggle('on',x===b)});syncThumbs()}});
  setTimeout(layDeck,60);
};

/* ---------- the agents' deep dive ---------- */
var buildT=[];
V.build=function(){
  var c=S.co,isS=/sandlot/i.test(c.company),soc=[['ig','Instagram','@'],['tt','TikTok','@'],['yt','YouTube','@'],['li','LinkedIn','']].filter(function(s){return c.soc[s[0]]});
  var steps=[['Reading '+(c.site?esc(c.site):esc(coName())+'\'s website'),'Pages, products, and how you describe yourself','14 pages']]
   .concat(soc.map(function(s){return ['Studying '+s[2]+esc(c.soc[s[0]])+' on '+s[1],'Your last posts: hooks, watch time, comments',s[0]==='li'?'38 posts':'60 posts']}))
   .concat([['Finding your stories','Origin, proof points, beliefs, customer questions','23 stories'],['Mapping the four pillars','Teach, Show, Believe, Entertain','Your mix'],['Writing your first scripts','In your voice, with hook loops built in','6 scripts'],['Designing your Terminal',LOOKS[c.look].name+' type, '+ACCENTS[c.accent][0].toLowerCase()+' accent, set up for '+GOALS.filter(function(g){return g[0]===c.goal})[0][1].toLowerCase(),'Done']]);
  var finds=isS?['Won Startup Cincy','Built in 8 hours','“Proof beats promises”','100+ builders, 11 schools','4 hackathons','In TestFlight','“Find killers”','Bat and ball']:['Your origin story','3 customer questions','A proof point','Your voice','A belief worth posting','A behind-the-scenes moment'];
  return '<section class="glass build" aria-live="polite"><div class="stack" style="gap:6px"><span class="tag blue" style="justify-self:start" id="b-tag">Agents working</span><h1>Building '+esc(coName())+'\'s Terminal</h1><p class="lead" style="margin-top:2px">Our agents are studying everything you shared. This takes about a minute in the real Terminal.</p></div>'+
   '<div class="bsteps">'+steps.map(function(s,i){return '<div class="bstep" data-bs="'+i+'"><i></i><div><b>'+s[0]+'</b><span>'+s[1]+'</span></div><em hidden>'+s[2]+'</em></div>'}).join('')+'</div>'+
   '<div class="stack" style="gap:8px"><h3>What we\'re finding</h3><div class="chips" id="finds" data-f="'+esc(JSON.stringify(finds))+'"></div></div>'+
   '<div id="reveal"></div><p class="faint" style="font-size:12.5px">Prototype: the scan is simulated with example counts.</p></section>';
};
V.build.after=function(){
  buildT.forEach(clearTimeout);buildT=[];
  var steps=document.querySelectorAll('.bstep'),fe=document.getElementById('finds'),finds=JSON.parse(fe.getAttribute('data-f')),gap=reduce?60:900,fi=0;
  steps.forEach(function(st,i){
    buildT.push(setTimeout(function(){st.classList.add('run')},i*gap));
    buildT.push(setTimeout(function(){st.classList.remove('run');st.classList.add('done');if(!LIVE)st.querySelector('em').hidden=false;
      if(finds[fi]){fe.insertAdjacentHTML('beforeend','<span class="tag" style="animation:pop .4s">'+esc(finds[fi++])+'</span>')}
      if(i===2&&finds[fi])fe.insertAdjacentHTML('beforeend','<span class="tag" style="animation:pop .4s">'+esc(finds[fi++])+'</span>');
    },i*gap+gap*.85));
  });
  var work=LIVE?liveBuild().then(function(){return null},function(e){return e}):Promise.resolve(null);
  buildT.push(setTimeout(function(){work.then(function(err){
    if(err){document.getElementById('b-tag').textContent='Needs attention';document.getElementById('b-tag').className='tag';
      document.getElementById('reveal').innerHTML='<div class="reveal"><div class="stack" style="gap:8px"><h2 style="font-size:22px">We couldn\'t finish writing your scripts</h2><p class="muted" style="font-size:14px">'+esc(err.message)+'</p><div class="row"><button class="btn primary" id="b-retry" type="button">Try again</button><button class="btn plain" id="b-skip" type="button">Open my Terminal anyway</button></div></div></div>';
      document.getElementById('b-retry').onclick=function(){render()};document.getElementById('b-skip').onclick=function(){S.onboarded=true;saveCo();location.hash='#home'};return}
    while(finds[fi])fe.insertAdjacentHTML('beforeend','<span class="tag">'+esc(finds[fi++])+'</span>');
    document.getElementById('b-tag').textContent='Ready';document.getElementById('b-tag').className='tag good';
    document.getElementById('reveal').innerHTML='<div class="reveal"><span class="co-tile" style="width:72px;height:72px;font-size:32px;border-radius:20px">'+esc(initials(coName()).slice(0,1))+'</span><div class="stack" style="gap:8px"><h2 style="font-family:var(--display);font-weight:var(--display-w);font-size:24px;letter-spacing:var(--display-ls)">Your Terminal is ready, '+esc(firstName())+'.</h2><p class="muted" style="font-size:14px">'+(LIVE?allCats().length+' stories are ready in the Studio, written for ':'Six scripts are waiting in the Studio, written for ')+esc(S.co.aud.slice(0,2).join(' and ').toLowerCase()||'your audience')+'. Your hour starts with approving them.</p><div class="row"><button class="btn primary" id="open-term" type="button">Open my Terminal</button><button class="btn plain" id="edit-ans" type="button">Change my answers</button></div></div></div>';
    document.getElementById('open-term').onclick=function(){S.onboarded=true;saveCo();location.hash='#home'};
    document.getElementById('edit-ans').onclick=function(){S.ob=1;location.hash='#onboard'};
    document.getElementById('open-term').focus({preventScroll:true});
  })},steps.length*gap+200));
};

/* ---------- v5: pillars, lessons, hooks, scenery ---------- */
var PINFO={
  teach:{trust:'Ability and goodwill',what:'Give real answers away. People trust someone who clearly knows the work and shares it freely.',ex:'How to get hired by a startup with no experience',cat:'advice',mix:25,vids:2},
  show:{trust:'Honesty and proof',what:'Show the work behind the business, mess included. Proof beats promises.',ex:'A week getting Sandlot ready for the App Store',cat:'bts',mix:30,vids:2},
  believe:{trust:'Shared values',what:'Say what you stand for and why you started. People follow a vision, not a logo.',ex:'The Midwest isn\'t missing talent. It\'s missing connections.',cat:'beliefs',mix:30,vids:2},
  entertain:{trust:'Likability and reach',what:'Be someone people enjoy watching. This is what brings new people in.',ex:'A day as a college student running a startup',cat:'day',mix:15,vids:1}};
var LESSONS=[
 {big:'AI',t:'AI can fake an ad. It can\'t fake you.',s:'Why a real face is the one thing that still builds trust.',
  body:['Anyone can now generate a polished ad in minutes. As synthetic content floods every feed, people look for the signal that\'s hard to fake: a real person, saying real things, week after week.','Edelman\'s 2025 brand trust research found that trust is now as much a buying consideration as quality and price, and 73% of people say their trust in a brand would grow if it authentically reflected the culture around it.','That\'s the job of your Terminal: put the real you in front of your customers, consistently, without eating your week.'],
  src:[['Edelman Trust Barometer Special Report: Brand Trust, 2025','https://www.edelman.com/trust/2025/trust-barometer/special-report-brands']]},
 {big:'78%',t:'People would rather watch than read',s:'Most people want a short video when they\'re learning about a product.',
  body:['In Wyzowl\'s State of Video Marketing survey, 78% of people said a short video is how they\'d most like to learn about a product or service, and 87% said a video has convinced them to buy.','Short, vertical video is where your customers already spend their attention. Each script in the Studio is built for that format first, then stretched to 2 and 3 minutes when the story earns it.'],
  src:[['Wyzowl, State of Video Marketing (survey of late 2024)','https://wyzowl.com/sovm-results-2025/']]},
 {big:'92%',t:'Visible leaders earn trust',s:'People trust companies whose leaders show up.',
  body:['FTI Consulting found that 92% of professionals are more likely to trust a company whose senior executives are active on social media.','You don\'t need to become an influencer. You need to be findable, consistent, and clearly yourself. That\'s what an hour a week in the Terminal buys you.'],
  src:[['FTI Consulting, 2022, as summarized by DSMN8','https://dsmn8.com/blog/executive-social-media-statistics/']]},
 {big:'4',t:'The four pillars, explained',s:'Every video builds one kind of trust.',
  body:['Researchers who study trust (Mayer, Davis and Schoorman, 1995) found people decide to trust someone based on three things: ability (can they do it), integrity (are they honest), and benevolence (do they care about me).','Frontman turns that into four kinds of video. Teach shows ability and goodwill. Show proves honesty. Believe shares your values. Entertain makes you likable and brings new people in, so the other three have someone to work on.','The Terminal balances your mix every week so you never post the same kind of video five times in a row.'],
  src:[['Mayer, Davis and Schoorman, "An Integrative Model of Organizational Trust," Academy of Management Review, 1995','https://doi.org/10.5465/amr.1995.9508080335']]},
 {big:'↺',t:'Hook loops keep people watching',s:'Small promises that pay off later.',
  body:['A hook loop is a line that opens a question the viewer wants answered: "But that\'s not even the important part." It gives people a reason to stay through the next beat.','Every script in the Studio places one between each beat. You\'ll see them in blue, and in Insights you can see how long people stay with and without them.'],
  src:[]},
 {big:'1 hr',t:'One hour a week beats one viral video',s:'Trust compounds. Virality doesn\'t.',
  body:['One viral video brings strangers. A steady stream of honest videos turns strangers into people who know you, and people who know you are the ones who buy, apply, and invest.','So the Terminal is built around a single hour: about 10 minutes approving scripts, about 40 shooting, about 10 approving edits. Everything else is done for you.'],
  src:[]}
];
var HOOK_TPL={up:[['Nobody tells you this about [topic].','Nobody tells you this about hiring at a startup.','+38%','412K'],['POV: you [situation].','POV: you\'re running a startup between classes.','+52%','1.1M'],['I [did the hard thing] so you don\'t have to.','I pitched 50 investors so you don\'t have to.','+31%','288K'],['Unpopular opinion: [take].','Unpopular opinion: your GPA doesn\'t matter to founders.','+27%','640K'],['Stop [common mistake].','Stop applying to startups through job boards.','+24%','506K'],['Here\'s exactly how we [result] in [time].','Here\'s exactly how we built an app in 8 hours.','+19%','390K'],['3 things I wish I knew before [milestone].','3 things I wish I knew before starting a company.','+12%','730K']],
  down:[['Hey guys, welcome back.','Hey guys, welcome back to my channel.','−40%','Skip the intro. Start mid-thought.'],['Wait for the end…','Wait for the end to see what happened.','−31%','People scroll. Pay off sooner.'],['You won\'t believe [thing].','You won\'t believe what happened at the hackathon.','−22%','Reads as clickbait now.'],['Did you know [fact]?','Did you know most startups never post their jobs?','−12%','Lead with the fact instead.']]};

/* Scenery ideas: illustrated examples of places worth shooting in */
function sP(x,y,s,c){c=c||'#2B2420';return '<circle cx="'+x+'" cy="'+y+'" r="'+(20*s)+'" fill="'+c+'"/><path d="M'+(x-44*s)+' '+(y+62*s)+'c'+(4*s)+' '+(-26*s)+' '+(22*s)+' '+(-38*s)+' '+(44*s)+' '+(-38*s)+'s'+(40*s)+' '+(12*s)+' '+(44*s)+' '+(38*s)+'z" fill="'+c+'"/>'}
function svgA(inner){return '<svg class="art" viewBox="0 0 320 200" aria-hidden="true" preserveAspectRatio="xMidYMid slice">'+inner+'</svg>'}
var SCN=[
 {id:'desk',name:'Desk by a window',best:['teach'],good:'Answers, how-tos, customer questions',tips:['Face the window so the light hits your face','Put the camera at eye level','A plant or shelf behind you adds depth'],
  art:'<defs><linearGradient id="sw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F2EBDD"/><stop offset="1" stop-color="#DCCFB9"/></linearGradient></defs><rect width="320" height="200" fill="url(#sw)"/><rect x="198" y="20" width="98" height="108" rx="4" fill="#CFE6F5"/><rect x="198" y="20" width="98" height="108" rx="4" fill="none" stroke="#fff" stroke-width="5"/><path d="M247 20v108M198 74h98" stroke="#fff" stroke-width="4"/><path d="M198 128L110 200h210V128z" fill="#fff" opacity=".28"/><rect x="22" y="56" width="96" height="5" rx="2" fill="#A98460"/><rect x="28" y="30" width="9" height="26" fill="#2E5A88"/><rect x="39" y="35" width="8" height="21" fill="#C9744A"/><rect x="49" y="28" width="10" height="28" fill="#3C3C3C"/><rect x="61" y="38" width="22" height="18" rx="3" fill="#E4D8C4"/><circle cx="102" cy="40" r="11" fill="#4F8A5B"/><circle cx="94" cy="46" r="7" fill="#5E9C69"/><rect x="95" y="46" width="14" height="10" fill="#C97B4A"/>'+sP(160,96,1)+'<rect x="0" y="152" width="320" height="48" fill="#8A6A4C"/><rect x="0" y="148" width="320" height="6" fill="#A07D5A"/><rect x="236" y="134" width="14" height="16" rx="3" fill="#F5F1EA"/><path d="M40 148v-40l16-12" stroke="#333" stroke-width="3" fill="none"/><path d="M50 92l20-2-6 13z" fill="#333"/><circle cx="62" cy="104" r="16" fill="#FFE6A8" opacity=".35"/>'},
 {id:'office',name:'Bookshelf office',best:['believe','teach'],good:'Beliefs, big ideas, longer 2 to 3 minute videos',tips:['Sit 6 feet in front of the shelf for natural blur','Warm lamp behind you, soft light in front','Leave a little room above your head'],
  art:'<rect width="320" height="200" fill="#3B2E26"/>'+[0,1,2,3].map(function(r){return '<rect x="14" y="'+(18+r*42)+'" width="292" height="4" fill="#5C4535"/>'+[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(function(i){var cs=['#7A4B3A','#2F4F6F','#C49A5A','#5E7F5A','#8E3B3B','#D8C7A4','#3E3E46'];return '<rect x="'+(18+i*21)+'" y="'+(22+r*42+((i*7+r*3)%9))+'" width="'+(14+(i+r)%5)+'" height="'+(34-((i*7+r*3)%9))+'" fill="'+cs[(i*3+r)%7]+'" opacity=".85"/>'}).join('')}).join('')+'<rect width="320" height="200" fill="#1A120D" opacity=".35"/><circle cx="262" cy="84" r="46" fill="#FFC56B" opacity=".25"/><rect x="254" y="96" width="16" height="70" fill="#2A2018"/><path d="M244 86h36l-8 14h-20z" fill="#E8B060"/>'+sP(150,98,1.05,'#18110D')+'<rect x="0" y="164" width="320" height="36" fill="#2A1F18"/>'},
 {id:'walk',name:'Walk and talk',best:['believe','entertain'],good:'Stories, beliefs, "here\'s what I learned"',tips:['Keep the sun behind the camera','Walk slowly, phone a little above eye level','Use AirPods or a clip-on mic outside'],
  art:'<defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8EC5F0"/><stop offset="1" stop-color="#E9F2F8"/></linearGradient></defs><rect width="320" height="200" fill="url(#sk)"/><rect x="0" y="52" width="70" height="100" fill="#C9B79A"/><rect x="250" y="40" width="70" height="112" fill="#B9A285"/>'+[0,1,2].map(function(i){return '<rect x="'+(10+i*20)+'" y="70" width="10" height="14" fill="#8FB3CC"/><rect x="'+(262+i*18)+'" y="58" width="9" height="13" fill="#8FB3CC"/>'}).join('')+'<circle cx="104" cy="88" r="30" fill="#6E9E5A"/><circle cx="214" cy="80" r="34" fill="#5E8E4C"/><rect x="101" y="108" width="6" height="44" fill="#6B4E36"/><rect x="211" y="104" width="6" height="48" fill="#6B4E36"/><path d="M0 152h320v48H0z" fill="#B8B3A8"/><path d="M120 152L60 200h200l-60-48z" fill="#D6D0C3"/>'+sP(160,92,1.1,'#2A2622')},
 {id:'cafe',name:'Coffee shop',best:['entertain','show'],good:'Day in the life, quick takes, interviews',tips:['Pick a corner seat facing into the room','Go at a quiet hour for clean sound','Keep a cup in frame, not in your hand'],
  art:'<rect width="320" height="200" fill="#2E2520"/>'+[[40,40,10],[96,64,14],[150,30,8],[220,58,16],[280,36,11],[250,100,9],[60,110,12]].map(function(b){return '<circle cx="'+b[0]+'" cy="'+b[1]+'" r="'+b[2]+'" fill="#FFCF85" opacity=".35"/>'}).join('')+'<path d="M80 0v26M240 0v20" stroke="#111" stroke-width="2"/><path d="M68 26h24l-4 10h-16z" fill="#C9984E"/><path d="M228 20h24l-4 10h-16z" fill="#C9984E"/><rect x="0" y="122" width="320" height="10" fill="#6E4A33"/><rect x="0" y="132" width="320" height="68" fill="#4A3123"/>'+sP(160,94,1,'#140E0B')+'<rect x="196" y="136" width="18" height="20" rx="3" fill="#F2EEE8"/><path d="M214 140h5a4 4 0 0 1 0 8h-5" stroke="#F2EEE8" stroke-width="2.5" fill="none"/>'},
 {id:'pod',name:'Podcast set',best:['believe','teach'],good:'Long answers, guests, clips for Shorts',tips:['Dynamic mic about 4 inches from your mouth','One wide angle and one close angle','Dark background, warm lamp in the corner'],
  art:'<rect width="320" height="200" fill="#16161C"/>'+[0,1,2,3,4,5].map(function(i){return '<rect x="'+(18+i*50)+'" y="18" width="42" height="42" rx="4" fill="#24242E"/><rect x="'+(18+i*50)+'" y="66" width="42" height="42" rx="4" fill="#24242E"/>'}).join('')+'<circle cx="270" cy="70" r="60" fill="#FF8A3D" opacity=".18"/><path d="M0 130h320" stroke="#7A4FE0" stroke-width="2" opacity=".6"/>'+sP(150,96,1,'#0B0B0F')+'<rect x="0" y="152" width="320" height="48" fill="#2A211B"/><rect x="186" y="104" width="12" height="26" rx="6" fill="#3A3A42"/><path d="M192 130v22" stroke="#555" stroke-width="3"/><rect x="186" y="104" width="12" height="26" rx="6" fill="none" stroke="#666"/>'},
 {id:'board',name:'Whiteboard',best:['teach'],good:'Breakdowns, frameworks, "let me draw this"',tips:['Light the board evenly to avoid glare','Draw before you film, then reveal it','Stand to the side, not in front of the words'],
  art:'<rect width="320" height="200" fill="#E7E5DF"/><rect x="24" y="22" width="228" height="128" rx="4" fill="#FBFBF8" stroke="#BFC3C8" stroke-width="4"/><path d="M50 60h70M50 78h46" stroke="#2F6FD8" stroke-width="4" stroke-linecap="round"/><circle cx="178" cy="66" r="22" fill="none" stroke="#D0453A" stroke-width="4"/><path d="M120 100c20 20 50 20 70 0" stroke="#1E9E5A" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M186 100l6-4 0 8z" fill="#1E9E5A"/><path d="M60 120h40" stroke="#333" stroke-width="3" stroke-linecap="round"/>'+sP(268,104,.95,'#2B2420')+'<rect x="0" y="166" width="320" height="34" fill="#C9C6BE"/>'},
 {id:'work',name:'Where the work happens',best:['show'],good:'Building in public, before and after, process',tips:['Show real screens, tools, and people working','Film over-the-shoulder shots for B-roll','Ask before anyone else is on camera'],
  art:'<rect width="320" height="200" fill="#1C2433"/><rect x="40" y="40" width="110" height="70" rx="5" fill="#0E1420" stroke="#3B475E" stroke-width="3"/><rect x="170" y="34" width="120" height="76" rx="5" fill="#0E1420" stroke="#3B475E" stroke-width="3"/><rect x="50" y="52" width="60" height="6" rx="3" fill="#3CCF7B"/><rect x="50" y="64" width="80" height="5" rx="2" fill="#5AA9FF"/><rect x="50" y="75" width="44" height="5" rx="2" fill="#BF8BFF"/><rect x="182" y="46" width="44" height="52" rx="6" fill="#121A28" stroke="#3CCF7B" stroke-width="2"/><rect x="234" y="46" width="44" height="52" rx="6" fill="#121A28" stroke="#3B475E" stroke-width="2"/><path d="M95 110v14M230 110v14" stroke="#3B475E" stroke-width="4"/><rect x="0" y="124" width="320" height="76" fill="#2D3546"/>'+sP(160,132,1.05,'#0C0F16')+'<circle cx="300" cy="20" r="60" fill="#5AA9FF" opacity=".08"/>'},
 {id:'golden',name:'Golden hour outside',best:['believe'],good:'Vision, milestones, announcements',tips:['Shoot in the hour before sunset','Put the sun behind you for a warm rim light','Expose for your face, let the sky glow'],
  art:'<defs><linearGradient id="gh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6B26B"/><stop offset=".6" stop-color="#F7D79A"/><stop offset="1" stop-color="#E7956A"/></linearGradient></defs><rect width="320" height="200" fill="url(#gh)"/><circle cx="236" cy="104" r="34" fill="#FFF3C9" opacity=".9"/><path d="M0 128h22v-30h18v18h22v-44h26v56h18v-24h30v24h14v-38h20v38h40v-20h20v20h22v-50h24v50h24v-30h20v58H0z" fill="#8A4F3E" opacity=".75"/><rect x="0" y="150" width="320" height="50" fill="#6B3A2E"/>'+sP(126,96,1.1,'#2A1712')},
 {id:'car',name:'Car confessional',best:['entertain','believe'],good:'Honest moments, quick thoughts, reactions',tips:['Parked, engine off, windows up','Phone on a dash mount just above eye level','Daylight through the windshield is your key light'],
  art:'<rect width="320" height="200" fill="#5E6F7C"/><path d="M0 0h320v96c-60-14-260-14-320 0z" fill="#A9C3D2"/><path d="M0 96c60-14 260-14 320 0" stroke="#2B2F36" stroke-width="10" fill="none"/><rect x="250" y="20" width="60" height="70" rx="10" fill="#2B2F36" opacity=".5"/>'+sP(146,104,1.05,'#1C1D22')+'<rect x="0" y="160" width="320" height="40" fill="#2B2F36"/><circle cx="70" cy="186" r="40" fill="none" stroke="#1A1C21" stroke-width="10"/>'}
];
function scnOf(id){return SCN.filter(function(x){return x.id===id})[0]||SCN[0]}
var OLD2SCN={desk:'desk',walk:'walk',pod:'pod',board:'board',screen:'work',green:'head',street:'street',car:'car'};

/* modal for lessons */
document.body.insertAdjacentHTML('beforeend','<div class="modal-bg" id="modal" hidden><div class="modal glass" role="dialog" aria-modal="true" aria-labelledby="modal-t"><button class="x" type="button" id="modal-x" aria-label="Close">×</button><div id="modal-body" class="stack"></div></div></div>');
var modal=document.getElementById('modal');
function openLesson(i){var L=LESSONS[i];document.getElementById('modal-body').innerHTML='<span class="tag blue" style="justify-self:start">Why this works</span><h2 id="modal-t">'+esc(L.t)+'</h2>'+L.body.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')+(L.src.length?'<p class="src">Source: '+L.src.map(function(s){return '<a href="'+s[1]+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>'}).join('; ')+'</p>':'')+'<div class="row between"><button class="btn sm plain" type="button" data-les="'+((i+LESSONS.length-1)%LESSONS.length)+'">‹ Previous</button><button class="btn sm" type="button" data-les="'+((i+1)%LESSONS.length)+'">Next lesson ›</button></div>';
  modal.hidden=false;modal.querySelectorAll('[data-les]').forEach(function(b){b.onclick=function(){openLesson(+b.getAttribute('data-les'))}});document.getElementById('modal-x').focus()}
document.getElementById('modal-x').onclick=function(){modal.hidden=true};
modal.addEventListener('click',function(e){if(e.target===modal)modal.hidden=true});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)modal.hidden=true});
function spark(vals,col){var mx=Math.max.apply(null,vals),mn=Math.min.apply(null,vals),w=120,h=34;var pts=vals.map(function(v,i){return (i*(w/(vals.length-1))).toFixed(1)+','+(h-3-((v-mn)/((mx-mn)||1))*(h-8)).toFixed(1)}).join(' ');return '<svg class="spark" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="none" aria-hidden="true"><polyline points="'+pts+'" fill="none" stroke="'+(col||'var(--blue)')+'" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>'}
function pillCard(k,href){var P=PINFO[k];return '<'+(href?'a href="'+href+'"':'button type="button" data-pgo="'+k+'"')+' class="glass pcard press" style="--pc:'+PC[k]+'"><div class="pn"><b>'+PILL[k]+'</b><em>'+P.mix+'% of your mix</em></div><span class="tr">Builds '+P.trust.toLowerCase()+'</span><p>'+P.what+'</p><div class="ex">“'+esc(P.ex)+'”</div><div class="bar"><i style="width:'+P.mix*2.5+'%"></i></div><span class="more">Write a '+PILL[k]+' video ›</span></'+(href?'a':'button')+'>'}
function bindPillGo(){document.querySelectorAll('[data-pgo]').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-pgo');S.cat=PINFO[k].cat;S.ownOpen=false;S.hookSel=0;location.hash='#studio'}})}

/* ---------- home ---------- */
V.home=function(){
  var mins=S.co.mins||60,used=Math.max(0,mins-2),pct=used/mins,C=2*Math.PI*62,h=new Date().getHours(),greet=h<12?'Good morning':h<18?'Good afternoon':'Good evening';
  var goal=GOALS.filter(function(g){return g[0]===S.co.goal})[0]||GOALS[0];
  var steps=[[false,'Approve this week\'s scripts','About 10 minutes in the Studio','#studio','Open Studio'],[S.approved.length===0,'Shoot day · Thursday 9:00 AM',(S.co.where==='camera'?'On your camera':'On your phone')+', or upload what you already shot','#shoot','Start shoot'],[S.edits.length===0,'Approve your edits','About 8 minutes. Claude cut and captioned every take.','#edit','Review edits']];
  var pipe=[['6','Scripts drafted','Waiting for your approval','#studio'],[S.approved.length,'Ready to shoot','Teleprompter is loaded','#shoot'],[S.edits.length,'Ready to approve','Cut, captioned, styled','#edit'],[S.scheduled.length,'Scheduled and posted','This week','#post']];
  var kp=[['views','18.4K','Views this week','+32%',[2.1,2.4,2.2,3,3.6,3.3,4.8,5.9,6.4,8.7,11.2,14,18.4]],['trust','21','Saves and shares per 1K views','+6',[9,10,12,11,13,15,14,17,18,19,20,21]],['followers','312','New followers','+18%',[80,96,90,140,150,170,210,190,240,260,300,312]],['questions','14','People asking questions','+9',[1,2,2,3,4,3,5,7,6,9,11,14]]];
  var best=/sandlot/i.test(S.co.company)?'We won Startup Cincy':'Your best video';
  var topF=FORMATS.slice().sort(function(a,b){return parseInt(b.hot)-parseInt(a.hot)})[0];
  return '<div class="head"><div><p class="proto glass">'+(LIVE?'<b>Preview</b>The numbers below are examples until you connect your accounts in Post.':'<b>Prototype</b>Set up for '+esc(coName())+'. Numbers and posts are examples.')+'</p><h1 style="margin-top:14px">'+greet+', '+esc(firstName())+'.</h1><p class="lead">'+mins+' minutes a week to '+goal[1].toLowerCase()+'. Here\'s everything at a glance.</p></div><a class="btn primary" href="#studio">Write this week\'s scripts</a></div>'+
   '<div class="g2 w"><section class="glass pad hour" aria-label="Your hour this week"><div class="ring"><svg viewBox="0 0 150 150" aria-hidden="true"><circle cx="75" cy="75" r="62" fill="none" stroke="var(--well)" stroke-width="12"/><circle cx="75" cy="75" r="62" fill="none" stroke="var(--blue)" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+(C*pct).toFixed(1)+' '+C.toFixed(1)+'"/></svg><div class="c"><div><b>'+used+'</b><span>of '+mins+' min</span></div></div></div>'+
   '<div class="steps">'+steps.map(function(s,i){return '<div class="step'+(s[0]?' done':'')+'"><span class="n">'+(s[0]?'✓':i+1)+'</span><div><b>'+s[1]+'</b><span>'+s[2]+'</span></div>'+(s[0]?'<span class="tag good">Done</span>':'<a class="btn sm primary" href="'+s[3]+'">'+s[4]+'</a>')+'</div>'}).join('')+'</div></section>'+
   '<section class="glass pad stack" style="gap:12px"><div class="row between"><h2>This week</h2><a class="more" href="#post" style="margin:0">Calendar ›</a></div><nav class="pipe">'+pipe.map(function(p){return '<a href="'+p[3]+'"><b class="n">'+p[0]+'</b><div><strong>'+p[1]+'</strong><span>'+p[2]+'</span></div><span class="faint">›</span></a>'}).join('')+'</nav></section></div>'+
   '<div class="sec-h"><div><h2>How it\'s going</h2><p>Tap any box to see the full picture.</p></div><a class="btn sm" href="#insights">All insights</a></div>'+
   '<div class="g4">'+kp.map(function(k){return '<a class="glass pad stat press" href="#insights/'+k[0]+'"><b>'+k[1]+'</b><span>'+k[2]+'</span><br><em>'+k[3]+' vs last week</em>'+spark(k[4])+'<span class="more">See insights ›</span></a>'}).join('')+'</div>'+
   '<div class="sec-h"><div><h2>The four pillars of content</h2><p>Every video builds one kind of trust. A good week mixes all four.</p></div><button class="btn sm plain" type="button" data-lesson="3">Why four? ›</button></div>'+
   '<div class="g4">'+Object.keys(PINFO).map(function(k){return pillCard(k)}).join('')+'</div>'+
   '<div class="g2" style="margin-top:14px"><a class="glass pad press" href="#insights/videos" style="display:grid;grid-template-columns:120px minmax(0,1fr);gap:16px;align-items:center"><div style="max-width:120px">'+stylePrev(S.defStyle||'mint','we won',null,'5 of 50 picked')+'</div><div class="stack" style="gap:6px"><span class="tag good" style="justify-self:start">Best this week</span><b style="font-size:18px;letter-spacing:-.02em">'+esc(best)+'</b><span class="muted" style="font-size:13.5px">6.2K views · 58% watched to the end · 41 saves</span><span class="more">Why it worked ›</span></div></a>'+
   '<a class="glass pad press" href="#library" style="display:grid;grid-template-columns:120px minmax(0,1fr);gap:16px;align-items:center"><div style="max-width:120px">'+stylePrev(topF.style,'the part nobody tells you',topF.scene,topF.hook)+'</div><div class="stack" style="gap:6px"><span class="tag blue" style="justify-self:start">Trending for you · '+topF.hot+'</span><b style="font-size:18px;letter-spacing:-.02em">'+esc(topF.name)+'</b><span class="muted" style="font-size:13.5px">'+esc(topF.why)+'</span><span class="more">Browse templates ›</span></div></a></div>'+
   '<div class="sec-h"><div><h2>Why this works</h2><p>Short reads on the thinking behind your Terminal, with sources.</p></div></div>'+
   '<div class="g3">'+LESSONS.map(function(L,i){return '<button class="glass learn" type="button" data-lesson="'+i+'"><span class="big">'+L.big+'</span><b>'+esc(L.t)+'</b><span>'+esc(L.s)+'</span><span class="more">Read · 1 min ›</span></button>'}).join('')+'</div>';
};
V.home.after=function(){
  document.querySelectorAll('[data-lesson]').forEach(function(b){b.onclick=function(){openLesson(+b.getAttribute('data-lesson'))}});
  bindPillGo();
};

function fmtBanner(){var f=S.format&&fmt(S.format);if(!f)return '';var sc=scene(f.scene),st=STYLE_LIB[f.style]||STYLE_LIB.bold;
  return '<div class="glass fmtbar"><span class="tag blue">Template</span><b>'+esc(f.name)+'</b><span class="faint">Scene: '+esc(sc.name)+' · Style: '+esc(st.name)+'</span><span style="margin-left:auto" class="row"><a class="btn sm plain" href="#library">Change</a><button class="btn sm plain" id="fmt-clear" type="button">Clear</button></span></div>';}

/* ---------- shoot ---------- */
var cur=0,recT=null,recS=0,raf=null;
var UPIC='<svg viewBox="0 0 24 24"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>';
function takesOf(t){return S.takes[t]||0}
function code(t){var h=0;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return h.toString(36).toUpperCase().slice(0,6)}
function slug(t){return t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,24)}
if(!S.scn)S.scn='desk';if(!S.paired)S.paired=false;
V.shoot=function(){
  var q=S.approved;if(cur>=q.length)cur=0;var s=q[cur];
  if(!s)return '<div class="head"><div><h1>Shoot</h1><p class="lead">Approve scripts in the Studio and they show up here, ready to record or upload.</p></div></div><div class="glass pad" style="text-align:center"><a class="btn primary" href="#studio">Open Studio</a></div>'+scenery(null);
  var clips=S.clips[s.title]||[];
  var link='frontman.app/r/'+code(s.title)+'/'+slug(s.title);
  var panel='<div class="shoot-one"><div class="stack" style="gap:16px">'+
    '<div class="qr-row"><canvas id="qr" width="200" height="200" aria-label="Example code for this script"></canvas>'+
     '<div class="stack" style="gap:8px;min-width:0"><span class="tag blue" style="justify-self:start">Record</span><h2>Scan to record on your phone</h2><div class="qrlink" title="'+link+'">'+link+'</div>'+
     '<span class="pair'+(S.paired?' on':'')+'" id="pair"><i></i><span>'+(S.paired?'iPhone connected':'Waiting for your phone…')+'</span></span></div></div>'+
    '<ol class="howto"><li>Scan with your iPhone camera. No app to install.</li><li>Pick how much of the script shows on screen.</li><li>Record. Every take lands here on its own.</li></ol>'+
    '<div class="or"><span>or</span></div>'+
    '<div class="stack" style="gap:10px"><span class="tag" style="justify-self:start">Upload</span><label class="drop slim" id="drop" for="up-file">'+UPIC+'<b>Drop clips you already shot</b><span>Or click to choose. MOV, MP4, anything from your phone or camera.</span></label><input type="file" id="up-file" accept="video/*" multiple hidden>'+
     (clips.length?'<div class="stack" style="gap:6px">'+clips.map(function(c,i){return '<div class="cliprow"><i>'+(i+1)+'</i><div style="min-width:0"><b>'+esc(c.name)+'</b><span class="faint">'+c.size+'</span></div><span class="tag good">Uploaded</span></div>'}).join('')+'</div>':'')+'</div>'+
    '<p class="faint" style="font-size:12px">Example code. In this preview, record with the phone on the right.</p></div>'+
   '<div class="stack" style="gap:10px;justify-items:center"><div class="iph" aria-label="Phone recorder preview">'+recApp(false)+'</div><a class="btn sm plain" href="#rec">Open the phone view full screen</a></div></div>';
  var tk=takesOf(s.title)+clips.length;
  return '<div class="head"><div><h1>Shoot</h1><p class="lead">Scan the code to record on your phone, or upload what you already shot. Claude finds the best take either way.</p></div></div>'+
  '<div class="split"><div class="glass pad stack">'+panel+'</div>'+
  '<div class="glass pad stack" style="align-self:start"><div class="row between"><h2>Shot list</h2><span class="faint tnum" style="font-size:13px">'+q.length+' scripts · ~'+Math.round(q.reduce(function(n,x){return n+x.secs},0)*3/60)+' min</span></div><div class="list">'+
   q.map(function(x,i){var n=takesOf(x.title)+(S.clips[x.title]||[]).length;return '<button class="li'+(i===cur?' on':'')+'" data-i="'+i+'" type="button"><div><b>'+esc(x.title)+'</b><span>'+PILL[x.pillar]+' · '+mmss(x.secs)+(n?' · '+n+' take'+(n>1?'s':''):'')+'</span></div><span class="dot d-'+x.pillar+'"></span></button>'}).join('')+
   '</div><div class="row between"><span class="faint" style="font-size:13px" id="takes">'+(tk?tk+' take'+(tk>1?'s':'')+' ready':'No takes yet')+'</span><button class="btn primary" id="done" type="button"'+(tk?'':' disabled')+'>Send to edit</button></div>'+
   '<div class="sdet"><b style="font-size:13px">Suggested place to shoot</b><span class="muted">'+esc(scnOf(OLD2SCN[s.scene]||'desk').name)+': '+esc(scnOf(OLD2SCN[s.scene]||'desk').good.toLowerCase())+'.</span><a class="more" href="#scenery" id="go-scn" style="margin:0">See scenery ideas ›</a></div></div></div>'+
  '<div id="coach-wrap">'+deliveryCard(s)+'</div>'+scenery(OLD2SCN[s.scene]||'desk');
};

function bindTk(){document.querySelectorAll('[data-tk]').forEach(function(b){b.onclick=function(){var s0=S.approved[cur];S.takeSel[s0.title]=+b.getAttribute('data-tk');var cw=document.getElementById('coach-wrap');if(cw){cw.innerHTML=deliveryCard(s0);bindTk()}}})}
/* the phone recorder: what opens when you scan the code */
var RM={mode:'full',size:17,speed:26};
function narr(s){if(!s)return '';if(RM.mode==='hook')return s.hook;if(RM.mode==='bullets')return '• '+s.hook+'\n'+s.text.split(/\n\n+/).map(function(p){return '• '+p.split(/(?<=[.!?])\s/)[0]}).join('\n');return s.hook+'\n\n'+s.text}
function recApp(full){var s=S.approved[cur];if(!s)return '<div class="rec-app" style="display:grid;place-items:center;padding:30px;text-align:center"><p>No scripts to record yet.<br><a href="#studio" style="color:#3CCF7B">Approve one in the Studio</a></p></div>';
  return '<div class="rec-app" id="recapp"><span class="rbg" id="r-bg"></span><span class="person"></span>'+
   '<div class="rtop"><div class="rbrand"><span>'+(full?'<a href="#shoot" style="text-decoration:none">‹ Back</a> · ':'')+esc(coName())+'</span><span id="r-link">● Linked to Frontman</span></div>'+
   '<div class="row"><select id="r-script" aria-label="Script">'+S.approved.map(function(x,i){return '<option value="'+i+'"'+(i===cur?' selected':'')+'>'+esc(x.title)+'</option>'}).join('')+'</select></div>'+
   '<div class="row" id="r-mode" style="overflow-x:auto">'+[['full','Full script'],['bullets','Bullets'],['hook','Hook only'],['off','No text']].map(function(x){return '<button type="button" class="rchip'+(RM.mode===x[0]?' on':'')+'" data-rm="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'+
   '<span class="rtime" id="r-time" hidden>0:00</span>'+
   '<div class="tele" id="r-tele"'+(RM.mode==='off'?' hidden':'')+'><p id="r-text" style="font-size:'+RM.size+'px">'+esc(narr(s))+'</p></div><div class="rtoast" id="r-toast"></div>'+
   '<div class="rbot"><div class="rset"><span>Text</span><button type="button" class="rchip" data-rs="-1" aria-label="Smaller text">A−</button><button type="button" class="rchip" data-rs="1" aria-label="Bigger text">A+</button><span style="margin-left:6px">Speed</span><input type="range" id="r-speed" min="10" max="60" value="'+RM.speed+'" aria-label="Scroll speed"></div>'+
   '<div class="rctl"><button type="button" class="rsm" id="r-flip" aria-label="Flip camera"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><path d="M9 13a3 3 0 0 1 5-2l1 1M15 13a3 3 0 0 1-5 2l-1-1"/></svg></button><button type="button" class="rbtn" id="r-rec" aria-label="Record"><i></i></button><span class="rtk" id="r-tk">'+takesOf(s.title)+' take'+(takesOf(s.title)===1?'':'s')+'</span></div></div></div>';}
function bindRec(){
  var app=document.getElementById('recapp');if(!app)return;var s=S.approved[cur],y=0,rf=null,t=null,sec=0,last=0;
  var q=function(id){return document.getElementById(id)},txt=q('r-text');
  function rtoast(m){var el=q('r-toast');el.textContent=m;el.classList.add('show');setTimeout(function(){el.classList.remove('show')},1600)}
  q('r-script').onchange=function(){cur=+this.value;s=S.approved[cur];txt.textContent=narr(s);y=0;txt.style.transform='';q('r-tk').textContent=takesOf(s.title)+(takesOf(s.title)===1?' take':' takes');
    document.querySelectorAll('[data-i]').forEach(function(b){b.classList.toggle('on',+b.getAttribute('data-i')===cur)});var ql=document.querySelector('.qrlink');if(ql)ql.textContent='frontman.app/r/'+code(s.title)+'/'+slug(s.title);upd()};
  app.querySelectorAll('[data-rm]').forEach(function(b){b.onclick=function(){RM.mode=b.getAttribute('data-rm');app.querySelectorAll('[data-rm]').forEach(function(x){x.classList.toggle('on',x===b)});q('r-tele').hidden=RM.mode==='off';txt.textContent=narr(s);y=0;txt.style.transform=''}});
  app.querySelectorAll('[data-rs]').forEach(function(b){b.onclick=function(){RM.size=Math.max(12,Math.min(28,RM.size+2*(+b.getAttribute('data-rs'))));txt.style.fontSize=RM.size+'px'}});
  q('r-speed').oninput=function(){RM.speed=+this.value};
  q('r-flip').onclick=function(){q('r-bg').classList.toggle('back');rtoast(q('r-bg').classList.contains('back')?'Back camera':'Front camera')};
  function tick(ts){if(!document.getElementById('recapp'))return;var dt=last?(ts-last)/1000:0;last=ts;y+=dt*RM.speed;txt.style.transform='translateY(-'+y+'px)';rf=requestAnimationFrame(tick)}
  function upd(){var n=takesOf(s.title)+(S.clips[s.title]||[]).length,tk=q('takes'),dn=q('done');if(tk)tk.textContent=n?n+' take'+(n>1?'s':'')+' ready':'No takes yet';if(dn)dn.disabled=!n;var cw=document.getElementById('coach-wrap');if(cw){cw.innerHTML=deliveryCard(s);bindTk()}}
  q('r-rec').onclick=function(){var b=this;
    if(b.classList.contains('on')){b.classList.remove('on');cancelAnimationFrame(rf);clearInterval(t);q('r-time').hidden=true;
      rtoast('Uploading take…');S.takes[s.title]=takesOf(s.title)+1;var n=takesOf(s.title);
      setTimeout(function(){if(!document.getElementById('recapp'))return;rtoast('✓ Take '+n+' sent to Frontman');q('r-tk').textContent=n+(n===1?' take':' takes');upd();var p=q('pair');if(p&&!S.paired){S.paired=true;p.classList.add('on');p.querySelector('span').textContent='iPhone connected'}},reduce?50:1100)}
    else{b.classList.add('on');y=0;last=0;sec=0;q('r-time').hidden=false;q('r-time').textContent='0:00';t=setInterval(function(){if(!document.getElementById('recapp')){clearInterval(t);return}sec++;q('r-time').textContent=mmss(sec)},1000);if(!reduce)rf=requestAnimationFrame(tick)}};
  if(!S.paired&&q('pair'))setTimeout(function(){var p=q('pair');if(p&&document.getElementById('recapp')){S.paired=true;p.classList.add('on');p.querySelector('span').textContent='iPhone connected'}},reduce?50:2500);
}
V.rec=function(){return '<div class="rec-full">'+recApp(true)+'</div>'};
V.rec.after=bindRec;
function drawQR(cv,seed){if(!arguments[0]||!arguments[0].getContext)return;var x=cv.getContext('2d'),n=25,u=cv.width/n;seed=seed||7;function r(){seed=(seed*16807)%2147483647;return seed/2147483647}
  x.fillStyle='#fff';x.fillRect(0,0,cv.width,cv.height);x.fillStyle='#111';
  for(var i=0;i<n;i++)for(var j=0;j<n;j++){var f=(i<8&&j<8)||(i<8&&j>n-9)||(i>n-9&&j<8);if(!f&&r()>.52)x.fillRect(i*u,j*u,u,u)}
  [[0,0],[n-7,0],[0,n-7]].forEach(function(p){x.fillRect(p[0]*u,p[1]*u,7*u,7*u);x.fillStyle='#fff';x.fillRect((p[0]+1)*u,(p[1]+1)*u,5*u,5*u);x.fillStyle='#111';x.fillRect((p[0]+2)*u,(p[1]+2)*u,3*u,3*u)});}
function fsize(b){return b>1e9?(b/1e9).toFixed(1)+' GB':b>1e6?(b/1e6).toFixed(1)+' MB':Math.max(1,Math.round(b/1e3))+' KB'}
V.shoot.after=function(){
  bindScenery();
  bindTk();
  var s=S.approved[cur];if(!s)return;
  var q=function(id){return document.getElementById(id)};
  document.querySelectorAll('[data-i]').forEach(function(b){b.onclick=function(){cur=+b.getAttribute('data-i');render()}});
  var drop=q('drop'),inp=q('up-file');
  function take(files){var arr=[].slice.call(files||[]).filter(function(f){return /^video\//.test(f.type)||/\.(mov|mp4|m4v|webm)$/i.test(f.name)});if(!arr.length){toast('Choose a video file');return}
    S.clips[s.title]=(S.clips[s.title]||[]).concat(arr.map(function(f){var u='';try{u=URL.createObjectURL(f)}catch(e){}return {url:u,name:f.name,size:fsize(f.size)}}));render();toast(arr.length+' clip'+(arr.length>1?'s':'')+' uploaded')}
  inp.onchange=function(){take(inp.files)};
  ['dragenter','dragover'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('over')})});
  ['dragleave','drop'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.remove('over')})});
  drop.addEventListener('drop',function(e){take(e.dataTransfer&&e.dataTransfer.files)});
  drawQR(q('qr'),parseInt(code(s.title),36)%2147483646+1);bindRec();
  q('done').onclick=function(){clearInterval(recT);cancelAnimationFrame(raf);var it=S.approved.splice(cur,1)[0],cl=S.clips[it.title]||[];it.clip=cl.length?cl[cl.length-1].url:null;it.styleUsed=S.defStyle||S.style;S.edits.push(it);toast('Sent to edit. Claude is cutting it now.');render()};
};

/* ---------- edit ---------- */
var capT=null,refT=[];
if(!S.myHooks)S.myHooks=[];if(!S.hookTab)S.hookTab='up';
function refMatch(d){d=(d||'').toLowerCase();var r={style:'tabloid',cut:'1.6s',caps:'3 words at a time',extras:['Zoom punch-in on every hook loop','Sound hit on each cut','Music ducked under your voice']};
  if(/calm|slow|clean|minimal|apple/.test(d)){r.style='clean';r.cut='3.2s';r.caps='1 line at a time';r.extras=['Slow push-in on the hook','No sound effects','Soft piano under your voice']}
  else if(/film|vhs|grain|retro|vintage/.test(d)){r.style=/vhs/.test(d)?'vhs':'grain';r.cut='2.4s';r.caps='4 words at a time';r.extras=['Film grain and warm color','Light leaks between beats','Lo-fi music bed']}
  else if(/neon|night|dark/.test(d)){r.style='neon';r.extras=['Glow on highlighted words','Bass hit on each loop','Dark color grade']}
  else if(/serif|elegant|editorial|lux/.test(d)){r.style='serif';r.cut='2.8s';r.caps='1 line at a time';r.extras=['Cinematic bars','Slow cross-fades','Strings under your voice']}
  if(/fast|quick|hype|energy/.test(d))r.cut='1.1s';return r}
V.edit=function(){
  var s=S.edits[0];
  if(!s)return '<div class="head"><div><h1>Edit</h1><p class="lead">After a shoot, Claude picks the best take, cuts it, captions it, and styles it here for you to approve.</p></div></div><div class="glass pad" style="text-align:center"><a class="btn primary" href="#shoot">Go to shoot</a></div>';
  if(s.styleUsed&&!s.touched){S.style=s.styleUsed;s.touched=1}
  var st=STYLE_LIB[S.style]||STYLE_LIB.bold,isDef=S.defStyle===S.style;
  if(S.myStyles.indexOf(S.style)<0)S.myStyles.push(S.style);
  var R=s.ref,more=Object.keys(STYLE_LIB).filter(function(k){return S.myStyles.indexOf(k)<0});
  var refCard='<section class="glass pad refbox"><div class="row between"><h2>Edit it like a reference</h2><span class="tag warn">Simulated</span></div>'+
   (!R?'<p class="muted" style="font-size:14px">Upload a video you love, or describe the feel. Claude studies the pacing, captions, zooms, and sound, then re-edits your take in that exact format.</p><label class="drop" id="ref-drop" for="ref-up" style="padding:22px">'+UPIC+'<b>Upload a reference video</b><span>A creator you like, a trending post, or your own best video</span></label><input type="file" id="ref-up" accept="video/*" hidden>'+
     '<form class="composer" id="ref-form"><textarea id="ref-in" rows="1" placeholder="Or describe it: fast cuts, big yellow captions, zoom on every loop" aria-label="Describe the edit you want"></textarea><button class="icb send" type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form>'
   :R.stage==='run'?'<p class="muted" style="font-size:14px">Studying <b>'+esc(R.name)+'</b>…</p><div class="anl" id="ref-anl">'+['Pacing and cuts','Captions','Zooms and motion','Sound and music','Color'].map(function(x,i){return '<div class="bstep" data-rr="'+i+'"><i></i><div><b>'+x+'</b><span>Watching…</span></div></div>'}).join('')+'</div>'
   :'<p class="muted" style="font-size:14px">Re-edited to match <b>'+esc(R.name)+'</b>.</p><div class="anl">'+[['Cuts','A cut about every '+R.m.cut],['Captions',R.m.caps+', '+STYLE_LIB[R.m.style].name+' style']].concat(R.m.extras.map(function(e){return ['Added',e]})).map(function(x){return '<div class="bstep done"><i></i><div><b>'+x[0]+'</b><span>'+esc(x[1])+'</span></div></div>'}).join('')+'</div><div class="row"><button class="btn sm primary" id="ref-tpl" type="button">Save as a template</button><button class="btn sm" id="ref-undo" type="button">Undo</button><button class="btn sm plain" id="ref-new" type="button">Try another reference</button></div>')+
   '</section>';
  var hookCard=vhookCard(s);
  return '<div class="head"><div><h1>'+esc(s.title)+'</h1><p class="lead">Claude chose the take, made the cuts, and wrote the captions. Change the style, the hook, or edit it like a video you love.</p></div><div class="row"><button class="btn" id="redo" type="button">Re-edit with a note</button><button class="btn primary" id="appr" type="button">Approve</button></div></div>'+
  '<div class="g2"><div class="glass pad stack" style="justify-items:center;align-self:start"><div class="phone'+(st.grain?' grainy':'')+((vhOf(S.vhook).base||S.vhook)==='zoom'?' zoomhk':'')+'" id="phone">'+(s.clip?'<video src="'+s.clip+'" autoplay muted loop playsinline></video>':'<span class="shot" id="shotbg" style="'+(st.shot?'filter:'+st.shot:'')+'"></span><span class="person"></span>')+
    (st.bars?'<span style="position:absolute;left:0;right:0;top:0;height:10%;background:#000;z-index:1"></span><span style="position:absolute;left:0;right:0;bottom:0;height:10%;background:#000;z-index:1"></span>':'')+(st.tag?'<span class="vtag">'+st.tag+'</span>':'')+(R&&R.stage==='done'?'<span class="vtag" style="left:auto;right:14px;font-family:var(--sans);font-weight:700">Matched</span>':'')+
    vhHTML(S.vhook,S.vtext[S.vhook])+'<div class="cap" id="cap" style="'+capStyle(st)+'"></div><div class="pbar"><i id="pbar"></i></div></div>'+
   '<div class="seg scroll" id="styles"><span class="thumb"></span>'+S.myStyles.map(function(id){var x=STYLE_LIB[id];return x?'<button type="button" data-st="'+id+'" class="'+(S.style===id?'on':'')+'">'+esc(x.name)+(S.defStyle===id?' ★':'')+'</button>':''}).join('')+'</div>'+
   '<div class="row" style="justify-content:center"><button class="btn sm'+(isDef?' good':'')+'" id="def" type="button">'+(isDef?'✓ Your default style':'Always use this style')+'</button><button class="btn sm" id="add-st" type="button">'+(S.edDrawer?'Done adding':'+ Add styles')+'</button><a class="btn sm plain" href="#library" id="mk-st">Make your own</a></div>'+
   (S.edDrawer?'<div class="drawer"><div class="row between"><b style="font-size:14px">Add a style</b><span class="faint" style="font-size:12px">'+more.length+' more in the Library</span></div><div class="sgrid">'+more.map(function(k){return '<div class="glass stile">'+stylePrev(k,'your best line')+'<div class="nm" style="font-size:12px"><span>'+esc(STYLE_LIB[k].name)+'</span></div><button class="btn sm" type="button" data-addst="'+k+'">'+(STYLE_LIB[k].price&&STYLE_LIB[k].price!=='Free'?'Get '+STYLE_LIB[k].price:'Add')+'</button></div>'}).join('')+'</div></div>':'')+
  '</div>'+
  '<div class="stack">'+refCard+hookCard+'<div class="glass pad"><h2 style="margin-bottom:12px">What Claude did</h2><ul class="did">'+(s.clip?'<li>Used your uploaded clip and trimmed the dead air at the start.</li>':'<li>Used take 2 of 3: steadiest delivery and the most energy on the hook.</li>')+'<li>'+(R&&R.stage==='done'?'Matched the pacing of your reference: a cut about every '+R.m.cut+'.':'Cut 4 pauses and one restart.')+'</li><li>Opened with a visual hook: '+esc(vhOf(S.vhook).name.toLowerCase())+'.</li><li>Added a beat of emphasis at each hook loop.</li><li>'+(S.defStyle&&S.defStyle===S.style?'Applied your default style, '+esc((STYLE_LIB[S.defStyle]||st).name)+'.':'Styled it in '+esc(st.name)+'.')+'</li></ul></div>'+
   '<div class="glass pad"><h2 style="margin-bottom:6px">Posting to</h2>'+['ig','tt','yt','li'].map(function(p){return '<div class="acct"><span class="plat '+p+'">'+PLAT[p]+'</span><div><b>'+PLATN[p]+'</b><span>'+(S.connected[p]?'Caption written for '+PLATN[p]:'Connect in Post to publish here')+'</span></div><span class="tag'+(S.connected[p]?' good':'')+'">'+(S.connected[p]?'On':'Off')+'</span></div>'}).join('')+'</div></div></div>';
};
V.edit.after=function(){
  var s=S.edits[0];if(!s)return;var q=function(id){return document.getElementById(id)};
  function keep(){var y=window.scrollY;render();window.scrollTo(0,y)}
  document.querySelectorAll('[data-st]').forEach(function(b){b.onclick=function(){S.style=b.getAttribute('data-st');keep()}});
  q('def').onclick=function(){if(S.defStyle===S.style)return;S.defStyle=S.style;toast('Every edit will use '+STYLE_LIB[S.style].name+' from now on');keep()};
  q('add-st').onclick=function(){S.edDrawer=!S.edDrawer;keep()};
  q('mk-st').onclick=function(){S.libTab='mine'};
  document.querySelectorAll('[data-addst]').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-addst');S.myStyles.push(k);S.style=k;toast(STYLE_LIB[k].name+' added'+(STYLE_LIB[k].price&&STYLE_LIB[k].price!=='Free'?' (prototype: no charge)':''));keep()}});
  q('appr').onclick=function(){var e=S.edits.shift(),auto=!S.rhythm||S.rhythm.auto;S.scheduled.push({title:e.title,pillar:e.pillar,p:['ig','tt','yt','li'].filter(function(x){return S.connected[x]}),d:auto?4+S.scheduled.length%3:null,t:auto?['07:30','12:15','10:00'][S.scheduled.length%3]:null});toast(auto?'Approved and scheduled at your best time':'Approved. Pick a time in Post.');render()};
  q('redo').onclick=function(){var r=q('ref-in');if(r){r.focus();r.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'})}else toast('Type a note like "faster cuts" and Claude re-edits.')};
  bindVhook(s,keep);
  /* reference */
  refT.forEach(clearTimeout);refT=[];
  function startRef(name,desc){s.ref={name:name,stage:'run',prev:S.style,m:refMatch(desc||name)};keep()}
  var ru=q('ref-up'),rd=q('ref-drop');
  if(ru){ru.onchange=function(){var f=ru.files[0];if(f)startRef(f.name,f.name)};
    ['dragenter','dragover'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.add('over')})});['dragleave','drop'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.remove('over')})});
    rd.addEventListener('drop',function(e){var f=e.dataTransfer&&e.dataTransfer.files[0];if(f)startRef(f.name,f.name)});
    q('ref-form').onsubmit=function(e){e.preventDefault();var v=q('ref-in').value.trim();if(!v){q('ref-in').focus();return}startRef('"'+v.slice(0,40)+(v.length>40?'…':'')+'"',v)};
    q('ref-in').onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();q('ref-form').requestSubmit()}}}
  if(s.ref&&s.ref.stage==='run'&&!LIVE){[0,1,2,3,4].forEach(function(i){refT.push(setTimeout(function(){var el=document.querySelector('[data-rr="'+i+'"]');if(el)el.classList.add('run')},i*(reduce?20:380)))});
    refT.push(setTimeout(function(){if(!S.edits[0]||S.edits[0]!==s)return;s.ref.stage='done';if(S.myStyles.indexOf(s.ref.m.style)<0)S.myStyles.push(s.ref.m.style);S.style=s.ref.m.style;if(route()==='edit')keep();toast('Re-edited to match your reference')},5*(reduce?20:380)+500))}
  var rt=q('ref-tpl');if(rt){rt.onclick=function(){FORMATS.unshift({id:'m'+Date.now(),mine:1,name:'Like '+s.ref.name.replace(/\.[^.]+$/,'').slice(0,30),pillar:s.pillar,style:s.ref.m.style,scene:'desk',hook:s.hook,beats:['Hook on screen, 2 seconds','Cut every '+s.ref.m.cut,'Captions '+s.ref.m.caps,s.ref.m.extras[0]],why:'Built from a reference you uploaded.',uses:'',hot:''});toast('Saved to your templates in the Library')};
    q('ref-undo').onclick=function(){S.style=s.ref.prev;s.ref=null;keep()};q('ref-new').onclick=function(){s.ref=null;keep()}}
  /* captions */
  var st=STYLE_LIB[S.style]||STYLE_LIB.bold;
  var w=(s.text||s.hook).replace(/\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim().split(' '),i=0,cap=q('cap'),pb=q('pbar'),bg=q('shotbg'),n=s.ref&&s.ref.stage==='done'&&/^3/.test(s.ref.m.caps)?3:4;
  clearInterval(capT);
  function tick(){if(!document.getElementById('cap')){clearInterval(capT);return}cap.innerHTML=capHTML(w.slice(i,i+n),st);var f=i/w.length;pb.style.width=(f*100)+'%';if(bg)bg.className='shot'+(f>.4&&f<.55?' b':'');i+=n;if(i>=w.length)i=0}
  tick();if(!reduce)capT=setInterval(tick,s.ref&&s.ref.stage==='done'?parseFloat(s.ref.m.cut)*500+300:900);
  requestAnimationFrame(function(){var on=document.querySelector('#styles .on');if(on)on.parentNode.scrollLeft=on.offsetLeft-40});
};

/* ---------- v6: delivery coach ---------- */
function rng(seed){var s=seed%2147483647;if(s<=0)s+=2147483646;return function(){s=s*16807%2147483647;return (s-1)/2147483646}}
function hashStr(t){var h=7;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return h}
if(!S.takeSel)S.takeSel={};
function takeData(title,i,secs){var r=rng(hashStr(title)+i*97+13),wpm=Math.round(128+r()*40),fill=Math.floor(r()*6),eye=Math.round(78+r()*20),en=Math.round(60+r()*38),pz=Math.floor(r()*4),clar=Math.round(88+r()*11);
  var sc=Math.round(Math.max(40,Math.min(98,100-Math.abs(wpm-148)*.6-fill*3-(100-eye)*.6-(100-en)*.25-pz*2)));
  var len=Math.max(30,Math.round(secs||70)),marks=[];
  var pool=[['warn','Looked down at the script'],['warn','"Um" before the key line'],['good','Strong energy on the hook'],['warn','Rushed the number, slow it down'],['good','Clear pause before the hook loop'],['warn','Energy dipped here'],['good','Smiled, felt natural'],['warn','Long pause, Claude will cut it']];
  for(var k=0;k<5;k++){var p=pool[Math.floor(r()*pool.length)];marks.push({at:Math.round((k+.3+r()*.6)/5.4*len),kind:p[0],t:p[1]})}
  return {i:i,score:sc,wpm:wpm,fill:fill,eye:eye,energy:en,pauses:pz,clar:clar,len:len,marks:marks,fillers:fill?['"um" ×'+Math.max(1,fill-1),'"like" ×1'].slice(0,fill>1?2:1):[]};}
function deliveryCard(s){
  var n=takesOf(s.title)+(S.clips[s.title]||[]).length;
  var head='<div class="sec-h"><div><h2>Delivery coach</h2><p>Claude watches every frame and listens to every word: pace, filler words, eye contact, energy, and pauses.</p></div><span class="tag warn">Simulated</span></div>';
  if(!n)return head+'<div class="glass pad coach-empty"><span class="faint">Record or upload a take and Claude scores your delivery here, frame by frame.</span></div>';
  var all=[];for(var i=0;i<n;i++)all.push(takeData(s.title,i,s.secs));
  var best=all.slice().sort(function(a,b){return b.score-a.score})[0],sel=S.takeSel[s.title];if(sel==null||sel>=n)sel=best.i;var d=all[sel];
  var C=2*Math.PI*30,col=d.score>=80?'var(--good)':d.score>=65?'var(--blue)':'var(--warn)';
  var mets=[['Pace',d.wpm==null?'—':d.wpm+' wpm',d.wpm>=135&&d.wpm<=160,'Aim for 135 to 160'],['Filler words',d.fill==null?'—':String(d.fill),d.fill<=2,d.fillers.join(', ')||'None'],['Eye contact',d.eye==null?'—':d.eye+'%',d.eye>=85,'Looking at the lens'],['Energy',d.energy==null?'—':d.energy>=80?'High':d.energy>=65?'Steady':'Low',d.energy>=70,'Voice and face'],['Long pauses',d.pauses==null?'—':String(d.pauses),d.pauses<=1,'Cut automatically'],['Clarity',d.clar==null?'—':d.clar+'%',d.clar>=92,'Words the transcript caught']];
  var tips=[];if(d.wpm>160)tips.push('You sped up. Take a breath before each hook loop.');if(d.wpm!=null&&d.wpm<135)tips.push('Pick up the pace a little. Short videos reward momentum.');if(d.fill>2)tips.push('Pause instead of saying "um". Silence gets cut, filler words don\'t.');if(d.eye!=null&&d.eye<85)tips.push('Move the teleprompter text closer to the lens, or use Bullets mode.');if(d.energy!=null&&d.energy<70)tips.push('Stand up for the next take. Energy carries through the camera.');if(!tips.length)tips.push('This is a great take. Keep the same energy for the next script.');if(d.tips)tips=d.tips.slice();
  return head+'<div class="glass pad coach"><div class="coach-top"><div class="takes-pick">'+all.map(function(t){return '<button type="button" class="tk'+(t.i===sel?' on':'')+'" data-tk="'+t.i+'"><b>Take '+(t.i+1)+'</b><span>'+t.score+'</span>'+(t.i===best.i?'<em>Best</em>':'')+'</button>'}).join('')+'</div>'+
   '<div class="row" style="gap:14px;flex-wrap:nowrap"><svg viewBox="0 0 72 72" class="sring" aria-hidden="true"><circle cx="36" cy="36" r="30" fill="none" stroke="var(--well)" stroke-width="7"/><circle cx="36" cy="36" r="30" fill="none" stroke="'+col+'" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+(C*d.score/100).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 36 36)"/><text x="36" y="41" text-anchor="middle" font-size="18" font-weight="700" fill="var(--ink)">'+d.score+'</text></svg><div><b>Take '+(d.i+1)+(d.i===best.i?' · Claude will use this one':'')+'</b><span class="muted" style="display:block;font-size:13px">Delivery score out of 100</span></div></div></div>'+
   '<div class="mets">'+mets.map(function(m){return '<div class="met'+(m[2]?' ok':' no')+'"><span>'+m[0]+'</span><b>'+m[1]+'</b><small>'+esc(m[3])+'</small></div>'}).join('')+'</div>'+
   '<div class="tline"><div class="tl-bar">'+d.marks.map(function(m){return '<i class="'+m.kind+'" style="left:'+(m.at/d.len*100).toFixed(1)+'%" title="'+mmss(m.at)+' '+esc(m.t)+'"></i>'}).join('')+'</div><div class="tl-axis"><span>0:00</span><span>'+mmss(d.len)+'</span></div></div>'+
   '<div class="g2"><ul class="moments">'+d.marks.slice().sort(function(a,b){return a.at-b.at}).map(function(m){return '<li class="'+m.kind+'"><span class="tnum">'+mmss(m.at)+'</span>'+esc(m.t)+'</li>'}).join('')+'</ul><div class="stack" style="gap:8px"><h3>For your next take</h3><ul class="did">'+tips.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul></div></div></div>';
}

/* ---------- post ---------- */
var DAYS=['Mon 2','Tue 3','Wed 4','Thu 5','Fri 6','Sat 7','Sun 8'],TODAY=3;
var BEST={ig:'12:15',tt:'19:00',yt:'17:00',li:'08:30'},DAYBEST=['12:00','12:00','12:00','12:00','12:00','21:00','17:00'];
if(!S.postInit){S.postInit=1;S.scheduled.unshift({title:'We won Startup Cincy',p:['ig','li'],d:0,t:'07:30',live:1,pillar:'show'},{title:'Sandlot is in TestFlight',p:['ig','li'],d:1,t:'12:00',live:1,pillar:'show'});S.rhythm={per:5,days:[0,1,2,3,4],auto:true,mode:'best'};S.postSel=null}
function to24(t){if(!/M$/i.test(t))return t;var m=t.match(/(\d+):(\d+)\s*([AP])M/i),h=+m[1]%12+(m[3].toUpperCase()==='P'?12:0);return String(h).padStart(2,'0')+':'+m[2]}
function to12(t){var p=t.split(':'),h=+p[0];return ((h%12)||12)+':'+p[1]+' '+(h<12?'AM':'PM')}
function capsFor(x){var co=coName();return {ig:x.title+'.\n\nBuilding '+co+' in public. Follow along.\n#startup #founder #college',tt:x.title+' #startuptok #college #buildinpublic',yt:x.title,li:'Something I learned building '+co+':\n\n'+x.title+'.\n\nWhat would you add?'}}
function normPosts(){S.scheduled.forEach(function(x,i){if(!x.id)x.id='p'+i+'_'+hashStr(x.title);if(x.t)x.t=to24(x.t);if(!x.caps)x.caps=capsFor(x);if(!x.on){x.on={};['ig','tt','yt','li'].forEach(function(p){x.on[p]=x.p?x.p.indexOf(p)>-1||S.connected[p]:S.connected[p]})}if(!x.pt)x.pt={}})}
function postById(id){return S.scheduled.filter(function(x){return x.id===id})[0]}
V.post=function(){
  normPosts();var R=S.rhythm,sel=postById(S.postSel)||S.scheduled.filter(function(x){return !x.live})[0]||null;if(sel)S.postSel=sel.id;
  var drafts=S.scheduled.filter(function(x){return x.d==null});
  var cal='<div class="cal post-cal">'+DAYS.map(function(d,i){var items=S.scheduled.filter(function(x){return x.d===i}).sort(function(a,b){return a.t<b.t?-1:1});var past=i<TODAY;
    return '<div class="glass day'+(i===TODAY?' today':'')+(R.days.indexOf(i)<0?' off':'')+'"><h3>'+d+(i===TODAY?' · Today':'')+'</h3>'+(past?'':'<button type="button" class="best" data-slot="'+i+'" title="Schedule the selected video here">★ Best '+to12(DAYBEST[i]).replace(':00','')+'</button>')+
      items.map(function(x){return '<button type="button" class="post'+(sel&&x.id===sel.id?' on':'')+'" data-post="'+x.id+'"><span class="faint">'+to12(x.t)+'</span><b>'+esc(x.title)+'</b>'+plats(['ig','tt','yt','li'].filter(function(p){return x.on[p]&&S.connected[p]}))+(x.live?'<span class="tag good" style="justify-self:start">Posted</span>':x.own?'<span class="tag" style="justify-self:start">Your upload</span>':'')+'</button>'}).join('')+'</div>'}).join('')+'</div>';
  var ed='';
  if(sel){var plat=['ig','tt','yt','li'];
    ed='<section class="glass pad stack post-ed" style="gap:14px"><div class="row between"><div><h3>'+(sel.live?'Posted':sel.d==null?'Not scheduled yet':'Scheduled')+'</h3><h2 style="margin-top:4px">'+esc(sel.title)+'</h2></div>'+(sel.own?'<span class="tag">Your upload · not edited</span>':'<span class="tag blue">Edited by Claude</span>')+'</div>'+
     (sel.live?'<p class="muted" style="font-size:14px">This one is live. See how it\'s doing in <a href="#insights/videos" style="color:var(--blue)">Insights</a>.</p>':
     '<div class="stack" style="gap:8px"><h3>Day</h3><div class="daypick">'+DAYS.map(function(d,i){return '<button type="button" data-pd="'+i+'" class="'+(sel.d===i?'on':'')+'"'+(i<TODAY?' disabled':'')+'>'+d.split(' ')[0]+'<b>'+d.split(' ')[1]+'</b></button>'}).join('')+'</div></div>'+
     '<div class="stack" style="gap:8px"><h3>Time</h3><div class="seg full" id="pmode"><span class="thumb"></span><button type="button" data-pm="best" class="'+(sel.mode!=='same'?'on':'')+'">Best time on each</button><button type="button" data-pm="same" class="'+(sel.mode==='same'?'on':'')+'">Same time everywhere</button></div>'+
      (sel.mode==='same'?'<input type="time" class="input" id="ptime" value="'+(sel.t||'12:00')+'" style="max-width:180px">':'')+'</div>'+
     '<div class="stack" style="gap:8px"><h3>Where</h3>'+plat.map(function(p){var on=sel.on[p]&&S.connected[p],t=sel.mode==='same'?(sel.t||'12:00'):(sel.pt[p]||BEST[p]);return '<details class="prow'+(on?'':' offp')+'"><summary><span class="plat '+p+'">'+PLAT[p]+'</span><span class="pn"><b>'+PLATN[p]+'</b><span>'+(S.connected[p]?(on?(sel.d==null?'':DAYS[sel.d].split(' ')[0]+' ')+to12(t)+(sel.mode!=='same'?' · best time':''):'Off for this video'):'Not connected')+'</span></span>'+(S.connected[p]?'<button type="button" class="switch'+(on?' on':'')+'" data-pp="'+p+'" aria-label="Post to '+PLATN[p]+'"></button>':'<a class="btn sm" href="#post" data-conn="'+p+'">Connect</a>')+'</summary>'+
       (S.connected[p]?'<div class="pbody">'+(sel.mode!=='same'?'<label class="row" style="gap:8px;font-size:13px">Time <input type="time" class="input" data-ptime="'+p+'" value="'+t+'" style="max-width:150px;padding:6px 10px"></label>':'')+'<label class="faint" style="font-size:12.5px;font-weight:600">Caption, written for '+PLATN[p]+'</label><textarea class="area" data-cap="'+p+'" style="min-height:90px">'+esc(sel.caps[p])+'</textarea></div>':'')+'</details>'}).join('')+'</div>'+
     '<div class="row"><button class="btn primary" id="psched" type="button">'+(sel.d==null?'Schedule':'Save changes')+'</button><button class="btn" id="pnow" type="button">Post now</button>'+(sel.d!=null?'<button class="btn plain" id="punsched" type="button">Unschedule</button>':'')+'</div>')+'</section>';}
  return '<div class="head"><div><h1>Post</h1><p class="lead">Pick when each video goes out. It posts to every connected platform, with a caption written for each one.</p></div><div class="row"><label class="btn" for="own-vid" style="cursor:pointer">'+UPIC.replace('<svg','<svg style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.9"')+'Upload a finished video</label><input type="file" id="own-vid" accept="video/*" hidden><button class="btn primary" id="autosched" type="button">Auto-schedule</button></div></div>'+
   (drafts.length?'<div class="glass pad drafts"><h3>Ready to schedule</h3><div class="chips">'+drafts.map(function(x){return '<button type="button" class="chipb'+(sel&&x.id===sel.id?' on':'')+'" data-post="'+x.id+'">'+esc(x.title)+(x.own?' · your upload':'')+'</button>'}).join('')+'</div><span class="faint" style="font-size:12.5px">Pick one, then tap a day\'s ★ best time, or set it on the right.</span></div>':'')+
   '<div class="post-grid"><div class="stack">'+cal+
    '<div class="g2"><section class="glass pad stack" style="gap:14px"><h2>Posting rhythm</h2><div class="stack" style="gap:6px"><h3>Videos per week · <span class="tnum" id="per-v">'+R.per+'</span></h3><input type="range" id="per" min="2" max="14" value="'+R.per+'" aria-label="Videos per week"></div><div class="stack" style="gap:6px"><h3>Posting days</h3><div class="pills">'+DAYS.map(function(d,i){return '<button type="button" class="pill'+(R.days.indexOf(i)>-1?' on':'')+'" data-rd="'+i+'">'+d.split(' ')[0]+'</button>'}).join('')+'</div></div><button type="button" class="row between" id="auto-sw" style="border:0;background:none;padding:0;cursor:pointer;width:100%;font-size:14px;color:var(--ink)"><span>Auto-post when I approve an edit</span><span class="switch'+(R.auto?' on':'')+'"></span></button></section>'+
    '<section class="glass pad"><h2 style="margin-bottom:6px">Accounts</h2>'+['ig','tt','yt','li'].map(function(p){var c=S.connected[p];return '<div class="acct"><span class="plat '+p+'">'+PLAT[p]+'</span><div><b>'+PLATN[p]+'</b><span>'+(c?{ig:'@huzzsco',li:'Jayden Huszczo',tt:'@huzzsco',yt:'@huzzsco'}[p]:'Not connected')+'</span></div><button class="btn sm'+(c?' plain':' primary')+'" data-c="'+p+'" type="button">'+(c?'Disconnect':'Connect')+'</button></div>'}).join('')+'<p class="faint" style="font-size:12.5px;margin-top:8px">Posts through each platform\'s official publishing API. Frontman never logs in as you.</p></section></div></div>'+
   (ed||'<section class="glass pad post-ed"><h2>Nothing to schedule</h2><p class="muted" style="margin-top:6px;font-size:14px">Approve an edit, or upload a finished video.</p></section>')+'</div>';
};
V.post.after=function(){
  var q=function(id){return document.getElementById(id)},sel=postById(S.postSel);function keep(){var y=window.scrollY;render();window.scrollTo(0,y)}
  document.querySelectorAll('[data-c]').forEach(function(b){b.onclick=function(){var p=b.getAttribute('data-c');S.connected[p]=!S.connected[p];toast(PLATN[p]+(S.connected[p]?' connected':' disconnected'));keep()}});
  document.querySelectorAll('[data-conn]').forEach(function(a){a.onclick=function(e){e.preventDefault();S.connected[a.getAttribute('data-conn')]=true;toast(PLATN[a.getAttribute('data-conn')]+' connected');keep()}});
  document.querySelectorAll('[data-post]').forEach(function(b){b.onclick=function(){S.postSel=b.getAttribute('data-post');keep()}});
  document.querySelectorAll('[data-slot]').forEach(function(b){b.onclick=function(){if(!sel||sel.live){toast('Pick a video first');return}var i=+b.getAttribute('data-slot');sel.d=i;sel.t=DAYBEST[i];sel.mode='same';toast('Scheduled for '+DAYS[i].split(' ')[0]+' at '+to12(DAYBEST[i]));keep()}});
  q('own-vid').onchange=function(){var f=this.files[0];if(!f)return;var u='';try{u=URL.createObjectURL(f)}catch(e){}var x={title:f.name.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ').slice(0,60),own:1,clip:u,d:null,t:null,mode:'best'};S.scheduled.push(x);normPosts();S.postSel=x.id;toast('Uploaded. It posts exactly as you made it.');keep()};
  q('autosched').onclick=function(){var R=S.rhythm,free=S.scheduled.filter(function(x){return x.d==null});if(!free.length){toast('Everything is already scheduled');return}var days=R.days.filter(function(d){return d>=TODAY}),k=0;free.forEach(function(x){var d=days.length?days[k%days.length]:TODAY;x.d=d;x.t=DAYBEST[d];x.mode='best';k++});toast(free.length+' video'+(free.length>1?'s':'')+' scheduled at your best times');keep()};
  q('per').oninput=function(){S.rhythm.per=+this.value;q('per-v').textContent=this.value};
  document.querySelectorAll('[data-rd]').forEach(function(b){b.onclick=function(){var i=+b.getAttribute('data-rd'),a=S.rhythm.days,k=a.indexOf(i);if(k>-1)a.splice(k,1);else a.push(i);keep()}});
  q('auto-sw').onclick=function(){S.rhythm.auto=!S.rhythm.auto;toast(S.rhythm.auto?'Approved edits post automatically':'You\'ll schedule each video yourself');keep()};
  if(!sel||sel.live)return;
  document.querySelectorAll('[data-pd]').forEach(function(b){b.onclick=function(){sel.d=+b.getAttribute('data-pd');if(!sel.t)sel.t=DAYBEST[sel.d];keep()}});
  document.querySelectorAll('[data-pm]').forEach(function(b){b.onclick=function(){sel.mode=b.getAttribute('data-pm');if(!sel.t)sel.t='12:00';keep()}});
  var pt=q('ptime');if(pt)pt.onchange=function(){sel.t=pt.value;keep()};
  document.querySelectorAll('[data-ptime]').forEach(function(inp){inp.onchange=function(){sel.pt[inp.getAttribute('data-ptime')]=inp.value;keep()}});
  document.querySelectorAll('[data-pp]').forEach(function(b){b.onclick=function(e){e.preventDefault();e.stopPropagation();var p=b.getAttribute('data-pp');sel.on[p]=!sel.on[p];keep()}});
  document.querySelectorAll('[data-cap]').forEach(function(t){t.oninput=function(){sel.caps[t.getAttribute('data-cap')]=t.value}});
  q('psched').onclick=function(){if(sel.d==null){sel.d=Math.max(TODAY,S.rhythm.days.filter(function(d){return d>=TODAY})[0]||TODAY);sel.t=sel.t||DAYBEST[sel.d]}if(!sel.t)sel.t=DAYBEST[sel.d];var n=['ig','tt','yt','li'].filter(function(p){return sel.on[p]&&S.connected[p]}).length;toast('Scheduled for '+DAYS[sel.d].split(' ')[0]+' on '+n+' platform'+(n===1?'':'s'));keep()};
  q('pnow').onclick=function(){sel.d=TODAY;var n=new Date();sel.t=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');sel.live=1;toast('Posted to '+['ig','tt','yt','li'].filter(function(p){return sel.on[p]&&S.connected[p]}).map(function(p){return PLATN[p].split(' ')[0]}).join(', '));keep()};
  var un=q('punsched');if(un)un.onclick=function(){sel.d=null;toast('Moved back to Ready to schedule');keep()};
};

/* ---------- v6: visual hooks (what the viewer SEES in the first 2 seconds) ---------- */
var VHOOKS={
 number:{name:'Number slam',desc:'A huge number hits the screen on the first word.',tr:'+44%',def:'8 HRS',up:1},
 headline:{name:'Headline behind you',desc:'A post or headline drops in above your head, green-screen style.',tr:'+39%',def:'Students can\'t find startups',up:1},
 split:{name:'Before and after split',desc:'The screen splits: before on the left, after on the right.',tr:'+36%',def:'BEFORE|AFTER',up:1},
 zoom:{name:'Zoom punch-in',desc:'A fast push-in on your face on the first beat.',tr:'+31%',def:'',up:1},
 callout:{name:'Circle and arrow',desc:'Draws a circle around something with an arrow and a label.',tr:'+27%',def:'This part',up:1},
 sticker:{name:'Sticker drop',desc:'A label slaps onto the screen with a bounce.',tr:'+24%',def:'IN TESTFLIGHT',up:1},
 map:{name:'Map pin',desc:'A mini map with a pin dropping where the story happens.',tr:'+21%',def:'Columbus, OH',up:1},
 progress:{name:'Progress bar list',desc:'A bar fills along the top with "1 of 3" so people know how long.',tr:'+18%',def:'1 of 3',up:1},
 type:{name:'Question typed on screen',desc:'The question types itself out in the middle of the frame.',tr:'+15%',def:'Why can\'t founders find talent?',up:1},
 countdown:{name:'"Wait for it" timer',desc:'A countdown that asks people to wait.',tr:'−34%',def:'WAIT FOR IT',up:0,why:'People scroll before it pays off.'},
 arrows:{name:'Red arrow spam',desc:'Lots of arrows and circles everywhere.',tr:'−29%',def:'',up:0,why:'Reads as clickbait now.'},
 glitch:{name:'Glitch intro',desc:'A heavy glitch or logo sting before you appear.',tr:'−22%',def:'',up:0,why:'Delays your face. Start on you.'},
 subscribe:{name:'Subscribe button intro',desc:'A subscribe or follow animation in the first second.',tr:'−17%',def:'',up:0,why:'Ask after you\'ve given value, not before.'}
};
if(!S.vhook)S.vhook='number';if(!S.vtext)S.vtext={};if(!S.myVH)S.myVH=[];if(!S.vtab)S.vtab='up';
function vhOf(id){return VHOOKS[id]||S.myVH.filter(function(x){return x.id===id})[0]||VHOOKS.number}
function vhHTML(id,txt){var h=vhOf(id),t=esc(txt==null?h.def:txt),base=h.base||id;
  switch(base){
   case 'number':return '<div class="vh vh-number"><b style="'+(h.col?'color:'+h.col:'')+'">'+t+'</b></div>';
   case 'headline':return '<div class="vh vh-headline"><div class="hl-card"><span><i></i><em>@news · 2h</em></span><b>'+t+'</b></div></div>';
   case 'split':var p=(txt==null?h.def:txt).split('|');return '<div class="vh vh-split"><i></i><span class="l">'+esc(p[0]||'BEFORE')+'</span><span class="r">'+esc(p[1]||'AFTER')+'</span></div>';
   case 'zoom':return '<div class="vh vh-zoom">'+(t?'<b>'+t+'</b>':'')+'</div>';
   case 'callout':return '<div class="vh vh-callout"><i class="ring"></i><i class="arw"></i><b>'+t+'</b></div>';
   case 'sticker':return '<div class="vh vh-sticker"><b style="'+(h.col?'background:'+h.col:'')+'">'+t+'</b></div>';
   case 'map':return '<div class="vh vh-map"><div class="mp"><i class="road"></i><i class="pin"></i><b>'+t+'</b></div></div>';
   case 'progress':return '<div class="vh vh-progress"><i></i><b>'+t+'</b></div>';
   case 'type':return '<div class="vh vh-type"><b><span>'+t+'</span></b></div>';
   case 'countdown':return '<div class="vh vh-count"><b>'+t+'</b><i>3</i></div>';
   case 'arrows':return '<div class="vh vh-arrows"><i></i><i></i><i></i><i></i></div>';
   case 'glitch':return '<div class="vh vh-glitch"><b>'+esc(coName().toUpperCase())+'</b></div>';
   case 'subscribe':return '<div class="vh vh-sub"><b>FOLLOW</b></div>';
  }return ''}
function vhookCard(s){
  var tab=S.vtab,ids=tab==='mine'?S.myVH.map(function(x){return x.id}):Object.keys(VHOOKS).filter(function(k){return VHOOKS[k].up===(tab==='up'?1:0)});
  var h=vhOf(S.vhook),txt=S.vtext[S.vhook]!=null?S.vtext[S.vhook]:h.def;
  return '<section class="glass pad stack" style="gap:12px"><div class="row between"><h2>Visual hook</h2><span class="faint" style="font-size:12.5px">What people see in the first 2 seconds</span></div>'+
   '<div class="vh-now"><div><b>'+esc(h.name)+'</b><span>'+esc(h.desc)+'</span></div>'+(h.base!=='zoom'&&S.vhook!=='zoom'&&!/arrows|glitch|subscribe/.test(h.base||S.vhook)?'<input class="input" id="vh-text" value="'+esc(txt)+'" aria-label="Text in the hook" placeholder="Text on screen">':'')+'</div>'+
   '<div class="seg scroll" id="vh-tabs"><span class="thumb"></span>'+[['up','Trending'],['down','Fading'],['mine','Yours']].map(function(x){return '<button type="button" data-vt="'+x[0]+'" class="'+(tab===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>'+
   (ids.length?'<div class="vh-grid">'+ids.map(function(k){var x=vhOf(k);return '<button type="button" class="vh-tile'+(S.vhook===k?' on':'')+'" data-vh="'+k+'"><span class="vh-mini">'+vhHTML(k,null)+'</span><b>'+esc(x.name)+'</b><span class="'+(x.up===0?'tr-dn':x.mine?'faint':'tr-up')+'">'+(x.mine?'Yours':(x.up?'↑ ':'↓ ')+x.tr)+'</span>'+(x.why?'<small>'+esc(x.why)+'</small>':'')+'</button>'}).join('')+'</div>':'<p class="faint" style="font-size:13px">No visual hooks of your own yet. Make one below.</p>')+
   (tab==='mine'?'<form class="vh-make" id="vh-make"><select class="select" id="vh-base" aria-label="Start from">'+Object.keys(VHOOKS).filter(function(k){return VHOOKS[k].up}).map(function(k){return '<option value="'+k+'">'+VHOOKS[k].name+'</option>'}).join('')+'</select><input class="input" id="vh-name" placeholder="Name it" aria-label="Name"><input class="input" id="vh-def" placeholder="Default text" aria-label="Default text"><div class="sw" id="vh-cols">'+['#FFD60A','#3CCF7B','#FF7A63','#7CF9FF','#FFFFFF'].map(function(c,i){return '<button type="button" data-vc="'+c+'" class="'+(i===0?'on':'')+'" style="background:'+c+'" aria-label="'+c+'"></button>'}).join('')+'</div><button class="btn sm primary" type="submit">Save visual hook</button></form>':'')+
   '<p class="faint" style="font-size:12.5px">'+(tab==='down'?'Fading: showing up less in videos that hold viewers this month.':tab==='up'?'Trending: growing fastest in videos that hold viewers this month.':'Your own hooks show up in every edit.')+' Example data.</p>'+
   '<details class="spoken"><summary>Spoken first line</summary><form class="composer" id="hk-form" style="margin-top:8px"><textarea id="hk-in" rows="1" aria-label="What you say first">'+esc(s.hook)+'</textarea><button class="btn sm" type="submit">Update</button></form></details></section>';
}
function bindVhook(s,keep){
  var q=function(id){return document.getElementById(id)};
  document.querySelectorAll('[data-vt]').forEach(function(b){b.onclick=function(){S.vtab=b.getAttribute('data-vt');keep()}});
  document.querySelectorAll('[data-vh]').forEach(function(b){b.onclick=function(){S.vhook=b.getAttribute('data-vh');var x=vhOf(S.vhook);if(x.up===0)toast(x.name+' is fading: '+x.why);keep()}});
  var vt=q('vh-text');if(vt)vt.oninput=function(){S.vtext[S.vhook]=vt.value;var o=document.querySelector('#phone .vh');if(o)o.outerHTML=vhHTML(S.vhook,vt.value)};
  var hf=q('hk-form');if(hf)hf.onsubmit=function(e){e.preventDefault();var v=q('hk-in').value.trim();if(!v)return;s.hook=v;toast('Spoken line updated')};
  var mk=q('vh-make');if(mk){var col='#FFD60A';document.querySelectorAll('[data-vc]').forEach(function(b){b.onclick=function(){col=b.getAttribute('data-vc');document.querySelectorAll('[data-vc]').forEach(function(x){x.classList.toggle('on',x===b)})}});
    mk.onsubmit=function(e){e.preventDefault();var base=q('vh-base').value,id='v'+Date.now();S.myVH.push({id:id,base:base,name:q('vh-name').value.trim()||'My '+VHOOKS[base].name.toLowerCase(),desc:'Your version of '+VHOOKS[base].name.toLowerCase()+'.',def:q('vh-def').value.trim()||VHOOKS[base].def,col:col,mine:1,up:1,tr:''});S.vhook=id;toast('Saved to your visual hooks');keep()}}
}

/* ---------- scenery: setups the biggest creators use, with sources ---------- */
var SRC={vid:['VidPros, YouTube studio setups','https://vidpros.com/youtube-studio-setup-top-channels/'],rv:['Riverside, Hormozi-style videos','https://riverside.com/blog/hormozi-style-videos'],gt:['How top podcasts nail studio design','https://gotranscript.com/public/how-top-podcasts-nail-studio-design-and-lighting'],cs:['Learning from Codie Sanchez\'s video strategy','https://clover-apricots-sy54.squarespace.com/industry-bites/can-you-be-a-creator-ceo-learning-from-codie-sanchezs-video-strategy'],dm:['Wikipedia, Daniel Mac','https://en.wikipedia.org/wiki/Daniel_Mac'],tc:['TechCrunch, TikTok car confessionals','https://techcrunch.com/2023/12/13/tiktok-car-confessionals-are-the-new-youtube-bedroom-vlogs/'],cn:['Tubefilter, Casey Neistat\'s 368','https://tubefilter.com/2018/04/05/casey-neistat-368-daily-vlog-collaborative-space/']};
var SCN_X={
 desk:{name:'Desk with books and plants',who:'Ali Abdaal',how:'Films at a desk with a bookshelf of his own books and greenery behind him for depth and color.',src:'vid',why:'Reads as "this person knows things" before you say a word.'},
 head:{name:'Close talking head',who:'Alex Hormozi',tips:['Frame from mid-chest up, eyes in the top third','Plain, dark background so nothing competes','Let captions and zooms do the moving'],how:'Sits and talks straight to camera, edited with big bold captions, zooms, and B-roll.',src:'rv',why:'Nothing competes with your face. The edit does the moving.'},
 pod:{name:'Dark podcast set',who:'The Diary of a CEO',how:'A black backdrop and controlled lighting keep every eye on the person talking.',src:'gt',why:'Feels like a big conversation, so clips carry authority.'},
 office:{name:'Bright set with depth',who:'Colin and Samir',how:'Bright and modern, with depth in the background and subtle branding.',src:'gt',why:'Warm and approachable. Good for longer 2 and 3 minute videos.'},
 walk:{name:'Walk and talk',who:'Codie Sanchez',how:'Uses walk and talk as one of her core formats: "walk while you talk."',src:'cs',why:'Movement keeps the eye busy, so simple ideas hold attention.'},
 board:{name:'Whiteboard',who:'Codie Sanchez',how:'Whiteboard breakdowns: "step into lecturer mode and talk as you write."',src:'cs',why:'Teaching on a board reads as expertise without bragging.'},
 street:{name:'Man on the street',who:'Daniel Mac',tips:['Ask one simple question, the same way every time','Use a handheld mic so people know it\'s an interview','Ask before you film anyone'],how:'Walks up to people and asks one simple question: "What do you do for a living?"',src:'dm',why:'Other people\'s answers do the work, and the format is endlessly repeatable.'},
 car:{name:'Car confessional',who:'Keith Lee',how:'Many of his restaurant reviews are filmed in his car.',src:'tc',why:'Private, well lit, and feels unscripted even when it isn\'t.'},
 work:{name:'Where the work happens',who:'Casey Neistat',how:'Built 368, a studio that was part daily vlog and part workspace, and filmed the work happening there.',src:'cn',why:'Shows the real process. Proof beats promises.'}
};
var HEAD_ART='<defs><radialGradient id="hd" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#3A3F4A"/><stop offset="1" stop-color="#121418"/></radialGradient></defs><rect width="320" height="200" fill="url(#hd)"/><circle cx="160" cy="84" r="70" fill="#5AA9FF" opacity=".08"/>'+sP(160,86,1.7,'#07080A')+'<rect x="196" y="120" width="10" height="48" rx="5" fill="#2A2D33"/><rect x="190" y="104" width="22" height="30" rx="10" fill="#1B1D21" stroke="#3A3D44" stroke-width="2"/><rect x="40" y="150" width="240" height="30" rx="6" fill="#FFD60A" opacity=".9"/><rect x="60" y="160" width="120" height="10" rx="3" fill="#111"/><rect x="190" y="160" width="70" height="10" rx="3" fill="#111" opacity=".6"/>';
var STREET_ART='<rect width="320" height="200" fill="#C9D6E3"/><rect x="0" y="30" width="110" height="120" fill="#B49C82"/><rect x="220" y="20" width="100" height="130" fill="#8F7D6A"/>'+[0,1,2].map(function(r){return [0,1,2].map(function(c){return '<rect x="'+(12+c*32)+'" y="'+(44+r*32)+'" width="20" height="20" fill="#E6EEF4" opacity=".8"/><rect x="'+(232+c*30)+'" y="'+(34+r*34)+'" width="18" height="22" fill="#E6EEF4" opacity=".7"/>'}).join('')}).join('')+'<rect x="0" y="150" width="320" height="50" fill="#8A8F96"/><path d="M118 132h104l10 18H108z" fill="#C0392B"/><rect x="104" y="146" width="132" height="16" rx="6" fill="#A93226"/><circle cx="126" cy="164" r="9" fill="#222"/><circle cx="214" cy="164" r="9" fill="#222"/><rect x="128" y="134" width="38" height="12" rx="3" fill="#BFD7EA"/><rect x="172" y="134" width="40" height="12" rx="3" fill="#BFD7EA"/>'+sP(270,104,.9,'#2B2420')+'<rect x="238" y="112" width="6" height="16" rx="3" fill="#111" transform="rotate(-30 241 120)"/>';
function scnArt(id){var base=SCN.filter(function(x){return x.id===id})[0];if(id==='head')return HEAD_ART;if(id==='street')return STREET_ART;return base?base.art:''}
function scenery(sugg){
  var ids=['desk','head','pod','office','walk','board','street','car','work'];
  return '<div class="sec-h" id="scenery"><div><h2>Scenery that works</h2><p>The setups behind some of the biggest creators and podcasts, and how to copy each one with a phone or a camera.</p></div><span class="tag">Illustrations · sources linked</span></div>'+
   '<div class="scn-grid">'+ids.map(function(id){var x=SCN_X[id],o=SCN.filter(function(y){return y.id===id})[0],on=S.scn===id,src=SRC[x.src];
     return '<div class="glass scn'+(on?' on':'')+'" data-scn="'+id+'" role="button" tabindex="0">'+svgA(scnArt(id))+'<div class="nm"><b>'+esc(x.name)+'</b>'+(sugg===id?'<span class="tag blue">Suggested</span>':'')+'</div>'+
      '<div class="seen"><span>Seen on</span><b>'+esc(x.who)+'</b></div><span class="faint" style="font-size:12.5px;padding:0 4px">'+esc(x.how)+'</span>'+
      (on?'<div class="sdet" style="margin:4px"><b style="font-size:13px">Why it performs</b><span class="muted">'+esc(x.why)+'</span>'+((x.tips||(o&&o.tips))?'<b style="font-size:13px;margin-top:4px">How to set it up</b><ul style="padding-left:18px;margin:0">'+(x.tips||o.tips).map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul>':'')+'<a class="more" href="'+src[1]+'" target="_blank" rel="noopener" style="margin:4px 0 0">Source: '+esc(src[0])+' ↗</a></div>':'<span class="more" style="padding:0 4px;margin:0">Why it works and how to set it up ›</span>')+'</div>'}).join('')+'</div>';
}
function bindScenery(){document.querySelectorAll('[data-scn]').forEach(function(b){function go(e){if(e.target.closest('a'))return;S.scn=S.scn===b.getAttribute('data-scn')?null:b.getAttribute('data-scn');var y=window.scrollY;render();window.scrollTo(0,y)}b.onclick=go;b.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go(e)}}});
  var g=document.getElementById('go-scn');if(g)g.onclick=function(e){e.preventDefault();document.getElementById('scenery').scrollIntoView({behavior:reduce?'auto':'smooth'})}}

/* ---------- brand: the why ---------- */
var WHY=[
 {n:'01',t:'The face is the moat',s:'AI can fake the ad. It can\'t fake you.',b:['Anyone can now generate a slick ad in minutes, so slick doesn\'t earn trust anymore. What\'s scarce is a real person, saying real things, on camera, week after week.','That\'s why every video in your Terminal is you, not a brand voice. Your face is the one asset no competitor can copy.'],use:'Every script is written in your words, and Claude never invents facts. Anything it doesn\'t know is marked FILL.'},
 {n:'02',t:'Trust over virality',s:'Depth beats a lucky spike.',b:['A viral video brings strangers. Trust turns them into people who buy, apply, invest, and tell their friends.','So you balance width (videos that reach new people) with depth (videos that make people trust you). Reach without trust is noise. Trust without reach is a secret.'],use:'Insights tracks saves, shares, and questions, not just views, and the four pillars keep width and depth in balance.'},
 {n:'03',t:'Give the real answers away',s:'Generosity is proof you know your stuff.',b:['The fastest way to show you\'re good at something is to teach it for free. People don\'t worry you\'re giving away the secret. They think, "if this is free, imagine working with them."','Problem plus solution, every time: name a real problem your audience has, then solve it on camera.'],use:'Teach videos and "What people are asking" in Insights turn real questions into scripts.'},
 {n:'04',t:'Be known for one thing',s:'One core association.',b:['People can only remember one thing about you. Pick it on purpose, then repeat it until it\'s yours.','For you that\'s: you earn your spot by proving it. Every video, from hackathons to hiring advice, points back to it.'],use:'The "Known for" line at the top of this page steers every script Claude writes.'},
 {n:'05',t:'Borrow the wrapper, keep the story',s:'Trending formats, your substance.',b:['The format can come from anywhere: a POV trend, a green-screen take, a day-in-the-life. What goes inside has to be yours.','Borrowing wrappers from outside your niche gets you reach without sounding like everyone else in it.'],use:'The Library\'s trending templates give you the wrapper; the Studio fills it with your stories.'},
 {n:'06',t:'One idea, every length',s:'Accordion it.',b:['A good idea isn\'t one video. It\'s a 1-minute cut, a 2-minute story, a 3-minute deep dive, and a LinkedIn post.','Stretch the same idea across lengths and platforms, and each version reaches someone the others didn\'t.'],use:'Every script comes in 1, 2, and 3 minute versions, and Post writes a caption for each platform.'},
 {n:'07',t:'Fail in public',s:'Proof beats promises.',b:['People don\'t trust the person who never shows a mistake. They trust the person who shows the work, including the parts that go wrong.','Building in public turns every setback into content and every win into proof.'],use:'Show videos, the story interview, and the delivery coach make it easy to post the real thing, not the polished version.'},
 {n:'08',t:'Show up like clockwork',s:'Consistency compounds.',b:['Trust is built by repetition. Ten honest videos beat one perfect one, because people need to see you again and again before they believe you.','That\'s why your Terminal is built around one hour a week, every week, not a big content sprint you can\'t keep up.'],use:'Your weekly hour, the posting rhythm in Post, and auto-scheduling keep you consistent without thinking about it.'}
];
var LADDER=[['Stranger','sees you for the first time','entertain'],['Knows you','remembers your face','entertain'],['Learns from you','gets real value','teach'],['Believes you','sees the proof','show'],['Shares your why','backs the vision','believe'],['Chooses you','joins, buys, invests','believe']];
function openWhy(i){var w=WHY[i];document.getElementById('modal-body').innerHTML='<span class="tag blue" style="justify-self:start">Principle '+w.n+'</span><h2 id="modal-t">'+esc(w.t)+'</h2>'+w.b.map(function(p){return '<p>'+esc(p)+'</p>'}).join('')+'<div class="sdet"><b style="font-size:13px">In your Terminal</b><span class="muted">'+esc(w.use)+'</span></div><div class="row between"><button class="btn sm plain" type="button" data-why="'+((i+WHY.length-1)%WHY.length)+'">‹ Previous</button><button class="btn sm" type="button" data-why="'+((i+1)%WHY.length)+'">Next principle ›</button></div>';
  modal.hidden=false;modal.querySelectorAll('[data-why]').forEach(function(b){b.onclick=function(){openWhy(+b.getAttribute('data-why'))}});document.getElementById('modal-x').focus()}
function brandTeach(){var isS=/sandlot/i.test(S.co.company);
  return '<div class="sec-h"><div><h2>Why you\'re doing this</h2><p>The thinking behind every video. Trust in the face behind the brand is the whole game.</p></div></div>'+
  '<section class="glass pad stack" style="gap:16px"><div class="row between"><div><h3>How a stranger becomes a believer</h3><p class="muted" style="font-size:14px;margin-top:4px">Each kind of video moves people one step up. Skip a step and they don\'t trust you yet.</p></div><button class="btn sm plain" type="button" data-lesson="3">The research ›</button></div>'+
   '<ol class="ladder">'+LADDER.map(function(l,i){return '<li style="--pc:'+PC[l[2]]+'"><span class="st">'+(i+1)+'</span><b>'+l[0]+'</b><span>'+l[1]+'</span><em><span class="dot d-'+l[2]+'"></span>'+PILL[l[2]]+'</em></li>'}).join('')+'</ol></section>'+
  '<section class="glass pad why-you" style="margin-top:14px"><div class="stack" style="gap:8px"><span class="tag blue" style="justify-self:start">Why '+esc(coName())+' needs a face</span>'+(isS?'<p class="title" style="font-size:22px">Students bet their time, founders bet their company, investors bet their money. All three are betting on people.</p><p class="muted" style="font-size:14.5px">A new marketplace has a cold-start problem: nobody joins until they trust somebody\'s already there. When students and founders see you, AJ, Sam, and Wyatt building it in public every week, Sandlot stops being "another app" and becomes four people they know and believe in.</p>':'<p class="title" style="font-size:22px">People buy from people they trust.</p><p class="muted" style="font-size:14.5px">Your customers already compare you to cheaper options and to AI-made ads. The one thing nobody else can offer is you.</p>')+'</div></section>'+
  '<div class="g4 why-grid" style="margin-top:14px">'+WHY.map(function(w,i){return '<button type="button" class="glass learn" data-whyo="'+i+'"><span class="big" style="font-size:24px">'+w.n+'</span><b>'+esc(w.t)+'</b><span>'+esc(w.s)+'</span><span class="more">Read ›</span></button>'}).join('')+'</div>';
}

/* ---------- studio ---------- */
var CHATQ=[
 {q:'Let\'s find a story only you can tell. What kind of story is it?',chips:['How it all started','A mistake that taught me something','A customer I\'ll never forget','Why I care about this','A hard week']},
 {q:'Take me there. Where were you, and what was happening?',chips:['It was late at night…','We were at a hackathon…','I was in class when…']},
 {q:'What was at stake, or what went wrong?',chips:['We almost quit','Nobody believed us','I was out of my depth']},
 {q:'What changed? What did you do next?',chips:['We kept going anyway','I asked for help','We changed everything']},
 {q:'Last one. What should people take from it?',chips:['Start before you\'re ready','Proof beats promises','Your circle decides your ceiling']}];
var CH_PILLAR={'How it all started':'believe','A mistake that taught me something':'teach','A customer I\'ll never forget':'show','Why I care about this':'believe','A hard week':'show'};
if(!S.chat)S.chat={step:0,log:[],ans:[],done:null};
function chatReset(){S.chat={step:0,log:[{w:'ai',t:'Hi '+firstName()+'. I\'m going to ask you five quick questions, the way a friend would. Answer however it comes out, messy is fine. I\'ll turn it into a script with a hook, hook loops, and an ending.'},{w:'ai',t:CHATQ[0].q}],ans:[],done:null}}
if(!S.chat.log.length)chatReset();
function chatHTML(){
  var C=S.chat,step=C.step,chips=!C.done&&step<CHATQ.length?CHATQ[step].chips:[];
  var log=C.log.map(function(m){if(m.w==='card'){var c=cat(m.id);if(!c)return '';var sc=compose(c,0,S.len,S.end,S.seed),T=timed(sc,sc.hooks[0]);
      return '<div class="msg ai result"><span class="tag good" style="justify-self:start">Script ready</span><p class="title">'+esc(c.name)+'</p><div class="metaline"><span class="dot d-'+c.pillar+'"></span>'+PILL[c.pillar]+'<span>·</span><span class="tnum">'+mmss(T.secs)+'</span><span>·</span>'+T.loops+' hook loops<span>·</span>3 variations</div><div><h3 style="margin-bottom:6px">Hooks I wrote</h3><ol>'+c.hooks[0].map(function(h){return '<li>'+esc(h)+'</li>'}).join('')+'</ol></div><div class="row"><button class="btn primary sm" type="button" data-openc="'+c.id+'">Open the script</button><button class="btn sm" type="button" id="ch-more">Add more detail</button><button class="btn sm plain" type="button" id="ch-new">Tell another story</button></div></div>'}
    return '<div class="msg '+(m.w==='me'?'me':'ai')+'">'+esc(m.t)+'</div>'}).join('');
  return '<section class="glass chat" aria-label="Tell your story to Claude"><div class="chat-head"><span class="av">C</span><div><b>Tell your story</b><span>Claude interviews you, then writes it in your words. Nothing made up.</span></div><span style="margin-left:auto" class="tag">'+(C.done?'Done':'Question '+Math.min(step+1,5)+' of 5')+'</span></div>'+
   '<div class="chat-log" id="chat-log">'+log+'</div>'+
   '<div class="chat-foot">'+(chips.length?'<div class="chipsb">'+chips.map(function(c){return '<button class="chipb" type="button" data-chip="'+esc(c)+'">'+esc(c)+'</button>'}).join('')+'</div>':'')+
   '<form class="composer" id="ch-form"><label class="icb" for="ch-file" title="Import notes or a transcript" aria-label="Import notes or a transcript"><svg viewBox="0 0 24 24"><path d="M20 12l-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7"/></svg></label><input type="file" id="ch-file" accept=".txt,.md,text/plain" hidden>'+
   '<button class="icb" type="button" id="ch-mic" aria-label="Talk instead"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>'+
   '<textarea id="ch-in" rows="1" placeholder="'+(C.done?'Add a detail, or ask for a change…':'Type your answer, or paste a whole story…')+'" aria-label="Your answer"></textarea><button class="icb send" type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form></div></section>';
}
function pillStrip(active){return '<div class="pillstrip" aria-label="The four pillars">'+Object.keys(PINFO).map(function(k){return '<button type="button" data-pgo="'+k+'" class="'+(active===k?'on':'')+'" style="--pc:'+PC[k]+'"><b><span class="dot d-'+k+'"></span>'+PILL[k]+'</b><span>'+PINFO[k].trust+'</span></button>'}).join('')+'</div>'}
function bankEmptyHTML(){return '<section class="glass" style="padding:28px;display:grid;gap:12px;max-width:640px"><span class="tag blue" style="justify-self:start">Studio</span><h1 style="font-size:28px">Your story bank is empty</h1><p class="muted">Claude reads your answers'+(BOOT&&BOOT.hasBrief?' and your Brand Brief':'')+' and writes the stories you can tell on camera, each with hooks and three angles. Nothing gets made up: anything it doesn\'t know is marked FILL.</p><div class="row"><button class="btn primary" id="bank-go" type="button">Write my story bank</button><button class="btn plain" id="bank-own" type="button">Tell my own story first</button></div><p class="muted" id="bank-msg" style="font-size:13px"></p></section>'}
function bindBankEmpty(){var g=document.getElementById('bank-go'),m=document.getElementById('bank-msg');if(!g)return;
  g.onclick=function(){g.disabled=true;g.textContent='Writing… about a minute';m.textContent='';buildBank().then(function(){toast('Story bank ready');render()},function(e){g.disabled=false;g.textContent='Write my story bank';m.textContent=e.message})};
  document.getElementById('bank-own').onclick=function(){S.ownOpen=true;if(!S.chat)chatReset();render()}}
V.studio=function(){
  if(LIVE&&!allCats().length&&!S.ownOpen)return bankEmptyHTML();
  var c=cat(S.cat),sc=compose(c,S.angle,S.len,S.end,S.seed),hook=sc.hooks[S.hookSel]||sc.hooks[0],T=timed(sc,hook);
  var vars=[0,1,2].map(function(a){var s=compose(c,a,S.len,S.end,S.seed);return timed(s,s.hooks[0]).secs});
  var key=c.id+'|'+S.angle+'|'+S.len+'|'+S.end+'|'+S.seed+'|'+S.hookSel,appr=!!S.approvedIds[key];
  var endName=ENDS.filter(function(e){return e.id===S.end})[0].name;
  var tiles='<button class="tile story'+(S.ownOpen?' on':'')+'" id="own-btn" type="button"><b><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z"/></svg>Tell your story</b><span>Claude interviews you and writes it in your words. Start here: real stories are what make people trust you.</span></button>'+
    allCats().map(function(x){return '<button class="tile'+(x.id===S.cat&&!S.ownOpen?' on':'')+'" data-cat="'+x.id+'" type="button"><b><span class="dot d-'+x.pillar+'"></span>'+esc(x.name)+'</b><span>'+esc(x.desc)+'</span></button>'}).join('');
  var out=S.ownOpen?chatHTML():
   '<div class="vt"><div class="seg lg" id="angles" role="tablist"><span class="thumb"></span>'+ANGLES.map(function(a,i){return '<button type="button" role="tab" data-angle="'+i+'" class="'+(S.angle===i?'on':'')+'">'+a+' <span class="faint tnum">'+mmss(vars[i])+'</span></button>'}).join('')+'</div><span class="tag">3 variations</span></div>'+
   fmtBanner()+'<article class="glass doc" id="doc"><div class="stack" style="gap:8px"><div class="metaline"><span class="dot d-'+sc.pillar+'"></span>'+PILL[sc.pillar]+' · '+esc(c.name)+'<span>·</span><span class="tnum">'+mmss(T.secs)+'</span><span>·</span><span class="tnum">'+T.words+' words</span><span>·</span><span>'+T.loops+' hook loops</span>'+(appr?'<span class="tag good">Approved</span>':'')+'</div><p class="title">'+esc(sc.title)+'</p>'+
    '<div class="loopmap" role="img" aria-label="Where the hook loops land in the script">'+T.lines.map(function(l,i){var next=T.lines[i+1],w=((next?next.at:T.secs)-l.at)/T.secs*100;return '<i class="'+(l.type==='hook'?'h':l.type==='loop'?'l':l.type==='end'?'e':'')+'" style="width:'+Math.max(1.2,w).toFixed(2)+'%"></i>'}).join('')+'</div></div>'+
    '<div class="stack" style="gap:8px"><h3>Pick a hook</h3><div class="hooks">'+sc.hooks.map(function(h,i){return '<label class="hookopt'+(i===S.hookSel?' on':'')+'"><input type="radio" name="hk" data-hook="'+i+'"'+(i===S.hookSel?' checked':'')+'><span>'+esc(h)+'</span></label>'}).join('')+'</div></div>'+
    '<div class="lines">'+T.lines.map(function(l){var k=l.type==='hook'?'<span class="k">Hook</span>':l.type==='loop'?'<span class="k">'+LOOPIC+'Hook loop</span>':l.type==='end'?'<span class="k">Ending · '+endName+'</span>':'';return '<div class="ln '+l.type+'"><span class="t">'+mmss(l.at)+'</span><div class="x">'+k+(k?'<br>':'')+fills(l.text)+'</div></div>'}).join('')+'</div>'+
    '<div class="docfoot"><div class="row">'+(appr?'<button class="btn good" type="button" disabled>Approved</button>':'<button class="btn primary" id="approve" type="button">Approve</button>')+'<button class="btn" id="read" type="button">Read it</button><button class="btn plain" id="copy" type="button">Copy</button></div>'+
    '<form class="note" id="note"><input class="input" id="note-in" placeholder="Tell Claude what to change: shorter, funnier, more personal…" aria-label="Tell Claude what to change"><button class="btn sm" type="submit">Rewrite</button></form></div></article>';
  return '<div class="head"><div><h1>Script Studio</h1><p class="lead">Start with a real story, or pick a topic. Claude writes three versions in your voice, with hook loops built in.</p></div><button class="btn sm plain" type="button" data-lesson="3">What are the four pillars? ›</button></div>'+
  pillStrip(S.ownOpen?null:c.pillar)+
  '<div class="studio"><aside class="glass pad setup" aria-label="Script settings">'+
   '<div class="sect"><h3>Talk about</h3><div class="tiles">'+tiles+'</div></div>'+
   '<div class="sect"><h3>Length</h3><div class="seg full" id="len"><span class="thumb"></span>'+[1,2,3].map(function(n){return '<button type="button" data-len="'+n+'" class="'+(S.len===n?'on':'')+'">'+n+' min</button>'}).join('')+'</div></div>'+
   '<div class="sect"><h3>End with</h3><div class="ends">'+ENDS.map(function(e){return '<button class="end'+(S.end===e.id?' on':'')+'" data-end="'+e.id+'" type="button">'+e.name+'</button>'}).join('')+'</div>'+
    (S.end==='offer'?'<input class="input" id="offer" value="'+esc(S.offer)+'" aria-label="Your offer">':'')+'</div>'+
   (S.ownOpen?'':'<button class="btn primary" id="regen" type="button" style="width:100%">Write new variations</button>')+
  '</aside><section class="out">'+out+'</section></div>';
};
function chatAsk(next){var C=S.chat,log=document.getElementById('chat-log');if(log){log.insertAdjacentHTML('beforeend','<div class="msg ai typing" id="typing"><i></i><i></i><i></i></div>');log.scrollTop=log.scrollHeight}
  setTimeout(function(){next();render();var l=document.getElementById('chat-log');if(l)l.scrollTop=l.scrollHeight;var i=document.getElementById('ch-in');if(i&&matchMedia('(pointer:fine)').matches)i.focus({preventScroll:true})},reduce?50:800)}
function chatSend(t){t=t.trim();if(!t)return;var C=S.chat;C.log.push({w:'me',t:t});
  if(C.done){var c=cat(C.done);c.beats.splice(Math.min(3,c.beats.length-1),0,t);chatAsk(function(){C.log.push({w:'ai',t:'Added that to the story. The script now includes it, so open it again to see the new version.'})});return}
  if(C.step===0&&words(t)>60){C.ans=[t];C.step=5;return chatAsk(chatFinish)}
  C.ans[C.step]=t;C.step++;
  if(C.step<CHATQ.length){var acks=['Love that.','Got it. Keep going.','That\'s the good stuff.','Okay, this is a real story.'];chatAsk(function(){C.log.push({w:'ai',t:acks[(C.step-1)%acks.length]+' '+CHATQ[C.step].q})})}
  else chatAsk(chatFinish);
}
function chatFinish(){var C=S.chat,kind=C.ans[0]||'Your story',body=C.ans.length>1?C.ans.slice(1).map(function(a){return /[.!?…]$/.test(a)?a:a+'.'}).join(' '):C.ans[0];
  var name=CH_PILLAR[kind]?kind:(words(kind)>8?'Your story':kind);
  var nc=customCat(name,body);
  if(C.ans.length>=5){var tk=C.ans[4].replace(/[.!?…]+$/,'');nc.beats=[C.ans[1],C.ans[2],C.ans[3],'And here\'s the part I don\'t usually say: [FILL: how it felt, or what almost happened].','That changed how I run '+coName()+'.','So here\'s what I want you to take from it: '+tk.charAt(0).toLowerCase()+tk.slice(1)+'.'].map(function(b){return /[.!?…\]]$/.test(b)?b:b+'.'})
    var fs=function(t){var w=String(t).split(/(?<=[.!?])\s/)[0].split(' ');return w.length<=14?w.join(' ').replace(/[^.!?…]$/,'$&.'):w.slice(0,12).join(' ')+'…'},T2=fs(C.ans[2]),TK=tk.charAt(0).toUpperCase()+tk.slice(1)+'.';
    nc.hooks=[[T2,'I\'ve never told this story on camera.','This is the real story behind '+coName()+'.'],['Here\'s what '+kind.charAt(0).toLowerCase()+kind.slice(1)+' taught me.','One story that explains everything about '+coName()+'.',T2],[TK,'Nobody talks about this part of building a company.',T2]];
    nc.titles=[name,name+': what I learned',TK.replace(/\.$/,'')];}nc.pillar=CH_PILLAR[kind]||'believe';nc.desc='Your story, from the interview';S.custom.push(nc);C.done=nc.id;C.step=5;
  C.log.push({w:'ai',t:'Here\'s your script. I kept your words, added a hook, '+(S.len===1?'one':S.len===2?'three':'five')+' hook loop'+(S.len===1?'':'s')+', and the ending you picked. Anything I didn\'t know is marked FILL so nothing gets made up.'});C.log.push({w:'card',id:nc.id});}
if(LIVE){var chatFinishLocal=chatFinish;chatFinish=function(){chatFinishLocal();var C=S.chat,id=C.done,nc=S.custom.filter(function(x){return x.id===id})[0];if(!nc)return;
  var title=nc.name,transcript=C.ans.join('\n');toast('Claude is polishing your story…');
  saveNow().then(function(){return api('/api/terminal/story',{businessId:BOOT.businessId,title:title,transcript:transcript})}).then(function(d){
    var k=S.custom.indexOf(nc);if(k<0)return;var c=d.category;c.id=id;c.custom=true;c.desc=c.desc||'Your story, from the interview';S.custom[k]=c;saveState();toast('Your story is ready');if(route()==='studio')render()
  },function(e){toast(e.message)})}}
V.studio.after=function(){
  if(LIVE&&!allCats().length&&!S.ownOpen){bindBankEmpty();return}
  var c=cat(S.cat),sc=compose(c,S.angle,S.len,S.end,S.seed),hook=sc.hooks[S.hookSel]||sc.hooks[0];
  var q=function(id){return document.getElementById(id)};
  bindPillGo();document.querySelectorAll('[data-lesson]').forEach(function(b){b.onclick=function(){openLesson(+b.getAttribute('data-lesson'))}});
  document.querySelectorAll('[data-len]').forEach(function(b){b.onclick=function(){var n=+b.getAttribute('data-len');if(n===S.len)return;S.len=n;S.ownOpen?render():(document.querySelectorAll('[data-len]').forEach(function(x){x.classList.toggle('on',x===b)}),syncThumbs(),busy(function(){}))}});
  document.querySelectorAll('[data-end]').forEach(function(b){b.onclick=function(){S.end=b.getAttribute('data-end');S.ownOpen?render():busy(function(){})}});
  var off=q('offer');if(off)off.onchange=function(){S.offer=off.value.trim();render()};
  function busy(fn){var d=q('doc');if(!d){fn();render();return}d.classList.add('busy');setTimeout(function(){fn();render()},reduce?60:650)}
  document.querySelectorAll('[data-cat]').forEach(function(b){b.onclick=function(){S.ownOpen=false;S.hookSel=0;busy(function(){S.cat=b.getAttribute('data-cat')})}});
  q('own-btn').onclick=function(){S.ownOpen=true;render();var l=q('chat-log');if(l)l.scrollTop=l.scrollHeight};
  if(S.ownOpen){
    var log=q('chat-log');log.scrollTop=log.scrollHeight;
    var inp=q('ch-in');inp.oninput=function(){inp.style.height='auto';inp.style.height=Math.min(140,inp.scrollHeight)+'px'};
    inp.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();q('ch-form').requestSubmit()}};
    q('ch-form').onsubmit=function(e){e.preventDefault();var v=inp.value;inp.value='';chatSend(v)};
    document.querySelectorAll('[data-chip]').forEach(function(b){b.onclick=function(){var v=b.getAttribute('data-chip');if(S.chat.step===0)chatSend(v);else{inp.value=v+' ';inp.focus();inp.setSelectionRange(inp.value.length,inp.value.length)}}});
    q('ch-mic').onclick=function(){toast('In the real Terminal you talk, and Claude transcribes as you go.')};
    q('ch-file').onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var t=String(r.result).slice(0,8000);chatSend(t);toast('Imported '+f.name)};r.readAsText(f)};
    document.querySelectorAll('[data-openc]').forEach(function(b){b.onclick=function(){S.cat=b.getAttribute('data-openc');S.ownOpen=false;S.angle=0;S.hookSel=0;render();window.scrollTo(0,0)}});
    var nw=q('ch-new');if(nw)nw.onclick=function(){chatReset();render()};
    var mr=q('ch-more');if(mr)mr.onclick=function(){inp.focus();inp.placeholder='What else happened? A name, a number, a detail…'};
    return;
  }
  document.querySelectorAll('[data-angle]').forEach(function(b){b.onclick=function(){S.angle=+b.getAttribute('data-angle');S.hookSel=0;document.querySelectorAll('[data-angle]').forEach(function(x){x.classList.toggle('on',x===b)});syncThumbs();busy(function(){})}});
  document.querySelectorAll('[data-hook]').forEach(function(r){r.onchange=function(){S.hookSel=+r.getAttribute('data-hook');render()}});
  var fc=q('fmt-clear');if(fc)fc.onclick=function(){S.format=null;render()};
  q('regen').onclick=function(){S.seed++;S.hookSel=0;busy(function(){});toast('Three new variations')};
  var ap=q('approve');if(ap)ap.onclick=function(){var T=timed(sc,hook);S.approvedIds[c.id+'|'+S.angle+'|'+S.len+'|'+S.end+'|'+S.seed+'|'+S.hookSel]=1;S.approved.push({title:sc.title,pillar:sc.pillar,secs:T.secs,hook:hook,scene:S.format?fmt(S.format).scene:null,text:sc.items.map(function(i){return i.text}).join('\n\n')});toast('Approved. Added to Thursday\'s shoot.');render()};
  q('read').onclick=function(){openPrompter(sc.title,PILL[sc.pillar]+' · '+mmss(timed(sc,hook).secs),scriptText(sc,hook))};
  q('copy').onclick=function(){var t=scriptText(sc,hook);try{navigator.clipboard.writeText(t).then(function(){toast('Copied')},function(){toast('Copy isn\'t allowed here')})}catch(e){toast('Copy isn\'t allowed here')}};
  q('note').onsubmit=function(e){e.preventDefault();var v=q('note-in').value.trim();if(!v){q('note-in').focus();return}
    busy(function(){if(/short/i.test(v)&&S.len>1)S.len--;else if(/long/i.test(v)&&S.len<3)S.len++;else S.seed++;S.hookSel=0});toast('Rewriting: "'+v.slice(0,36)+'"')};
};

var pr=document.getElementById('prompter'),prText=document.getElementById('pr-text'),prY=0,prPlay=true,prRaf=null,prLast=0;
function openPrompter(title,meta,text){
  document.getElementById('pr-title').textContent=title;document.getElementById('pr-meta').textContent=meta;prText.textContent=text;
  pr.hidden=false;prY=0;prPlay=!reduce;document.getElementById('pr-play').textContent=prPlay?'Pause':'Play';prLast=0;prRaf=requestAnimationFrame(prTick);document.getElementById('pr-close').focus();
}
function prTick(t){var dt=prLast?(t-prLast)/1000:0;prLast=t;if(prPlay)prY+=dt*(+document.getElementById('pr-speed').value);prText.style.transform='translate(-50%,-'+(prY+pr.querySelector('.read').clientHeight*.62)+'px)';if(!pr.hidden)prRaf=requestAnimationFrame(prTick)}
document.getElementById('pr-play').onclick=function(){prPlay=!prPlay;this.textContent=prPlay?'Pause':'Play'};
document.getElementById('pr-restart').onclick=function(){prY=0};
document.getElementById('pr-close').onclick=function(){pr.hidden=true;cancelAnimationFrame(prRaf)};
document.addEventListener('keydown',function(e){if(pr.hidden)return;if(e.key==='Escape')document.getElementById('pr-close').click();if(e.key===' '){e.preventDefault();document.getElementById('pr-play').click()}});
/* ---------- insights ---------- */
if(!S.range)S.range=7;if(!S.recsDone)S.recsDone={};
var VIDS=[['We won Startup Cincy','believe',64,6200,58,41,'win'],['Sandlot is in TestFlight','show',52,4100,51,29,'keep'],['How to get hired by a startup with no experience','teach',118,3600,47,38,'win'],['Why we named it Sandlot','believe',66,2300,44,17,'keep'],['A day as a student CEO','entertain',171,1500,31,6,'change'],['The Midwest isn\'t missing talent','believe',71,700,39,12,'new']];
var QS=[['Do founders actually pay students on Sandlot?','Asked 5 times · Instagram','teach'],['Which schools are you launching at first?','Asked 4 times · TikTok and Instagram','show'],['How did you find your cofounders?','Asked 3 times · LinkedIn','believe'],['Can I post a problem if I\'m not a startup?','Asked 2 times · LinkedIn','teach']];
var RECS=[['Write 2 more Contrarian hooks','Contrarian hooks held 68% of viewers past 3 seconds, the best of any angle.'],['Answer "Do founders actually pay students?" on camera','Your most-asked question. A straight answer builds trust with both audiences.'],['Cut 3-minute videos to 2 on TikTok','Viewers there drop off after 1:40. Keep the 3-minute cut for YouTube.'],['Post Believe videos to LinkedIn on Tuesday mornings','Founders and investors engage most then, and Believe gets the most saves.']];
V.insights=function(){
  var f={7:1,28:3.7,90:10.4}[S.range],fmtN=function(n){n=n*f;return n>=1000?(n/1000).toFixed(n>=10000?0:1)+'K':Math.round(n)};
  var K=[['views',fmtN(18400),'Views','+32%',[2.1,2.4,2.2,3,3.6,3.3,4.8,5.9,6.4,8.7,11.2,14,18.4]],['watched','46%','Average watched','+5 pts',[34,36,35,38,40,39,41,43,42,44,45,46]],['trust','21','Saves and shares per 1K','+6',[9,10,12,11,13,15,14,17,18,19,20,21]],['followers',fmtN(312),'New followers','+18%',[80,96,90,140,150,170,210,190,240,260,300,312]],['questions',fmtN(14),'People asking questions','+9',[1,2,2,3,4,3,5,7,6,9,11,14]],['signups',fmtN(37),'Waitlist sign-ups','+12',[3,4,6,5,8,11,10,14,18,22,29,37]]];
  var wk=[2.1,2.4,2.2,3.0,3.6,3.3,4.8,5.9,6.4,8.7,11.2,14.0,18.4],W=600,H=230,pad=36,mx=20;
  var x=function(i){return pad+i*(W-pad-12)/(wk.length-1)},y=function(v){return H-26-(v/mx)*(H-48)};
  var line=wk.map(function(v,i){return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1)}).join(' ');
  var grid=[0,5,10,15,20].map(function(v){return '<line x1="'+pad+'" x2="'+(W-12)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="var(--line)"/><text x="'+(pad-8)+'" y="'+(y(v)+4)+'" text-anchor="end" font-size="11" fill="var(--faint)">'+v+'K</text>'}).join('');
  var lab=wk.map(function(_,i){return i%3===0||i===wk.length-1?'<text x="'+x(i)+'" y="'+(H-6)+'" text-anchor="middle" font-size="11" fill="var(--faint)">W'+(i+1)+'</text>':''}).join('');
  var plat=[['ig',8.1,'+140'],['tt',5.2,'+96'],['yt',2.9,'+41'],['li',2.2,'+35']];
  var heat=[[1,4,3,2],[2,5,4,2],[2,4,3,3],[1,5,3,2],[1,3,2,1],[0,2,2,3],[0,2,3,2]],hd=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],ht=['7 AM','12 PM','5 PM','9 PM'];
  var verdict={win:['Winner','good'],keep:['Keep going',''],change:['Change it','warn'],new:['Too early','blue']};
  var hooksP=[['Contrarian',68],['Story-led',61],['Straight answer',54]];
  return '<div class="head"><div><h1>Insights</h1><p class="lead">What\'s working feeds straight back into next week\'s scripts. Tap anything to see more.</p></div><div class="row"><div class="seg" id="range"><span class="thumb"></span>'+[[7,'7 days'],[28,'28 days'],[90,'90 days']].map(function(r){return '<button type="button" data-range="'+r[0]+'" class="'+(S.range===r[0]?'on':'')+'">'+r[1]+'</button>'}).join('')+'</div><span class="tag warn">Example numbers</span></div></div>'+
  '<div class="kpis">'+K.map(function(k){return '<a class="glass press" href="#insights/'+(k[0]==='watched'?'videos':k[0]==='signups'?'next':k[0])+'"><b>'+k[1]+'</b><span>'+k[2]+'</span><br><em>'+k[3]+'</em>'+spark(k[4])+'</a>'}).join('')+'</div>'+
  '<div class="g2 w" style="margin-top:14px"><section class="glass pad chart" id="ins-views"><div class="row between" style="margin-bottom:10px"><h2>Weekly views</h2><span class="faint" style="font-size:12.5px">All platforms</span></div><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Weekly views rising from 2.1K to 18.4K over 13 weeks">'+grid+'<path d="'+line+' L'+x(wk.length-1)+' '+y(0)+' L'+x(0)+' '+y(0)+' Z" fill="var(--blue-soft)"/><path d="'+line+'" fill="none" stroke="var(--blue)" stroke-width="2.5" stroke-linejoin="round"/><circle cx="'+x(wk.length-1)+'" cy="'+y(wk[wk.length-1])+'" r="5" fill="var(--blue)"/>'+lab+'</svg></section>'+
   '<section class="glass pad" id="ins-followers"><h2 style="margin-bottom:4px">By platform</h2><p class="faint" style="font-size:12.5px;margin-bottom:14px">Views this week, and new followers</p><div class="hb">'+plat.map(function(p){return '<div class="hbr" style="grid-template-columns:110px minmax(0,1fr) 44px"><span class="row" style="gap:8px;flex-wrap:nowrap"><span class="plat '+p[0]+'">'+PLAT[p[0]]+'</span>'+PLATN[p[0]].split(' ')[0]+'</span><span class="tr"><i style="width:'+(p[1]/8.1*100)+'%;background:var(--blue)"></i></span><b>'+p[1]+'K</b></div>'}).join('')+'</div><div class="chips" style="margin-top:14px">'+plat.map(function(p){return '<span class="tag">'+PLATN[p[0]].split(' ')[0]+' '+p[2]+' followers</span>'}).join('')+'</div></section></div>'+
  '<section class="glass pad" id="ins-videos" style="margin-top:14px"><div class="row between" style="margin-bottom:6px"><h2>Every video</h2><span class="faint" style="font-size:12.5px">Sorted by views</span></div><div class="scroll-x"><table class="table"><thead><tr><th>Video</th><th>Pillar</th><th>Length</th><th>Views</th><th>Watched</th><th>Saves</th><th>Verdict</th></tr></thead><tbody>'+
   VIDS.map(function(v){var vd=verdict[v[6]];return '<tr class="vt-row"><td><b>'+esc(v[0])+'</b></td><td><span class="dot d-'+v[1]+'"></span> '+PILL[v[1]]+'</td><td class="tnum">'+mmss(v[2])+'</td><td class="tnum">'+(v[3]/1000).toFixed(1)+'K</td><td class="tnum">'+v[4]+'%</td><td class="tnum">'+v[5]+'</td><td><span class="tag '+vd[1]+'">'+vd[0]+'</span></td></tr>'}).join('')+'</tbody></table></div></section>'+
  '<div class="g3" style="margin-top:14px"><section class="glass pad" id="ins-trust"><h2 style="margin-bottom:4px">Trust by pillar</h2><p class="faint" style="font-size:12.5px;margin-bottom:14px">Saves and shares per 1K views</p><div class="hb">'+[['teach',24],['show',29],['believe',33],['entertain',12]].map(function(p){return '<div class="hbr"><span>'+PILL[p[0]]+'</span><span class="tr"><i style="width:'+(p[1]/35*100)+'%;background:'+PC[p[0]]+'"></i></span><b>'+p[1]+'</b></div>'}).join('')+'</div><p class="faint" style="font-size:12.5px;margin-top:12px">Believe earns the most trust. Entertain brings the most new viewers.</p></section>'+
   '<section class="glass pad" id="ins-hooks"><h2 style="margin-bottom:4px">Hooks</h2><p class="faint" style="font-size:12.5px;margin-bottom:14px">Still watching after 3 seconds</p><div class="hb">'+hooksP.map(function(h){return '<div class="hbr" style="grid-template-columns:110px minmax(0,1fr) 40px"><span>'+h[0]+'</span><span class="tr"><i style="width:'+h[1]+'%;background:var(--blue)"></i></span><b>'+h[1]+'%</b></div>'}).join('')+'</div><p class="faint" style="font-size:12.5px;margin-top:12px">Best hook: "Four of us had never built anything together. Then we had 8 hours."</p></section>'+
   '<section class="glass pad"><h2 style="margin-bottom:12px">Watched to the end</h2><div class="hb">'+[['1 min',58],['2 min',49],['3 min',41]].map(function(l){return '<div class="hbr"><span>'+l[0]+'</span><span class="tr"><i style="width:'+l[1]+'%;background:var(--blue)"></i></span><b>'+l[1]+'%</b></div>'}).join('')+'</div><p class="faint" style="font-size:12.5px;margin-top:12px">With hook loops, 3-minute videos stay above 40%. Without them: 27%.</p></section></div>'+
  '<div class="g2" style="margin-top:14px"><section class="glass pad" id="ins-questions"><div class="row between" style="margin-bottom:12px"><h2>What people are asking</h2><span class="faint" style="font-size:12.5px">From comments and DMs</span></div><div class="qlist">'+QS.map(function(x,i){return '<div><span><b>'+esc(x[0])+'</b><small>'+x[1]+'</small></span><button class="btn sm" type="button" data-qs="'+i+'">Answer on camera</button></div>'}).join('')+'</div></section>'+
   '<section class="glass pad" id="ins-times"><h2 style="margin-bottom:4px">Best times to post</h2><p class="faint" style="font-size:12.5px;margin-bottom:14px">Darker means more of your audience is watching</p><div class="heat"><span></span>'+hd.map(function(d){return '<span>'+d+'</span>'}).join('')+ht.map(function(t,ti){return '<span>'+t+'</span>'+hd.map(function(d,di){var v=heat[di][ti];return '<i style="opacity:'+(.12+v*.18)+'" title="'+d+' '+t+'"></i>'}).join('')}).join('')+'</div><p class="faint" style="font-size:12.5px;margin-top:12px">Your best slot: Tuesday at noon. Your posts are already scheduled there.</p></section></div>'+
  '<div class="g2" style="margin-top:14px"><section class="glass pad" id="ins-audience"><h2 style="margin-bottom:12px">Who\'s watching</h2><div class="hb">'+[['Students',54],['Founders',21],['Investors',8],['Everyone else',17]].map(function(a){return '<div class="hbr" style="grid-template-columns:100px minmax(0,1fr) 40px"><span>'+a[0]+'</span><span class="tr"><i style="width:'+a[1]+'%;background:var(--blue)"></i></span><b>'+a[1]+'%</b></div>'}).join('')+'</div><div class="chips" style="margin-top:14px">'+['Columbus','Cincinnati','Oxford, OH','Cleveland','Chicago'].map(function(c){return '<span class="tag">'+c+'</span>'}).join('')+'</div></section>'+
   '<section class="glass pad" id="ins-next"><div class="row between" style="margin-bottom:12px"><h2>What Claude will change next week</h2></div><div class="recs">'+RECS.map(function(r,i){var d=S.recsDone[i];return '<div class="rec"><div><b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span></div><button class="btn sm'+(d?' good':' primary')+'" type="button" data-rec="'+i+'">'+(d?'✓ Applied':'Apply')+'</button></div>'}).join('')+'</div></section></div>';
};
V.insights.after=function(){
  document.querySelectorAll('[data-range]').forEach(function(b){b.onclick=function(){S.range=+b.getAttribute('data-range');var y=window.scrollY;render();window.scrollTo(0,y)}});
  document.querySelectorAll('[data-rec]').forEach(function(b){b.onclick=function(){var i=+b.getAttribute('data-rec');S.recsDone[i]=!S.recsDone[i];b.classList.toggle('good',S.recsDone[i]);b.classList.toggle('primary',!S.recsDone[i]);b.textContent=S.recsDone[i]?'✓ Applied':'Apply';if(S.recsDone[i])toast('Next week\'s scripts will reflect this')}});
  document.querySelectorAll('[data-qs]').forEach(function(b){b.onclick=function(){var x=QS[+b.getAttribute('data-qs')];S.ownOpen=true;chatReset();S.chat.log.push({w:'me',t:'I want to answer this: '+x[0]});S.chat.log.push({w:'ai',t:'Great one to answer. People keep asking it. Before I write anything, give me the real answer in your own words, the way you\'d explain it to a friend.'});S.chat.ans=['A question people ask'];S.chat.step=1;location.hash='#studio'}});
  if(SUB){var el=document.getElementById('ins-'+SUB);if(el){setTimeout(function(){el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});el.classList.remove('pulse');void el.offsetWidth;el.classList.add('pulse')},120)}}
};

/* ---------- brand ---------- */
V.brand=function(){
  var mix=Object.keys(PINFO).map(function(k){return [k,PINFO[k].mix]});
  var aud=[['Student builders','Students who want real work, real pay, and proof for their portfolio.','"Founders will actually see what I can do."','Instagram, TikTok, Shorts','teach'],['Startup founders','Midwest startups that can\'t find people to build with.','"I can find someone good this week, not this year."','LinkedIn first','show'],['Investors and accelerators','The people who decide who gets backed. They watch how you build.','"This team ships, and people want what they\'re making."','LinkedIn, YouTube','believe']];
  var stories=[['The 8-hour build at Ohio State','believe','origin'],['Why the name is Sandlot','believe','name'],['Winning Startup Cincy','show','bts'],['How to get noticed by a founder','teach','advice'],['"Find killers"','believe','beliefs'],['A day as a student CEO','entertain','day']];
  return '<div class="head"><div><h1>Brand</h1><p class="lead">What the agent learned about you and '+esc(coName())+'. Every script is written from this.</p></div><button class="btn" id="rescan" type="button">Run the scan again</button></div>'+
  '<div class="glass pad stack" style="gap:10px"><h3>Known for</h3><p class="title">Jayden, the student founder who says you earn your spot by proving it.</p><div class="mixbar" role="img" aria-label="Pillar mix: Teach 25%, Show 30%, Believe 30%, Entertain 15%">'+mix.map(function(m){return '<i style="width:'+m[1]+'%;background:'+PC[m[0]]+'"></i>'}).join('')+'</div><div class="row" style="gap:18px;font-size:13.5px">'+mix.map(function(m){return '<span><span class="dot d-'+m[0]+'"></span> '+PILL[m[0]]+' <b>'+m[1]+'%</b></span>'}).join('')+'</div></div>'+
  brandTeach()+'<div class="sec-h"><div><h2>Your four pillars</h2><p>What each kind of video does for you, and the angle that fits you best.</p></div><button class="btn sm plain" type="button" data-lesson="3">Why four? ›</button></div>'+
  '<div class="g4">'+Object.keys(PINFO).map(function(k){return pillCard(k)}).join('')+'</div>'+
  '<div class="sec-h"><div><h2>Who you\'re talking to</h2><p>Three audiences, one face. Each one needs to believe something different.</p></div></div>'+
  '<div class="aud3">'+aud.map(function(a){return '<div class="glass pad"><span class="big">'+a[0]+'</span><p class="muted" style="font-size:14px">'+a[1]+'</p><div class="pcard" style="padding:10px 12px;border-radius:14px;background:var(--well);--pc:'+PC[a[4]]+'"><span class="tr" style="font-size:11px">They need to believe</span><span style="font-size:14px;font-weight:600">'+a[2]+'</span></div><span class="faint" style="font-size:12.5px">Where they watch: '+a[3]+'</span></div>'}).join('')+'</div>'+
  '<div class="g2" style="margin-top:14px"><div class="glass pad stack" style="gap:12px"><h2>Voice</h2><div class="chips"><span class="tag">High energy</span><span class="tag">Direct</span><span class="tag">Sports metaphors</span><span class="tag">Builder, not guru</span></div><div class="dodont"><div><b style="color:var(--good)">Sounds like you</b>"Find killers."<br>"Step up to the plate."<br>"Proof beats promises."</div><div><b style="color:#D0453A">Never</b>"Synergy."<br>"Disrupting the space."<br>"Hey guys, welcome back."</div></div></div>'+
   '<div class="glass pad stack" style="gap:12px"><h2>Story bank</h2><p class="faint" style="font-size:12.5px;margin-top:-6px">Stories the agent found. Tap one to write it.</p><div class="list">'+stories.map(function(s){return '<button class="li" type="button" data-story="'+s[2]+'"><div><b>'+esc(s[0])+'</b><span>'+PILL[s[1]]+'</span></div><span class="dot d-'+s[1]+'"></span></button>'}).join('')+'</div></div></div>'+
  '<div class="g3" style="margin-top:14px"><div class="glass pad stack" style="gap:10px"><h3>Beliefs</h3><ul class="did"><li>Proof beats promises</li><li>The Midwest isn\'t missing talent, it\'s missing connections</li><li>Fail as much as you can, as early as you can</li><li>Find killers: your circle decides your ceiling</li></ul></div>'+
   '<div class="glass pad stack" style="gap:10px"><h3>Proof points</h3><ul class="did"><li>Won Startup Cincy: 5 picked from 50 applicants, 11 universities</li><li>100+ student builders across 11 schools</li><li>4 hackathons run</li><li>First version built in 8 hours at the Ohio State hackathon</li></ul></div>'+
   '<div class="glass pad stack" style="gap:10px"><h3>Sources the agent reads</h3><div class="chips"><span class="tag">Founder interview · 20 min</span><span class="tag">Instagram @'+esc(S.co.soc.ig||'huzzsco')+'</span><span class="tag">LinkedIn</span><span class="tag">Startup Cincy pitch</span><span class="tag">'+esc(coName())+' app and site</span></div></div></div>'+
  '<div class="glass pad" style="margin-top:14px"><h2 style="margin-bottom:6px">Trust gaps</h2><div class="scroll-x"><table class="table"><thead><tr><th>Why someone hesitates</th><th>What fixes it</th><th>Pillar</th></tr></thead><tbody>'+
   [['Students: "Are real startups actually posting?"','Founders on camera explaining real problems','show'],['Founders: "Can students actually deliver?"','Builder wins, before and after','show'],['"Isn\'t this just another job board?"','The sandlot story: you get picked by playing','believe'],['"Who\'s behind this?"','You and the cofounders, on camera every week','entertain']].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td><span class="dot d-'+r[2]+'"></span> '+PILL[r[2]]+'</td></tr>'}).join('')+'</tbody></table></div></div>';
};
V.brand.after=function(){
  bindPillGo();document.querySelectorAll('[data-lesson]').forEach(function(b){b.onclick=function(){openLesson(+b.getAttribute('data-lesson'))}});
  document.querySelectorAll('[data-whyo]').forEach(function(b){b.onclick=function(){openWhy(+b.getAttribute('data-whyo'))}});
  document.querySelectorAll('[data-story]').forEach(function(b){b.onclick=function(){S.cat=b.getAttribute('data-story');S.ownOpen=false;S.hookSel=0;location.hash='#studio'}});
  document.getElementById('rescan').onclick=function(){var b=this;b.disabled=true;b.textContent='Scanning…';setTimeout(function(){b.disabled=false;b.textContent='Run the scan again';toast('Scan complete. 2 new stories found.')},reduce?100:1600)};
};

/* ---------- library: trending templates, styles, marketplace, and your own ---------- */
var B={name:'',font:'bric',size:20,color:'#FFFFFF',hl:'#FFD60A',mode:'text',box:'none',kase:'upper',look:'none'};
var BFONTS={sans:['Sans',SANS,700],bric:['Grotesk',BRIC,800],serif:['Serif',FRAU,600],iserif:['Italic serif',INST,400],mono:['Mono',MONO,700],type:['Typewriter',TYPE,700]};
var BCOL=['#FFFFFF','#111111','#FFD60A','#3CCF7B','#FF7A63','#7CF9FF','#FFB3D9','#A585FF'];
var BLOOK={none:['None',''],warm:['Warm film','sepia(.25) saturate(1.1)'],vhs:['VHS','sepia(.35) saturate(1.25)'],bw:['Black and white','grayscale(1) contrast(1.15)'],grain:['Grain','contrast(1.1) sepia(.2)']};
function builtStyle(){var f=BFONTS[B.font],o={name:B.name||'My style',by:'You',font:f[1],w:f[2],size:B.size,color:B.color,hl:B.hl,mine:1};
  if(B.font==='iserif')o.ital=1;
  if(B.mode==='box'){o.hlbg=B.hl;o.hl=(B.hl==='#111111'?'#fff':'#111')}
  if(B.box==='glass'){o.bg='rgba(0,0,0,.45)';o.radius=12}else if(B.box==='solid'){o.bg=B.color==='#111111'?'#fff':'#111';o.radius=6}else o.shadow='0 2px 10px rgba(0,0,0,.55)';
  if(B.kase==='upper')o.upper=1;if(B.kase==='lower')o.lower=1;
  if(B.look!=='none'){o.shot=BLOOK[B.look][1];if(B.look==='vhs')o.tag='PLAY ►  SP';if(B.look==='grain')o.grain=1}
  return o;}
var refFile=null,refDone=false;
V.library=function(){
  var t=S.libTab,body='';
  var tabs='<div class="seg lg scroll" id="libtabs"><span class="thumb"></span>'+[['trending','Trending'],['styles','Styles'],['market','Marketplace'],['mine','Make your own']].map(function(x){return '<button type="button" data-tab="'+x[0]+'" class="'+(t===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div>';
  if(t==='trending'){
    var list=FORMATS.filter(function(f){return S.fmtPillar==='all'||f.pillar===S.fmtPillar});
    body='<div class="row between" style="margin-bottom:14px"><div class="seg scroll" id="fpill"><span class="thumb"></span>'+[['all','All']].concat(Object.keys(PILL).map(function(k){return [k,PILL[k]]})).map(function(x){return '<button type="button" data-fp="'+x[0]+'" class="'+(S.fmtPillar===x[0]?'on':'')+'">'+x[1]+'</button>'}).join('')+'</div><span class="tag warn">Example data</span></div>'+
     '<div class="fmts">'+list.map(function(f){var on=S.format===f.id;return '<article class="glass fmt'+(on?' on':'')+'">'+stylePrev(f.style,'the part nobody tells you',f.scene,f.hook)+
      '<div class="stack" style="gap:6px"><div class="row between"><b class="n">'+esc(f.name)+'</b>'+(f.mine?'<span class="tag blue">Yours</span>':'<span class="hot" style="font-size:12.5px">'+f.hot+'</span>')+'</div><div class="meta"><span class="dot d-'+f.pillar+'"></span>'+PILL[f.pillar]+'<span>·</span>'+(f.mine?'From your upload':f.uses+' uses this month')+'</div></div>'+
      '<ol>'+f.beats.map(function(b){return '<li>'+esc(b)+'</li>'}).join('')+'</ol><p class="faint" style="font-size:12.5px">'+esc(f.why)+'</p>'+
      '<div class="row"><button class="btn sm'+(on?' good':' primary')+'" data-usefmt="'+f.id+'" type="button">'+(on?'✓ In use':'Use template')+'</button><span class="faint" style="font-size:12px">'+esc((STYLE_LIB[f.style]||{}).name||'')+' style · '+esc(scene(f.scene).name)+'</span></div></article>'}).join('')+'</div>'+
     '<p class="faint" style="font-size:12.5px;margin-top:14px">The real gallery links to the original posts and saves only the structure: hook, beats, pacing, and caption style. It never copies anyone\'s video.</p>';
  }else if(t==='styles'){
    var ids=Object.keys(STYLE_LIB).filter(function(k){return !STYLE_LIB[k].mkt||S.myStyles.indexOf(k)>-1});
    body='<div class="row between" style="margin-bottom:14px"><p class="muted" style="font-size:14px;max-width:60ch">Save the styles you like. Star one as your default and every edit comes out in it, every single time.</p><button class="btn sm" data-tab="mine" type="button">+ Make a style</button></div>'+
     '<div class="sgrid">'+ids.map(function(k){var st=STYLE_LIB[k],saved=S.myStyles.indexOf(k)>-1,def=S.defStyle===k;return '<div class="glass stile'+(def?' def':'')+'">'+stylePrev(k)+'<div class="nm"><span>'+esc(st.name)+'</span>'+(def?'<span class="tag blue">Default</span>':'')+'</div><span class="by">'+esc(st.by)+'</span><div class="row"><button class="btn sm'+(saved?' good':'')+'" data-save="'+k+'" type="button">'+(saved?'✓ Saved':'Save')+'</button><button class="btn sm plain" data-def="'+k+'" type="button"'+(def?' disabled':'')+'>'+(def?'★':'☆ Default')+'</button></div></div>'}).join('')+'</div>';
  }else if(t==='market'){
    var mk=Object.keys(STYLE_LIB).filter(function(k){return STYLE_LIB[k].mkt||STYLE_LIB[k].posted});
    body='<section class="glass mkt-hero" style="margin-bottom:14px"><div class="stack" style="gap:6px"><h2>The style marketplace</h2><p class="muted" style="font-size:14px">Editors and creators post the styles behind trending videos. Get one in a click, or post your own and earn when people use it.</p></div><button class="btn primary" data-tab="mine" type="button">Post a style</button></section>'+
     '<div class="row between" style="margin-bottom:12px"><div class="seg" id="msort"><span class="thumb"></span><button type="button" class="on">Trending</button><button type="button">New</button><button type="button">Free</button></div><span class="tag warn">Example listings</span></div>'+
     '<div class="sgrid">'+mk.map(function(k){var st=STYLE_LIB[k],got=S.myStyles.indexOf(k)>-1;return '<div class="glass stile">'+stylePrev(k)+'<div class="nm"><span>'+esc(st.name)+'</span><span class="tag'+(st.price==='Free'?' good':'')+'">'+esc(st.price||'Free')+'</span></div><span class="by">'+esc(st.by)+' · '+esc(st.installs||'New')+' installs</span><div class="row"><button class="btn sm'+(got?' good':' primary')+'" data-get="'+k+'" type="button">'+(got?'✓ In your styles':st.price&&st.price!=='Free'?'Get for '+st.price:'Get')+'</button></div></div>'}).join('')+'</div>';
  }else{
    var bs=builtStyle(),fs=Object.keys(BFONTS),mineS=S.myStyles.filter(function(k){return STYLE_LIB[k]&&STYLE_LIB[k].mine}),mineF=FORMATS.filter(function(f){return f.mine});
    function segOf(id,key,opts){return '<div class="seg scroll" data-bseg="'+key+'"><span class="thumb"></span>'+opts.map(function(o){return '<button type="button" data-bv="'+o[0]+'" class="'+(String(B[key])===String(o[0])?'on':'')+'">'+o[1]+'</button>'}).join('')+'</div>'}
    function cols(key){return '<div class="sw">'+BCOL.map(function(c){return '<button type="button" data-bc="'+key+'" data-col="'+c+'" class="'+(B[key]===c?'on':'')+'" style="background:'+c+'" aria-label="'+c+'"></button>'}).join('')+'</div>'}
    body='<div class="stack">'+
     '<section class="glass pad"><div class="row between" style="margin-bottom:16px"><h2>Make a style</h2><span class="faint" style="font-size:13px">Changes show live</span></div><div class="builder"><div class="stack" style="gap:16px">'+
      '<div class="ctrl"><span>Name</span><input class="input" id="b-name" value="'+esc(B.name)+'" placeholder="e.g. Sandlot Clean"></div>'+
      '<div class="ctrl"><span>Font</span>'+segOf('font','font',fs.map(function(k){return [k,BFONTS[k][0]]}))+'</div>'+
      '<div class="ctrl"><span>Size · <b class="tnum" id="b-sz">'+B.size+'</b></span><input type="range" id="b-size" min="14" max="30" value="'+B.size+'"></div>'+
      '<div class="ctrl"><span>Text color</span>'+cols('color')+'</div>'+
      '<div class="ctrl"><span>Highlight color</span>'+cols('hl')+'</div>'+
      '<div class="g2"><div class="ctrl"><span>Highlight as</span>'+segOf('mode','mode',[['text','Color'],['box','Box']])+'</div><div class="ctrl"><span>Behind the words</span>'+segOf('box','box',[['none','Nothing'],['glass','Glass'],['solid','Solid']])+'</div></div>'+
      '<div class="g2"><div class="ctrl"><span>Case</span>'+segOf('kase','kase',[['normal','Normal'],['upper','UPPER'],['lower','lower']])+'</div><div class="ctrl"><span>Film look</span>'+segOf('look','look',Object.keys(BLOOK).map(function(k){return [k,BLOOK[k][0]]}))+'</div></div>'+
     '</div><div class="stack" style="justify-items:center;gap:12px"><div class="phone sm'+(bs.grain?' grainy':'')+'" id="b-phone"><span class="shot" style="'+(bs.shot?'filter:'+bs.shot:'')+'"></span><span class="person"></span>'+(bs.tag?'<span class="vtag">'+bs.tag+'</span>':'')+'<div class="hk">Proof beats promises.</div><div class="cap" style="'+capStyle(bs)+'">'+capHTML(['You','earn','your','spot'],bs)+'</div></div>'+
      '<div class="row" style="justify-content:center"><button class="btn primary" id="b-save" type="button">Save style</button><button class="btn" id="b-def" type="button">Save as default</button><button class="btn plain" id="b-post" type="button">Post to marketplace</button></div></div></div></section>'+
     '<section class="glass pad"><div class="row between" style="margin-bottom:12px"><h2>Turn a video you love into a template</h2><span class="tag warn">Simulated analysis</span></div>'+
      (refFile?'<div class="builder"><div class="anl" id="anl"></div><div class="vid" style="max-width:220px">'+(refFile.url?'<video src="'+refFile.url+'" controls playsinline muted></video>':'')+'</div></div>':
      '<label class="drop" id="ref-drop" for="ref-file">'+UPIC+'<b>Upload a video you want to learn from</b><span>A trending post, a creator you like, or your own best video. Claude breaks down the hook, pacing, structure, and caption style.</span></label><input type="file" id="ref-file" accept="video/*" hidden>')+
     '</section>'+
     '<section class="glass pad"><h2 style="margin-bottom:12px">Yours</h2><div class="stack" style="gap:12px"><div><h3 style="margin-bottom:8px">Styles you made</h3><div class="chips">'+(mineS.length?mineS.map(function(k){return '<span class="tag'+(S.defStyle===k?' blue':'')+'">'+esc(STYLE_LIB[k].name)+(S.defStyle===k?' ★':'')+'</span>'}).join(''):'<span class="faint" style="font-size:13px">None yet. Make one above.</span>')+'</div></div>'+
      '<div><h3 style="margin-bottom:8px">Templates you made</h3><div class="chips">'+(mineF.length?mineF.map(function(f){return '<span class="tag">'+esc(f.name)+'</span>'}).join(''):'<span class="faint" style="font-size:13px">None yet. Upload a video above.</span>')+'</div></div></div></section>'+
    '</div>';
  }
  return '<div class="head"><div><h1>Library</h1><p class="lead">Trending formats from top creators, a style for every kind of video, and the ones you make yourself.</p></div>'+tabs+'</div>'+body;
};
V.library.after=function(){
  var q=function(id){return document.getElementById(id)};
  document.querySelectorAll('[data-tab]').forEach(function(b){b.onclick=function(){S.libTab=b.getAttribute('data-tab');render();window.scrollTo(0,0)}});
  document.querySelectorAll('[data-fp]').forEach(function(b){b.onclick=function(){S.fmtPillar=b.getAttribute('data-fp');render()}});
  document.querySelectorAll('[data-usefmt]').forEach(function(b){b.onclick=function(){var f=fmt(b.getAttribute('data-usefmt'));if(S.format===f.id)return;S.format=f.id;S.scene=f.scene;if(S.myStyles.indexOf(f.style)<0)S.myStyles.push(f.style);S.style=f.style;
    var c=CATS.filter(function(x){return x.pillar===f.pillar})[0];if(c)S.cat=c.id;S.ownOpen=false;toast(f.name+' set. Opening the Studio.');setTimeout(function(){location.hash='#studio'},reduce?0:500)}});
  document.querySelectorAll('[data-save]').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-save'),i=S.myStyles.indexOf(k);if(i>-1){if(S.defStyle===k){toast('That\'s your default. Pick another default first.');return}S.myStyles.splice(i,1)}else S.myStyles.push(k);render()}});
  document.querySelectorAll('[data-def]').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-def');S.defStyle=k;S.style=k;if(S.myStyles.indexOf(k)<0)S.myStyles.push(k);toast(STYLE_LIB[k].name+' is your default now');render()}});
  document.querySelectorAll('[data-get]').forEach(function(b){b.onclick=function(){var k=b.getAttribute('data-get');if(S.myStyles.indexOf(k)>-1)return;S.myStyles.push(k);toast(STYLE_LIB[k].name+' added to your styles'+(STYLE_LIB[k].price&&STYLE_LIB[k].price!=='Free'?' (prototype: no charge)':''));render()}});
  var ms=q('msort');if(ms)ms.querySelectorAll('button').forEach(function(b){b.onclick=function(){ms.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)});syncThumbs()}});
  if(S.libTab!=='mine')return;
  function upd(){var y=window.scrollY;render();window.scrollTo(0,y)}
  q('b-name').oninput=function(){B.name=this.value};
  document.querySelectorAll('[data-bseg]').forEach(function(seg){var key=seg.getAttribute('data-bseg');seg.querySelectorAll('[data-bv]').forEach(function(b){b.onclick=function(){B[key]=b.getAttribute('data-bv');upd()}})});
  document.querySelectorAll('[data-bc]').forEach(function(b){b.onclick=function(){B[b.getAttribute('data-bc')]=b.getAttribute('data-col');upd()}});
  q('b-size').oninput=function(){B.size=+this.value;q('b-sz').textContent=B.size;var st=builtStyle(),c=document.querySelector('#b-phone .cap');c.setAttribute('style',capStyle(st))};
  function save(asDef,post){var st=builtStyle();if(!B.name){st.name='My style '+(S.myStyles.filter(function(k){return STYLE_LIB[k]&&STYLE_LIB[k].mine}).length+1)}var id='u'+Date.now();if(post){st.posted=1;st.price='Free';st.installs='New';st.by='@'+(S.co.soc.ig||firstName().toLowerCase())}
    STYLE_LIB[id]=st;S.myStyles.push(id);if(asDef){S.defStyle=id;S.style=id}B.name='';
    toast(post?'Posted "'+st.name+'" to the marketplace (prototype: pending review)':asDef?'"'+st.name+'" saved. Every edit will use it.':'"'+st.name+'" saved to your styles');upd()}
  q('b-save').onclick=function(){save(false)};q('b-def').onclick=function(){save(true)};q('b-post').onclick=function(){save(false,true)};
  var rf=q('ref-file'),rd=q('ref-drop');
  function takeRef(files){var f=files&&files[0];if(!f)return;if(!/^video\//.test(f.type)&&!/\.(mov|mp4|m4v|webm)$/i.test(f.name)){toast('Choose a video file');return}var u='';try{u=URL.createObjectURL(f)}catch(e){}refFile={name:f.name,url:u};refDone=false;upd()}
  if(rf){rf.onchange=function(){takeRef(rf.files)};['dragenter','dragover'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.add('over')})});['dragleave','drop'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.remove('over')})});rd.addEventListener('drop',function(e){takeRef(e.dataTransfer&&e.dataTransfer.files)})}
  var anl=q('anl');
  if(anl){
    var R=[['Hook','0:00 to 0:02. A question on screen, said straight to camera.'],['Pacing','A cut about every 1.8 seconds. Faster in the first 10 seconds.'],['Structure','Hook, 3 beats with a hook loop between each, then a call to action.'],['Captions','Bold, 3 to 4 words at a time, one highlighted word.'],['B-roll','4 inserts, each under 2 seconds.'],['Pillar','Teach: it answers one clear question.']];
    function done(){anl.innerHTML='<h3>'+esc(refFile.name)+'</h3>'+R.map(function(r){return '<div class="bstep done"><i></i><div><b>'+r[0]+'</b><span>'+r[1]+'</span></div></div>'}).join('')+
      '<div class="row" style="margin-top:6px"><button class="btn primary" id="ref-tpl" type="button">Save as template</button><button class="btn" id="ref-sty" type="button">Save its caption style</button><button class="btn plain" id="ref-new" type="button">Try another</button></div>';
      q('ref-tpl').onclick=function(){var nm=refFile.name.replace(/\.[^.]+$/,'').slice(0,40)||'My template';FORMATS.unshift({id:'m'+Date.now(),mine:1,name:nm,pillar:'teach',style:'bold',scene:'desk',hook:'A question on screen',beats:['Hook: a question on screen','Beat 1, then a hook loop','Beat 2, then a hook loop','Beat 3 and the call to action'],why:'Built from a video you uploaded.',uses:'',hot:''});toast('Saved "'+nm+'" to your templates');refFile=null;S.libTab='trending';render()};
      q('ref-sty').onclick=function(){var id='u'+Date.now(),st={name:'From '+refFile.name.replace(/\.[^.]+$/,'').slice(0,18),by:'You',font:SANS,w:800,size:19,color:'#fff',hl:'#FFD60A',shadow:'0 2px 10px rgba(0,0,0,.6)',mine:1};STYLE_LIB[id]=st;S.myStyles.push(id);toast('Saved "'+st.name+'" to your styles');upd()};
      q('ref-new').onclick=function(){refFile=null;upd()}}
    if(refDone)done();else{anl.innerHTML='<h3>Breaking down '+esc(refFile.name)+'…</h3>'+R.map(function(r,i){return '<div class="bstep" data-r="'+i+'"><i></i><div><b>'+r[0]+'</b><span>Watching…</span></div></div>'}).join('');
      R.forEach(function(r,i){setTimeout(function(){var el=anl.querySelector('[data-r="'+i+'"]');if(el)el.classList.add('run')},i*(reduce?20:350))});
      setTimeout(function(){refDone=true;if(document.getElementById('anl'))done()},R.length*(reduce?20:350)+400)}
  }
};

/* ---------- profile settings + appearance ---------- */
var THEME_KEY='frontman-theme';
function applyTheme(t){var r=document.documentElement;if(t==='light'||t==='dark')r.setAttribute('data-theme',t);else r.removeAttribute('data-theme');document.querySelectorAll('[data-theme-opt]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-theme-opt')===t)});syncThumbs()}
var savedTheme=null;try{savedTheme=localStorage.getItem(THEME_KEY)}catch(e){}
var curTheme=savedTheme||'auto';if(savedTheme)applyTheme(savedTheme);else document.querySelectorAll('[data-theme-opt="auto"]').forEach(function(b){b.classList.add('on')});
var sheet=document.getElementById('sheet'),whoBtn=document.getElementById('who');
function openSheet(o){sheet.hidden=!o;whoBtn.setAttribute('aria-expanded',o?'true':'false');if(o)requestAnimationFrame(syncThumbs)}
whoBtn.onclick=function(e){e.stopPropagation();openSheet(sheet.hidden)};
document.addEventListener('click',function(e){if(!sheet.hidden&&!sheet.contains(e.target)&&e.target!==whoBtn)openSheet(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!sheet.hidden){openSheet(false);whoBtn.focus()}});
sheet.querySelectorAll('[data-close]').forEach(function(a){a.addEventListener('click',function(){openSheet(false)})});
document.querySelectorAll('[data-theme-opt]').forEach(function(b){b.onclick=function(){curTheme=b.getAttribute('data-theme-opt');applyTheme(curTheme);try{localStorage.setItem(THEME_KEY,curTheme)}catch(e){}toast(curTheme==='auto'?'Appearance follows your system':curTheme==='dark'?'Dark mode on':'Light mode on')}});
document.getElementById('notif').onclick=function(){var s=document.getElementById('notif-sw');s.classList.toggle('on');toast(s.classList.contains('on')?'Weekly reminders on':'Weekly reminders off')};
document.getElementById('redo-ob').onclick=function(){openSheet(false);S.ob=0;location.hash='#onboard'};
(function(){var so=document.getElementById('signout');if(!so)return;if(!LIVE||BOOT.local){so.disabled=true;so.style.color='var(--faint)';return}
  so.onclick=function(){saveNow().then(function(){var f=document.createElement('form');f.method='post';f.action='/auth/signout';document.body.appendChild(f);f.submit()})}})();

/* ---------- router ---------- */
/* ---------- Live Shoot: real QR links, uploads and takes ---------- */
if(LIVE){
  var LSH={links:{},takes:[],openedAt:null,poll:null,busy:false};
  var shootOrig=V.shoot,shootAfterOrig=V.shoot.after,deliveryOrig=deliveryCard;
  var liveTakes=function(s){return LSH.takes.filter(function(t){return s&&s.sid&&t.scriptId===s.sid})};
  takesOf=function(t){var s=S.approved.filter(function(x){return x.title===t})[0];return s?liveTakes(s).length:0};
  var ensureSid=function(s){if(s.sid)return Promise.resolve(s.sid);return saveNow().then(function(){return api('/api/terminal/approve',{businessId:BOOT.businessId,item:s})}).then(function(d){s.sid=d.scriptId;saveState();return s.sid})};
  var linkFor=function(s){if(LSH.links[s.sid])return Promise.resolve(LSH.links[s.sid]);return api('/api/businesses/'+BOOT.businessId+'/shoot-link',{scriptId:s.sid}).then(function(d){d.path=new URL(d.url).pathname;LSH.links[s.sid]=d;return d})};
  var refreshTakes=function(){if(!BOOT.businessId)return Promise.resolve();return fetch('/api/businesses/'+BOOT.businessId+'/takes',{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){if(!d)return;var before=LSH.takes.map(function(t){return t.id+(t.coach?'c':'')}).join(),opened=LSH.openedAt;LSH.takes=d.takes;LSH.openedAt=d.phoneOpenedAt;
    if(route()==='shoot'&&(before!==LSH.takes.map(function(t){return t.id+(t.coach?'c':'')}).join()||opened!==LSH.openedAt)){var y=window.scrollY;render();window.scrollTo(0,y);if(before&&LSH.takes.length)toast('New take saved')}})};
  var putFile=function(target,file,onp){return new Promise(function(res,rej){var x=new XMLHttpRequest();x.open('PUT',target.url);for(var k in target.headers)x.setRequestHeader(k,target.headers[k]);x.upload.onprogress=function(e){if(e.lengthComputable&&onp)onp(e.loaded/e.total)};x.onload=function(){x.status>=200&&x.status<300?res():rej(new Error(x.status===413?'That video is too big to upload. Export it at 1080p and try again.':'The upload failed ('+x.status+'). Try again.'))};x.onerror=function(){rej(new Error('The connection dropped during the upload. Try again.'))};x.send(file)})};
  var uploadLive=function(s,files){var arr=[].slice.call(files||[]).filter(function(f){return /^video\//.test(f.type)||/\.(mov|mp4|m4v|webm)$/i.test(f.name)});if(!arr.length){toast('Choose a video file');return}
    var drop=document.getElementById('drop');var step=function(i){if(i>=arr.length){if(drop)drop.classList.remove('busy');refreshTakes();toast(arr.length+' clip'+(arr.length>1?'s':'')+' uploaded');return}var f=arr[i];
      ensureSid(s).then(function(){return api('/api/businesses/'+BOOT.businessId+'/takes',{scriptId:s.sid,mime:f.type||'video/mp4',bytes:f.size})}).then(function(d){return putFile(d.upload,f,function(p){if(drop){drop.classList.add('busy');var b=drop.querySelector('b');if(b)b.textContent='Uploading '+(arr.length>1?(i+1)+' of '+arr.length+' · ':'')+Math.round(p*100)+'%'}}).then(function(){return api('/api/takes/'+d.take.id+'/done',{})}).then(function(){if(typeof coachLive==='function')setTimeout(function(){coachLive(d.take.id,f)},1500)})}).then(function(){step(i+1)},function(e){if(drop)drop.classList.remove('busy');toast(e.message);render()})};step(0)};
  V.shoot=function(){var s=S.approved[cur],h=shootOrig();if(!s)return h;var L=s.sid&&LSH.links[s.sid],on=!!LSH.openedAt;
    h=h.replace(/<canvas id="qr"[^>]*><\/canvas>/,'<div class="qr-live" id="qr" aria-label="QR code that opens the recorder on your phone">'+(L?L.qr:'<span class="faint">Making your code…</span>')+'</div>');
    h=h.replace(/<div class="qrlink" title="[^"]*">[^<]*<\/div>/,'<div class="qrlink" id="qrlink">'+(L?esc(L.url):'')+'</div>');
    h=h.replace(/<span class="pair[^"]*" id="pair"><i><\/i><span>[^<]*<\/span><\/span>/,'<span class="pair'+(on?' on':'')+'" id="pair"><i></i><span>'+(on?'Phone connected':'Waiting for your phone…')+'</span></span>');
    h=h.replace('<p class="faint" style="font-size:12px">Example code. In this preview, record with the phone on the right.</p>','<p class="faint" style="font-size:12px">The code works for 24 hours and only opens your approved scripts. Only share it with yourself.</p>');
    h=h.replace(/<div class="iph" aria-label="Phone recorder preview">[\s\S]*?<\/div><a class="btn sm plain" href="#rec">Open the phone view full screen<\/a>/,'<div class="iph" aria-label="What your phone shows"><iframe src="'+(L?L.path+'?preview=1':'about:blank')+'" title="What your phone shows" style="width:100%;height:100%;border:0;pointer-events:none;border-radius:inherit" tabindex="-1"></iframe></div>'+(L?'<a class="btn sm plain" href="'+L.path+'" target="_blank" rel="noopener">Open the phone view</a>':''));
    return h};
  V.shoot.after=function(){shootAfterOrig();var s=S.approved[cur];if(!s)return;
    var drop=document.getElementById('drop'),inp=document.getElementById('up-file');
    if(drop){var d2=drop.cloneNode(true);drop.parentNode.replaceChild(d2,drop);drop=d2;
      ['dragenter','dragover'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('over')})});
      ['dragleave','drop'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.remove('over')})});
      drop.addEventListener('drop',function(e){uploadLive(s,e.dataTransfer&&e.dataTransfer.files)})}
    if(inp)inp.onchange=function(){uploadLive(s,inp.files);inp.value=''};
    var dn=document.getElementById('done');if(dn){var n=liveTakes(s).length;dn.disabled=!n;var tk=document.getElementById('takes');if(tk)tk.textContent=n?n+' take'+(n>1?'s':'')+' ready':'No takes yet';
      dn.onclick=function(){var it=S.approved.splice(cur,1)[0],ts=liveTakes(it);it.takeIds=ts.map(function(t){return t.id});it.clip=ts.length?ts[0].url:null;it.styleUsed=S.defStyle||S.style;S.edits.push(it);saveState();toast('Sent to edit');render()}}
    if(!LSH.links[s.sid]||!s.sid)ensureSid(s).then(function(){return linkFor(s)}).then(function(){if(route()==='shoot'&&S.approved[cur]===s){var y=window.scrollY;render();window.scrollTo(0,y)}},function(e){var qd=document.getElementById('qr');if(qd)qd.innerHTML='<span class="faint" style="font-size:12px">'+esc(e.message)+'</span>'});
    clearInterval(LSH.poll);refreshTakes();LSH.poll=setInterval(function(){if(route()!=='shoot'){clearInterval(LSH.poll);return}if(document.visibilityState==='visible')refreshTakes()},4000)};
  deliveryCard=function(s){var ts=liveTakes(s);
    var head='<div class="sec-h"><div><h2>Your takes</h2><p>Every take you record or upload lands here. Delivery scores for pace, filler words, eye contact and energy appear on each take once coaching is switched on.</p></div></div>';
    if(!ts.length)return head+'<div class="glass pad coach-empty"><span class="faint">Scan the code and record, or upload a clip. Takes show up here a few seconds after they finish uploading.</span></div>';
    return head+'<div class="glass pad"><div class="live-takes">'+ts.map(function(t,i){return '<figure class="ltake"><video src="'+esc(t.url)+'" controls playsinline preload="metadata"></video><figcaption><b>Take '+(ts.length-i)+'</b><span class="faint">'+(t.source==='phone'?'Phone':'Upload')+(t.seconds?' · '+mmss(t.seconds):'')+'</span></figcaption></figure>'}).join('')+'</div></div>'};
}
/* ---------- Live Brand: the deep dive ---------- */
function applyAudit(){if(!S.audit)return;Object.keys(PINFO).forEach(function(k){var a=S.audit,pl=(a.pillars||[]).filter(function(x){return x.pillar===k})[0];if(a.mix&&a.mix[k]!=null)PINFO[k].mix=a.mix[k];if(pl&&pl.example)PINFO[k].ex=pl.example;var c=allCats().filter(function(x){return x.pillar===k})[0];if(c)PINFO[k].cat=c.id})}
if(LIVE){
  applyAudit();
  var VERD={strong:['good','Strong'],okay:['blue','Okay'],weak:['warn','Needs work'],missing:['warn','Missing']};
  V.brand=function(){var a=S.audit;
    if(!a)return '<div class="head"><div><h1>Brand</h1><p class="lead">A deep dive on you and '+esc(coName())+': what you should be known for, what each pillar needs, and what to fix first.</p></div></div><section class="glass pad stack" style="gap:12px;max-width:680px"><h2>Run your brand deep dive</h2><p class="muted">Claude reads every onboarding answer'+(BOOT.hasBrief?', your website analysis,':'')+' and grades it against how people decide to trust someone. Takes about a minute.</p><div class="row"><button class="btn primary" id="aud-go" type="button">Run my deep dive</button></div><p class="muted" id="aud-msg" style="font-size:13px"></p></section>';
    var mix=Object.keys(PINFO).map(function(k){return [k,PINFO[k].mix]}),C=2*Math.PI*30,col=a.score>=75?'var(--good)':a.score>=50?'var(--blue)':'var(--warn)';
    var li=function(arr,empty){return arr&&arr.length?'<ul class="did">'+arr.map(function(x){return '<li>'+fills(x)+'</li>'}).join('')+'</ul>':'<p class="faint" style="font-size:13.5px">'+empty+'</p>'};
    var soc=S.co.soc||{},srcs=[S.co.site&&('Website · '+S.co.site),soc.ig&&('Instagram @'+String(soc.ig).replace(/^@/,'')),soc.tt&&('TikTok @'+String(soc.tt).replace(/^@/,'')),soc.yt&&'YouTube',soc.li&&'LinkedIn','Your onboarding answers'].filter(Boolean);
    return '<div class="head"><div><h1>Brand</h1><p class="lead">What the agent learned about you and '+esc(coName())+'. Every script is written from this.</p></div><button class="btn" id="rescan" type="button">Run the deep dive again</button></div>'+
    '<div class="glass pad stack" style="gap:12px"><div class="row" style="gap:16px;flex-wrap:nowrap;align-items:center"><svg viewBox="0 0 72 72" class="sring" aria-hidden="true" style="width:72px;height:72px;flex:none"><circle cx="36" cy="36" r="30" fill="none" stroke="var(--well)" stroke-width="7"/><circle cx="36" cy="36" r="30" fill="none" stroke="'+col+'" stroke-width="7" stroke-linecap="round" stroke-dasharray="'+(C*a.score/100).toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 36 36)"/><text x="36" y="41" text-anchor="middle" font-size="18" font-weight="700" fill="currentColor">'+a.score+'</text></svg><div class="stack" style="gap:4px;min-width:0"><h3>Trust readiness</h3><p class="muted" style="font-size:14px">'+fills(a.summary)+'</p></div></div>'+
     '<h3>Known for</h3><p class="title">'+fills(a.knownFor)+'</p><div class="mixbar" role="img" aria-label="Target pillar mix">'+mix.map(function(m){return '<i style="width:'+m[1]+'%;background:'+PC[m[0]]+'"></i>'}).join('')+'</div><div class="row" style="gap:18px;font-size:13.5px">'+mix.map(function(m){return '<span><span class="dot d-'+m[0]+'"></span> '+PILL[m[0]]+' <b>'+m[1]+'%</b></span>'}).join('')+'</div></div>'+
    (a.priorities&&a.priorities.length?'<div class="sec-h"><div><h2>Do these first</h2><p>The three moves that build the most trust from where you are now.</p></div></div><div class="g3">'+a.priorities.map(function(x,i){return '<div class="glass pad stack" style="gap:8px"><span class="tag" style="justify-self:start"><span class="dot d-'+x.pillar+'"></span> '+(i+1)+' · '+PILL[x.pillar]+'</span><b style="font-size:16px">'+fills(x.title)+'</b><p class="muted" style="font-size:14px">'+fills(x.why)+'</p></div>'}).join('')+'</div>':'')+
    brandTeach()+'<div class="sec-h"><div><h2>Your four pillars</h2><p>What each kind of video does for you, what you already have, and what\'s missing.</p></div><button class="btn sm plain" type="button" data-lesson="3">Why four? ›</button></div>'+
    '<div class="g4">'+Object.keys(PINFO).map(function(k){return pillCard(k)}).join('')+'</div>'+
    '<div class="g2" style="margin-top:14px">'+(a.pillars||[]).map(function(x){return '<div class="glass pad stack" style="gap:8px"><h3><span class="dot d-'+x.pillar+'"></span> '+PILL[x.pillar]+(x.angle?' · <span class="muted" style="font-weight:500">'+fills(x.angle)+'</span>':'')+'</h3><p style="font-size:14px"><b style="color:var(--good)">Working:</b> '+fills(x.doingWell)+'</p><p style="font-size:14px"><b>Missing:</b> '+fills(x.missing)+'</p>'+li(x.nextSteps,'')+'</div>'}).join('')+'</div>'+
    (a.audiences&&a.audiences.length?'<div class="sec-h"><div><h2>Who you\'re talking to</h2><p>One face, more than one audience. Each needs to believe something different.</p></div></div><div class="aud3">'+a.audiences.map(function(x){return '<div class="glass pad"><span class="big">'+esc(x.name)+'</span><p class="muted" style="font-size:14px">'+fills(x.who)+'</p><div class="pcard" style="padding:10px 12px;border-radius:14px;background:var(--well);--pc:'+PC[x.pillar]+'"><span class="tr" style="font-size:11px">They need to believe</span><span style="font-size:14px;font-weight:600">'+fills(x.mustBelieve)+'</span></div><span class="faint" style="font-size:12.5px">Where they watch: '+esc(x.whereTheyWatch)+'</span></div>'}).join('')+'</div>':'')+
    '<div class="g2" style="margin-top:14px"><div class="glass pad stack" style="gap:12px"><h2>Voice</h2><div class="chips">'+(a.voice.traits||[]).map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div><div class="dodont"><div><b style="color:var(--good)">Sounds like you</b>'+(a.voice.soundsLike||[]).map(function(t){return '"'+esc(t)+'"'}).join('<br>')+'</div><div><b style="color:#D0453A">Never</b>'+(a.voice.never||[]).map(function(t){return '"'+esc(t)+'"'}).join('<br>')+'</div></div></div>'+
     '<div class="glass pad stack" style="gap:12px"><h2>Story bank</h2><p class="faint" style="font-size:12.5px;margin-top:-6px">Tap one to write it in the Studio.</p><div class="list">'+(allCats().length?allCats().map(function(c){return '<button class="li" type="button" data-story="'+esc(c.id)+'"><div><b>'+esc(c.name)+'</b><span>'+PILL[c.pillar]+'</span></div><span class="dot d-'+c.pillar+'"></span></button>'}).join(''):'<a class="li" href="#studio"><div><b>Write your story bank</b><span>Open the Studio</span></div></a>')+'</div></div></div>'+
    '<div class="g3" style="margin-top:14px"><div class="glass pad stack" style="gap:10px"><h3>Beliefs</h3>'+li(a.beliefs,'None yet. Tell your story in the Studio and say what you stand for.')+'</div><div class="glass pad stack" style="gap:10px"><h3>Proof points</h3>'+li(a.proofPoints,'None yet. Add real numbers, wins or customers in onboarding.')+'</div><div class="glass pad stack" style="gap:10px"><h3>Sources the agent read</h3><div class="chips">'+srcs.map(function(t){return '<span class="tag">'+esc(t)+'</span>'}).join('')+'</div></div></div>'+
    (a.trustGaps&&a.trustGaps.length?'<div class="glass pad" style="margin-top:14px"><h2 style="margin-bottom:6px">Trust gaps</h2><div class="scroll-x"><table class="table"><thead><tr><th>Why someone hesitates</th><th>What fixes it</th><th>Pillar</th></tr></thead><tbody>'+a.trustGaps.map(function(r){return '<tr><td>'+fills(r.gap)+'</td><td>'+fills(r.fix)+'</td><td><span class="dot d-'+r.pillar+'"></span> '+PILL[r.pillar]+'</td></tr>'}).join('')+'</tbody></table></div></div>':'')+
    (a.onboarding&&a.onboarding.length?'<div class="glass pad" style="margin-top:14px"><div class="row between"><h2 style="margin-bottom:6px">Your onboarding, reviewed</h2><button class="btn sm plain" id="aud-redo" type="button">Change my answers</button></div><div class="scroll-x"><table class="table"><thead><tr><th>Topic</th><th>You said</th><th>Verdict</th><th>Why it matters</th><th>Make it stronger</th></tr></thead><tbody>'+a.onboarding.map(function(r){var v=VERD[r.verdict]||VERD.okay;return '<tr><td><b>'+esc(r.topic)+'</b></td><td class="muted">'+(r.youSaid?esc(r.youSaid):'<span class="faint">Blank</span>')+'</td><td><span class="tag '+v[0]+'">'+v[1]+'</span></td><td>'+fills(r.why)+'</td><td>'+fills(r.improve)+'</td></tr>'}).join('')+'</tbody></table></div></div>':'');
  };
  V.brand.after=function(){var go=document.getElementById('aud-go');
    if(go){go.onclick=function(){go.disabled=true;go.textContent='Running… about a minute';runAudit().then(function(){toast('Deep dive ready');render()},function(e){go.disabled=false;go.textContent='Run my deep dive';document.getElementById('aud-msg').textContent=e.message})};return}
    bindPillGo();document.querySelectorAll('[data-lesson]').forEach(function(b){b.onclick=function(){openLesson(+b.getAttribute('data-lesson'))}});
    document.querySelectorAll('[data-story]').forEach(function(b){b.onclick=function(){S.cat=b.getAttribute('data-story');S.ownOpen=false;S.hookSel=0;location.hash='#studio'}});
    var rd=document.getElementById('aud-redo');if(rd)rd.onclick=function(){S.ob=1;location.hash='#onboard'};
    document.getElementById('rescan').onclick=function(){var b=this;b.disabled=true;b.textContent='Running…';runAudit().then(function(){toast('Deep dive updated');render()},function(e){b.disabled=false;b.textContent='Run the deep dive again';toast(e.message)})}};
}
/* ---------- Live delivery coach ---------- */
function sampleTake(src,maxFrames){maxFrames=maxFrames||40;
  return new Promise(function(res,rej){var v=document.createElement('video'),url=typeof src==='string'?src:URL.createObjectURL(src),out={frames:[],loudness:[],duration:0},to=setTimeout(function(){rej(new Error('Couldn\'t read the video'))},60000);
    v.muted=true;v.playsInline=true;v.preload='auto';if(typeof src==='string')v.crossOrigin='anonymous';
    var seek=function(t){return new Promise(function(ok){var h=function(){v.removeEventListener('seeked',h);ok()};v.addEventListener('seeked',h);v.currentTime=t})};
    v.onerror=function(){clearTimeout(to);rej(new Error('Couldn\'t read the video'))};
    v.onloadedmetadata=function(){(isFinite(v.duration)&&v.duration>0?Promise.resolve():seek(1e7).then(function(){return seek(0)})).then(function(){
      var d=isFinite(v.duration)&&v.duration>0?v.duration:0;out.duration=d;if(!d){clearTimeout(to);res(out);return}
      var step=Math.max(1,d/maxFrames),ts=[];for(var t=Math.min(.5,d/2);t<d;t+=step)ts.push(t);
      var w=320,h=Math.round(320*(v.videoHeight||16)/(v.videoWidth||9)),cv=document.createElement('canvas');cv.width=w;cv.height=h;var cx=cv.getContext('2d');
      var next=function(i){if(i>=ts.length){clearTimeout(to);res(out);return}seek(ts[i]).then(function(){try{cx.drawImage(v,0,0,w,h);out.frames.push({t:Math.round(ts[i]*10)/10,data:cv.toDataURL('image/jpeg',.6).split(',')[1]})}catch(e){}next(i+1)})};next(0)})};
    v.src=url}).then(function(out){
    var blobP=typeof src==='string'?fetch(src).then(function(r){return r.blob()}):Promise.resolve(src);
    return blobP.then(function(b){return b.arrayBuffer()}).then(function(ab){var AC=window.AudioContext||window.webkitAudioContext,ac=new AC();return new Promise(function(ok,no){ac.decodeAudioData(ab,ok,no)}).then(function(buf){var ch=buf.getChannelData(0),win=Math.floor(buf.sampleRate/2);for(var i=0;i+win<=ch.length;i+=win){var s=0;for(var j=i;j<i+win;j+=4)s+=ch[j]*ch[j];out.loudness.push(Math.round(Math.sqrt(s/(win/4))*10000)/10000)}ac.close&&ac.close();return out})}).catch(function(){return out})});
}
if(LIVE){
  LSH.coaching={};
  var coachLive=function(takeId,src){if(LSH.coaching[takeId])return;LSH.coaching[takeId]=1;if(route()==='shoot'){var y=window.scrollY;render();window.scrollTo(0,y)}
    sampleTake(src).then(function(p){return api('/api/takes/'+takeId+'/coach',p)}).then(function(){delete LSH.coaching[takeId];return refreshTakes()},function(e){delete LSH.coaching[takeId];toast(e.message);if(route()==='shoot')render()})};
  var takeDataOrig=takeData;
  deliveryCard=function(s){var ts=liveTakes(s),coached=ts.filter(function(t){return t.coach});
    var vids='<div class="sec-h"><div><h2>Your takes</h2><p>Every take you record or upload lands here and gets scored by the delivery coach.</p></div></div><div class="glass pad">'+(ts.length?'<div class="live-takes">'+ts.map(function(t,i){var st=t.coach?'<span class="tag good">'+t.coach.score+'</span>':(LSH.coaching[t.id]||(t.source==='phone'&&Date.now()-Date.parse(t.createdAt)<150000))?'<span class="tag blue">Scoring…</span>':'<button class="btn sm plain" type="button" data-coach="'+t.id+'">Score it</button>';return '<figure class="ltake"><video src="'+esc(t.url)+'" controls playsinline preload="metadata"></video><figcaption><span><b>Take '+(ts.length-i)+'</b> <span class="faint">'+(t.source==='phone'?'Phone':'Upload')+(t.seconds?' · '+mmss(t.seconds):'')+'</span></span>'+st+'</figcaption></figure>'}).join('')+'</div>':'<span class="faint">Scan the code and record, or upload a clip. Takes show up here a few seconds after they finish uploading.</span>')+'</div>';
    if(!coached.length)return '<div class="sec-h"><div><h2>Delivery coach</h2><p>Claude watches every frame and listens to every word: pace, filler words, eye contact, energy, and pauses.</p></div></div><div class="glass pad coach-empty"><span class="faint">'+(ts.length?'Scores appear here a minute after each take uploads.':'Record or upload a take and Claude scores your delivery here, frame by frame.')+'</span></div>'+vids;
    var keepTO=takesOf;takesOf=function(){return coached.length};takeData=function(t,i){var c=coached[i].coach;return {i:i,score:c.score,wpm:c.wpm,fill:c.fill,eye:c.eye,energy:c.energy,pauses:c.pauses,clar:c.clar,len:c.len,marks:c.marks||[],fillers:c.fillers||[],tips:c.tips&&c.tips.length?c.tips:null}};
    var html;try{html=deliveryOrig(s)}finally{takesOf=keepTO;takeData=takeDataOrig}
    return html.replace('<span class="tag warn">Simulated</span>','')+vids};
  var shootAfterCoach=V.shoot.after;V.shoot.after=function(){shootAfterCoach();document.querySelectorAll('[data-coach]').forEach(function(b){b.onclick=function(){var t=LSH.takes.filter(function(x){return x.id===b.getAttribute('data-coach')})[0];if(t)coachLive(t.id,t.url)}})};
}
/* ---------- Live Edit: reference analysis, Claude edit plan, Creatomate render ---------- */
var REF_FONT={sans:SANS,grotesk:BRIC,serif:FRAU,mono:MONO,typewriter:TYPE},REF_LOOK={none:'',warm:'sepia(.25) saturate(1.1)',vhs:'sepia(.35) saturate(1.25)',bw:'grayscale(1) contrast(1.15)',grain:'contrast(1.1) sepia(.2)'};
function refStyle(p){var c=p.captions||{},o={name:'Like '+String(p.name||'reference').replace(/\.[^.]+$/,'').slice(0,28),by:'You',font:REF_FONT[c.font]||SANS,w:800,size:19,color:c.color||'#fff',hl:c.highlight||'#FFD60A',mine:1};
  if(c.letterCase==='upper')o.upper=1;if(c.letterCase==='lower')o.lower=1;if(c.box==='glass'){o.bg='rgba(0,0,0,.45)';o.radius=12}else if(c.box==='solid'){o.bg='#111';o.radius=6}else o.shadow='0 2px 10px rgba(0,0,0,.55)';
  if(p.look&&p.look!=='none'){o.shot=REF_LOOK[p.look];if(p.look==='grain')o.grain=1}return o}
if(LIVE){
  S.refStyles=S.refStyles||{};S.refs=S.refs||[];for(var rk in S.refStyles)STYLE_LIB[rk]=S.refStyles[rk];
  var editOrig=V.edit,editAfterOrig=V.edit.after,edPoll=null,edLoaded=false;
  var bestLive=function(ids){var ts=LSH.takes.filter(function(t){return (ids||[]).indexOf(t.id)>-1});return ts.sort(function(a,b){return ((b.coach&&b.coach.score)||-1)-((a.coach&&a.coach.score)||-1)})[0]||null};
  var finalCard=function(s){var r=s.render,ready=!!(s.takeIds&&s.takeIds.length);
    var body=!r?'<p class="muted" style="font-size:14px">Claude picks your best take, cuts the dead air and restarts, times the captions to your words, and renders a finished 9:16 MP4 in the style on the left.</p><div class="row"><button class="btn primary" id="ed-go" type="button"'+(ready?'':' disabled')+'>Make the final video</button></div>'+(ready?'':'<p class="faint" style="font-size:12.5px">Record or upload a take in Shoot first.</p>')
      :r.status==='rendering'?'<p class="muted" style="font-size:14px">Rendering… usually about a minute. You can leave this page.</p>'
      :r.status==='failed'?'<p class="muted" style="font-size:14px">'+esc(r.error||'The render failed.')+'</p><button class="btn" id="ed-go" type="button">Try again</button>'
      :'<video src="'+esc(r.url||'')+'" controls playsinline style="width:100%;max-width:280px;aspect-ratio:9/16;border-radius:18px;background:#000;justify-self:center"></video><div class="row"><a class="btn sm" href="'+esc(r.url||'#')+'" download>Download MP4</a><button class="btn sm plain" id="ed-go" type="button">Render again with this style</button></div>';
    return '<section class="glass pad stack" style="gap:10px"><div class="row between"><h2>Final video</h2>'+(r&&r.status==='done'?'<span class="tag good">Ready</span>':'')+'</div>'+body+(r&&r.did&&r.did.length?'<ul class="did">'+r.did.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')+'</section>'};
  V.edit=function(){var s=S.edits[0];if(s){var b=bestLive(s.takeIds);if(b)s.clip=b.url;else if(!edLoaded){edLoaded=true;refreshTakes().then(function(){if(route()==='edit')render()})}}
    var h=editOrig();if(!s)return h;h=h.replace('<span class="tag warn">Simulated</span>','');
    return h.replace('<div class="stack"><section class="glass pad refbox">','<div class="stack">'+finalCard(s)+'<section class="glass pad refbox">')};
  var pollRender=function(s){clearInterval(edPoll);if(!s.render||s.render.status!=='rendering')return;edPoll=setInterval(function(){
    fetch('/api/terminal/edit/'+encodeURIComponent(s.render.id)+'?b='+encodeURIComponent(BOOT.businessId),{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){if(!d.render)return;var was=s.render.status;s.render=d.render;if(d.render.status!=='rendering'){clearInterval(edPoll);saveState();if(was!==d.render.status){toast(d.render.status==='done'?'Your video is ready':'The render failed');if(route()==='edit'){var y=window.scrollY;render();window.scrollTo(0,y)}}}}).catch(function(){})},5000)};
  V.edit.after=function(){var s=S.edits[0];
    if(s&&s.ref&&s.ref.stage==='run'&&!s.ref.live){s.ref=null}
    editAfterOrig();if(!s)return;var q=function(id){return document.getElementById(id)};
    var go=q('ed-go');if(go)go.onclick=function(){go.disabled=true;go.textContent='Starting…';var st=STYLE_LIB[S.style]||STYLE_LIB.bold;
      api('/api/terminal/edit',{businessId:BOOT.businessId,takeIds:s.takeIds||[],scriptId:s.sid||'',title:s.title,hook:s.hook,text:s.text||'',style:{font:st.font,w:st.w,color:st.color,hl:st.hl,hlbg:st.hlbg,bg:st.bg,upper:st.upper,lower:st.lower,ital:st.ital},note:(q('ref-in')&&q('ref-in').value)||'',reference:s.ref&&s.ref.profile||null})
        .then(function(d){s.render=d.render;saveState();render();pollRender(s)},function(e){go.disabled=false;go.textContent='Make the final video';toast(e.message)})};
    pollRender(s);
    var startRef=function(name,file,note){s.ref={name:name,stage:'run',live:1,prev:S.style,m:{cut:'',caps:'',style:S.style,extras:[]}};var y=window.scrollY;render();window.scrollTo(0,y);
      document.querySelectorAll('[data-rr]').forEach(function(el){el.classList.add('run')});
      (file?sampleTake(file,40):Promise.resolve({frames:[],loudness:[],duration:0})).then(function(p){p.businessId=BOOT.businessId;p.name=name;p.note=note||'';return api('/api/terminal/reference',p)}).then(function(d){
        var p=d.profile,key='ref_'+Date.now().toString(36);STYLE_LIB[key]=refStyle(p);S.refStyles[key]=STYLE_LIB[key];if(S.myStyles.indexOf(key)<0)S.myStyles.push(key);
        S.refs.unshift({key:key,name:p.name||name,profile:p,at:new Date().toISOString()});S.style=key;
        s.ref={name:name,stage:'done',prev:s.ref&&s.ref.prev,profile:p,m:{cut:(Math.round(p.cutEverySeconds*10)/10)+' s',caps:p.captions.wordsPerLine+' words at a time',style:key,extras:p.extras||[]}};
        saveState();toast('Studied your reference');if(route()==='edit')render()},function(e){s.ref=null;toast(e.message);if(route()==='edit')render()})};
    var ru=q('ref-up'),rd=q('ref-drop'),rf=q('ref-form');
    if(ru){ru.onchange=function(){var f=ru.files[0];if(f)startRef(f.name,f,'')};
      var rd2=rd.cloneNode(true);rd.parentNode.replaceChild(rd2,rd);rd=rd2;
      ['dragenter','dragover'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.add('over')})});['dragleave','drop'].forEach(function(ev){rd.addEventListener(ev,function(e){e.preventDefault();rd.classList.remove('over')})});
      rd.addEventListener('drop',function(e){var f=e.dataTransfer&&e.dataTransfer.files[0];if(f)startRef(f.name,f,'')});
      rf.onsubmit=function(e){e.preventDefault();var v=q('ref-in').value.trim();if(!v){q('ref-in').focus();return}startRef('"'+v.slice(0,40)+(v.length>40?'…':'')+'"',null,v)}}};
}
var ROUTES=['onboard','build','home','studio','shoot','edit','post','library','insights','brand','rec'];
var SUB='';
function route(){var h=location.hash.replace('#','').split('/');SUB=h[1]||'';h=h[0];if(h==='scenery')h='shoot';if(!S.onboarded&&h!=='build')return 'onboard';return ROUTES.indexOf(h)>-1?h:'home'}
function badges(){[['shoot',S.approved.length],['edit',S.edits.length]].forEach(function(x){var el=document.getElementById('b-'+x[0]);el.textContent=x[1];el.hidden=!x[1]})}
function render(){
  var r=route();clearInterval(capT);clearInterval(recT);cancelAnimationFrame(raf);buildT.forEach(clearTimeout);
  document.body.classList.toggle('ob',r==='onboard'||r==='build');document.body.classList.toggle('recmode',r==='rec');brandChrome();
  document.getElementById('view').innerHTML=V[r]();if(V[r].after)V[r].after();
  document.querySelectorAll('#nav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('data-r')===r)});
  badges();requestAnimationFrame(syncThumbs);
}
var last=route(),lastH=location.hash;
window.addEventListener('hashchange',function(){if(location.hash==='#scenery')return;var r=route();if(location.hash!==lastH||r==='onboard'){lastH=location.hash;last=r;window.scrollTo(0,0);render()}});
window.addEventListener('resize',function(){syncThumbs();if(route()==='onboard')layDeck()});
document.addEventListener('keydown',function(e){
  if(route()!=='onboard'||e.key!=='Enter'||e.shiftKey||e.isComposing)return;
  var t=e.target;if(t&&t.tagName==='BUTTON')return;if(t&&t.id==='ob-audin')return;
  if(!t||!t.closest||!t.closest('.card.cur')){if(t&&t!==document.body)return}
  e.preventDefault();obNext();
});
applyLook();
render();
})();
