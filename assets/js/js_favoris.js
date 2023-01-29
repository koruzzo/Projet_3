//Ici on séléctionne la div à qui on implémentera du html 
let div_fav = document.querySelector('#favoris_creation');

//Ici on récupère les infos stocké dans le localStorage avec un get
let cleKey = JSON.parse(localStorage.getItem("liste_objet")) || [];


//Boucle for pour récupérer les éléments du localStorage comme dans un tableau
for (let i = 0; i < cleKey.length; i++) {

  if (cleKey != null){

    //On implémente le html des favoris 

      div_fav.innerHTML += 
      `
      <div class="photo_et_text2">
          <h4 class="titre1_lieux">${cleKey[i].title}</h4>
          <h6 class="titre2_lieux">${cleKey[i].contact}</h6>
      </div> 
      `;
  }
  else {
      document.getElementById("div_fav").style.display = "none";
  }

}

