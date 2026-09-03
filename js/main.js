(function(){
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

  var links=Array.prototype.slice.call(document.querySelectorAll('.hud-nav a'));
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
