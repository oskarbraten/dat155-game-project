
import { COMPONENT } from '../lib/constants.js';
import { getMinMax } from './utils.js';

import Accessor from '../mesh/Accessor.js';
import Primitive from '../mesh/Primitive.js';

/**
 * Generates a plane, and returns a primitive.
 * 
 * @param {Material} material 
 * @param {integer} mode 
 * @returns {Primitive}
 */
export default (material, mode) => {

    if (typeof material === 'undefined') {
        throw Error('A Material-instance must be passed as an argument.');
    }

    const vertices = [
        -0.5, 0, 0.5, // a
        0.5, 0, 0.5,  // b
        0.5, 0, -0.5, // c

        -0.5, 0, 0.5, // a
        0.5, 0, -0.5, // c
        -0.5, 0, -0.5 // d
    ];

    const normals = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ];

    const uvs = [
        0, 0, // a
        1, 0, // b
        1, 1, // c
        0, 0, // a
        1, 1, // c
        0, 1  // d
    ];


    const attributeBuffer = new Float32Array(vertices.concat(normals, uvs));

    const { min, max } = getMinMax(vertices);

    const attributes = {
        POSITION: new Accessor(attributeBuffer, COMPONENT.TYPE.FLOAT, 'VEC3', vertices.length, 0, min, max),
        NORMAL: new Accessor(attributeBuffer, COMPONENT.TYPE.FLOAT, 'VEC3', normals.length, vertices.length * 4),
        TEXCOORD: new Accessor(attributeBuffer, COMPONENT.TYPE.FLOAT, 'VEC2', uvs.length, vertices.length * 4 + normals.length * 4)
    };

    const primitive = new Primitive(attributes, material, null, mode);

    return primitive;
};