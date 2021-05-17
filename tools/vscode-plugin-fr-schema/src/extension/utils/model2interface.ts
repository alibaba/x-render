/**
 * json to interface
 * 20 Feb 2016 @GregorBiswanger
 * https://github.com/GregorBiswanger/VSCode-json2ts/blob/master/src/extension.ts
 */

import * as _ from 'lodash-es';

// TODO: convert schema to interface directly
class Json2Interface {
  convert(jsonContent: any, schema?: any): string {
    return this.convertObjectToTsInterfaces(jsonContent, 'FormData', schema);
  }

  private convertObjectToTsInterfaces(
    jsonContent: any,
    objectName: string = 'FormData',
    schema?: any
  ): string {
    let optionalKeys: string[] = [];
    let objectResult: string[] = [];

    for (let key in jsonContent) {
      let value: string = jsonContent[key];

      if (_.isObject(value) && !_.isArray(value)) {
        let childObjectName = this.toUpperFirstLetter(key);
        objectResult.push(
          this.convertObjectToTsInterfaces(
            value,
            childObjectName,
            schema?.properties?.[key]
          )
        );
        jsonContent[key] = this.removeMajority(childObjectName) + ';';
      } else if (_.isArray(value)) {
        let arrayTypes: any = this.detectMultiArrayTypes(value);

        if (this.isMultiArray(arrayTypes)) {
          let multiArrayBrackets = this.getMultiArrayBrackets(value);

          if (this.isAllEqual(arrayTypes)) {
            jsonContent[key] = arrayTypes[0].replace('[]', multiArrayBrackets);
          } else {
            jsonContent[key] = 'any' + multiArrayBrackets + ';';
          }
        } else if (value.length > 0 && _.isObject(value[0])) {
          let childObjectName = this.toUpperFirstLetter(key);
          objectResult.push(
            this.convertObjectToTsInterfaces(
              value[0],
              childObjectName,
              schema?.properties?.[key]?.items
            )
          );
          jsonContent[key] = this.removeMajority(childObjectName) + '[];';
        } else {
          jsonContent[key] = arrayTypes[0];
        }
      } else if (_.isDate(value)) {
        jsonContent[key] = 'Date;';
      } else if (_.isString(value)) {
        jsonContent[key] = 'string;';
      } else if (_.isBoolean(value)) {
        jsonContent[key] = 'boolean;';
      } else if (_.isNumber(value)) {
        jsonContent[key] = 'number;';
      } else {
        jsonContent[key] = 'any;';
        optionalKeys.push(key);
      }

      if (schema?.properties?.[key]?.title) {
        jsonContent[key] += ` // ${schema.properties[key].title}`;
      }
    }

    let result = this.formatCharsToTypeScript(
      jsonContent,
      objectName,
      optionalKeys
    );
    objectResult.push(result);

    return objectResult.join('\n\n');
  }

  private detectMultiArrayTypes(
    value: any,
    valueType: string[] = []
  ): string[] {
    if (_.isArray(value)) {
      if (value.length === 0) {
        valueType.push('any[];');
      } else if (_.isArray(value[0])) {
        for (let index = 0, length = value.length; index < length; index++) {
          let element = value[index];

          let valueTypeResult = this.detectMultiArrayTypes(element, valueType);
          valueType.concat(valueTypeResult);
        }
      } else if (_.every(value, _.isString)) {
        valueType.push('string[];');
      } else if (_.every(value, _.isNumber)) {
        valueType.push('number[];');
      } else if (_.every(value, _.isBoolean)) {
        valueType.push('boolean[];');
      } else {
        valueType.push('any[];');
      }
    }

    return valueType;
  }

  private isMultiArray(arrayTypes: string[]) {
    return arrayTypes.length > 1;
  }

  private isAllEqual(array: string[]) {
    return _.every(array.slice(1), _.partial(_.isEqual, array[0]));
  }

  private getMultiArrayBrackets(content: string): string {
    let jsonString = JSON.stringify(content);
    let brackets = '';

    for (let index = 0, length = jsonString.length; index < length; index++) {
      let element = jsonString[index];

      if (element === '[') {
        brackets = brackets + '[]';
      } else {
        index = length;
      }
    }

    return brackets;
  }

  private formatCharsToTypeScript(
    jsonContent: any,
    objectName: string,
    optionalKeys: string[]
  ): string {
    let result = JSON.stringify(jsonContent, null, '\t')
      .replace(new RegExp('"', 'g'), '')
      .replace(new RegExp(',', 'g'), '');

    let allKeys = _.keys(jsonContent);
    for (let index = 0, length = allKeys.length; index < length; index++) {
      let key = allKeys[index];
      // keys of formData always optional
      result = result.replace(
        new RegExp(key + ':', 'g'),
        this.toLowerFirstLetter(key) + '?:'
      );
      // optimize comments format for code prompt
      result = result.replace(
        new RegExp('(.*) // (.*)'),
        (match, $1, $2) => `  /** ${$2} */\n${$1}`
      );
      // if (_.includes(optionalKeys, key)) {
      //   result = result.replace(new RegExp(key + ':', 'g'), this.toLowerFirstLetter(key) + '?:');
      // } else {
      //   result = result.replace(new RegExp(key + ':', 'g'), this.toLowerFirstLetter(key) + ':');
      // }
    }

    objectName = this.removeMajority(objectName);

    return 'export interface ' + objectName + ' ' + result;
  }

  private removeMajority(objectName: string): string {
    if (_.endsWith(objectName.toUpperCase(), 'IES')) {
      return objectName.substring(0, objectName.length - 3) + 'y';
    } else if (_.endsWith(objectName.toUpperCase(), 'SES')) {
      return objectName.substring(0, objectName.length - 2);
    } else if (_.endsWith(objectName.toUpperCase(), 'S')) {
      return objectName.substring(0, objectName.length - 1);
    }

    return objectName;
  }

  private toUpperFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private toLowerFirstLetter(text: string) {
    return text.charAt(0).toLowerCase() + text.slice(1);
  }
}

const getInterfaceFromModel = new Json2Interface();

export default getInterfaceFromModel;
