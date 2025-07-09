const sidebarWrapper = document.createElement("div");
const menuButton = document.createElement("button");
const sidebar = document.createElement("aside");

menuButton.id = "sidebar-toggle";
menuButton.className = "fixed top-4 left-4 z-50 p-2 bg-yellow-500 text-black rounded";
menuButton.textContent = "☰ Menu";

sidebar.id = "sidebar";
sidebar.className = "w-64 h-screen bg-gray-900/90 backdrop-blur-md text-white fixed top-0 left-0 shadow-lg hidden";

const header = document.createElement("div");
const headerText = document.createElement("span");
const closeButton = document.createElement("button");

header.className = "flex items-center justify-between p-6 border-b border-gray-700";

headerText.className = "text-2xl font-bold";
headerText.textContent = "🧭 Navigation";

closeButton.className = "text-gray-400 hover:text-white text-xl";
closeButton.id = "sidebar-close";
closeButton.textContent = "✕";

header.appendChild(headerText);
header.appendChild(closeButton);

const navigation = document.createElement("nav");

navigation.className = "p-4 space-y-2";

const landings = {
    "#Home": "#home", 
    "#Gacha": "#gacha", 
    "#History": "#history", 
    "#News": "#news", 
    "#Banners": "./banners.html", 
    "#Operators": "#operators"
};

for(const section of Object.keys(landings)) {
    const link = document.createElement("a");
    
    link.textContent = section;
    link.href = landings[section];
    link.className = "block px-4 py-2 rounded hover:bg-gray-700 transition";

    navigation.appendChild(link);
}

sidebar.appendChild(header);
sidebar.appendChild(navigation);

sidebarWrapper.appendChild(menuButton);
sidebarWrapper.appendChild(sidebar);

export {
    sidebarWrapper
};