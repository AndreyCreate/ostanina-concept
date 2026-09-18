// Кружок, догоняющий курсор. Только для мыши: на тач-экранах не создаётся.
(function(){
  if(!window.matchMedia||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var el=document.createElement('div');el.className='cb';el.innerHTML='<i></i>';document.body.appendChild(el);
  var x=0,y=0,tx=0,ty=0,seen=false;
  function cls(t){
    var link=t.closest&&t.closest('a,button,.btn,[role=button],summary');
    var text=!link&&t.closest&&t.closest('h1,h2');
    var dark=t.closest&&t.closest('.how,.between,.enter,.pullquote,.concept-bar,.band');
    el.classList.toggle('link',!!link);el.classList.toggle('text',!!text);el.classList.toggle('dark',!!dark);
  }
  addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!seen){seen=true;x=tx;y=ty;el.classList.add('on')}cls(e.target)},{passive:true});
  addEventListener('mousedown',function(){el.classList.add('down')});
  addEventListener('mouseup',function(){el.classList.remove('down')});
  document.addEventListener('mouseleave',function(){el.classList.remove('on');seen=false});
  (function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;el.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';requestAnimationFrame(loop)})();
})();
