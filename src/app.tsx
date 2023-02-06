import * as ReactDOM from 'react-dom';

function LandingPage() {
  return (
    <main>
      <h1>Electron Skeleton</h1>
    </main>
  );
}

function render() {
  ReactDOM.render(
    <LandingPage />, document.body
  );
}

render();