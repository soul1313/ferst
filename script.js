document.getElementById('showModalBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const feedback = document.getElementById('feedback').value;

    // Проверка, что все поля заполнены
    if (!name || !email || !age || !feedback) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка email с использованием регулярного выражения
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Пожалуйста, введите корректный email.");
        return;
    }

    // Проверка возраста: только целые числа, больше 0 и меньше 120
    if (isNaN(age) || age <= 0 || age > 120 || age.trim() === "" || !Number.isInteger(Number(age))) {
        alert("Пожалуйста, введите корректный возраст.");
        return;
    }

    // Проверка длины отзыва
    if (feedback.length < 10) {
        alert("Пожалуйста, введите отзыв длиной хотя бы 10 символов.");
        return;
    }

    // Формируем контент для модалки с картинкой и информацией
    const modalContent = `
        <div class="card">
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Возраст:</strong> ${age}</p>
            <p><strong>Отзыв:</strong> ${feedback}</p>
        </div>
    `;
    document.getElementById('modalContent').innerHTML = modalContent;

    // Открытие модального окна
    document.getElementById('modal').classList.add('show');
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('show');
});

// Закрытие модалки при клике вне ее
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal')) {
        document.getElementById('modal').classList.remove('show');
    }
});

// Обработчик для кнопки "Сохранить"
document.getElementById('saveBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const feedback = document.getElementById('feedback').value;

    if (name && email && age && feedback) {
        // Сохраняем информацию в localStorage
        const userInfo = { name, email, age, feedback };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert("Информация успешно сохранена!");
    } else {
        alert("Пожалуйста, сначала заполните форму.");
    }
});

// Обработчик для кнопки "Поделиться"
document.getElementById('shareBtn').addEventListener('click', function() {
    const url = window.location.href; // Получаем текущий URL страницы

    // Пытаемся использовать Web Share API (если поддерживается браузером)
    if (navigator.share) {
        navigator.share({
            title: 'Моя анкета',
            text: 'Заполните анкету и получите информацию!',
            url: url
        }).then(() => {
            console.log('Данные успешно отправлены!');
        }).catch((error) => {
            console.error('Ошибка при попытке поделиться:', error);
        });
    } else {
        // Если Web Share API не поддерживается, показываем ссылку для копирования
        prompt('Скопируйте ссылку и поделитесь:', url);
    }
});
