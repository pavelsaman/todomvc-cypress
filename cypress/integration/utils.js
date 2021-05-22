
const ALL_ITEMS = '.todo-list li';
const TOGGLE = '.toggle';
const TOGGLE_ALL = '.toggle-all';

export const allItems = () => cy.get(ALL_ITEMS);
export const newTodos = (...todoNames) => {
    todoNames.forEach(todoName => {
        cy.get('.new-todo')
          .type(`${todoName}{Enter}`);
    });
    return allItems();
};
export const toggleTodo = n => {
    cy.get(TOGGLE)
      .eq(n)
      .check();

    allItems()
      .eq(n)
      .should('have.class', 'completed');
};
export const unToggleTodo = n => {
    cy.get(TOGGLE)
      .eq(n)
      .uncheck();

    allItems()
      .eq(n)
      .should('not.have.class', 'completed');
};
export const toggleAll = () => {
    cy.get(TOGGLE_ALL)
      .check();

    allItems()
      .each(todo => {
          cy.get(todo)
            .should('have.class', 'completed');
      });
};
export const unToggleAll = () => {
    cy.get(TOGGLE_ALL)
      .uncheck();

    allItems()
      .each(todo => {
          cy.get(todo)
            .should('not.have.class', 'completed');
      });
};
export const checkState = (...todos) => {
    allItems()
      .should('have.length', todos.length)
      .each((todo, i) => {
         cy.get(todo)
           .should('contain.text', todos[i]);
      });
};
export const deleteTodo = n => cy.get('.destroy').invoke('show').eq(n).click();
export const goToAll = () => cy.get('a').contains('All').click();
export const goToActive = () => cy.get('a').contains('Active').click();
export const goToCompleted = () => cy.get('a').contains('Completed').click();
export const todosCount = () => cy.get('.todo-count');
export const clearCompleted = () => cy.get('.clear-completed').click();
export const setState = () => {
    cy.fixture('todo_one')
      .then(itemOne => {
        cy.fixture('todo_two')
          .then(itemTwo => {
            window.localStorage.setItem(Cypress.env('storageItemName'), JSON.stringify([itemOne, itemTwo]));
          });
      });

    cy.reload();
};
