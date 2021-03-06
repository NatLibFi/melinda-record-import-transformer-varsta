/**
*
* @licstart  The following is the entire license notice for the JavaScript code in this file.
*
* ONIX record transformer for varsta to the Melinda record batch import system
*
* Copyright (C) 2019-2020 University Of Helsinki (The National Library Of Finland)
*
* This file is part of melinda-record-import-transformer-varsta
*
* melinda-record-import-transformer-varsta program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the
* License, or (at your option) any later version.
*
* melinda-record-import-transformer-varsta is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
* @licend  The above is the entire license notice
* for the JavaScript code in this file.
*
*/

export function createValueInterface(record) {
  return {getValue, getValues};

  function getValue(...path) {
    return recurse(path);

    function recurse(props, context = record) {
      const [prop] = props;

      if (prop) {
        return recurse(props.slice(1), context?.[prop]?.[0]);
      }

      return typeof context === 'object' ? context._ : context;
    }
  }

  function getValues(...path) {
    return recurse(path);

    function recurse(props, context = record) {
      const [prop] = props;

      if (prop) { /* istanbul ignore else: Added as a safeguard only */
        if (props.length === 1) {
          return context?.[prop] || /* istanbul ignore next: Added as a safeguard only */ [];
        }

        return recurse(props.slice(1), context?.[prop]?.[0] || /* istanbul ignore next: Added as a safeguard only */ {});
      }

      /* istanbul ignore next: Added as a safeguard only */ return [];
    }
  }
}
