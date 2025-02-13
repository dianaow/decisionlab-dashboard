import { j as ensure_array_like, e as escape_html, c as pop, p as push } from "../../../chunks/index.js";
import { d as data, a as attr, D as DonutChart, b as Demographics, A as Attributes, B as BarriersDrivers, C as CurrentHousing, K as KeyCommunication } from "../../../chunks/data.js";
function _page($$payload, $$props) {
  push();
  let urbanicity, gender, ageGroup, householdIncome, drivers, barriers, householdComposition;
  let dataToShow;
  const provinces = [
    "Select a Province",
    ...new Set(Object.keys(data))
  ];
  function filterAndAggregateData(filters) {
    const filteredData = data.filter((d) => {
      return Object.entries(filters).every(([key, value]) => value === "Select" || d[key] === value);
    });
    const result = {};
    filteredData.forEach((item) => {
      const key = Object.entries(filters).filter(([_, value]) => value !== "Select").map(([
        key2,
        // Only include filters that are not 'Select'
        value
      ]) => `${key2}-${value}`).join("-") + `-${item.attribute}-${item.index}`;
      if (!result[key]) {
        result[key] = { ...item };
      } else {
        result[key].value += item.value;
      }
    });
    console.log(result);
    return Object.values(result);
  }
  const adoptionStats = [
    {
      title: "Adopted",
      count: 2345,
      percentage: 33,
      type: "homeowners",
      variant: "#2F4144"
    },
    {
      title: "High Capability,\nHigh Willingness",
      count: 226,
      percentage: 18,
      type: "homeowners",
      variant: "#00C2B2"
    },
    {
      title: "High Capability,\nLow Willingness",
      count: 138,
      percentage: 12,
      type: "homeowners",
      variant: "#00C2B2"
    },
    {
      title: "Low Capability,\nHigh Willingness",
      count: 1653,
      percentage: 7,
      type: "homeowners",
      variant: "#2F4144"
    },
    {
      title: "Low Capability,\nLow Willingness",
      count: 1214,
      percentage: 30,
      type: "homeowners",
      variant: "#6B7280"
    }
  ];
  const locationData = [
    {
      region: "Ontario",
      value: 32,
      color: "bg-[#2F4144]"
    },
    {
      region: "Quebec",
      value: 22,
      color: "bg-[#5CD5C4]"
    },
    {
      region: "British Columbia",
      value: 13,
      color: "bg-[#3D5D5B]"
    },
    {
      region: "Alberta",
      value: 10,
      color: "bg-[#94A3A8]"
    },
    {
      region: "Prairies",
      value: 8,
      color: "bg-[#467A76]"
    },
    {
      region: "Atlantic Canada",
      value: 8,
      color: "bg-[#69A6A1]"
    },
    {
      region: "Northern Territories",
      value: 8,
      color: "bg-[#D9E1E6]"
    }
  ];
  const housingTypes = [
    { label: "Renters", percentage: 80 },
    { label: "Owners", percentage: 65 },
    { label: "Type 3", percentage: 55 },
    { label: "Type 4", percentage: 35 },
    { label: "Type 5", percentage: 25 }
  ];
  const buildingTypes = [
    { label: "Single family home", percentage: 75 },
    {
      label: "Apartment (in a building with more than 12 units)",
      percentage: 65
    },
    {
      label: "Duplex, triplex, fourplex",
      percentage: 45
    },
    {
      label: "Accessory Dwelling Unit",
      percentage: 35
    },
    {
      label: "Townhouse, row house or semi-detached house",
      percentage: 25
    }
  ];
  const householdSize = [
    { label: "2 - 3 people", percentage: 85 },
    { label: "4 - 6 people", percentage: 65 },
    { label: "1 person", percentage: 45 },
    { label: "7 - 10", percentage: 35 },
    { label: "10 and more", percentage: 25 }
  ];
  const attributes = [
    {
      label: "Household income",
      value: "More than 130,000",
      percentage: 80
    },
    {
      label: "Household income",
      value: "100,001-130,000",
      percentage: 75
    },
    { label: "Age", value: "26-30", percentage: 60 },
    { label: "Age", value: "31-40", percentage: 40 },
    {
      label: "Gender",
      value: "Men",
      percentage: 33
    },
    {
      label: "Household income",
      value: "70,001-100,000",
      percentage: 25
    },
    {
      label: "What is the relationship to you of the people living at your residence?",
      value: "I live alone",
      percentage: 25
    },
    {
      label: "What is the relationship to you of the people living at your residence?",
      value: "your spouse or common-law partner",
      percentage: 20
    },
    {
      label: "Gender",
      value: "Women",
      percentage: 15
    },
    {
      label: "Household income",
      value: "40,001-70,000",
      percentage: 15
    }
  ];
  const trustSources = [
    {
      label: "Information Verifiable through Other Sources",
      percentage: 90
    },
    {
      label: "Expert or Professional Driven Information",
      percentage: 75
    },
    {
      label: "Information from Non-Politically or Financially Motivated Orgs",
      percentage: 60
    },
    {
      label: "Information from Government Entities",
      percentage: 45
    },
    {
      label: "Professionally Presented Information",
      percentage: 30
    }
  ];
  const distrustSources = [
    {
      label: "Social Media (e.g. Facebook and Instagram)",
      percentage: 85
    },
    {
      label: "Online Marketplaces (e.g. FB Marketplace, Craigslist and Kijiji)",
      percentage: 70
    },
    {
      label: "Commercial Content (e.g. From Real Estate Firms & Influencers)",
      percentage: 55
    },
    {
      label: "Profit-Driven Companies",
      percentage: 40
    },
    {
      label: "Political Sources or Organizations with Ulterior Motives",
      percentage: 25
    }
  ];
  const channels = [
    {
      icon: "🌐",
      title: "Internet or Online Sources",
      description: "At vero eos et accusamus"
    },
    {
      icon: "💡",
      title: "Word-of-Mouth",
      description: "At vero eos et accusamus"
    },
    {
      icon: "📍",
      title: "Site Visits",
      description: "At vero eos et accusamus"
    },
    {
      icon: "📺",
      title: "Traditional Media",
      description: "At vero eos et accusamus"
    },
    {
      icon: "➕",
      title: "Other Sources",
      description: "At vero eos et accusamus"
    }
  ];
  urbanicity = ["Select an Urbanicity"];
  {
    const filters = {
      province: "Select",
      urbanicity: "Select",
      innovation: "Select",
      adoption: "Select"
    };
    dataToShow = filterAndAggregateData(filters);
  }
  ({
    gender,
    ageGroup,
    householdIncome,
    drivers,
    barriers,
    householdComposition
  } = dataToShow);
  const each_array = ensure_array_like(provinces);
  const each_array_1 = ensure_array_like(urbanicity);
  const each_array_2 = ensure_array_like(provinces);
  const each_array_3 = ensure_array_like(urbanicity);
  const each_array_4 = ensure_array_like(adoptionStats);
  const each_array_5 = ensure_array_like(adoptionStats);
  $$payload.out += `<div class="flex flex-col h-auto"><aside id="dropdownPanel" class="grid grid-cols-2 gap-6 w-full bg-grey-darkgreen p-6 text-white"><div class="space-y-6"><h3 class="text-white mb-3">Filters</h3> <div class="flex space-x-2"><label>Location</label> <select class="flex-1"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let province = each_array[$$index];
    $$payload.out += `<option${attr("value", province)}>${escape_html(province)}</option>`;
  }
  $$payload.out += `<!--]--></select> <select class="flex-1"><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let area = each_array_1[$$index_1];
    $$payload.out += `<option${attr("value", area)}>${escape_html(area)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="flex"><label>How would you describe yourself?</label> <select><option>Select a descriptor</option></select></div> <div class="flex"><label>Which innovation are you focused on?</label> <select><option>Select an innovation</option></select></div> <div class="flex"><label>Who are you looking to learn about?</label> <select><option>Homeowners</option></select></div></div> <div class="space-y-6"><h3 class="text-white mb-3">Filters</h3> <div class="flex space-x-2"><label>Location</label> <select class="flex-1"><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let province = each_array_2[$$index_2];
    $$payload.out += `<option${attr("value", province)}>${escape_html(province)}</option>`;
  }
  $$payload.out += `<!--]--></select> <select class="flex-1"><!--[-->`;
  for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
    let area = each_array_3[$$index_3];
    $$payload.out += `<option${attr("value", area)}>${escape_html(area)}</option>`;
  }
  $$payload.out += `<!--]--></select></div> <div class="flex"><label>How would you describe yourself?</label> <select><option>Select a descriptor</option></select></div> <div class="flex"><label>Which innovation are you focused on?</label> <select><option>Select an innovation</option></select></div> <div class="flex"><label>Who are you looking to learn about?</label> <select><option>Homeowners</option></select></div></div></aside> <div class="w-full bg-background-dark"><main class="grid grid-cols-2 gap-6 bg-background-dark px-4 sm:px-8 py-2 my-3 sm:my-0"><div><p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p> <div class="space-y-2 mt-3"><!--[-->`;
  for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
    let stat = each_array_4[$$index_4];
    $$payload.out += `<div class="flex items-center justify-between border-t border-grey-linegreen"><div class="caption mt-5">${escape_html(stat.title)}</div> <div class="flex items-center gap-4"><span><span class="body-s italic">${escape_html(stat.count)}</span> <span class="body-s italic">homeowners</span></span> <div class="w-32 flex items-center justify-end gap-2 mt-2"><h3>${escape_html(stat.percentage)}%</h3> `;
    DonutChart($$payload, {
      percentage: stat.percentage,
      color: stat.variant,
      bgcolor: "#C6D0D0",
      showPercentages: false,
      showDonut: false
    });
    $$payload.out += `<!----></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></div> <div><p class="subtitle-s">Adoption Potential <span class="text-primary-darkgreen italic">for ADUs</span></p> <div class="space-y-2 mt-3"><!--[-->`;
  for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
    let stat = each_array_5[$$index_5];
    $$payload.out += `<div class="flex items-center justify-between border-t border-grey-linegreen"><div class="caption mt-5">${escape_html(stat.title)}</div> <div class="flex items-center gap-4"><span><span class="body-s italic">${escape_html(stat.count)}</span> <span class="body-s italic">homeowners</span></span> <div class="w-32 flex items-center justify-end gap-2 mt-2"><h3>${escape_html(stat.percentage)}%</h3> `;
    DonutChart($$payload, {
      percentage: stat.percentage,
      color: stat.variant,
      bgcolor: "#C6D0D0",
      showPercentages: false,
      showDonut: false
    });
    $$payload.out += `<!----></div></div></div>`;
  }
  $$payload.out += `<!--]--></div></div></main> <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0"><div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">`;
  Demographics($$payload, {
    gender,
    ageGroup,
    householdIncome,
    locationData
  });
  $$payload.out += `<!----> `;
  Demographics($$payload, {
    gender,
    ageGroup,
    householdIncome,
    locationData
  });
  $$payload.out += `<!----></div></main> <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0"><div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6 mt-5">`;
  Attributes($$payload, { data: attributes });
  $$payload.out += `<!----> `;
  Attributes($$payload, { data: attributes });
  $$payload.out += `<!----></div></main> <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0"><div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">`;
  BarriersDrivers($$payload, { barriers, drivers });
  $$payload.out += `<!----> `;
  BarriersDrivers($$payload, { barriers, drivers });
  $$payload.out += `<!----></div></main> <main class="min-h-screen bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0"><div class="w-full mx-auto grid grid-cols-2 gap-4 sm:gap-6">`;
  CurrentHousing($$payload, {
    housingTypes,
    buildingTypes,
    householdSize,
    householdComposition
  });
  $$payload.out += `<!----> `;
  CurrentHousing($$payload, {
    housingTypes,
    buildingTypes,
    householdSize,
    householdComposition
  });
  $$payload.out += `<!----></div></main> <main class="flex bg-background-light px-4 sm:px-8 py-2 my-3 sm:my-0">`;
  KeyCommunication($$payload, { channels, trustSources, distrustSources });
  $$payload.out += `<!----> `;
  KeyCommunication($$payload, { channels, trustSources, distrustSources });
  $$payload.out += `<!----></main></div></div>`;
  pop();
}
export {
  _page as default
};
