import {
  Car,
  Wrench,
  FuelIcon as Engine,
  Disc3,
  BatteryCharging,
  Lightbulb,
  Fan,
  Fuel,
  Filter,
  Gauge,
  SprayCan,
  Shield,
  PowerIcon as Gear,
  ShipWheelIcon as SteeringWheel,
  ShieldIcon as ShockAbsorber,
  CarFront,
  Sofa,
  Thermometer,
  AirVentIcon as ExhaustPipe,
  AirVent,
  ScanEye,
  Droplet,
  FootprintsIcon as Tire,
  Sparkles,
  Lock,
  Headphones,
  Monitor,
  Tv,
  Gift,
  Laptop,
  Shirt,
  Heart,
  Baby,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
  href: string;
  subcategories?: Category[];
}

export const mainCategories: Category[] = [
  {
    name: "Motor qismlari",
    icon: Engine,
    href: "/catalog/ehtiyot-qismlar/motor-qismlari",
    subcategories: [
      {
        name: "Porshenlar",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/porshenlar",
      },
      {
        name: "Klapanlar",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/klapanlar",
      },
      {
        name: "Tirsakli val",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/tirsakli-val",
      },
      {
        name: "Ta'qimlar",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/taqimlar",
      },
      {
        name: "Motor moyi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/motor-moyi",
      },
      {
        name: "Moy nasosi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/moy-nasosi",
      },
      {
        name: "Gidrokompensatorlar",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/gidrokompensatorlar",
      },
      {
        name: "Gaz taqsimlash mexanizmi",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/gaz-taqsimlash-mexanizmi",
      },
      {
        name: "Motor prokladkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/motor-prokladkalari",
      },
      {
        name: "Motor bloklari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari/motor-bloklari",
      },
    ],
  },
  {
    name: "Tormoz tizimi",
    icon: Disc3,
    href: "/catalog/ehtiyot-qismlar/tormoz-tizimi",
    subcategories: [
      {
        name: "Tormoz kolodkalari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-kolodkalari",
      },
      {
        name: "Tormoz disklari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-disklari",
      },
      {
        name: "Tormoz barabanlari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-barabanlari",
      },
      {
        name: "Tormoz suyuqligi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-suyuqligi",
      },
      {
        name: "Tormoz shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-shlanglari",
      },
      {
        name: "Tormoz silindrlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-silindrlari",
      },
      {
        name: "ABS datchiklari",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/abs-datchiklari",
      },
      {
        name: "Tormoz kuchaytirgichi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-kuchaytirgichi",
      },
      {
        name: "Stoyanka tormozi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/stoyanka-tormozi",
      },
      {
        name: "Tormoz trubkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi/tormoz-trubkalari",
      },
    ],
  },
  {
    name: "Elektr qismlari",
    icon: Lightbulb,
    href: "/catalog/ehtiyot-qismlar/elektr-qismlari",
    subcategories: [
      {
        name: "Starter",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/starter",
      },
      {
        name: "Generator",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/generator",
      },
      {
        name: "Shamlar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/shamlar",
      },
      {
        name: "Bobinalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/bobinalar",
      },
      {
        name: "Datchiklar",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/datchiklar",
      },
      {
        name: "Simlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/simlar",
      },
      {
        name: "Rele",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/rele",
      },
      {
        name: "Sigortalar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/sigortalar",
      },
      {
        name: "ECU",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/ecu",
      },
      {
        name: "O'tkazgichlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari/otkazgichlar",
      },
    ],
  },
  {
    name: "Transmissiya",
    icon: Gear,
    href: "/catalog/ehtiyot-qismlar/transmissiya",
    subcategories: [
      {
        name: "Mexanik uzatmalar qutisi",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya/mexanik-uzatmalar-qutisi",
      },
      {
        name: "Avtomatik uzatmalar qutisi",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya/avtomatik-uzatmalar-qutisi",
      },
      {
        name: "Debriyaj",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya/debriyaj",
      },
      {
        name: "Yarim o'qlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/transmissiya/yarim-oqlar",
      },
      {
        name: "Kardan vali",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/transmissiya/kardan-vali",
      },
      {
        name: "Diferensial",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya/diferensial",
      },
      {
        name: "Uzatma moyi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/transmissiya/uzatma-moyi",
      },
      {
        name: "Shruslar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/transmissiya/shruslar",
      },
      {
        name: "Podshipniklar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/transmissiya/podshipniklar",
      },
      {
        name: "Reduktor",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya/reduktor",
      },
    ],
  },
  {
    name: "Rul boshqaruvi",
    icon: SteeringWheel,
    href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi",
    subcategories: [
      {
        name: "Rul reykasi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-reykasi",
      },
      {
        name: "Rul nasosi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-nasosi",
      },
      {
        name: "Rul tyagasi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-tyagasi",
      },
      {
        name: "Rul uchlari",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-uchlari",
      },
      {
        name: "Gidravlik moy",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/gidravlik-moyi",
      },
      {
        name: "Rul kolonkasi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-kolonkasi",
      },
      {
        name: "Rul chambaragi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-chambaragi",
      },
      {
        name: "Rul podshipniklari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-podshipniklari",
      },
      {
        name: "Rul amortizatori",
        icon: ShockAbsorber,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-amortizatori",
      },
      {
        name: "Rul shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi/rul-shlanglari",
      },
    ],
  },
  {
    name: "Osma tizimi",
    icon: ShockAbsorber,
    href: "/catalog/ehtiyot-qismlar/osma-tizimi",
    subcategories: [
      {
        name: "Amortizatorlar",
        icon: ShockAbsorber,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/amortizatorlar",
      },
      {
        name: "Prujinalar",
        icon: ShockAbsorber,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/prujinalar",
      },
      {
        name: "Resorlar",
        icon: ShockAbsorber,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/resorlar",
      },
      {
        name: "Sharnirlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/sharnirlar",
      },
      {
        name: "Saylentbloklar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/saylentbloklar",
      },
      {
        name: "Stabilizatorlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/stabilizatorlar",
      },
      {
        name: "Podshipniklar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/podshipniklar",
      },
      {
        name: "Oporalar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/oporalar",
      },
      {
        name: "Richaglar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/richaglar",
      },
      {
        name: "Balli oporalar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi/balli-oporalar",
      },
    ],
  },
  {
    name: "Kuzov qismlari",
    icon: CarFront,
    href: "/catalog/ehtiyot-qismlar/kuzov-qismlari",
    subcategories: [
      {
        name: "Bamperlar",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/bamperlar",
      },
      {
        name: "Kapot",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/kapot",
      },
      {
        name: "Eshiklar",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/eshiklar",
      },
      {
        name: "Krilolar",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/krilolar",
      },
      {
        name: "Bagaj qopqog'i",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/bagaj-qopqogi",
      },
      {
        name: "Oynalar",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/oynalar",
      },
      {
        name: "Eshik tutqichlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/eshik-tutqichlari",
      },
      {
        name: "Zerkala",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/zerkala",
      },
      {
        name: "Radiator panjarasi",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/radiator-panjarasi",
      },
      {
        name: "Kuzov elementlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari/kuzov-elementlari",
      },
    ],
  },
  {
    name: "Ichki salon",
    icon: Sofa,
    href: "/catalog/ehtiyot-qismlar/ichki-salon",
    subcategories: [
      {
        name: "Sideniyalar",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/sideniyalar",
      },
      {
        name: "Rul chambaragi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/rul-chambaragi",
      },
      {
        name: "Torpedo",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/torpedo",
      },
      {
        name: "Eshik obshivkalari",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/eshik-obshivkalari",
      },
      {
        name: "Poliklar",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/poliklar",
      },
      {
        name: "Chexollar",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/chexollar",
      },
      {
        name: "Magnitola",
        icon: Headphones,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/magnitola",
      },
      {
        name: "Dinamiklar",
        icon: Headphones,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/dinamiklar",
      },
      {
        name: "Konditsioner deflektorlari",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/konditsioner-deflektorlari",
      },
      {
        name: "Salon filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/ichki-salon/salon-filtri",
      },
    ],
  },
  {
    name: "Sovutish tizimi",
    icon: Thermometer,
    href: "/catalog/ehtiyot-qismlar/sovutish-tizimi",
    subcategories: [
      {
        name: "Radiator",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/radiator",
      },
      {
        name: "Suv nasosi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/suv-nasosi",
      },
      {
        name: "Termostat",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/termostat",
      },
      {
        name: "Ventilyator",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/ventilyator",
      },
      {
        name: "Antifriz",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/antifriz",
      },
      {
        name: "Radiator shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/radiator-shlanglari",
      },
      {
        name: "Kengaytirish baki",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/kengaytirish-baki",
      },
      {
        name: "Radiator qopqog'i",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/radiator-qopqogi",
      },
      {
        name: "Termodatchik",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/termodatchik",
      },
      {
        name: "Pechka radiator",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi/pechka-radiator",
      },
    ],
  },
  {
    name: "Yoqilg'i tizimi",
    icon: Fuel,
    href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi",
    subcategories: [
      {
        name: "Benzonasos",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/benzonasos",
      },
      {
        name: "Yoqilg'i filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/yoqilgi-filtri",
      },
      {
        name: "Forsunkalar",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/forsunkalar",
      },
      {
        name: "Yoqilg'i baki",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/yoqilgi-baki",
      },
      {
        name: "Gaz reduktori",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/gaz-reduktori",
      },
      {
        name: "Gaz injektori",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/gaz-injektori",
      },
      {
        name: "Yoqilg'i shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/yoqilgi-shlanglari",
      },
      {
        name: "Yoqilg'i bosimi datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/yoqilgi-bosimi-datchigi",
      },
      {
        name: "Lambda zond",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/lambda-zond",
      },
      {
        name: "Yoqilg'i magistrali",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi/yoqilgi-magistrali",
      },
    ],
  },
  {
    name: "Filtrlar",
    icon: Filter,
    href: "/catalog/ehtiyot-qismlar/filtrlar",
    subcategories: [
      {
        name: "Moy filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/moy-filtri",
      },
      {
        name: "Havo filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/havo-filtri",
      },
      {
        name: "Yoqilg'i filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/yoqilgi-filtri",
      },
      {
        name: "Salon filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/salon-filtri",
      },
      {
        name: "Gaz filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/gaz-filtri",
      },
      {
        name: "Konditsioner filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/konditsioner-filtri",
      },
      {
        name: "Transmissiya filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/transmissiya-filtri",
      },
      {
        name: "Rul gidravlik filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/rul-gidravlik-filtri",
      },
      {
        name: "Shamollatish filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/shamollatish-filtri",
      },
      {
        name: "Suv filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/filtrlar/suv-filtri",
      },
    ],
  },
  {
    name: "Shinalar va disklar",
    icon: Tire,
    href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar",
    subcategories: [
      {
        name: "Yozgi shinalar",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/yozgi-shinalar",
      },
      {
        name: "Qishki shinalar",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/qishki-shinalar",
      },
      {
        name: "Butun mavsum shinalari",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/butun-mavsum-shinalari",
      },
      {
        name: "Yengil qotishma disklar",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/yengil-qotishma-disklar",
      },
      {
        name: "Temir disklar",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/temir-disklar",
      },
      {
        name: "Disk qopqoqlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/disk-qopqoqlari",
      },
      {
        name: "Balansirovka yuklari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/balansirovka-yuklari",
      },
      {
        name: "Shina bosimi datchiklari",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/shina-bosimi-datchiklari",
      },
      {
        name: "Shina ta'mirlash to'plami",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/shina-tamirlash-toplami",
      },
      {
        name: "Ventil",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shinalar-va-disklar/ventil",
      },
    ],
  },
  {
    name: "Akkumulyatorlar",
    icon: BatteryCharging,
    href: "/catalog/ehtiyot-qismlar/akkumulyatorlar",
    subcategories: [
      {
        name: "Akkumulyatorlar",
        icon: BatteryCharging,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyatorlar",
      },
      {
        name: "Akkumulyator klemmasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-klemmasi",
      },
      {
        name: "Akkumulyator zaryadlagich",
        icon: BatteryCharging,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-zaryadlagich",
      },
      {
        name: "Akkumulyator qutisi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-qutisi",
      },
      {
        name: "Akkumulyator kabeli",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-kabeli",
      },
      {
        name: "Akkumulyator suyuqligi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-suyuqligi",
      },
      {
        name: "Akkumulyator indikatori",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-indikatori",
      },
      {
        name: "Akkumulyator izolyatsiyasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-izolyatsiyasi",
      },
      {
        name: "Akkumulyator ushlagichi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-ushlagichi",
      },
      {
        name: "Akkumulyator ventilyatsiyasi",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/akkumulyatorlar/akkumulyator-ventilyatsiyasi",
      },
    ],
  },
  {
    name: "Yoritish",
    icon: Lightbulb,
    href: "/catalog/ehtiyot-qismlar/yoritish",
    subcategories: [
      {
        name: "Faralar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/faralar",
      },
      {
        name: "Orqa fonarlar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/orqa-fonarlar",
      },
      {
        name: "Tumanga qarshi faralar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/tumanga-qarshi-faralar",
      },
      {
        name: "Burilish chiroqlari",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/burilish-chiroqlari",
      },
      {
        name: "Salon yoritgichlari",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/salon-yoritgichlari",
      },
      {
        name: "Ksenon lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/ksenon-lampalar",
      },
      {
        name: "LED lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/led-lampalar",
      },
      {
        name: "Galogen lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/yoritish/galogen-lampalar",
      },
      {
        name: "Faralar yuvish tizimi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/yoritish/faralar-yuvish-tizimi",
      },
      {
        name: "Faralar korpusi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/yoritish/faralar-korpusi",
      },
    ],
  },
  {
    name: "Egzoz tizimi",
    icon: ExhaustPipe,
    href: "/catalog/ehtiyot-qismlar/egzoz-tizimi",
    subcategories: [
      {
        name: "Glushitel",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/glushitel",
      },
      {
        name: "Katalizator",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/katalizator",
      },
      {
        name: "Rezonator",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/rezonator",
      },
      {
        name: "Egzoz kollektori",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-kollektori",
      },
      {
        name: "Kislorod datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/kislorod-datchigi",
      },
      {
        name: "Egzoz trubkasi",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-trubkasi",
      },
      {
        name: "Egzoz prokladkasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-prokladkasi",
      },
      {
        name: "Egzoz klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-klapani",
      },
      {
        name: "Egzoz tizimi qisqichlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-tizimi-qisqichlari",
      },
      {
        name: "Egzoz tizimi kronshteynlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/egzoz-tizimi/egzoz-tizimi-kronshteynlari",
      },
    ],
  },
  {
    name: "Konditsioner tizimi",
    icon: AirVent,
    href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi",
    subcategories: [
      {
        name: "Kompressor",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/kompressor",
      },
      {
        name: "Konditsioner radiator",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-radiator",
      },
      {
        name: "Konditsioner trubkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-trubkalari",
      },
      {
        name: "Konditsioner freoni",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-freoni",
      },
      {
        name: "Konditsioner datchiklari",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-datchiklari",
      },
      {
        name: "Konditsioner klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-klapani",
      },
      {
        name: "Konditsioner filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-filtri",
      },
      {
        name: "Konditsioner ventilyatori",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-ventilyatori",
      },
      {
        name: "Konditsioner boshqaruv bloki",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-boshqaruv-bloki",
      },
      {
        name: "Konditsioner shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/konditsioner-tizimi/konditsioner-shlanglari",
      },
    ],
  },
  {
    name: "Diagnostika asboblari",
    icon: ScanEye,
    href: "/catalog/asboblar/diagnostika-asboblari",
    subcategories: [
      {
        name: "Avtoskannerlar",
        icon: ScanEye,
        href: "/catalog/asboblar/diagnostika-asboblari/avtoskannerlar",
      },
      {
        name: "Multimetrlar",
        icon: Gauge,
        href: "/catalog/asboblar/diagnostika-asboblari/multimetrlar",
      },
      {
        name: "Kompressometrlar",
        icon: Gauge,
        href: "/catalog/asboblar/diagnostika-asboblari/kompressometrlar",
      },
      {
        name: "Akkumulyator testerlari",
        icon: BatteryCharging,
        href: "/catalog/asboblar/diagnostika-asboblari/akkumulyator-testerlari",
      },
      {
        name: "Forsunka testerlari",
        icon: Fuel,
        href: "/catalog/asboblar/diagnostika-asboblari/forsunka-testerlari",
      },
      {
        name: "Tormoz suyuqligi testerlari",
        icon: Droplet,
        href: "/catalog/asboblar/diagnostika-asboblari/tormoz-suyuqligi-testerlari",
      },
      {
        name: "Antifriz testerlari",
        icon: Droplet,
        href: "/catalog/asboblar/diagnostika-asboblari/antifriz-testerlari",
      },
      {
        name: "Bosim o'lchagichlar",
        icon: Gauge,
        href: "/catalog/asboblar/diagnostika-asboblari/bosim-olchagichlar",
      },
      {
        name: "Temperatur o'lchagichlar",
        icon: Thermometer,
        href: "/catalog/asboblar/diagnostika-asboblari/temperatur-olchagichlar",
      },
      {
        name: "Endoskoplar",
        icon: ScanEye,
        href: "/catalog/asboblar/diagnostika-asboblari/endoskoplar",
      },
    ],
  },
  {
    name: "Avto kimyo",
    icon: SprayCan,
    href: "/catalog/kimyo/avto-kimyo",
    subcategories: [
      {
        name: "Motor moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avto-kimyo/motor-moyi",
      },
      {
        name: "Transmissiya moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avto-kimyo/transmissiya-moyi",
      },
      {
        name: "Tormoz suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avto-kimyo/tormoz-suyuqligi",
      },
      {
        name: "Antifriz",
        icon: Droplet,
        href: "/catalog/kimyo/avto-kimyo/antifriz",
      },
      {
        name: "Shisha yuvish suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avto-kimyo/shisha-yuvish-suyuqligi",
      },
      {
        name: "Kuzov yuvish vositasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avto-kimyo/kuzov-yuvish-vositas",
      },
      {
        name: "Salon tozalagich",
        icon: SprayCan,
        href: "/catalog/kimyo/avto-kimyo/salon-tozalagich",
      },
      {
        name: "Polirovka",
        icon: SprayCan,
        href: "/catalog/kimyo/avto-kimyo/polirovka",
      },
      {
        name: "Rustga qarshi vosita",
        icon: SprayCan,
        href: "/catalog/kimyo/avto-kimyo/rustga-qarshi-vosita",
      },
      {
        name: "Germetik",
        icon: SprayCan,
        href: "/catalog/kimyo/avto-kimyo/germetik",
      },
    ],
  },
  {
    name: "Avto aksessuarlar",
    icon: Sparkles,
    href: "/catalog/aksessuarlar/avto-aksessuarlar",
    subcategories: [
      {
        name: "Avto chexollar",
        icon: Sofa,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/avto-chexollar",
      },
      {
        name: "Poliklar",
        icon: Sofa,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/poliklar",
      },
      {
        name: "Rul qoplamalari",
        icon: SteeringWheel,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/rul-qoplamalari",
      },
      {
        name: "Avto magnitola",
        icon: Headphones,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/avto-magnitola",
      },
      {
        name: "Videoregistrator",
        icon: Monitor,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/videoregistrator",
      },
      {
        name: "Navigatsiya",
        icon: Car,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/navigatsiya",
      },
      {
        name: "Parktronik",
        icon: Gauge,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/parktronik",
      },
      {
        name: "Signalizatsiya",
        icon: Shield,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/signalizatsiya",
      },
      {
        name: "Bolalar o'rindig'i",
        icon: Baby,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/bolalar-orindigi",
      },
      {
        name: "Yukxona",
        icon: Car,
        href: "/catalog/aksessuarlar/avto-aksessuarlar/yukxona",
      },
    ],
  },
  {
    name: "Xavfsizlik tizimlari",
    icon: Shield,
    href: "/catalog/xavfsizlik/xavfsizlik-tizimlari",
    subcategories: [
      {
        name: "Signalizatsiya",
        icon: Shield,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/signalizatsiya",
      },
      {
        name: "Immobilayzer",
        icon: Lock,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/immobilayzer",
      },
      {
        name: "Markaziy qulf",
        icon: Lock,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/markaziy-qulf",
      },
      {
        name: "Xavfsizlik yostiqchalari",
        icon: Shield,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/xavfsizlik-yostiqchalari",
      },
      {
        name: "ABS",
        icon: Disc3,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/abs",
      },
      {
        name: "ESP",
        icon: Car,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/esp",
      },
      {
        name: "Tormoz kuchaytirgichi",
        icon: Wrench,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/tormoz-kuchaytirgichi",
      },
      {
        name: "Kamera",
        icon: ScanEye,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/kamera",
      },
      {
        name: "Datchiklar",
        icon: Gauge,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/datchiklar",
      },
      {
        name: "Bolalar qulflari",
        icon: Lock,
        href: "/catalog/xavfsizlik/xavfsizlik-tizimlari/bolalar-qulflari",
      },
    ],
  },
  {
    name: "Avtomobil brendlari",
    icon: Car,
    href: "/catalog/brendlar",
    subcategories: [
      { name: "Chevrolet", icon: Car, href: "/catalog/brendlar/chevrolet" },
      {
        name: "Mercedes-Benz",
        icon: Car,
        href: "/catalog/brendlar/mercedes-benz",
      },
      { name: "BMW", icon: Car, href: "/catalog/brendlar/bmw" },
      { name: "Toyota", icon: Car, href: "/catalog/brendlar/toyota" },
      { name: "Volkswagen", icon: Car, href: "/catalog/brendlar/volkswagen" },
      { name: "Hyundai", icon: Car, href: "/catalog/brendlar/hyundai" },
      { name: "Audi", icon: Car, href: "/catalog/brendlar/audi" },
      { name: "Ford", icon: Car, href: "/catalog/brendlar/ford" },
      { name: "Honda", icon: Car, href: "/catalog/brendlar/honda" },
      { name: "Kia", icon: Car, href: "/catalog/brendlar/kia" },
    ],
  },
  {
    name: "Avtomobil modellari",
    icon: Car,
    href: "/catalog/modellar",
    subcategories: [
      { name: "Lacetti", icon: Car, href: "/catalog/modellar/lacetti" },
      { name: "Cobalt", icon: Car, href: "/catalog/modellar/cobalt" },
      { name: "Gentra", icon: Car, href: "/catalog/modellar/gentra" },
      { name: "Nexia 3", icon: Car, href: "/catalog/modellar/nexia-3" },
      { name: "Spark", icon: Car, href: "/catalog/modellar/spark" },
      { name: "Captiva", icon: Car, href: "/catalog/modellar/captiva" },
      { name: "Malibu", icon: Car, href: "/catalog/modellar/malibu" },
      { name: "Tracker", icon: Car, href: "/catalog/modellar/tracker" },
      { name: "Equinox", icon: Car, href: "/catalog/modellar/equinox" },
      { name: "Tahoe", icon: Car, href: "/catalog/modellar/tahoe" },
    ],
  },
  {
    name: "Shassi qismlari",
    icon: Car,
    href: "/catalog/ehtiyot-qismlar/shassi-qismlari",
    subcategories: [
      {
        name: "G'ildirak podshipniklari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-podshipniklari",
      },
      {
        name: "G'ildirak studlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-studlari",
      },
      {
        name: "G'ildirak gaykalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-gaykalari",
      },
      {
        name: "G'ildirak disk boltlar",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-disk-boltlar",
      },
      {
        name: "G'ildirak tormoz silindrlari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-silindrlari",
      },
      {
        name: "G'ildirak tormoz barabanlari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-barabanlari",
      },
      {
        name: "G'ildirak tormoz kolodkalari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-kolodkalari",
      },
      {
        name: "G'ildirak tormoz disklari",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-disklari",
      },
      {
        name: "G'ildirak tormoz shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-shlanglari",
      },
      {
        name: "G'ildirak tormoz suyuqligi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/shassi-qismlari/gildirak-tormoz-suyuqligi",
      },
    ],
  },
  {
    name: "Oyna tozalagich tizimi",
    icon: Wrench,
    href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi",
    subcategories: [
      {
        name: "Oyna tozalagich motori",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-tozalagich-motori",
      },
      {
        name: "Oyna tozalagich richagi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-tozalagich-richagi",
      },
      {
        name: "Oyna tozalagich rezinkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-tozalagich-rezinkalari",
      },
      {
        name: "Oyna yuvish nasosi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-nasosi",
      },
      {
        name: "Oyna yuvish suyuqligi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-suyuqligi",
      },
      {
        name: "Oyna yuvish bak",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-bak",
      },
      {
        name: "Oyna yuvish shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-shlanglari",
      },
      {
        name: "Oyna yuvish datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-datchigi",
      },
      {
        name: "Oyna yuvish klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-klapani",
      },
      {
        name: "Oyna yuvish forsunka",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/oyna-tozalagich-tizimi/oyna-yuvish-forsunka",
      },
    ],
  },
  {
    name: "Kremalash tizimi",
    icon: Wrench,
    href: "/catalog/ehtiyot-qismlar/kremalash-tizimi",
    subcategories: [
      {
        name: "Kremalash nasosi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-nasosi",
      },
      {
        name: "Kremalash moyi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-moyi",
      },
      {
        name: "Kremalash filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-filtri",
      },
      {
        name: "Kremalash shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-shlanglari",
      },
      {
        name: "Kremalash klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-klapani",
      },
      {
        name: "Kremalash datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-datchigi",
      },
      {
        name: "Kremalash bak",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-bak",
      },
      {
        name: "Kremalash trubkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-trubkalari",
      },
      {
        name: "Kremalash tizimi prokladkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-tizimi-prokladkalari",
      },
      {
        name: "Kremalash tizimi kronshteynlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/kremalash-tizimi/kremalash-tizimi-kronshteynlari",
      },
    ],
  },
  {
    name: "Kuzovni ta'mirlash",
    icon: Wrench,
    href: "/catalog/xizmatlar/kuzovni-tamirlash",
    subcategories: [
      {
        name: "Kraska",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/kraska",
      },
      {
        name: "Shpaklyovka",
        icon: Wrench,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/shpaklyovka",
      },
      {
        name: "Primer",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/primer",
      },
      {
        name: "Lak",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/lak",
      },
      {
        name: "Qum qog'oz",
        icon: Wrench,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/qum-qogoz",
      },
      {
        name: "Polirovka pastasi",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/polirovka-pastasi",
      },
      {
        name: "Antikor",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/antikor",
      },
      {
        name: "Payvandlash asboblari",
        icon: Wrench,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/payvandlash-asboblari",
      },
      {
        name: "Kuzovni tortish asboblari",
        icon: Wrench,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/kuzovni-tortish-asboblari",
      },
      {
        name: "Kuzovni yuvish vositalari",
        icon: SprayCan,
        href: "/catalog/xizmatlar/kuzovni-tamirlash/kuzovni-yuvish-vositalari",
      },
    ],
  },
  {
    name: "Shinalarni montaj qilish",
    icon: Tire,
    href: "/catalog/xizmatlar/shinalarni-montaj-qilish",
    subcategories: [
      {
        name: "Shina montaj uskunalari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-montaj-uskunalari",
      },
      {
        name: "Balansirovka uskunalari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/balansirovka-uskunalari",
      },
      {
        name: "Shina ta'mirlash materiallari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-tamirlash-materiallari",
      },
      {
        name: "Shina yamoqlari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-yamoqlari",
      },
      {
        name: "Shina kleylari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-kleylari",
      },
      {
        name: "Shina ventillari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-ventillari",
      },
      {
        name: "Shina bosimi o'lchagichlar",
        icon: Gauge,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-bosimi-olchagichlar",
      },
      {
        name: "Shina nasoslari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-nasoslari",
      },
      {
        name: "Shina yuvish vositalari",
        icon: SprayCan,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-yuvish-vositalari",
      },
      {
        name: "Shina saqlash qopqoqlari",
        icon: Wrench,
        href: "/catalog/xizmatlar/shinalarni-montaj-qilish/shina-saqlash-qopqoqlari",
      },
    ],
  },
  {
    name: "Avtomobil yuvish",
    icon: Car,
    href: "/catalog/xizmatlar/avtomobil-yuvish",
    subcategories: [
      {
        name: "Avto shampunlar",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/avto-shampunlar",
      },
      {
        name: "Salon tozalagichlar",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/salon-tozalagichlar",
      },
      {
        name: "Polirovka vositalari",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/polirovka-vositalari",
      },
      {
        name: "Mikrofibra salfetkalar",
        icon: Wrench,
        href: "/catalog/xizmatlar/avtomobil-yuvish/mikrofibra-salfetkalar",
      },
      {
        name: "Yuvish gubkalari",
        icon: Wrench,
        href: "/catalog/xizmatlar/avtomobil-yuvish/yuvish-gubkalari",
      },
      {
        name: "Shisha tozalagichlar",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/shisha-tozalagichlar",
      },
      {
        name: "Disk tozalagichlar",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/disk-tozalagichlar",
      },
      {
        name: "Shina qoraytirgichlar",
        icon: SprayCan,
        href: "/catalog/xizmatlar/avtomobil-yuvish/shina-qoraytirgichlar",
      },
      {
        name: "Quritish sochiqlari",
        icon: Wrench,
        href: "/catalog/xizmatlar/avtomobil-yuvish/quritish-sochiqlari",
      },
      {
        name: "Vakuum tozalagichlar",
        icon: Wrench,
        href: "/catalog/xizmatlar/avtomobil-yuvish/vakuum-tozalagichlar",
      },
    ],
  },
  {
    name: "Tuning",
    icon: Car,
    href: "/catalog/tuning",
    subcategories: [
      {
        name: "Sport amortizatorlar",
        icon: ShockAbsorber,
        href: "/catalog/tuning/sport-amortizatorlar",
      },
      {
        name: "Sport prujinalar",
        icon: ShockAbsorber,
        href: "/catalog/tuning/sport-prujinalar",
      },
      {
        name: "Sport tormoz tizimi",
        icon: Disc3,
        href: "/catalog/tuning/sport-tormoz-tizimi",
      },
      {
        name: "Sport egzoz tizimi",
        icon: ExhaustPipe,
        href: "/catalog/tuning/sport-egzoz-tizimi",
      },
      {
        name: "Sport havo filtri",
        icon: Filter,
        href: "/catalog/tuning/sport-havo-filtri",
      },
      {
        name: "Sport rul chambaragi",
        icon: SteeringWheel,
        href: "/catalog/tuning/sport-rul-chambaragi",
      },
      {
        name: "Sport sideniyalar",
        icon: Sofa,
        href: "/catalog/tuning/sport-sideniyalar",
      },
      {
        name: "Body kitlar",
        icon: CarFront,
        href: "/catalog/tuning/body-kitlar",
      },
      {
        name: "Spoillerlar",
        icon: CarFront,
        href: "/catalog/tuning/spoillerlar",
      },
      {
        name: "Disklarni o'zgartirish",
        icon: Disc3,
        href: "/catalog/tuning/disklarni-ozgartirish",
      },
    ],
  },
  {
    name: "Asboblar to'plami",
    icon: Wrench,
    href: "/catalog/asboblar/asboblar-toplami",
    subcategories: [
      {
        name: "Kalitlar to'plami",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/kalitlar-toplami",
      },
      {
        name: "Otvyortkalar to'plami",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/otvyortkalar-toplami",
      },
      {
        name: "Ploskogubtsilar",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/ploskogubtsilar",
      },
      {
        name: "Molotoklar",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/molotoklar",
      },
      {
        name: "Domkratlar",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/domkratlar",
      },
      {
        name: "Balon kalitlari",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/balon-kalitlari",
      },
      {
        name: "Kompressorlar",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/kompressorlar",
      },
      {
        name: "Payvandlash apparatlari",
        icon: Wrench,
        href: "/catalog/asboblar/asboblar-toplami/payvandlash-apparatlari",
      },
      {
        name: "Diagnostika asboblari",
        icon: ScanEye,
        href: "/catalog/asboblar/asboblar-toplami/diagnostika-asboblari",
      },
      {
        name: "Himoya vositalari",
        icon: Shield,
        href: "/catalog/asboblar/asboblar-toplami/himoya-vositalari",
      },
    ],
  },
  {
    name: "Elektronika va multimedia",
    icon: Laptop,
    href: "/catalog/elektronika-multimedia",
    subcategories: [
      {
        name: "Avto magnitola",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avto-magnitola",
      },
      {
        name: "Dinamiklar",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/dinamiklar",
      },
      {
        name: "Videoregistratorlar",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/videoregistratorlar",
      },
      {
        name: "Navigatsiya tizimlari",
        icon: Car,
        href: "/catalog/elektronika-multimedia/navigatsiya-tizimlari",
      },
      {
        name: "Parktroniklar",
        icon: Gauge,
        href: "/catalog/elektronika-multimedia/parktroniklar",
      },
      {
        name: "Orqa ko'rinish kameralari",
        icon: ScanEye,
        href: "/catalog/elektronika-multimedia/orqa-korinish-kameralari",
      },
      {
        name: "Signalizatsiya tizimlari",
        icon: Shield,
        href: "/catalog/elektronika-multimedia/signalizatsiya-tizimlari",
      },
      {
        name: "Avto televizorlar",
        icon: Tv,
        href: "/catalog/elektronika-multimedia/avto-televizorlar",
      },
      {
        name: "USB zaryadlagichlar",
        icon: BatteryCharging,
        href: "/catalog/elektronika-multimedia/usb-zaryadlagichlar",
      },
      {
        name: "Invertorlar",
        icon: Lightbulb,
        href: "/catalog/elektronika-multimedia/invertorlar",
      },
    ],
  },
  {
    name: "Kuzatuv tizimlari",
    icon: ScanEye,
    href: "/catalog/xavfsizlik/kuzatuv-tizimlari",
    subcategories: [
      {
        name: "Videoregistratorlar",
        icon: Monitor,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/videoregistratorlar",
      },
      {
        name: "Orqa ko'rinish kameralari",
        icon: ScanEye,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/orqa-korinish-kameralari",
      },
      {
        name: "Parktroniklar",
        icon: Gauge,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/parktroniklar",
      },
      {
        name: "Ko'r zona datchiklari",
        icon: Gauge,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/kor-zona-datchiklari",
      },
      {
        name: "Shina bosimi monitoringi",
        icon: Tire,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/shina-bosimi-monitoringi",
      },
      {
        name: "GPS trekerlar",
        icon: Car,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/gps-trekerlar",
      },
      {
        name: "Avto signalizatsiya",
        icon: Shield,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/avto-signalizatsiya",
      },
      {
        name: "Immobilayzerlar",
        icon: Lock,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/immobilayzerlar",
      },
      {
        name: "Tashqi kuzatuv kameralari",
        icon: ScanEye,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/tashqi-kuzatuv-kameralari",
      },
      {
        name: "Ichki kuzatuv kameralari",
        icon: ScanEye,
        href: "/catalog/xavfsizlik/kuzatuv-tizimlari/ichki-kuzatuv-kameralari",
      },
    ],
  },
  {
    name: "Avtomobil uchun tozalash",
    icon: SprayCan,
    href: "/catalog/kimyo/avtomobil-uchun-tozalash",
    subcategories: [
      {
        name: "Avto shampunlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/avto-shampunlar",
      },
      {
        name: "Salon tozalagichlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/salon-tozalagichlar",
      },
      {
        name: "Disk tozalagichlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/disk-tozalagichlar",
      },
      {
        name: "Shisha tozalagichlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/shisha-tozalagichlar",
      },
      {
        name: "Plastik tozalagichlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/plastik-tozalagichlar",
      },
      {
        name: "Charm tozalagichlar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/charm-tozalagichlar",
      },
      {
        name: "Quritish vositalari",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/quritish-vositalari",
      },
      {
        name: "Polirovka vositalari",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/polirovka-vositalari",
      },
      {
        name: "Antifog",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/antifog",
      },
      {
        name: "Dezinfektsiya vositalari",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-tozalash/dezinfektsiya-vositalari",
      },
    ],
  },
  {
    name: "Avtomobil uchun himoya",
    icon: Shield,
    href: "/catalog/kimyo/avtomobil-uchun-himoya",
    subcategories: [
      {
        name: "Antikor",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/antikor",
      },
      {
        name: "Rustga qarshi vosita",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/rustga-qarshi-vosita",
      },
      {
        name: "Germetiklar",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/germetiklar",
      },
      {
        name: "Shisha himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/shisha-himoyasi",
      },
      {
        name: "Kuzov himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/kuzov-himoyasi",
      },
      {
        name: "Plastik himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/plastik-himoyasi",
      },
      {
        name: "Charm himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/charm-himoyasi",
      },
      {
        name: "Shina himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/shina-himoyasi",
      },
      {
        name: "Motor himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/motor-himoyasi",
      },
      {
        name: "Radiator himoyasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-himoya/radiator-himoyasi",
      },
    ],
  },
  {
    name: "Avtomobil uchun moylar",
    icon: Droplet,
    href: "/catalog/kimyo/avtomobil-uchun-moylar",
    subcategories: [
      {
        name: "Motor moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/motor-moyi",
      },
      {
        name: "Transmissiya moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/transmissiya-moyi",
      },
      {
        name: "Rul gidravlik moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/rul-gidravlik-moyi",
      },
      {
        name: "Tormoz suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/tormoz-suyuqligi",
      },
      {
        name: "Antifriz",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/antifriz",
      },
      {
        name: "Reduktor moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/reduktor-moyi",
      },
      {
        name: "Kremalash moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/kremalash-moyi",
      },
      {
        name: "Shisha yuvish suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/shisha-yuvish-suyuqligi",
      },
      {
        name: "Konditsioner freoni",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/konditsioner-freoni",
      },
      {
        name: "Dizel yoqilg'isi qo'shimchalari",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-moylar/dizel-yoqilgisi-qoshimchalari",
      },
    ],
  },
  {
    name: "Avtomobil uchun ehtiyot qismlar",
    icon: Wrench,
    href: "/catalog/ehtiyot-qismlar",
    subcategories: [
      {
        name: "Motor qismlari",
        icon: Engine,
        href: "/catalog/ehtiyot-qismlar/motor-qismlari",
      },
      {
        name: "Tormoz tizimi",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/tormoz-tizimi",
      },
      {
        name: "Elektr qismlari",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/elektr-qismlari",
      },
      {
        name: "Transmissiya",
        icon: Gear,
        href: "/catalog/ehtiyot-qismlar/transmissiya",
      },
      {
        name: "Rul boshqaruvi",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/rul-boshqaruvi",
      },
      {
        name: "Osma tizimi",
        icon: ShockAbsorber,
        href: "/catalog/ehtiyot-qismlar/osma-tizimi",
      },
      {
        name: "Kuzov qismlari",
        icon: CarFront,
        href: "/catalog/ehtiyot-qismlar/kuzov-qismlari",
      },
      {
        name: "Ichki salon",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/ichki-salon",
      },
      {
        name: "Sovutish tizimi",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/sovutish-tizimi",
      },
      {
        name: "Yoqilg'i tizimi",
        icon: Fuel,
        href: "/catalog/ehtiyot-qismlar/yoqilgi-tizimi",
      },
    ],
  },
  {
    name: "Maxsus takliflar",
    icon: Gift,
    href: "/catalog/maxsus-takliflar",
    subcategories: [
      {
        name: "Chegirmalar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/chegirmalar",
      },
      {
        name: "Aksiyalar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/aksiyalar",
      },
      {
        name: "Yangi kelganlar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/yangi-kelganlar",
      },
      {
        name: "Eng ko'p sotilganlar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/eng-kop-sotilganlar",
      },
      {
        name: "Eng ko'p yoqtirilganlar",
        icon: Heart,
        href: "/catalog/maxsus-takliflar/eng-kop-yoqtirilganlar",
      },
      {
        name: "To'plamlar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/toplamlar",
      },
      {
        name: "Sovg'a kartalari",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/sovga-kartalari",
      },
      {
        name: "Bepul yetkazib berish",
        icon: Car,
        href: "/catalog/maxsus-takliflar/bepul-yetkazib-berish",
      },
      {
        name: "Rassrochka",
        icon: Wrench,
        href: "/catalog/maxsus-takliflar/rassrochka",
      },
      {
        name: "Bonuslar",
        icon: Gift,
        href: "/catalog/maxsus-takliflar/bonuslar",
      },
    ],
  },
  {
    name: "Avtomobil uchun g'amxo'rlik",
    icon: Car,
    href: "/catalog/avtomobil-uchun-gamxorlik",
    subcategories: [
      {
        name: "Yuvish vositalari",
        icon: SprayCan,
        href: "/catalog/avtomobil-uchun-gamxorlik/yuvish-vositalari",
      },
      {
        name: "Polirovka",
        icon: SprayCan,
        href: "/catalog/avtomobil-uchun-gamxorlik/polirovka",
      },
      {
        name: "Salon tozalash",
        icon: SprayCan,
        href: "/catalog/avtomobil-uchun-gamxorlik/salon-tozalash",
      },
      {
        name: "Himoya qoplamalari",
        icon: Shield,
        href: "/catalog/avtomobil-uchun-gamxorlik/himoya-qoplamalari",
      },
      {
        name: "Moy almashtirish",
        icon: Droplet,
        href: "/catalog/avtomobil-uchun-gamxorlik/moy-almashtirish",
      },
      {
        name: "Filtrlarni almashtirish",
        icon: Filter,
        href: "/catalog/avtomobil-uchun-gamxorlik/filtrlarni-almashtirish",
      },
      {
        name: "Tormoz tizimini tekshirish",
        icon: Disc3,
        href: "/catalog/avtomobil-uchun-gamxorlik/tormoz-tizimini-tekshirish",
      },
      {
        name: "Shinalarni almashtirish",
        icon: Tire,
        href: "/catalog/avtomobil-uchun-gamxorlik/shinalarni-almashtirish",
      },
      {
        name: "Akkumulyatorni tekshirish",
        icon: BatteryCharging,
        href: "/catalog/avtomobil-uchun-gamxorlik/akkumulyatorni-tekshirish",
      },
      {
        name: "Diagnostika",
        icon: ScanEye,
        href: "/catalog/avtomobil-uchun-gamxorlik/diagnostika",
      },
    ],
  },
  {
    name: "Yuk mashinalari uchun",
    icon: Car, // Using generic car icon for now
    href: "/catalog/yuk-mashinalari",
    subcategories: [
      {
        name: "Yuk motor qismlari",
        icon: Engine,
        href: "/catalog/yuk-mashinalari/yuk-motor-qismlari",
      },
      {
        name: "Yuk tormoz tizimi",
        icon: Disc3,
        href: "/catalog/yuk-mashinalari/yuk-tormoz-tizimi",
      },
      {
        name: "Yuk elektr qismlari",
        icon: Lightbulb,
        href: "/catalog/yuk-mashinalari/yuk-elektr-qismlari",
      },
      {
        name: "Yuk transmissiya",
        icon: Gear,
        href: "/catalog/yuk-mashinalari/yuk-transmissiya",
      },
      {
        name: "Yuk shinalari",
        icon: Tire,
        href: "/catalog/yuk-mashinalari/yuk-shinalari",
      },
      {
        name: "Yuk kuzov qismlari",
        icon: CarFront,
        href: "/catalog/yuk-mashinalari/yuk-kuzov-qismlari",
      },
      {
        name: "Yuk filtrlari",
        icon: Filter,
        href: "/catalog/yuk-mashinalari/yuk-filtrlari",
      },
      {
        name: "Yuk akkumulyatorlari",
        icon: BatteryCharging,
        href: "/catalog/yuk-mashinalari/yuk-akkumulyatorlari",
      },
      {
        name: "Yuk moylari",
        icon: Droplet,
        href: "/catalog/yuk-mashinalari/yuk-moylari",
      },
      {
        name: "Yuk aksessuarlari",
        icon: Sparkles,
        href: "/catalog/yuk-mashinalari/yuk-aksessuarlari",
      },
    ],
  },
  {
    name: "Mototsikllar uchun",
    icon: Car, // Using generic car icon for now
    href: "/catalog/mototsikllar",
    subcategories: [
      {
        name: "Mototsikl motor qismlari",
        icon: Engine,
        href: "/catalog/mototsikllar/mototsikl-motor-qismlari",
      },
      {
        name: "Mototsikl tormoz tizimi",
        icon: Disc3,
        href: "/catalog/mototsikllar/mototsikl-tormoz-tizimi",
      },
      {
        name: "Mototsikl elektr qismlari",
        icon: Lightbulb,
        href: "/catalog/mototsikllar/mototsikl-elektr-qismlari",
      },
      {
        name: "Mototsikl shinalari",
        icon: Tire,
        href: "/catalog/mototsikllar/mototsikl-shinalari",
      },
      {
        name: "Mototsikl filtrlari",
        icon: Filter,
        href: "/catalog/mototsikllar/mototsikl-filtrlari",
      },
      {
        name: "Mototsikl akkumulyatorlari",
        icon: BatteryCharging,
        href: "/catalog/mototsikllar/mototsikl-akkumulyatorlari",
      },
      {
        name: "Mototsikl moylari",
        icon: Droplet,
        href: "/catalog/mototsikllar/mototsikl-moylari",
      },
      {
        name: "Mototsikl aksessuarlari",
        icon: Sparkles,
        href: "/catalog/mototsikllar/mototsikl-aksessuarlari",
      },
      {
        name: "Mototsikl kaskalari",
        icon: Shield,
        href: "/catalog/mototsikllar/mototsikl-kaskalari",
      },
      {
        name: "Mototsikl kiyimlari",
        icon: Shirt,
        href: "/catalog/mototsikllar/mototsikl-kiyimlari",
      },
    ],
  },
  {
    name: "Maxsus texnika uchun",
    icon: Wrench,
    href: "/catalog/maxsus-texnika",
    subcategories: [
      {
        name: "Traktor ehtiyot qismlari",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/traktor-ehtiyot-qismlari",
      },
      {
        name: "Ekskavator ehtiyot qismlari",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/ekskavator-ehtiyot-qismlari",
      },
      {
        name: "Buldozer ehtiyot qismlari",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/buldozer-ehtiyot-qismlari",
      },
      {
        name: "Kran ehtiyot qismlari",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/kran-ehtiyot-qismlari",
      },
      {
        name: "Qishloq xo'jaligi texnikasi",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/qishloq-xojaligi-texnikasi",
      },
      {
        name: "Qurilish texnikasi",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/qurilish-texnikasi",
      },
      {
        name: "Yo'l qurilish texnikasi",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/yol-qurilish-texnikasi",
      },
      {
        name: "Kommunal texnika",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/kommunal-texnika",
      },
      {
        name: "Ombor texnikasi",
        icon: Wrench,
        href: "/catalog/maxsus-texnika/ombor-texnikasi",
      },
      {
        name: "Maxsus moylar",
        icon: Droplet,
        href: "/catalog/maxsus-texnika/maxsus-moylar",
      },
    ],
  },
  {
    name: "Avtomobil uchun audio",
    icon: Headphones,
    href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio",
    subcategories: [
      {
        name: "Magnitola",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/magnitola",
      },
      {
        name: "Dinamiklar",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/dinamiklar",
      },
      {
        name: "Sabvuferlar",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/sabvuferlar",
      },
      {
        name: "Kuchaytirgichlar",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/kuchaytirgichlar",
      },
      {
        name: "Kondensatorlar",
        icon: Headphones,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/kondensatorlar",
      },
      {
        name: "Kabel to'plamlari",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/kabel-toplamlari",
      },
      {
        name: "Shovqin izolyatsiyasi",
        icon: Sofa,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/shovqin-izolyatsiyasi",
      },
      {
        name: "Antennalar",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/antennalar",
      },
      {
        name: "Adapterlar",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/adapterlar",
      },
      {
        name: "O'rnatish ramkalari",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-audio/ornatish-ramkalari",
      },
    ],
  },
  {
    name: "Avtomobil uchun video",
    icon: Monitor,
    href: "/catalog/elektronika-multimedia/avtomobil-uchun-video",
    subcategories: [
      {
        name: "Videoregistratorlar",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/videoregistratorlar",
      },
      {
        name: "Orqa ko'rinish kameralari",
        icon: ScanEye,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/orqa-korinish-kameralari",
      },
      {
        name: "Parktroniklar",
        icon: Gauge,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/parktroniklar",
      },
      {
        name: "Monitorlar",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/monitorlar",
      },
      {
        name: "Avto televizorlar",
        icon: Tv,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/avto-televizorlar",
      },
      {
        name: "DVD pleerlar",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/dvd-pleerlar",
      },
      {
        name: "Multimedia tizimlari",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/multimedia-tizimlari",
      },
      {
        name: "O'rnatish aksessuarlari",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/ornatish-aksessuarlari",
      },
      {
        name: "Kabel va adapterlar",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/kabel-va-adapterlar",
      },
      {
        name: "Tashqi xotira qurilmalari",
        icon: Monitor,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-video/tashqi-xotira-qurilmalari",
      },
    ],
  },
  {
    name: "Avtomobil uchun isitish",
    icon: Thermometer,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish",
    subcategories: [
      {
        name: "Pechka radiator",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/pechka-radiator",
      },
      {
        name: "Pechka motori",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/pechka-motori",
      },
      {
        name: "Pechka klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/pechka-klapani",
      },
      {
        name: "Pechka datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/pechka-datchigi",
      },
      {
        name: "Pechka boshqaruv bloki",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/pechka-boshqaruv-bloki",
      },
      {
        name: "Isitish shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/isitish-shlanglari",
      },
      {
        name: "Isitish elementlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/isitish-elementlari",
      },
      {
        name: "O'rindiq isitgichlari",
        icon: Sofa,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/orindiq-isitgichlari",
      },
      {
        name: "Rul isitgichlari",
        icon: SteeringWheel,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/rul-isitgichlari",
      },
      {
        name: "Avtonom isitgichlar",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-isitish/avtonom-isitgichlar",
      },
    ],
  },
  {
    name: "Avtomobil uchun sovutish",
    icon: Thermometer,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish",
    subcategories: [
      {
        name: "Radiator",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/radiator",
      },
      {
        name: "Suv nasosi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/suv-nasosi",
      },
      {
        name: "Termostat",
        icon: Thermometer,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/termostat",
      },
      {
        name: "Ventilyator",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/ventilyator",
      },
      {
        name: "Antifriz",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/antifriz",
      },
      {
        name: "Radiator shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/radiator-shlanglari",
      },
      {
        name: "Kengaytirish baki",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/kengaytirish-baki",
      },
      {
        name: "Radiator qopqog'i",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/radiator-qopqogi",
      },
      {
        name: "Termodatchik",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/termodatchik",
      },
      {
        name: "Konditsioner tizimi",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-sovutish/konditsioner-tizimi",
      },
    ],
  },
  {
    name: "Avtomobil uchun elektr jihozlar",
    icon: Lightbulb,
    href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar",
    subcategories: [
      {
        name: "Starter",
        icon: Lightbulb,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/starter",
      },
      {
        name: "Generator",
        icon: Lightbulb,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/generator",
      },
      {
        name: "Akkumulyatorlar",
        icon: BatteryCharging,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/akkumulyatorlar",
      },
      {
        name: "Shamlar",
        icon: Lightbulb,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/shamlar",
      },
      {
        name: "Bobinalar",
        icon: Lightbulb,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/bobinalar",
      },
      {
        name: "Datchiklar",
        icon: Gauge,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/datchiklar",
      },
      {
        name: "Simlar",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/simlar",
      },
      {
        name: "Rele",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/rele",
      },
      {
        name: "Sigortalar",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/sigortalar",
      },
      {
        name: "ECU",
        icon: Wrench,
        href: "/catalog/elektronika-multimedia/avtomobil-uchun-elektr-jihozlar/ecu",
      },
    ],
  },
  {
    name: "Avtomobil uchun shinalar",
    icon: Tire,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar",
    subcategories: [
      {
        name: "Yozgi shinalar",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/yozgi-shinalar",
      },
      {
        name: "Qishki shinalar",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/qishki-shinalar",
      },
      {
        name: "Butun mavsum shinalari",
        icon: Tire,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/butun-mavsum-shinalari",
      },
      {
        name: "Yengil qotishma disklar",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/yengil-qotishma-disklar",
      },
      {
        name: "Temir disklar",
        icon: Disc3,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/temir-disklar",
      },
      {
        name: "Disk qopqoqlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/disk-qopqoqlari",
      },
      {
        name: "Balansirovka yuklari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/balansirovka-yuklari",
      },
      {
        name: "Shina bosimi datchiklari",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/shina-bosimi-datchiklari",
      },
      {
        name: "Shina ta'mirlash to'plami",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/shina-tamirlash-toplami",
      },
      {
        name: "Ventil",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-shinalar/ventil",
      },
    ],
  },
  {
    name: "Avtomobil uchun akkumulyatorlar",
    icon: BatteryCharging,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar",
    subcategories: [
      {
        name: "Akkumulyatorlar",
        icon: BatteryCharging,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyatorlar",
      },
      {
        name: "Akkumulyator klemmasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-klemmasi",
      },
      {
        name: "Akkumulyator zaryadlagich",
        icon: BatteryCharging,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-zaryadlagich",
      },
      {
        name: "Akkumulyator qutisi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-qutisi",
      },
      {
        name: "Akkumulyator kabeli",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-kabeli",
      },
      {
        name: "Akkumulyator suyuqligi",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-suyuqligi",
      },
      {
        name: "Akkumulyator indikatori",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-indikatori",
      },
      {
        name: "Akkumulyator izolyatsiyasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-izolyatsiyasi",
      },
      {
        name: "Akkumulyator ushlagichi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-ushlagichi",
      },
      {
        name: "Akkumulyator ventilyatsiyasi",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-akkumulyatorlar/akkumulyator-ventilyatsiyasi",
      },
    ],
  },
  {
    name: "Avtomobil uchun yoritish",
    icon: Lightbulb,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish",
    subcategories: [
      {
        name: "Faralar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/faralar",
      },
      {
        name: "Orqa fonarlar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/orqa-fonarlar",
      },
      {
        name: "Tumanga qarshi faralar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/tumanga-qarshi-faralar",
      },
      {
        name: "Burilish chiroqlari",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/burilish-chiroqlari",
      },
      {
        name: "Salon yoritgichlari",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/salon-yoritgichlari",
      },
      {
        name: "Ksenon lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/ksenon-lampalar",
      },
      {
        name: "LED lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/led-lampalar",
      },
      {
        name: "Galogen lampalar",
        icon: Lightbulb,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/galogen-lampalar",
      },
      {
        name: "Faralar yuvish tizimi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/faralar-yuvish-tizimi",
      },
      {
        name: "Faralar korpusi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-yoritish/faralar-korpusi",
      },
    ],
  },
  {
    name: "Avtomobil uchun egzoz tizimi",
    icon: ExhaustPipe,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi",
    subcategories: [
      {
        name: "Glushitel",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/glushitel",
      },
      {
        name: "Katalizator",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/katalizator",
      },
      {
        name: "Rezonator",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/rezonator",
      },
      {
        name: "Egzoz kollektori",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-kollektori",
      },
      {
        name: "Kislorod datchigi",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/kislorod-datchigi",
      },
      {
        name: "Egzoz trubkasi",
        icon: ExhaustPipe,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-trubkasi",
      },
      {
        name: "Egzoz prokladkasi",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-prokladkasi",
      },
      {
        name: "Egzoz klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-klapani",
      },
      {
        name: "Egzoz tizimi qisqichlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-tizimi-qisqichlari",
      },
      {
        name: "Egzoz tizimi kronshteynlari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-egzoz-tizimi/egzoz-tizimi-kronshteynlari",
      },
    ],
  },
  {
    name: "Avtomobil uchun konditsioner tizimi",
    icon: AirVent,
    href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi",
    subcategories: [
      {
        name: "Kompressor",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/kompressor",
      },
      {
        name: "Konditsioner radiator",
        icon: AirVent,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-radiator",
      },
      {
        name: "Konditsioner trubkalari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-trubkalari",
      },
      {
        name: "Konditsioner freoni",
        icon: Droplet,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-freoni",
      },
      {
        name: "Konditsioner datchiklari",
        icon: Gauge,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-datchiklari",
      },
      {
        name: "Konditsioner klapani",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-klapani",
      },
      {
        name: "Konditsioner filtri",
        icon: Filter,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-filtri",
      },
      {
        name: "Konditsioner ventilyatori",
        icon: Fan,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-ventilyatori",
      },
      {
        name: "Konditsioner boshqaruv bloki",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-boshqaruv-bloki",
      },
      {
        name: "Konditsioner shlanglari",
        icon: Wrench,
        href: "/catalog/ehtiyot-qismlar/avtomobil-uchun-konditsioner-tizimi/konditsioner-shlanglari",
      },
    ],
  },
  {
    name: "Avtomobil uchun diagnostika asboblari",
    icon: ScanEye,
    href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari",
    subcategories: [
      {
        name: "Avtoskannerlar",
        icon: ScanEye,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/avtoskannerlar",
      },
      {
        name: "Multimetrlar",
        icon: Gauge,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/multimetrlar",
      },
      {
        name: "Kompressometrlar",
        icon: Gauge,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/kompressometrlar",
      },
      {
        name: "Akkumulyator testerlari",
        icon: BatteryCharging,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/akkumulyator-testerlari",
      },
      {
        name: "Forsunka testerlari",
        icon: Fuel,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/forsunka-testerlari",
      },
      {
        name: "Tormoz suyuqligi testerlari",
        icon: Droplet,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/tormoz-suyuqligi-testerlari",
      },
      {
        name: "Antifriz testerlari",
        icon: Droplet,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/antifriz-testerlari",
      },
      {
        name: "Bosim o'lchagichlar",
        icon: Gauge,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/bosim-olchagichlar",
      },
      {
        name: "Temperatur o'lchagichlar",
        icon: Thermometer,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/temperatur-olchagichlar",
      },
      {
        name: "Endoskoplar",
        icon: ScanEye,
        href: "/catalog/asboblar/avtomobil-uchun-diagnostika-asboblari/endoskoplar",
      },
    ],
  },
  {
    name: "Avtomobil uchun avto kimyo",
    icon: SprayCan,
    href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo",
    subcategories: [
      {
        name: "Motor moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/motor-moyi",
      },
      {
        name: "Transmissiya moyi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/transmissiya-moyi",
      },
      {
        name: "Tormoz suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/tormoz-suyuqligi",
      },
      {
        name: "Antifriz",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/antifriz",
      },
      {
        name: "Shisha yuvish suyuqligi",
        icon: Droplet,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/shisha-yuvish-suyuqligi",
      },
      {
        name: "Kuzov yuvish vositasi",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/kuzov-yuvish-vositas",
      },
      {
        name: "Salon tozalagich",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/salon-tozalagich",
      },
      {
        name: "Polirovka",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/polirovka",
      },
      {
        name: "Rustga qarshi vosita",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/rustga-qarshi-vosita",
      },
      {
        name: "Germetik",
        icon: SprayCan,
        href: "/catalog/kimyo/avtomobil-uchun-avto-kimyo/germetik",
      },
    ],
  },
  {
    name: "Avtomobil uchun aksessuarlar",
    icon: Sparkles,
    href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar",
    subcategories: [
      {
        name: "Avto chexollar",
        icon: Sofa,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/avto-chexollar",
      },
      {
        name: "Poliklar",
        icon: Sofa,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/poliklar",
      },
      {
        name: "Rul qoplamalari",
        icon: SteeringWheel,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/rul-qoplamalari",
      },
      {
        name: "Avto magnitola",
        icon: Headphones,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/avto-magnitola",
      },
      {
        name: "Videoregistrator",
        icon: Monitor,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/videoregistrator",
      },
      {
        name: "Navigatsiya",
        icon: Car,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/navigatsiya",
      },
      {
        name: "Parktronik",
        icon: Gauge,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/parktronik",
      },
      {
        name: "Signalizatsiya",
        icon: Shield,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/signalizatsiya",
      },
      {
        name: "Bolalar o'rindig'i",
        icon: Baby,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/bolalar-orindigi",
      },
      {
        name: "Yukxona",
        icon: Car,
        href: "/catalog/aksessuarlar/avtomobil-uchun-aksessuarlar/yukxona",
      },
    ],
  },
  {
    name: "Avtomobil uchun xavfsizlik tizimlari",
    icon: Shield,
    href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari",
    subcategories: [
      {
        name: "Signalizatsiya",
        icon: Shield,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/signalizatsiya",
      },
      {
        name: "Immobilayzer",
        icon: Lock,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/immobilayzer",
      },
      {
        name: "Markaziy qulf",
        icon: Lock,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/markaziy-qulf",
      },
      {
        name: "Xavfsizlik yostiqchalari",
        icon: Shield,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/xavfsizlik-yostiqchalari",
      },
      {
        name: "ABS",
        icon: Disc3,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/abs",
      },
      {
        name: "ESP",
        icon: Car,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/esp",
      },
      {
        name: "Tormoz kuchaytirgichi",
        icon: Wrench,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/tormoz-kuchaytirgichi",
      },
      {
        name: "Kamera",
        icon: ScanEye,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/kamera",
      },
      {
        name: "Datchiklar",
        icon: Gauge,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/datchiklar",
      },
      {
        name: "Bolalar qulflari",
        icon: Lock,
        href: "/catalog/xavfsizlik/avtomobil-uchun-xavfsizlik-tizimlari/bolalar-qulflari",
      },
    ],
  },
];
