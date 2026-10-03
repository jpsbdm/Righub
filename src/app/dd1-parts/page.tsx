"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  ExternalLink,
  Heart,
  LayoutGrid,
  List,
  Search,
  ShieldCheck,
  Star,
  RotateCcw,
} from "lucide-react";

type Origin = "Australia" | "International" | "Marketplace";

type Item = {
  id: string;
  category: string;
  name: string;
  url: string;
  origin: Origin;
  compatibility: "DD1 direct" | "Via hub / adapter" | "Universal";
  tags: string[];
  note: string;
  featured?: boolean;
};

const categories = [
  "Spare parts / OEM",
  "QR1 / QR2 / hubs / adapters",
  "Wheels / rims / button plates",
  "Paddles / grips / buttons / encoders",
  "Cockpit / mounts / reinforcement",
  "DDU / dashboard / telemetry / button boxes",
  "Pedals / shifter / handbrake / haptics",
  "Electrical / PSU / Torque Key / cables",
  "Customisation / decals / skins / 3D print",
  "Complete rig / monitor / seat / motion",
];

const items: Item[] = [
  {id:"oem-1",category:categories[0],name:"Fanatec AU — Spare Parts",url:"https://www.fanatec.com/au/en/c/sim-racing-spare-parts",origin:"Australia",compatibility:"DD1 direct",tags:["OEM","spares","Fanatec"],note:"Official Fanatec Australia spare-parts catalogue.",featured:true},
  {id:"oem-2",category:categories[0],name:"Fanatec AU — Wheel Base Spare Parts",url:"https://www.fanatec.com/au/en/c/sim-racing-spare-parts/wheel-base-spare-parts",origin:"Australia",compatibility:"DD1 direct",tags:["PSU","Torque Key","USB","RJ12"],note:"Best first stop for critical DD1 replacement parts.",featured:true},
  {id:"oem-3",category:categories[0],name:"Fanatec AU — Certified Refurbished",url:"https://www.fanatec.com/au/en/c/certified-refurbished/refurb-accessories",origin:"Australia",compatibility:"DD1 direct",tags:["refurbished","OEM"],note:"Official refurbished Fanatec accessories when available."},
  {id:"oem-4",category:categories[0],name:"Sim Racing Machines — Fanatec",url:"https://simracingmachines.com/en-int/collections/fanatec",origin:"International",compatibility:"DD1 direct",tags:["pins","cables","adapters"],note:"Specialist Fanatec electronics, adapters and hard-to-find parts.",featured:true},
  {id:"oem-5",category:categories[0],name:"Pineapple Grips",url:"https://pineapplegrips.co.uk/",origin:"International",compatibility:"DD1 direct",tags:["grips","conversion","SRM"],note:"Fanatec grip replacements and conversion-related hardware."},
  {id:"oem-6",category:categories[0],name:"3DRap — Fanatec Base & Paddle Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/base-paddles-mods/",origin:"International",compatibility:"DD1 direct",tags:["mods","paddles","replacement"],note:"Mechanical upgrades and replacement-style mods."},
  {id:"oem-7",category:categories[0],name:"eBay Australia — Fanatec DD1",url:"https://www.ebay.com.au/sch/i.html?_nkw=fanatec+dd1",origin:"Marketplace",compatibility:"Universal",tags:["used","OEM","parts"],note:"Useful for discontinued and second-hand DD1 parts."},
  {id:"oem-8",category:categories[0],name:"Etsy Australia — Fanatec DD1",url:"https://www.etsy.com/au/market/fanatec_dd1",origin:"Marketplace",compatibility:"Universal",tags:["3D print","mounts"],note:"Independent makers offering brackets, holders and small parts."},
  {id:"oem-9",category:categories[0],name:"Amazon Australia — DD1 Parts",url:"https://www.amazon.com.au/s?k=Fanatec+DD1+parts",origin:"Marketplace",compatibility:"Universal",tags:["cables","accessories"],note:"General accessories and third-party parts."},
  {id:"oem-10",category:categories[0],name:"AliExpress — DD1 Parts",url:"https://www.aliexpress.com/w/wholesale-fanatec-dd1.html",origin:"Marketplace",compatibility:"Universal",tags:["aftermarket","parts"],note:"Low-cost aftermarket accessories; check fit and reviews carefully."},

  {id:"qr-1",category:categories[1],name:"Fanatec AU — Wheel Base Accessories",url:"https://www.fanatec.com/au/en/c/sim-racing-accessories/wheel-base-accessories",origin:"Australia",compatibility:"DD1 direct",tags:["QR2","base-side"],note:"Official source for DD1 wheel-base accessories.",featured:true},
  {id:"qr-2",category:categories[1],name:"Fanatec AU — Wheel Hubs",url:"https://www.fanatec.com/au/en/c/sim-racing-accessories/wheel-hubs",origin:"Australia",compatibility:"DD1 direct",tags:["Wheel Hub","Podium Hub"],note:"Official hubs for custom rims and third-party wheels.",featured:true},
  {id:"qr-3",category:categories[1],name:"Fanatec Wheel Hub",url:"https://www.fanatec.com/au/en/p/sim-racing-accessories/crd-9020024-ww/fanatec-wheel-hub",origin:"Australia",compatibility:"DD1 direct",tags:["70 mm","50.8 mm","QR2"],note:"Strong option for fitting third-party rims while retaining Fanatec base functionality.",featured:true},
  {id:"qr-4",category:categories[1],name:"Pagnian — QR2 Wheel-Side",url:"https://pagnianimports.com.au/products/fanatec-qr2-wheel-side",origin:"Australia",compatibility:"DD1 direct",tags:["QR2","local stock"],note:"Australian retailer option for original QR2 hardware."},
  {id:"qr-5",category:categories[1],name:"Pagnian — QR2 Pro Wheel-Side",url:"https://pagnianimports.com.au/products/fanatec-qr2-pro-wheel-side",origin:"Australia",compatibility:"DD1 direct",tags:["QR2 Pro"],note:"Premium Fanatec QR2 wheel-side option."},
  {id:"qr-6",category:categories[1],name:"Sim Racing Machines — Fanatec",url:"https://simracingmachines.com/en-int/collections/fanatec",origin:"International",compatibility:"DD1 direct",tags:["emulator","QR","adapter"],note:"Specialist adapters and electronics for custom wheel setups.",featured:true},
  {id:"qr-7",category:categories[1],name:"SRM — QR2 70 mm Base Adapter",url:"https://simracingmachines.com/products/qr2-base-side-with-70mm-mount",origin:"International",compatibility:"Via hub / adapter",tags:["70 mm","adapter"],note:"Useful for custom 70 mm wheel ecosystems."},
  {id:"qr-8",category:categories[1],name:"Leoxz — QR2",url:"https://www.leoxz.com/products/qr2",origin:"International",compatibility:"Via hub / adapter",tags:["QR2 Core","QR2 Pro","Link"],note:"Aftermarket QR2 ecosystem aimed at Fanatec compatibility.",featured:true},
  {id:"qr-9",category:categories[1],name:"Pineapple Grips — Conversion Hardware",url:"https://pineapplegrips.co.uk/",origin:"International",compatibility:"Via hub / adapter",tags:["conversion","Fanatec"],note:"Conversion hardware and wheel-side components."},
  {id:"qr-10",category:categories[1],name:"eBay Australia — Fanatec QR2",url:"https://www.ebay.com.au/shop/fanatec-qr2?_nkw=fanatec+qr2",origin:"Marketplace",compatibility:"Universal",tags:["QR2","aftermarket"],note:"Useful for comparing used and third-party QR options."},

  {id:"wheel-1",category:categories[2],name:"Fanatec Steering Wheels",url:"https://www.fanatec.com/au/en/c/steering-wheels",origin:"Australia",compatibility:"DD1 direct",tags:["Formula","GT","Rally"],note:"Official Fanatec wheels with native DD1 compatibility.",featured:true},
  {id:"wheel-2",category:categories[2],name:"Fanatec Wheel Rims",url:"https://www.fanatec.com/au/en/c/wheel-rims",origin:"Australia",compatibility:"DD1 direct",tags:["rims","round","GT"],note:"Standalone rims for Fanatec hubs."},
  {id:"wheel-3",category:categories[2],name:"Pagnian — Steering Wheels",url:"https://pagnianimports.com.au/collections/steering-wheels",origin:"Australia",compatibility:"DD1 direct",tags:["Fanatec","wheels"],note:"Australian retailer with Fanatec and other wheel options."},
  {id:"wheel-4",category:categories[2],name:"SIMRIGS",url:"https://www.simrigs.com.au/collections/all",origin:"Australia",compatibility:"Via hub / adapter",tags:["GSI","Ascher","GRID"],note:"Australian high-end sim-racing retailer.",featured:true},
  {id:"wheel-5",category:categories[2],name:"RaceKraft — Technical Products",url:"https://racekraft.net/collections/technical-products",origin:"Australia",compatibility:"Via hub / adapter",tags:["GSI","VNM","premium"],note:"Premium sim-racing hardware from an Australian retailer."},
  {id:"wheel-6",category:categories[2],name:"Clutch Kick",url:"https://clutchkick.com.au/",origin:"Australia",compatibility:"Via hub / adapter",tags:["Cube Controls","premium"],note:"Australian retailer with premium steering wheels and hardware."},
  {id:"wheel-7",category:categories[2],name:"Player1 Sim Gear",url:"https://p1simgear.com.au/",origin:"Australia",compatibility:"Via hub / adapter",tags:["premium wheels"],note:"Australian premium sim-racing hardware retailer."},
  {id:"wheel-8",category:categories[2],name:"Leoxz — XGT Ultimate",url:"https://www.leoxz.com/collections/our-products/products/xgt-ultimate",origin:"International",compatibility:"Via hub / adapter",tags:["GT wheel","QR2"],note:"Feature-rich GT wheel with Fanatec-focused mounting options.",featured:true},
  {id:"wheel-9",category:categories[2],name:"Cube Controls",url:"https://www.cubecontrols.com/",origin:"International",compatibility:"Via hub / adapter",tags:["GT","Formula","USB"],note:"Premium USB wheels that can be paired with a compatible Fanatec hub/adapter."},
  {id:"wheel-10",category:categories[2],name:"Gomez Sim Industries",url:"https://gomezsimindustries.com/en-au",origin:"International",compatibility:"Via hub / adapter",tags:["GSI","USB"],note:"High-end steering wheels for PC sim racing."},

  {id:"mod-1",category:categories[3],name:"Fanatec Add-ons",url:"https://www.fanatec.com/au/en/c/add-ons",origin:"Australia",compatibility:"DD1 direct",tags:["paddles","add-ons"],note:"Official Fanatec add-ons including paddle modules.",featured:true},
  {id:"mod-2",category:categories[3],name:"Fanatec Spare Parts",url:"https://www.fanatec.com/au/en/c/sim-racing-spare-parts",origin:"Australia",compatibility:"DD1 direct",tags:["caps","knobs","parts"],note:"Official small replacement components."},
  {id:"mod-3",category:categories[3],name:"Pineapple Grips",url:"https://pineapplegrips.co.uk/",origin:"International",compatibility:"DD1 direct",tags:["grips","wheel mods"],note:"Replacement and reshaped grips for selected Fanatec wheels.",featured:true},
  {id:"mod-4",category:categories[3],name:"3DRap — Fanatec Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/",origin:"International",compatibility:"DD1 direct",tags:["paddles","knobs","mods"],note:"Broad Fanatec modification catalogue.",featured:true},
  {id:"mod-5",category:categories[3],name:"3DRap — Base & Paddle Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/base-paddles-mods/",origin:"International",compatibility:"DD1 direct",tags:["magnetic paddles"],note:"Focused base and paddle modifications."},
  {id:"mod-6",category:categories[3],name:"Sim Racing Machines",url:"https://simracingmachines.com/en-int/collections/fanatec",origin:"International",compatibility:"DD1 direct",tags:["electronics","conversion"],note:"Electronics and specialist Fanatec conversions."},
  {id:"mod-7",category:categories[3],name:"Lovely Stickers — DD1 / DD2",url:"https://lovelystickers.com/collections/fanatec-dd1-dd2",origin:"International",compatibility:"Universal",tags:["decals","skins"],note:"Visual customisation for Podium DD1/DD2."},
  {id:"mod-8",category:categories[3],name:"Etsy Australia — Fanatec Accessories",url:"https://www.etsy.com/au/market/fanatec",origin:"Marketplace",compatibility:"Universal",tags:["caps","knobs","paddles"],note:"Independent accessories and 3D-printed upgrades."},
  {id:"mod-9",category:categories[3],name:"eBay AU — Paddle Upgrades",url:"https://www.ebay.com.au/sch/i.html?_nkw=fanatec+paddle+upgrade",origin:"Marketplace",compatibility:"Universal",tags:["paddles","upgrade"],note:"Third-party and used paddle options."},
  {id:"mod-10",category:categories[3],name:"AliExpress — Fanatec Mods",url:"https://www.aliexpress.com/w/wholesale-fanatec-mod.html",origin:"Marketplace",compatibility:"Universal",tags:["mods","knobs"],note:"Budget aftermarket mods; verify dimensions and seller feedback."},

  {id:"rig-1",category:categories[4],name:"Trak Racer Australia",url:"https://trakracer.com.au/",origin:"Australia",compatibility:"DD1 direct",tags:["8020","cockpit"],note:"Strong aluminium-profile rigs suitable for high-torque direct drive.",featured:true},
  {id:"rig-2",category:categories[4],name:"Trak Racer — TR-One Base Kit",url:"https://trakracer.com/pages/tr-one-base-kit",origin:"International",compatibility:"DD1 direct",tags:["DD mount"],note:"Direct-drive mounting system with DD1/DD2 support."},
  {id:"rig-3",category:categories[4],name:"Trak Racer — TR80 Compatibility",url:"https://trakracer.com.au/pages/tr80-mount-compatibility",origin:"Australia",compatibility:"DD1 direct",tags:["TR80","mount"],note:"Compatibility reference for TR80 mounting options."},
  {id:"rig-4",category:categories[4],name:"Next Level Racing Australia",url:"https://nextlevelracing.com/en-au/",origin:"Australia",compatibility:"DD1 direct",tags:["cockpit","rig"],note:"Australian brand with direct-drive capable cockpits.",featured:true},
  {id:"rig-5",category:categories[4],name:"NLR Elite — DD Side & Front Mount",url:"https://nextlevelracing.com/en-au/products/elite-premium-dd-side-and-front-mount-adapter-2/",origin:"Australia",compatibility:"DD1 direct",tags:["front mount"],note:"Heavy-duty direct-drive mount for Elite rigs."},
  {id:"rig-6",category:categories[4],name:"Sim-Lab Australia",url:"https://sim-lab.eu/en-au",origin:"Australia",compatibility:"DD1 direct",tags:["P1X","GT1"],note:"High-rigidity aluminium-profile cockpits.",featured:true},
  {id:"rig-7",category:categories[4],name:"RaceKraft — Accessories",url:"https://racekraft.net/collections/accessories",origin:"Australia",compatibility:"Universal",tags:["mounts","trays"],note:"Rig accessories and mounting hardware."},
  {id:"rig-8",category:categories[4],name:"SIMRIGS Australia",url:"https://www.simrigs.com.au/",origin:"Australia",compatibility:"DD1 direct",tags:["cockpits","mounts"],note:"Australian cockpit specialist."},
  {id:"rig-9",category:categories[4],name:"Gamer Gear Direct",url:"https://gamergeardirect.com.au/",origin:"Australia",compatibility:"DD1 direct",tags:["cockpit","hardware"],note:"Australian sim-racing retailer with cockpit hardware."},
  {id:"rig-10",category:categories[4],name:"Etsy AU — DD1 Mounts",url:"https://www.etsy.com/au/market/fanatec_dd1_mount",origin:"Marketplace",compatibility:"DD1 direct",tags:["custom mount"],note:"Custom brackets and niche mounting solutions."},

  {id:"dash-1",category:categories[5],name:"SimCore — DDUs",url:"https://simcore.com.au/accessories/ddus/",origin:"Australia",compatibility:"DD1 direct",tags:["DDU","SimHub"],note:"Australian-made dashboards, including DD1/DD2 mounting options.",featured:true},
  {id:"dash-2",category:categories[5],name:"SimCore — DS1-S",url:"https://simcore.com.au/product/ds1-s-usb-4-3-sim-racing-dashboard/",origin:"Australia",compatibility:"DD1 direct",tags:["4.3 inch","DDU"],note:"Compact USB dashboard for SimHub."},
  {id:"dash-3",category:categories[5],name:"SimCore — UD2-S",url:"https://simcore.com.au/product/ud2-s-5-sim-racing-dashboard-with-26-frosted-programable-leds/",origin:"Australia",compatibility:"DD1 direct",tags:["5 inch","LEDs"],note:"5-inch dashboard with programmable LEDs."},
  {id:"dash-4",category:categories[5],name:"SimCore — UD68",url:"https://simcore.com.au/product/ud68-6-8-sim-racing-dashboard-with-22-frosted-programable-leds/",origin:"Australia",compatibility:"DD1 direct",tags:["6.8 inch","LEDs"],note:"Large display with integrated programmable LEDs.",featured:true},
  {id:"dash-5",category:categories[5],name:"RaceKraft — Technical Products",url:"https://racekraft.net/collections/technical-products",origin:"Australia",compatibility:"Universal",tags:["DDU","button box"],note:"Premium dashboards and controls."},
  {id:"dash-6",category:categories[5],name:"SIMRIGS — Displays & Controls",url:"https://www.simrigs.com.au/collections/all",origin:"Australia",compatibility:"Universal",tags:["display","button box"],note:"Australian source for displays and button boxes."},
  {id:"dash-7",category:categories[5],name:"3DRap — Fanatec Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/",origin:"International",compatibility:"Universal",tags:["dashboard","SimHub"],note:"Dash and mounting accessories among broader Fanatec mods."},
  {id:"dash-8",category:categories[5],name:"Etsy AU — DD1 Stream Deck Mount",url:"https://www.etsy.com/au/listing/1226171945/stream-deck-side-mount-for-fanatec",origin:"Marketplace",compatibility:"DD1 direct",tags:["Stream Deck","mount"],note:"Side mounting option for a Stream Deck on the DD1."},
  {id:"dash-9",category:categories[5],name:"Etsy AU — Sim Racing Dash Mount",url:"https://www.etsy.com/au/market/sim_racing_dash_mount",origin:"Marketplace",compatibility:"Universal",tags:["dash mount"],note:"Wide range of phone, tablet and DDU mounts."},
  {id:"dash-10",category:categories[5],name:"Etsy AU — Fanatec Dash Holders",url:"https://www.etsy.com/au/market/fanatec_csl_dd_dash_holder",origin:"Marketplace",compatibility:"Universal",tags:["dash holder"],note:"Fanatec-oriented dashboard holders and brackets."},

  {id:"periph-1",category:categories[6],name:"Fanatec Add-ons",url:"https://www.fanatec.com/au/en/c/add-ons",origin:"Australia",compatibility:"DD1 direct",tags:["shifter","handbrake"],note:"Native Fanatec shifter, handbrake and accessory ecosystem.",featured:true},
  {id:"periph-2",category:categories[6],name:"Pagnian Imports",url:"https://pagnianimports.com.au/",origin:"Australia",compatibility:"Universal",tags:["pedals","shifter"],note:"Major Australian sim-racing retailer."},
  {id:"periph-3",category:categories[6],name:"RaceKraft — Technical Products",url:"https://racekraft.net/collections/technical-products",origin:"Australia",compatibility:"Universal",tags:["Simagic","VNM"],note:"High-end pedals, shifters and controls."},
  {id:"periph-4",category:categories[6],name:"SIMRIGS",url:"https://www.simrigs.com.au/collections/all",origin:"Australia",compatibility:"Universal",tags:["pedals","haptics"],note:"Broad Australian catalogue for premium peripherals.",featured:true},
  {id:"periph-5",category:categories[6],name:"Gamer Gear Direct",url:"https://gamergeardirect.com.au/",origin:"Australia",compatibility:"Universal",tags:["pedals","shifter"],note:"Local option for a range of sim-racing peripherals."},
  {id:"periph-6",category:categories[6],name:"Clutch Kick",url:"https://clutchkick.com.au/",origin:"Australia",compatibility:"Universal",tags:["sim hardware"],note:"Australian high-end sim-racing retailer."},
  {id:"periph-7",category:categories[6],name:"Player1 Sim Gear",url:"https://p1simgear.com.au/",origin:"Australia",compatibility:"Universal",tags:["premium hardware"],note:"Premium pedals and racing controls."},
  {id:"periph-8",category:categories[6],name:"3DRap — Fanatec Pedal Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/pedal-mods/",origin:"International",compatibility:"Universal",tags:["pedal mods"],note:"Elastomers and pedal modifications."},
  {id:"periph-9",category:categories[6],name:"Race Anywhere",url:"https://www.raceanywhere.co.uk/",origin:"International",compatibility:"Universal",tags:["hardware","accessories"],note:"Large international sim-racing catalogue."},
  {id:"periph-10",category:categories[6],name:"Acelith",url:"https://acelith.com/",origin:"International",compatibility:"Universal",tags:["rims","pedals","accessories"],note:"Rims and other sim-racing upgrades with international shipping."},

  {id:"elec-1",category:categories[7],name:"Fanatec — Wheel Base Spare Parts",url:"https://www.fanatec.com/au/en/c/sim-racing-spare-parts/wheel-base-spare-parts",origin:"Australia",compatibility:"DD1 direct",tags:["PSU","Torque Key","USB","RJ12"],note:"Use the official source for critical electrical parts.",featured:true},
  {id:"elec-2",category:categories[7],name:"Fanatec — Wheel Base Accessories",url:"https://www.fanatec.com/au/en/c/sim-racing-accessories/wheel-base-accessories",origin:"Australia",compatibility:"DD1 direct",tags:["Kill Switch","accessories"],note:"Official base-side accessories including safety-related hardware.",featured:true},
  {id:"elec-3",category:categories[7],name:"Fanatec — General Spare Parts",url:"https://www.fanatec.com/au/en/c/sim-racing-spare-parts",origin:"Australia",compatibility:"DD1 direct",tags:["cables","spares"],note:"Official cable and replacement-parts catalogue."},
  {id:"elec-4",category:categories[7],name:"Sim Racing Machines",url:"https://simracingmachines.com/en-int/collections/fanatec",origin:"International",compatibility:"DD1 direct",tags:["wiring","electronics"],note:"Specialist wheel-side electronics and wiring."},
  {id:"elec-5",category:categories[7],name:"Pineapple Grips",url:"https://pineapplegrips.co.uk/",origin:"International",compatibility:"DD1 direct",tags:["conversion wiring"],note:"Fanatec conversion ecosystem and associated components."},
  {id:"elec-6",category:categories[7],name:"AllThingsSimRacing — Etsy",url:"https://www.etsy.com/au/shop/AllThingsSimRacing",origin:"Marketplace",compatibility:"Universal",tags:["PSU mount","E-stop"],note:"Mounts and cable-management accessories."},
  {id:"elec-7",category:categories[7],name:"Etsy AU — DD1 PSU Mount",url:"https://www.etsy.com/au/listing/1228320706/fanatec-dd1-dd2-power-supply-profile-sim",origin:"Marketplace",compatibility:"DD1 direct",tags:["PSU mount"],note:"Profile-rig mounting solution for the Podium power supply."},
  {id:"elec-8",category:categories[7],name:"Etsy AU — Podium PSU Brackets",url:"https://www.etsy.com/au/listing/1186338976/fanatec-dd1dd2-power-supply-mounting",origin:"Marketplace",compatibility:"DD1 direct",tags:["PSU brackets"],note:"Alternative DD1/DD2 PSU mounting hardware."},
  {id:"elec-9",category:categories[7],name:"eBay AU — DD1 Power Supply",url:"https://www.ebay.com.au/sch/i.html?_nkw=Fanatec+DD1+power+supply",origin:"Marketplace",compatibility:"DD1 direct",tags:["power supply"],note:"Used/replacement PSU listings; match electrical specifications carefully."},
  {id:"elec-10",category:categories[7],name:"Amazon AU — Fanatec Cables",url:"https://www.amazon.com.au/s?k=Fanatec+cable",origin:"Marketplace",compatibility:"Universal",tags:["cables"],note:"General cabling and organisation accessories."},

  {id:"custom-1",category:categories[8],name:"Lovely Stickers — DD1/DD2",url:"https://lovelystickers.com/collections/fanatec-dd1-dd2",origin:"International",compatibility:"DD1 direct",tags:["skins","liveries"],note:"Dedicated visual skins for the Podium DD1/DD2.",featured:true},
  {id:"custom-2",category:categories[8],name:"3DRap — Fanatec Mods",url:"https://www.3drap.it/simracing-mods-devices/fanatec-mods-upgrades/",origin:"International",compatibility:"Universal",tags:["3D mods"],note:"Extensive catalogue of functional and cosmetic mods."},
  {id:"custom-3",category:categories[8],name:"Pineapple Grips",url:"https://pineapplegrips.co.uk/",origin:"International",compatibility:"Universal",tags:["grips","custom"],note:"Custom grip and wheel upgrades."},
  {id:"custom-4",category:categories[8],name:"Acelith",url:"https://acelith.com/",origin:"International",compatibility:"Universal",tags:["faceplates","rims"],note:"Wheel-rim and faceplate customisation."},
  {id:"custom-5",category:categories[8],name:"Etsy AU — Fanatec DD1",url:"https://www.etsy.com/au/market/fanatec_dd1",origin:"Marketplace",compatibility:"DD1 direct",tags:["custom parts"],note:"Independent DD1-specific custom parts."},
  {id:"custom-6",category:categories[8],name:"Etsy AU — Fanatec Wheel Holder",url:"https://www.etsy.com/au/market/fanatec_wheel_holder",origin:"Marketplace",compatibility:"Universal",tags:["wheel holder"],note:"Wall and rig-mounted wheel holders."},
  {id:"custom-7",category:categories[8],name:"Etsy AU — Fanatec",url:"https://www.etsy.com/au/market/fanatec",origin:"Marketplace",compatibility:"Universal",tags:["decals","knobs"],note:"Large pool of independent Fanatec accessories."},
  {id:"custom-8",category:categories[8],name:"AllThingsSimRacing",url:"https://www.etsy.com/au/shop/AllThingsSimRacing",origin:"Marketplace",compatibility:"Universal",tags:["mounts","3D print"],note:"3D-printed rig and Fanatec accessories."},
  {id:"custom-9",category:categories[8],name:"eBay AU — Fanatec Accessories",url:"https://www.ebay.com.au/sch/i.html?_nkw=fanatec+accessories",origin:"Marketplace",compatibility:"Universal",tags:["accessories"],note:"Wide variety of used and aftermarket accessories."},
  {id:"custom-10",category:categories[8],name:"AliExpress — Fanatec Accessories",url:"https://www.aliexpress.com/w/wholesale-fanatec-accessories.html",origin:"Marketplace",compatibility:"Universal",tags:["aftermarket"],note:"Budget aftermarket catalogue."},

  {id:"full-1",category:categories[9],name:"Trak Racer Australia",url:"https://trakracer.com.au/",origin:"Australia",compatibility:"DD1 direct",tags:["rig","monitor","seat"],note:"Complete aluminium-profile rigs and monitor solutions.",featured:true},
  {id:"full-2",category:categories[9],name:"Next Level Racing Australia",url:"https://nextlevelracing.com/en-au/",origin:"Australia",compatibility:"DD1 direct",tags:["cockpit","motion"],note:"Complete cockpits and motion-ready options.",featured:true},
  {id:"full-3",category:categories[9],name:"Sim-Lab Australia",url:"https://sim-lab.eu/en-au",origin:"Australia",compatibility:"DD1 direct",tags:["P1X","monitor"],note:"Premium aluminium-profile ecosystems."},
  {id:"full-4",category:categories[9],name:"SIMRIGS Australia",url:"https://www.simrigs.com.au/",origin:"Australia",compatibility:"DD1 direct",tags:["complete rigs"],note:"Australian high-end rigs and components."},
  {id:"full-5",category:categories[9],name:"RaceKraft",url:"https://racekraft.net/",origin:"Australia",compatibility:"Universal",tags:["high-end","motion"],note:"Premium hardware and advanced rig components."},
  {id:"full-6",category:categories[9],name:"Gamer Gear Direct",url:"https://gamergeardirect.com.au/",origin:"Australia",compatibility:"Universal",tags:["rig","monitors"],note:"Australian retailer for cockpits and displays."},
  {id:"full-7",category:categories[9],name:"Clutch Kick Australia",url:"https://clutchkick.com.au/",origin:"Australia",compatibility:"Universal",tags:["simulators"],note:"Premium sim hardware and complete-system components."},
  {id:"full-8",category:categories[9],name:"Player1 Sim Gear",url:"https://p1simgear.com.au/",origin:"Australia",compatibility:"Universal",tags:["premium hardware"],note:"Premium components for full rig builds."},
  {id:"full-9",category:categories[9],name:"Fanatec Cockpits",url:"https://www.fanatec.com/au/en/c/cockpits",origin:"Australia",compatibility:"DD1 direct",tags:["Fanatec cockpit"],note:"Official Fanatec cockpit catalogue."},
  {id:"full-10",category:categories[9],name:"Race Anywhere",url:"https://www.raceanywhere.co.uk/",origin:"International",compatibility:"Universal",tags:["rig accessories"],note:"International source for rig components and accessories."},
];

