import {
  getImplementation,
  getElementAccessSupport,
  getDragSupport,
} from "./d3DomainImpl";

function getDomain(selector) {
  let implementation = getImplementation(selector);
  return {
    select: (s) => {
      let el = implementation.select(s);
      return {
        attr: (k, v) => {
          let res = el.attr(k, v);
          return {
            attr: (k, v) => res.attr(k, v),
            call: (c) => res.call(c),
          };
        },
        node: (_) => getElementAccessSupport(el),
        on: (k, v) => el.on(k, v),
        selectChildren: (_) => {
          let children = el.selectChildren();
          return {
            attr: (k, v) => children.attr(k, v),
          };
        },
        interrupt: _ => implementation.interrupt()
      };
    },
    attr: (k, v) => implementation.attr(k, v),
    drag: (_) => getDragSupport(),
  };
}

export { getDomain };
