"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe2,
  Heart,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Star,
  Wrench,
} from "lucide-react";

type Supplier = {
  id: string;
  name: string;
  url: string;
  category: string;
  type: string;
  region: "AU" | "WORLD" | "DIGITAL" | "MARKET";
  compatibility: string;
  tags: string[];
  note: string;
  featured?: boolean;
};

const suppliers: Supplier[] = [
  {
    "id": "fanatec",
    "name": "Fanatec Australia",
    "url": "https://www.fanatec.com/au/",
    "category": "Oficial / Fanatec",
    "type": "Fabricante oficial",
    "region": "AU",
    "compatibility": "Nativo DD1",
    "tags": [
      "OEM",
      "peças de reposição",
      "QR2",
      "Wheel Hub",
      "Podium Hub",
      "volantes",
      "pedais"
    ],
    "note": "Fonte oficial para peças OEM, QR2, hubs, volantes e acessórios do ecossistema Fanatec.",
    "featured": true
  },
  {
    "id": "pagnian",
    "name": "Pagnian Imports",
    "url": "https://pagnianimports.com.au/",
    "category": "Oficial / Fanatec",
    "type": "Distribuidor australiano",
    "region": "AU",
    "compatibility": "Nativo DD1",
    "tags": [
      "Fanatec",
      "estoque AU",
      "garantia AU",
      "QR2",
      "volantes",
      "cockpits"
    ],
    "note": "Distribuidor autorizado Fanatec na Austrália, com estoque e suporte locais.",
    "featured": true
  },
  {
    "id": "3drap",
    "name": "3DRap",
    "url": "https://www.3drap.it/",
    "category": "Mods e customização Fanatec",
    "type": "Fabricante de mods",
    "region": "WORLD",
    "compatibility": "Fanatec / DD1",
    "tags": [
      "3D print",
      "paddles",
      "mods",
      "elastômeros",
      "hubs",
      "acessórios"
    ],
    "note": "Grande catálogo de mods e upgrades para Fanatec, incluindo wheelbases, pedais, paddles e acessórios.",
    "featured": true
  },
  {
    "id": "pineapple",
    "name": "Pineapple Grips",
    "url": "https://pineapplegrips.co.uk/",
    "category": "Mods e customização Fanatec",
    "type": "Grips e conversões",
    "region": "WORLD",
    "compatibility": "Fanatec / DD1",
    "tags": [
      "grips",
      "wider wheel kits",
      "Fanatec conversions",
      "SRM"
    ],
    "note": "Especialista em grips e kits de volante; também assumiu a linha de conversões Fanatec da SRM.",
    "featured": true
  },
  {
    "id": "acelith",
    "name": "Acelith Simracing",
    "url": "https://acelith.com/",
    "category": "Mods e customização Fanatec",
    "type": "Rims e faceplates",
    "region": "WORLD",
    "compatibility": "Fanatec hubs",
    "tags": [
      "rims",
      "faceplates",
      "Universal Hub",
      "stickers",
      "mods"
    ],
    "note": "Rims, faceplates e add-ons para hubs Fanatec, além de acessórios e personalização."
  },
  {
    "id": "lovely",
    "name": "Lovely Stickers",
    "url": "https://lovelystickers.com/",
    "category": "Mods e customização Fanatec",
    "type": "Skins e decals",
    "region": "WORLD",
    "compatibility": "Fanatec",
    "tags": [
      "skins",
      "decals",
      "DD1",
      "DD2",
      "Formula",
      "McLaren",
      "WRC"
    ],
    "note": "Skins, liveries e decals específicos para bases e volantes Fanatec."
  },
  {
    "id": "srm",
    "name": "Sim Racing Machines",
    "url": "https://simracingmachines.com/",
    "category": "QR, hubs e conversão",
    "type": "Especialista em conversão",
    "region": "WORLD",
    "compatibility": "DD1 via emulator/hub",
    "tags": [
      "SRM Emulator",
      "QR1",
      "QR2",
      "70mm",
      "conversion kits",
      "Fanatec"
    ],
    "note": "Referência em emuladores e conversões Fanatec. O Emulator V7.22 é a versão indicada para DD1/DD2.",
    "featured": true
  },
  {
    "id": "simube",
    "name": "Simube",
    "url": "https://simube.com/",
    "category": "QR, hubs e conversão",
    "type": "QR e hubs aftermarket",
    "region": "WORLD",
    "compatibility": "Fanatec QR2",
    "tags": [
      "QR2",
      "QR2 Pro",
      "hub",
      "Fanatec",
      "free worldwide shipping"
    ],
    "note": "QR2 e componentes aftermarket para Fanatec; anuncia frete mundial com taxas incluídas."
  },
  {
    "id": "leoxz",
    "name": "Leoxz",
    "url": "https://www.leoxz.com/",
    "category": "QR, hubs e conversão",
    "type": "QR + volantes",
    "region": "WORLD",
    "compatibility": "Fanatec QR1/QR2",
    "tags": [
      "QR2 Core",
      "QR2 Pro",
      "70mm",
      "torque unlock",
      "XGT",
      "XF1"
    ],
    "note": "QR2 Core para rodas 70 mm com chip de torque e volantes próprios com opções Fanatec QR.",
    "featured": true
  },
  {
    "id": "ascher",
    "name": "Ascher Racing",
    "url": "https://ascher-racing.com/int/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "USB",
      "70mm",
      "GT",
      "Formula",
      "button plates",
      "Fanatec partner"
    ],
    "note": "Fabricante premium; a versão USB é adequada para bases Fanatec via hub/QR compatível.",
    "featured": true
  },
  {
    "id": "bst",
    "name": "BavarianSimTec",
    "url": "https://www.bavariansimtec.com/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "USB",
      "GT",
      "Formula",
      "70mm",
      "Fanatec partner"
    ],
    "note": "Volantes premium fabricados na Alemanha e enviados mundialmente; parceiro aprovado pela Fanatec."
  },
  {
    "id": "vpg",
    "name": "VPG Sim",
    "url": "https://vpgsim.co.uk/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "USB",
      "GT",
      "Formula",
      "70mm",
      "Fanatec partner"
    ],
    "note": "Volantes high-end e envio internacional via UPS; parceiro aprovado pela Fanatec."
  },
  {
    "id": "cube",
    "name": "Cube Controls",
    "url": "https://www.cubecontrols.com/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via hub / 70mm / USB",
    "tags": [
      "USB",
      "Formula",
      "GT",
      "70mm",
      "Q-Conn"
    ],
    "note": "Grande linha de volantes USB premium; envio mundial via DHL."
  },
  {
    "id": "gsi",
    "name": "Gomez Sim Industries",
    "url": "https://gomezsimindustries.com/en-au",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Fanatec via Podium Hub / SRM",
    "tags": [
      "GSI",
      "USB",
      "70mm",
      "Formula",
      "GT",
      "Interlock"
    ],
    "note": "Documenta compatibilidade com bases Fanatec DD via SRM Emulator Hub ou Fanatec Podium Hub.",
    "featured": true
  },
  {
    "id": "pse",
    "name": "Precision Sim Engineering",
    "url": "https://www.precisionsimengineering.com/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Fanatec via Podium Hub",
    "tags": [
      "USB",
      "70mm",
      "GT3",
      "GPX",
      "LM-X"
    ],
    "note": "Volantes USB fabricados no Reino Unido; vários modelos documentam compatibilidade com Fanatec Podium Hub."
  },
  {
    "id": "soelpec",
    "name": "SOELPEC",
    "url": "https://soelpec.com/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via 70mm / USB",
    "tags": [
      "USB",
      "70mm",
      "Spectra",
      "Terra",
      "DDU"
    ],
    "note": "Volantes e displays premium com entrega mundial; os volantes usam conexão USB e padrão universal."
  },
  {
    "id": "simcore",
    "name": "SimCore",
    "url": "https://simcore.com.au/",
    "category": "Volantes third-party",
    "type": "Fabricante australiano",
    "region": "AU",
    "compatibility": "Via 70mm / USB",
    "tags": [
      "steering wheels",
      "button plates",
      "DDU",
      "mounts",
      "Australia"
    ],
    "note": "Fabricante australiano de volantes, button plates, dashboards e mounts; envio global.",
    "featured": true
  },
  {
    "id": "rexing",
    "name": "Rexing",
    "url": "https://www.rexingsports.com/",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes",
    "region": "WORLD",
    "compatibility": "Via hub / USB",
    "tags": [
      "Formula",
      "carbon",
      "Mayaris",
      "USB"
    ],
    "note": "Volantes Formula em carbono; o fabricante anuncia envio mundial incluindo Austrália."
  },
  {
    "id": "grid",
    "name": "GRID Engineering",
    "url": "https://grid-engineering.com/en-au",
    "category": "Volantes third-party",
    "type": "Fabricante de volantes e displays",
    "region": "WORLD",
    "compatibility": "Via hub / USB",
    "tags": [
      "steering wheels",
      "DDU",
      "USB",
      "70mm"
    ],
    "note": "Volantes, displays e acessórios high-end com loja localizada para AU e envio mundial."
  },
  {
    "id": "pokornyi",
    "name": "Pokornyi Engineering",
    "url": "https://www.pokornyiengineering.com/",
    "category": "DIY / 3D / projetos",
    "type": "Projetos DIY",
    "region": "DIGITAL",
    "compatibility": "Fanatec via Podium Hub / SRM",
    "tags": [
      "DIY",
      "STL",
      "PCB",
      "SimHub",
      "70mm",
      "steering wheel"
    ],
    "note": "Projetos completos de volantes e button plates com BOM, arquivos 3D/PCB e compatibilidade Fanatec documentada.",
    "featured": true
  },
  {
    "id": "kapral",
    "name": "KAPRAL SimRacing",
    "url": "https://kapral.store/",
    "category": "DIY / 3D / projetos",
    "type": "DIY e acessórios",
    "region": "WORLD",
    "compatibility": "Universal / 70mm",
    "tags": [
      "DIY",
      "adapters",
      "3D print",
      "PCBs",
      "VNM",
      "worldwide"
    ],
    "note": "Loja focada em hardware DIY, adaptadores e peças de sim racing com envio mundial."
  },
  {
    "id": "kodai",
    "name": "KODAI Racing",
    "url": "https://kodairacing.com/",
    "category": "DIY / 3D / projetos",
    "type": "Projetos digitais",
    "region": "DIGITAL",
    "compatibility": "70mm / USB",
    "tags": [
      "DIY",
      "button plate",
      "STL",
      "STEP",
      "PCB",
      "SimHub"
    ],
    "note": "Projetos digitais para construir button plates e volantes com padrão 70 mm."
  },
  {
    "id": "diysimstudio",
    "name": "DIY Sim Studio",
    "url": "https://www.diysimstudio.com/",
    "category": "DIY / 3D / projetos",
    "type": "Projetos digitais",
    "region": "DIGITAL",
    "compatibility": "70mm / USB",
    "tags": [
      "DIY",
      "CAD",
      "STL",
      "Arduino",
      "70mm"
    ],
    "note": "Planos CAD e guias para construir button plates e outros componentes de sim racing."
  },
  {
    "id": "simrigs",
    "name": "SIMRIGS",
    "url": "https://www.simrigs.com.au/",
    "category": "Lojas AU multimarcas",
    "type": "Varejista australiano",
    "region": "AU",
    "compatibility": "Múltiplas opções para DD1",
    "tags": [
      "Ascher",
      "BavarianSimTec",
      "GSI",
      "GRID",
      "VPG",
      "Sim-Lab",
      "Simagic"
    ],
    "note": "Uma das melhores lojas locais para comparar volantes third-party e hardware high-end.",
    "featured": true
  },
  {
    "id": "player1",
    "name": "Player1 Sim Gear",
    "url": "https://p1simgear.com.au/",
    "category": "Lojas AU multimarcas",
    "type": "Varejista australiano",
    "region": "AU",
    "compatibility": "Múltiplas opções para DD1",
    "tags": [
      "Ascher",
      "SOELPEC",
      "Conspit",
      "MPI",
      "Simagic",
      "Sparco"
    ],
    "note": "Loja australiana com grande catálogo de wheels, hubs e rims; distribuidor local de Ascher e SOELPEC.",
    "featured": true
  },
  {
    "id": "ggd",
    "name": "Gamer Gear Direct",
    "url": "https://gamergeardirect.com.au/",
    "category": "Lojas AU multimarcas",
    "type": "Varejista australiano",
    "region": "AU",
    "compatibility": "Múltiplas opções para DD1",
    "tags": [
      "Rexing",
      "sim racing wheels",
      "rigs",
      "Australia"
    ],
    "note": "Varejista australiano de sim racing; mantém marcas premium como Rexing com garantia local."
  },
  {
    "id": "racekraft",
    "name": "RaceKraft Simulations",
    "url": "https://racekraft.net/",
    "category": "Lojas AU multimarcas",
    "type": "Varejista australiano",
    "region": "AU",
    "compatibility": "Múltiplas opções para DD1",
    "tags": [
      "GSI",
      "BavarianSimTec",
      "Simagic",
      "VNM",
      "DDU",
      "button boxes"
    ],
    "note": "Loja australiana focada em hardware high-end, wheel systems, eletrônica, dashes e rigs."
  },
  {
    "id": "clutchkick",
    "name": "Clutch Kick",
    "url": "https://clutchkick.com.au/",
    "category": "Lojas AU multimarcas",
    "type": "Varejista australiano",
    "region": "AU",
    "compatibility": "Múltiplas opções para DD1",
    "tags": [
      "Cube Controls",
      "steering wheels",
      "premium"
    ],
    "note": "Loja australiana com hardware premium, incluindo volantes Cube Controls."
  },
  {
    "id": "simworx",
    "name": "SIMWORX",
    "url": "https://simworx.com.au/",
    "category": "Lojas AU multimarcas",
    "type": "Fabricante / varejista AU",
    "region": "AU",
    "compatibility": "70mm / USB / Fanatec",
    "tags": [
      "Conspit",
      "70mm",
      "USB",
      "wheel hubs",
      "DDU"
    ],
    "note": "Loja australiana com Conspit e hardware próprio; diversos wheels usam 70 mm e listam Fanatec entre as bases compatíveis.",
    "featured": true
  },
  {
    "id": "autosport",
    "name": "Autosport Australia",
    "url": "https://www.autosport.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "Sparco",
      "OMP",
      "MOMO",
      "Velo",
      "70mm",
      "real motorsport"
    ],
    "note": "Boa fonte australiana de rims reais de motorsport; confirme sempre o padrão 6×70 mm antes da compra.",
    "featured": true
  },
  {
    "id": "racerindustries",
    "name": "Racer Industries",
    "url": "https://www.racerindustries.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "Sparco",
      "OMP",
      "MOMO",
      "70mm",
      "quick release"
    ],
    "note": "Vende rims e QRs de motorsport; vários produtos usam o padrão 6×70 mm."
  },
  {
    "id": "mpa",
    "name": "Motorsport Parts Australia",
    "url": "https://motorsportpartsaustralia.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "Sparco",
      "OMP",
      "70mm",
      "boss kits"
    ],
    "note": "Rims, quick releases e adaptadores de competição, incluindo opções 70 mm."
  },
  {
    "id": "jam",
    "name": "JAM Motorsport",
    "url": "https://shop.jammotorsport.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "Motamec",
      "70mm",
      "rally",
      "motorsport"
    ],
    "note": "Fornecedor australiano de rims de competição, incluindo modelos Motamec 6×70 mm."
  },
  {
    "id": "racedivision",
    "name": "Race Division",
    "url": "https://www.racedivision.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "70mm",
      "MOMO",
      "OMP",
      "Sparco compatible",
      "racing rims"
    ],
    "note": "Rims de motorsport e componentes com opções no padrão 70 mm."
  },
  {
    "id": "tas",
    "name": "Tas Autosport",
    "url": "https://www.tasautosport.com.au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer AU",
    "region": "AU",
    "compatibility": "Via adaptador",
    "tags": [
      "Nardi",
      "MOMO",
      "70mm",
      "74mm",
      "adapters"
    ],
    "note": "Útil especialmente para conversões entre padrões 70 mm e 74 mm, como Nardi."
  },
  {
    "id": "demontweeks",
    "name": "Demon Tweeks Australia",
    "url": "https://www.demon-tweeks.com/au/",
    "category": "Volantes motorsport 70 mm",
    "type": "Motorsport retailer internacional",
    "region": "WORLD",
    "compatibility": "Via Fanatec Wheel Hub / Podium Hub",
    "tags": [
      "MOMO",
      "OMP",
      "Sparco",
      "Nardi",
      "70mm",
      "motorsport"
    ],
    "note": "Grande catálogo internacional de rims e acessórios de motorsport com storefront australiano."
  },
  {
    "id": "trakracer",
    "name": "Trak Racer Australia",
    "url": "https://trakracer.com.au/",
    "category": "Cockpits e mounts",
    "type": "Fabricante / varejista AU",
    "region": "AU",
    "compatibility": "DD1 direto",
    "tags": [
      "DD1",
      "DD2",
      "side mount",
      "front mount",
      "TR80",
      "TR120",
      "TR160"
    ],
    "note": "Cockpits e mounts rígidos; possui suportes e tabelas de compatibilidade específicas para DD1/DD2.",
    "featured": true
  },
  {
    "id": "nlr",
    "name": "Next Level Racing Australia",
    "url": "https://nextlevelracing.com/en-au/",
    "category": "Cockpits e mounts",
    "type": "Fabricante australiano",
    "region": "AU",
    "compatibility": "DD1 direto",
    "tags": [
      "DD1",
      "DD2",
      "Elite",
      "front mount",
      "side mount"
    ],
    "note": "Cockpits e mounts Direct Drive com compatibilidade explícita para Fanatec DD1/DD2."
  },
  {
    "id": "simlab",
    "name": "Sim-Lab Australia",
    "url": "https://sim-lab.eu/en-au",
    "category": "Cockpits e mounts",
    "type": "Fabricante internacional",
    "region": "WORLD",
    "compatibility": "DD1 direto",
    "tags": [
      "P1X",
      "GT1",
      "Fanatec DD mount",
      "DDU mount",
      "DD1",
      "DD2"
    ],
    "note": "Cockpits e acessórios com filtros e mounts específicos para Fanatec DD1/DD2."
  },
  {
    "id": "etsy",
    "name": "Etsy Australia",
    "url": "https://www.etsy.com/au/market/fanatec",
    "category": "Marketplaces",
    "type": "Marketplace",
    "region": "MARKET",
    "compatibility": "Varia por vendedor",
    "tags": [
      "3D print",
      "mounts",
      "mods",
      "Fanatec"
    ],
    "note": "Bom para nichos e peças 3D; confirme vendedor, material, medidas e reputação."
  },
  {
    "id": "ebay",
    "name": "eBay Australia",
    "url": "https://www.ebay.com.au/sch/i.html?_nkw=fanatec",
    "category": "Marketplaces",
    "type": "Marketplace",
    "region": "MARKET",
    "compatibility": "Varia por vendedor",
    "tags": [
      "used",
      "OEM",
      "Fanatec",
      "parts",
      "QR"
    ],
    "note": "Útil para peças usadas, OEM descontinuadas e acessórios; confira o vendedor."
  },
  {
    "id": "aliexpress",
    "name": "AliExpress",
    "url": "https://www.aliexpress.com/w/wholesale-fanatec.html",
    "category": "Marketplaces",
    "type": "Marketplace",
    "region": "MARKET",
    "compatibility": "Varia por vendedor",
    "tags": [
      "aftermarket",
      "QR2",
      "mods",
      "Fanatec"
    ],
    "note": "Muitos acessórios aftermarket; qualidade e tolerâncias variam bastante entre vendedores."
  }
];

