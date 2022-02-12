import {
  getImplementation,
  getElementAccessSupport,
  getDragSupport,
} from "./d3DomainImpl";

import { idSelector } from "../dom";

function classPrefixMutator(k, v, func, domainName) {
  if (domainName && k === "class") {
    return func(k, `${domainName}-${v}`);
  }
  return func(k, v);
}

function getDomain(domainName) {
  let implementation = getImplementation(idSelector(domainName));
  return {
    select: (s) => {
      let el = implementation.select(s);
      return {
        attr: (k, v) => {
          let res = classPrefixMutator(
            k,
            v,
            (kk, vv) => el.attr(kk, vv),
            domainName
          );
          return {
            attr: (k, v) =>
              classPrefixMutator(k, v, (kk, vv) => el.attr(kk, vv), domainName),
            call: (c) => res.call(c),
          };
        },
        node: (_) => getElementAccessSupport(el),
        on: (k, v) => el.on(k, v),
        selectChildren: (_) => {
          let children = el.selectChildren();
          return {
            attr: (k, v) =>
              classPrefixMutator(
                k,
                v,
                (kk, vv) => children.attr(kk, vv),
                domainName
              ),
          };
        },
        interrupt: (_) => implementation.interrupt(),
      };
    },
    attr: (k, v) =>
      classPrefixMutator(
        k,
        v,
        (kk, vv) => implementation.attr(kk, vv),
        domainName
      ),
    drag: (_) => getDragSupport(),
  };
}

export { getDomain };
