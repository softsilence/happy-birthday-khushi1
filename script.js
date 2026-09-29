const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

const intro=$('#intro'),
home=$('#home'),
transition=$('#transition'),
love=$('#love'),
letters=$('#letters');

const music=$('#music');

let musicStarted=false;

function playMusic(){
  if(musicStarted)return;
  musicStarted=true;
  music.play().catch(()=>{});
}

function show(el){
  $$('.screen').forEach(s=>s.classList.remove('active'));
  el.classList.add('active');
}

function confetti(id,n){
  const c=$(id);

  for(let i=0;i<n;i++){
    const x=document.createElement('i');

    x.style.left=Math.random()*100+'%';
    x.style.animationDelay=Math.random()*3+'s';
    x.style.animationDuration=(2.5+Math.random()*3)+'s';
    x.style.transform=`rotate(${Math.random()*360}deg)`;

    c.appendChild(x);
  }
}

confetti('#introConfetti',60);
confetti('#homeConfetti',70);

function hearts(id,n=22){

  const c=$(id);

  if(c.dataset.done)return;

  c.dataset.done='1';

  for(let i=0;i<n;i++){

    const h=document.createElement('i');

    h.textContent=Math.random()>.2?'♥':'♡';

    h.style.left=Math.random()*100+'%';
    h.style.animationDelay=Math.random()*5+'s';
    h.style.animationDuration=(4+Math.random()*4)+'s';
    h.style.fontSize=(12+Math.random()*13)+'px';

    c.appendChild(h);
  }
}

let autoTimer=setTimeout(()=>{
  show(home)
},5600);

function openCard(){

  playMusic();

  clearTimeout(autoTimer);

  $('#cardOverlay').classList.remove('hidden');

  $('#birthdayCard').classList.remove('open');

  setTimeout(()=>{
    $('#birthdayCard').classList.add('open')
  },120);
}

function closeCard(){

  $('#birthdayCard').classList.remove('open');

  setTimeout(()=>{
    $('#cardOverlay').classList.add('hidden')
  },600);
}

function openLove(){

  playMusic();

  clearTimeout(autoTimer);

  show(transition);

  setTimeout(()=>{
    show(love)
  },2500);

  hearts('#loveHearts',20);
}

function openLetters(){

  playMusic();

  show(letters);

  hearts('#letterHearts',26);
}

$('#openCard').onclick=openCard;
$('#closeCard').onclick=closeCard;
$('#openLove').onclick=openLove;
$('#openLove2').onclick=openLove;
$('#openLetters').onclick=openLetters;

$('#smile').onclick=()=>{
  playMusic();
  hearts('#loveHearts',25);
};

setTimeout(()=>{
  if(intro.classList.contains('active'))
    show(home)
},6000);

setTimeout(()=>{
  if(home.classList.contains('active'))
    openCard()
},12500);

setTimeout(()=>{
  if($('#cardOverlay').classList.contains('modal') &&
     !$('#cardOverlay').classList.contains('hidden')){

    closeCard();

    setTimeout(openLove,700);
  }
},17500);

setTimeout(()=>{
  if(love.classList.contains('active'))
    openLetters()
},23500);

window.addEventListener(
  'pointerdown',
  ()=>playMusic(),
  {once:true}
);
