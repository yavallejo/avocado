/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const URL = "https://platzi-avo.vercel.app/";
const app = document.querySelector('#app');

// Intl (internacionalizacion) API
// La podemos usar para :
// 1: Formato Fechas
// 2: formato monedas (para este proyecto es lo que vamos a usar)
const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD"
    }).format(price)

    return newPrice;
}

// Web API
// Conectarnos al servidor
window.fetch(`${URL}api/avo`)
      // Procesamos la respuesta y la convertimos en JSON
      .then(response => response.json())
    //   JSON -> Data -> Renderizamos info en el browser
      .then(responseJSON => {
          const todosLosItems = [];
          responseJSON.data.forEach(item => {
              console.log(item.name);
            // Crear imagen
            const image = document.createElement('img');
                  image.src = `${URL}${item.image}`;
                  image.className = 'w-32 h-32 md:w-48 md:h-auto rounded-full mx-auto mb-5'
            // Crear titulo
            const title = document.createElement('h2');
                  title.textContent = item.name;
                  title.className = 'text-2xl font-semibold text-green-700 italic'

            // crear Precio
            const price = document.createElement('span');
                  price.textContent = formatPrice(item.price);
                  price.className = 'text-2xl text-green-700'
            // crear container
            const container = document.createElement('div');
                  container.className = 'bg-gray-100 rounded-xl py-8 px-4 shadow-lg hover:bg-gray-200';
            container.append(image, title, price);

            todosLosItems.push(container);
          })

          app.append(...todosLosItems);
      })
