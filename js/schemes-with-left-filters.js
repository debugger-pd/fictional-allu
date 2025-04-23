document.addEventListener("DOMContentLoaded", function() {
  const toggleButtons = document.querySelectorAll(".toggle-filter");
  toggleButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      const filterGroup = this.closest(".filter-group");
      const filterContent = filterGroup.querySelector(".filter-content");
      if (filterGroup.classList.contains("active")) {
        filterGroup.classList.remove("active");
        filterContent.style.display = "none";
        this.textContent = "+";
      } else {
        filterGroup.classList.add("active");
        filterContent.style.display = "block";
        this.textContent = "–";
      }
    });
  });

  const filterOptions = document.querySelectorAll(".filter-options li");
  filterOptions.forEach(option => {
    option.addEventListener("click", function() {
      const siblings = this.parentElement.querySelectorAll("li");
      siblings.forEach(li => li.classList.remove("selected"));
      this.classList.add("selected");
      filterSchemes();
    });
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("keyup", filterSchemes);

  const searchInputSide = document.getElementById("searchInputSide");
  if (searchInputSide) {
    searchInputSide.addEventListener("keyup", function() {
      searchInput.value = this.value;
      filterSchemes();
    });
  }

  const resetFiltersLink = document.querySelector(".reset-filters");
  resetFiltersLink.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";
    const allOptionLists = document.querySelectorAll(".filter-options");
    allOptionLists.forEach(ul => {
      ul.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
      if (ul.firstElementChild) ul.firstElementChild.classList.add("selected");
    });
    filterSchemes();
  });

  document.querySelectorAll(".filter-options").forEach(ul => {
    if (!ul.querySelector("li.selected")) {
      ul.firstElementChild.classList.add("selected");
    }
  });

  function getFilterValue(filterName) {
    const ul = document.querySelector(`.filter-options[data-filter="${filterName}"]`);
    if (ul) {
      const selected = ul.querySelector("li.selected");
      return selected ? selected.getAttribute("data-value") : "all";
    }
    return "all";
  }

  window.filterSchemes = function() {
    const searchVal = searchInput.value.toLowerCase();
    const categoryVal = getFilterValue("category");
    const regionVal = getFilterValue("region");
    const benefitsVal = getFilterValue("benefits");
    const stateVal = getFilterValue("state");
    const genderVal = getFilterValue("gender");
    const ageVal = getFilterValue("age");
    const casteVal = getFilterValue("caste");
    const ministryVal = getFilterValue("ministry");
    const residenceVal = getFilterValue("residence");
    const minorityVal = getFilterValue("minority");
    const disabledVal = getFilterValue("disabled");
    const dbtVal = getFilterValue("dbt");
    const disabilityVal = getFilterValue("disability");

    const schemeItems = document.querySelectorAll(".scheme-item");
    schemeItems.forEach(item => {
      const title = item.querySelector("h3").textContent.toLowerCase();
      const itemCategory = item.getAttribute("data-category");
      const itemRegion = item.getAttribute("data-region");
      const itemBenefits = item.getAttribute("data-benefits");
      const itemState = item.getAttribute("data-state");
      const itemGender = item.getAttribute("data-gender");
      const itemAge = item.getAttribute("data-age");
      const itemCaste = item.getAttribute("data-caste");
      const itemMinistry = item.getAttribute("data-ministry");
      const itemResidence = item.getAttribute("data-residence");
      const itemMinority = item.getAttribute("data-minority");
      const itemDisabled = item.getAttribute("data-disabled");
      const itemDbt = item.getAttribute("data-dbt");
      const itemDisability = item.getAttribute("data-disability");

      let visible = true;
      if (searchVal && !title.includes(searchVal)) visible = false;
      if (categoryVal !== "all" && itemCategory !== categoryVal) visible = false;
      if (regionVal !== "all" && itemRegion !== regionVal) visible = false;
      if (benefitsVal !== "all" && itemBenefits !== benefitsVal) visible = false;
      if (stateVal !== "all" && itemState !== stateVal) visible = false;
      if (genderVal !== "all" && itemGender !== genderVal) visible = false;
      if (ageVal !== "all" && itemAge !== ageVal) visible = false;
      if (casteVal !== "all" && itemCaste !== casteVal) visible = false;
      if (ministryVal !== "all" && itemMinistry !== ministryVal) visible = false;
      if (residenceVal !== "all" && itemResidence !== residenceVal) visible = false;
      if (minorityVal !== "all" && itemMinority !== minorityVal) visible = false;
      if (disabledVal !== "all" && itemDisabled !== disabledVal) visible = false;
      if (dbtVal !== "all" && itemDbt !== dbtVal) visible = false;
      if (disabilityVal !== "all" && itemDisability !== disabilityVal) visible = false;

      item.style.display = visible ? "block" : "none";
    });
  }
});
