export default class ShopDisplay {

    static display(item) {

        var div = document.createElement('div');
        
        div.id = 'item-' + item.minion.id;
        div.classList.add('shop-item')

        div.innerHTML = /* html */`
        
            <span class="shop-image"><img id="image-${item.minion.id}" src="${item.minion.image}"  draggable="true"/></span>
            <span><img src="assets/img/cosmo/gold.png">${item.price.gold}</span>
            <span><img src="assets/img/cosmo/sapphyre.png">${item.price.ruby}</span>
            <span><img src="assets/img/cosmo/ruby.png">${item.price.saphyre}</span>
            <span><img src="assets/img/cosmo/vortex.png">${item.price.vortex}</span>
        
        `;

        document.getElementById('shop').append(div);

        document.getElementById('image-' + item.minion.id).addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", JSON.stringify({minion: item.minion.export(), price: item.price}));
        });
    }

}