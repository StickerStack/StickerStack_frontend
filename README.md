## StickerStack

---

### 🌐 Ссылки

- [ https://sticker-stack-frontend.vercel.app/](https://sticker-stack-frontend.vercel.app/) - front-end часть
  на временном хостинге
- [https://github.com/StickerStack/backend](https://github.com/StickerStack/backend) - репозиторий back-end части
- [Макет проекта в Figma](https://www.figma.com/file/Z1qiU1QZYnQjvKMplUsRkj/PoC?node-id=0%3A1)

---

### ⏱ Описание

В рамках проекта реализована front-end часть сайта для создания кастомных стикеров. В финальной версии продукта
пользователь сможет пользоваться личным кабинетом и делать заказы. После покупки придет посылка с виниловыми стикерами с матовой или глянцевой ламинацией.

![Скриншот главной страницы](./src/images/main-screenshot.png)
_Главная страница_

### Основные фичи

- Личный кабинет

Доступен после регистрации и авторизации через специальную форму. Отображает данные о пользователе и историю заказов.

- Создание стикеров

Полностью автоматизировано. Пользователь загружает свои изображения, выбирает размер и форму стикеров, а программа приводит их к нужному формату и размещает на листе.

![Пример стикерпака](./src/images/sticker-pack-screenshot.png)
_Пример стикерпака_

Из back-end части на front-end приходят данные для аутентификации пользователя (cookie), информация о пользователе и история заказов.

---

<details>  
  <summary> <h3>💪 Функционал</h3> </summary>
    <ul>
      <li>Регистрация и авторизация с использованием Redux</li>
      <li>Аутентификации пользователя на основании данных от back-end (получены через API)</li>  
      <li>Валидация форм на react-hook-form</li>
      <li>Роутинг на React-Router</li>
      
</ul>
</details>

---

<details>  
  <summary> <h3>📈 Планы по развитию проекта</h3> </summary>
    <ul>
      <li>Реализовать главную страницу</li>
      <li>Создать страницу, где пользователь добавляет картинки</li>
      <li>Сделать вкладку с корзиной</li>
      <li>Выполнить страницу с данными о пользователе и истории заказов</li>
      <li>Настроить API для оплаты заказа</li>
</ul>
</details>

---

### 🔧 Стек технологий

_Html, CSS, SASS, Git, JavaScript, React, React Hook Form, Redux-toolkit, TypeScript_

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SASS](https://img.shields.io/badge/SASS%20-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white")  
![TypeScript](https://img.shields.io/badge/typescript%20-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white)

---

### 🚀 Инструкция по запуску на локальной машине

- Установить [Node.js](https://nodejs.org/ru/)
- Клонировать репозиторий ` git clone git@github.com:StickerStack/StickerStack_frontend.git`
- Установить зависимости `npm install`
- Запустить приложение `npm run start`
