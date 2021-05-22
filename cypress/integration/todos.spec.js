/// <reference types="Cypress" />

import {
    allItems,
    newTodos,
    toggleTodo,
    checkState,
    toggleAll,
    unToggleAll,
    unToggleTodo, 
    deleteTodo,
    goToAll,
    goToActive,
    goToCompleted,
    todosCount, 
    clearCompleted,
    setState,
} from './utils';
const ITEM_ONE = 'Learn Cypress';
const ITEM_TWO = 'Learn JS';

describe('Persistent state', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('Keep todos after page reload', () => {
        cy.reload();
        checkState(ITEM_ONE, ITEM_TWO);
    });
});

describe('Add new todos', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Add one new todo', () => {
        newTodos(ITEM_ONE)
          .then(() => checkState(ITEM_ONE));
    });

    it('Add two new todos', () => {
        newTodos(ITEM_ONE, ITEM_TWO)
          .then(() => checkState(ITEM_ONE, ITEM_TWO));
    });

    it('Add two new todos of the same name', () => {
        newTodos(ITEM_ONE, ITEM_ONE)
          .then(() => checkState(ITEM_ONE, ITEM_ONE));
    });

    it('Add new todo on completed tab', () => {
        newTodos(ITEM_ONE);
        toggleTodo(0);
        goToCompleted();
        clearCompleted();
        newTodos(ITEM_ONE)
          .should('not.exist');
        goToAll()
          .then(() => checkState(ITEM_ONE));
    });

    it('Add new todo on active tab', () => {
        newTodos(ITEM_ONE);
        goToActive();
        newTodos(ITEM_TWO)
          .then(() => checkState(ITEM_ONE, ITEM_TWO));
    });
});

describe('Toggle todos', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('Toggle first todo', () => {
        toggleTodo(0);
    });

    it('Toggle and untoggle first todo', () => {
        toggleTodo(0);
        unToggleTodo(0);
    });

    it('Toggle second todo', () => {
        toggleTodo(1);
    });

    it('Toggle all todos', () => {
        toggleAll();
    });

    it('Untoggle all todos', () => {
        toggleAll();
        unToggleAll();
    });
});

describe('Delete todos', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('Delete first todo', () => {
        deleteTodo(0)
          .then(() => checkState(ITEM_TWO));
    });

    it('Delete second todo', () => {
        deleteTodo(1)
          .then(() => checkState(ITEM_ONE));
    });

    it('Delete all todos', () => {
        deleteTodo(0)
        deleteTodo(0)
          .then(() => allItems().should('not.exist'));
    });
});

describe('See active todos', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('See two active todos', () => {
        goToActive()
          .then(() => checkState(ITEM_ONE, ITEM_TWO));
    });

    it('See one active todo', () => {
        toggleTodo(0);
        goToActive()
          .then(() => checkState(ITEM_TWO));
    });

    it('No active todos', () => {
        toggleTodo(0);
        toggleTodo(1);
        goToActive()
          .then(() => allItems().should('not.exist'));
    });
});

describe('See completed todos', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('See two completed todos', () => {
        toggleTodo(0);
        toggleTodo(1);
        goToCompleted()
          .then(() => checkState(ITEM_ONE, ITEM_TWO));
    });

    it('See one completed todo', () => {
        toggleTodo(0);
        goToCompleted()
          .then(() => checkState(ITEM_ONE));
    });

    it('No completed todos', () => {
        goToCompleted()
          .then(() => allItems().should('not.exist'));
    });
});

describe('Todo count', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('See count zero', () => {
        todosCount()
          .should('have.text', '0 items left');
    });

    it('See count one', () => {
        setState();
        todosCount()
          .should('have.text', '2 items left');
    });

    it('See count one after completing one todo', () => {
        setState();
        toggleTodo(0);
        todosCount()
          .should('have.text', '1 item left');
    });

    it('See count one on active tab after completing one todo', () => {
        setState();
        toggleTodo(0);
        goToActive();
        todosCount()
          .should('have.text', '1 item left');
    });

    it('See count one on completed tab after completing one todo', () => {
        setState();
        toggleTodo(0);
        goToCompleted();
        todosCount()
          .should('have.text', '1 item left');
    });

    it('See count one after deleting one todo', () => {
        setState();
        deleteTodo(0);
        todosCount()
          .should('have.text', '1 item left');
    });
});

describe('Clear completed todos', () => {

    beforeEach(() => {
        cy.visit('/');
        setState();
    });

    it('Clear completed todos', () => {
        toggleTodo(0);
        goToCompleted();
        clearCompleted();
        allItems()
          .should('not.exist');
        goToActive()
          .then(() => checkState(ITEM_TWO));
        goToAll()
          .then(() => checkState(ITEM_TWO));
    });
});
