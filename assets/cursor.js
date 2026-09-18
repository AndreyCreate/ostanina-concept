// Кружок, догоняющий курсор. Только для мыши: на тач-экранах не создаётся. Стили встроены, чтобы не зависеть от кэша CSS.
(function(){
  if(!window.matchMedia||!matchMedia('(pointer:fine)').matches)return;
  var css='.cb{position:fixed;left:0;top:0;z-index:2147483000;pointer-events:none;opacity:0;transition:opacity .3s;will-change:transform}.cb.on{opacity:1}.cb i{position:absolute;left:-24px;top:-24px;width:48px;height:48px;border-radius:50%;background:#A0C4F9;transform:scale(.22);transition:transform .3s cubic-bezier(.2,.9,.3,1),opacity .3s,background .3s}.cb.link i{transform:scale(1.15);opacity:.45}.cb.text i{transform:scale(1.9);opacity:.28}.cb.down i{transform:scale(.6);opacity:.6}.cb.dark i{background:#fff}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var el=document.createElement('div');el.className='cb';el.innerHTML='<i></i>';document.body.appendChild(el);
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches,k=calm?1:.18;
  var x=0,y=0,tx=0,ty=0,seen=false;
  function cls(t){
    if(!t||!t.closest)return;
    var link=t.closest('a,button,.btn,[role=button],summary');
    el.classList.toggle('link',!!link);el.classList.toggle('text',!link&&!!t.closest('h1,h2'));
    el.classList.toggle('dark',!!t.closest('.how,.between,.enter,.pullquote,.concept-bar,.band'));
  }
  function move(e){tx=e.clientX;ty=e.clientY;if(!seen){seen=true;x=tx;y=ty;el.classList.add('on')}cls(e.target)}
  addEventListener('mousemove',move,{passive:true});addEventListener('pointermove',move,{passive:true});
  addEventListener('mousedown',function(){el.classList.add('down')});
  addEventListener('mouseup',function(){el.classList.remove('down')});
  document.documentElement.addEventListener('mouseleave',function(){el.classList.remove('on');seen=false});
  (function loop(){x+=(tx-x)*k;y+=(ty-y)*k;el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';requestAnimationFrame(loop)})();
})();
