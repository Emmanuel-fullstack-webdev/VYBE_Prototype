// Minimal interactivity for prototype: splash, like toggle, create modal publish
document.addEventListener('DOMContentLoaded', function(){
  const splash = document.getElementById('splash');
  setTimeout(()=>{
    splash.style.opacity = 0;
    splash.style.transform = 'scale(.98)';
    setTimeout(()=> splash.style.display = 'none', 600);
  }, 1700); // show splash briefly

  // like toggle
  document.querySelectorAll('.like-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const countNode = btn.querySelector('.likes-count');
      let count = parseInt(countNode.textContent.replace(/[^0-9]/g,'')) || 0;
      if(btn.classList.contains('active')){
        btn.classList.remove('active');
        count = Math.max(0, count-1);
      } else {
        btn.classList.add('active');
        count = count + 1;
      }
      countNode.textContent = count.toLocaleString();
    });
  });

  // create modal
  const createBtn = document.getElementById('createBtn');
  const modal = document.getElementById('createModal');
  const cancel = document.getElementById('cancelCreate');
  const publish = document.getElementById('publishCreate');
  const txt = document.getElementById('postText');

  createBtn.addEventListener('click', ()=>{
    modal.classList.remove('hidden');
    txt.focus();
  });
  cancel.addEventListener('click', ()=>{
    modal.classList.add('hidden');
    txt.value = '';
  });
  publish.addEventListener('click', ()=>{
    const value = txt.value.trim();
    if(!value){ alert('Write something to publish your vibe!'); return; }
    // create a simple card in feed (client-only)
    const feed = document.querySelector('.feed');
    const card = document.createElement('article'); card.className = 'card';
    card.innerHTML = `
      <div class="post-header">
        <div class="avatar">YO</div>
        <div class="user-info">
          <div class="user-name">You</div>
          <div class="post-meta">just now · Draft</div>
        </div>
        <button class="follow-btn">Follow</button>
      </div>
      <div class="post-body">
        <div class="post-media placeholder"></div>
        <p class="post-text">${value.replace(/</g,'&lt;')}</p>
      </div>
      <div class="post-actions">
        <button class="like-btn">❤ <span class="likes-count">0</span></button>
        <button class="comment-btn">💬 <span>0</span></button>
        <button class="share-btn">↗</button>
      </div>
    `;
    feed.prepend(card);
    // reattach like handler for new card
    card.querySelector('.like-btn').addEventListener('click', ()=>{
      const btn = card.querySelector('.like-btn');
      const countNode = btn.querySelector('.likes-count');
      let count = 0;
      if(btn.classList.contains('active')){ btn.classList.remove('active'); count = Math.max(0,count-1);}
      else { btn.classList.add('active'); count = 1; }
      countNode.textContent = count.toLocaleString();
    });
    modal.classList.add('hidden'); txt.value='';
  });
});
