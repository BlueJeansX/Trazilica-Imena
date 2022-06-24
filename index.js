const ispis = document.querySelector('.ispis');
const prethodni = document.querySelector('.prethodni');
const h3rezultat = document.querySelector('.h3rezultat');
const input = document.querySelector('.form-control');



document
    .getElementById("botunZaSlanje")
    .addEventListener("click", dohvatiPodatke);

function dohvatiPodatke(event) {
    let unos = event.target.previousElementSibling.value;
    fetch(`https://api.nationalize.io/?name=${unos}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            prikaziNoveRezultate(data);
        });
    input.value = '';

    const drzava = new Intl.DisplayNames(["us"], {
        type: "region",
    });

    
    function prikaziNoveRezultate(data) {
        if (data.country.length == 0) {
            nemaPodataka();
        }
        else {
            if (data.country[1] == undefined || data.country[2] == undefined) {
                imaParPodataka();
            }
            else {
                imaSvePodatke();
            }
        }


        function nemaPodataka() {
            h3rezultat.innerHTML = `Ne pronalazim ime  ${data.name} `;
            ispis.innerHTML = "";
        };


        function imaParPodataka() {

            h3rezultat.innerHTML = `Rezultati pretrage za:  ${data.name} `
            ispis.innerHTML = `
        <ul style="list-style-type:none;">
          <li>
            ${drzava.of(data.country[0].country_id)} 
            ${Math.round(data.country[0].probability * 100)}%
          </li>
        </ul>`;
            prethodni.innerHTML += `<button type="button" class="botunZaPonovit">${data.name}</button> `;
        }


        function imaSvePodatke() {
            h3rezultat.innerHTML = `Rezultati pretrage za:  ${data.name} `
            ispis.innerHTML = `
                            <ul style="list-style-type:none;">    
                                <li>
                                    ${drzava.of(data.country[0].country_id)} 
                                    ${Math.round(data.country[0].probability * 100)}%
                                </li>
                                <li>
                                    ${drzava.of(data.country[1].country_id)}
                                    ${Math.round(data.country[1].probability * 100)}%
                                    </li>
                                <li>
                                    ${drzava.of(data.country[2].country_id)}
                                    ${Math.round(data.country[2].probability * 100)}%
                                </li>
                            </ul>
                            `;
            prethodni.innerHTML += `<button type="button" id="botunZaPonovit">${data.name}</button> `;
            document.getElementById("botunZaPonovit").addEventListener("click", function () {
                // document.getElementById("demo").innerHTML = "Test";
            });
        }
    }
}







