## StickerStack

----

### 🌐 Ссылки

- [Сайт StickerStack](https://stickerstack.ru/)
- [Репозиторий backend](https://github.com/StickerStack/backend) части проекта
- [Макет проекта в Figma](https://www.figma.com/file/Z1qiU1QZYnQjvKMplUsRkj/PoC?node-id=0%3A1)

---

### ⏱ Описание

Frontend часть сайта для создания кастомных стикеров с мгновенным просмотром их расположения на листах. В финальной версии продукта
пользователь сможет совершать покупки, после чего придет посылка с виниловыми стикерами с матовой или глянцевой ламинацией.

 _Главная страница_
![На главной](./src/images/readme/main.png)

### Основные фичи

<h2>Создание стикеров</h2>

Масимально автоматизировано. Пользователь загружает свои изображения, выбирает размер и форму стикеров, а программа приводит их к нужному формату, добавляет белую обводку и размещает на листах. Можно просматривать, как стикеры расположились на листах, и редактировать для достижения желаемого результата.
В зависимости от количества листов подсчитывается стоимость заказа. Также есть возможность выбрать, в каком виде получать стикеры - готовые вырезанные по контуру или стикерпак на листе.

<details>  
  <summary> <h4>Загрузка изображений и предварительный просмотр листов</h4> </summary>
  <img src='./src/images/readme/add-stickers.png' alt='Загрузка изображений'/>
  <img src='./src/images/readme/preview.png' alt='Предварительный просмотр листов'/>
</details>

Весь процесс динамический. Это означает, что подсчеты и размещение картинок на листах происходят автоматически, когда пользователь меняет какие-то параметры своих стикеров.

<h2>Оформление и просмотр заказов</h2>

Когда корзина заполнена и пользователь готов совершить заказ, происходит оформление. Массив стикеров компануется в заказ и отправляется в базу под уникальным номером.

<details>  
  <summary> <h4>Заполненная корзина и успешное оформление заказа</h4> </summary>
   <img src='./src/images/readme/cart.png' alt='Заполненная корзина'/>
   <img src='./src/images/readme/order-placed.png' alt='Успешное оформление заказа'/>
</details>

На странице заказов отображается полная история заказов пользователя. Для каждого заказа можно открыть подробную информацию - о дате, статусах, загруженных картинках.

<details>  
  <summary> <h4>Прелоадер заказов и подробности заказа</h4> </summary>
  <img src='./src/images/readme/orders-preloader.png' alt='Прелоадер заказов'/>
  <img src='./src/images/readme/order.png' alt='Подробности заказа'/>
</details>

<h2>Аутентификация и личный кабинет</h2>

Новому пользователю необходимо пройти несколько этапов, чтобы получить доступ к основному функционалу сайта - зарегистрироваться с электронной почтой и паролем, авторизироваться. Для оформления заказа потребуется подтвердить почту: при регистрации на указанный адрес приходит письмо со ссылкой для подтверждения.
Через письмо на почту также реализован процесс восстановления и смены пароля.

<details>  
  <summary> <h4>Авторизация</h4> </summary>
  <img src='./src/images/readme/main-auth.png' alt='Авторизация'/>
</details>

После регистрации у пользователя появляется личный кабинет. Там можно редактировать аватарку и информацию о себе. После редактирования поля с почтой та снова считается неподтвержденной и требует подтверждения. Письмо подтверждения можно дополнительно запросить из личного кабинета.

<h4>Личный кабинет</h4>

![Личный кабинет](./src/images/readme/profile.png)

---

<details>  
  <summary> <h3>💪 Функционал</h3> </summary>
    <ul>
      <li>Регистрация и авторизация с использованием Redux</li>
      <li>Аутентификации пользователя на основании данных от backend</li>  
      <li>Подтверждение почты и восстановление пароля через тригерные письма</li>
      <li>Просмотр и редактирование личного кабинета по полям имя, фамилия, почта и аватар</li> 
      <li>Загрузка картинок и последующее оформление стикеров на листах с помощью Redux и средств разметки</li>
      <li>Оформление и просмотр заказов</li>
   </ul>
</details>

---

<details>  
  <summary> <h3>📈 Планы по развитию проекта</h3> </summary>
    <ul>
     <li>Реализовать хранение загруженных стикеров и корзины на backend</li>
     <li>Выполнить адаптацию сайта к различным размерам экранов, в том числе мобильную версию</li>
      <li>Настроить оплату заказов</li>
    </ul>
</details>

---

### 🔧 Стек технологий

_React, React Hook Form, Redux-toolkit, TypeScript, Html, SASS, Git_

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white")  
![TypeScript](https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990.svg?style=for-the-badge&logo=React-Hook-Form&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

---

### 🚀 Инструкция по запуску на локальной машине

- Установить [Node.js](https://nodejs.org/ru/)
- Клонировать репозиторий ` git clone git@github.com:StickerStack/StickerStack_frontend.git`
- Установить зависимости `npm install`
- Запустить приложение `npm run start`
