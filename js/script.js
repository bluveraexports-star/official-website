document.addEventListener('DOMContentLoaded',async()=>{
  const resp = await fetch('data/products.json');
  const products = await resp.json();
  const grid = document.getElementById('featured-grid');
  const select = document.querySelector('select[name=product]');
  products.forEach(p=>{
    // populate featured grid
    const card = document.createElement('div');card.className='product-card';
    card.innerHTML = `<img src="${p.image}" alt="${p.name}" /><h3>${p.name}</h3><p class="muted">${p.spec}</p><a class="btn btn-outline" href="#enquiry">Request Quote</a>`;
    grid.appendChild(card);
    // add to enquiry select
    const opt = document.createElement('option');opt.value=p.name;opt.textContent=p.name;select.appendChild(opt);
  });

  const search = document.getElementById('product-search');
  const clear = document.getElementById('clear-search');
  search.addEventListener('input',()=>{
    const q = search.value.trim().toLowerCase();
    Array.from(grid.children).forEach(card=>{
      const name = card.querySelector('h3').textContent.toLowerCase();
      card.style.display = name.includes(q)?'block':'none';
    });
  });
  clear.addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'))});

  // enquiry form submit — simple local handler (replace with backend)
  document.getElementById('enquiry-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('Thank you — your enquiry has been noted. We will respond within 24 hours.');
    e.target.reset();
  });

  // WhatsApp & floating quote actions
  document.getElementById('wa-stick').href = 'https://wa.me/919876543210?text=Hello%20Bluvera%20Exports%20I%27d%20like%20a%20quote';
  document.querySelector('.wa-btn').addEventListener('click',()=>{
    window.location.href = document.getElementById('wa-stick').href;
  });

});
