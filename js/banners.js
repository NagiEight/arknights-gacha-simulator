import * as access from "/js/access.js";
 
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const gallery = document.getElementById('gallery');

gridBtn.addEventListener('click', () => {
    gallery.classList.remove('flex', 'flex-col');
    gallery.classList.add('grid', 'grid-cols-2', 'md:grid-cols-4');
});

listBtn.addEventListener('click', () => {
    gallery.classList.remove('grid', 'grid-cols-2', 'md:grid-cols-4');
    gallery.classList.add('flex', 'flex-col');    
});

access.jsonLoader("../data/bannerData.json").then(data => {
    for(const i of data) {
        const EN = document.createElement("b");

        EN.textContent = "EN: "

        const path = "../" + i.replace();
        const banner = document.createElement("div");
        const bannerImage = document.createElement("img");
        const bannerInfo = document.createElement("div");
        const bannerHeader = document.createElement("h3");
        const ENDate = document.createElement("p");
        const bannerType = document.createElement("p");
        
        banner.className = "bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition";

        bannerImage.className = "w-full h-48 object-cover";

        bannerInfo.className = "p-4";

        bannerHeader.className = "text-white font-semibold text-lg";

        ENDate.className = "text-gray-400 text-sm";
        bannerType.className = "text-gray-400 text-sm";

        access.jsonLoader(encodeURIComponent(path)).then(data => {
            bannerHeader.textContent = data.name;

            bannerImage.src = encodeURIComponent("../" + data.art);
            bannerImage.alt = data.name;
            
            ENDate.appendChild(EN);
            ENDate.textContent += data.ENTime;
        });
        
        bannerInfo.appendChild(bannerHeader);
        bannerInfo.appendChild(ENDate);

        banner.appendChild(bannerImage);
        banner.appendChild(bannerInfo);

        gallery.appendChild(banner);
    }
});