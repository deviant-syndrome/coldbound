import {
  getImplementation,
  getElementAccessSupport,
  getDragSupport,
} from "./d3DomainImpl";

import { idSelector } from "../dom";

const CLASS = "class";

function classPrefixMutator(k, v, func, domainName) {
  if (domainName && k === CLASS) {
    return func(k, `${domainName}-${v}`);
  }
  return func(k, v);
}

function classPrefixMutation(c, domainName) {
  return classPrefixMutator(CLASS, c, (k, v) => v, domainName);
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
            replaceClass: (c1, c2) => {
              children.classed(classPrefixMutation(c1, domainName), false);
              children.classed(classPrefixMutation(c2, domainName), true);
            },
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
