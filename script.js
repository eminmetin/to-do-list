//Tüm Elemanları Kapsayan Ul içerisindeki list öğelerini seçtik
const listYaniUL = document.getElementById("list")


const localStoragedekiVarOlanOgeleriGostermek = function () {
    //localestorage'deki itemleri todos değişkeninde tut array olarak [parse metodu] yoksa string olur
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos){
        // eğer localeStoragede hiç todo yok ise git ve bir todo oluştur.
        localStorage.setItem("todos", JSON.stringify([]))
    } else {
        //locale'deki her bir todo item'i için
        for (let i = 0; i< todos.length; i++){
            function newElementForLocal() {

                //git bir li oluştur todo item'i için
                let yeniLi = document.createElement("li")

                //yazılan değeri inputValue adındaki bir değişkende tut 
                let inputValue = todos[i].text;

                // string değeri text node yap (yani html'den kurtul ve düz metin al)                
                let valueMetni = document.createTextNode(inputValue);

                // girilen metni yeni oluşturulan li item'a ekledi
                yeniLi.appendChild(valueMetni);
                


                //yeni span tag'ı oluştur
                let span = document.createElement("span");

                //çarpı işareti oluştur
                let carpi = documen.createTextNode("x");

                // oluşturduğun span içerisinde close isimli bir class oluştur
                span.className = "close";

                //span' a çarpı ekle
                span.appendChild(carpi);

                // bu spanı li içerisine ekle
                yeniLi.appendChild(span);

                //ul içerisinde en son bu oluşturulan li'yi ekle
                listYaniUL.appendChild(yeniLi);

                if (todos[i].isChecked == true) {
                    yeniLi.classList.add("checked")
                } else {
                    yeniLi.classList.remove("checked")
                }
            };
            newElementForLocal();
        }
    }
}
localStoragedekiVarOlanOgeleriGostermek();




let listItems = document.getElementsByTagName("li");


for (let i=0; i < listItems.length; i++){
    let span = document.createElement("span");
    let carpi = document.createTextNode("x");
    span.className ="close";
    span.appendChild(carpi);
    listItems[i].appendChild(span);
}



//CLASS'I CLOSE OLAN TUM ITEMLER
let close = document.getElementsByClassName("close");



//CLOSE'YE TIKLAYINCA BUTUN ITEMLER KAYBOLSUN. HALİHAZIRDA VAR OLAN ITEMLER ICIN GECERLI OLSUN
for ( let i =0 ; i<close.length; i++){
    close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display="none";
 

    // Item'ı localStorage'den de silmek (item'in metnini alıp localde aratıp eşlenenleri sileceğiz)

    const icerikMetni = div.textContent;
    const icerikMetniKesilmis = icerikMetni.slice(0,icerikMetni.length - 2);
    
    // todos listesini array olarak aldım 
    let todos = JSON.parse(localStorage.getItem("todos"));

    //filtre metodu ile kapatılan elemanın metni ile eşleşen localStoragedeki elemanı çıkardım
    todos = todos.filter(item => item.text != icerikMetniKesilmis);

    // güncellenmış yeni todos  listini localStorage'ye gönderdim
    localStorage.setItem("todos", JSON.stringify(todos)) 
    } 
}


//YENİ ELEMENT EKLEME 

function yeniElement() {
    let yeniLi = document.createElement("li");
    let inputValue = document.getElementById("task").value;
    let valueMetni = document.createTextNode(inputValue);
    yeniLi.appendChild(valueMetni);
    if (inputValue === "" || inputValue.replace(/^\s+|\s+$/g, "").length == 0) {
        $(".error").toast("show");       // bootstrap hata toast'ı çalışsın
    } else {
        $(".success").toast("show");     // bootstrap başarıyla eklediniz toast'ı çalışsın
        listYaniUL.appendChild(yeniLi);
    }
    document.getElementById("task").value = "";
    
    let span = document.createElement("span");
    let caprki = document.createTextNode("x");
    span.className  = "close";
    span.appendChild(carpi);
    yeniLi.appendChild(span);





    //Close'ya tıklayınca item kaybolsun -Yeni eklenenler için.

    //class'ı close olan her bir item için
    for ( let i = 0; i< close.length; i++){
       
        //close'a tıklanınca
        close[i].onclick = function(){

            //div değişkeni close'yu kapsayan elementi yani "li" elementini temsil edecek.
            let div = this.parentElement;

            //div'in css display özelliği none olsun yani ekrandan kaybolsun
            div.style.display="none";
        }
    }
    const todo = {
        text: inputValue,
        isChecked: false
    }

    //YENİ EKLENEN ITEM'I LOCALSTORAGE'YE EKLEME
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


// ENTER TUŞUNA BASINCA'DA YENİ BİR İTEM EKLESİN

var input = document.getElementById("task");
input.addEventListener("keyup", function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("liveToastBtn").click();

    }
});



//Kontrol Etme, tıklayınca üstünü çizme
listYaniUL.addEventListener(
    "click",
    function(event){
        if (event.target.tagName === "LI"){
            event.target.classList.toggle("checked");
            
            const icerikMetni = event.target.textContent;
            const icerikMetniKesilmis = icerikMetni.slice(0, icerikMetni.length - 2);


            //İTEM CHECKED OLDUĞUNDA LOCAL'DEKİ İTEM DE CHECKED OLSUN
            if (event.target.classList.contains("checked") == true) {
                const todos = JSON.parse(this.localStorage.getItem("todos"));
                todos.forEach(element => {
                    if (element.text == icerikMetniKesilmis){
                        element.isChecked = true;
                    };
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            } else if (event.target.classList.contains("checked") == false ){
                const todos = JSON.parse(localStorage.getItem("todos"));
                todos.forEach(element => {
                    if ( element.text == icerikMetniKesilmis){
                        element.isChecked = false ;
                    };
                    localStorage.setItem("todos", JSON.stringify(todos));
                });
            }
        }
    },
    false
);
