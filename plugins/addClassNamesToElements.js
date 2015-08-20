/* jshint node:true */
'use strict';

module.exports = {
  type: 'perItem',
  active: false,
  description: 'Adds class names to elements',
  fn: fn,
  params: {
    elementClassNames: {} // { <elementName>: [<className>*], ...} ex. { 'path': ['pathClass1', 'pathClass2'], 'g': 'gClass' }
  }
};

/**
 * Adds class names to elements.
 *
 * @param {Object} item current iteration item
 * @param {Object} params plugin params
 * @return {Boolean} if false, item will be filtered out
 *
 * @author Alex Katopodis
 */
function fn(item, params) {
  Object.keys(params.elementClassNames).forEach(function (elementName) {
    var classNames = params.elementClassNames[elementName];
    if (!Array.isArray(classNames)) {
      classNames = [classNames];
    }

    if (item.isElem(elementName)) {
      if (item.hasAttr('class')) {
        item.attr('class').value =
          item.attr('class').value
            .trim()
            .split(/\s+/)
            .concat(classNames)
            .join(' ');
      }
      else {
        item.addAttr({
            name: 'class',
            value: classNames.join(' '),
            prefix: '',
            local: 'class'
        });
      }
    }
  });
}