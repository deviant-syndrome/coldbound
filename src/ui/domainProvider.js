import {getImplementation} from "./d3DomainImpl";

function getDomain(selector) {
    let implementation = getImplementation(selector)
    return {
        select: s => {
            let el = implementation.select(s)
            return {
                attr: (k, v) => el.attr(k, v),
                node: _ => el.node(),
                on: (k, v) => el.on(k, v),
                selectChildren: _ => {
                    let children = el.selectChildren()
                    return {
                        attr: (k, v) => children.attr(k, v)
                    }
                }
            }
        },
        attr: (k, v) => implementation.attr(k, v),
        drag: _ => implementation.drag(),
    }
}

export {
    getDomain
}