const originLabel: Record<Origin, string> = {
  Australia: "🇦🇺 Australia",
  International: "🌏 International",
  Marketplace: "🛒 Marketplace",
};

export default function DD1PartsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [origin, setOrigin] = useState<"All" | Origin>("All");
  const [directOnly, setDirectOnly] = useState(false);
  const [favouritesOnly, setFavouritesOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [listView, setListView] = useState(false);
  const [sort, setSort] = useState<"recommended" | "az" | "au">("recommended");
  const [favourites, setFavourites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      setFavourites(JSON.parse(localStorage.getItem("dd1-parts-favourites") || "[]"));
    } catch {
      setFavourites([]);
    }
  }, []);

  const toggleFavourite = (id: string) => {
    setFavourites((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      localStorage.setItem("dd1-parts-favourites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = items.filter((item) => {
      const haystack = [
        item.name,
        item.category,
        item.origin,
        item.compatibility,
        item.note,
        ...item.tags,
      ].join(" ").toLowerCase();

      return (
        (!q || haystack.includes(q)) &&
        (category === "All" || item.category === category) &&
        (origin === "All" || item.origin === origin) &&
        (!directOnly || item.compatibility === "DD1 direct") &&
        (!favouritesOnly || favourites.includes(item.id)) &&
        (!featuredOnly || item.featured)
      );
    });

    if (sort === "az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "au") {
      result.sort((a, b) => {
        const aa = a.origin === "Australia" ? 0 : 1;
        const bb = b.origin === "Australia" ? 0 : 1;
        return aa - bb || a.name.localeCompare(b.name);
      });
    }
    return result;
  }, [query, category, origin, directOnly, favouritesOnly, featuredOnly, favourites, sort]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setOrigin("All");
    setDirectOnly(false);
    setFavouritesOnly(false);
    setFeaturedOnly(false);
    setSort("recommended");
  };

  const copyLink = async (item: Item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(item.id);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  const featured = [
    ["QR2 Base-Side Type-M", "Best first upgrade if your DD1 is still on QR1."],
    ["Podium Kill Switch", "Quick physical safety control for a high-torque base."],
    ["Fanatec Wheel Hub", "Opens up 70 mm / 50.8 mm third-party rim options."],
    ["SimCore DDU", "Australian-made dashboard options with DD1/DD2 mounting."],
  ];

  return (
    <main className="min-h-screen bg-[#080a0d] text-zinc-100">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(225,6,0,0.20),transparent_32%),linear-gradient(180deg,#11141a_0%,#090b0f_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                  Fanatec Podium DD1 • Australia
                </div>
                <h1 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
                  DD1 Parts Hub
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                  A practical directory of parts, upgrades, wheels, mounts, dashboards and rig hardware for the Fanatec DD1 — prioritising stores that ship to Australia.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <div className="text-2xl font-black">100</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Links</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <div className="text-2xl font-black">10</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Categories</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <div className="text-2xl font-black">AU</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">Focused</div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
              <label className="relative block">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search QR2, PSU, DDU, cockpit, paddle, wheel..."
                  className="h-14 w-full rounded-2xl border border-white/10 bg-black/30 pl-12 pr-4 text-sm outline-none transition focus:border-red-500/60 focus:ring-4 focus:ring-red-500/10"
                />
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-14 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm outline-none"
              >
                <option value="recommended">Recommended order</option>
                <option value="az">Name A–Z</option>
                <option value="au">Australia first</option>
              </select>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition " +
                    (category === cat
                      ? "border-red-500 bg-red-600 text-white"
                      : "border-white/10 bg-white/[0.035] text-zinc-300 hover:border-white/20")
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {(["All", "Australia", "International", "Marketplace"] as const).map((value) => (
                <button
                  key={value}
                  onClick={() => setOrigin(value)}
                  className={
                    "rounded-xl border px-3 py-2 text-xs font-semibold transition " +
                    (origin === value
                      ? "border-red-500/70 bg-red-500/15 text-red-200"
                      : "border-white/10 bg-white/[0.025] text-zinc-400")
                  }
                >
                  {value === "All" ? "All origins" : originLabel[value]}
                </button>
              ))}

              <button
                onClick={() => setDirectOnly((v) => !v)}
                className={"rounded-xl border px-3 py-2 text-xs font-semibold " + (directOnly ? "border-red-500/70 bg-red-500/15 text-red-200" : "border-white/10 text-zinc-400")}
              >
                DD1 direct
              </button>
              <button
                onClick={() => setFeaturedOnly((v) => !v)}
                className={"rounded-xl border px-3 py-2 text-xs font-semibold " + (featuredOnly ? "border-amber-500/70 bg-amber-500/10 text-amber-200" : "border-white/10 text-zinc-400")}
              >
                ★ Recommended
              </button>
              <button
                onClick={() => setFavouritesOnly((v) => !v)}
                className={"rounded-xl border px-3 py-2 text-xs font-semibold " + (favouritesOnly ? "border-pink-500/70 bg-pink-500/10 text-pink-200" : "border-white/10 text-zinc-400")}
              >
                ♥ Favourites ({favourites.length})
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-200"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.16em]">Start here</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="mb-2 text-sm font-black">{title}</div>
                <p className="text-xs leading-5 text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold">{filtered.length} results</div>
            <div className="text-xs text-zinc-600">Stock, pricing and shipping can change.</div>
          </div>
          <button
            onClick={() => setListView((v) => !v)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-xs font-semibold text-zinc-300"
          >
            {listView ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
            {listView ? "Cards" : "List"}
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 p-12 text-center text-sm text-zinc-500">
            No products or stores match these filters.
          </div>
        ) : (
          <div className={listView ? "grid gap-3" : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"}>
            {filtered.map((item) => {
              const fav = favourites.includes(item.id);
              return (
                <article
                  key={item.id}
                  className={
                    "group flex flex-col rounded-3xl border bg-[#101318] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#12161d] " +
                    (item.featured ? "border-red-500/20" : "border-white/10") +
                    (listView ? " md:flex-row md:items-center md:gap-6" : "")
                  }
                >
                  <div className={listView ? "min-w-0 flex-1" : "flex-1"}>
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          {item.featured && (
                            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
                              Recommended
                            </span>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-black tracking-tight">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => toggleFavourite(item.id)}
                        aria-label="Favourite"
                        className={"rounded-xl p-2 transition " + (fav ? "bg-pink-500/10 text-pink-400" : "text-zinc-600 hover:bg-white/5 hover:text-zinc-300")}
                      >
                        <Heart className={"h-5 w-5 " + (fav ? "fill-current" : "")} />
                      </button>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      <span className={"rounded-full px-2.5 py-1 text-[10px] font-bold " + (item.origin === "Australia" ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-zinc-400")}>
                        {originLabel[item.origin]}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-zinc-400">
                        {item.compatibility}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-6 text-zinc-500">{item.note}</p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-lg border border-white/[0.06] bg-black/20 px-2 py-1 text-[10px] text-zinc-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={listView ? "flex shrink-0 gap-2 md:w-[245px]" : "flex gap-2"}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black text-white transition hover:bg-red-500"
                    >
                      Open store <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => copyLink(item)}
                      className="inline-flex w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:text-white"
                      aria-label="Copy link"
                    >
                      {copied === item.id ? <ShieldCheck className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <footer className="mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-5 text-zinc-600">
          Directory focused on Fanatec Podium DD1 owners in Australia. Always confirm current stock, exact compatibility, warranty, shipping cost and GST/import charges before ordering. For power supplies and other critical electrical components, prefer official Fanatec parts or a reputable specialist.
        </footer>
      </div>
    </main>
  );
}
