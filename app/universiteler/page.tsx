import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'İngiltere Üniversiteleri — Türk Öğrencilerin En Çok Tercih Ettiği 50 Üniversite',
  description: "HESA verilerine göre Türk öğrencilerin İngiltere'de en çok tercih ettiği üniversiteler, QS sıralamaları ve 3 yıllık trendleriyle. AlazEdu danışmanlığıyla başvur.",
  alternates: { canonical: 'https://www.alazedu.com/universiteler' },
}

type Uni = { r: number; n: string; qs: string; s: string; tr: string; up: boolean }
const UNIS: Uni[] = [
  {r:1,n:"King's College London",qs:"40",s:"320",tr:"+%45",up:true},
  {r:2,n:"Queen Mary University of London",qs:"120",s:"320",tr:"+%52",up:true},
  {r:3,n:"The University of Manchester",qs:"34",s:"310",tr:"+%82",up:true},
  {r:4,n:"City St George's, University of London",qs:"—",s:"280",tr:"+%65",up:true},
  {r:5,n:"University College London (UCL)",qs:"9",s:"265",tr:"+%4",up:true},
  {r:6,n:"The University of Westminster",qs:"—",s:"260",tr:"+%58",up:true},
  {r:7,n:"The University of Greenwich",qs:"—",s:"210",tr:"+%121",up:true},
  {r:8,n:"University of Nottingham",qs:"108",s:"205",tr:"+%32",up:true},
  {r:9,n:"The University of Sussex",qs:"218",s:"200",tr:"+%29",up:true},
  {r:10,n:"Kaplan International Colleges",qs:"—",s:"175",tr:"+%94",up:true},
  {r:11,n:"University of the Arts, London",qs:"—",s:"170",tr:"+%21",up:true},
  {r:12,n:"Imperial College London",qs:"2",s:"160",tr:"+%60",up:true},
  {r:13,n:"The University of Exeter",qs:"169",s:"155",tr:"+%29",up:true},
  {r:14,n:"Bournemouth University",qs:"—",s:"155",tr:"+%24",up:true},
  {r:15,n:"University of the West of England",qs:"—",s:"150",tr:"+%114",up:true},
  {r:16,n:"The University of Warwick",qs:"69",s:"150",tr:"+%58",up:true},
  {r:17,n:"The University of Edinburgh",qs:"27",s:"150",tr:"%0",up:false},
  {r:18,n:"Regent's University London",qs:"—",s:"145",tr:"+%123",up:true},
  {r:19,n:"The University of Birmingham",qs:"80",s:"140",tr:"+%27",up:true},
  {r:20,n:"The University of Essex",qs:"—",s:"115",tr:"+%77",up:true},
  {r:21,n:"The University of Bristol",qs:"54",s:"115",tr:"+%53",up:true},
  {r:22,n:"The University of Bath",qs:"150",s:"110",tr:"+%69",up:true},
  {r:23,n:"The University of Surrey",qs:"244",s:"90",tr:"+%64",up:true},
  {r:24,n:"Anglia Ruskin University",qs:"—",s:"90",tr:"+%64",up:true},
  {r:25,n:"The University of Sheffield",qs:"105",s:"90",tr:"+%20",up:true},
  {r:26,n:"The University of Glasgow",qs:"78",s:"85",tr:"%0",up:false},
  {r:27,n:"The University of Oxford",qs:"3",s:"85",tr:"%0",up:false},
  {r:28,n:"Oxford Brookes University",qs:"—",s:"80",tr:"+%45",up:true},
  {r:29,n:"Brunel University London",qs:"—",s:"80",tr:"-%6",up:false},
  {r:30,n:"The University of Southampton",qs:"80",s:"75",tr:"+%15",up:true},
  {r:31,n:"AA School of Architecture",qs:"—",s:"75",tr:"+%36",up:true},
  {r:32,n:"Royal Holloway, University of London",qs:"—",s:"75",tr:"+%25",up:true},
  {r:33,n:"University of Durham",qs:"82",s:"70",tr:"+%8",up:true},
  {r:34,n:"Istituto Marangoni",qs:"—",s:"70",tr:"+%133",up:true},
  {r:35,n:"The University of Brighton",qs:"—",s:"70",tr:"+%100",up:true},
  {r:36,n:"LSE",qs:"50",s:"70",tr:"+%8",up:true},
  {r:37,n:"Manchester Metropolitan University",qs:"—",s:"65",tr:"+%86",up:true},
  {r:38,n:"The University of Reading",qs:"172",s:"60",tr:"%0",up:false},
  {r:39,n:"De Montfort University",qs:"—",s:"60",tr:"+%50",up:true},
  {r:40,n:"Nottingham Trent University",qs:"—",s:"55",tr:"+%175",up:true},
  {r:41,n:"The University of Leeds",qs:"82",s:"55",tr:"%0",up:false},
  {r:42,n:"The University of Liverpool",qs:"165",s:"55",tr:"+%22",up:true},
  {r:43,n:"The University of Kent",qs:"—",s:"55",tr:"+%10",up:true},
  {r:44,n:"The University of Cambridge",qs:"5",s:"50",tr:"+%25",up:true},
  {r:45,n:"Middlesex University",qs:"—",s:"50",tr:"+%43",up:true},
  {r:46,n:"The University of York",qs:"184",s:"50",tr:"+%25",up:true},
  {r:47,n:"Goldsmiths College",qs:"—",s:"45",tr:"+%12",up:true},
  {r:48,n:"Kingston University",qs:"—",s:"45",tr:"+%29",up:true},
  {r:49,n:"Newcastle University",qs:"129",s:"45",tr:"-%10",up:false},
  {r:50,n:"Study Group",qs:"—",s:"45",tr:"+%800",up:true},
]

