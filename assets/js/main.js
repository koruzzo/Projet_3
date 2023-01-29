//map
var map = L.map('map').setView([50.62192797512714, 3.0520471714875765], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//declaration des variables et des let associés
let addRest = document.querySelector('#pop_up');
let div_fav = document.querySelector('#favori_creation');


const url='https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone'

fetch(url)
    .then((res) =>res.json())
    .then((res) => {
        const places = res.records;
        /*console.log(places[1]);*/
        for(let lieu of places) {
            const marker = L.marker(lieu.fields.geolocalisation).addTo(map)
            .bindPopup(lieu.fields.title).openPopup();

            //appel de la foncion ajoutText avec paramètre lors du click sur un marker
            marker.on("click", () => ajoutText(lieu.fields));
            /*console.log(lieu.fields.title);*/
        }
        
    }).catch(error => console.error(error));


function ajoutText(infoPos){
    //On met le display en flex pour faire apparaitre la popup  
    addRest.style.display = 'flex';


    //On ajoute le html de la popup via un innerHTML

    /*La cafette des sports à un lien dans le text, ce qui 
    posait problème au css, j'aurais pu me contenter du 
    overflow auto mais je voulais tester les if et else avec
    des éléments du infosPos*/ 

    if(infoPos.title === "Cafete des sports")
    {
        addRest.innerHTML = 
        `
                    <div class="photo_et_text"> 
                        <div class = "cadre_photo_lieux"><img class = "photo_lieux" src="${infoPos.photo}" alt=""></div>
                        <div class = "carre_text">
                            <h4 class="titre1_lieux">${infoPos.title}</h4>
                            <h6 class="titre2_lieux">${infoPos.contact}</h6>                 
                        </div>  
                    </div> 
                    <div class = "ensemble_bouton">
                        <div class = "cadre_bouton_fav"><button class="bouton_favoris_popup">Ajouter aux favoris</button></div>
                        <div class = "cadre_bouton_clo"><button class="boutton_fermeture">X</button></div>
                    </div>                      
        `;

    }
    
    else
    {
        addRest.innerHTML = 
        `
                    <div class="photo_et_text"> 
                        <div class = "cadre_photo_lieux"><img class = "photo_lieux" src="${infoPos.photo}" alt=""></div>
                        <div class = "carre_text">
                            <h4 class="titre1_lieux">${infoPos.title}</h4>
                            <h6 class="titre2_lieux">${infoPos.contact}</h6>
                            <p class="texte_lieux">${infoPos.infos}</p>                    
                        </div>  
                    </div> 
                    <div class = "ensemble_bouton">
                        <div class = "cadre_bouton_fav"><button class="bouton_favoris_popup">Ajouter aux favoris</button></div>
                        <div class = "cadre_bouton_clo"><button class="boutton_fermeture">X</button></div>
                    </div>                      
        `;
    }

    //fonction de fermeture des popups
    document.addEventListener('click', (e)=>{
        if (e.target.className === 'boutton_fermeture') 
        {
            addRest.style.display = 'none';
        }
    });

    //fonction d'ajout de favoris
    document.addEventListener('click', (e)=>{
        if (e.target.className === 'bouton_favoris_popup') 
        {
            const listeObjets = 'liste_objet';

            /*Avec mesObjetsString on récupère le contenu de listeObjets dans le localStorage si 
            il as déjas été remplis précedement lors d'un premier passage de 
            l'évènement*/
            const mesObjetsString = localStorage.getItem(listeObjets);
            const mesObjets = JSON.parse(mesObjetsString) || [];

            //newObjet prend les infos actuellement selectionnées
            const newObjet = infoPos;

            //On implémente newObjet dans mesObjets à la suite grace au push
            mesObjets.push(newObjet);
            //On publie dans le localStorage les nouveaux éléments en plus des anciens 
            localStorage.setItem(listeObjets, JSON.stringify(mesObjets));
            alert("Element ajouté aux favoris");
        }
    });

}

