const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const axios = require('axios');
const Actions = require('nightmare-react-utils').Actions;

Nightmare.action(...Actions);

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8080);

const url = 'http://localhost:8080';

describe('Very Simple To Do App', () => {
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('should load successfully', async () => {
    const response = await axios.get(url);
    expect(response.status).toBe(200);
  }, 12000);

  it('should include textarea element with class create-todo-text for the user to enter todo text', async () => {
    const element = await nightmare.goto(url).react.findAll('textarea.create-todo-text');
    expect(element.length).not.toBe(0);
    expect(element[0]).not.toBeNull();
    expect(typeof element).toBe('object');
  }, 12000);

  it('should add todo item with priority', async () => {
    const { innerText, className } = await nightmare.goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait(500)
      .evaluate(() => {
        const { innerText, className } = document.querySelectorAll('li')[0];
        return { innerText, className };
      });

    expect(innerText).toContain('ITEM');
    expect(className).toContain('success');
  }, 12000);

  it('should show todo item with edit and delete', async () => {
    const [editButtons, deleteButtons] = await nightmare.goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait(500)
      .evaluate(() => [
        document.querySelectorAll('.edit-todo').length,
        document.querySelectorAll('.delete-todo').length
      ]);

    expect(editButtons).toBe(1);
    expect(deleteButtons).toBe(1);
  }, 12000);

  it('should allow to edit a todo item by clicking .edit-todo of a todo element', async () => {
    const finalValue = await nightmare.goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .wait('.edit-todo')
      .click('.edit-todo')
      .wait('.update-todo-text')
      .type('.update-todo-text', ' UPDATED')
      .click('.update-todo')
      .evaluate(() => document.querySelectorAll('li')[0].innerText);

    expect(finalValue).toContain('UPDATED');
  }, 12000);

  it('should allow to delete a todo item by clicking .delete-todo of a todo element', async () => {
    const length = await nightmare.goto(url)
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM')
      .click('button.create-todo')
      .select('select.create-todo-priority', '1')
      .type('textarea.create-todo-text', 'ITEM2')
      .click('button.create-todo')
      .wait('.delete-todo')
      .click('.delete-todo')
      .wait(250)
      .evaluate(() => document.querySelectorAll('li').length);

    expect(length).toBe(1);
  }, 12000);
});
