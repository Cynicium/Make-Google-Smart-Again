// ==UserScript==
// @name         Make Google Smart Again
// @namespace    https://t.me/CyniLulz
// @version      1.68.54356
// @description  Automatically exclude specified sites from Google search results
// @author       Cynicium
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Перечень доменов для исключения
    const excludedSites = [
        'mail.ru',
        'dzen.ru',
        'support.google.com',
        'support.microsoft.com'
    ];

    // Функция для формирования строки исключений доменов
    function getExclusionString() {
        return excludedSites.map(site => `-site:${site}`).join(' ');
    }

    // Функция для получения даты/месяц
    function getLastMonthDate() {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0]; // Формат YYYY-MM-DD
    }

    // Получение текущего поискового запроса
    const urlParams = new URLSearchParams(window.location.search);
    let query = urlParams.get('q');

    // Проверяем, обрабатывался ли этот запрос уже
    const processedQuery = sessionStorage.getItem('processedQuery');
    if (processedQuery === query) {
        return; // Если запрос уже обработан, прекращаем выполнение
    }

    // Добавляем исключения доменов, если они еще не добавлены
    if (!query.includes('-site:')) {
        query += ' ' + getExclusionString();
    }

    // Добавляем фильтр по дате, если он еще не добавлен
    if (!query.includes('before:')) {
        const lastMonthDate = getLastMonthDate();
        query += ` before:${lastMonthDate}`;
    }

    // Сохраняем обновленный запрос
    urlParams.set('q', query);

    // Сохраняем текущий запрос в sessionStorage
    sessionStorage.setItem('processedQuery', query);

    // Перенаправляем на обновленный URL
    window.location.search = urlParams.toString();

})();
