
const chromedriver = require('chromedriver');
const selenium = require('selenium-server-standalone-jar');

const config = {
    src_folders: ['./nightwatch/_tests'],
    output_folder: './nightwatch/output/results',
    log_path: './nightwatch/output/output.log',
    custom_commands_path: '',
    custom_assertions_path: '',
    globals_path: '',

    test_settings: {
        default: {
            launch_url: 'http://localhost',
            selenium_port: process.env.SELENIUM_PORT ? process.env.SELENIUM_PORT : 4444,
            selenium_host: process.env.SELENIUM_HOST ? process.env.SELENIUM_HOST : 'localhost',
            silent: true,
            screenshots: {
                enabled: true,
                on_failure: true,
                on_error: false,
                path: './nightwatch/output/screens'
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                marionette: true,
                chromeOptions: {
                    args: ['--disable-web-security']
                }
            },
            exclude: [
                './nightwatch/_tests/components/*'
            ]
        }
    }
};

if (!(process.env.SELENIUM_HOST && process.env.SELENIUM_PORT)) {
    config.selenium = {
        start_process: true,
        server_path: selenium.path,
        log_path: './nightwatch/output/results',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path
        }
    };
}

module.exports = config;
