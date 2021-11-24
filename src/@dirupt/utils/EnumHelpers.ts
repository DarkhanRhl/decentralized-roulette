/*
| Developed by Dirupt
| Filename : EnumHelpers.ts
| Description : Utils methods - Enum helpers
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

export class EnumHelpers {
	/**
	 * Get names and values of enum
	 * @param e
	 */
	public static getNamesAndValues<T extends number | string>(e: any) {
		return EnumHelpers.getNames(e).map((n) => ({ name: n, value: e[n] as T }))
	}

	/**
	 * Get names of enum
	 * @param e
	 */
	public static getNames(e: any) {
		return EnumHelpers.getObjValues(e).filter((v) => typeof v === 'string') as string[]
	}

	/**
	 * Get values number of enum
	 * @param e
	 */
	public static getValues<T extends number>(e: any) {
		return EnumHelpers.getObjValues(e).filter((v) => typeof v === 'number') as T[]
	}

	/**
	 * Get values string of enum
	 * @param e
	 */
	public static getStringValues<T extends string>(e: any) {
		return EnumHelpers.getObjValues(e).filter((v) => typeof v !== 'number') as T[]
	}

	/**
	 * [WORK IN PROGRESS] Get selected list
	 * @param e
	 * @param stringConverter
	 */
	public static getSelectList<T extends number | string, U>(e: any, stringConverter: (arg: U) => string) {
		const selectList = new Map<T, string>()
		this.getValues(e).forEach((val) => selectList.set(val as T, stringConverter((val as unknown) as U)))
		return selectList
	}

	/**
	 * [WORK IN PROGRESS] Gete selected list as array
	 * @param e
	 * @param stringConverter
	 */
	public static getSelectListAsArray<T extends number | string, U>(e: any, stringConverter: (arg: U) => string) {
		return Array.from(this.getSelectList(e, stringConverter), (value) => ({
			value: value[0] as T,
			presentation: value[1],
		}))
	}

	/**
	 * Get enum values
	 * @param e
	 */
	private static getObjValues(e: any): (number | string)[] {
		return Object.keys(e).map((k) => e[k])
	}
}
