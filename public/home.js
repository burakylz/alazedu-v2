
const unis=[
 {n:"King's College London",c:"Londra",qs:"QS #40",tr:"▲ +45%"},
 {n:"Queen Mary University of London",c:"Londra",qs:"QS #120",tr:"▲ +52%"},
 {n:"The University of Manchester",c:"Manchester",qs:"QS #34",tr:"▲ +82%"},
 {n:"City St George's, University of London",c:"Londra",qs:"QS —",tr:"▲ +65%"},
 {n:"University College London (UCL)",c:"Londra",qs:"QS #9",tr:"↗ +4%"},
 {n:"The University of Westminster",c:"Londra",qs:"QS —",tr:"▲ +58%"},
 {n:"The University of Greenwich",c:"Londra",qs:"QS —",tr:"▲ +121%"},
 {n:"University of Nottingham",c:"Nottingham",qs:"QS #108",tr:"▲ +32%"},
];
document.getElementById('uni').innerHTML=unis.map((u,idx)=>`
 <div class="uni"><div class="top"><div class="lg" style="background:var(--gold-soft);color:var(--gold);font-family:Fraunces,serif;font-size:19px">${idx+1}</div><div><h4>${u.n}</h4><div class="loc">${u.qs} · ${u.c}</div></div></div>
 <div class="meta"><span>3 yıllık trend</span><span style="color:var(--gold);font-weight:600">${u.tr}</span></div></div>`).join('');

const ig=document.getElementById('ig');
ig.innerHTML=[1,2,3,4,5,6].map(i=>`
 <div class="igpost"><img src="https://picsum.photos/seed/insta${i}/400/400"><div class="ov"><div class="meta"><span>♥ ${90+i*41}</span><span>💬 ${3+i*2}</span></div></div></div>`).join('');

const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
