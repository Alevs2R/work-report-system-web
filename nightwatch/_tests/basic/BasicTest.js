import {start, login, failedLogin, logout} from '../components/index';

module.exports = {
    // Открытие страницы
    'Opening page': start,

    // Введение неправильного пароля
    'Failed login': failedLogin,

    // Входим
    'Succesful login': login,

    // Выходим
    'Logout': logout,

    // Входим снова
    'Login again': login,

    // Добавляем юзера
    'Add user': function(client){
        client
            .useCss()
            .click('#usersList')
            .click('#addUser')
            .setValue("#username", ['Vladimir Putin', client.Keys.ENTER])
            .click("#save")
            .waitForElementVisible('#addUser', 1000)
    },

    // Удаляем юзера
    'Remove user': function(client){
        client
            .useCss()
            .click("tbody tr:last-child .icon")
            .waitForElementVisible('#removeModal', 300)
            .click('#yesRemoveButton')
            .pause(500)
            .getText(`tbody tr:last-child h4 div`, function(result) {
                this.assert.equal(result.status, 0);
                this.assert.notEqual(result.value, 'Vladimir Putin');
            })
    },

    // Выходим в коце
    'Logout in the end': logout,
};
