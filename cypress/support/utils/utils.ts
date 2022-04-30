// @ts-check
/// <reference types="Cypress" />

import todos from 'fixtures/todos.json';

const ALL_ITEMS: string = '.todo-list li';
const TOGGLE: string = '.toggle';
const TOGGLE_ALL: string = '.toggle-all';

export const allItems = () => cy.get(ALL_ITEMS);
export const newTodos = (...todoNames: Array<string>) => {
    todoNames.forEach(todoName => {
      cy
        .get('.new-todo')
        .type(`${todoName}{Enter}`);
    });
    return allItems();
};
export const toggleTodo = (n: number) => {
    cy
      .get(TOGGLE)
      .eq(n)
      .check();

    allItems()
      .eq(n)
      .should('have.class', 'completed');
};
export const unToggleTodo = (n: number) => {
    cy
      .get(TOGGLE)
      .eq(n)
      .uncheck();

    allItems()
      .eq(n)
      .should('not.have.class', 'completed');
};
export const toggleAll = () => {
    cy
      .get(TOGGLE_ALL)
      .check();

    allItems()
      .each(todo => expect(todo).to.have.class('completed'));
};
export const unToggleAll = () => {
    cy
      .get(TOGGLE_ALL)
      .uncheck();

    allItems()
      .each(todo => expect(todo).not.to.have.class('completed'));
};
export const checkState = (...todos: Array<string>) => {
    allItems()
      .should('have.length', todos.length)
      .each((todo, i) => expect(todo).to.contain.text(todos[i]));
};
export const deleteTodo = (n: number) => cy.get(ALL_ITEMS).eq(n).realHover().find('.destroy').click();
export const goToAll = () => cy.get('a').contains('All').click();
export const goToActive = () => cy.get('a').contains('Active').click();
export const goToCompleted = () => cy.get('a').contains('Completed').click();
export const todosCount = () => cy.get('.todo-count');
export const clearCompleted = () => cy.get('.clear-completed').click();
export const setState = () => {
    window.localStorage.setItem(Cypress.env('storageItemName'), JSON.stringify(todos));
    cy.reload();
};
export const changeTodo = (n: number, newText: string) => {
    cy
      .get(ALL_ITEMS)
      .eq(n)
      .as('selectedTodo');
      
    cy
      .get('@selectedTodo')
      .dblclick();

    cy
      .get('@selectedTodo')
      .find('input.edit')
      .clear()
      .type(`${newText}{Enter}`);    
};
