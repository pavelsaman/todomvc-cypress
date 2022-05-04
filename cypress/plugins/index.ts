// @ts-check
/// <reference types="cypress" />

type APPENV = {
  baseUrl: string;
};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {

  config.env.ci = process.env.CI ?? false;

  on('before:browser:launch', (browser: any = {}, launchOptions) => {
    console.log(launchOptions.args);

    if (config.env.ci) return launchOptions;

    if (browser.family === 'chromium') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
    }

    if (browser.family === 'firefox') {
      launchOptions.args.push('-devtools');
    }

    if (browser.name === 'electron') {
      launchOptions.preferences.devTools = true;
    }

    return launchOptions;
  });

  const app: string = process.env.APP || config.env.app || 'prod';
  let appConfig: APPENV;
  try {
    appConfig = require(`../config/${app}.json`);
  } catch (e) {
    throw new Error('Wrong environment, please see available environments in ../config/*');
  }
  config.baseUrl = appConfig.baseUrl;

  return config;
}
