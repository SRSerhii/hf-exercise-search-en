import { useEffect } from 'react';

export default function LanguageSwitcher() {
    useEffect(() => {
        const switcher = document.getElementById("language-switcher-btn");
        if (!switcher) return;

        const path = window.location.pathname;

        const languageMap: Record<string, string> = {
            "/blog/": "/ua/blog/",
            "/post/happy-new-year-2023/": "/ua/post/z-novym-rokom-2023/",
            "/post/animal-vs-plant-protein-which-protein-is-best-for-health-and-strength-based-on-science/": "/ua/post/yakyy-typ-proteinu-krashche-zhidno-z-naukoyu-tvarynnyy-chy-roslynnyy/",
            "/post/4-easy-vegan-pie-recipes-1-bonus-recipe/": "/ua/post/4-prostyh-veganskyh-recepty-pyrogiv/",
            "/post/vitamin-b12-recommendations-based-on-science/": "/ua/post/rekomendacii-zhidno-z-naukoyu-vitamin-b12/",
            "/post/what-is-a-superset-and-should-you-do-supersets-based-on-science/": "/ua/post/shcho-take-superset-i-chy-varto-yogo-vykorystovuvaty-zhidno-z-naukoyu/",
            "/post/top-10-vegan-burger-recipes/": "/ua/post/top-10-receptiv-veganskyh-burgeriv/",
            "/post/can-music-improve-athletic-performance-based-on-science/": "/ua/post/chy-mozhe-muzyka-pokraschyty-rezultaty-v-sporti-zhidno-z-naukoyu/",
            "/post/how-many-sets-should-i-do-to-build-muscle-based-on-science/": "/ua/post/skilky-pidhodiv-potribno-robyty-dlya-rostu-syly-zhidno-z-naukoyu/",
            "/post/science-based-iodine-recommendations/": "/ua/post/rekomendacii-zhidno-z-naukoyu-yod/",
            "/post/should-you-train-to-failure-based-on-science/": "/ua/post/chy-treba-trenuvatysya-do-vidmovy-dlya-rostu-myaziv-zhidno-z-naukoyu/",
            "/post/top-10-motivational-quotes/": "/ua/post/top-10-motyvaciynyh-cytat/",
            "/post/omega-3-fatty-acids-recommendations/": "/ua/post/recomendacii-zhidno-z-naukoyu-omega-3-zhyrni-kysloty/",
            "/post/is-salt-healthy-based-on-science/": "/ua/post/czy-korysna-sil-zhidno-z-naukoyu/",
            "/post/foods-to-improve-performance-in-sports/": "/ua/post/produkty-dlya-pokrashchennya-rezultativ-u-sporti/",
            "/post/healthy-foods-that-last-for-a-long-time-without-a-fridge/": "/ua/post/korysni-produkty-yaki-dovho-zberihayutsya-bez-holodylnyka/",
            "/post/top-7-healthy-nuts-to-eat-based-on-science/": "/ua/post/top-7-korysnyh-horihiv-zhidno-z-naukoyu/",
            "/post/healthy-beverages-based-on-science/": "/ua/post/korysni-napoi-zhidno-z-naukoyu/",
            "/post/recipe-whole-wheat-no-yeast-vegan-pizza-dough/": "/ua/post/recept-cilnozernovogo-veganskogo-tista-dlya-pitsy/",
            "/post/are-nuts-good-for-weight-loss-and-health/": "/ua/post/czy-korysni-horihy-dlha-zdorovya-i-pry-shudnenni/",
            "/post/4-simple-steps-how-i-gained-1-5-kg-per-week-healthily-and-how-you-can-too/": "/ua/post/4-kroky-yak-ya-nabrav-1-5-kg-masy-za-tyzhden/",
            "/post/top-10-healthiest-berries/": "/ua/post/top-10-naykorysnishyh-yahid/",
            "/post/how-to-lose-weight-in-4-easy-steps-science-based/": "/ua/post/4-kroky-yak-shvydko-shudnuty-zhidno-z-naukoyu/",
            "/post/does-listening-to-music-help-with-stress-based-on-science/": "/ua/post/chy-muzyka-dopomagaye-vid-stresu-zhidno-z-naukoyu/",
            "/post/is-having-6-pack-abs-healthy-based-on-science/": "/ua/post/chy-korysno-maty-kubyky-presa-zhidno-z-naukoyu/",
            "/post/is-soy-healthy-based-on-science-or-does-soy-cause-cancer/": "/ua/post/chy-soya-korysna-dlya-nas-zhidno-nauky-chy-soya-spryyaye-rozvytku-raku/",
            "/post/5-healthy-vegan-salad-recipes-oil-free/": "/ua/post/5-zdorovyh-veganskyh-receptiv-salativ-bez-olii/",
            "/post/which-diet-is-the-healthiest-omnivorous-vegetarian-vegan/": "/ua/post/yaka-diyeta-nayzdorovisha-vseyidna-vehetarianska-vehanska/",
            "/post/the-best-way-to-lose-weight-diet-exercise-or-both/": "/ua/post/naykrashhyy-sposib-shudnuty-diyeta-fizychni-vpravy-chy-i-te-i-inshe/",
            "/post/can-diet-prevent-and-treat-diabetes/": "/ua/post/yak-zapobihty-abo-likuvaty-diabet/",
            "/post/is-laughter-the-best-medicine/": "/ua/post/chy-mozhe-smih-likuvaty-usi-hvoroby-zhidno-z-naukoyu/",
            "/post/is-coffee-healthy-or-does-it-increase-the-risk-of-diseases/": "/ua/post/chy-kava-korysna-dlya-zdorovya-i-chy-zbilshuye-vona-ryzyk-zahvoryuvan-zhidno-z-naukoyu/",
            "/post/cardiovascular-disease-risk-factors-prevention-and-treatment/": "/ua/post/sercevo-sudynni-zahvoryuvannya-prychyny-profilaktyka-likuvannya/",
            "/post/is-keto-diet-safe-and-effective-way-to-lose-weight/": "/ua/post/chy-keto-diyeta-bezpechna-i-efektyvna-pry-shudnenni/",
            "/post/what-are-the-scientific-benefits-of-exercise/": "/ua/post/yaki-perevahy-fizychnyh-vprav-zhidno-z-naukoyu/",
            "/post/are-potatoes-healthy-for-you-based-on-science/": "/ua/post/chy-kartoplya-korysna-dlya-nas-zhidno-z-naukoyu/",
            "/post/does-healthy-mindset-really-help-improve-our-results-science-based/": "/ua/post/chy-vplyvaye-na-rezultaty-nashe-myslennya-zhidno-z-naukoyu/",
            "/post/is-hiit-better-than-cardio-based-on-science/": "/ua/post/yaki-trenuvannya-krashchi-viit-chy-kardio/",
            "/post/is-fasting-safe-for-weight-loss-and-health/": "/ua/post/chy-goloduvannia-bezpechne-dlya-shudnennia-i-zdorovya-zhidno-z-naukoyu/",
            "/post/top-5-foods-to-avoid-for-weight-loss-and-health/": "/ua/post/top-5-produktiv-yakyh-slid-unykaty-pry-shudnenni/",
            "/post/what-is-neat-how-to-lose-weight-with-neat/": "/ua/post/shcho-take-neat-yak-shudnuty-bez-fizychnyh-vprav/",
            "/post/how-to-live-longer-by-increasing-telomere-length/": "/ua/post/yak-zhyty-dovshe-zbilshyvshy-dovzhynu-telomer/",
            "/post/vitamin-d-recommendations-dosage-its-impact-on-health/": "/ua/post/vitamin-d-rekomendacii-dozuvannya-vplyv-na-zdorovya/",
            "/post/science-based-macronutrient-recommendations-for-athletes/": "/ua/post/shcho-take-makroelementy-porady-dlya-atletiv-zhidno-z-naukoyu/",
            "/post/how-to-live-10-years-longer-in-4-easy-steps/": "/ua/post/4-prosti-kroky-yak-zhyty-na-10-rokiv-dovshe/",
            "/post/does-meditation-help-with-stress-and-aging-based-on-science/": "/ua/post/chy-dopomagaye-medytaciya-vid-stresu-i-starinnya-zhidno-z-naukoyu/",
            "/post/best-plant-based-protein-foods/": "/ua/post/roslynni-produkty-z-naybilshoyu-kilkistyu-bilka/",
            "/post/what-is-the-best-training-frequency-for-building-muscle-based-on-science/": "/ua/post/yaka-naykrashcha-chastota-trenuvan-dlya-naroshchuvannia-myaziv-zhidno-z-naukoyu/",
            "/post/how-much-protein-can-your-body-absorb-in-one-meal-based-on-science/": "/ua/post/skilky-bilka-mozhe-zasvoity-nashe-tilo-za-odyn-pryyom-yizhi-zhidno-z-naukoyu/",
            "/post/how-to-build-good-habits-in-4-simple-science-based-steps/": "/ua/post/4-prosti-kroky-yak-stvoryty-korysni-zvychky-zhidno-z-naukoyu/",
            "/post/are-calcium-supplements-safe-based-on-science/": "/ua/post/chy-dobavky-z-kalciyem-bezpechni-dlya-zdorovya-zhidno-z-naukoyu/",
            "/post/whats-the-best-nutrition-tracker-app/": "/ua/post/yakyy-treker-kaloriy-naykrashchyy/",
            "/post/are-eggs-healthy-for-weight-loss-and-in-general-based-on-science/": "/ua/post/chy-yaycya-korysni-dlya-shudnennya-i-dlya-zdorovya-v-cilomu-zhidno-z-naukoyu/",
            "/post/why-go-vegan-and-5-easy-steps-how-to-go-vegan-for-beginners/": "/ua/post/navishcho-stavaty-veganom-i-yak-pravylno-pereyty-na-veganstvo/",
            "/contact-me/": "/ua/kontakty/",
            "/terms-of-service/": "/ua/umovy-vykorystannya-sajtu/",
            "/privacy-policy/": "/ua/polityka-konfidencijnosti/",
            "/4-science-based-steps-to-lose-weight-fast-without-exercising/": "/ua/bezkoshtovna-pdf-knyha-yak-shvydko-shudnuty/",
            "/free-pdf-science-based-oil-free-vegan-recipes-in-30-min-or-less/": "/ua/bezkoshtovnyi-pdf-zbirnyk-veganskyh-receptiv-bez-olii-za-30-hv-chy-menshe/",
            "/donate-instruction-pdf-science-based-nutrition-guide-for-health-fitness-biohacking/": "/ua/instrukciya-yak-otrymaty-pdf-gaid-za-donat/",
            "/about-me/": "/ua/pro-mene/",
            "/pdf-science-based-nutrition-guide-for-health-fitness-biohacking/": "/ua/pdf-science-based-nutrition-guide-for-health-fitness-biohacking-ua/",
            "/free-tool-exercises-by-name-muscle-group-equipment/": "/ua/bezkoshtovnyi-instrument-dlya-poshuku-vprav-po-nazvi-grupi-myaziv-obladnannyu/",
            "/": "/ua/",
            "/ua/": "/"
        };

        const target = languageMap[path];

        if (target) {
            switcher.setAttribute("href", target);
            switcher.textContent = path.startsWith("/ua") ? "🇺🇸 English" : "🇺🇦 Українська";
        } else {
            switcher.setAttribute("href", path.startsWith("/ua") ? "/" : "/ua/");
        }
    }, []);

    return (
        <a id="language-switcher-btn" href="#" className="font-normal transition-colors hover:text-green-400">
            Language
        </a>
    );
}
