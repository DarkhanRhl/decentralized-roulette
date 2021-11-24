/*
| Developed by Dirupt
| Filename : DiruptUtils.ts
| Description : Utils methods
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

import _ from 'lodash'

export class DiruptUtils {
	/**
	 * SearchScreen if value included in search text.
	 * @param value
	 * @param searchText
	 */
	public static searchInString(value: string, searchText: string): boolean {
		return value.toLowerCase().includes(searchText)
	}

	/**
	 * SearchScreen in array if search text exist
	 * @param array
	 * @param searchText
	 */
	public static searchInArray(array: Array<any>, searchText: string): boolean | undefined {
		for (const value of array) {
			if (typeof value === 'string') {
				if (this.searchInString(value, searchText)) {
					return true
				}
			}

			if (typeof value === 'object') {
				if (this.searchInObj(value, searchText)) {
					return true
				}
			}
		}
	}

	/**
	 * SearchScreen in object if search text exist
	 * @param itemObj
	 * @param searchText
	 */
	public static searchInObj(itemObj: any, searchText: string): boolean | undefined {
		for (const prop in itemObj) {
			// eslint-disable-next-line no-prototype-builtins
			if (!itemObj.hasOwnProperty(prop)) {
				continue
			}

			const value = itemObj[prop]

			if (typeof value === 'string') {
				if (this.searchInString(value, searchText)) {
					return true
				}
			} else if (Array.isArray(value)) {
				if (this.searchInArray(value, searchText)) {
					return true
				}
			}

			if (typeof value === 'object') {
				if (this.searchInObj(value, searchText)) {
					return true
				}
			}
		}
	}

	/**
	 * Get filter array with search text value
	 * @param mainArray
	 * @param searchText
	 */
	public static filterArrayByString(mainArray: Array<any>, searchText: string): Array<any> {
		if (searchText === '') {
			return mainArray
		}

		searchText = searchText.toLowerCase()

		return mainArray.filter((itemObj) => {
			return this.searchInObj(itemObj, searchText)
		})
	}

	/**
	 * Find object with this ID
	 * @param o
	 * @param id
	 */
	public static findById(o: any, id: string | number): any {
		if (o.id === id) {
			return o
		}

		let result, p

		for (p in o) {
			// eslint-disable-next-line no-prototype-builtins
			if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
				result = this.findById(o[p], id)
				if (result) {
					return result
				}
			}
		}

		return result
	}

	/**
	 * Handleize method
	 * @param text
	 */
	public static handleize(text: string): string {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/\W+/g, '') // Remove all non-word chars
			.replace(/--+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, '') // Trim - from end of text
	}

	/**
	 * Generate GUID
	 */
	public static generateGUID(): string {
		function S4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1)
		}

		return S4() + S4() + S4() + S4() + S4()
	}

	/**
	 * Return only difference value of object
	 * @param object
	 * @param base
	 */
	public static getDifferenceBetween(object: any, base: any): any {
		function changes(parentObject: any, parentBase: any) {
			return _.transform(parentObject, function (result: any, value: any, key: any) {
				if (!_.isEqual(value, parentBase[key])) {
					result[key] =
						_.isObject(value) && _.isObject(parentBase[key]) ? changes(value, parentBase[key]) : value
				}
			})
		}

		return changes(object, base)
	}

	/**
	 * Convert hex color to RGBA with opacity
	 * @param hex
	 * @param opacity
	 */
	public static convertHexToRGVA(hex: string, opacity: number): string {
		const tempHex = hex.replace('#', '')
		const r = parseInt(tempHex.substring(0, 2), 16)
		const g = parseInt(tempHex.substring(2, 4), 16)
		const b = parseInt(tempHex.substring(4, 6), 16)

		return `rgba(${r},${g},${b},${opacity})`
	}

	/**
	 * Debounce method
	 * @param func
	 * @param waitFor
	 */
	public static debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
		let timeout: ReturnType<typeof setTimeout> | null = null

		const debounced = (...args: Parameters<F>) => {
			if (timeout !== null) {
				clearTimeout(timeout)
				timeout = null
			}
			timeout = setTimeout(() => func(...args), waitFor)
		}

		return debounced as (...args: Parameters<F>) => ReturnType<F>
	}

	/*
	|--------------------------------------------------------------------------
	| A11Y
	|--------------------------------------------------------------------------
	*/
	public static a11yProps(index: number | string, prefix = 'tab'): { id: string; 'aria-controls': string } {
		return {
			id: `simple-${prefix}-${index}`,
			'aria-controls': `simple-${prefix}panel-${index}`,
		}
	}

	/*
	|--------------------------------------------------------------------------
	| NUMBERS
	|--------------------------------------------------------------------------
	*/
	public static abbreviateNumber(value: number, digits: number): string {
		// Define symbole with value
		const symbol = [
			{ value: 1, symbol: '' },
			{ value: 1e3, symbol: 'k' },
			{ value: 1e6, symbol: 'M' },
			{ value: 1e9, symbol: 'G' },
			{ value: 1e12, symbol: 'T' },
			{ value: 1e15, symbol: 'P' },
			{ value: 1e18, symbol: 'E' },
		]

		// Create regex for replace
		const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

		// Get number
		let i
		for (i = symbol.length - 1; i > 0; i--) {
			if (value >= symbol[i].value) {
				break
			}
		}

		// Return value
		return (value / symbol[i].value).toFixed(digits).replace(rx, '$1') + symbol[i].symbol
	}
}
