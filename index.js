render();

function render() {
  const API_countries = "https://restcountries.com/v3.1/all";
  //const API_countries = "https://restcountries.com/v2/all";

  let array_countrys_EU = [];

  fetch(API_countries)
    .then((res) => {
      let countrie_name;
      const countries = res.json();

      countries.then((res_new) => {
        console.log(res_new);
        let b = 0;
        for (let i = 0; i < res_new.length; i++) {
          if (res_new[i].continents.includes("Europe")) {
            b = b + 1;
            countrie_name = res_new[i].name.official;
            array_countrys_EU.push(countrie_name);
            console.log(b, countrie_name);
          }
          // if (res_new[i].region == "Europe") {
          //   b = b + 1;
          //   countrie_name = res_new[i].altSpellings[1];
          //   array_countrys_EU.push(countrie_name);
          //   console.log(b, countrie_name);
          // }
        }
        addCountrie(array_countrys_EU);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function addCountrie(array_countrys_EU) {
  const ul = document.getElementById("ul_countrie_list");

  for (let i = 0; i < array_countrys_EU.length; i++) {
    let li = document.createElement("li");
    li.textContent = array_countrys_EU[i];
    ul.appendChild(li);
  }
}