const nav = fs.readFileSync(path.join(process.cwd(), 'app', 'partials.html'), 'utf8')

export default function Universiteler() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[0] }} />

      <header style={{ padding: '64px 0 26px' }}>
        <div className="wrap">
          <div className="eyebrow">Türk öğrencilerin tercihi</div>
          <h1 style={{ fontFamily: 'Fraunces,serif', fontWeight: 600, fontSize: 52, lineHeight: 1.05, letterSpacing: '-.015em', margin: '18px 0' }}>
            İngiltere'nin en çok tercih edilen<br /><span style={{ color: 'var(--gold)' }}>üniversiteleri, tek bir yerde.</span>
          </h1>
          <p style={{ color: 'var(--mut)', fontSize: 18, maxWidth: 600 }}>
            HESA verilerine göre Türk öğrencilerin İngiltere'de en çok gittiği ilk 50 üniversite — QS sıralaması ve son 3 yıllık öğrenci trendiyle.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 30, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.04)', border: '1px solid var(--line2)', borderRadius: 13, padding: '0 16px', height: 52, color: 'var(--mut2)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#71839e" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              Üniversite veya şehir ara…
            </div>
            <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--line2)', borderRadius: 13, padding: '0 18px', height: 52, display: 'flex', alignItems: 'center', color: 'var(--mut)' }}>Sırala: En çok tercih edilen ▾</div>
          </div>
        </div>
      </header>

      <section className="sec" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '16px 0', marginBottom: 28 }}>
            <span style={{ fontSize: 12, letterSpacing: '.18em', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase' }}>Üniversiteler</span>
            <span style={{ color: 'var(--mut)', fontSize: 14 }}>50 üniversite listeleniyor</span>
          </div>
          <div className="ucards">
            {UNIS.map((u) => (
              <div className="uni" key={u.r}>
                <div className="top">
                  <div className="lg" style={{ background: 'var(--gold-soft)', color: 'var(--gold)', fontFamily: 'Fraunces,serif', fontSize: 18 }}>{u.r}</div>
                  <div><h4>{u.n}</h4><div className="loc">{u.qs === '—' ? 'QS sıralaması yok' : 'QS #' + u.qs} · İngiltere</div></div>
                </div>
                <div className="meta">
                  <span>{u.s} Türk öğrenci</span>
                  <span style={{ color: u.up ? 'var(--gold)' : 'var(--mut2)', fontWeight: 500 }}>{u.up ? '▲' : '→'} {u.tr}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--mut2)', fontSize: 13, marginTop: 28 }}>
            Kaynak: HESA & QS World University Rankings · Öğrenci sayıları 2024/25, 5'in katlarına yuvarlanmıştır.
          </p>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: nav.split('<!--SPLIT-->')[1] }} />
    </>
  )
}
