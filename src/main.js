import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'head': [ Pages.HeadPage ]/*,
  'list': [ Pages.ListPage, {
    cats: [],
    showDialog: true
  }],
  'nav': [ Pages.NavigatePage ]*/
};

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app');

  const temlpatingFunction = Handlebars.compile(source);
  console.log('html', temlpatingFunction(context))
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('head'));

/*document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});*/