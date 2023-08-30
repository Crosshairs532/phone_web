
// searching
const search = () => {
    const search_text = document.getElementById('search_field').value;
    load_value(search_text);

}


// loading value
const load_value = async (value) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`);
    const data = await res.json();
    // console.log(data.data);
    show_phones(data.data);
}
load_value();


// show-phones in card
const show_phones = (phones) => {

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
            <button class="btn btn-primary">Buy Now</button>
        </div>`;
        phone_container.appendChild(create_div_card);

    });
}

//minimizing all value