const categories = Array.from(new Set(suppliers.map((supplier) => supplier.category)));

const regionMeta = {
  AU: { label: "🇦🇺 Austrália", className: "bg-emerald-500/10 text-emerald-300" },
  WORLD: { label: "🌍 Internacional", className: "bg-sky-500/10 text-sky-300" },
  DIGITAL: { label: "💾 Digital / DIY", className: "bg-violet-500/10 text-violet-300" },
  MARKET: { label: "🛒 Marketplace", className: "bg-amber-500/10 text-amber-300" },
} as const;

export default function DD1SupplierDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [region, setRegion] = useState<"Todos" | Supplier["region"]>("Todos");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [thirdPartyOnly, setThirdPartyOnly] = useState(false);
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [listView, setListView] = useState(false);
  const [sort, setSort] = useState<"recommended" | "az" | "au">("recommended");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      setFavourites(JSON.parse(localStorage.getItem("dd1-supplier-favourites") || "[]"));
    } catch {
      setFavourites([]);
    }
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      localStorage.setItem("dd1-supplier-favourites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = suppliers.filter((supplier) => {
      const haystack = [
        supplier.name,
        supplier.category,
        supplier.type,
        supplier.compatibility,
        supplier.note,
        ...supplier.tags,
      ].join(" ").toLowerCase();

      const thirdPartyMatch =
        supplier.category === "Volantes third-party" ||
        supplier.category === "QR, hubs e conversão" ||
        supplier.category === "Volantes motorsport 70 mm";

      return (
        (!q || haystack.includes(q)) &&
        (category === "Todos" || supplier.category === category) &&
        (region === "Todos" || supplier.region === region) &&
        (!featuredOnly || supplier.featured) &&
        (!thirdPartyOnly || thirdPartyMatch) &&
        (!favouritesOnly || favourites.includes(supplier.id))
      );
    });

    if (sort === "az") {
      rows.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "au") {
      rows.sort((a, b) => {
        const aRank = a.region === "AU" ? 0 : a.region === "DIGITAL" ? 1 : 2;
        const bRank = b.region === "AU" ? 0 : b.region === "DIGITAL" ? 1 : 2;
        return aRank - bRank || a.name.localeCompare(b.name);
      });
    }

    return rows;
  }, [query, category, region, featuredOnly, thirdPartyOnly, favouritesOnly, favourites, sort]);

  const reset = () => {
    setQuery("");
    setCategory("Todos");
    setRegion("Todos");
    setFeaturedOnly(false);
    setThirdPartyOnly(false);
    setFavouritesOnly(false);
    setSort("recommended");
  };

  const copyLink = async (supplier: Supplier) => {
    try {
      await navigator.clipboard.writeText(supplier.url);
      setCopied(supplier.id);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  const australianCount = suppliers.filter((supplier) => supplier.region === "AU").length;
  const thirdPartyCount = suppliers.filter((supplier) =>
    ["Volantes third-party", "QR, hubs e conversão", "Volantes motorsport 70 mm"].includes(supplier.category)
  ).length;

  return (
    <main className="min-h-screen bg-[#07090c] text-zinc-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_12%_0%,rgba(225,6,0,0.20),transparent_32%),linear-gradient(180deg,#12151b_0%,#090b0f_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-300">
                Fanatec DD1 • Supplier Directory • Australia
              </div>
              <h1 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">
                DD1 Supplier Hub
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                Diretório de fornecedores, não catálogo de peças. Cada site aparece uma única vez e é classificado pela sua especialidade principal.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <Stat value={String(suppliers.length)} label="fornecedores" />
              <Stat value={String(australianCount)} label="lojas AU" />
              <Stat value={String(thirdPartyCount)} label="para conversão" />
            </div>
          </div>

          <div className="mb-5 rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-5 md:p-6">
            <div className="mb-3 flex items-center gap-2 text-red-200">
              <Wrench className="h-5 w-5" />
              <h2 className="font-black">Usando volante third-party no DD1</h2>
            </div>
            <div className="grid gap-3 text-sm leading-6 text-zinc-400 md:grid-cols-3">
              <div>
                <strong className="text-zinc-100">1. Liberar o FFB</strong>
                <p>Use Fanatec Wheel Hub, Podium Hub ou um emulador compatível como SRM.</p>
              </div>
              <div>
                <strong className="text-zinc-100">2. Fixação mecânica</strong>
                <p>O Wheel Hub aceita padrões 6×70 mm e 6×50,8 mm. Muitos wheels USB e rims de motorsport usam 70 mm.</p>
              </div>
              <div>
                <strong className="text-zinc-100">3. Botões e display</strong>
                <p>Em wheels USB, os comandos normalmente vão direto ao PC. O hub Fanatec serve principalmente para o DD1 reconhecer o wheel e liberar FFB.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar fornecedor, QR2, grip, 70mm, DDU, wheel, cockpit..."
                className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm outline-none transition focus:border-red-500/60 focus:ring-4 focus:ring-red-500/10"
              />
            </label>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as typeof sort)}
              className="h-14 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm outline-none"
            >
              <option value="recommended">Ordem recomendada</option>
              <option value="az">Nome A–Z</option>
              <option value="au">Austrália primeiro</option>
            </select>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {["Todos", ...categories].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition " +
                  (category === item
                    ? "border-red-500 bg-red-600 text-white"
                    : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20")
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ["Todos", "Todas as origens"],
              ["AU", "🇦🇺 Austrália"],
              ["WORLD", "🌍 Internacional"],
              ["DIGITAL", "💾 Digital / DIY"],
              ["MARKET", "🛒 Marketplace"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setRegion(value)}
                className={
                  "rounded-xl border px-3 py-2 text-xs font-semibold transition " +
                  (region === value
                    ? "border-red-500/70 bg-red-500/15 text-red-200"
                    : "border-white/10 bg-white/[0.025] text-zinc-400")
                }
              >
                {label}
              </button>
            ))}

            <FilterButton active={thirdPartyOnly} onClick={() => setThirdPartyOnly((value) => !value)}>
              Volantes / conversão
            </FilterButton>
            <FilterButton active={featuredOnly} onClick={() => setFeaturedOnly((value) => !value)}>
              ★ Destaques
            </FilterButton>
            <FilterButton active={favouritesOnly} onClick={() => setFavouritesOnly((value) => !value)}>
              ♥ Favoritos ({favourites.length})
            </FilterButton>

            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Limpar
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.16em]">Fornecedores-chave para o seu DD1</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickCard title="Fanatec / Pagnian" text="OEM, peças, QR2 e hubs. Primeira parada para reposição e componentes oficiais." />
            <QuickCard title="SRM / Simube / Leoxz" text="Emuladores, QR2 e soluções para liberar e adaptar wheels third-party." />
            <QuickCard title="Ascher / GSI / VPG / PSE" text="Volantes USB premium que fazem sentido numa conversão do DD1." />
            <QuickCard title="Autosport / Racer Industries" text="Rims reais de motorsport em 70 mm para montar em Wheel Hub ou Podium Hub." />
          </div>
        </section>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold">
              {filtered.length} fornecedor{filtered.length === 1 ? "" : "es"}
            </div>
            <div className="text-xs text-zinc-600">
              Nenhum domínio é repetido no diretório.
            </div>
          </div>

          <button
            onClick={() => setListView((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-semibold text-zinc-300"
          >
            {listView ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
            {listView ? "Cards" : "Lista"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-sm text-zinc-500">
            Nenhum fornecedor corresponde aos filtros atuais.
          </div>
        ) : (
          <div className={listView ? "grid gap-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
            {filtered.map((supplier) => {
              const favourite = favourites.includes(supplier.id);
              const meta = regionMeta[supplier.region];

              return (
                <article
                  key={supplier.id}
                  className={
                    "group flex flex-col rounded-3xl border bg-[#101318] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#12161d] " +
                    (supplier.featured ? "border-red-500/25" : "border-white/10") +
                    (listView ? " md:flex-row md:items-center md:gap-6" : "")
                  }
                >
                  <div className={listView ? "min-w-0 flex-1" : "flex-1"}>
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          {supplier.featured && (
                            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                              Destaque
                            </span>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                            {supplier.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-black tracking-tight">{supplier.name}</h3>
                        <div className="mt-1 text-xs text-zinc-600">{supplier.type}</div>
                      </div>

                      <button
                        onClick={() => toggleFavourite(supplier.id)}
                        aria-label="Favoritar"
                        className={
                          "rounded-xl p-2 transition " +
                          (favourite
                            ? "bg-pink-500/10 text-pink-400"
                            : "text-zinc-600 hover:bg-white/5 hover:text-zinc-300")
                        }
                      >
                        <Heart className={"h-5 w-5 " + (favourite ? "fill-current" : "")} />
                      </button>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      <span className={"rounded-full px-2.5 py-1 text-[10px] font-bold " + meta.className}>
                        {meta.label}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-zinc-400">
                        {supplier.compatibility}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-6 text-zinc-500">{supplier.note}</p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {supplier.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/[0.06] bg-black/20 px-2 py-1 text-[10px] text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={listView ? "flex shrink-0 gap-2 md:w-[245px]" : "flex gap-2"}>
                    <a
                      href={supplier.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-500"
                    >
                      Abrir fornecedor
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() => copyLink(supplier)}
                      className="inline-flex w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:text-white"
                      aria-label="Copiar link"
                    >
                      {copied === supplier.id ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <Globe2 className="mb-3 h-5 w-5 text-zinc-400" />
            <h2 className="mb-2 font-black">Como os fornecedores foram escolhidos</h2>
            <p className="text-sm leading-6 text-zinc-500">
              A lista prioriza lojas australianas, fabricantes com envio internacional e fornecedores digitais.
              Marketplaces ficam separados porque compatibilidade, qualidade e frete dependem do vendedor.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <Wrench className="mb-3 h-5 w-5 text-zinc-400" />
            <h2 className="mb-2 font-black">Regra de compatibilidade</h2>
            <p className="text-sm leading-6 text-zinc-500">
              Para um wheel third-party no DD1, confirme três coisas: liberação de FFB, padrão mecânico
              do hub/QR e conexão dos botões/display ao PC. Um padrão 70 mm sozinho não garante toda a compatibilidade.
            </p>
          </div>
        </section>

        <footer className="mt-8 border-t border-white/10 py-6 text-xs leading-5 text-zinc-600">
          Diretório focado no Fanatec Podium DD1 e compras com destino à Austrália. Estoque, frete,
          impostos e compatibilidade podem mudar. Sempre confira o produto exato antes de comprar.
        </footer>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
      <div className="text-2xl font-black">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-zinc-500">{label}</div>
    </div>
  );
}

function QuickCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="mb-2 text-sm font-black">{title}</div>
      <p className="text-xs leading-5 text-zinc-500">{text}</p>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-xl border px-3 py-2 text-xs font-semibold transition " +
        (active
          ? "border-red-500/70 bg-red-500/15 text-red-200"
          : "border-white/10 bg-white/[0.025] text-zinc-400")
      }
    >
      {children}
    </button>
  );
}
