'use strict';

  /* ============================================================
     1. ДАННЫЕ: редкости, кейсы и предметы
     ============================================================ */

  // Редкости: ключ → {название, цвет}
  const RARITY = {
    trash:  { name:'Мусор',        color:'#6C7689' },
    common: { name:'Обычный',      color:'#00E5FF' },
    rare:   { name:'Редкий',       color:'#A3FF00' },
    legend: { name:'Легендарный',  color:'#FF3366' },
    mythic: { name:'Мифический',   color:'#fbbf24' },
  };

  /*
    Кейсы. Каждый предмет: n=имя, v=стоимость (баллы), w=вес выпадения, r=редкость, e=эмодзи.
    Веса подобраны так, чтобы «ожидаемая ценность» кейса ≈ 86% его цены
    (игра остаётся интересной, но с лёгким казино-градусом).
  */
  const CASES = [
    {
      id:'bomzh', name:'Бомж Кейс', price:30, color:'#b45309', icon:'cup',
      tag:'Собран на чердаке бабушки Валентины. Прозрачный зал — гарантирую на слово.',
      items:[
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:28.68, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'FAMAS | Meow 36 (Minimal Wear)', v:15, w:22.06, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1c_M2oaalsM8-QAXWA_uNzv_ZWQyC0nQlp6jvVztaudCnEbAUgDsckFOAJsBLtlN2yP7zqslGMiooXyCX43H8Y5zErvbiVlZtU7g' },
        { n:'SSG 08 | Memorial (Minimal Wear)', v:22, w:15.44, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1I_PX-MJtvMuWHD2uZ0vpJvOhuRz39x0UlsWmEnt37IHyfaFAkWZR5RuALtRKxlYKxMLnn4leL3t5FmSv9ijQJsHj6GwByAQ' },
        { n:'MP9 | Modest Threat (Field-Tested)', v:25, w:11.03, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V6diLP-dFzfB_uNztOh8Qmfixh8mtTuGm9iocXKTbQEjWZAjRbNZshCwm9HvNLy04wPeidhCyX38kGoXua4ClY9d' },
        { n:'StatTrak™ M249 | Bock Blocks (Minimal Wear)', v:38, w:7.72, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8zMK5wi8Ju6uRaqhiI_uAMXeF0_56td5lRi67gVNw4juHnIr_JSmeOwQnXsd1RbZYtkTpkoDjY7nm5Vfci4NDxS__jyoY8G81tOB68LmM' },
        { n:'CZ75-Auto | Midnight Palm (Battle-Scarred)', v:40, w:5.52, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1I_82-aahgH_6aCW-E_uZzsfdwAXDqwktw5mvQzov7dH-RP1J2Asd1FuAM5BS8lNTiZOiz4QXXj4xCyCngznQegViS_YE' },
        { n:'P90 | Traction (Field-Tested)', v:50, w:3.86, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7B_JfGXMWqVxedjva9tF3_lkEpx4DjSn96hcSqWbgIgCsZ1Q-4KtUS5w4blP-Lj7lGN3Y5C02yg2T6bpjdP' },
        { n:'CZ75-Auto | Polymer (Field-Tested)', v:59, w:2.76, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLyhMG1_B1a4s2tcrI_H_2VMWqVxedjva88GHyyxRh_tmTWno2qIC_FZlQmXsZ1Qudes0a8l4DiN-vlsVDY34pA02yg2TwPUpIh' },
        { n:'Desert Eagle | Firebreathing (Field-Tested)', v:85, w:1.77, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_aaHGKS0-t3pOlgQS6MmBgjuiiI1N-qdnyUZgUgXJp3Q-cDshG_lNTkZLjltQ2Pj4pCyiirjXkYv3k6te0cEf1yeTwHsiQ' },
        { n:'StatTrak™ Glock-18 | Sacrifice (Minimal Wear)', v:95, w:0.66, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0' },
        { n:'P250 | Vino Primo (Field-Tested)', v:122, w:0.33, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiVI0OL8PfRSI_iWDWyV09F7teVgWiT9wkt25WvXyN2rdnKSbgRyXpMlReULtxjql4XkY-LhtlCM2YNEn3qr2zQJsHi0fYnaHg' },
        { n:'M4A1-S | Solitude (Field-Tested)', v:140, w:0.17, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8O5hLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d' },
      ],
    },
    {
      id:'pelmeni', name:'Пельмень Прайм', price:50, color:'#f97316', icon:'bowl',
      tag:'Пельмешек с предсказанием: внутри не фарш, а твои адреналиновые надежды.',
      items:[
        { n:'MP9 | Modest Threat (Field-Tested)', v:25, w:28.68, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V6diLP-dFzfB_uNztOh8Qmfixh8mtTuGm9iocXKTbQEjWZAjRbNZshCwm9HvNLy04wPeidhCyX38kGoXua4ClY9d' },
        { n:'P250 | Verdigris (Minimal Wear)', v:30, w:22.06, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiNK0OL8PfRSNvWBCm6X0-dlj-1gSCGn20R35DnRn42udXiVOg91CpZ4ReACthC4wYexZuuw5VeIjdkUzyqq3CNXrnE8Cr6wnKw' },
        { n:'StatTrak™ Glock-18 | Warhawk (Battle-Scarred)', v:38, w:15.44, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-HBnKexetkj-V8XD2MnRgmpSTLzdmhdXySOwcnCpVxQuANtRe7kIDgYurr5lPZjd5DyCWriH5L7X5p5PFCD_QWET8GLw' },
        { n:'M4A1-S | Nitro (Battle-Scarred)', v:41, w:11.03, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcMWiCwOBxtd5oTCq2mwk0jDWAm5ngb3jCZgZ2CJN3QbMC4EG4lIeyP-O34lPbj9pGznmqiCof7n5i4b5UAKQ7uvqACRl2MWo' },
        { n:'StatTrak™ Galil AR | Connexion (Well-Worn)', v:59, w:7.72, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8' },
        { n:'Desert Eagle | Trigger Discipline (Field-Tested)', v:68, w:5.52, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6l4r9KD7KcFcmD8R0QecNtkTsw9HgPrzgtAGMjo0TmX2r2y4duiZutesLBKZ2r6zJz1aWAJe-_z0' },
        { n:'StatTrak™ Dual Berettas | Flora Carnivora (Field-Tested)', v:74, w:3.86, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1Y-s2qfaVhH_WfB3OV0tFzpuhlcC-_mg8mjDCAnobsLGWfPw4hCpJwQuYN40S4xtGyYe7rsQzY2I8Ryn3-jS9Bu31v4-4HVvUk5OSJ2FMPTUdt' },
        { n:'StatTrak™ SSG 08 | Abyss (Field-Tested)', v:90, w:2.76, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1a_s2ibbJkIeSbD2mvzOtyufRkAXCxlk9-t23WnNagIyqWaFd1WZZ0ELRZsxHtk9SzP-iw7gLc2opBy3ngznQeqIWvbC4' },
        { n:'XM1014 | Ziggy (Minimal Wear)', v:124, w:1.77, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMX2Zxulvj-BnTjuwnQQYvzSCkpu3In6XPA4lAsZ5E-JbukWwwd3nY-zn4gLe2thNmCiv2ixK6SZs5ucHVb1lpPO5jVz-xA' },
        { n:'M4A1-S | Solitude (Field-Tested)', v:140, w:0.66, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8O5hLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d' },
        { n:'StatTrak™ Nova | Rising Sun (Minimal Wear)', v:149, w:0.33, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fOReq1-Kf6UMXSFz9F6ueZhW2eyzB9z4WjTzt77JXKVaQcnC5sjTLEMthDpwdzkMr_lsVbW34lGmyj5kGoXuV-iSbwM' },
        { n:'AWP | Phobos (Minimal Wear)', v:225, w:0.17, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf' },
      ],
    },
    {
      id:'musor', name:'Мусорка Фортуны', price:130, color:'#A3FF00', icon:'trash',
      tag:'Мусор, который кто-то хранил тысячу лет. Теперь он твой. Не благодари.',
      items:[
        { n:'StatTrak™ Galil AR | Control (Field-Tested)', v:68, w:28.68, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PWvZK1hH_OcAHOCzuJJo_V7RiK2qhAitzSQl8GqdCmSalcgDsYhQLYOskG5wIfnP-zltFPZ3t5AnHn-j3kduHs65elRT-N7rfTwl0Ej' },
        { n:'SSG 08 | Fever Dream (Field-Tested)', v:79, w:22.06, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6M9eM-VC3GV09FyouRoQha-kBkupjDLw42qIHKRagAmWJR2QORZshK_xNC0Zuy3sVfZgokQzH73j39Bu3tj5fFCD_SStqkeXQ' },
        { n:'StatTrak™ Glock-18 | Sacrifice (Minimal Wear)', v:95, w:15.44, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0' },
        { n:'Glock-18 | Coral Bloom (Factory New)', v:118, w:11.03, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1I4PeReqt-JeOsAm6Xyfo45edtFiyywExztjjdzNegIHuRaVImDpZ3RuJcshDpxtLhNOKw7gbci5UFk3s8sl0gEQ' },
        { n:'StatTrak™ Nova | Rising Sun (Minimal Wear)', v:149, w:7.72, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fOReq1-Kf6UMXSFz9F6ueZhW2eyzB9z4WjTzt77JXKVaQcnC5sjTLEMthDpwdzkMr_lsVbW34lGmyj5kGoXuV-iSbwM' },
        { n:'Five-SeveN | Kami (Field-Tested)', v:208, w:5.52, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1idxOp_pewnTX7izEwl5j_WzdeqIn3CbwRxWJR2ROYOthS-xNThZbvksgza3otDnjK-0H1tAD0p8A' },
        { n:'StatTrak™ Nova | Koi (Minimal Wear)', v:241, w:3.86, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwiFO0PyhfqVSK_-aMWuZxuZi_rBqGCu3xEoksm_SzomhcHiQP1QjD8BxQuAN50TtlIK1Yri05lDeiY5bjXKpu6W3YF0' },
        { n:'StatTrak™ Desert Eagle | Firebreathing (Field-Tested)', v:262, w:2.76, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6_evb6hoH_aaHGKS0-t3pOlgQS6MmBgjuiiI1N-qdnyUZgUgXJp3Q-cDshG_lNTkZLjltQ2Pj4pCyiirjXkYv3k6te0cEf1yeTwHsiQ' },
        { n:'StatTrak™ UMP-45 | Wild Child (Field-Tested)', v:336, w:1.77, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSI_yGGmSY_uV_s-pWQiy3nAgq_T6AyNasJ3iePQByW5NwTeEKsxbqw9LhYePitlbZ34wWxXqsjyhPvy11o7FVOjdBjQA' },
        { n:'StatTrak™ Sawed-Off | Kiss♥Love (Well-Worn)', v:368, w:0.66, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLin4Hl-S1d6c2tfZt-IeeWCmiWx9F9ufJ6QyalkCIqtjmMj4K3IHOfbVQlDsZ0Fu8Pt0S8xNGzMunn4QTagoNGyC_5iHhL7nput70GWb1lpPNuwc0NDw' },
        { n:'AK-47 | Jungle Spray (Battle-Scarred)', v:418, w:0.33, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OG-eqV0H_qGAGCcxNF-teB_Vme2w0oi4zzVmdz8dCjGagIkDMN1RrYOshm6m4DgML7q5FPajYhDzSivkGoXuScz1P4u' },
        { n:'XM1014 | XOXO (Minimal Wear)', v:478, w:0.17, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXeFz-VJvOhuRz39xE8j5GXQztepd3OUOwJ2C5JwELYKsULslobuY-7htlDditkUnyn73zQJsHgY6bTDGg' },
      ],
    },
    {
      id:'street', name:'Дворовый Стиль', price:310, color:'#f97316', icon:'grid',
      tag:'Барахолка у пятиэтажки. Торгуются все, олени в том числе.',
      items:[
        { n:'StatTrak™ Nova | Rising Sun (Minimal Wear)', v:149, w:28.68, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fOReq1-Kf6UMXSFz9F6ueZhW2eyzB9z4WjTzt77JXKVaQcnC5sjTLEMthDpwdzkMr_lsVbW34lGmyj5kGoXuV-iSbwM' },
        { n:'AWP | Phobos (Minimal Wear)', v:225, w:22.06, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf' },
        { n:'Five-SeveN | Kami (Minimal Wear)', v:261, w:15.44, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1icyOl-pK9oGnHnk012sT_XzNv4eXuUawUlDpEkQOIN40XskIHmP-mx4wOLio1B02yg2SJzf1Vk' },
        { n:'StatTrak™ Galil AR | Crimson Tsunami (Field-Tested)', v:287, w:11.03, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0OG-V6NsLPmfMXCR1-tJveRtRjy-20tz52nTy9ypdX_GOFR0DJIiRrVY4ELrl4XuMeqztVfajIwXnn72iHtXrnE8XZr0AZY' },
        { n:'StatTrak™ UMP-45 | Wild Child (Field-Tested)', v:336, w:7.72, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkk4a0qB1Y-s27ZbRSI_yGGmSY_uV_s-pWQiy3nAgq_T6AyNasJ3iePQByW5NwTeEKsxbqw9LhYePitlbZ34wWxXqsjyhPvy11o7FVOjdBjQA' },
        { n:'StatTrak™ AK-47 | Elite Build (Well-Worn)', v:365, w:5.52, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLfGAGmKC2NF7teVgWiT9zEUjt2WEyN-tdy6TbFBxWJZ1QOBZsxfrm4DkM-uzslPX399Hni783zQJsHgxq_XV0g' },
        { n:'AK-47 | Jungle Spray (Battle-Scarred)', v:418, w:3.86, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OG-eqV0H_qGAGCcxNF-teB_Vme2w0oi4zzVmdz8dCjGagIkDMN1RrYOshm6m4DgML7q5FPajYhDzSivkGoXuScz1P4u' },
        { n:'XM1014 | XOXO (Minimal Wear)', v:478, w:2.76, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLpk8ewrHZk7uORcKk8cKHHMXeFz-VJvOhuRz39xE8j5GXQztepd3OUOwJ2C5JwELYKsULslobuY-7htlDditkUnyn73zQJsHgY6bTDGg' },
        { n:'StatTrak™ AWP | Worm God (Factory New)', v:668, w:1.77, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0' },
        { n:'P250 | Asiimov (Field-Tested)', v:1046, w:0.66, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSIeOaB2qf19F7teVgWiT9wxx36mWHzIuseXnCOlUgXsclQONf5Bi4x4bhNru34VPejdgXyS3-3DQJsHj2UM_3gw' },
        { n:'P2000 | Wicked Sick (Factory New)', v:1083, w:0.33, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw' },
        { n:'Dual Berettas | Hemoglobin (Field-Tested)', v:1095, w:0.17, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL0kp_0-B1a4s2he7dkJumsHGKU_uNztOh8Qme2lxsj4TjdntugIi2WZwAgWJojE7ML5xjukYbuPum2tleNg99NxSn2kGoXuSy1xkxW' },
      ],
    },
    {
      id:'neon', name:'Неон Форт', price:1000, color:'#00E5FF', icon:'diamonds',
      tag:'Автоматы уже посчитали твой банкролл. Они не считают себя должными вежливыми.',
      items:[
        { n:'Glock-18 | Mirror Mosaic (Field-Tested)', v:510, w:28.68, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c4_2tY5tgKeKBAXWvzO9std5_HRajkBw1vwKIn4vwNCaJagYiWJFzQ-cOuhC6w93lYby34wHb39oXmSz2iyhAvS9usexRUKcm-rqX0V-HCRcuyA' },
        { n:'Glock-18 | Vogue (Minimal Wear)', v:538, w:22.06, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY' },
        { n:'StatTrak™ Nova | Rising Sun (Factory New)', v:621, w:15.44, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL_kYDhwixU-fOReq1-Kf6UMXSFz9F6ueZhW2eyzB9z4WjTzt77JXKVaQcnC5sjTLEMthDpwdzkMr_lsVbW34lGmyj5kGoXuV-iSbwM' },
        { n:'StatTrak™ AWP | Worm God (Factory New)', v:668, w:11.03, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0' },
        { n:'SSG 08 | Turbo Peek (Field-Tested)', v:1433, w:7.72, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6NSL-aWHHORyutJveRtRjy-20pz5DzRnoqucy-ePAR0CMAjRrYOsRe6wYLgMevh4wKL3o0TxC2s3H5XrnE8_hLO63A' },
        { n:'StatTrak™ MP7 | Smoking Kills (Field-Tested)', v:1436, w:5.52, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8jsHf8DIM0OGjZ69kLvesBW6czf1JprNWQiy3nAgq_TjSyIn8cy2eb1UjW5p4R-JeuhC_xIC1P-zn7wOIjItCn3383Hgf6n11o7FVl5bdg0g' },
        { n:'Tec-9 | Decimator (Field-Tested)', v:1514, w:3.86, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLlm5W5wiVI0Oara_1SJPWQB2qR1eFkj-xsSyCmmFMk6zzVnIqpJC2UbAd2CZF3EOYPtRe9kNThMey0s1GK3Y5CzS_7hy1B8G81tL7z0l3A' },
        { n:'M4A1-S | Decimator (Minimal Wear)', v:1666, w:2.76, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JtORqRiSygRI1jDGMnYftb3iUb1dxW5ImFLNftxCxktflZLm2tgaP2otGyn_-hytOvy9q5elQV_A7uvqA6CRSoZY' },
        { n:'★ Survival Knife | Boreal Forest (Battle-Scarred)', v:4184, w:1.77, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tlOc-VAXWV0vpJsu57Sii_qhUisiuc1Nz8JSrEaQIhCJV0QuEJ5kGxwdbuZe-z51Ddio4Xzy383Xgc5ixpsekcEf1y0FjIJTY' },
        { n:'M4A1-S | Vaporwave (Field-Tested)', v:4586, w:0.66, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_3HDzaD_vh3oO57WCilkCIqtjmMj4K3d3OWbVIkW5p4R7YDu0PrlIHjYbyzsweKi49GmC3_2n8b5yY_6-sAVL1lpPOGYu6esg' },
        { n:'★ Navaja Knife | Blue Steel (Minimal Wear)', v:5614, w:0.33, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWTSWmkBkYvzSCkpu3JCqUaFIjCpV4ReAD50S9w4bgZO7h4Vba399DmC36jHlI6yo_tr0LB71lpPNA0Lycxg' },
        { n:'★ Huntsman Knife | Freehand (Battle-Scarred)', v:6536, w:0.17, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1P7vG6YadsLM-SA1idwPx9teVWWjmMzE0YuziEjJa3dC3EPQAgCZF3R-9Yt0W9kNbkN-_htgeKg9pBzCv-2HhM7Xti5L0GVr1lpPMKnW3UEw' },
      ],
    },
    {
      id:'garazh', name:'Гараж Миллиардера', price:3500, color:'#22c55e', icon:'wrench',
      tag:'Инструменты настоящие. Миллионер — виртуальный. Как и твои баллы.',
      items:[
        { n:'P2000 | Wicked Sick (Factory New)', v:1083, w:28.68, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL5lYayrXIL0PG7V7Q_cKDDMWOVwuJ_vuRWQyC0nQlp4jnTyNqodHyXOlQkDZtzF-UN4BjukYeyZuLn5Qbaj4NEzy3_3ywd5zErvbh-3lU8Iw' },
        { n:'SSG 08 | Turbo Peek (Field-Tested)', v:1433, w:22.06, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLijZGwpR1Y-s29e6NSL-aWHHORyutJveRtRjy-20pz5DzRnoqucy-ePAR0CMAjRrYOsRe6wYLgMevh4wKL3o0TxC2s3H5XrnE8_hLO63A' },
        { n:'StatTrak™ AWP | Atheris (Minimal Wear)', v:1440, w:15.44, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo' },
        { n:'M4A1-S | Decimator (Minimal Wear)', v:1666, w:11.03, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JtORqRiSygRI1jDGMnYftb3iUb1dxW5ImFLNftxCxktflZLm2tgaP2otGyn_-hytOvy9q5elQV_A7uvqA6CRSoZY' },
        { n:'★ Kukri Knife | Urban Masked (Field-Tested)', v:4403, w:7.72, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-HD3eV_vtksuBncCS2kRQyvnODw9r8cHjEalckXMR3TbYLuhi8lN2yP-zhsw3c2o8Uny723Swd6no-_a9cBqiVIvRG' },
        { n:'★ Navaja Knife | Blue Steel (Minimal Wear)', v:5614, w:5.52, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWTSWmkBkYvzSCkpu3JCqUaFIjCpV4ReAD50S9w4bgZO7h4Vba399DmC36jHlI6yo_tr0LB71lpPNA0Lycxg' },
        { n:'★ StatTrak™ Survival Knife | Damascus Steel (Minimal Wear)', v:6715, w:3.86, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-XD2qR0u1jo95lRi67gVNw6myGnN6teHyTbFV1DMQhTeFYsBa7xtHhZb-z5gfejN4Un3-si3wf8G81tKX6O3VS' },
        { n:'★ StatTrak™ Classic Knife | Forest DDPAT (Battle-Scarred)', v:8550, w:2.76, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SJPSDD3Ovyet3pvgnHiq1whsmtmXRwtj6JHmWP1J1W5R0FOZcukTrwNfgN-izs1Pd3YJByDK-0H0Pqdb3Nw' },
        { n:'M4A4 | Hellfire (Minimal Wear)', v:14452, w:1.77, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSKPWfAmGZ0-tJvOhuRz39zEp24GTXmImsInqWP1AkXpBwE7FetUTswdfkPu7h5QXXithBy32t2DQJsHhDPmtuAA' },
        { n:'★ StatTrak™ Stiletto Knife | Damascus Steel (Factory New)', v:26011, w:0.66, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iUwON3o-J8XBajhxQ0vjy6lob-KT-JZw52XpsiQuADtxjsm4GxPum37lSLjINBni7-iS1K7S9v5OkAUKIlq7qX0V-S_V0ZqQ' },
        { n:'★ StatTrak™ Karambit | Freehand (Well-Worn)', v:64393, w:0.33, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx9teVWWjmMkxQptgKIn4vwNCaJblMnXJV2QrFY5xDtkIexNOm05FHf2Y1NnimtjSxN6yhp4u0LBacjqLqX0V-sadF3yw' },
        { n:'★ Karambit | Stained (Field-Tested)', v:71911, w:0.17, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iWzvx1teVWQiy3nAgq_WzRzIyvJy6QOwAkCJN4Re8D4EK4lNbuMbmxtQePjokRxCSq2yJA6Sl1o7FVSPbGsq0' },
      ],
    },
    {
      id:'royal', name:'Алмазный Король', price:11000, color:'#FF3366', icon:'crown',
      tag:'Корона в комплект не входит, но вести себя по-королевски заставит.',
      items:[
        { n:'★ Navaja Knife | Blue Steel (Minimal Wear)', v:5614, w:28.68, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJsfBWTSWmkBkYvzSCkpu3JCqUaFIjCpV4ReAD50S9w4bgZO7h4Vba399DmC36jHlI6yo_tr0LB71lpPNA0Lycxg' },
        { n:'★ StatTrak™ Survival Knife | Damascus Steel (Minimal Wear)', v:6715, w:22.06, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-XD2qR0u1jo95lRi67gVNw6myGnN6teHyTbFV1DMQhTeFYsBa7xtHhZb-z5gfejN4Un3-si3wf8G81tKX6O3VS' },
        { n:'★ StatTrak™ Kukri Knife | Urban Masked (Minimal Wear)', v:7490, w:15.44, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q-vm8YZt-MM-HD3eV_vtksuBncCW6khUz_W2GmdupJ3mfPA8jW5ZwR-QN4UKxmtOyN7y25lfW2YtNziX8jCtN7Xp1o7FVXby906g' },
        { n:'★ StatTrak™ Classic Knife | Forest DDPAT (Battle-Scarred)', v:8550, w:11.03, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y_OGRYL1SJPSDD3Ovyet3pvgnHiq1whsmtmXRwtj6JHmWP1J1W5R0FOZcukTrwNfgN-izs1Pd3YJByDK-0H0Pqdb3Nw' },
        { n:'StatTrak™ SG 553 | Ultraviolet (Factory New)', v:8641, w:7.72, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA' },
        { n:'AK-47 | Fuel Injector (Well-Worn)', v:9001, w:5.52, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-WDC3WTye9kt-RtcCS2kRQyvnPczdutIHzCPQ52DZV2TbIOshG7ltOyM7vg71GPioMUmHr6iyxJ6C5o_a9cBpypIj3h' },
        { n:'★ Navaja Knife | Ultraviolet (Factory New)', v:16041, w:3.86, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1c9uK9cZtnIfOYBWmZx-tJo-5WXzyhhREijDGMnYftby3FOgUhAsYjTeZetBm4xtXkNbiw5lPbi9pGxCr92itB7C9q4ekDU6c7uvqA74P7bNU' },
        { n:'★ StatTrak™ Stiletto Knife | Damascus Steel (Factory New)', v:26011, w:2.76, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iUwON3o-J8XBajhxQ0vjy6lob-KT-JZw52XpsiQuADtxjsm4GxPum37lSLjINBni7-iS1K7S9v5OkAUKIlq7qX0V-S_V0ZqQ' },
        { n:'★ StatTrak™ Karambit | Ultraviolet (Field-Tested)', v:61085, w:1.77, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AAViA1PxmvORWQiy3nAgq_WyAmYqtIn-ebABzDMElRORYt0W9l92zNrzk4Q3YiopNn3n7inlA7X11o7FVJz6p7dU' },
        { n:'★ StatTrak™ Karambit | Freehand (Well-Worn)', v:64393, w:0.66, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx9teVWWjmMkxQptgKIn4vwNCaJblMnXJV2QrFY5xDtkIexNOm05FHf2Y1NnimtjSxN6yhp4u0LBacjqLqX0V-sadF3yw' },
        { n:'★ Karambit | Black Laminate (Well-Worn)', v:67277, w:0.33, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-QG1ibwPx3vd56Wya9kAomoDW6l4r9KD7KcAdyCZcjEecDu0G7k4DlN-rlswfZjo5DyCSt2Cgf6ChssLsHUfEsrqLJz1aWM9kY8Bw' },
        { n:'★ Karambit | Stained (Field-Tested)', v:71911, w:0.17, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iWzvx1teVWQiy3nAgq_WzRzIyvJy6QOwAkCJN4Re8D4EK4lNbuMbmxtQePjokRxCSq2yJA6Sl1o7FVSPbGsq0' },
      ],
    },
    {
      id:'black', name:'Чёрный Ящик', price:8000, color:'#a855f7', icon:'skull',
      tag:'Откроешь — расскажешь внукам. Не откроешь — будешь просто человеком с мечтой.',
      items:[
        { n:'StatTrak™ AWP | Atheris (Minimal Wear)', v:1440, w:28.68, r:'rare', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo' },
        { n:'AK-47 | Legion of Anubis (Minimal Wear)', v:3301, w:22.06, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY' },
        { n:'StatTrak™ FAMAS | Bad Trip (Minimal Wear)', v:5040, w:15.44, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3n5vh7h1d7v-ve5tvIfSHHG6A_uJ_t-l9AX6xzExytWndzdj6eCrGb1MkWZB2TOBc4xK8mtHkZezrsQOPjoITyi_gznQezHhrR0c' },
        { n:'★ StatTrak™ Survival Knife | Damascus Steel (Minimal Wear)', v:6715, w:11.03, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Y7vyne5tsMc-XD2qR0u1jo95lRi67gVNw6myGnN6teHyTbFV1DMQhTeFYsBa7xtHhZb-z5gfejN4Un3-si3wf8G81tKX6O3VS' },
        { n:'★ Nomad Knife | Rust Coat (Battle-Scarred)', v:8538, w:7.72, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1U-uaqZ6t_H_GCMXSExOt6j-pnRi-2qhUisiuc1Nz8eS3BbgMgXpNzFLNYsUXqltPlYr7kslPXidpCmH-viylB6n1u4bocEf1ytubkyVg' },
        { n:'StatTrak™ SG 553 | Ultraviolet (Factory New)', v:8641, w:5.52, r:'legend', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1I4M2-fbZ9LPWsAm6Xyfo44bQ-Tn7gwRt-t2uAw96tIn7FOAF1CsckQLUJ4xXskdO2NLzrtAyIi5UFk3tU_MwgmA' },
        { n:'M4A4 | Hellfire (Minimal Wear)', v:14452, w:3.86, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSKPWfAmGZ0-tJvOhuRz39zEp24GTXmImsInqWP1AkXpBwE7FetUTswdfkPu7h5QXXithBy32t2DQJsHhDPmtuAA' },
        { n:'★ StatTrak™ Stiletto Knife | Damascus Steel (Factory New)', v:26011, w:2.76, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1I-_uibbB5L8-SH1iUwON3o-J8XBajhxQ0vjy6lob-KT-JZw52XpsiQuADtxjsm4GxPum37lSLjINBni7-iS1K7S9v5OkAUKIlq7qX0V-S_V0ZqQ' },
        { n:'★ StatTrak™ Karambit | Ultraviolet (Field-Tested)', v:61085, w:1.77, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-AAViA1PxmvORWQiy3nAgq_WyAmYqtIn-ebABzDMElRORYt0W9l92zNrzk4Q3YiopNn3n7inlA7X11o7FVJz6p7dU' },
        { n:'★ StatTrak™ Karambit | Freehand (Well-Worn)', v:64393, w:0.66, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1idwPx9teVWWjmMkxQptgKIn4vwNCaJblMnXJV2QrFY5xDtkIexNOm05FHf2Y1NnimtjSxN6yhp4u0LBacjqLqX0V-sadF3yw' },
        { n:'★ Karambit | Black Laminate (Well-Worn)', v:67277, w:0.33, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-QG1ibwPx3vd56Wya9kAomoDW6l4r9KD7KcAdyCZcjEecDu0G7k4DlN-rlswfZjo5DyCSt2Cgf6ChssLsHUfEsrqLJz1aWM9kY8Bw' },
        { n:'★ Karambit | Stained (Field-Tested)', v:71911, w:0.17, r:'mythic', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SH1iWzvx1teVWQiy3nAgq_WzRzIyvJy6QOwAkCJN4Re8D4EK4lNbuMbmxtQePjokRxCSq2yJA6Sl1o7FVSPbGsq0' },
      ],
    },
    {
      id:'avito', name:'Кейс Авито', price:80, color:'#7DD3FC', icon:'grid', crate:'chest',
      tag:'Выкуплено с рук. История обслуживания: «позвонишь — расскажу».',
      items:[
        { n:'MAC-10 | Stalker (Factory New)', v:620, w:0.910, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-AGmacyutkj-1gSCGn20V0t27Tw974Jy-WOg9yW8N3QOQDsxG4x9O0ZOPqtgHZ399HzST8ji9XrnE8CxAHwFY' },
        { n:'SG 553 | Cyberforce (Field-Tested)', v:850, w:1.000, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV0-h5ouJscCW6khUz_Wjdntr6Iy6WbgEjA5MlRedctxG5kNKyNbi3sgTfi9oUnyj9234b5n51o7FVairOMAY' },
        { n:'P250 | See Ya Later (Field-Tested)', v:520, w:0.863, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-1gSCGn2x9ytmzWnN6pInjGOwMlDZp0EORe5BHsx93lP7zr5wzbiI5AyXr_jS9XrnE8gQrIgng' },
        { n:'M4A4 | The Emperor (Field-Tested)', v:2100, w:1.312, r:'rare', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd' },
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:47.114, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'MP9 | Modest Threat (Field-Tested)', v:25, w:22.615, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8js_f-jFk4uL3V6diLP-dFzfB_uNztOh8Qmfixh8mtTuGm9iocXKTbQEjWZAjRbNZshCwm9HvNLy04wPeidhCyX38kGoXua4ClY9d' },
        { n:'StatTrak™ Glock-18 | Warhawk (Battle-Scarred)', v:38, w:14.878, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-HBnKexetkj-V8XD2MnRgmpSTLzdmhdXySOwcnCpVxQuANtRe7kIDgYurr5lPZjd5DyCWriH5L7X5p5PFCD_QWET8GLw' },
        { n:'P90 | Traction (Field-Tested)', v:50, w:11.307, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7B_JfGXMWqVxedjva9tF3_lkEpx4DjSn96hcSqWbgIgCsZ1Q-4KtUS5w4blP-Lj7lGN3Y5C02yg2T6bpjdP' },
      ],
    },
    {
      id:'clava', name:'Шкаф Бабушки Клавы', price:280, color:'#E879F9', icon:'gift', crate:'crate',
      tag:'Там шуба, валидол и гарантия «сами ломались, но вы не при делах».',
      items:[
        { n:'Five-SeveN | Hyper Beast (Field-Tested)', v:1050, w:4.723, r:'rare', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw' },
        { n:'M4A4 | The Emperor (Field-Tested)', v:2100, w:5.815, r:'rare', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd' },
        { n:'MAC-10 | Stalker (Factory New)', v:620, w:4.033, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1c_M2jaac8cM-AGmacyutkj-1gSCGn20V0t27Tw974Jy-WOg9yW8N3QOQDsxG4x9O0ZOPqtgHZ399HzST8ji9XrnE8CxAHwFY' },
        { n:'P250 | See Ya Later (Field-Tested)', v:520, w:3.825, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwiFO0OL8PfRSI-mRC3WT0-F1j-1gSCGn2x9ytmzWnN6pInjGOwMlDZp0EORe5BHsx93lP7zr5wzbiI5AyXr_jS9XrnE8gQrIgng' },
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:50.417, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'StatTrak™ Glock-18 | Warhawk (Battle-Scarred)', v:38, w:15.921, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1c_M2pZKtuK8-HBnKexetkj-V8XD2MnRgmpSTLzdmhdXySOwcnCpVxQuANtRe7kIDgYurr5lPZjd5DyCWriH5L7X5p5PFCD_QWET8GLw' },
        { n:'Desert Eagle | Trigger Discipline (Field-Tested)', v:68, w:8.897, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6l4r9KD7KcFcmD8R0QecNtkTsw9HgPrzgtAGMjo0TmX2r2y4duiZutesLBKZ2r6zJz1aWAJe-_z0' },
        { n:'StatTrak™ Glock-18 | Sacrifice (Minimal Wear)', v:95, w:6.368, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0' },
      ],
    },
    {
      id:'divan', name:'Кейс Просиженного Дивана', price:700, color:'#F97316', icon:'box', crate:'chest',
      tag:'Продаётся с 2019. Торг уместен. Дивана уже нет.',
      items:[
        { n:'AK-47 | Neon Rider (Minimal Wear)', v:3200, w:7.218, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA' },
        { n:'AWP | Fever Dream (Field-Tested)', v:3400, w:7.351, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg' },
        { n:'SG 553 | Cyberforce (Field-Tested)', v:850, w:4.850, r:'common', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLimcO1qx1Y-s29b_E4c8-QF2WV0-h5ouJscCW6khUz_Wjdntr6Iy6WbgEjA5MlRedctxG5kNKyNbi3sgTfi9oUnyj9234b5n51o7FVairOMAY' },
        { n:'Five-SeveN | Hyper Beast (Field-Tested)', v:1050, w:5.167, r:'rare', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRa7FSJvmFC3SV1-t4j-lwXyyhlxgmoCm6lob-KT-JO1QgWZVyELEPu0W4l9KzYbzn5Fbf3YkTzn_8hihIvXxtsOoFUKYirLqX0V_f6-eqCw' },
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:53.399, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'P90 | Traction (Field-Tested)', v:50, w:12.816, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhx8bf-jFk_6v-V7B_JfGXMWqVxedjva9tF3_lkEpx4DjSn96hcSqWbgIgCsZ1Q-4KtUS5w4blP-Lj7lGN3Y5C02yg2T6bpjdP' },
        { n:'StatTrak™ Glock-18 | Sacrifice (Minimal Wear)', v:95, w:6.745, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-bC3Wf_uJ_t-l9AXHixRlytW7Ty4queH_DZlMlX5UjF-dZsUPqk9LhY-Lk5waMjdlCmSzgznQeEFBQhB0' },
        { n:'Five-SeveN | Kami (Minimal Wear)', v:261, w:2.455, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1icyOl-pK9oGnHnk012sT_XzNv4eXuUawUlDpEkQOIN40XskIHmP-mx4wOLio1B02yg2SJzf1Vk' },
      ],
    },
    {
      id:'seif', name:'Сейф Чиновника', price:2400, color:'#94A3B8', icon:'target', crate:'safe',
      tag:'Задекларирован как «мебель». Содержимое в декларацию не поместилось.',
      items:[
        { n:'AK-47 | Redline (Field-Tested)', v:3200, w:3.269, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA' },
        { n:'USP-S | Kill Confirmed (Minimal Wear)', v:4200, w:3.547, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uV_vO1WTCa9kxQ1vjiBpYPwJiPTcFB2Xpp5TO5cskG9lYCxZu_jsVCL3o4Xnij23ClO5ik9tegFA_It8qHJz1aWe-uc160' },
        { n:'AWP | Wildfire (Field-Tested)', v:5600, w:3.866, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7NkLPSVB3WV_uJ_t-l9AX7rxhl-tmzSwomtdC6TPwQnW5UkR-YD5kK-ltCzP-Ox4FfXiNoQyyrgznQeu9L0PzQ' },
        { n:'AK-47 | Vulcan (Minimal Wear)', v:6800, w:4.098, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8' },
        { n:'M4A1-S | Printstream (Minimal Wear)', v:10500, w:4.669, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs' },
        { n:'AWP | Asiimov (Field-Tested)', v:11500, w:4.798, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ' },
        { n:'M4A4 | Asiimov (Field-Tested)', v:6200, w:3.986, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6V6V-Kf2cGFidxOp_pewnTii3w0x_tmTRnt2qdHyWaFAjA5UlQOYI5BO5k9bhZunm41OI34NDnjK-0H3pAWw_Rw' },
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:54.459, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'StatTrak™ Galil AR | Connexion (Well-Worn)', v:59, w:11.077, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PW9V6NsLPmfMXeYzut4uflWQiy3nAgq_WyEmd3_cSqVbgV1D5J3QrEPskW9mtLiPu7k7wWL2owQnyT6hn8YvX11o7FVmll_Ct8' },
        { n:'M4A1-S | Solitude (Field-Tested)', v:140, w:4.668, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcDW-vzOFjvvVoRiegqhBzsmyWpYL8JSLSMxgmXJB5Qe8O5hLrkoDlNOix5wTcg4JHzXr5inxJvy5vtr4CV6Ytq63fkUifZonb9V4d' },
        { n:'AK-47 | Jungle Spray (Battle-Scarred)', v:418, w:1.563, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OG-eqV0H_qGAGCcxNF-teB_Vme2w0oi4zzVmdz8dCjGagIkDMN1RrYOshm6m4DgML7q5FPajYhDzSivkGoXuScz1P4u' },
      ],
    },
    {
      id:'tort', name:'Торт Премиальных Овец', price:6000, color:'#FBBF24', icon:'gems', crate:'gem',
      tag:'Десерт, который так и не съели. Внутри — всё лучшее сразу.',
      items:[
        { n:'M4A1-S | Printstream (Minimal Wear)', v:10500, w:0.588, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs' },
        { n:'AWP | Asiimov (Field-Tested)', v:11500, w:0.604, r:'legend', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ' },
        { n:'Desert Eagle | Blaze (Factory New)', v:36000, w:0.851, r:'mythic', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7vORbqhsLfWAMWuZxuZi_uI_TX6wxxkjsGXXnImsJ37COlUoWcByEOMOtxa5kdXmNu3htVPZjN1bjXKpkHLRfQU' },
        { n:'★ Talon Knife | Doppler (Factory New)', v:92000, w:1.128, r:'mythic', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1M5vahf6lsK_WBMWad_ux6seJiXyyyhxEYvjyXmIP8KDHCOml8U8UoAfkC4UbuldyzNOy35lHc3opEyS2qhiocvHs_5bsHVPIgq_bQhgrBM7w9_9Bdc1T7Obpq' },
        { n:'★ Karambit | Doppler (Factory New)', v:108000, w:1.184, r:'mythic', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuRLQPsBawkNfiMbnl5AKMiopCnin7iCJBv31j4rkBBKEg-6zUjV3GY6p9v8dpLWT3Fg' },
        { n:'★ Butterfly Knife | Doppler (Factory New)', v:118000, w:1.215, r:'mythic', img:'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qvw-J3s-p5SiihmSIqsi-HlorwOy7DAVRPVssnHaMUuhe9xIHlMuvqtgPf2IoTyC383Sod7CY-sr4DVfZ2qKPU3g-TNuE-545DeqjFvb87vg' },
        { n:'★ M9 Bayonet | Doppler (Factory New)', v:85000, w:1.102, r:'mythic', img:'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj2P7rSnXtU6dd9teTA5475jV2urhcDPzCkfMKLcAE-aV3R-lO5l-e61sfqvZ2fyiBgvikqsXiMyRGw1U1Ja-dm06adSULeWfJvEZCxug' },
        { n:'MAC-10 | Acid Hex (Factory New)', v:12, w:74.278, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1T9veRb7ZoJf6sDWadztF6ueZhW2fhw09_6mjSw9r4cy6RPVV1DZZwE7UI4xDsl9CyNuvi4gHf2o1NnH7-kGoXuXqvgvHX' },
        { n:'Desert Eagle | Trigger Discipline (Field-Tested)', v:68, w:13.108, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-HHG6Xxutkj-VgXCq6hREuvTi6l4r9KD7KcFcmD8R0QecNtkTsw9HgPrzgtAGMjo0TmX2r2y4duiZutesLBKZ2r6zJz1aWAJe-_z0' },
        { n:'Five-SeveN | Kami (Field-Tested)', v:208, w:4.285, r:'trash', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL3l4Dl7idN6vyRYL1SK_GeB1idxOp_pewnTX7izEwl5j_WzdeqIn3CbwRxWJR2ROYOthS-xNThZbvksgza3otDnjK-0H1tAD0p8A' },
        { n:'Glock-18 | Vogue (Minimal Wear)', v:538, w:1.657, r:'common', img:'https://community.cloudflare.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK8-WF2KTzuBiseJ9cCW6khUz_T-GyNavdCqRawN1CMFwTOcO5hO7loXiY-zmsQKPi44QzHj22ikcvy11o7FVfFOBmfY' },
      ],
    },
];

  /* ============================================================
     2. СОСТОЯНИЕ (localStorage)
     ============================================================ */

  const STORAGE_KEY = 'proebdrop_save_v2';
  const START_BONUS  = 1000;               // стартовый бонус новичку
  const DAILY_AMOUNT = 500;                // размер ежедневного бонуса
  const DAILY_MS     = 24 * 60 * 60 * 1000; // интервал — 24 часа
  const MAX_UP_ITEMS = 6;                  // максимум предметов в ставке апгрейдера
  const MAX_LIVE     = 12;                 // сколько дропов видно в live-ленте
  const MAX_HISTORY  = 40;                 // сколько дропов храним в истории

  function defaultState() {
    return {
      balance: START_BONUS,
      seq: 0,          // счётчик id предметов
      lastDaily: 0,    // timestamp последнего забранного ежедневного бонуса
      inventory: [],   // [{ id, name, value, rarity, emoji, img }]
      fast: false,     // быстрый режим прокрутки рулетки
      sound: true,     // звуки включены (кнопка в шапке)
      drops: [],       // история дропов [{ ts, name, value, rarity, emoji }]
      steamTries: 0,   // сколько раз ты пытался вывести баллы в Steam
      stats: { opened: 0, upgrades: 0, upWins: 0, best: { value: 0, name: null } },
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s && typeof s.balance === 'number') {
          // мягкая миграция: старые сохранения не должны ронять игру
          const d = defaultState();
          s.balance   = Number.isFinite(s.balance) ? s.balance : START_BONUS;
          s.seq       = Number.isFinite(s.seq) ? s.seq : 0;
          s.inventory = Array.isArray(s.inventory) ? s.inventory.filter(i => i && i.id != null) : [];
          s.stats     = Object.assign({}, d.stats, s.stats || {});
          s.stats.best = Object.assign({}, d.stats.best, s.stats.best || {});
          ['opened', 'upgrades', 'upWins'].forEach(k => {
            if (!Number.isFinite(s.stats[k])) s.stats[k] = 0;
          });
          if (!Number.isFinite(s.stats.best.value)) s.stats.best.value = 0;
          s.drops     = Array.isArray(s.drops) ? s.drops.filter(x => x && RARITY[x.rarity]) : [];
          s.lastDaily = Number.isFinite(s.lastDaily) ? s.lastDaily : 0;
          s.steamTries = Number.isFinite(s.steamTries) ? s.steamTries : 0;
          s.fast = !!s.fast;
          s.sound = s.sound !== false;
          return s;
        }
      }
    } catch (e) { console.warn('Не удалось прочитать сохранение:', e); }
    return defaultState();
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn('Не удалось сохранить:', e); }
  }

  let state = loadState();

  /* ============================================================
     3. УТИЛИТЫ
     ============================================================ */

  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const fmt = (n) => Math.round(n).toLocaleString('ru-RU');

  // Выбор предмета с учётом весов
  function weightedPick(items) {
    let r = Math.random() * items.reduce((s, i) => s + i.w, 0);
    for (const it of items) { r -= it.w; if (r <= 0) return it; }
    return items[items.length - 1];
  }

  // «Только что / 5 мин назад / вчера 21:04»
  function timeAgo(ts) {
    const d = Date.now() - ts;
    if (d < 60_000) return 'только что';
    const m = Math.floor(d / 60_000);
    if (m < 60) return m + ' мин назад';
    const h = Math.floor(m / 60);
    if (h < 24) return h + ' ч назад';
    const days = Math.floor(h / 24);
    return days === 1 ? 'вчера' : days + ' дн назад';
  }

  /* ---------- SVG-иконки (ваниль, без эмодзи и библиотек) ---------- */
  const ICONS = {
    gift:      '<path d="M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z"/><path d="M12 11v10"/><path d="M12 11c-2.5 0-4.5-1-4.5-3S9 5.5 12 8c3-2.5 4.5-2 4.5 0S14.5 11 12 11Z"/><path d="M12 11c2.5 0 4.5-1 4.5-3S15 5.5 12 8c-3-2.5-4.5-2-4.5 0S9.5 11 12 11Z"/>',
    box:       '<path d="M3 8h18v12H3V8Z"/><path d="m3 8 2-4h14l2 4"/><path d="M10 12h4"/>',
    bolt:      '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    user:      '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
    knife:     '<path d="M14 3l7 7-9 9-5 2-2-2 2-5Z"/><path d="m9 15 6-6"/>',
    glove:     '<path d="M6 12V6a2 2 0 0 1 4 0v5h1V4a2 2 0 0 1 4 0v7h1V6a2 2 0 0 1 4 0v9a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-4Z"/>',
    flame:     '<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 .8-3.4 2-5 .6 1.2 1.4 2 2.5 2.4C11 7.5 11.5 5 12 3Z"/>',
    skull:     '<path d="M12 3a7 7 0 0 0-7 7c0 2.5 1.2 4.2 3 5.4V19h8v-3.6c1.8-1.2 3-2.9 3-5.4a7 7 0 0 0-7-7Z"/><circle cx="9" cy="10.5" r="1.3"/><circle cx="15" cy="10.5" r="1.3"/><path d="M10 19v2M14 19v2"/>',
    plane:     '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
    check:     '<path d="m4.5 12.5 5 5L20 7"/>',
    clock:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
    dice:      '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><circle cx="8.5" cy="8.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/>',
    rocket:    '<path d="M12 3c4 2 6 6 6 10l-3 3h-6l-3-3c0-4 2-8 6-10Z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 16c-1 1.5-3 2-3 5 3 0 4.5-1 6-2.5"/>',
    star:      '<path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.5l-5.2 2.7 1-5.9L3.5 9.2l5.9-.8L12 3Z"/>',
    target:    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2"/>',
    cart:      '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 12h10.2l2.4-9H6"/>',
    crown:     '<path d="m4 17-1-9 5 3.5L12 5l4 6.5L21 8l-1 9H4Z"/><path d="M5 21h14"/>',
    wrench:    '<path d="M14.8 4.2a5.5 5.5 0 0 0-7 6.7L3 15.6 8.4 21l4.7-4.8a5.5 5.5 0 0 0 6.7-7l-3.1 3.1-2.5-2.5 3.1-3.1Z"/>',
    trash:     '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m6 7 1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
    grid:      '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    diamonds:  '<path d="M12 2 20 12 12 22 4 12Z"/><path d="M12 2v20M4 12h16"/>',
    cup:       '<path d="M4 8h12v6a6 6 0 0 1-12 0V8Z"/><path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16"/><path d="M5 21h10"/><path d="M8 3.5c1.5-2 4-1 4 1"/>',
    bowl:      '<path d="M4 12h16a8 8 0 0 1-4 7h-8a8 8 0 0 1-4-7Z"/><path d="M8 8c1.5-2 4-2 5 0 1-1.5 3.5-1.5 4-.5"/><path d="m7 21-1 1M17 21l1 1"/>',
    coins:     '<circle cx="9" cy="9" r="5"/><path d="M14.5 6.5a5 5 0 1 1-8 5"/><path d="M7 9h4M9 7v4"/>',
    hand:      '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5m0-6a1.5 1.5 0 0 1 3 0v6m0-5a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 3 0"/>',
    gems:      '<path d="M12 2 22 12 12 22 2 12 12 2Z"/><path d="M12 5v14M5 12h14"/>',
    plus:      '<path d="M12 5v14M5 12h14"/>',
    sparkle:   '<path d="M12 4v4M12 16v4M4 12h4M16 12h4m-9-5 2 2m4 4 2 2m-8 0 2-2m4-4 2-2"/>',
    list:      '<path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
    close:     '<path d="M6 6l12 12M18 6 6 18"/>',
    search:    '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.5 4.5"/>',
    vol:       '<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/>',
    volx:      '<path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="m16 9 5 6M21 9l-5 6"/>',
  };
  // SVG-иконка по имени; класс .ic задаёт размер 1em
  function ic(name, cls) {
    const p = ICONS[name] || ICONS.sparkle;
    return `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;
  }

  /* Крейт-иконки кейсов в духе CS2: коробка/бочка/сейф/самоцвет, тинт — цвет кейса */
  const CRATE_PATHS = {
    chest: '<rect x="9" y="17" width="30" height="23" rx="3"/><path d="M9 25h30"/><path d="m11 17 3-8h20l3 8"/><rect x="20" y="22" width="8" height="6" rx="1.5"/>',
    crate: '<rect x="9" y="16" width="30" height="24" rx="2"/><path d="m9 16 4-7h22l4 7"/><path d="M24 16v24"/><path d="m9 16 13 8-2 4"/><path d="m39 16-13 8 2 4"/>',
    drum:  '<ellipse cx="24" cy="11" rx="12" ry="4"/><path d="M12 11c-.6 12 .6 20 1 23 1 2 5 3 11 3s10-1 11-3c.4-3 1.6-11 1-23" fill="none"/><path d="M12.5 20c1 1.8 5.2 3 11.5 3s10.5-1.2 11.5-3"/><path d="M12.5 28c1 1.8 5.2 3 11.5 3s10.5-1.2 11.5-3"/>',
    safe:  '<rect x="7" y="9" width="34" height="30" rx="4"/><circle cx="24" cy="24" r="7"/><path d="M24 17v-4M31 24h4"/><path d="M14 39v3h20v-3"/>',
    gem:   '<path d="M14 8h20l8 10-18 22L6 18l8-10Z"/><path d="M6 18h36"/><path d="M24 18 14 8l6 10 4-6"/><path d="M24 40 24 18"/>',
  };
  const CRATE_BY_ID = { bomzh:'chest', pelmeni:'drum', musor:'drum', street:'crate', neon:'gem', garazh:'crate', royal:'gem', black:'safe' };
  function crateSVG(c) {
    const paths = CRATE_PATHS[CRATE_BY_ID[c.id] || c.crate || 'crate'] || CRATE_PATHS.crate;
    return `<svg class="ic crate" viewBox="0 0 48 48" aria-hidden="true">${paths}</svg>`;
  }

  // SVG-иконка-фолбэк для скинов, если картинка не загрузилась
  function emojiFor(name) {
    if (!name) return ic('crosshair');
    if (/★|[Kk]nife|Karambit|Bayonet|Butterfly|Dagger|Falchion|Huntsman|Navaja|Nomad|Skeleton|Stiletto|Talon|Ursus|Kukri|Nautilus/.test(name)) return ic('knife');
    if (/[Gg]loves|Mitts|Wraps/.test(name)) return ic('glove');
    return ic('crosshair');
  }

  // Картинка скина из Steam CDN либо SVG-иконка-фолбэк
  function skinVisual(item, cls) {
    if (!item.img) return item.emoji || emojiFor(item.name || item.n);
    return `<img class="skin-img ${cls || ''}" src="${item.img}" alt="" loading="lazy" decoding="async" width="64" height="54" onerror="imgFail(this)">`;
  }
  // ПКМ-фолбэк при ошибке загрузки: скрещиваем в прицел
  function imgFail(el) {
    const span = document.createElement('span');
    span.className = 'skin-miss';
    span.innerHTML = ic('crosshair');
    el.replaceWith(span);
  }

  // Рофл-строки, пока крутится рулетка
  const SPIN_JOKES = [
    'Крутим… совет: открывай на пустой желудок, так честнее',
    'Если выпадет голда — молчи. Вот прям никому не говори',
    'Технически предмет уже выпал. Но впечатление дороже',
    'В этот момент кто-то открыл тот же кейс и обжёгся. Не ты, но кто-то',
    'Скрещиваю пальцы… свои, твои всё равно в кармане',
    'Статистически ты можешь всё. Статистически же — не можешь',
    'Открывай спокойно: бабушкин чайник уже 60 лет против нас',
    'Рулетка не решает всё. Но 92% — точно',
    'Крутим без спешки: так предчувствие продлевается на пару секунд',
    'Ваш предыдущий дроп помнит вас. Он не в восторге',
    'Собрано с любовью и тремя процентами совести',
    'Шансы честные. Честнее только намерения кейсов вам наврать',
    'Пока вы читали это, кейс уменьшился на один балл вашего достоинства',
    'Анализирую вашу карму… вердикт: будем, просто крутим',
    'Роле-модель: предмет едет к вам через четыре района пробок',
  ];

  // Подколы при совсем дешёвом дропе (не каждый спин, чтобы не задолбать)
  const LOW_ROLLS = [
    'Дешёвенько. Но зато без коммитментов',
    'Этот предмет даже не мусор. Это архетип мусора',
    'Продал судьба тебе идею предмета. Сами детали — платно',
    'Эконом-дроп. Позитив в баланс не входит, извините',
    'Сдавайте в музей: экспонат «почти ничего»',
    'Именно за такое величие проекта мы здесь и собрались',
    'Выбрано специально для вас. Кем — не уточняйте',
  ];

  // Подколы при провале апгрейда
  const FAIL_ROASTS = [
    'Ставка испарилась. Красиво, между прочим',
    'Предметы сгорели. Огонь претензий не принимает',
    'Проигранным ставкам памятник не ставят, но вы держитесь',
    'Колесо решило, что у вас и так достаточно',
    'Апгрейд отменён по культурным причинам',
  ];
  function spinJoke() { return SPIN_JOKES[Math.floor(Math.random() * SPIN_JOKES.length)]; }

  // Тосты
  function toast(text, type = 'ok') {
    const box = $('#toasts');
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'err' ? ' err' : type === 'info' ? ' info' : '');
    el.innerHTML = text;
    box.appendChild(el);
    setTimeout(() => { el.classList.add('hide'); setTimeout(() => el.remove(), 350); }, 3200);
  }

  /* ---------- Модалки (общая логика) ---------- */

  function syncBodyLock() {
    document.body.style.overflow = document.querySelector('.overlay.open') ? 'hidden' : '';
  }
  function openOverlay(sel)  { $(sel).classList.add('open'); syncBodyLock(); }
  function closeOverlay(sel) { $(sel).classList.remove('open'); syncBodyLock(); }

  /* ============================================================
     4. ШАПКА, ВКЛАДКИ
     ============================================================ */

  function updateHeader() {
    $('#balanceValue').textContent = fmt(state.balance);
    $('#profBalance').textContent = fmt(state.balance);
  }

  function bumpBalance() {
    updateHeader();
    const pill = $('#balancePill');
    pill.classList.remove('bump');
    void pill.offsetWidth; // reflow, чтобы анимация перезапустилась
    pill.classList.add('bump');
  }

  function switchTab(id) {
    const navId = id === 'casew' ? 'cases' : id; // страница кейса живёт в разделе «Кейсы»
    $$('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === navId));
    $$('.tab-section').forEach(s => s.classList.toggle('active', s.id === 'tab-' + id));
    // Рулетка не должна оставаться в скрытой секции страницы кейса
    if (id !== 'casew' && !spinning && !stageInModal() && stage().parentElement === caseSpinHost()) {
      spinPark().appendChild(stage());
    }
    if (id === 'profile') { renderHistory(); updateDailyUI(); }
    if (id === 'cases') renderCases();
  }
  $('#tabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (btn) switchTab(btn.dataset.tab);
  });
  $('#profileBtn').addEventListener('click', () => switchTab('profile'));
  $('#depositHeaderBtn').addEventListener('click', openDeposit);
  $('#balancePill').addEventListener('click', () => openDeposit());
  $('#depCloseBtn').addEventListener('click', () => closeOverlay('#depositOverlay'));
  $('#depositOverlay').addEventListener('click', (e) => {
    if (e.target === $('#depositOverlay')) closeOverlay('#depositOverlay');
  });
  $('#logo').addEventListener('click', () => switchTab('cases'));
  document.querySelector('.site-footer__nav').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (btn) { switchTab(btn.dataset.tab); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (e.target.closest('#footerDeposit')) openDeposit();
  });

  // Выключатель звука — всё кончается тишиной и уважением к соседям
  function renderSnd() {
    const on = state.sound !== false;
    const el = $('#sndBtn');
    el.querySelector('[data-ic]').innerHTML = on ? ic('vol') : ic('volx');
    el.classList.toggle('active', on);
    el.title = on ? 'Звук: включён (клик — отключить)' : 'Звук: отключён (клик — включить)';
  }
  function renderFast() {
    const on = !!state.fast;
    const a = $('#fastBtn'), b = $('#cpFast');
    if (a) a.classList.toggle('active', on);
    if (b) b.classList.toggle('active', on);
  }
  $('#sndBtn').addEventListener('click', () => {
    state.sound = !(state.sound !== false);
    saveState();
    renderSnd();
    if (state.sound) toast(ic('vol') + ' Звук включён. Бережно и негромко', 'info');
    else toast(ic('volx') + ' Тишина в студии. Баллы продолжат шуршать молча', 'info');
  });

  /* ============================================================
     5. LIVE-ЛЕНТА И ИСТОРИЯ ДРОПОВ
     ============================================================ */

  // Записать дроп в историю + всплывающий элемент в ленту
  function addDropToFeed(item) {
    const drop = { ts: Date.now(), name: item.name, value: item.value, rarity: item.rarity, emoji: item.emoji };
    state.drops.unshift(drop);
    if (state.drops.length > MAX_HISTORY) state.drops.length = MAX_HISTORY;

    const node = liveItemNode(drop, true);
    $('#liveTrack').prepend(node);
    // держим ленту короткой
    while ($('#liveTrack').children.length > MAX_LIVE) $('#liveTrack').lastChild.remove();
    $('#liveBar').hidden = false;
  }

  function liveItemNode(drop, animate) {
    const el = document.createElement('div');
    el.className = 'live-item';
    el.style.setProperty('--rc', RARITY[drop.rarity].color);
    el.title = drop.name;
    el.innerHTML = `<span class="e">${skinVisual(drop)}</span><span class="v">◆ ${fmt(drop.value)}</span>`;
    if (!animate) el.style.animation = 'none';
    return el;
  }

  // Первичная отрисовка ленты при загрузке
  function renderLiveFeed() {
    if (!state.drops.length) { $('#liveBar').hidden = true; return; }
    const track = $('#liveTrack');
    track.innerHTML = '';
    state.drops.slice(0, MAX_LIVE).forEach(d => track.appendChild(liveItemNode(d, false)));
    $('#liveBar').hidden = false;
  }

  // История дропов в профиле
  function renderHistory() {
    const box = $('#dropHistory');
    box.innerHTML = '';
    $('#histCount').textContent = state.drops.length ? `· всего ${state.drops.length}` : '';
    if (!state.drops.length) {
      box.innerHTML = '<div class="empty-note">Истории пока нет. Ты ведь ещё даже не открывал кейсы. Срочно исправляем!</div>';
      return;
    }
    state.drops.slice(0, 15).forEach((d) => {
      const el = document.createElement('div');
      el.className = 'hist-item';
      el.style.setProperty('--rc', RARITY[d.rarity].color);
      el.innerHTML = `
        <span class="e">${skinVisual(d)}</span>
        <span class="nm">${d.name}</span>
        <span class="v">◆ ${fmt(d.value)}</span>
        <span class="t">${timeAgo(d.ts)}</span>`;
      box.appendChild(el);
    });
  }

  /* ============================================================
     6. КЕЙСЫ: сетка + страница содержания
     ============================================================ */

  /* ---------- Фильтры витрины ---------- */
  let caseQuery = '';
  let caseRange = 'all';
  let caseSort  = 'default';

  // Кэш характеристик кейса: общий вес, лучший предмет, ожидаемая ценность
  const CASE_STATS = new Map(CASES.map((c) => {
    const totalW = c.items.reduce((s, i) => s + i.w, 0);
    const best = c.items.reduce((a, b) => (b.v > a.v ? b : a), c.items[0]);
    const ev = c.items.reduce((s, i) => s + i.v * i.w, 0) / totalW;
    return [c.id, { totalW, best, ev, bestChance: best.w / totalW * 100 }];
  }));

  function visibleCases() {
    const q = caseQuery.trim().toLowerCase();
    let list = CASES.filter((c) => {
      if (q && !(c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q))) return false;
      if (caseRange === 'low')  return c.price < 100;
      if (caseRange === 'mid')  return c.price >= 100 && c.price < 1000;
      if (caseRange === 'high') return c.price >= 1000;
      return true;
    });
    if (caseSort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (caseSort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (caseSort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    return list;
  }

  function pluralCases(n) {
    const m = n % 100;
    if (m >= 11 && m <= 14) return 'кейсов';
    const d = n % 10;
    if (d === 1) return 'кейс';
    if (d >= 2 && d <= 4) return 'кейса';
    return 'кейсов';
  }

  function renderCases() {
    const grid = $('#casesGrid');
    const list = visibleCases();
    grid.innerHTML = '';

    list.forEach((c) => {
      const stats = CASE_STATS.get(c.id);
      const tops = [...c.items].sort((a, b) => b.v - a.v).slice(0, 2);

      const card = document.createElement('article');
      card.className = 'case-card';
      card.style.setProperty('--c', c.color);
      card.innerHTML = `
        <div class="case-card__art">
          <span class="case-card__price">◆ ${fmt(c.price)}</span>
          <div class="case-card__icon">${crateSVG(c)}</div>
        </div>
        <div class="case-card__body">
          <h3>${c.name}</h3>
          <p class="case-card__tag">${c.tag}</p>
          <div class="case-card__tops">
            ${tops.map(t => `<span title="${t.n} — ${fmt(t.v)} б." style="--rc:${RARITY[t.r].color}">${skinVisual(t)}</span>`).join('')}
          </div>
          <span class="case-card__meta"><b>${c.items.length}</b> предметов · топ <b class="case-card__best">◆ ${fmt(stats.best.v)}</b></span>
          <div class="case-card__footer">
            <button class="case-card__open" style="background:linear-gradient(135deg, ${c.color}, ${c.color}bb); color:#080A0C;">
              Открыть · <span style="font-weight:900;">◆</span> ${fmt(c.price)}
            </button>
          </div>
        </div>`;
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', 'Открыть кейс ' + c.name + ' — состав и шансы');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCasePage(c); }
      });
      card.addEventListener('click', () => openCasePage(c));
      card.querySelector('.case-card__open').addEventListener('click', (e) => {
        e.stopPropagation();
        startSession(c, { modal: true }); // из главного меню — окно поверх сайта
      });
      grid.appendChild(card);
    });

    $('#casesCount').textContent = list.length + ' ' + pluralCases(list.length) + ' из ' + CASES.length;
    $('#casesEmpty').hidden = list.length > 0;
  }

  // Цифры площадки над витриной
  function renderCaseQuickStats() {
    const skins = new Set();
    let top = null, bestChance = 0;
    CASES.forEach((c) => {
      c.items.forEach((i) => skins.add(i.n + '|' + i.v));
      const st = CASE_STATS.get(c.id);
      if (!top || st.best.v > top.v) { top = st.best; bestChance = st.bestChance; }
      else if (st.best.v === top.v) bestChance = Math.max(bestChance, st.bestChance);
    });
    $('#qsCases').textContent = CASES.length;
    $('#qsSkins').textContent = skins.size;
    $('#qsTop').textContent = '◆ ' + fmt(top.v);
    $('#qsTopName').textContent = top.n + ' · шанс ' +
      (bestChance < 1 ? bestChance.toFixed(2) : bestChance.toFixed(1)) + '%';
  }

  // Живые фильтры витрины
  $('#caseSearch').addEventListener('input', (e) => { caseQuery = e.target.value; renderCases(); });
  $('#caseRange').addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b) return;
    caseRange = b.dataset.range;
    $$('#caseRange .chip').forEach(x => x.classList.toggle('active', x === b));
    renderCases();
  });
  $('#caseSort').addEventListener('change', (e) => { caseSort = e.target.value; renderCases(); });

  // Полноформатная страница кейса: описание, настройки, состав и шансы
  let cpCase = null; // кейс, открытый на отдельной странице

  function openCasePage(c) {
    cpCase = c;
    renderCasePage();
    switchTab('casew');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderCasePage() {
    const c = cpCase;
    if (!c) return;
    const stats = CASE_STATS.get(c.id);
    const itemsSorted = [...c.items].sort((a, b) => b.v - a.v); // дорогие сверху
    // Stage нельзя затирать вместе с wrap: вынимаем его до перезаписи innerHTML
    const st = stage();
    if (st && st.parentElement) st.parentElement.removeChild(st);
    const totalW = stats.totalW;
    const maxChance = Math.max(...c.items.map(i => i.w)) / totalW * 100;
    const wrap = $('#casePageWrap');
    const chTxt = (chance) => chance < 1 ? chance.toFixed(2) : chance.toFixed(chance < 10 ? 1 : 0);

    const rows = itemsSorted.map((it) => {
      const chance = it.w / totalW * 100;
      return `
        <span class="csi-bar" style="width:${(chance / maxChance * 100).toFixed(1)}%"></span>
        <span class="e">${skinVisual(it)}</span>
        <span class="nm">${it.n}<br><span class="rl">${RARITY[it.r].name}</span></span>
        <span class="ch"><b>${chTxt(chance)}%</b> шанс</span>
        <span class="vl">◆ ${fmt(it.v)}</span>`;
    });

    wrap.innerHTML = `
      <button class="btn btn--ghost btn--small cp-back" id="cpBack">${ic('grid')} Все кейсы</button>

      <div class="panel cp-hero" style="--c:${c.color}">
        <div class="cp-hero__art">${crateSVG(c)}</div>
        <div class="cp-hero__main">
          <div class="cp-hero__chips">
            <span class="pill">${c.items.length} предметов</span>
            <span class="pill">Возврат ~${Math.round(stats.ev / c.price * 100)}%</span>
            <span class="pill pill--best">Топ-дроп ◆ ${fmt(stats.best.v)}</span>
          </div>
          <h1 class="section-title">${c.name}</h1>
          <p class="section-sub">${c.tag}</p>
          <div class="cp-stats">
            <div><span>Цена кейса</span><b>◆ ${fmt(c.price)}</b></div>
            <div><span>Предметов</span><b>${c.items.length}</b></div>
            <div><span>Лучший дроп</span><b>◆ ${fmt(stats.best.v)}</b></div>
            <div><span>Шанс топ-дропа</span><b>${chTxt(stats.bestChance)}%</b></div>
          </div>
          <div class="cp-buy">
            <div class="spin-count">
              <span class="lbl">Кейсов за раз:</span>
              ${[1, 2, 3, 5, 10].map(n => `<button class="count-btn${multiCount === n ? ' active' : ''}" data-n="${n}">×${n}</button>`).join('')}
            </div>
            <button class="count-btn${state.fast ? ' active' : ''}" id="cpFast" title="Ускоренная прокрутка (1.15 с вместо 5.4 с)">${ic('bolt')} Быстро</button>
            <button class="btn btn--primary cp-start" id="cpStart">Крутить · ◆ ${fmt(c.price * multiCount)}</button>
          </div>
        </div>
      </div>

      <div class="panel cp-spin" id="cpSpinHost"></div>

      <div class="panel cp-contents">
        <h4>${ic('list')} Что внутри</h4>
        <p class="hint">Шансы — это честные веса дропа: сумма по всем предметам всегда 100%.</p>
        <div class="csi-head"><span></span><span>Предмет</span><span>Шанс</span><span>Цена</span></div>
        <div class="csi-list">
          ${itemsSorted.map((it, k) =>
            '<div class="csi-item" style="--rc:' + RARITY[it.r].color + '">' + rows[k].trim() + '</div>'
          ).join('')}
        </div>
      </div>`;

    // Рулетка переезжает сюда (сверху страницы)
    stageToCase();
    $('#cpBack').addEventListener('click', () => {
      switchTab('cases');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    wrap.querySelectorAll('.count-btn[data-n]').forEach((b) => {
      b.addEventListener('click', () => {
        if (spinning) return;
        multiCount = +b.dataset.n;
        $$('.count-btn[data-n]').forEach(x => x.classList.toggle('active', +x.dataset.n === multiCount));
        $('#cpStart').innerHTML = 'Крутить · <b style="font-weight:900;">◆</b> ' + fmt(c.price * multiCount);
      });
    });
    $('#cpFast').addEventListener('click', () => {
      if (spinning) return;
      state.fast = !state.fast;
      saveState();
      renderFast();
      toast(state.fast ? ic('bolt') + ' Быстрая прокрутка: 1.15 с вместо 5.4 с' : ic('clock') + ' Обычная скорость — наслаждайся картинкой', 'info');
    });
    $('#cpStart').addEventListener('click', () => startSession(c));
  }

  /* ============================================================
     7. РУЛЕТКА: спины и серии открытия (×1 ×2 ×3)
     ============================================================ */

  const GAP = 8;           // зазор между ячейками
  const WIN_INDEX = 62;    // индекс выигрышной ячейки в ленте
  const TOTAL_CELLS = 72;  // длина ленты
  // Длительность прокрутки: быстрый режим ≈ 1.15 с, обычный 5.4 с
  const SPIN_MS = () => (state.fast ? 1150 : 5400);

  let multiCount = 1;      // выбранное количество кейсов за раз (1..3)
  let session = null;      // текущая серия: { c, total, done, prizes[] }
  let spinning = false;    // флаг «что-то крутится прямо сейчас»
  let gaugeLocked = false; // блокировка колеса апгрейдера

  function spinPark()    { return $('#spinPark'); }
  function modalHost()   { return $('#modalSpinHost'); }
  function caseSpinHost(){ return $('#cpSpinHost'); }
  // Ссылку на stage держим в кэше: detached-узел querySelector'ом не найдёшь
  let stageEl = document.querySelector('#spinStage');
  function stage() {
    if (!stageEl) stageEl = (spinPark() && spinPark().querySelector('#spinStage')) || document.querySelector('#spinStage');
    return stageEl;
  }
  // Рулетка переезжает: страница кейса ↔ модалка (только из главного меню) ↔ паркинг
  function stageInModal() { return stage().parentElement === modalHost(); }
  function stageToModal() {
    if (!stageInModal()) modalHost().appendChild(stage());
  }
  // Домой: в хост страницы кейса, если та открыта; иначе — в паркинг
  function stageToCase() {
    const host = caseSpinHost();
    if (host) host.appendChild(stage());
    else spinPark().appendChild(stage()); // и из модалки тоже достаём: иначе рулетка застрянет скрытой
  }
  // Рулетка реально видна: страница кейса активна или модалка открыта
  function stageVisible() {
    const host = stage() && stage().parentElement;
    if (!host) return false;
    const section = host.closest('.tab-section');
    if (section && !section.classList.contains('active')) return false;
    const overlay = host.closest('.overlay');
    if (overlay && !overlay.classList.contains('open')) return false;
    return true;
  }

  // Старт серии спинов выбранного кейса (×1..×10)
  // modal=true — только при открытии кнопкой «Открыть» из главного меню
  function startSession(c, opts) {
    opts = opts || {};
    if (spinning || gaugeLocked) return;
    const cost = c.price * multiCount;
    if (state.balance < cost) {
      toast('На серию ' + multiCount + ' не хватает баллов: нужно ' + fmt(cost) + ', у тебя ' + fmt(state.balance), 'err');
      const card = [...document.querySelectorAll('.case-card')].find(el => el.querySelector('h3').textContent === c.name);
      if (card) { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 450); }
      return;
    }
    session = { c, total: multiCount, done: 0, prizes: [] };
    $('#spinResult').innerHTML = '<span style="color:var(--muted)">Крутим… удачи!</span>';
    $('#spinActions').style.display = 'none';
    $('#sessionNote').textContent = session.total > 1 ? `Серия: ${session.total} ${pluralCases(session.total)}.` : '';
    $('#caseModalTitle').innerHTML = ic(c.icon) + ' ' + c.name + ` <span class="price">· ◆ ${fmt(c.price)} за кейс</span>`;
    if (opts.modal) {
      stageToModal();
      openOverlay('#caseOverlay');
    } else {
      // Крутить на странице кейса: прокрутка сверху, дроп ниже
      if (cpCase !== c) openCasePage(c); else renderCasePage();
      const host = caseSpinHost();
      if (host && host.scrollIntoView) host.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    runSpin();
  }

  // Один спин серии (списывает цену одного кейса)
  function runSpin() {
    const c = session.c;
    if (state.balance < c.price) {
      toast('Баланс закончился — серия остановлена', 'info');
      return endSession();
    }
    state.balance -= c.price;
    state.stats.opened++;
    saveState();
    bumpBalance();
    spinning = true;
    buildRoulette(c, weightedPick(c.items));
  }

  // Собираем ленту рулетки и запускаем анимацию
  function buildRoulette(c, winner) {
    lastPrizeInfo = null;
    $('#spinActions').style.display = 'none';      $('#spinResult').innerHTML = '<span style="color:var(--muted)">' + ic('dice') + ' ' + spinJoke() + '</span>';

    const ribbon = $('#rouletteRibbon');
    const view = $('#rouletteView');
    ribbon.innerHTML = '';
    ribbon.style.transition = 'none';
    ribbon.style.transform = 'translateX(0)';

    // Лента: случайные предметы + победитель на фиксированном индексе
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const it = (i === WIN_INDEX) ? winner : weightedPick(c.items);
      const cell = document.createElement('div');
      cell.className = 'r-cell';
      cell.style.setProperty('--rc', RARITY[it.r].color);
      cell.innerHTML = `<span class="r-cell__emoji">${skinVisual(it)}</span><span class="r-cell__name">${it.n}</span><span class="r-cell__value">◆ ${fmt(it.v)}</span>`;
      ribbon.appendChild(cell);
    }

    // На мобилке ширина ячейки другая — берём реальное значение из DOM
    const firstCell = ribbon.children[0];
    const step = firstCell.offsetWidth + GAP;
    const viewW = view.clientWidth;
    const jitter = (Math.random() - 0.5) * (firstCell.offsetWidth * 0.55);
    const finalX = -(WIN_INDEX * step + firstCell.offsetWidth / 2 - viewW / 2 + jitter);

    // Тики прокрутки: звук торможения в такт ленте
    snd.spin(SPIN_MS());

    // Разгон, затем плавное торможение на победителе
    ribbon.style.transform = 'translateX(120px)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ribbon.style.transition = 'transform ' + SPIN_MS() + 'ms cubic-bezier(.12,.75,.13,1)';
      ribbon.style.transform = `translateX(${finalX}px)`;
    }));

    // Страховка: если браузер не сгенерил transitionend — вызываем вручную
    let finished = false;
    const finish = () => { if (finished) return; finished = true; finishSpin(c, winner, ribbon.children[WIN_INDEX]); };
    ribbon.addEventListener('transitionend', finish, { once:true });
    setTimeout(finish, SPIN_MS() + 600);
  }

  let lastPrizeInfo = null; // последний выпавший предмет (для панели результата)

  // Рулетка остановилась — начисляем приз
  function finishSpin(c, winner, winCell) {
    spinning = false;
    if (winCell) winCell.classList.add('win');

    // Предмет в инвентарь + история
    state.seq++;
    const item = { id: state.seq, name: winner.n, value: winner.v, rarity: winner.r, emoji: emojiFor(winner.n), img: winner.img };
    state.inventory.push(item);
    addDropToFeed(item);
    if (winner.v > state.stats.best.value) state.stats.best = { value: winner.v, name: winner.n };
    saveState();
    bumpBalance();
    refreshInventory();

    // Звук победы: богаче — на больших дропах
    snd.win(winner.r === 'legend' || winner.r === 'mythic' || winner.v >= c.price * 3);

    // Жёсткий стёб на случай совсем дешёвого дропа (не каждый раз)
    if (winner.v < c.price * 0.45 && Math.random() < 0.5) {
      toast(ic('crosshair') + ' ' + LOW_ROLLS[Math.floor(Math.random() * LOW_ROLLS.length)], 'info');
    }

    // Тост по редкости
    if (winner.r === 'legend' || winner.r === 'mythic') {
      toast(ic('star') + ' ДЖЕКПОТ: ' + winner.n + ' (+' + fmt(winner.v) + ')!');
    } else {
      toast('Дроп: ' + emojiFor(winner.n) + ' ' + winner.n, winner.v >= c.price ? 'ok' : 'info');
    }

    lastPrizeInfo = item;
    if (!session) session = { c, total: 1, done: 0, prizes: [] };
    session.done++;
    session.prizes.push(item.id);

    updateSpinPanel();

    // Если серия продолжается — следующий спин сам
    if (session.done < session.total && state.balance >= session.c.price) {
      $('#sessionNote').textContent = `Спин ${session.done} из ${session.total}. Следующий кейс уже настраивается…`;
      setTimeout(() => {
        // Серия живёт, пока рулетка видна: модалка открыта или страница кейса активна
        if (!stageVisible()) {
          session = null;
          $('#spinActions').style.display = 'none';
          $('#sessionNote').textContent = '';
          toast(ic('clock') + ' Серия остановлена: рулетка закрыта', 'info');
          return;
        }
        runSpin();
      }, state.fast ? 550 : 1200);
    } else {
      if (session.done < session.total) toast('Баланс кончился — серия остановлена на ' + session.done + ' из ' + session.total, 'info');
      endSession();
    }
  }

  // Панель результата под рулеткой
  function updateSpinPanel() {
    const box = $('#spinResult');
    const c = session ? session.c : null;
    if (lastPrizeInfo) {
      const rare = RARITY[lastPrizeInfo.rarity];
      box.style.setProperty('--rc', rare.color); // свечение картинки в цвет редкости
      box.innerHTML = `
        <span class="emo">${skinVisual(lastPrizeInfo)}</span>
        <span class="name" style="color:${rare.color}">${lastPrizeInfo.name}</span>
        <span class="val"><span class="accent">◆</span> ${fmt(lastPrizeInfo.value)} · <span style="color:${rare.color}">${rare.name}</span>
        ${session && session.total > 1 ? ` · ${session.done}/${session.total}` : ''}</span>`;
    }

    const note = $('#sessionNote');
    const finallyDone = !session || session.done >= session.total;
    const actions = $('#spinActions');

    if (finallyDone) {
      // Итог серии
      if (session && session.total > 1) {
        let sum = 0, alive = 0;
        session.prizes.forEach(id => {
          const it = state.inventory.find(i => i.id === id);
          if (it) { sum += it.value; alive++; }
        });
        if (alive > 0) {
          note.innerHTML = `Итог серии: <b style="color:#C9CFDB">${alive} ${pluralItems(alive)}</b> на сумму <b class="accent" style="color:var(--accent)">${fmt(sum)} б.</b>`;
        }
      }
      // Кнопки
      let sellSum = 0;
      (session ? session.prizes : []).forEach(id => {
        const it = state.inventory.find(i => i.id === id);
        if (it) sellSum += it.value;
      });
      const sell = $('#sellNowBtn');
      sell.disabled = sellSum === 0;
      sell.textContent = sellSum > 0 ? 'Продать выпавшее · +' + fmt(sellSum) : 'Продать выпавшее';
      const again = $('#againBtn');
      again.disabled = c ? state.balance < c.price : true;
      again.textContent = c ? 'Крутить ещё ×' + multiCount + ' · −' + fmt(c.price * multiCount) : 'Крутить ещё';
      actions.style.display = 'flex';
    } else {
      actions.style.display = 'none';
    }
  }

  function endSession() {
    updateSpinPanel();
  }

  /* ---------- Кнопки рулетки ---------- */

  function closeRouletteModal() {
    session = null;
    closeOverlay('#caseOverlay');
    stageToCase(); // рулетка возвращается на страницу кейса
  }
  $('#caseCloseBtn').addEventListener('click', () => {
    if (spinning) { toast(ic('clock') + ' Рулетка ещё крутится — подожди пару секунд', 'info'); return; }
    closeRouletteModal();
  });
  $('#caseOverlay').addEventListener('click', (e) => {
    if (e.target !== $('#caseOverlay')) return;
    if (spinning) { toast(ic('clock') + ' Рулетка ещё крутится!', 'info'); return; }
    closeRouletteModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = [...document.querySelectorAll('.overlay.open')];
    const top = open[open.length - 1];
    if (!top) return;
    if (top.id === 'caseOverlay') {
      if (!spinning) closeRouletteModal();
      return;
    }
    closeOverlay('#' + top.id);
  });

  // Выбор количества кейсов
  $$('.count-btn[data-n]').forEach((b) => {
    b.addEventListener('click', () => {
      if (spinning) return;
      multiCount = +b.dataset.n;
      $$('.count-btn[data-n]').forEach(x => x.classList.toggle('active', x === b));
    });
  });

  // Тумблер быстрого режима прокрутки
  $('#fastBtn').addEventListener('click', () => {
    if (spinning) return;
    state.fast = !state.fast;
    saveState();
    renderFast();
    toast(state.fast ? ic('bolt') + ' Быстрая прокрутка включена' : ic('clock') + ' Обычная скорость — наслаждайся картинкой', 'info');
  });

  // Продать всё выпавшее за серию
  $('#sellNowBtn').addEventListener('click', () => {
    if (!session) return;
    let sum = 0, cnt = 0;
    session.prizes.forEach(id => {
      const idx = state.inventory.findIndex(i => i.id === id);
      if (idx !== -1) { sum += state.inventory[idx].value; cnt++; state.inventory.splice(idx, 1); }
    });
    session.prizes = [];
    if (sum > 0) {
      state.balance += sum;
      saveState();
      bumpBalance();
      refreshInventory();
      $('#spinResult').innerHTML = `<span class="emo">${ic('coins')}</span><span class="name">Продано ${cnt} шт. за ${fmt(sum)} б.!</span>`;
      toast('+' + fmt(sum) + ' б. на баланс. Оно того стоило?', 'ok');
    }
    updateSpinPanel();
  });

  $('#againBtn').addEventListener('click', () => {
    if (spinning || !session) return;
    const c = session.c;
    const inModal = stageInModal();
    session = null;
    closeOverlay('#caseOverlay');          // закрыть текущее окно, не трогая stage
    startSession(c, { modal: inModal });   // и продолжить в том же режиме
  });

  /* ============================================================
     8. АПГРЕЙДЕР: мультивыбор до 6 предметов
     ============================================================ */

  let upgradeSel = [];     // id выбранных предметов (до 6)
  let upgradeTarget = null;// выбранная цель: { name, value, rarity, emoji, img }
  let targetFilter = '';   // поиск по каталогу целей

  function selectedUpgradeItems() {
    return upgradeSel.map(id => state.inventory.find(i => i.id === id)).filter(Boolean);
  }

  function selectUpgradeItem(id) {
    const pos = upgradeSel.indexOf(id);
    if (pos !== -1) upgradeSel.splice(pos, 1);
    else if (upgradeSel.length >= MAX_UP_ITEMS) {
      toast('Максимум ' + MAX_UP_ITEMS + ' предметов в ставке. Убери что-то сначала.', 'err');
      return;
    } else upgradeSel.push(id);
    renderUpgradeInv();
    updateUpgradeUI();
  }

  // Ставка: суммарная цена выбранных
  function stakeValue() {
    return selectedUpgradeItems().reduce((s, i) => s + i.value, 0);
  }

  function renderUpgradeInv() {
    const box = $('#upgradeInv');
    box.innerHTML = '';
    if (!state.inventory.length) {
      box.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">Инвентарь пуст. Открой кейсы, чтобы было что сжечь!</div>';
      return;
    }
    state.inventory.forEach((item) => {
      const pos = upgradeSel.indexOf(item.id);
      const el = document.createElement('div');
      el.className = 'inv-mini' + (pos !== -1 ? ' selected' : '');
      el.style.setProperty('--rc', RARITY[item.rarity].color);
      el.innerHTML = `${pos !== -1 ? `<span class="mark">${pos + 1}</span>` : ''}
        <span class="emo">${skinVisual(item)}</span><span class="nm">${item.name}</span><span class="vl">◆ ${fmt(item.value)}</span>`;
      el.addEventListener('click', () => selectUpgradeItem(item.id));
      box.appendChild(el);
    });
  }

  // Шанс апгрейда с «домом»: chance = 92% × (ставка / цена цели)
  function upgradeChance(stake, target) {
    return Math.max(0.02, Math.min(0.9, stake / target.value * 0.92));
  }

  // Доступные цели: все скины каталога дороже ставки
  function availableTargets(stake) {
    return ALL_ITEMS.filter(t => t.value > stake);
  }

  // Список целей с поиском (шанс считается автоматически для каждой)
  function renderTargetList(stake) {
    const box = $('#targetList');
    box.innerHTML = '';
    if (!(stake > 0)) {
      box.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">Сначала собери ставку слева — и появится весь каталог целей</div>';
      return;
    }
    const f = targetFilter.trim().toLowerCase();
    let cand = availableTargets(stake);
    if (f) cand = cand.filter(t => t.name.toLowerCase().includes(f));
    if (!cand.length) {
      box.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">Ничего не нашлось: цель должна быть дороже ставки (' + fmt(stake) + ' б.)</div>';
      return;
    }
    cand.slice(0, 60).forEach((t) => {
      const el = document.createElement('div');
      const isSel = upgradeTarget && upgradeTarget.name === t.name && upgradeTarget.value === t.value;
      el.className = 'target-item' + (isSel ? ' selected' : '');
      el.style.setProperty('--rc', RARITY[t.rarity].color);
      el.innerHTML = `<span class="tg-img">${skinVisual(t)}</span>
        <span class="tg-nm"><b>${t.name}</b><small>◆ ${fmt(t.value)} · шанс ${Math.round(upgradeChance(stake, t) * 100)}%</small></span>`;
      el.addEventListener('click', () => {
        upgradeTarget = { ...t };
        updateUpgradeUI();
      });
      box.appendChild(el);
    });
  }

  // Каталог всех предметов из всех кейсов — «цели» для апгрейдера
  const ALL_ITEMS = (() => {
    const seen = new Set(), list = [];
    for (const c of CASES) for (const it of c.items) {
      const key = it.n + '|' + it.v;
      if (!seen.has(key)) { seen.add(key); list.push({ name:it.n, value:it.v, rarity:it.r, emoji: emojiFor(it.n), img:it.img }); }
    }
    return list.sort((a, b) => a.value - b.value);
  })();

  // Длина дуги для SVG-окружности
  const CIRC = 2 * Math.PI * 84;

  /* Режимы прокрутки колеса апгрейдера: обычный / быстрый / непредсказуемый */
  function gaugeStyle() { return state.gstyle || 'norm'; }

  // Генерируем план вращения: последовательность сегментов {deg, dur, ease}
  // theta — конечный угол (уже включает полные обороты)
  function gaugePlan(theta) {
    const st = gaugeStyle();
    if (st === 'fast') return [{ deg: theta, dur: 1250, ease: 'cubic-bezier(.16,.84,.24,1)' }];
    if (st === 'wild') {
      const parts = [];
      let done = 0;
      const n = 3 + Math.floor(Math.random() * 5);         // 3..7 рывков
      let delay = Math.random() < 0.5 ? 150 + Math.random() * 450 : 0; // может «задуматься» перед стартом
      for (let k = 0; k < n; k++) {
        const rest = theta - done;
        const share = k === n - 1 ? rest : rest * (0.35 + Math.random() * 0.5);
        // последние 25% длины тормозим сильнее, ранние сегменты летят
        const ease = k === n - 1 ? 'cubic-bezier(.15,.85,.18,1)' : 'cubic-bezier(.45,1.1,.5,1)';
        parts.push({ deg: share, dur: Math.round(share / theta * (2200 + Math.random() * 2400)), ease, delay });
        done += share;
        delay = Math.random() < 0.35 ? 120 + Math.random() * 350 : 0; // паузы между рывками
      }
      return parts;
    }
    // обычный: несколько оборотов с плавным замедлением
    return [{ deg: theta, dur: 3400, ease: 'cubic-bezier(.15,.85,.18,1)' }];
  }

  let gaugeAnimToken = 0; // отмена гонок: каждый запуск валиден, пока токен жив

  function runGaugeAnimation(theta, onDone) {
    const needle = $('#gaugeNeedle');
    const token = ++gaugeAnimToken;
    needle.style.transition = 'none';
    needle.style.transform = 'rotate(0deg)';
    const plan = gaugePlan(theta);
    let cursor = 0;
    let elapsed = 0;
    const totalMs = plan.reduce((a, s) => a + (s.delay || 0) + s.dur, 0);
    snd.gaugeTicks(totalMs);   // шелест колеса в такт сегментам
    plan.forEach((seg) => {
      elapsed += (seg.delay || 0) + seg.dur;
      setTimeout(() => {
        if (token !== gaugeAnimToken) return;
        cursor += seg.deg;
        needle.style.transition = 'transform ' + seg.dur + 'ms ' + seg.ease;
        needle.style.transform = 'rotate(' + cursor + 'deg)';
      }, elapsed - seg.dur);   // старт сегмента = конец предыдущего (+ пауза)
    });
    setTimeout(() => { if (token === gaugeAnimToken) onDone(); }, elapsed + 80); // страховка вместо transitionend
    return elapsed;
  }

  // Тик-рейка вокруг колеса (24 засечки, каждая 4-я крупнее)
  function buildGaugeTicks() {
    const g = $('#gaugeTicks');
    if (!g || g.childElementCount) return; // одни и те же тики один раз
    const ns = 'http://www.w3.org/2000/svg';
    for (let k = 0; k < 24; k++) {
      const a = k / 24 * Math.PI * 2;
      const r1 = 91, r2 = k % 6 === 0 ? 97 : 95;
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', (100 + Math.sin(a) * r1).toFixed(2));
      line.setAttribute('y1', (100 - Math.cos(a) * r1).toFixed(2));
      line.setAttribute('x2', (100 + Math.sin(a) * r2).toFixed(2));
      line.setAttribute('y2', (100 - Math.cos(a) * r2).toFixed(2));
      if (k % 6 === 0) line.setAttribute('class', 'big');
      g.appendChild(line);
    }
  }

  // Переключение режима прокрутки
  function renderGaugeSpeed() {
    $$('#gaugeSpeed .gs-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.gs === gaugeStyle());
      b.querySelector('[data-ic]') && (b.querySelector('[data-ic]').innerHTML = ic(b.querySelector('[data-ic]').dataset.ic));
    });
  }

  $('#gaugeSpeed').addEventListener('click', (e) => {
    const btn = e.target.closest('.gs-btn');
    if (!btn || gaugeLocked) return;
    state.gstyle = btn.dataset.gs;
    saveState();
    renderGaugeSpeed();
    const names = { norm: 'Обычная прокрутка', fast: 'Быстрая прокрутка', wild: 'Непредсказуемая: колесо само решает' };
    toast(ic('dice') + ' ' + (names[state.gstyle] || 'Прокрутка переключена'), 'info');
  });

  function setGaugeZone(chance) {
    const zone = $('#gaugeZone');
    zone.style.strokeDasharray = CIRC + ' ' + CIRC;
    zone.style.strokeDashoffset = CIRC * (1 - chance);
  }

  function renderChips() {
    const box = $('#upChips');
    box.innerHTML = '';
    selectedUpgradeItems().forEach((item) => {
      const chip = document.createElement('div');
      chip.className = 'up-chip';
      chip.style.setProperty('--rc', RARITY[item.rarity].color);
      chip.innerHTML = `${skinVisual(item)} ${item.name}
        <span style="color:${RARITY[item.rarity].color}">◆ ${fmt(item.value)}</span>
        <span class="rm" title="Убрать из ставки">✕</span>`;
      chip.querySelector('.rm').addEventListener('click', () => selectUpgradeItem(item.id));
      box.appendChild(chip);
    });
  }

  function updateUpgradeUI() {
    const items = selectedUpgradeItems();
    const total = stakeValue();

    // Цель по умолчанию — если текущая выбилась из каталога (продана/стала дешевле)
    if (total > 0) {
      const avail = availableTargets(total);
      const valid = upgradeTarget && avail.some(t => t.name === upgradeTarget.name && t.value === upgradeTarget.value);
      if (!valid) upgradeTarget = avail[0] || null; // самый дешёвый доступный скин
    } else upgradeTarget = null;

    renderChips();
    renderTargetList(total);

    const chance = upgradeTarget ? upgradeChance(total, upgradeTarget) : 0;
    const mult = upgradeTarget ? upgradeTarget.value / total : 0;
    const btn = $('#upgradeBtn');
    btn.disabled = !items.length || !upgradeTarget || gaugeLocked;
    btn.innerHTML = (items.length && upgradeTarget)
      ? `${ic('bolt')} Апгрейд · <small>шанс ${Math.round(chance * 100)}%</small>`
      : ic('bolt') + ' Апгрейд';
    $('#upTotal').innerHTML = (items.length && upgradeTarget)
      ? `Ставка: <b>${items.length} ${pluralItems(items.length)}</b> на <b>◆ ${fmt(total)}</b> → «<span class="b1">${upgradeTarget.name}</span>» ≈ <b>${fmt(upgradeTarget.value)}</b> б. (${mult.toFixed(1)}×)`
      : 'Ставка не собрана — выбери предметы слева';
    setGaugeZone(items.length && upgradeTarget ? chance : 0);

    const big = $('#gaugeBig'), small = $('#gaugeSmall');
    if (items.length && upgradeTarget) {
      big.innerHTML = `<span style="color:var(--accent)">${mult.toFixed(1)}×</span> <span style="font-size:13px; color:var(--muted)">· ${Math.round(chance * 100)}%</span>`;
      small.innerHTML = `Ставка ${fmt(total)} б. → «${upgradeTarget.name}» — <b class="b1">${fmt(upgradeTarget.value)}</b> б.`;
    } else if (items.length) {
      big.textContent = '—';
      small.textContent = 'В каталоге нет скина дороже ставки (' + fmt(total) + ' б.)';
    } else {
      big.textContent = '—';
      small.textContent = 'Выбери до ' + MAX_UP_ITEMS + ' предметов слева — шанс посчитается сам';
    }
  }

  function pluralItems(n) {
    return n === 1 ? 'предмет' : (n < 5 ? 'предмета' : 'предметов');
  }

  // Поиск по каталогу целей
  $('#targetSearch').addEventListener('input', (e) => {
    targetFilter = e.target.value;
    renderTargetList(stakeValue());
  });

  // Вкладки выбора в апгрейдере: «Инвентарь» (ставка) и «Скины» (цель)
  $('#pickTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.pick-tab');
    if (!btn) return;
    $$('#pickTabs .pick-tab').forEach(b => b.classList.toggle('active', b === btn));
    $('#paneInv').hidden = btn.dataset.tp !== 'inv';
    $('#paneTargets').hidden = btn.dataset.tp !== 'targets';
    if (btn.dataset.tp === 'targets') renderTargetList(stakeValue());
  });

  // Запуск апгрейда
  $('#upgradeBtn').addEventListener('click', () => {
    const items = selectedUpgradeItems();
    if (!items.length || gaugeLocked) return;
    const total = stakeValue();
    const target = upgradeTarget;
    if (!target) return;
    const chance = upgradeChance(total, target);
    const win = Math.random() < chance; // результат решён заранее, анимация — просто визуализация

    gaugeLocked = true;
    $('#upgradeBtn').disabled = true;
    state.stats.upgrades++;
    saveState();

    // Позиция стрелки: обороты + угол внутри/вне зелёной зоны
    const zoneDeg = chance * 360;
    const theta = win
      ? Math.random() * zoneDeg * 0.9
      : zoneDeg + Math.random() * (360 - zoneDeg) * 0.94 + (360 - zoneDeg) * 0.03;
    const baseTurns = gaugeStyle() === 'fast' ? 2 : gaugeStyle() === 'wild' ? 4 : 5;
    const finalTheta = baseTurns * 360 + theta;

    $('#gaugeBig').textContent = '…';
    $('#gaugeSmall').textContent = 'Крутим колесо…';

    runGaugeAnimation(finalTheta, () => finishUpgrade(win, items, total, target));
  });

  function finishUpgrade(win, items, total, target) {
    gaugeLocked = false;
    const big = $('#gaugeBig'), small = $('#gaugeSmall');
    const ids = items.map(i => i.id);

    if (win) {
      // Убираем ставку, добавляем единственный дорогой предмет
      state.inventory = state.inventory.filter(i => !ids.includes(i.id));
      state.seq++;
      const upgraded = { id: state.seq, name: target.name, value: target.value, rarity: target.rarity, emoji: target.emoji, img: target.img };
      state.inventory.push(upgraded);
      state.stats.upWins++;
      upgradeSel = [state.seq];
      big.innerHTML = `<span style="color:var(--accent)">${ic('check')} +${fmt(target.value - total)}</span>`;
      small.innerHTML = `<span style="color:var(--accent); font-weight:700;">Апгрейд удался!</span><br>«${target.emoji} ${target.name}» — ${fmt(target.value)} б.`;
      toast(ic('bolt') + ' ' + items.length + ' ' + pluralItems(items.length) + ' → ' + target.name + ' (+' + fmt(target.value - total) + ' б.)!', 'ok');
      snd.win(true);
    } else {
      // Неудача — вся ставка сгорает
      state.inventory = state.inventory.filter(i => !ids.includes(i.id));
      upgradeSel = [];
      big.innerHTML = `<span style="color:var(--red)">${ic('flame')} −${fmt(total)}</span>`;
      small.innerHTML = `<span style="color:var(--red); font-weight:700;">Не повезло.</span><br>${items.length} ${pluralItems(items.length)} сгорело. Дым красивый, но всё…`;
      toast(ic('flame') + ' ' + FAIL_ROASTS[Math.floor(Math.random() * FAIL_ROASTS.length)], 'err');
      snd.upFail();
    }

    saveState();
    refreshInventory();
    updateUpgradeUI();
  }

  /* ============================================================
     9. ПРОФИЛЬ: ежедневный бонус, инвентарь, «Steam», сброс
     ============================================================ */

  /* ---------- Ежедневный бонус (+500 раз в 24 часа) ---------- */

  function dailyAvailable() {
    return Date.now() - (state.lastDaily || 0) >= DAILY_MS;
  }

  function fmtCountdown(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    return String(Math.floor(s / 3600)).padStart(2, '0') + ':' +
           String(Math.floor((s % 3600) / 60)).padStart(2, '0') + ':' +
           String(s % 60).padStart(2, '0');
  }

  function updateDailyUI() {
    const avail = dailyAvailable();
    const btn = $('#dailyBtn'), status = $('#dailyStatus'), card = $('#dailyCard');

    $('#dailyDot').style.display = avail ? 'block' : 'none';
    btn.disabled = !avail;
    btn.textContent = avail ? 'Забрать +' + fmt(DAILY_AMOUNT) : 'Уже забрано';
    card.classList.toggle('ready', avail);

    if (avail) {
      status.innerHTML = 'Бонус доступен: <b>+' + fmt(DAILY_AMOUNT) + ' баллов</b>!';
    } else {
      const msLeft = DAILY_MS - (Date.now() - state.lastDaily);
      status.innerHTML = 'Следующий бонус через <b>' + fmtCountdown(msLeft) + '</b>';
    }
  }

  $('#dailyBtn').addEventListener('click', () => {
    if (!dailyAvailable()) return;
    state.lastDaily = Date.now();
    state.balance += DAILY_AMOUNT;
    saveState();
    bumpBalance();
    updateDailyUI();
    toast(ic('gift') + ' Ежедневный бонус получен: +' + fmt(DAILY_AMOUNT) + ' б.!');
  });

  // Таймер бонуса: обновляем только на активной вкладке профиля, иначе — лишь точку
  setInterval(() => {
    if (document.hidden) return;
    if ($('#tab-profile').classList.contains('active')) updateDailyUI();
    else $('#dailyDot').style.display = dailyAvailable() ? 'block' : 'none';
  }, 1000);

  /* ---------- Инвентарь и статистика ---------- */

  function refreshInventory() {
    renderProfile();
    // Чистим ставку апгрейдера от проданных/сгоревших предметов
    upgradeSel = upgradeSel.filter(id => state.inventory.some(i => i.id === id));
    renderUpgradeInv();
    updateUpgradeUI();
    renderHistory();
    updateSpinPanel(); // обновить суммы в открытой рулетке, если она есть
  }

  function renderProfile() {
    $('#statOpened').textContent = fmt(state.stats.opened);
    $('#statUpgrades').innerHTML = fmt(state.stats.upgrades) +
      (state.stats.upgrades ? ` <small>(${ic('check')} ${fmt(state.stats.upWins)})</small>` : '');
    if (state.stats.best.name) {
      $('#statBest').innerHTML = `<span class="gem">◆</span>${fmt(state.stats.best.value)} <small>${state.stats.best.name}</small>`;
    } else {
      $('#statBest').textContent = '—';
    }

    // Инвентарь (сортировка по цене: дорогое сверху)
    const box = $('#inventory');
    box.innerHTML = '';
    const sorted = [...state.inventory].sort((a, b) => b.value - a.value);
    let total = 0;
    $('#invCount').textContent = sorted.length ? `· ${sorted.length} шт.` : '';

    if (!sorted.length) {
      box.innerHTML = `<div class="empty-note" style="grid-column:1/-1;">Пока пусто. Весь CS2 ждёт тебя в кейсах ${ic('gift')}</div>`;
    } else {
      sorted.forEach((item) => {
        total += item.value;
        const card = document.createElement('div');
        card.className = 'item-card';
        card.style.setProperty('--rc', RARITY[item.rarity].color);
        card.innerHTML = `
          <span class="emo">${skinVisual(item)}</span>
          <span class="nm">${item.name}</span>
          <span class="rl">${RARITY[item.rarity].name}</span>
          <span class="vl"><span class="gem">◆</span> ${fmt(item.value)}</span>
          <button class="sell">Продать +${fmt(item.value)}</button>`;
        card.querySelector('.sell').addEventListener('click', () => sellById(item.id));
        box.appendChild(card);
      });
    }

    const sellAll = $('#sellAllBtn');
    if (total > 0) {
      sellAll.style.display = '';
      sellAll.textContent = `Продать всё · +${fmt(total)}`;
      sellAll.disabled = false;
    } else {
      sellAll.textContent = 'Продать всё';
      sellAll.disabled = true;
    }
  }

  // Продажа предмета по id → баллы на баланс
  function sellById(id) {
    const idx = state.inventory.findIndex(i => i.id === id);
    if (idx === -1) return;
    const item = state.inventory[idx];
    state.inventory.splice(idx, 1);
    state.balance += item.value;
    saveState();
    bumpBalance();
    refreshInventory();
    toast('Продано: ' + item.emoji + ' ' + item.name + ' · +' + fmt(item.value));
  }

  $('#sellAllBtn').addEventListener('click', () => {
    const total = state.inventory.reduce((s, i) => s + i.value, 0);
    if (!total) return;
    const count = state.inventory.length;
    state.inventory = [];
    state.balance += total;
    saveState();
    bumpBalance();
    refreshInventory();
    toast('Продано ' + count + ' предметов. +' + fmt(total) + ' б.!');
  });

  /* ---------- «Вывести в Steam» (подъёбная кнопка) ---------- */

  const STEAM_MSGS = [
    'Секунду, оформляем… Отправка самолётика в Steam: выполнена (в никуда). К сожалению, баллы из localStorage Steam не принимает — у них слишком виртуальная прописка.',
    'Steam принимает скины, деньги и надежду. Баллы из чужого браузера — нет. Технологии пока не доросли, а они и не планируют.',
    'Ты пробуешь уже N раз. Габен ценит упорство, но баллы крепко вросли корнями в твой браузер.',
    'Серьёзно? Ладно, последний раз: баллы — виртуальные. Виртуальное в Steam выводится только в мечтах и в шапке-невидимке.',
    'Окей, признаём: это фича, а не баг. Ты либо очень упорный, либо очень везучий. Оба варианта здесь бесполезны. Открой лучше ещё один кейс — с уважением, сайт',
  ];

  function openSteamModal() {
    const n = state.steamTries++;
    saveState();
    const idx = Math.min(n, STEAM_MSGS.length - 1);
    $('#steamMsg').textContent = STEAM_MSGS[idx].replace('N раз', fmt(n + 1) + ' раз');
    $('#steamCounter').innerHTML = n > 0
      ? 'Попыток вывести баллы за всё время: ' + (state.steamTries) + ' ' + ic('skull')
      : 'Попытка №1. Смелая.';
    openOverlay('#steamOverlay');
  }

  let steamPending = false;
  $('#steamBtn').addEventListener('click', () => {
    if (steamPending) return;
    steamPending = true;
    toast(ic('plane') + ' Оформляем вывод в Steam…', 'info');
    setTimeout(() => { steamPending = false; openSteamModal(); }, 1800);
  });
  $('#steamCloseBtn').addEventListener('click', () => closeOverlay('#steamOverlay'));
  $('#steamOverlay').addEventListener('click', (e) => {
    if (e.target === $('#steamOverlay')) closeOverlay('#steamOverlay');
  });

  /* ---------- «Пополнение»: честно фейковый платёж ---------- */

  // Пополнение живёт не вкладкой, а modalkой поверх сайта
  function openDeposit() {
    updateHeader();
    renderDeposit();
    openOverlay('#depositOverlay');
  }


  /* Секретные промокоды: сам список кодов в исходнике не лежит.
     Коды нужно где-то раздобыть, а сайт проверяет их по хешам. */
  function promoHash(s) {
    let h1 = 0x811c9dc5, h2 = 0x1234567;
    for (let i = 0; i < s.length; i++) {
      h1 ^= s.charCodeAt(i); h1 = Math.imul(h1, 0x01000193) >>> 0;
      h2 ^= (s.charCodeAt(i) + i); h2 = Math.imul(h2, 0x9E3779B1) >>> 0;
    }
    return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
  }
  // Хеши промокодов + бонус + подпись при зачислении. Какие слова за хешами — не сказать.
  const SECRET_PROMOS = [
    { h: '4ce1b2a63a7a4ae4', b: 0.25, label: 'Официальный промокод сайта. Горжаемся' },
    { h: '03fc929596976a2e', b: 0.10, label: 'Промокод бабы Валентины. Она в курсе' },
    { h: '6e14fd77a78e94cf', b: 0.03, label: 'Габен жмёт, но прислал привет' },
    { h: '6cababb47b06fd09', b: 0.37, label: 'Селёдка в торте — теперь и в баллах' },
    { h: '01cf026af6d0a675', b: 0.50, label: 'Я же мать. Родила вам бонус' },
    { h: 'e86168554b500357', b: 0.77, label: 'Мамкин инвестор одобрил платёж' },
    { h: '963409a26f8ebcd1', b: 0.13, label: 'Никто не роБИТ, но бонус у тебя' },
    { h: '862c982e11bcf97c', b: 0.15, label: 'Ещё одна катка — ещё одна надежда' },
    { h: '176dcda5f6c43903', b: 0.20, label: 'Дед передал по-тихому' },
    { h: '462762109a533ad9', b: 0.01, label: 'Шв-иб-иди… почти ничего. Зато честно' },
    { h: 'db704465d946675f', b: 1.00, label: 'Кубик выпал: удвоение зачисления' },
    { h: '568623811767ade3', b: 2.00, label: 'Тестовый промокод, который мы «забыли» удалить' },
  ];
  let promoBonus = 0;       // применённый бонус (0 — без промокода)
  let promoLabel = '';      // подпись к зачислению
  // Шутки на неизвестный код — по кругу
  const PROMO_REJECTS = [
    'Не сработало. Секретные промокоды есть, но этот — не из них.',
    'Мимо. Возможно, ты почти угадал. Возможно — прямо противоположное.',
    'Такого хеша нет ни в одной шляпе. Спрашивай у бабушки Валентины.',
    'Промокод не подошёл. Как и все хорошие промокоды, он где-то далеко.',
    'Отказ. Хотя от чего отказ, депозит-то всё равно фейковый.',
  ];
  let paying = false;         // идёт «оплата»

  function depAmount() {
    const v = Math.floor(Number($('#depAmount').value) || 0);
    return Math.max(0, v);
  }

  function depTotal() {
    const amt = depAmount();
    return promoBonus > 0 ? Math.round(amt * (1 + promoBonus)) : amt;
  }

  function renderDeposit() {
    const amt = depAmount();
    const total = depTotal();
    const bonus = promoBonus > 0 && amt ? total - amt : 0;
    const sum = $('#depSummary');
    if (amt > 0) {
      sum.innerHTML = 'К зачислению: <b style="color:var(--accent)">◆ ' + fmt(total) + '</b>' +
        (bonus ? ' <small>(+' + fmt(bonus) + ' бонус по промокоду)</small>' : '');
    } else {
      sum.innerHTML = 'К зачислению: ◆ 0';
    }
    $('#depPayBtn').disabled = paying || amt <= 0;
  }

  $('#depAmount').addEventListener('input', () => { if (!paying) renderDeposit(); });
  $$('.d-preset').forEach(b => b.addEventListener('click', () => {
    if (paying) return;
    $('#depAmount').value = b.dataset.a;
    renderDeposit();
  }));

  $('#depPromoBtn').addEventListener('click', () => {
    if (paying) return;
    const code = $('#depPromo').value.trim();
    const upper = code.toUpperCase();
    const hit = SECRET_PROMOS.find(p => p.h === promoHash(upper));
    if (hit) {
      if (promoBonus !== hit.b) {
        toast(ic('check') + ' Промокод засчитан: +' + Math.round(hit.b * 100) + '%! ' + hit.label);
      }
      promoBonus = hit.b;
      promoLabel = hit.label;
    } else if (!code) {
      toast('Введите промокод — или платите по полной. Мы не осуждаем.', 'info');
    } else {
      promoBonus = 0;
      promoLabel = '';
      toast(ic('close') + ' ' + PROMO_REJECTS[Math.floor(Math.random() * PROMO_REJECTS.length)], 'err');
    }
    renderDeposit();
  });

  /* ============================================================
     ЗВУКОВОЙ ДВИЖОК: тиxo, приятно, отключается кнопкой в шапке
     ============================================================ */
  const snd = (() => {
    let ctx = null, master = null;
    function ensure() {
      if (state.sound === false) return null;
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.55;            // общий уровень — негромко
        master.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume(); // webkit-политика: старт по жесту
      return master;
    }
    // короткий тихий «тик»
    function blip(freq, when, dur, vol, type) {
      if (!ensure()) return;
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(vol, when + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      o.connect(g).connect(master);
      o.start(when); o.stop(when + dur + 0.05);
    }
    // тики рулетки: плотно в начале, всё реже к остановке (эффект торможения)
    function spin(durMs) {
      if (state.sound === false || !ensure()) return;
      const t0 = ctx.currentTime;
      const N = 22;
      for (let i = 0; i < N; i++) {
        const t = durMs / 1000 * Math.pow(i / N, 1.3);
        blip(1400 + Math.random() * 260, t0 + t, 0.05, 0.016);
      }
    }
    // победа: мягкие тёплые ноты; big — короткая радостная фраза
    function win(big) {
      if (state.sound === false || !ensure()) return;
      const t0 = ctx.currentTime;
      const notes = big ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 783.99];
      notes.forEach((f, i) => {
        blip(f, t0 + i * 0.09, 0.42, 0.06, 'triangle');
      });
    }
    // колесо апгрейдера: низкий шелест, темп под сегменты
    function gaugeTicks(durMs) {
      if (state.sound === false || !ensure()) return;
      const t0 = ctx.currentTime;
      const N = 16;
      for (let i = 0; i < N; i++) {
        const t = durMs / 1000 * Math.pow(i / N, 1.15);
        blip(540 + i * 16, t0 + t, 0.07, 0.02, 'triangle');
      }
    }
    // провал апгрейда: грустное нисходящее, совсем тихо
    function upFail() {
      if (state.sound === false || !ensure()) return;
      const t0 = ctx.currentTime;
      [[392, 0], [293.66, 0.14], [233.08, 0.3]].forEach(([f, d]) => {
        blip(f, t0 + d, 0.35, 0.045, 'sine');
      });
    }
    // UI-клик: еле слышный
    function click() {
      if (state.sound === false || !ensure()) return;
      blip(2100, ctx.currentTime, 0.03, 0.008);
    }
    // отдаём текущий контекст (для аккорда пополнения)
    function ctxNow() { return ctx; }
    return { ensure, spin, win, gaugeTicks, upFail, click, ctxNow };
  })();

  /* Пополнение: мягкий мажорный аккорд через общий движок */
  function depChime() {
    try {
      if (state.sound === false || !snd.ensure()) return;
      const ctx = snd.ctxNow();
      const t0 = ctx.currentTime;
      [[523.25, 0], [659.25, 0.12], [783.99, 0.26]].forEach(([f, d]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + d);
        g.gain.exponentialRampToValueAtTime(0.055, t0 + d + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d + 0.7);
        o.connect(g).connect(ctx.destination);
        o.start(t0 + d); o.stop(t0 + d + 0.75);
      });
    } catch (e) { /* звук не критичен */ }
  }

  $('#depPayBtn').addEventListener('click', () => {
    const amt = depAmount();
    if (amt <= 0 || paying) {
      if (amt <= 0) { toast('Сумма нужна больше нуля. Хотя бы на один балл.', 'err'); }
      return;
    }
    const total = depTotal();
    paying = true;
    $('#depPayBtn').disabled = true;
    const stage = $('#payStage');
    const card = document.querySelector('.deposit-card');
    card.classList.add('paying');
    const fmtBonus = promoBonus > 0 ? '+' + Math.round(promoBonus * 100) + '%' : '';
    const stages = promoBonus > 0
      ? ['Ищем ваш промокод в шляпе…', 'Умножаем на ' + (1 + promoBonus) + ' — магия…', 'Зачисляем баллы из воздуха…']
      : ['Ищем платёжного гения…', 'Гений найден, платёж одобрен…', 'Зачисляем баллы из воздуха…'];
    stage.innerHTML = '<div class="pay-gem"></div><div class="pay-txt">' + ic('clock') + ' ' + stages[0] + '</div>';
    const finish = () => {
      state.balance += total;
      saveState();
      bumpBalance();
      depChime();
      stage.innerHTML = '<div class="pay-gem success"></div><div class="pay-txt ok">' + ic('check') + ' ' +
        ic('coins') + ' Зачислено: +' + fmt(total) + ' б.' + (promoBonus > 0 ? ' (бонус ' + fmtBonus + ')' : '') + '</div>';
      card.classList.remove('paying');
      card.classList.add('success');
      setTimeout(() => card.classList.remove('success'), 900);
      setTimeout(() => { paying = false; renderDeposit(); }, 1400);
      toast(ic('coins') + ' Пополнение на ' + fmt(total) + ' б. зачислено. Счёта не будет — не благодари.', 'ok');
    };
    setTimeout(() => { stage.children[1].innerHTML = ic('clock') + ' ' + stages[1]; }, 750);
    setTimeout(() => { stage.children[1].innerHTML = ic('clock') + ' ' + stages[2]; }, 1450);
    setTimeout(finish, 2100);
  });

  /* ---------- Сброс прогресса ---------- */

  $('#resetBtn').addEventListener('click', () => openOverlay('#confirmOverlay'));
  $('#confirmNoBtn').addEventListener('click', () => closeOverlay('#confirmOverlay'));
  $('#confirmOverlay').addEventListener('click', (e) => {
    if (e.target === $('#confirmOverlay')) closeOverlay('#confirmOverlay');
  });
  $('#confirmYesBtn').addEventListener('click', () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    location.reload(); // перезагрузка пересоздаст состояние со стартовым бонусом
  });

  /* ============================================================
     9.5 LIVE-АКТИВНОСТЬ ДРУГИХ ИГРОКОВ (атмосферная, фейковая:
     реальные предметы кейсов + случайные ники; в историю не попадают)
     ============================================================ */
  const NICKS = [
    'Валерчик228', 'Гоша Слимый', 'Утка Босс', 'акт1803', 'dblochkina',
    'Толя Средний', 'Мусоровоз2', 'Лёха Сигмовидный', 'кибер_бабаха',
    'хомяк_номер5', 'DebИtor', 'тётя Зина', 'МС Пельмень',
  ];

  function nickHTML(nick) {
    return `<span class="nick"><i>${nick[0].toUpperCase()}</i><b>${nick}</b></span>`;
  }

  function fakeLiveDrop() {
    const cs = CASES[(Math.random() * CASES.length) | 0];
    const it = cs.items[(Math.random() * cs.items.length) | 0];
    return { name: it.n, value: it.v, rarity: it.r, emoji: emojiFor(it.n), img: it.img };
  }

  // Добавить чужой дроп в ленту (рендер идентичен своим, + ник владельца)
  function pushFakeDrop(animate) {
    const d = fakeLiveDrop();
    const nick = NICKS[(Math.random() * NICKS.length) | 0];
    const el = document.createElement('div');
    el.className = 'live-item';
    el.style.setProperty('--rc', RARITY[d.rarity].color);
    el.title = `${nick} · ${d.name}`;
    el.innerHTML = nickHTML(nick) + `<span class="e">${skinVisual(d)}</span><span class="v">◆ ${fmt(d.value)}</span>`;
    if (!animate) el.style.animation = 'none';
    const track = $('#liveTrack');
    track.appendChild(el);
    while (track.children.length > MAX_LIVE) track.lastChild.remove();
    $('#liveBar').hidden = false;
  }

  // Начальная отсыпка чужих дропов + «живой» поток с редкими интервалами
  function seedFakeLive() {
    const seed = () => {
      for (let i = 0; i < 6; i++) pushFakeDrop(false);
    };
    seed();
    const tick = () => {
      if (!document.hidden) pushFakeDrop(true);
      setTimeout(tick, 5000 + Math.random() * 7000);
    };
    setTimeout(tick, 4000 + Math.random() * 3000);
  }

  /* ============================================================
     10. ИНИЦИАЛИЗАЦИЯ
     ============================================================ */

  (function init() {
    // Проставить SVG-иконки по data-ic в статичной вёрстке
    document.querySelectorAll('[data-ic]').forEach(el => { el.innerHTML = ic(el.dataset.ic); });
    if (!state.gstyle) state.gstyle = 'norm'; // старые сохранения без стиля прокрутки
    buildGaugeTicks();
    renderGaugeSpeed();
    renderFast(); // восстановить режим
    renderSnd();
    renderCases();
    renderCaseQuickStats();
    renderUpgradeInv();
    updateUpgradeUI();
    renderProfile();
    renderHistory();
    renderLiveFeed();
    seedFakeLive();
    updateHeader();
    setGaugeZone(0);

    // Приветственный бонус для новичка
    if (state.balance === START_BONUS && state.stats.opened === 0) {
      setTimeout(() => toast(ic('gift') + ' Приветственный бонус: +1000 баллов. Удачи (она тебе пригодится)!', 'ok'), 500);
    }
    updateDailyUI();
  })();
