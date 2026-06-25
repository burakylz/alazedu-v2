export type Section = { h: string; p?: string; list?: string[]; note?: string }
export type Guide = {
  slug: string
  k: string      // küçük etiket
  title: string
  desc: string
  read: string   // okuma süresi
  intro: string
  sections: Section[]
}

export const guides: Guide[] = [
  {
    slug: 'universite-kayit-sureci',
    k: 'Süreç',
    title: 'Üniversite Kayıt Sürecimiz',
    desc: 'Üniversite seçiminden ön kabule, IELTS’ten vizeye kadar adım adım yol haritası.',
    read: '6 dk',
    intro: 'İngiltere’de üniversiteye kayıt, doğru planlandığında oldukça net ilerleyen bir süreçtir. AlazEdu olarak ilk görüşmeden uçağa binene kadar her adımı birlikte yürütüyoruz. Aşağıda süreci adım adım bulabilirsin.',
    sections: [
      { h: '1. Ücretsiz danışmanlık & hedef belirleme', p: 'Önce seninle tanışıyor; bölüm tercihini, akademik notlarını, bütçeni ve hedef şehrini konuşuyoruz. Buna göre sana uygun bir üniversite listesi çıkarıyoruz.' },
      { h: '2. Üniversite ve bölüm seçimi', p: 'Profiline en uygun 3–5 üniversiteyi belirliyoruz. Lisansta genelde UCAS üzerinden 5 tercihe kadar; yüksek lisansta doğrudan üniversiteye başvuru yapılır.' },
      { h: '3. Belgelerin hazırlanması', p: 'Transkript, diploma, niyet mektubu (SOP), referans mektupları ve dil belgesi gibi evrakları birlikte eksiksiz hazırlıyoruz. (Detaylı liste için “Başvuru Belgeleri” rehberine bak.)' },
      { h: '4. Başvuru', p: 'Başvuruları üniversitelere iletiyor, süreç boyunca takibini biz yapıyoruz.' },
      { h: '5. Ön kabul (Conditional Offer)', p: 'Üniversite çoğunlukla şartlı kabul verir: örneğin belirli bir IELTS puanı veya not ortalaması şartı. Bu şartları tamamladığında kabul kesinleşir.' },
      { h: '6. Dil şartı & kesin kabul (Unconditional Offer)', p: 'Gerekli IELTS/dil puanını aldığında ya da pre-sessional dil programını tamamladığında kabul koşulsuz hâle gelir.' },
      { h: '7. CAS belgesi', p: 'Kesin kabulden sonra üniversite vize için gerekli olan CAS (Confirmation of Acceptance for Studies) numarasını verir.' },
      { h: '8. Öğrenci vizesi', p: 'CAS ve finansal belgelerle Student Visa başvurusu yapılır. (Detay için “UK Vize & 28 Gün Kuralı” rehberine bak.)' },
      { h: '9. Konaklama & uçuş', p: 'Yurt veya özel konaklama ayarlanır, uçuş planlanır.' },
      { h: '10. Oryantasyon & sonrası destek', p: 'İngiltere’ye vardığında oryantasyon, banka hesabı ve yerleşim konularında da yanındayız.', note: 'Her öğrencinin süreci farklıdır; kesin adımlar ve tarihler için ücretsiz danışmanlık al.' },
    ],
  },
  {
    slug: 'basvuru-belgeleri',
    k: 'Belgeler',
    title: 'Başvuru Belgeleri',
    desc: 'Lisans ve yüksek lisans başvuruları için eksiksiz belge kontrol listesi.',
    read: '5 dk',
    intro: 'Başvuru belgeleri programa ve seviyeye göre değişir. Aşağıda lisans ve yüksek lisans için en sık istenen belgeleri bulabilirsin. Resmî belgelerin İngilizce çevirisinin gerekebileceğini unutma.',
    sections: [
      { h: 'Lisans başvurusu için', list: [
        'Pasaport (geçerli)',
        'Lise transkripti ve diploması (gerekirse onaylı İngilizce çeviri)',
        'İngilizce dil belgesi (IELTS, PTE, TOEFL vb.) — varsa',
        'Niyet mektubu (Personal Statement / SOP)',
        'Referans mektubu (genelde 1 adet, öğretmen/okul)',
        'CV (bazı programlarda)',
        'Portfolyo (sanat, tasarım, mimarlık gibi bölümlerde)',
      ] },
      { h: 'Yüksek lisans başvurusu için', list: [
        'Pasaport (geçerli)',
        'Lisans diploması ve transkripti (onaylı İngilizce çeviri)',
        'İki referans mektubu (akademik ve/veya iş)',
        'Niyet mektubu (SOP) — neden bu program/üniversite',
        'Güncel CV / özgeçmiş',
        'İngilizce dil belgesi (genelde IELTS 6.5+)',
        'Bazı bölümlerde ek sınav (ör. işletme için GMAT/GRE) veya portfolyo',
      ] },
      { h: 'Pratik notlar', list: [
        'Belgelerin taranmış, net ve okunaklı olması gerekir.',
        'Çeviriler yeminli tercüman tarafından yapılmalıdır.',
        'Niyet mektubunu kopyala-yapıştır değil, sana özel yazmak kabul şansını artırır.',
      ], note: 'Belgelerinin tam listesini ve çeviri gerekip gerekmediğini birlikte netleştirelim — bize ulaş.' },
    ],
  },
  {
    slug: 'uk-vize-28-gun-kurali',
    k: 'Vize',
    title: 'UK Öğrenci Vizesi & 28 Gün Kuralı',
    desc: 'Finansal yeterlilik, banka hesabı kuralları ve güncel yaşam masrafı tutarları.',
    read: '7 dk',
    intro: 'İngiltere’de okumak için Student Visa (öğrenci vizesi) gerekir. Vizenin en kritik kısmı finansal yeterliliktir: belirli bir parayı, başvurudan önce hesabında belirli bir süre tutmuş olman gerekir. İşte detaylar.',
    sections: [
      { h: 'Student Visa nedir?', p: 'Lisansüstü ve lisans gibi uzun süreli programlar için verilen öğrenci vizesidir. Başvurmak için bir üniversiteden CAS belgesi almış olman gerekir.' },
      { h: 'Ne kadar para göstermen gerekir?', p: 'Gösterilmesi gereken tutar = bir yıllık öğrenim ücretinin ödenmemiş kısmı + yaşam masrafı. Yaşam masrafı resmî olarak şu şekilde hesaplanır (en çok 9 ay için):', list: [
        'Londra içi: aylık £1.483 → 9 ay için £13.347',
        'Londra dışı: aylık £1.136 → 9 ay için £10.224',
      ], note: 'Bu tutarlar UK Home Office tarafından belirlenir ve zaman zaman güncellenir; başvuru öncesi gov.uk üzerinden teyit etmek gerekir.' },
      { h: '28 gün kuralı', p: 'Gösterilen paranın, vize başvurusundan önce hesabında kesintisiz 28 gün boyunca durmuş olması gerekir. Yani 28 gün boyunca bakiyenin hiçbir gün gerekli tutarın altına düşmemelidir.' },
      { h: 'Banka belgesi nasıl olmalı?', list: [
        'Banka hesap dökümü/mektubu, başvuru tarihinden en fazla 31 gün öncesine ait olmalı.',
        'Belgede isim, hesap numarası, tarih, banka adı/logosu ve bakiye açıkça görünmeli.',
        'Para senin ya da ebeveynin (velinin onayı + akrabalık belgesiyle) hesabında olabilir.',
      ] },
      { h: 'Diğer gereklilikler', list: [
        'CAS belgesi (üniversiteden)',
        'Geçerli pasaport',
        'İngilizce dil yeterliliği',
        'Tüberküloz (TB) testi — Türkiye dâhil bazı ülkeler için zorunlu',
        'IHS (sağlık sigortası ücreti) ödemesi',
        'Biyometrik (parmak izi + fotoğraf) randevusu',
      ] },
      { h: 'Ne zaman başvurulur?', p: 'Vize başvurusu CAS alındıktan sonra, program başlangıcından en fazla 6 ay önce yapılabilir.', note: 'Vize kuralları sık güncellenir. Sürecin tamamını birlikte, hatasız yürütüyoruz — bize ulaş.' },
    ],
  },
  {
    slug: 'ielts-dil-sartlari',
    k: 'Dil',
    title: 'IELTS & Dil Şartları',
    desc: 'Kabul edilen sınavlar, hedef skorlar ve dil hazırlık seçenekleri.',
    read: '5 dk',
    intro: 'İngiltere’de okumak için İngilizce yeterliliğini belgelemen gerekir. En yaygın sınav IELTS olsa da kabul edilen başka sınavlar da var. Yeterli puanın yoksa bile geçiş yolları mevcut.',
    sections: [
      { h: 'Kabul edilen sınavlar', list: [
        'IELTS Academic (en yaygın) ve vize/pre-sessional için IELTS for UKVI',
        'PTE Academic',
        'TOEFL iBT',
        'Cambridge English (C1 Advanced / C2 Proficiency)',
        'Bazı okullarda Duolingo English Test',
      ] },
      { h: 'Tipik hedef skorlar (IELTS)', list: [
        'Foundation: genelde 4.5 – 5.5',
        'Lisans: genelde 6.0 – 6.5',
        'Yüksek lisans: genelde 6.5 – 7.0',
      ], note: 'Çoğu üniversite her bölümden (reading, writing, listening, speaking) minimum bir puan da ister.' },
      { h: 'IELTS puanın yoksa ne olur?', p: 'İki ana geçiş yolu var: (1) dil okulunda hazırlık alıp ardından sınava girmek, (2) üniversitelerin Pre-sessional English programlarına katılmak. Pre-sessional’ı başarıyla tamamlayan öğrenciler genelde ayrıca IELTS’e girmeden bölüme başlayabilir.' },
      { h: 'IELTS Academic mi, UKVI mı?', p: 'İçerik aynıdır; fark, sınavın resmî gözetim koşullarındadır. Bazı pre-sessional programları ve vize durumları “IELTS for UKVI” ister. Hangisinin gerektiğini başvurudan önce netleştirmek önemlidir.', note: 'Hangi sınav ve hedef skorun sana uygun olduğunu birlikte belirleyelim — bize ulaş.' },
    ],
  },
]

export const guideMap: Record<string, Guide> = Object.fromEntries(guides.map((g) => [g.slug, g]))
