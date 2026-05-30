const menuData = [
    // --- SOUPS ---
    { name: "Tomato Kothimira Rasam", price: 110, type: "Vegetarian", category: "Soups" },
    { name: "Corn Soup", price: 110, type: "Vegetarian", category: "Soups" },
    { name: "Miriyala Rasam", price: 110, type: "Vegetarian", category: "Soups" },
    { name: "Veg Manchow Rasam", price: 110, type: "Vegetarian", category: "Soups" },
    { name: "Veg Hot & Sour Rasam", price: 110, type: "Vegetarian", category: "Soups" },
    { name: "Velulli Kodi Charu", price: 130, type: "Non-Vegetarian", category: "Soups" },
    { name: "Chicken Manchow Soup", price: 130, type: "Non-Vegetarian", category: "Soups" },
    { name: "Chicken Hot & Sour Soup", price: 130, type: "Non-Vegetarian", category: "Soups" },

    // --- STARTERS ---
    { name: "Crispy Veg", price: 249, type: "Vegetarian", category: "Starters" },
    { name: "Pachimirchi Gobi", price: 199, type: "Vegetarian", category: "Starters" },
    { name: "Veg Manchurian", price: 229, type: "Vegetarian", category: "Starters" },
    { name: "Babycorn - Salt & Pepper / 65 / Chilli", price: 249, type: "Vegetarian", category: "Starters" },
    { name: "Mushroom - Karvepaku / Salt & Pepper", price: 249, type: "Vegetarian", category: "Starters" },
    { name: "Paneer - 65 / Chilli / Majestic / Schezwan", price: 259, type: "Vegetarian", category: "Starters" },

    // --- BIRYANI ---
    { name: "Chicken Biryani Single", price: 229, type: "Non-Vegetarian", category: "Biryani" },
    { name: "Mutton Biryani Single", price: 325, type: "Non-Vegetarian", category: "Biryani" },
    { name: "Egg Biryani", price: 182, type: "Non-Vegetarian", category: "Biryani" },
    { name: "Chicken Biryani Full", price: 419, type: "Non-Vegetarian", category: "Biryani" },
    { name: "Mutton Biryani Full", price: 585, type: "Non-Vegetarian", category: "Biryani" },
    
    // --- MANDI ---
    { name: "Chicken Mandi (1 Person)", price: 338, type: "Non-Vegetarian", category: "Mandi" },
    { name: "Mutton Mandi (1 Person)", price: 455, type: "Non-Vegetarian", category: "Mandi" },
    { name: "Chicken Juicy Mandi (1 Person)", price: 390, type: "Non-Vegetarian", category: "Mandi" },

    // --- BEVERAGES ---
    { name: "Water 500 Ml", price: 13, type: "Vegetarian", category: "Bevarages" },
    { name: "Thums Up Tin", price: 52, type: "Vegetarian", category: "Bevarages" },

    // --- DESSERTS ---
    { name: "Double Ka Meetha", price: 91, type: "Vegetarian", category: "Desserts" },
    { name: "Kaddu Ki Kheer", price: 100, type: "Vegetarian", category: "Desserts" }
];

let cart = [];

function buildMenuUI() {
    const wrapper = document.getElementById("category-sections-wrapper");
    if (!wrapper) return; 

    wrapper.innerHTML = "";

    const searchStr = document.getElementById("menu-search").value.toLowerCase();
    const vegChecked = document.getElementById("veg-toggle").checked;
    const nonVegChecked = document.getElementById("nonveg-toggle").checked;
    const activeCategory = document.querySelector(".category-strip-btn.active").dataset.cat;

    const categories = ["Soups", "Starters", "Biryani", "Mandi", "Bevarages", "Desserts"];

    categories.forEach(category => {
        if (activeCategory !== "all" && activeCategory !== category) return;

        const sectionItems = menuData.filter(item => {
            if (item.category !== category) return false;
            if (searchStr && !item.name.toLowerCase().includes(searchStr)) return false;
            if (item.type === "Vegetarian" && !vegChecked) return false;
            if (item.type === "Non-Vegetarian" && !nonVegChecked) return false;
            return true;
        });

        if (sectionItems.length === 0) return;

        const sectionBlock = document.createElement("div");
        sectionBlock.className = "space-y-4";
        
        let headerTitle = category === "Biryani" ? "Rice & Biryani" : category === "Mandi" ? "Mandi Spreads" : category;
        
        sectionBlock.innerHTML = `
            <h2 class="text-2xl font-bold text-[#2C3A2B] border-b-2 border-[#3A4D39]/15 pb-2">${headerTitle}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        `;

        const cardGrid = sectionBlock.querySelector(".grid");

        sectionItems.forEach(item => {
            const isVeg = item.type === "Vegetarian";
            const rowCard = document.createElement("div");
            rowCard.className = "bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:border-[#3A4D39] transition-all duration-200 group";
            rowCard.innerHTML = `
                <div class="flex items-center space-x-3 pr-2">
                    <span class="${isVeg ? 'text-green-600' : 'text-red-600'} text-lg shrink-0 flex items-center">
                        <i class="fa-solid fa-square-caret-up ${isVeg ? '' : 'rotate-180'}"></i>
                    </span>
                    <div>
                        <h4 class="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#3A4D39] transition-colors">${item.name}</h4>
                        <p class="text-xs font-semibold text-[#C75B39] mt-0.5">₹${item.price}.00</p>
                    </div>
                </div>
                <button onclick="addToCart('${item.name.replace(/'/g, "\\'")}')" class="bg-[#E8F0EA] hover:bg-[#3A4D39] text-[#3A4D39] hover:text-white px-5 py-2 rounded-xl text-xs font-bold uppercase transition-all tracking-wider shrink-0 shadow-sm">Add</button>
            `;
            cardGrid.appendChild(rowCard);
        });

        wrapper.appendChild(sectionBlock);
    });
}

function toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    if (!sidebar) return;
    sidebar.classList.toggle("hidden");
    setTimeout(() => sidebar.classList.toggle("translate-x-full"), 10);
}

function addToCart(itemName) {
    const targetItem = menuData.find(item => item.name === itemName);
    const cartIdx = cart.findIndex(item => item.name === itemName);

    if (cartIdx > -1) {
        cart[cartIdx].quantity += 1;
    } else {
        cart.push({ ...targetItem, quantity: 1 });
    }
    updateCartUI();

    const sidebar = document.getElementById("cart-sidebar");
    if (sidebar && (sidebar.classList.contains("translate-x-full") || sidebar.classList.contains("hidden"))) {
        toggleCart();
    }
}

function alterQty(itemName, change) {
    const idx = cart.findIndex(item => item.name === itemName);
    if (idx > -1) {
        cart[idx].quantity += change;
        if (cart[idx].quantity <= 0) cart.splice(idx, 1);
    }
    updateCartUI();
}

function updateCartUI() {
    const box = document.getElementById("cart-items-container");
    const countBadge = document.getElementById("cart-count");
    const costLabel = document.getElementById("cart-total");
    
    if (!box) return;

    if (cart.length === 0) {
        box.innerHTML = `<p class="text-sm text-gray-400 text-center py-12">Your basket is currently empty.</p>`;
        countBadge.textContent = "0";
        costLabel.textContent = "₹0.00";
        return;
    }

    box.innerHTML = "";
    let cost = 0, units = 0;

    cart.forEach(item => {
        cost += item.price * item.quantity;
        units += item.quantity;

        const row = document.createElement("div");
        row.className = "flex items-center justify-between border-b border-gray-100 pb-3";
        row.innerHTML = `
            <div class="max-w-[65%]">
                <h5 class="text-xs font-bold text-gray-800 leading-tight">${item.name}</h5>
                <p class="text-xs text-[#C75B39] font-medium mt-0.5">₹${item.price}.00</p>
            </div>
            <div class="flex items-center space-x-3 bg-[#F5F2EA] px-2.5 py-1.5 rounded-xl">
                <button onclick="alterQty('${item.name.replace(/'/g, "\\'")}', -1)" class="text-xs font-bold text-gray-500 hover:text-black">-</button>
                <span class="text-xs font-bold text-gray-800">${item.quantity}</span>
                <button onclick="alterQty('${item.name.replace(/'/g, "\\'")}', 1)" class="text-xs font-bold text-gray-500 hover:text-black">+</button>
            </div>
        `;
        box.appendChild(row);
    });

    countBadge.textContent = units;
    costLabel.textContent = `₹${cost}.00`;
}

function sendOrderToWhatsApp() {
    const name = document.getElementById("cust-name").value.trim();
    const address = document.getElementById("cust-address").value.trim();

    if (cart.length === 0) {
        alert("Your basket is empty!");
        return;
    }
    if (!name || !address) {
        alert("Please complete delivery info before ordering!");
        return;
    }

    let msg = `*New Order - Unifood Multi Cuisine*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Name:* ${name}\n*Address/Table:* ${address}\n`;
    msg += `--------------------------------------\n\n`;
    
    let total = 0;
    cart.forEach(item => {
        msg += `▪️ ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
        total += item.price * item.quantity;
    });

    msg += `\n--------------------------------------\n`;
    msg += `*Grand Total:* ₹${total}.00\n`;
    msg += `--------------------------------------\n`;

    window.open(`https://api.whatsapp.com/send?phone=919885397871&text=${encodeURIComponent(msg)}`, '_blank');
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("category-sections-wrapper")) {
        buildMenuUI();
        document.getElementById("menu-search").addEventListener("input", buildMenuUI);
        document.getElementById("veg-toggle").addEventListener("change", buildMenuUI);
        document.getElementById("nonveg-toggle").addEventListener("change", buildMenuUI);

        document.querySelectorAll(".category-strip-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                document.querySelectorAll(".category-strip-btn").forEach(b => b.classList.remove("active"));
                e.currentTarget.classList.add("active");
                buildMenuUI();
            });
        });
    }
});