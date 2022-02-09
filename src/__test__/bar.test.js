import { render } from "@testing-library/svelte";
import App from "../Bar.svelte";

test("should render bb-helper", () => {
  const results = render(App, {target: document.body,props: {}});
  expect(results.container.querySelector('bb-helper').tagName).toBe('BB-HELPER');
});

test("should render bar element", () => {
    const results = render(App, {target: document.body,props: {}});
    results.component.question = 'jest test bar'
    expect(results.getByText('jest test bar').innerHTML).toBeDefined();
});

test("should match text in the bar", () => {
  const results = render(App, {target: document.body,props: {}});
  results.component.question = 'jest test bar'
  expect(results.container.querySelector('#board').innerHTML).toBe('jest test bar');
});