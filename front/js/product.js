fetch('http://localhost:3000/api/products')//Envoyer une requête pour récupérer les données au format json
.then(response => response.json())
.then(data => console.log(data));

// récupération de l'id
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");
//Just added
var url = new URL(window.location.href)
var productId = url.searchParams.get("id");
let item = "";

fetch('http://localhost:3000/api/products/'+id)
.then(response => response.json())
.then(data => {
    const product = data;
     
    printProduit(product);

  // fonction pour afficher le  produit
  function printProduit(product) {

    // insertion des information de la card du produit
    const selectionProductImage = document.getElementById("productImage");
    selectionProductImage.innerHTML += `
    <img src="${product.imageUrl}" alt="${product.name}">`;

    const selectionProductTitle = document.getElementById("title");
    selectionProductTitle.innerHTML += `
      ${product.name}
`;
        const selectionProductPrice = document.getElementById("price");
        selectionProductPrice.innerHTML += `
        ${product.price}
    `;
        const selectionProductDescription = document.getElementById("description");
        selectionProductDescription.innerHTML += `
        ${product.description}      
    `;
    displayColors(product);
    }
   
 //cette fonction, parcour la liste de couleurs de ce produits et les affiches dans un element HTML de type <option> 
    function displayColors(product) {
        const colorsChoice = document.getElementById("colors");
        for (let colors of product.colors) {
            colorsChoice.innerHTML += `<option value="${colors}">${colors}</option>`;  
        }
    }
    addToCart(item);   
    
 const quantityPicked = document.querySelector("#quantity");
 const colorPicked = document. querySelector("#colors");
 
 function addToCart(item) {
 const btn_envoyerPanier = document.querySelector("#addToCart");
 
    //Pour écouter la condition de quantité 1 -100 et de couleur non nulle
    btn_envoyerPanier.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0){

    //Recupérer choix couleur
    let colorsChoice = colorPicked.value;
                
    //Choix de la quantité
    let quantityChosen = quantityPicked.value;

    //Récupérer des options de l'item à ajouter au panier
    let productOptions = {
        idOfProduct: productId,
        nameOfProduct: product.name,
        colorOfProduct: colorsChoice,
        descriptionOfProduct: product.description,
        quantityOfProduct: Number(quantityChosen),
        priceOfProduct: product.price,
        imgOfProduct: product.imageUrl
    }; 
    addToCart(item); 
    
    //Initialiser le local storage
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));

    //boule d'ajouter au panier
    const popupConfirmation =() => {
        if(window.confirm(`Votre commande est ajoutée au panier. Cliquez sur OK pour le consulter`)){
            window.location.href ="cart.html";
        } 
    }
  //Importer les produits dans le local storage
    //Le panier avec min 1 article; La commande est/n'est pas dans le panier/ le panier vide.
    if (localStorageProduct) {
        const resultFind = localStorageProduct.find(
            (el) => el.idOfProduct === productId && el.colorOfProduct === colorsChoice);
            
            if (resultFind) {
                let nowQuantity =
                parseInt(productOptions.quantityOfProduct) + parseInt(resultFind.quantityOfProduct);
                resultFind.quantityOfProduct = nowQuantity;
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.table(localStorageProduct);
                popupConfirmation();
            
            } else {
                localStorageProduct.push(productOptions);
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.table(localStorageProduct);
                popupConfirmation();
            }
       
        } else {
            localStorageProduct =[];
            localStorageProduct.push(productOptions);
            localStorage.setItem("product", JSON.stringify(localStorageProduct));
            console.table(localStorageProduct);
            popupConfirmation();
        }}
    });
}})





    

    







 





