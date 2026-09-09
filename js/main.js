(function(){
  var intro=document.getElementById('intro-screen');
  var music=document.getElementById('bg-music');
  var muteBtn=document.getElementById('hud-mute');

  if(intro){
    document.body.classList.add('intro-lock');
    var dismissIntro=function(){
      if(intro.classList.contains('is-hidden')) return;
      intro.classList.add('is-hidden');
      document.body.classList.remove('intro-lock');
      if(music){
        music.volume=0.6;
        music.play().catch(function(){});
      }
      intro.removeEventListener('click', dismissIntro);
      intro.removeEventListener('keydown', onIntroKey);
      setTimeout(function(){ intro.hidden=true; }, 650);
    };
    var onIntroKey=function(e){
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); dismissIntro(); }
    };
    intro.addEventListener('click', dismissIntro);
    intro.addEventListener('keydown', onIntroKey);
  }

  if(muteBtn && music){
    muteBtn.addEventListener('click', function(){
      music.muted=!music.muted;
      muteBtn.setAttribute('aria-pressed', music.muted ? 'true' : 'false');
    });
  }

  var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var d=new Date();
  var el=document.getElementById('hud-date');
  if(el){ el.textContent = days[d.getDay()] + ' ' + (d.getMonth()+1) + '/' + d.getDate(); }
  var yr=document.getElementById('hud-year');
  if(yr){ yr.textContent = d.getFullYear(); }

  var toggle=document.getElementById('hud-toggle');
  var nav=document.getElementById('hud-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
    });
  }

  var links=Array.prototype.slice.call(document.querySelectorAll('.hud-nav a')).filter(function(a){ return a.getAttribute('href').charAt(0)==='#'; });
  var sections=links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if('IntersectionObserver' in window && sections.length){
    var obs=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          links.forEach(function(a){ a.classList.remove('active'); });
          var match=links.find(function(a){ return a.getAttribute('href')==='#'+entry.target.id; });
          if(match) match.classList.add('active');
        }
      });
    }, { rootMargin:'-45% 0px -50% 0px' });
    sections.forEach(function(s){ obs.observe(s); });
  }
})();
