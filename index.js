document.getElementById("title_main").innerText = "European region countries";
let text_error = "Probleme of loading the list, please click on one of the buton. ";

const api_adress = "https://restcountries.com/v33.1/all";
const api_adress_reload = "https://restcountries.com/v3.1/all";

render(api_adress);

//###---Gestion d'erreur---###############################################################

function render_reload(str) {
  const btn_reload_text = str;
  console.log("btn", btn_reload_text);
  if (btn_reload_text == "Reload List Eu") {
    console.log("request of new EU list");
    render(api_adress_reload);
  }
  if (btn_reload_text == "Reload Table") {
    console.log("request of new detailed list");
    table_detail(api_adress_reload);
  }
}

//##########################################################################################

function render(api_adress) {
  let div_affichage = document.getElementById("div_affichage");
  console.log("adresse visée", api_adress);
  document.getElementById("sec_title").innerText = "List of countries";

  fetch(api_adress)
    .then((res) => {
      console.log("2", res.status);
      if (res.status === 200) {
        const countries = res.json();
        countries.then((res_new) => {
          addCountrie(
            res_new
              .filter((list_element) => list_element.continents.includes("Europe"))
              .map((list_element) => list_element.name.official)
          );
        });
      } else {
        div_affichage.textContent = text_error + " Error status " + "[ " + res.status + " ]";
        console.log("in else status :", res.status);
        let btn_textContent = "Reload List";
        render_reload(btn_textContent);
      }
    })
    .catch((error) => {
      div_affichage.textContent = text_error + "[ " + error + " ]";
      console.error(error);
      console.log("in catch list");
      let btn_textContent = "Reload List";
      render_reload(btn_textContent);
    });
}

function addCountrie(array_countrys_EU) {
  const div_affichage = document.getElementById("div_affichage");
  let ul = document.createElement("ul");
  let p = document.createElement("p");
  let a = document.createElement("a");
  var link_text = document.createTextNode("REST Countries");
  a.href = "https://restcountries.com/";

  if (div_affichage.innerHTML != null && div_affichage.innerHTML != "") {
    div_affichage.innerHTML = "";
  }

  a.appendChild(link_text);
  p.textContent = "Source : ";
  p.appendChild(a);

  for (let i = 0; i < array_countrys_EU.length; i++) {
    let li = document.createElement("li");
    li.textContent = array_countrys_EU[i];
    ul.appendChild(li);
  }
  div_affichage.appendChild(ul);
  div_affichage.appendChild(p);
}

//##############################################################################################

function table_detail(api_adress) {
  console.log("adresse visée", api_adress);
  const sec_title = document.getElementById("text_1");
  const div_affichage = document.getElementById("div_affichage");
  document.getElementById("title_main").innerText = "HTML table presentation";

  if (sec_title.innerHTML != null && sec_title.innerHTML != "") {
    sec_title.innerHTML = "";
  }
  if (div_affichage.innerHTML != null && div_affichage.innerHTML != "") {
    div_affichage.innerHTML = "";
  }

  fetch(api_adress)
    .then((res) => {
      console.log("3", res.status);
      if (res.status == 200) {
        const countries = res.json();
        countries.then((res_new) => {
          //console.log(res_new);
          let array_countries_obj = [];
          let countrie_name;
          let countrie_area;
          let countrie_population;
          let countrie_capital;

          function Countrie(countrie_name, countrie_area, countrie_population, countrie_capital) {
            this.countrie_name = countrie_name;
            this.countrie_area = countrie_area;
            this.countrie_population = countrie_population;
            this.countrie_capital = countrie_capital;
          }
          let b = 0;
          for (let i = 0; i < res_new.length; i++) {
            if (res_new[i].continents.includes("Europe")) {
              b = b + 1;
              countrie_name = res_new[i].name.official;
              countrie_area = res_new[i].area;
              countrie_population = res_new[i].population;
              countrie_capital = res_new[i].capital[0];

              let countrie = new Countrie(
                countrie_name,
                countrie_area,
                countrie_population,
                countrie_capital
              );
              array_countries_obj.push(countrie);
            }
          }
          addTable(array_countries_obj);
        });
      } else {
        div_affichage.textContent = text_error + " Error status " + "[ " + res.status + " ]";
        console.log("in else detailed List", res.status);
        let btn_textContent = "Reload Table";
        render_reload(btn_textContent);
      }
    })
    .catch((error) => {
      div_affichage.textContent = text_error + "[ " + error + " ]";
      console.log("dans le catch detailed list");
      console.error(error);
      let btn_textContent = "Reload Table";
      render_reload(btn_textContent);
    });
}

function addTable(array_countries_obj) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const p_source = document.createElement("p");

  table.classList = "table table-bordered table-borderless table-hover text-nowrap";

  var th_countrie_name = document.createElement("th");
  var th_area = document.createElement("th");
  var th_population = document.createElement("th");
  var th_countrie_capital = document.createElement("th");

  var tr_countrie = document.createElement("tr");
  tr_countrie.classList = "bg-light text-center";

  th_countrie_name.innerText = "Country";
  th_area.innerText = "Area";
  th_population.innerText = "Population";
  th_countrie_capital.innerText = "Capital";

  tr_countrie.appendChild(th_countrie_name);
  tr_countrie.appendChild(th_area);
  tr_countrie.appendChild(th_population);
  tr_countrie.appendChild(th_countrie_capital);

  thead.appendChild(tr_countrie);
  table.appendChild(thead);
  div_affichage.appendChild(table);

  console.log(array_countries_obj);

  for (let i = 0; i < array_countries_obj.length; i++) {
    var tr_countrie = document.createElement("tr");
    var td_countrie_name = document.createElement("td");
    var td_countrie_area = document.createElement("td");
    var td_countrie_population = document.createElement("td");
    var td_countrie_capital = document.createElement("td");
    td_countrie_name.classList = "fw-bolder";
    td_countrie_area.classList = "text-end";
    td_countrie_population.classList = "text-end";

    td_countrie_name.textContent = array_countries_obj[i].countrie_name;

    countrie_area = array_countries_obj[i].countrie_area;
    countrie_area = numberWithCommas(countrie_area);
    if (countrie_area == "-1") {
      countrie_area = "NA";
    }
    td_countrie_area.textContent = countrie_area;

    countrie_population = array_countries_obj[i].countrie_population;
    countrie_population = numberWithCommas(countrie_population);
    if (countrie_population == "-1") {
      countrie_population = "NA";
    }
    td_countrie_population.textContent = countrie_population;

    td_countrie_capital.textContent = array_countries_obj[i].countrie_capital;

    tr_countrie.appendChild(td_countrie_name);
    tr_countrie.appendChild(td_countrie_area);
    tr_countrie.appendChild(td_countrie_population);
    tr_countrie.appendChild(td_countrie_capital);

    tbody.appendChild(tr_countrie);
    table.appendChild(tbody);
    div_affichage.appendChild(table);
  }
  p_source.textContent = "List of european region countries";
  div_affichage.appendChild(p_source);
}

function numberWithCommas(number) {
  return number.toLocaleString("en-EN");
  //return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
