document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error('Error: ' + request.status));
            }
        });
        request.send();
    };



    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change'),
            cardDetailsTitleElem = document.querySelector('.card-details__title'),
            cardImageItem = document.querySelector('.card__image_item'),
            cardDetailsPrice = document.querySelector('.card-details__price'),
            descriptionMemory = document.querySelector('.description__memory'),
            modalSubtitle = document.querySelector('.modal__subtitle');

        const data = [{
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 95990,
                memoyROM: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: 'img/iPhone-silver.png',
                price: 120990,
                memoyROM: 256
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 99990,
                memoyROM: 128
            }
        ];

        const deactive = () => {
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active'));
        };
        cardDetailChangeElems.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    deactive();
                    btn.classList.add('.active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItem.src = data[i].img;
                    cardImageItem.alt = data[i].name;
                    cardDetailsPrice.textContent = data[i].price + "₽";
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memoyROM} ГБ`;
                }
            });
        });

    };

    const accordion = () => {
        const characteristicsList = document.querySelector('.characteristics__list'),
            characteristicsItem = document.querySelectorAll('.characteristics__item');

        characteristicsItem.forEach(element => {
            if (element.children[1].classList.contains('active')) {
                element.children[1].style.height = `${element.children[1].scrollHeight}px`;
            }
        });

        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown);
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add('active');
            dropDown.classList.add('active');
        };

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (button, dropDown) => {
            characteristicsItem.forEach((elem) => {
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        };

        characteristicsList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }
        });

    };
    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
            modal = document.querySelector('.modal'),
            cardDetailsTitle = document.querySelector('.card-details__title'),
            modalTitle = document.querySelector('.modal__title');

        cardDetailsButtonBuy.addEventListener('click', () => {
            modal.classList.add('open');
            modalTitle.textContent = cardDetailsTitle.textContent;
        });
        modal.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal__close') || event.target === modal) {
                modal.classList.remove('open');
            }
        });

        document.addEventListener('keydown', event => {
            if (event.code === "Escape") {
                modal.classList.remove('open');
            }
        });
    };

    const renderCrossSell = () => {
        const crossSellList = document.querySelector('.cross-sell__list');

        const createCrossSellItem = (good) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
                    <article class="cross-sell__item">
                            <img class="cross-sell__image" src="cross-sell-dbase/img/50126638b.jpg" alt="">
                            <h3 class="cross-sell__title">${good.name}</h3>
                            <p class="cross-sell__price">12990₽</p>
                            <div class="button button_buy cross-sell__button">Купить</div>
                        </article>
                        `;
            return liItem;
        };

        const createCrossSellList = (goods) => {
            goods.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            });
        };

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    };
    renderCrossSell();
    tabs();
    accordion();
    modal();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});