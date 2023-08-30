
// searching
const search = (bool) => {
    load_spinner(true);
    const search_text = document.getElementById('search_field').value;
    load_value(search_text, bool);

}


// loading value
const load_value = async (value, bool) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await res.json();
    // console.log(data.data);
    show_phones(data.data, bool);
}
load_value();
// show all click
const show = () => {

    search(true);
}

// show-phones in card
const show_phones = (phones, bool) => {

    if (phones.length > 7 && !bool) {
        const show_all = document.getElementById('show_all');
        show_all.classList.remove('hidden');
    }
    else {
        show_all.classList.add('hidden');
    }
    if (!bool) {
        phones = phones.slice(0, 7);
    }


    const phone_container = document.getElementById('Phone-container');
    phone_container.textContent = '';

    phones.forEach(phone => {
        const create_div_card = document.createElement('div');
        create_div_card.classList = "card w-96 bg-base-100 shadow-xl";
        create_div_card.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary" onclick= buy_now('${phone.slug}')>Buy Now</button>
        </div>`;
        phone_container.appendChild(create_div_card);


    });
    load_spinner(false);

}
// load_spinner
const load_spinner = (isloading) => {
    console.log(isloading);
    const loading = document.getElementById('loading');
    if (isloading) {
        loading.classList.remove('hidden');
    }
    else {
        loading.classList.add('hidden');
    }
}
// buy now

const buy_now = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    show_details(data.data)
    // my_modal_2.showModal();
    // buy_now

}
// show deatils
const show_details = (phone) => {

    const details_container = document.getElementById('details');

    details_container.innerHTML = `
    <dialog id="my_modal_2" class="modal ">

        <form method="dialog" class="modal-box space-y-3">
            <img class="mx-auto" src="${phone.image}" alt="">
            <h3 class="font-bold text-lg">${phone.name}</h3>
            <p><span class= "font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
            <p><span class= "font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
            <p><span class= "font-bold">chipset:</span> ${phone.mainFeatures.chipSet}</p>
            <p><span class= "font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
            <p><span class= "font-bold">GPS:</span> ${phone.others?.gps || 'not available'}</p>
            <p><span class= "font-bold">Secsors:</span> ${phone.mainFeatures.sensors}</p>
            <p class="py-4"></p>
        </form>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
`
    my_modal_2.showModal();

}