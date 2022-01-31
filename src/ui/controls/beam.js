import * as d3 from 'd3'
import * as ct from '../controlTypes'

export function wire(type, index) {
    let beam = d3.select(ct.beam(type, index))
    return {
        blink: () => {
            beam.attr("class", "beam-on")
            setTimeout(() => {
                beam.attr("class", "beam-off")
            }, 200)
        }
    }
}