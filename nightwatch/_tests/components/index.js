export const start = function (client) {
    client
        .url('http://localhost:3000')
        .waitForElementVisible('#root', 2000)
};

export const login = function (client) {
    client
        .useCss()
        .click("#login")
        .setValue('#login', [client.Keys.BACK_SPACE,client.Keys.BACK_SPACE,client.Keys.BACK_SPACE,client.Keys.BACK_SPACE,client.Keys.BACK_SPACE])
        .click("#password")
        .setValue('input[type="password"]', [client.Keys.BACK_SPACE,client.Keys.BACK_SPACE,client.Keys.BACK_SPACE,client.Keys.BACK_SPACE])
        .setValue('#login', 'admin')
        .setValue('#password', ['test',client.Keys.ENTER])
        .waitForElementVisible('#adminPanel', 3000)
};

export const failedLogin = function (client) {
    client
        .useCss()
        .setValue('#login', 'root')
        .setValue('#password', ['test',client.Keys.ENTER])
        .waitForElementVisible('#error', 3000)
        .assert.containsText('#error',"login or password are not valid")
};

export const logout = function (client) {
    client
        .pause(300)
        .useCss()
        .click("#logout")
        .waitForElementVisible('#login', 1000)
};