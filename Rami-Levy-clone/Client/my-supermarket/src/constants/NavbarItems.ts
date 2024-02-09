import { BreadActive, PharmNbabies, houseAndPets, recycle, drinks, candies, weat, cooking, organic, meat, dairy, frozen, fruits, sale, history } from "../assets/icons/active";
import { BreadIn, PharmNbabiesIn, houseAndPetsIn, recycleIn, drinksIn, candiesIn, weatIn, cookingIn, meatIn, dairyIn, frozenIn, fruitsIn, saleIn, historyIn, organicIn } from "../assets/icons/inactive";

export const navbarItems = [
    { label:"היסטוריית רכישה", iconSrc: historyIn, activeIconSrc: history, to: "/history" },
    { label: "מבצעים", iconSrc: saleIn, activeIconSrc: sale, to: "/sale" },
    { label: "פירות וירקות", iconSrc: fruitsIn, activeIconSrc: fruits, to: "/fruits" },
    { label: "חלב ביצים וסלטים", iconSrc: dairyIn, activeIconSrc: dairy, to: "/dairy" },
    { label: "בשר ודגים", iconSrc: meatIn, activeIconSrc: meat, to: "/meat" },
    { label: "אורגני ובריאות", iconSrc: organicIn, activeIconSrc: organic, to: "/organic" },
    { label: "קפואים", iconSrc: frozenIn, activeIconSrc: frozen, to: "/frozen" },
    { label: "שימורים בישול ואפיה", iconSrc: cookingIn, activeIconSrc: cooking, to: "/cooking" },
    { label: "קטניות ודגנים", iconSrc: weatIn, activeIconSrc: weat, to: "/weat" },
    { label: "חטיפים ומתוקים", iconSrc: candiesIn, activeIconSrc: candies, to: "/candies" },
    { label: "משקאות", iconSrc: drinksIn, activeIconSrc: drinks, to: "/drinks" },
    { label: "חד-פעמי ומתכלה", iconSrc: recycleIn, activeIconSrc: recycle, to: "/recycle" },
    { label: "אחזקת הבית ובעלי חיים", iconSrc: houseAndPetsIn, activeIconSrc: houseAndPets, to: "/pets" },
    { label: "פארם ותינוקות", iconSrc: PharmNbabiesIn, activeIconSrc: PharmNbabies, to: "/pharm" },
    { label: "לחם ומאפים טריים", iconSrc: BreadIn, activeIconSrc: BreadActive, to: "/bread" },
    
  ];