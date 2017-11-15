import Layout from './components/layout/layout.vue';

let AdmPortal = {
  Layout: Layout
};

const install = function (Vue, opts = {}) {
  Object.keys(AdmPortal).forEach(key => {
    Vue.component(key, AdmPortal[key]);
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Layout
};
