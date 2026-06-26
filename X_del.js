let d=0,u=0;
setInterval(()=>window.scrollTo(0,document.body.scrollHeight),600);

async function nuke(){
  let ts=document.querySelectorAll('article[data-testid="tweet"]:not(.x)');
  for(let t of ts){
    t.classList.add('x');
    let txt=t.textContent.toLowerCase();
    let isRepost=txt.includes('reposted')||txt.includes('retweeted');

    // Start animation
    t.style.transition='all 0.25s ease-out';
    t.style.transform='scale(0.9)';
    t.style.opacity='0.5';

    if(isRepost){
      let btn=t.querySelector('[data-testid="unretweet"]')||t.querySelector('[data-testid="retweet"]')||t.querySelector('[aria-label*="Repost"]');
      if(btn)btn.click();
      let undo=document.querySelector('[data-testid="unretweetConfirm"]');
      if(undo){undo.click();u++;}
    }else{
      let more=t.querySelector('[aria-label="More"]')||t.querySelector('[data-testid="caret"]');
      if(more)more.click();
      let del=document.querySelector('[role="menuitem"]');
      if(del&&del.textContent.trim()=='Delete')del.click();
      let cf=document.querySelector('[data-testid="confirmationSheetConfirm"]');
      if(cf){cf.click();d++;}
    }

    // Finish animation
    t.style.transition='all 0.3s ease-in';
    t.style.transform='translateX(120vw)';
    t.style.opacity='0';
    await new Promise(r=>setTimeout(r,200)); // wait for animation
    t.remove();
  }
  if(ts.length)console.log(`💨 Deleted:${d} | Unreposted:${u}`);
}
setInterval(nuke,800);